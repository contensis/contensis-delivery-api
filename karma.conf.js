// Karma configuration
// Generated on Tue Jun 27 2017 13:36:04 GMT+0100 (GMT Daylight Time)
var webpackConfig = require('./webpack.test.config');

module.exports = function (config) {
	config.set({

		basePath: '',

		frameworks: ['jasmine'],

		files: [
			{ pattern: './testing/karma-test-shim.js', watched: false }
		],

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
		singleRun: true,
		concurrency: Infinity
	})
}
