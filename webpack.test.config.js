var os = require('os')
var webpack = require("webpack");
var path = require('path');
var rootDir = path.resolve(__dirname);

const buildPath = path.join(os.tmpdir(), '_karma_webpack_') + Math.floor(Math.random() * 1000000);

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	output: {
		filename: '[name].js',
		path: buildPath,
	},
	resolve: {
		extensions: ['.ts', '.js']
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            outDir: path.join(buildPath, 'es5')
                        }
                    }
                }
			},
			{
				test: /\.tsx?$/,
				enforce: 'post',
				use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
				include: path.resolve(__dirname, './src'),
				exclude: [
					/\.spec\.ts$/,
					/\.e2e\.ts$/,
					/node_modules/
				]
			}
		]
	}

};