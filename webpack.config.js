var webpack = require("webpack");
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJS = require('uglify-js');

var rootDir = path.resolve(__dirname);

module.exports = {
    mode: 'production', // automatically minimize/uglify
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
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     output: {
        //         comments: false
        //     },
        //     mangle: {
        //         keep_fnames: true
        //     }
        // }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'node_modules/whatwg-fetch/dist/fetch.umd.js',
                    to: 'fetch.min.js',
                    transform(content, path) {
                        return UglifyJS.minify(content.toString()).code;
                    }
                },
                {
                    from: 'node_modules/es6-promise/dist/es6-promise.auto.min.js',
                    to: 'es6-promise.min.js'
                }
            ]
        })
    ]
};
