const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const imageminGifsicle = require("imagemin-gifsicle");
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");
const imageminMozjpeg = require('imagemin-mozjpeg');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		bundle: ['./src/main.js']
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true,
						preprocess: require('./svelte.config.js').preprocess
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif|ogg|mp3|wav|mpe?g)$/,
				loaders: [
					{
							loader: 'file-loader'
					},
					{
							loader: 'img-loader',
							options: {
									plugins: [
											imageminGifsicle({
													interlaced: false
											}),
											imageminMozjpeg({
													progressive: true,
													arithmetic: false
											}),
											imageminPngquant({
													floyd: 0.5,
													speed: 2
											}),
											imageminSvgo({
													plugins: [
															{ removeTitle: true },
															{ convertPathData: false }
													]
											})
									]
							}
					}
			]
			}
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	],
	devtool: prod ? false: 'source-map'
};
