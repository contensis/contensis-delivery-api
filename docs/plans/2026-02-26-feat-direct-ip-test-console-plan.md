---
title: "feat: Direct IP failover test console"
type: feat
date: 2026-02-26
---

# feat: Direct IP Failover Test Console

## Overview

A small Node.js script in `test-ip-failover/` that exercises the direct IP routing feature in a real loop. It repeatedly calls `client.entries.list()` on a timed interval, printing a one-liner status per request so you can observe failover behaviour in real time while breaking network routes to specific IPs externally.

## Motivation

The 60 unit tests in `direct-ip-fetch.spec.ts` cover logic correctness, but don't exercise the feature against a real CMS with real network conditions. This console app lets you:
- Verify IP routing works end-to-end against a live environment
- Observe failover by blocking IPs with firewall rules (e.g. `sudo pfctl`, `iptables`)
- Confirm DNS fallback (normal hostname routing) when all direct IPs are down
- Watch health check recovery after restoring routes

## Configuration

All via environment variables — no config files:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `CMS_ROOT_URL` | Yes | CMS root URL | `https://cms.example.com` |
| `CMS_ACCESS_TOKEN` | Yes | Delivery API access token | `QCpZfrEfkfMC...` |
| `CMS_PROJECT_ID` | Yes | Project ID | `website` |
| `CMS_CONTENT_TYPE` | Yes | Content type to list | `blogPost` |
| `API_IP_LIST` | Yes | IP routing config | `cms.example.com\|10.0.0.1,10.0.0.2` |

Poll interval is hardcoded to 3000ms. Edit the constant in the script if needed.

## Console Output

Each request prints a single line with full IP state visibility:

```
[14:23:45.123]  OK   10.0.0.1  [10.0.0.1:OK  10.0.0.2:OK]    42 entries  123ms
[14:23:48.130]  OK   10.0.0.1  [10.0.0.1:OK  10.0.0.2:FAIL]  42 entries   98ms
[14:23:51.115]  OK   10.0.0.2  [10.0.0.1:FAIL 10.0.0.2:OK]   42 entries  145ms
[14:23:54.220]  WARN DNS       [10.0.0.1:FAIL 10.0.0.2:FAIL]  42 entries  210ms
[14:23:57.340]  FAIL —         [10.0.0.1:FAIL 10.0.0.2:FAIL]   0 entries    0ms
```

Format: `[HH:MM:SS.mmm]  STATUS  SELECTED_IP  [ip_states]  count entries  latencyms`

- **OK** — successful response via direct IP
- **WARN** — successful response but via normal hostname/DNS (all direct IPs unhealthy)
- **FAIL** — request threw an error

The `[ip_states]` column shows the health of every configured IP at the time of the request, obtained via the new `client.getDirectIpStatus()` public API method (see below).

The library's own `console.warn()` messages (e.g. `All direct IPs unhealthy — falling back to DNS for: ...`) will appear interleaved, providing additional context.

### Startup Banner

On startup, print config summary:

```
Direct IP Failover Test
───────────────────────
Root URL:     https://cms.example.com
Project:      website
Content Type: blogPost
IP List:      10.0.0.1, 10.0.0.2
Interval:     3000ms

Press Ctrl+C to stop.
```

### Shutdown

On SIGINT, print request count and exit:

```
Stopped after 100 requests.
```

## Library Change: `client.getDirectIpStatus()`

To give the test console (and production monitoring) clean access to IP health state, add a public read-only method to `Client`:

### `src/client/client.ts`

```typescript
import { selectIp, isHealthy } from './direct-ip-fetch';

public getDirectIpStatus(): { current: string | null, ips: { ip: string, healthy: boolean }[] } | null {
    if (!this._directIpState) return null;
    return {
        current: selectIp(this._directIpState.ipList, this._directIpState.ipStates),
        ips: this._directIpState.ipList.map(ip => ({
            ip,
            healthy: isHealthy(this._directIpState.ipStates.get(ip)),
        })),
    };
}
```

- Returns `null` when IP routing is not active
- `current` — the IP that would be selected for the next request (or `null` if all unhealthy → DNS fallback)
- `ips` — health snapshot of every configured IP
- Uses already-exported pure functions (`selectIp`, `isHealthy`) — no new internal coupling

### `src/models/ContensisClient.ts`

Add to the `ContensisClient` interface:

```typescript
getDirectIpStatus(): { current: string | null, ips: { ip: string, healthy: boolean }[] } | null;
```

### Usage in test console

```js
const status = client.getDirectIpStatus();
const selectedIp = status?.current || 'DNS';
const ipStates = status?.ips.map(s => `${s.ip}:${s.healthy ? 'OK' : 'FAIL'}`).join(' ') || '—';
```

## Technical Approach

### Architecture

Single plain JavaScript file (`test-ip-failover/index.js`) that:
1. Guards against missing `lib/` build with a clear error message
2. Reads env vars, validates required ones are present (fail fast)
3. Requires the local library from `../lib` (the CommonJS build)
4. Creates a `Client` with `rootUrl`, `accessToken`, `projectId`, and lets `API_IP_LIST` env var activate IP routing automatically
5. Runs an async `while` loop with `await` + `setTimeout` (not `setInterval` — prevents overlapping requests)
6. Each iteration: snapshot IP status, call `client.entries.list(contentType)`, measure latency, print status line
7. All exceptions inside the loop are caught, printed as FAIL, and the loop continues
8. Handles SIGINT: calls `client.destroy()`, prints request count, exits

### Why plain JS (not TypeScript)

- Zero compile step — just `node test-ip-failover/index.js`
- Uses the built `lib/` output which is already CommonJS JS
- This is a throwaway test tool, not library code

### Why `setTimeout` loop (not `setInterval`)

`setInterval` fires regardless of whether the previous request resolved. If the CMS is slow, requests overlap and console output interleaves unpredictably. An async `while` loop guarantees sequential execution:

```js
while (!stopped) {
    await runOneRequest();
    await new Promise(r => setTimeout(r, 3000));
}
```

### File Structure

```
test-ip-failover/
└── index.js        # Single entry point (~80-90 lines)
```

### npm Script

```json
"test:ip-failover": "node test-ip-failover/index.js"
```

## Acceptance Criteria

### Library changes

- [x] `Client.getDirectIpStatus()` method added returning `{ current, ips }` or `null`
- [x] `ContensisClient` interface updated with method signature
- [x] Existing tests still pass (method returns `null` when IP routing inactive)

### Test console

- [x] `test-ip-failover/index.js` exists and runs with `npm run test:ip-failover`
- [x] Guards against missing `lib/` build with helpful error message
- [x] Fails fast with clear error if any required env var is missing
- [x] Prints startup banner with config summary
- [x] Loops every 3s calling `client.entries.list()` using async/await (no overlapping requests)
- [x] Each request prints one-liner: timestamp, status (OK/WARN/FAIL), selected IP, IP health states, entry count, latency
- [x] Library `console.warn` messages visible (not suppressed)
- [x] SIGINT handler calls `client.destroy()`, prints request count, exits
- [x] `package.json` has `"test:ip-failover"` script
- [x] Works with the local `lib/` build
- [x] All exceptions in the loop are caught and printed, never crash the process

## References

- Direct IP routing module: `src/client/direct-ip-fetch.ts`
- Client constructor (IP integration): `src/client/client.ts:57-89`
- Entry list API: `src/entries/entry-operations.ts:66-80`
- Solution doc: `docs/solutions/integration-issues/direct-ip-routing-cdn-bypass.md`
- PR #53: Direct IP routing implementation
