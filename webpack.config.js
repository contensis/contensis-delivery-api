var webpack = require("webpack");
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');


var rootDir = path.resolve(__dirname);


module.exports = {	

    devtool: 'source-map',

	entry: {
        'zengenti.contensis-client': './src/index.ts'
    },

    output: {
        path: __dirname + "/bundle",
        filename: "[name].js",
        sourceMapFilename: "[file].map",
        publicPath: "/bundle/",

        library: ['Zengenti', 'Contensis']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
        loaders: [

        ]
    },

	resolve: {
        extensions: ['.ts']
    },


    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            output: {
                comments: false
            },
            mangle: {
                keep_fnames: true
            }
        }),
		new CopyWebpackPlugin([            
            { from: 'node_modules/whatwg-fetch/fetch.js', to: '' },
			{ from: 'node_modules/es6-promise/dist/es6-promise.min.js', to: '' }
        ])
    ]
};