'use strict';

// -- Load .env file if present (no dependencies) --

const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
	const lines = fs.readFileSync(envPath, 'utf8').split('\n');
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const eqIdx = trimmed.indexOf('=');
		if (eqIdx === -1) continue;
		const key = trimmed.substring(0, eqIdx).trim();
		const val = trimmed.substring(eqIdx + 1).trim();
		if (!process.env[key]) {
			process.env[key] = val;
		}
	}
}

// Guard: ensure lib/ has been built
try {
	require('../lib');
} catch (e) {
	console.error('Build the library first: npm run build:npm');
	process.exit(1);
}

const { Client } = require('../lib/client/client');

const POLL_INTERVAL_MS = 3000;

// -- Validate required env vars --

const required = ['CMS_ROOT_URL', 'CMS_ACCESS_TOKEN', 'CMS_PROJECT_ID', 'CMS_CONTENT_TYPE', 'API_IP_LIST'];
const missing = required.filter(k => !process.env[k]);
if (missing.length > 0) {
	console.error('Missing required environment variables: ' + missing.join(', '));
	console.error('\nUsage:');
	console.error('  CMS_ROOT_URL=https://cms.example.com \\');
	console.error('  CMS_ACCESS_TOKEN=your-token \\');
	console.error('  CMS_PROJECT_ID=website \\');
	console.error('  CMS_CONTENT_TYPE=blogPost \\');
	console.error('  API_IP_LIST="cms.example.com|10.0.0.1,10.0.0.2" \\');
	console.error('  npm run test:ip-failover');
	process.exit(1);
}

const rootUrl = process.env.CMS_ROOT_URL;
const accessToken = process.env.CMS_ACCESS_TOKEN;
const projectId = process.env.CMS_PROJECT_ID;
const contentType = process.env.CMS_CONTENT_TYPE;

// -- Create client (API_IP_LIST is read automatically by the library) --

const client = Client.create({ rootUrl, accessToken, projectId });

// -- Parse IP list for banner display --

const ipListRaw = process.env.API_IP_LIST;
const pipeIdx = ipListRaw.indexOf('|');
const ipDisplay = pipeIdx !== -1 ? ipListRaw.substring(pipeIdx + 1).split(',').map(s => s.trim()).join(', ') : ipListRaw;

// -- Startup banner --

console.log('Direct IP Failover Test');
console.log('\u2500'.repeat(23));
console.log('Root URL:     ' + rootUrl);
console.log('Project:      ' + projectId);
console.log('Content Type: ' + contentType);
console.log('IP List:      ' + ipDisplay);
console.log('Interval:     ' + POLL_INTERVAL_MS + 'ms');
console.log('');
console.log('Press Ctrl+C to stop.');
console.log('');

// -- Loop state --

let stopped = false;
let requestCount = 0;

function timestamp() {
	const d = new Date();
	const hh = String(d.getHours()).padStart(2, '0');
	const mm = String(d.getMinutes()).padStart(2, '0');
	const ss = String(d.getSeconds()).padStart(2, '0');
	const ms = String(d.getMilliseconds()).padStart(3, '0');
	return hh + ':' + mm + ':' + ss + '.' + ms;
}

function formatIpStates(status) {
	if (!status) return '\u2014';
	return '[' + status.ips.map(function (s) { return s.ip + ':' + (s.healthy ? 'OK' : 'FAIL'); }).join(' ') + ']';
}

async function runOneRequest() {
	requestCount++;
	const status = client.getDirectIpStatus();
	const selectedIp = (status && status.current) ? status.current : 'DNS';
	const ipStates = formatIpStates(status);

	const start = Date.now();
	try {
		const result = await client.entries.list(contentType);
		const latency = Date.now() - start;
		const count = result && result.items ? result.items.length : 0;
		const label = (status && status.current) ? 'OK  ' : 'WARN';
		console.log('[' + timestamp() + ']  ' + label + '  ' + selectedIp.padEnd(15) + '  ' + ipStates.padEnd(30) + '  ' + String(count).padStart(4) + ' entries  ' + String(latency).padStart(5) + 'ms');
	} catch (err) {
		const latency = Date.now() - start;
		const msg = err && err.message ? err.message : String(err);
		console.log('[' + timestamp() + ']  FAIL  ' + '\u2014'.padEnd(15) + '  ' + ipStates.padEnd(30) + '     0 entries  ' + String(latency).padStart(5) + 'ms  ' + msg);
	}
}

async function loop() {
	while (!stopped) {
		await runOneRequest();
		await new Promise(function (r) { return setTimeout(r, POLL_INTERVAL_MS); });
	}
}

// -- SIGINT handler --

let shuttingDown = false;
process.on('SIGINT', function () {
	if (shuttingDown) return;
	shuttingDown = true;
	stopped = true;
	client.destroy();
	console.log('\nStopped after ' + requestCount + ' requests.');
	process.exit(0);
});

// -- Start --

loop().catch(function (err) {
	console.error('Unexpected error:', err);
	client.destroy();
	process.exit(1);
});
