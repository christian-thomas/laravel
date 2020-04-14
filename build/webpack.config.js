const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: './resources/assets/js/app.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, '../public/compiled/js/'),
		publicPath: '/compiled/js/',
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
		],
	},
	plugins: [
		new VueLoaderPlugin(),
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
		},
	},
	devServer: {
		host: '0.0.0.0',
		port: 5757,
		public: 'localhost:5757',
		publicPath: '/compiled/js/',
		proxy: {
			context: ['**', '!/compiled/js/**'],
			target: 'http://web:80',
		},
	},
};
