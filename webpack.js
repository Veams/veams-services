const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const libraryName = '[name]';
const outputFile = libraryName + '.js';

module.exports = {
	// Entry point for webpack
	entry: {
		http: './src/http.js'
	},
	// Output directory and filename
	output: {
		path: __dirname + '/lib',
		filename: outputFile,
		library: [ libraryName, "[name]" ],
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	// Tell webpack to run babel on every file it runs through
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: { // Let's add babel presets and plugins
					presets: [
						'stage-0',
						[ 'env', {
							targets: {
								browsers: [ 'last 2 version' ]
							}
						} ]
					],
					plugins: [
						'transform-class-properties',
						'transform-decorators-legacy'
					]
				}
			}
		]
	},
	plugins: [
		new UglifyJsPlugin()
	]
};