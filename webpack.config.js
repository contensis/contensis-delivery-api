const webpack = require("webpack");
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJS = require('uglify-js');
const TerserPlugin = require('terser-webpack-plugin');

const rootDir = path.resolve(__dirname);

module.exports = {
    mode: 'production',
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
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            outDir: "../bundle/es5"
                        }
                    }
                }
            },
        ]
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    sourceMap: true,
                    mangle: {
                        keep_fnames: true
                    },
                    format: {
                        comments: false
                    }
                }
            })
        ]
    },


    plugins: [
        new CopyWebpackPlugin({
            patterns: [     
                {
                    from: 'node_modules/whatwg-fetch/dist/fetch.umd.js',
                    to: 'fetch.min.js',
                    transform(content, absoluteFrom) {
                        return UglifyJS.minify(content.toString()).code;
                    }
                },            
                { from: 'node_modules/es6-promise/dist/es6-promise.auto.min.js', to: 'es6-promise.min.js' }
            ]
        })
    ]
};
