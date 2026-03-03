---
title: Direct IP Routing with Circuit Breaker for Server-Side Block Context
type: feat
date: 2026-02-25
---

# feat: Direct IP Routing with Circuit Breaker for Server-Side Block Context

## Overview

Bypass CDN stale cache when the delivery API is used server-side. Instead of resolving the API endpoint via DNS (which hits the CDN), route requests directly to origin server IPs using health-checked failover. Activation is transparent — set an environment variable in the deployment config and all ~60 customer projects benefit without code changes.

## Problem Statement / Motivation

The Contensis CDN uses Varnish and is invalidated via RabbitMQ messages. These messages have latency that varies by node location. When a page is rendered server-side (inside a "block"), it makes API calls that resolve via DNS to the CDN edge. If the edge cache hasn't yet received the invalidation message, stale content is served and baked into the rendered page — where it remains until that page's cache is also invalidated.

The origin Varnish server receives invalidation messages faster. By routing server-side block requests directly to origin IPs, we avoid the CDN edge staleness window entirely.

## Proposed Solution

### Configuration

**Primary: Environment variable (zero customer changes)**

```
API_IP_LIST=cms.example.com|10.0.0.1,10.0.0.2,10.0.0.3
```

Format: `hostname|ip1,ip2,ip3` — the hostname is validated against the client's `rootUrl`. If they don't match, the IP list is ignored and a warning is logged. This prevents accidentally routing traffic for one API to another's origin servers.

Set this in the deployment environment and all customer projects using this library activate direct IP routing automatically.

**Override: Config interface (per-instance control)**

For customers who need explicit control, `Config.ipList` takes precedence over the env var:

```typescript
const client = Client.create({
    rootUrl: 'https://cms.example.com',
    accessToken: '...',
    ipList: ['10.0.0.1', '10.0.0.2'],  // overrides env var
});
```

Setting `ipList: []` explicitly disables the feature even when the env var is set.

### Behaviour

When activated, the delivery API client wraps its `fetchFn` with a health-check-aware fetch that:

1. Parses and validates the IP list (hostname match + `net.isIP()` per entry)
2. Health-checks each IP via `GET /health` on a 10-second interval (5s timeout per check)
3. Rewrites request URLs to use the highest-priority healthy IP
4. Sets the `Host` header to the original hostname for correct server routing
5. Uses a cached `https.Agent` per IP with custom `servername` for TLS/SNI
6. Real API requests run with no additional timeout (fetch default) — slow queries complete normally
7. On request failure, tries exactly one fallback IP before throwing
8. Falls back to normal DNS resolution (CDN) if all IPs are unhealthy
9. Logs a warning when CDN fallback activates (all IPs unhealthy)

### Architecture Diagram

```
                    Client.create(config)
                           |
                    [Resolve IP list: Config.ipList ?? process.env.API_IP_LIST]
                           |
                    Found ────────── Not found
                     |                    |
              [Parse hostname|ips]    [Normal fetchFn - no changes]
                     |
              [Validate: hostname matches rootUrl?]
                     |
              Yes ────────── No → warn + ignore
               |
              [Validate each IP with net.isIP()]
               |
              [Get/create shared state (module-level Map)]
               |
              [Cache one https.Agent per IP (keepAlive: true)]
               |
              [Wrap fetchFn with directIpFetch]
               |
              [Start health check intervals (unref'd)]
               |
        ┌────────────────────────────────┐
        │      directIpFetch(url, init)  │
        │                                │
        │  1. String-replace hostname    │
        │     with highest-priority      │
        │     healthy IP                 │
        │  2. Set Host header            │
        │  3. Attach cached https.Agent  │
        │  4. No extra timeout (fetch    │
        │     default applies)          │
        │  5. Call inner fetchFn         │
        │  6. On failure → try 1 more IP │
        │  7. All fail → CDN fallback    │
        └────────────────────────────────┘
```

## Technical Considerations

### HTTPS / TLS with Direct IP Routing

Connecting to `https://10.0.0.1/api/...` fails TLS because the certificate is issued for the domain, not the IP. Solution: create a Node.js `https.Agent` with `servername` set to the original hostname. This tells TLS to use the domain for SNI and certificate validation while connecting to the IP.

**Agent caching:** One `https.Agent` is created per IP and cached for the lifetime of the shared state. This enables HTTP keep-alive and TLS session reuse — without caching, every request pays the full TCP+TLS handshake cost (~30-100ms), making the feature *slower* than CDN.

```typescript
import https from 'https';

// One agent per IP, cached, with connection pooling
const agentCache = new Map<string, https.Agent>();

function getAgentForIp(ip: string, hostname: string): https.Agent {
    let agent = agentCache.get(ip);
    if (!agent) {
        agent = new https.Agent({
            servername: hostname,
            keepAlive: true,
            maxSockets: 10,
        });
        agentCache.set(ip, agent);
    }
    return agent;
}
```

**Safety:** `rejectUnauthorized` MUST always be `true` (the default). Certificate validation must never be disabled.

**Fetch compatibility:** The library imports `cross-fetch` (line 15 of `client.ts`), which wraps `node-fetch` v2 in Node.js. In the Node.js code path (no `window`/`self` global), `cross-fetch` is always used as the default fetch — it never falls through to native Node.js fetch. `node-fetch` v2 supports the `agent` option. If a consumer provides a custom `fetchFn` that does not support `agent`, the TLS handshake will fail and the circuit breaker will correctly open, falling back to CDN. This edge case is documented but not blocked.

**Browser bundle and Node module imports:** The `https` and `net` modules are Node.js built-ins that do not exist in browsers. Since the npm build targets CommonJS (`"module": "commonjs"` in tsconfig-npm.json), use conditional `require()` behind a runtime guard — this is synchronous (works in the constructor) and webpack can be configured to ignore or externalise these modules for the browser bundle:

```typescript
// Conditional require — synchronous, safe for constructor, dead-code in browser bundle
const httpsModule = typeof window === 'undefined' ? require('https') : null;
const netModule = typeof window === 'undefined' ? require('net') : null;

function isValidIp(ip: string): boolean {
    return netModule ? netModule.isIP(ip) !== 0 : false;
}
```

This avoids the async gap that `import()` would create (constructor can't `await`) and solves the browser bundle problem for both `https` and `net` imports in one pattern.

### IP State Tracking (Simplified Circuit Breaker)

Instead of a full 3-state machine (CLOSED/OPEN/HALF_OPEN), each IP tracks two fields:

```typescript
interface IpState {
    failures: number;      // consecutive failure count
    failedAt: number | null; // timestamp of last failure, null = healthy
}
```

**Health logic:**
- An IP is **healthy** if `failedAt` is `null` OR `failures < threshold`
- An IP is **unhealthy** if `failures >= threshold` AND `Date.now() - failedAt < cooldownMs`
- An IP is **ready to retry** if `failures >= threshold` AND `Date.now() - failedAt >= cooldownMs`
- A **success** (from health check or real request) resets both fields
- A **failure** increments `failures` and sets `failedAt` to now

This achieves the same result as CLOSED/OPEN/HALF_OPEN with simpler logic and no state machine class. The cooldown period serves the same purpose as the OPEN→HALF_OPEN timeout.

### Health Check Polling

Active health checks poll `GET /health` on each IP every 10 seconds. This is justified by the high-traffic deployment — we don't want the first real user requests to discover an IP is down.

**Implementation details:**
- Health checks run in parallel via `Promise.allSettled()` to prevent stacking
- Health checks use the same `https.Agent` (with correct SNI) and `Host` header as real requests
- Health check timeout: 5 seconds per IP
- A healthy response is HTTP 200 only — response body is NOT parsed (security: prevents payload injection)
- Timers use `timer.unref()` so they don't prevent Node.js process shutdown
- An immediate first health check runs at startup to establish initial state

**Startup behaviour:** IPs start as unhealthy (no data yet). The first health check cycle runs immediately. Until it completes (~5s max), requests fall through to CDN. This avoids the latency cliff of optimistically routing to a potentially unreachable IP.

### Shared State

IP health state and agents are shared across all `Client` instances via a module-level `Map`, keyed by `hostname + '|' + normalised IP list`. This avoids duplicate health checks and timers while isolating state per hostname (preventing cross-tenant contamination in multi-tenant deployments).

```typescript
// Module-level shared state — no singleton class needed
const registries = new Map<string, DirectIpState>();

function normaliseKey(hostname: string, ipListRaw: string): string {
    const ips = ipListRaw.split(',').map(s => s.trim()).filter(Boolean).join(',');
    return `${hostname}|${ips}`;
}
```

Reference counting tracks active clients. When the last client using a registry calls `destroy()`, health check timers are stopped and agents are destroyed.

### Input Validation

**Hostname validation:**
```typescript
const [expectedHost, ipsPart] = envValue.split('|');
const rootHost = new URL(rootUrl).hostname;
if (expectedHost !== rootHost) {
    console.warn(`API_IP_LIST hostname "${expectedHost}" does not match rootUrl "${rootHost}" — ignoring`);
    return; // feature disabled
}
```

**IP validation (SSRF prevention) — applied to both env var and Config.ipList paths:**
```typescript
// Uses conditional require (see "Browser bundle" section)
function validateIps(rawIps: string[]): string[] {
    return rawIps
        .map(s => s.trim())
        .filter(Boolean)
        .filter(ip => {
            if (!isValidIp(ip)) {
                console.warn(`API_IP_LIST: "${ip}" is not a valid IP address — skipping`);
                return false;
            }
            // Reject cloud metadata endpoint (defense-in-depth)
            if (ip === '169.254.169.254') {
                console.warn(`API_IP_LIST: "${ip}" is a cloud metadata address — skipping`);
                return false;
            }
            return true;
        });
}
```

This validation runs regardless of whether IPs come from the env var or `Config.ipList`. It prevents SSRF by rejecting hostnames, URLs, or other non-IP values that could redirect traffic (including auth credentials) to unintended destinations. The cloud metadata address (`169.254.169.254`) is explicitly rejected as there is no legitimate reason to route API calls to it.

**IP list size cap:** The list is capped at 10 IPs. If more are provided, a warning is logged and only the first 10 are used. This prevents pathological configurations from creating excessive agents and health check traffic.

**Host header sanitisation:**
```typescript
if (/[\x00-\x1f\x7f]/.test(hostname)) {
    throw new Error('Invalid hostname: contains control characters');
}
```

### Timeout Strategy

**Health checks only** use a 5-second timeout via `AbortController`. Real API requests have **no additional timeout** — they use the fetch implementation's default, allowing slow but legitimate queries (large searches, complex entry resolution) to complete normally.

```typescript
// Health check — short timeout, synthetic probe
async function checkHealth(ip: string, fetchFn, hostname: string, agent): Promise<boolean> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), HEALTH_CHECK_TIMEOUT_MS);
    try {
        const url = `https://${ip}${HEALTH_ENDPOINT}`;
        const response = await fetchFn(url, {
            headers: { Host: hostname },
            agent,
            signal: controller.signal,
        });
        return response.status === 200;
    } catch {
        return false;
    } finally {
        clearTimeout(timeout);
    }
}

// Real API requests — no extra timeout, run to completion
async function directIpFetch(url: string, init?: RequestInit): Promise<Response> {
    // ... rewrite URL, set Host header, attach agent
    // NO AbortController added — caller's signal (if any) passes through unchanged
    return innerFetch(rewrittenUrl, { ...init, headers, agent });
}
```

**Why this works:** If an IP becomes unreachable, the health check (which runs every 10s with a 5s timeout) detects it within ~15 seconds and marks it unhealthy. Real API requests already in flight to that IP will eventually fail via the fetch default timeout or network error, which is recorded as a failure. But a 12-second search query to a healthy IP completes normally without being aborted.

**Caller's AbortSignal:** Since no timeout AbortController is added to real requests, the caller's own `signal` (if provided in `init`) passes through unchanged. No signal composition needed.

### URL Rewriting (Optimised)

The hostname from `rootUrl` never changes, so it's extracted once at construction time. Per-request rewriting uses a string replacement instead of `new URL()` to avoid object allocation on the hot path:

```typescript
function createDirectIpFetch(innerFetch, ipList, rootUrl) {
    const rootParsed = new URL(rootUrl);
    const originalHost = rootParsed.hostname;
    const originalOrigin = rootParsed.origin; // e.g. "https://cms.example.com"

    return function directIpFetch(url, init) {
        // Prefix replacement — safer than string.replace() which only replaces first occurrence
        // and could theoretically match in query params
        if (url.startsWith(originalOrigin)) {
            const rewritten = `${rootParsed.protocol}//${selectedIp}${url.slice(originalOrigin.length)}`;
            // ...
        }
    };
}
```

### Failure Definition

These count as failures (for both real requests and health checks):
- Network errors (connection refused, timeout, abort, DNS failure)
- HTTP 502, 503, 504 responses

These do **not** count as failures:
- HTTP 4xx (client errors — the server is working, the request is wrong)
- HTTP 500 (application error — server is running, just has a bug)

### CDN Fallback Observability

When all IPs are unhealthy and traffic falls back to CDN, a warning is logged:
```
console.warn('All direct IPs unhealthy — falling back to CDN for: cms.example.com');
```

This is critical for operational visibility. Without it, CDN fallback is silent and the stale-content problem this feature solves would recur without anyone noticing.

### Browser Environment Guard

`process.env` does not exist in browsers. The feature is guarded:
```typescript
const ipListRaw = typeof process !== 'undefined'
    ? process.env?.API_IP_LIST : undefined;
```

This prevents `ReferenceError` in browser bundles and Karma tests. Since `API_IP_LIST` would never be set in a browser environment, the feature naturally remains dormant.

### Relative URL Handling

If `rootUrl` is empty (relative URL mode), there's no hostname to rewrite. The feature is skipped and normal fetch behaviour is used.

## New Files

| File | Purpose |
|------|---------|
| `src/client/direct-ip-fetch.ts` | `createDirectIpFetch()` — wraps a `fetchFn` with IP routing, URL rewriting, Host header, cached https.Agent per IP, health check polling, failover, CDN fallback. Contains `IpState` interface and pure helper functions (`isHealthy()`, `recordSuccess()`, `recordFailure()`, `isInfraFailure()`). Owns the module-level shared state Map. Uses conditional `require('https')` / `require('net')` for Node.js modules. |
| `src/client/direct-ip-fetch.spec.ts` | Unit tests for: state transitions, IP selection, URL rewriting, hostname validation, IP validation (including metadata IP rejection), failover, CDN fallback, health checking, timeout, browser guard, Config.ipList override |

## Modified Files

| File | Change |
|------|--------|
| `src/client/client.ts` | In constructor, resolve IP list (Config then env var), call `createDirectIpFetch()` to wrap `this.fetchFn` before passing to `HttpClient`. Add `destroy()` method that decrements ref count on shared state. |
| `src/models/Config.ts` | Add optional `ipList?: string[]` to the `Config` interface |
| `src/client/client-config.ts` | Add `ipList` to cascading config resolution |
| `src/index.ts` | Export new types if needed for consumers |

**Note:** `destroy()` is added to the `Client` class only, NOT to the `ContensisClient` interface. This avoids a breaking change to mocks and implementations. Consumers who hold a `Client` reference (rather than `ContensisClient`) can call `destroy()` when done. The singleton shared state pattern with reference counting means forgetting to call `destroy()` does not leak timers until the last Client using that registry is discarded.

## Acceptance Criteria

- [x] When `API_IP_LIST` env var is set with matching hostname, API requests route to the highest-priority healthy IP
- [x] `Config.ipList` takes precedence over env var when set
- [x] `Config.ipList: []` explicitly disables the feature
- [x] Env var format is `hostname|ip1,ip2,ip3` — hostname is validated against `rootUrl`
- [x] Mismatched hostname logs a warning and disables the feature (no silent misrouting)
- [x] Each IP is validated with `net.isIP()` — non-IP values are rejected with a warning (both env var and Config.ipList paths)
- [x] Cloud metadata IP `169.254.169.254` is explicitly rejected
- [x] IP list capped at 10 entries with a warning if exceeded
- [x] Host header is validated for control characters including DEL (no CRLF injection)
- [x] `Host` header is set to the original hostname from `rootUrl`
- [x] HTTPS works via cached `https.Agent` per IP with `servername` for SNI and `keepAlive: true`
- [x] `rejectUnauthorized` is never set to `false`
- [x] IP state tracks consecutive failures with cooldown — unhealthy after 3 failures, retryable after 30s
- [x] On request failure, exactly one fallback IP is tried before throwing
- [x] When all IPs are unhealthy, requests fall back to normal DNS (CDN) with a `console.warn`
- [x] When `API_IP_LIST` is not set and `Config.ipList` is not set, zero behavioural change
- [x] Feature does not activate in browser environments
- [x] Health checks run every 10 seconds per IP with 5s timeout, in parallel
- [x] Health checks use correct Host header and https.Agent (same as real requests)
- [x] Health checks only check HTTP 200 status — response body is not parsed
- [x] IPs start unhealthy; first health check cycle runs immediately at startup
- [x] Health check timers use `unref()` to not block Node.js process shutdown
- [x] `Client.destroy()` decrements ref count; last client stops timers and destroys agents
- [x] `destroy()` is on `Client` class only, NOT on `ContensisClient` interface
- [x] IP health state is shared across Client instances, keyed by hostname + normalised IP list
- [x] Auth requests (`/authenticate/connect/token`) also route through direct IPs
- [x] Health checks use a 5s timeout via AbortController
- [x] Real API requests have NO additional timeout — caller's signal passes through unchanged
- [x] URL rewriting uses cached hostname + string replacement (no `new URL()` per request)
- [x] `https` and `net` module imports use conditional `require()` — do not break the webpack browser bundle
- [x] Malformed `API_IP_LIST` (empty entries, whitespace, missing pipe) is handled gracefully
- [x] Relative URLs (no `rootUrl`) bypass IP routing
- [x] Caller's AbortSignal passes through to real API requests unchanged
- [x] Auth credential forwarding over IP-routed path is documented with code comment
- [x] Unit tests cover: state transitions, IP selection, URL rewriting, hostname validation, IP validation (including metadata IP), failover, CDN fallback, health checking, timeout, browser guard, Config.ipList override and disable

## Success Metrics

- Server-side block rendering serves fresh content immediately after cache invalidation (no stale CDN window)
- Zero impact on browser-side or server-side usage when `API_IP_LIST` is not set (feature is dormant)
- Health check overhead is minimal (one `GET /health` per IP every 10s, in parallel)
- Unreachable IPs detected within ~15s by health checks (10s interval + 5s timeout)
- Connection reuse via cached agents reduces per-request overhead vs CDN

## Dependencies & Risks

**Dependencies:**
- Origin servers must expose a `GET /health` endpoint that returns 200 when healthy
- Origin servers must accept HTTPS connections with the domain certificate when connected via IP
- `API_IP_LIST` env var must be set in the server-side deployment environment

**Risks:**

| Risk | Severity | Mitigation |
|------|----------|------------|
| Browser bundle breakage from `https`/`net` imports | High | Conditional `require()` behind `typeof window === 'undefined'` guard; verify browser bundle still builds |
| Custom `fetchFn` doesn't support `agent` option | Medium | Circuit breaker opens, falls back to CDN. Documented as known limitation. |
| Timer leaks if `destroy()` never called | Low | Shared state with ref counting + `unref()` on timers. Timers won't block process exit. |
| Startup: ~5s of CDN fallback before first health check | Low | Acceptable — CDN content may be stale but the window is brief and bounded |
| `cross-fetch` upgrades to `node-fetch` v3+ breaking `agent` | Low | Pin `cross-fetch` version; add test asserting `agent` option is passed through |
| In-flight request to unreachable IP hangs until fetch default timeout | Low | Health checks detect and mark IP unhealthy within ~15s. Subsequent requests avoid it. The in-flight request eventually fails via network error. |

## Implementation Notes

### Configuration Constants

```typescript
const FAILURE_THRESHOLD = 3;          // consecutive failures to mark unhealthy
const COOLDOWN_MS = 30_000;           // ms before retrying an unhealthy IP
const HEALTH_CHECK_INTERVAL_MS = 10_000;  // ms between health check cycles
const HEALTH_CHECK_TIMEOUT_MS = 5_000;    // ms timeout per health check
// No timeout on real API requests — only health checks are timed out
const HEALTH_ENDPOINT = '/health';    // GET endpoint path
```

### IP Selection Strategy

"Highest healthy IP" means: iterate the IP list from first to last (first = highest priority). Return the first IP that is healthy or ready-to-retry. This ensures the preferred IP is always used when healthy, with deterministic fallback order.

### Failover on Request Failure

When a request to IP-A fails:
1. Record failure against IP-A's state
2. Select the next healthy IP (IP-B) from the priority list
3. Retry the request once against IP-B
4. If IP-B also fails, record its failure and fall back to CDN (original URL, no rewrite)
5. If no second IP is available, fall back to CDN directly

### Client Constructor Change

```typescript
// src/client/client.ts — constructor changes
constructor(config: Config = null) {
    this.clientConfig = new ClientConfig(config, Client.defaultClientConfig);
    this.fetchFn = !this.clientConfig.fetchFn ? defaultFetch : this.clientConfig.fetchFn;

    // NEW: Wrap fetchFn for direct IP routing
    // Config.ipList takes precedence over env var.
    // Note: ClientConfig.getValue() returns null for unset fields, so use
    // loose equality (!= null) to distinguish "not set" from "set to []".
    const configIpList = this.clientConfig.ipList;
    const ipListSource = configIpList != null
        ? configIpList                          // Config takes precedence ([] = disabled)
        : (typeof process !== 'undefined'
            ? process.env?.API_IP_LIST           // Env var fallback
            : undefined);

    // createDirectIpFetch accepts string | string[] and handles both formats,
    // validation, and hostname matching internally. Returns innerFetch unchanged
    // if the input is empty/invalid.
    if (ipListSource && this.clientConfig.rootUrl) {
        const result = createDirectIpFetch(
            this.fetchFn,
            ipListSource,
            this.clientConfig.rootUrl
        );
        this.fetchFn = result.fetch;
        this._directIpState = result.state;  // for destroy() ref counting
    }

    this.httpClient = new HttpClient(this, this.fetchFn);
    // ... rest unchanged
}

public destroy(): void {
    // Decrement ref count on shared state; last client stops timers + destroys agents
    if (this._directIpState) {
        this._directIpState.release();
        this._directIpState = null;
    }
}
```

## References & Research

### Internal References
- Client constructor: `src/client/client.ts:52-62`
- Config interface: `src/models/Config.ts:3-15`
- ClientConfig cascading: `src/client/client-config.ts:17-33`
- Fetch resolution (cross-fetch default): `src/client/client.ts:15-18`
- Auth fetch call: `src/client/client.ts:136`
- Test utilities: `src/specs-utils.spec.ts`

### External References
- Node.js `https.Agent` with `servername`: https://nodejs.org/api/https.html#class-httpsagent
- Circuit Breaker pattern: https://martinfowler.com/bliki/CircuitBreaker.html
- `net.isIP()`: https://nodejs.org/api/net.html#netisipinput

### Review Findings Incorporated

**Round 1:**
- Architecture: Config interface override, `destroy()` on Client only, fetchFn wrapping approach validated
- Security: IP validation via `net.isIP()`, hostname validation, Host header sanitisation, no `rejectUnauthorized: false`
- Performance: Cached `https.Agent` per IP with keepAlive, string replacement URL rewriting, 5s AbortController timeout, parallel health checks, `timer.unref()`
- Pattern: Simplified state (no HALF_OPEN), module-level Map instead of singleton class
- Simplicity: Cooldown-based IP state instead of state machine class, env var format includes hostname for safety
- Agent-native: Config.ipList for programmatic control, CDN fallback warning logging

**Round 2:**
- Architecture: Conditional `require()` for `https`/`net` (sync, avoids async gap in constructor), `null` vs `undefined` guard fixed, prefix URL replacement, AbortSignal override documented
- Security: IP validation on both env var and Config paths, cloud metadata IP rejected, IP list capped at 10, DEL character added to host header check
- Simplicity: Single file (ip-state inlined), flattened constructor branch, `createDirectIpFetch` accepts `string | string[]`
