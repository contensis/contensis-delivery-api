import {
	isHealthy,
	recordSuccess,
	recordFailure,
	isInfraFailure,
	selectIp,
	validateIps,
	parseIpListEnvVar,
	createDirectIpFetch,
	_resetRegistries,
	IpState,
} from './direct-ip-fetch';

// Mock net module for IP validation
const mockNetModule = {
	isIP(input: string): number {
		// Simple IPv4 check
		const parts = input.split('.');
		if (parts.length === 4 && parts.every(p => {
			const n = parseInt(p, 10);
			return !isNaN(n) && n >= 0 && n <= 255 && String(n) === p;
		})) {
			return 4;
		}
		// Simple IPv6 check (just colons)
		if (input.includes(':')) return 6;
		return 0;
	}
};

// Mock https module for agent creation
function createMockHttpsModule() {
	return {
		Agent: class MockAgent {
			options: any;
			destroyed = false;
			constructor(options: any) {
				this.options = options;
			}
			destroy() {
				this.destroyed = true;
			}
		}
	};
}

// Helper to create a mock fetch
function createMockFetch(responses?: Array<{ status: number; ok: boolean } | Error>): any {
	let callIndex = 0;
	const calls: Array<{ url: string; init: any }> = [];

	const fn = (url: string, init?: any) => {
		calls.push({ url, init });
		const resp = responses ? responses[callIndex++] : { status: 200, ok: true };
		if (resp instanceof Error) {
			return Promise.reject(resp);
		}
		return Promise.resolve({
			status: resp.status,
			ok: resp.ok,
			json: () => Promise.resolve({}),
			text: () => Promise.resolve(''),
			headers: new Map(),
		});
	};

	fn.calls = calls;
	return fn;
}

describe('Direct IP Fetch', () => {

	afterEach(() => {
		_resetRegistries();
	});

	describe('isHealthy', () => {
		it('should return true when failedAt is null', () => {
			const state: IpState = { failures: 0, failedAt: null };
			expect(isHealthy(state)).toBe(true);
		});

		it('should return true when failures below threshold', () => {
			const state: IpState = { failures: 2, failedAt: Date.now() };
			expect(isHealthy(state)).toBe(true);
		});

		it('should return false when failures >= threshold and within cooldown', () => {
			const now = Date.now();
			const state: IpState = { failures: 3, failedAt: now };
			expect(isHealthy(state, now + 1000)).toBe(false);
		});

		it('should return true when failures >= threshold but past cooldown', () => {
			const now = Date.now();
			const state: IpState = { failures: 3, failedAt: now - 31_000 };
			expect(isHealthy(state, now)).toBe(true);
		});

		it('should return false at exactly cooldown boundary', () => {
			const now = Date.now();
			const state: IpState = { failures: 3, failedAt: now - 29_999 };
			expect(isHealthy(state, now)).toBe(false);
		});

		it('should return true at exactly cooldown expiry', () => {
			const now = Date.now();
			const state: IpState = { failures: 3, failedAt: now - 30_000 };
			expect(isHealthy(state, now)).toBe(true);
		});
	});

	describe('recordSuccess', () => {
		it('should reset failures and failedAt', () => {
			const result = recordSuccess();
			expect(result.failures).toBe(0);
			expect(result.failedAt).toBeNull();
		});
	});

	describe('recordFailure', () => {
		it('should increment failures and set failedAt', () => {
			const state: IpState = { failures: 1, failedAt: null };
			const now = 1000000;
			const result = recordFailure(state, now);
			expect(result.failures).toBe(2);
			expect(result.failedAt).toBe(1000000);
		});

		it('should increment from zero', () => {
			const state: IpState = { failures: 0, failedAt: null };
			const result = recordFailure(state, 500);
			expect(result.failures).toBe(1);
			expect(result.failedAt).toBe(500);
		});
	});

	describe('isInfraFailure', () => {
		it('should return true for 502', () => {
			expect(isInfraFailure(502)).toBe(true);
		});

		it('should return true for 503', () => {
			expect(isInfraFailure(503)).toBe(true);
		});

		it('should return true for 504', () => {
			expect(isInfraFailure(504)).toBe(true);
		});

		it('should return false for 200', () => {
			expect(isInfraFailure(200)).toBe(false);
		});

		it('should return false for 404', () => {
			expect(isInfraFailure(404)).toBe(false);
		});

		it('should return false for 500', () => {
			expect(isInfraFailure(500)).toBe(false);
		});

		it('should return false for 501', () => {
			expect(isInfraFailure(501)).toBe(false);
		});
	});

	describe('selectIp', () => {
		it('should select the first healthy IP', () => {
			const ipList = ['10.0.0.1', '10.0.0.2', '10.0.0.3'];
			const states = new Map<string, IpState>();
			states.set('10.0.0.1', { failures: 0, failedAt: null });
			states.set('10.0.0.2', { failures: 0, failedAt: null });
			states.set('10.0.0.3', { failures: 0, failedAt: null });

			expect(selectIp(ipList, states)).toBe('10.0.0.1');
		});

		it('should skip unhealthy IPs', () => {
			const now = Date.now();
			const ipList = ['10.0.0.1', '10.0.0.2', '10.0.0.3'];
			const states = new Map<string, IpState>();
			states.set('10.0.0.1', { failures: 3, failedAt: now });
			states.set('10.0.0.2', { failures: 0, failedAt: null });
			states.set('10.0.0.3', { failures: 0, failedAt: null });

			expect(selectIp(ipList, states, undefined, now + 1000)).toBe('10.0.0.2');
		});

		it('should exclude specified IP', () => {
			const ipList = ['10.0.0.1', '10.0.0.2'];
			const states = new Map<string, IpState>();
			states.set('10.0.0.1', { failures: 0, failedAt: null });
			states.set('10.0.0.2', { failures: 0, failedAt: null });

			expect(selectIp(ipList, states, '10.0.0.1')).toBe('10.0.0.2');
		});

		it('should return null when all IPs are unhealthy', () => {
			const now = Date.now();
			const ipList = ['10.0.0.1', '10.0.0.2'];
			const states = new Map<string, IpState>();
			states.set('10.0.0.1', { failures: 3, failedAt: now });
			states.set('10.0.0.2', { failures: 3, failedAt: now });

			expect(selectIp(ipList, states, undefined, now + 1000)).toBeNull();
		});

		it('should select IP past cooldown for retry', () => {
			const now = Date.now();
			const ipList = ['10.0.0.1', '10.0.0.2'];
			const states = new Map<string, IpState>();
			states.set('10.0.0.1', { failures: 3, failedAt: now - 31_000 });
			states.set('10.0.0.2', { failures: 3, failedAt: now });

			expect(selectIp(ipList, states, undefined, now)).toBe('10.0.0.1');
		});

		it('should return null when no IPs have state', () => {
			const ipList = ['10.0.0.1'];
			const states = new Map<string, IpState>();

			expect(selectIp(ipList, states)).toBeNull();
		});
	});

	describe('validateIps', () => {
		it('should accept valid IPv4 addresses', () => {
			const result = validateIps(['10.0.0.1', '192.168.1.1'], mockNetModule);
			expect(result).toEqual(['10.0.0.1', '192.168.1.1']);
		});

		it('should reject non-IP values', () => {
			spyOn(console, 'warn');
			const result = validateIps(['not-an-ip', '10.0.0.1'], mockNetModule);
			expect(result).toEqual(['10.0.0.1']);
			expect(console.warn).toHaveBeenCalled();
		});

		it('should reject cloud metadata IP', () => {
			spyOn(console, 'warn');
			const result = validateIps(['169.254.169.254', '10.0.0.1'], mockNetModule);
			expect(result).toEqual(['10.0.0.1']);
			expect(console.warn).toHaveBeenCalledWith(
				jasmine.stringContaining('cloud metadata')
			);
		});

		it('should skip empty entries', () => {
			const result = validateIps(['', '  ', '10.0.0.1'], mockNetModule);
			expect(result).toEqual(['10.0.0.1']);
		});

		it('should trim whitespace', () => {
			const result = validateIps([' 10.0.0.1 '], mockNetModule);
			expect(result).toEqual(['10.0.0.1']);
		});

		it('should cap at 10 IPs', () => {
			spyOn(console, 'warn');
			const ips = Array.from({ length: 12 }, (_, i) => `10.0.0.${i + 1}`);
			const result = validateIps(ips, mockNetModule);
			expect(result.length).toBe(10);
			expect(console.warn).toHaveBeenCalledWith(
				jasmine.stringContaining('capping at 10')
			);
		});

		it('should return empty array when no valid IPs', () => {
			spyOn(console, 'warn');
			const result = validateIps(['not-ip', 'also-not'], mockNetModule);
			expect(result).toEqual([]);
		});

		it('should return all IPs as invalid when netModule is null', () => {
			spyOn(console, 'warn');
			const result = validateIps(['10.0.0.1'], null);
			expect(result).toEqual([]);
		});
	});

	describe('parseIpListEnvVar', () => {
		it('should parse valid env var value', () => {
			const result = parseIpListEnvVar(
				'cms.example.com|10.0.0.1,10.0.0.2',
				'https://cms.example.com/api',
				mockNetModule
			);
			expect(result).toEqual({
				hostname: 'cms.example.com',
				ips: ['10.0.0.1', '10.0.0.2']
			});
		});

		it('should return null for empty value', () => {
			expect(parseIpListEnvVar('', 'https://cms.example.com', mockNetModule)).toBeNull();
		});

		it('should return null for missing rootUrl', () => {
			expect(parseIpListEnvVar('host|10.0.0.1', '', mockNetModule)).toBeNull();
		});

		it('should return null for missing pipe separator', () => {
			spyOn(console, 'warn');
			expect(parseIpListEnvVar('10.0.0.1', 'https://cms.example.com', mockNetModule)).toBeNull();
			expect(console.warn).toHaveBeenCalledWith(
				jasmine.stringContaining('invalid format')
			);
		});

		it('should return null for hostname mismatch', () => {
			spyOn(console, 'warn');
			const result = parseIpListEnvVar(
				'other.example.com|10.0.0.1',
				'https://cms.example.com',
				mockNetModule
			);
			expect(result).toBeNull();
			expect(console.warn).toHaveBeenCalledWith(
				jasmine.stringContaining('does not match')
			);
		});

		it('should return null for invalid rootUrl', () => {
			spyOn(console, 'warn');
			const result = parseIpListEnvVar('host|10.0.0.1', 'not-a-url', mockNetModule);
			expect(result).toBeNull();
		});

		it('should return null when all IPs are invalid', () => {
			spyOn(console, 'warn');
			const result = parseIpListEnvVar(
				'cms.example.com|not-an-ip',
				'https://cms.example.com',
				mockNetModule
			);
			expect(result).toBeNull();
		});

		it('should trim hostname and IPs', () => {
			const result = parseIpListEnvVar(
				' cms.example.com | 10.0.0.1 , 10.0.0.2 ',
				'https://cms.example.com',
				mockNetModule
			);
			expect(result).toEqual({
				hostname: 'cms.example.com',
				ips: ['10.0.0.1', '10.0.0.2']
			});
		});
	});

	describe('createDirectIpFetch', () => {
		const mockDeps = {
			httpsModule: createMockHttpsModule(),
			netModule: mockNetModule,
		};

		it('should return inner fetch unchanged when ipListSource is empty string', () => {
			const innerFetch = createMockFetch();
			const result = createDirectIpFetch(innerFetch, '', 'https://cms.example.com', mockDeps);
			expect(result.fetch).toBe(innerFetch);
			expect(result.state).toBeNull();
		});

		it('should return inner fetch unchanged when ipListSource is empty array', () => {
			const innerFetch = createMockFetch();
			const result = createDirectIpFetch(innerFetch, [], 'https://cms.example.com', mockDeps);
			expect(result.fetch).toBe(innerFetch);
			expect(result.state).toBeNull();
		});

		it('should return inner fetch unchanged when hostname does not match', () => {
			spyOn(console, 'warn');
			const innerFetch = createMockFetch();
			const result = createDirectIpFetch(
				innerFetch,
				'other.example.com|10.0.0.1',
				'https://cms.example.com',
				mockDeps
			);
			expect(result.fetch).toBe(innerFetch);
			expect(result.state).toBeNull();
		});

		it('should create wrapped fetch for valid env var string', () => {
			const innerFetch = createMockFetch([{ status: 200, ok: true }]);
			const result = createDirectIpFetch(
				innerFetch,
				'cms.example.com|10.0.0.1',
				'https://cms.example.com',
				mockDeps
			);
			expect(result.fetch).not.toBe(innerFetch);
			expect(result.state).not.toBeNull();
			expect(result.state.ipList).toEqual(['10.0.0.1']);
			expect(result.state.hostname).toBe('cms.example.com');
		});

		it('should create wrapped fetch for Config.ipList array', () => {
			const innerFetch = createMockFetch([{ status: 200, ok: true }]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1', '10.0.0.2'],
				'https://cms.example.com',
				mockDeps
			);
			expect(result.fetch).not.toBe(innerFetch);
			expect(result.state).not.toBeNull();
			expect(result.state.ipList).toEqual(['10.0.0.1', '10.0.0.2']);
		});

		it('should share state between instances with same key', () => {
			const fetch1 = createMockFetch([{ status: 200, ok: true }]);
			const fetch2 = createMockFetch([{ status: 200, ok: true }]);

			const result1 = createDirectIpFetch(
				fetch1,
				'cms.example.com|10.0.0.1',
				'https://cms.example.com',
				mockDeps
			);
			const result2 = createDirectIpFetch(
				fetch2,
				'cms.example.com|10.0.0.1',
				'https://cms.example.com',
				mockDeps
			);

			expect(result1.state).toBe(result2.state);
			expect(result1.state.refCount).toBe(2);
		});

		it('should decrement refCount on release', () => {
			const innerFetch = createMockFetch([{ status: 200, ok: true }]);
			const result = createDirectIpFetch(
				innerFetch,
				'cms.example.com|10.0.0.1',
				'https://cms.example.com',
				mockDeps
			);
			expect(result.state.refCount).toBe(1);
			result.state.release();
			expect(result.state.refCount).toBe(0);
		});

		it('should reject hostname with control characters via validateHostname', () => {
			const innerFetch = createMockFetch();
			// Test the direct path where Config.ipList is used and hostname is manually
			// constructed. With a null byte in rootUrl, URL parsing typically throws,
			// so the function should return inner fetch unchanged (graceful degradation).
			spyOn(console, 'warn');
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1'],
				'not-a-valid-url\x00',
				mockDeps
			);
			expect(result.fetch).toBe(innerFetch);
			expect(result.state).toBeNull();
		});

		it('should return inner fetch unchanged when rootUrl is empty', () => {
			const innerFetch = createMockFetch();
			const result = createDirectIpFetch(innerFetch, ['10.0.0.1'], '', mockDeps);
			expect(result.fetch).toBe(innerFetch);
		});
	});

	describe('directIpFetch (wrapped function)', () => {
		const mockDeps = {
			httpsModule: createMockHttpsModule(),
			netModule: mockNetModule,
		};

		it('should rewrite URL to use IP and set Host header', async () => {
			const innerFetch = createMockFetch([
				{ status: 200, ok: true },  // actual request
			]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1'],
				'https://cms.example.com',
				mockDeps
			);

			// Mark IP as healthy
			result.state.ipStates.set('10.0.0.1', { failures: 0, failedAt: null });

			await result.fetch('https://cms.example.com/api/delivery/projects/myProject/entries');

			// Find the API call (not health check)
			const apiCall = innerFetch.calls.find(c => c.url.includes('/api/'));
			expect(apiCall).toBeDefined();
			expect(apiCall.url).toBe('https://10.0.0.1/api/delivery/projects/myProject/entries');
			expect(apiCall.init.headers.Host).toBe('cms.example.com');
		});

		it('should pass through non-matching URLs unchanged', async () => {
			const innerFetch = createMockFetch([
				{ status: 200, ok: true },  // actual request
			]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1'],
				'https://cms.example.com',
				mockDeps
			);

			result.state.ipStates.set('10.0.0.1', { failures: 0, failedAt: null });

			await result.fetch('https://other-site.com/api/something');

			const otherCall = innerFetch.calls.find(c => c.url.includes('other-site'));
			expect(otherCall).toBeDefined();
			expect(otherCall.url).toBe('https://other-site.com/api/something');
		});

		it('should fall back to DNS when all IPs are unhealthy', async () => {
			spyOn(console, 'warn');
			const innerFetch = createMockFetch([
				{ status: 200, ok: true },  // DNS fallback
			]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1'],
				'https://cms.example.com',
				mockDeps
			);

			// Mark IP as unhealthy
			const now = Date.now();
			result.state.ipStates.set('10.0.0.1', { failures: 3, failedAt: now });

			await result.fetch('https://cms.example.com/api/test');

			// Should have warned about DNS fallback
			expect(console.warn).toHaveBeenCalledWith(
				jasmine.stringContaining('falling back to DNS')
			);

			// The last call should be the original URL (DNS fallback)
			const lastCall = innerFetch.calls[innerFetch.calls.length - 1];
			expect(lastCall.url).toBe('https://cms.example.com/api/test');
		});

		it('should try fallback IP on network error', async () => {
			const responses: Array<{ status: number; ok: boolean } | Error> = [
				new Error('ECONNREFUSED'),  // first IP fails
				{ status: 200, ok: true },  // fallback IP succeeds
			];
			const innerFetch = createMockFetch(responses);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1', '10.0.0.2'],
				'https://cms.example.com',
				mockDeps
			);

			// Mark both IPs as healthy
			result.state.ipStates.set('10.0.0.1', { failures: 0, failedAt: null });
			result.state.ipStates.set('10.0.0.2', { failures: 0, failedAt: null });

			const response = await result.fetch('https://cms.example.com/api/test');

			expect(response.status).toBe(200);
			// First IP should have been tried (10.0.0.1)
			const failedCall = innerFetch.calls.find(c => c.url.includes('10.0.0.1') && c.url.includes('/api/'));
			expect(failedCall).toBeDefined();
			// Fallback should have tried second IP
			const fallbackCall = innerFetch.calls.find(c => c.url.includes('10.0.0.2') && c.url.includes('/api/'));
			expect(fallbackCall).toBeDefined();
		});

		it('should try fallback IP on 502/503/504', async () => {
			const innerFetch = createMockFetch([
				{ status: 503, ok: false }, // first IP returns 503
				{ status: 200, ok: true },  // fallback IP succeeds
			]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1', '10.0.0.2'],
				'https://cms.example.com',
				mockDeps
			);

			result.state.ipStates.set('10.0.0.1', { failures: 0, failedAt: null });
			result.state.ipStates.set('10.0.0.2', { failures: 0, failedAt: null });

			const response = await result.fetch('https://cms.example.com/api/test');

			expect(response.status).toBe(200);
		});

		it('should fall back to DNS when all IPs fail', async () => {
			spyOn(console, 'warn');
			const innerFetch = createMockFetch([
				new Error('ECONNREFUSED'),  // first IP
				new Error('ECONNREFUSED'),  // second IP
				{ status: 200, ok: true },  // DNS fallback
			]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1', '10.0.0.2'],
				'https://cms.example.com',
				mockDeps
			);

			result.state.ipStates.set('10.0.0.1', { failures: 0, failedAt: null });
			result.state.ipStates.set('10.0.0.2', { failures: 0, failedAt: null });

			const response = await result.fetch('https://cms.example.com/api/test');

			expect(response.status).toBe(200);
			expect(console.warn).toHaveBeenCalledWith(
				jasmine.stringContaining('falling back to DNS')
			);
		});

		it('should not add extra timeout to real requests', async () => {
			const innerFetch = createMockFetch([
				{ status: 200, ok: true },  // actual request
			]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1'],
				'https://cms.example.com',
				mockDeps
			);

			result.state.ipStates.set('10.0.0.1', { failures: 0, failedAt: null });

			await result.fetch('https://cms.example.com/api/test', { headers: { 'X-Custom': 'value' } });

			const apiCall = innerFetch.calls.find(c => c.url.includes('10.0.0.1') && c.url.includes('/api/'));
			expect(apiCall).toBeDefined();
			// No signal should be added by us (caller didn't pass one)
			expect(apiCall.init.signal).toBeUndefined();
		});

		it('should preserve caller AbortSignal on real requests', async () => {
			const innerFetch = createMockFetch([
				{ status: 200, ok: true },  // actual request
			]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1'],
				'https://cms.example.com',
				mockDeps
			);

			result.state.ipStates.set('10.0.0.1', { failures: 0, failedAt: null });

			const controller = new AbortController();
			await result.fetch('https://cms.example.com/api/test', { signal: controller.signal });

			const apiCall = innerFetch.calls.find(c => c.url.includes('10.0.0.1') && c.url.includes('/api/'));
			expect(apiCall).toBeDefined();
			expect(apiCall.init.signal).toBe(controller.signal);
		});

		it('should record success on successful IP response', async () => {
			const innerFetch = createMockFetch([
				{ status: 200, ok: true },  // actual request
			]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1'],
				'https://cms.example.com',
				mockDeps
			);

			result.state.ipStates.set('10.0.0.1', { failures: 1, failedAt: Date.now() });

			await result.fetch('https://cms.example.com/api/test');

			const ipState = result.state.ipStates.get('10.0.0.1');
			expect(ipState.failures).toBe(0);
			expect(ipState.failedAt).toBeNull();
		});

		it('should not count 404 as failure', async () => {
			const innerFetch = createMockFetch([
				{ status: 404, ok: false }, // actual request - client error
			]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1'],
				'https://cms.example.com',
				mockDeps
			);

			result.state.ipStates.set('10.0.0.1', { failures: 0, failedAt: null });

			await result.fetch('https://cms.example.com/api/test');

			const ipState = result.state.ipStates.get('10.0.0.1');
			expect(ipState.failures).toBe(0);
		});

		it('should not count 500 as infra failure', async () => {
			const innerFetch = createMockFetch([
				{ status: 500, ok: false }, // actual request - app error
			]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1'],
				'https://cms.example.com',
				mockDeps
			);

			result.state.ipStates.set('10.0.0.1', { failures: 0, failedAt: null });

			await result.fetch('https://cms.example.com/api/test');

			const ipState = result.state.ipStates.get('10.0.0.1');
			expect(ipState.failures).toBe(0);
		});

		it('should handle URL with port correctly', async () => {
			const innerFetch = createMockFetch([
				{ status: 200, ok: true },  // actual request
			]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1'],
				'https://cms.example.com:8443',
				mockDeps
			);

			result.state.ipStates.set('10.0.0.1', { failures: 0, failedAt: null });

			await result.fetch('https://cms.example.com:8443/api/test');

			const apiCall = innerFetch.calls.find(c => c.url.includes('10.0.0.1') && c.url.includes('/api/'));
			expect(apiCall).toBeDefined();
			expect(apiCall.url).toBe('https://10.0.0.1/api/test');
		});

		it('should preserve query parameters during URL rewrite', async () => {
			const innerFetch = createMockFetch([
				{ status: 200, ok: true },  // actual request
			]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1'],
				'https://cms.example.com',
				mockDeps
			);

			result.state.ipStates.set('10.0.0.1', { failures: 0, failedAt: null });

			await result.fetch('https://cms.example.com/api/test?pageSize=25&lang=en-US');

			const apiCall = innerFetch.calls.find(c => c.url.includes('10.0.0.1') && c.url.includes('/api/'));
			expect(apiCall).toBeDefined();
			expect(apiCall.url).toBe('https://10.0.0.1/api/test?pageSize=25&lang=en-US');
		});

		it('should attach https agent when available', async () => {
			const innerFetch = createMockFetch([
				{ status: 200, ok: true },  // actual request
			]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1'],
				'https://cms.example.com',
				mockDeps
			);

			result.state.ipStates.set('10.0.0.1', { failures: 0, failedAt: null });

			await result.fetch('https://cms.example.com/api/test');

			const apiCall = innerFetch.calls.find(c => c.url.includes('10.0.0.1') && c.url.includes('/api/'));
			expect(apiCall).toBeDefined();
			expect(apiCall.init.agent).toBeDefined();
			expect(apiCall.init.agent.options.servername).toBe('cms.example.com');
			expect(apiCall.init.agent.options.keepAlive).toBe(true);
		});
	});

	describe('Config.ipList override', () => {
		const mockDeps = {
			httpsModule: createMockHttpsModule(),
			netModule: mockNetModule,
		};

		it('should accept Config.ipList array directly', () => {
			const innerFetch = createMockFetch([{ status: 200, ok: true }]);
			const result = createDirectIpFetch(
				innerFetch,
				['10.0.0.1', '10.0.0.2'],
				'https://cms.example.com',
				mockDeps
			);

			expect(result.state).not.toBeNull();
			expect(result.state.ipList).toEqual(['10.0.0.1', '10.0.0.2']);
		});

		it('should disable feature when Config.ipList is empty array', () => {
			const innerFetch = createMockFetch();
			const result = createDirectIpFetch(innerFetch, [], 'https://cms.example.com', mockDeps);
			expect(result.fetch).toBe(innerFetch);
			expect(result.state).toBeNull();
		});

		it('should validate Config.ipList IPs the same as env var IPs', () => {
			spyOn(console, 'warn');
			const innerFetch = createMockFetch();
			const result = createDirectIpFetch(
				innerFetch,
				['not-an-ip', '169.254.169.254'],
				'https://cms.example.com',
				mockDeps
			);
			expect(result.fetch).toBe(innerFetch);
			expect(result.state).toBeNull();
		});
	});
});
