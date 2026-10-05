// Karma configuration
// Generated on Tue Jun 27 2017 13:36:04 GMT+0100 (GMT Daylight Time)
var webpackConfig = require('./webpack.test.config');

// Headless environments (containers, CI agents) have no desktop Chrome, so they
// must use the headless launcher. Switch explicitly with KARMA_HEADLESS=true, or
// implicitly via the standard CI variable (GitHub Actions, GitLab CI, Jenkins, ...).
// Everything else is treated as a desktop dev machine and gets plain Chrome.
var isHeadless = process.env.KARMA_HEADLESS === 'true' || /^(1|true|yes|on)$/.test((process.env.CI || '').toLowerCase());

module.exports = function (config) {
	let originalConfig = {
		client: {
			args: ['--test-target', config.testTarget],
			jasmine: {
				// timeoutInterval:  1000
				// timeoutInterval: 60 * 60 * 1000
			}
		},

		basePath: '',

		frameworks: ['webpack', 'jasmine'],

		files: [{
			pattern: './testing/karma-test-shim.js',
			watched: false
		}],

		preprocessors: {
			'./testing/karma-test-shim.js': ['webpack', 'sourcemap']
		},

		webpack: webpackConfig,

		webpackServer: {
			noInfo: true
		},

		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
		},

		reporters: ['kjhtml', 'mocha', 'coverage'],

		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: [isHeadless ? 'ChromeHeadlessNoSandbox' : 'Chrome'],
		customLaunchers: {
			ChromeHeadlessNoSandbox: {
				base: 'ChromeHeadless',
				flags: ['--no-sandbox', '--disable-dev-shm-usage'],
			},
		},
		browserDisconnectTimeout : 0,
		browserNoActivityTimeout : 0,		
		singleRun: true,
		concurrency: Infinity
	};

	if (config.testTarget === 'npm') {
		
		originalConfig.files = [{
			pattern: './testing/karma-test-shim-npm.js',
			watched: false
		}];

		originalConfig.preprocessors = {
			'./testing/karma-test-shim-npm.js': ['webpack', 'sourcemap']
		};

	}

	config.set(originalConfig);
}