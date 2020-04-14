const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (env, { mode }) => {
	const prod = mode === 'production';

	return {
		context: path.resolve(__dirname, '../resources/assets'),
		entry: {
			app: './js/app.js',
		},
		output: {
			filename: 'js/[name].js',
			path: path.resolve(__dirname, '../public/compiled/'),
			publicPath: '/compiled/',
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader',
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							presets: [
								[
									'@babel/preset-env',
									{
										// https://babeljs.io/docs/en/babel-preset-env#options
									},
								],
							],
							plugins: [
								// '@babel/plugin-syntax-dynamic-import',
								// '@babel/plugin-proposal-object-rest-spread',
								[
									'@babel/plugin-transform-runtime',
									{
										// https://babeljs.io/docs/en/next/babel-plugin-transform-runtime.html#options
									},
								],
							],
						},
					},
				},
				{
					// TODO: check w/ fonts
					test: /\.(jpe?g|png|svg)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								context: 'resources/assets',
								esModule: false,
								name: '[path][name].[ext]',
							},
						},
					],
				},
			],
		},
		plugins: [
			new VueLoaderPlugin(),
		],
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.common.js',
				'@': path.resolve(__dirname, '../resources/assets/'),
			},
		},
		devtool: prod ? false : 'cheap-eval-source-map',
		devServer: {
			host: '0.0.0.0',
			port: 5757,
			public: 'localhost:5757',
			publicPath: '/compiled/',
			proxy: {
				context: ['**', '!/compiled/**'],
				target: 'http://web:80',
			},
			stats: 'minimal',
		},
	};
};
