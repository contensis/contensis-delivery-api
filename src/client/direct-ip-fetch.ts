// Direct IP routing with health-checked failover
// Bypasses DNS/hostname routing by sending requests directly to origin server IPs
// Activated via API_IP_LIST env var or Config.ipList

// eslint-disable-next-line no-var
declare var require: any;

// Configuration constants
const FAILURE_THRESHOLD = 3;
const COOLDOWN_MS = 30_000;
const HEALTH_CHECK_INTERVAL_MS = 10_000;
const HEALTH_CHECK_TIMEOUT_MS = 5_000;
const MAX_IP_COUNT = 10;

type FetchFn = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export interface IpState {
	failures: number;
	failedAt: number | null;
}

export interface DirectIpState {
	ipStates: Map<string, IpState>;
	ipList: string[];
	hostname: string;
	agents: Map<string, any>;
	healthTimer: any;
	refCount: number;
	release: () => void;
}

export interface DirectIpFetchResult {
	fetch: FetchFn;
	state: DirectIpState | null;
}

export interface HealthCheckConfig {
	projectId: string;
	accessToken?: string;
}

// Dependencies that can be injected for testing
export interface DirectIpDeps {
	httpsModule?: any;
	netModule?: any;
}

// Module-level shared state
const registries = new Map<string, DirectIpState>();

// Conditional require for Node.js modules — browser-safe
let _httpsModule: any = null;
let _netModule: any = null;

if (typeof window === 'undefined') {
	try {
		_httpsModule = require('https');
	} catch { /* not in Node.js */ }
	try {
		_netModule = require('net');
	} catch { /* not in Node.js */ }
}

// -- Pure helpers (exported for testing) --

export function isHealthy(state: IpState, now?: number): boolean {
	if (state.failedAt === null) return true;
	if (state.failures < FAILURE_THRESHOLD) return true;
	// Unhealthy but past cooldown → ready to retry
	const ts = now ?? Date.now();
	return ts - state.failedAt >= COOLDOWN_MS;
}

export function recordSuccess(): IpState {
	return { failures: 0, failedAt: null };
}

export function recordFailure(state: IpState, now?: number): IpState {
	return {
		failures: state.failures + 1,
		failedAt: now ?? Date.now(),
	};
}

export function isInfraFailure(status: number): boolean {
	return status === 502 || status === 503 || status === 504;
}

export function selectIp(
	ipList: string[],
	ipStates: Map<string, IpState>,
	excludeIp?: string,
	now?: number
): string | null {
	for (const ip of ipList) {
		if (ip === excludeIp) continue;
		const state = ipStates.get(ip);
		if (!state) continue;
		if (isHealthy(state, now)) return ip;
	}
	return null;
}

function isValidIp(ip: string, netMod: any): boolean {
	if (!netMod) return false;
	return netMod.isIP(ip) !== 0;
}

export function validateIps(rawIps: string[], netMod?: any): string[] {
	const mod = netMod ?? _netModule;
	const validated: string[] = [];
	for (const raw of rawIps) {
		const ip = raw.trim();
		if (!ip) continue;

		if (!isValidIp(ip, mod)) {
			console.warn(`API_IP_LIST: "${ip}" is not a valid IP address — skipping`);
			continue;
		}
		if (ip === '169.254.169.254') {
			console.warn(`API_IP_LIST: "${ip}" is a cloud metadata address — skipping`);
			continue;
		}
		validated.push(ip);
	}

	if (validated.length > MAX_IP_COUNT) {
		console.warn(`API_IP_LIST: ${validated.length} IPs provided, capping at ${MAX_IP_COUNT}`);
		return validated.slice(0, MAX_IP_COUNT);
	}
	return validated;
}

export function parseIpListEnvVar(
	envValue: string,
	rootUrl: string,
	netMod?: any
): { hostname: string; ips: string[] } | null {
	if (!envValue || !rootUrl) return null;

	const pipeIndex = envValue.indexOf('|');
	if (pipeIndex === -1) {
		console.warn('API_IP_LIST: invalid format — expected "hostname|ip1,ip2,ip3"');
		return null;
	}

	const expectedHost = envValue.substring(0, pipeIndex).trim();
	const ipsPart = envValue.substring(pipeIndex + 1);

	let rootHost: string;
	try {
		rootHost = new URL(rootUrl).hostname;
	} catch {
		console.warn(`API_IP_LIST: rootUrl "${rootUrl}" is not a valid URL`);
		return null;
	}

	if (expectedHost !== rootHost) {
		console.warn(
			`API_IP_LIST hostname "${expectedHost}" does not match rootUrl "${rootHost}" — ignoring`
		);
		return null;
	}

	const rawIps = ipsPart.split(',');
	const ips = validateIps(rawIps, netMod);

	if (ips.length === 0) return null;

	return { hostname: expectedHost, ips };
}

function validateHostname(hostname: string): void {
	// eslint-disable-next-line no-control-regex
	if (/[\x00-\x1f\x7f]/.test(hostname)) {
		throw new Error('Invalid hostname: contains control characters');
	}
}

function getAgent(ip: string, hostname: string, agents: Map<string, any>, httpsMod: any): any {
	let agent = agents.get(ip);
	if (!agent && httpsMod) {
		agent = new httpsMod.Agent({
			servername: hostname,
			keepAlive: true,
			maxSockets: 10,
		});
		agents.set(ip, agent);
	}
	return agent || undefined;
}

function normaliseKey(hostname: string, ips: string[]): string {
	return hostname + '|' + ips.slice().sort().join(',');
}

function buildHealthEndpoint(healthCheck: HealthCheckConfig): string {
	return `/api/delivery/projects/${encodeURIComponent(healthCheck.projectId)}/contentTypes/image/entries?pageSize=1`;
}

async function checkHealth(
	ip: string,
	fetchFn: FetchFn,
	hostname: string,
	agent: any,
	healthCheck?: HealthCheckConfig
): Promise<boolean> {
	if (!healthCheck || !healthCheck.projectId) return false;

	const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
	const timeout = controller
		? setTimeout(() => controller.abort(), HEALTH_CHECK_TIMEOUT_MS)
		: null;

	try {
		const endpoint = buildHealthEndpoint(healthCheck);
		const url = `https://${ip}${endpoint}`;
		const headers: Record<string, string> = { Host: hostname };
		if (healthCheck.accessToken) {
			headers.accessToken = healthCheck.accessToken;
		}
		const init: any = {
			method: 'GET',
			headers,
		};
		if (agent) init.agent = agent;
		if (controller) init.signal = controller.signal;

		const response = await fetchFn(url, init);
		return response.status === 200;
	} catch {
		return false;
	} finally {
		if (timeout) clearTimeout(timeout);
	}
}

function startHealthChecks(
	state: DirectIpState,
	fetchFn: FetchFn,
	httpsMod: any,
	healthCheck?: HealthCheckConfig
): void {
	const runChecks = async () => {
		const checks = state.ipList.map(async (ip) => {
			const agent = getAgent(ip, state.hostname, state.agents, httpsMod);
			const healthy = await checkHealth(ip, fetchFn, state.hostname, agent, healthCheck);
			if (healthy) {
				state.ipStates.set(ip, recordSuccess());
			} else {
				const current = state.ipStates.get(ip) || { failures: 0, failedAt: null };
				state.ipStates.set(ip, recordFailure(current));
			}
		});
		// Use Promise.all with individual catch to avoid requiring es2020 Promise.allSettled
		await Promise.all(checks.map(function (p) { return p.catch(function () { /* ignore */ }); }));
	};

	// Immediate first check
	runChecks();

	// Periodic checks
	const timer: any = setInterval(runChecks, HEALTH_CHECK_INTERVAL_MS);
	if (timer && typeof timer.unref === 'function') {
		timer.unref();
	}
	state.healthTimer = timer;
}

function destroyState(key: string, state: DirectIpState): void {
	if (state.healthTimer) {
		clearInterval(state.healthTimer);
		state.healthTimer = null;
	}
	state.agents.forEach(function (agent) {
		if (agent && typeof agent.destroy === 'function') {
			agent.destroy();
		}
	});
	state.agents.clear();
	registries.delete(key);
}

export function createDirectIpFetch(
	innerFetch: FetchFn,
	ipListSource: string | string[],
	rootUrl: string,
	deps?: DirectIpDeps,
	healthCheck?: HealthCheckConfig
): DirectIpFetchResult {
	const httpsMod = deps?.httpsModule ?? _httpsModule;
	const netMod = deps?.netModule ?? _netModule;

	// Parse IP list from env var string or Config.ipList array
	let hostname: string;
	let ips: string[];

	if (typeof ipListSource === 'string') {
		// Env var format: "hostname|ip1,ip2,ip3"
		const parsed = parseIpListEnvVar(ipListSource, rootUrl, netMod);
		if (!parsed) {
			return { fetch: innerFetch, state: null };
		}
		hostname = parsed.hostname;
		ips = parsed.ips;
	} else if (Array.isArray(ipListSource)) {
		// Config.ipList: string[]
		if (ipListSource.length === 0) {
			return { fetch: innerFetch, state: null };
		}
		try {
			hostname = new URL(rootUrl).hostname;
		} catch {
			return { fetch: innerFetch, state: null };
		}
		ips = validateIps(ipListSource, netMod);
		if (ips.length === 0) {
			return { fetch: innerFetch, state: null };
		}
	} else {
		return { fetch: innerFetch, state: null };
	}

	// Validate hostname
	validateHostname(hostname);

	// Get or create shared state
	const key = normaliseKey(hostname, ips);
	let state = registries.get(key);

	if (state) {
		state.refCount++;
	} else {
		const ipStates = new Map<string, IpState>();
		// IPs start unhealthy (no data)
		for (const ip of ips) {
			ipStates.set(ip, { failures: FAILURE_THRESHOLD, failedAt: Date.now() });
		}

		state = {
			ipStates,
			ipList: ips,
			hostname,
			agents: new Map(),
			healthTimer: null,
			refCount: 1,
			release: null,
		};

		state.release = () => {
			state.refCount--;
			if (state.refCount <= 0) {
				destroyState(key, state);
			}
		};

		registries.set(key, state);

		// Start health checks
		startHealthChecks(state, innerFetch, httpsMod, healthCheck);
	}

	// Pre-compute origin for URL rewriting
	let originalOrigin: string;
	try {
		const rootParsed = new URL(rootUrl);
		originalOrigin = rootParsed.origin;
	} catch {
		return { fetch: innerFetch, state: null };
	}

	const capturedState = state;

	// The wrapped fetch function
	const directIpFetch: FetchFn = async (url: RequestInfo, init?: RequestInit): Promise<Response> => {
		const urlStr = typeof url === 'string' ? url : (url as Request).url;

		// Only rewrite URLs that match our origin
		if (!urlStr.startsWith(originalOrigin)) {
			return innerFetch(url, init);
		}

		const selectedIp = selectIp(capturedState.ipList, capturedState.ipStates);

		// All IPs unhealthy → DNS fallback
		if (!selectedIp) {
			console.warn(`All direct IPs unhealthy — falling back to DNS for: ${capturedState.hostname}`);
			return innerFetch(url, init);
		}

		const pathAndQuery = urlStr.slice(originalOrigin.length);
		const rewrittenUrl = `https://${selectedIp}${pathAndQuery}`;

		const agent = getAgent(selectedIp, capturedState.hostname, capturedState.agents, httpsMod);
		const fetchInit: any = {
			...(init || {}),
			headers: {
				...(init?.headers || {}),
				Host: capturedState.hostname,
			},
		};
		if (agent) fetchInit.agent = agent;
		// Auth credentials are forwarded over the IP-routed path since these
		// requests go to the same origin server, just via a direct IP

		try {
			const response = await innerFetch(rewrittenUrl, fetchInit);

			if (isInfraFailure(response.status)) {
				capturedState.ipStates.set(selectedIp, recordFailure(
					capturedState.ipStates.get(selectedIp) || { failures: 0, failedAt: null }
				));
				// Try one fallback IP
				return tryFallback(urlStr, pathAndQuery, init, selectedIp, capturedState, httpsMod, innerFetch, originalOrigin, url);
			}

			// Success — record it
			capturedState.ipStates.set(selectedIp, recordSuccess());
			return response;
		} catch {
			// Network error — record failure
			capturedState.ipStates.set(selectedIp, recordFailure(
				capturedState.ipStates.get(selectedIp) || { failures: 0, failedAt: null }
			));
			// Try one fallback IP
			return tryFallback(urlStr, pathAndQuery, init, selectedIp, capturedState, httpsMod, innerFetch, originalOrigin, url);
		}
	};

	return { fetch: directIpFetch, state };
}

async function tryFallback(
	urlStr: string,
	pathAndQuery: string,
	init: RequestInit | undefined,
	failedIp: string,
	state: DirectIpState,
	httpsMod: any,
	innerFetch: FetchFn,
	originalOrigin: string,
	originalUrl: RequestInfo
): Promise<Response> {
	const fallbackIp = selectIp(state.ipList, state.ipStates, failedIp);

	if (fallbackIp) {
		const fallbackUrl = `https://${fallbackIp}${pathAndQuery}`;
		const agent = getAgent(fallbackIp, state.hostname, state.agents, httpsMod);
		const fetchInit: any = {
			...(init || {}),
			headers: {
				...(init?.headers || {}),
				Host: state.hostname,
			},
		};
		if (agent) fetchInit.agent = agent;

		try {
			const response = await innerFetch(fallbackUrl, fetchInit);

			if (isInfraFailure(response.status)) {
				state.ipStates.set(fallbackIp, recordFailure(
					state.ipStates.get(fallbackIp) || { failures: 0, failedAt: null }
				));
			} else {
				state.ipStates.set(fallbackIp, recordSuccess());
				return response;
			}
		} catch {
			state.ipStates.set(fallbackIp, recordFailure(
				state.ipStates.get(fallbackIp) || { failures: 0, failedAt: null }
			));
		}
	}

	// All IPs failed — DNS fallback
	console.warn(`All direct IPs unhealthy — falling back to DNS for: ${state.hostname}`);
	return innerFetch(originalUrl, init);
}

// For testing: reset shared state
export function _resetRegistries(): void {
	registries.forEach(function (state, key) {
		destroyState(key, state);
	});
	registries.clear();
}
