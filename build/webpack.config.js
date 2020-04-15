const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const ManifestPlugin = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (env, { mode }) => {
	const prod = mode === 'production';

	const hash = (file) => {
		if (!prod) {
			return file;
		}

		const absolutePath = path.resolve(__dirname, `../public${file}`);

		const data = fs.readFileSync(absolutePath, 'utf8');

		return crypto.createHash('sha1').update(data).digest('hex').substr(0, 20);
	};

	return {
		context: path.resolve(__dirname, '../resources/assets'),
		entry: {
			'js/app': './js/app.js',
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, '../public/compiled/'),
			publicPath: '/compiled/',
		},
		module: {
			rules: [
				{
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					enforce: 'pre',
					exclude: /node_modules/,
					options: {
						configFile: 'build/.eslintrc',
					},
				},
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
				{
					test: /resources\/lang.+\.php$/,
					loader: 'laravel-localization-loader',
				},
			],
		},
		plugins: [
			new ManifestPlugin({
				basePath: '/compiled/',
				fileName: '../mix-manifest.json',
				generate: (seed, files, entrypoints) => files.reduce((manifest, { name, path }) => ({
					...manifest,
					[name]: prod ? `${path}?${hash(name)}` : path,
				}), seed),
			}),
			new VueLoaderPlugin(),
		],
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.common.js',
				'@': path.resolve(__dirname, '../resources/'),
			},
			extensions: ['*', '.js', '.json', '.vue'],
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
