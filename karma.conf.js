// Karma configuration
// Generated on Tue Jun 27 2017 13:36:04 GMT+0100 (GMT Daylight Time)
var webpackConfig = require('./webpack.test.config');

module.exports = function (config) {
	let originalConfig = {
		client: {
			args: ['--test-target', config.testTarget]
		},

		basePath: '',

		frameworks: ['jasmine', 'webpack'],

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
		browsers: ['Chrome'],
		// browserDisconnectTimeout : 0,
		// browserNoActivityTimeout : 0,
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