const path = require('path');

module.exports = {
	entry: './resources/assets/js/app.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, '../public/compiled/js'),
	},
	module: {
		rules: [
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
};
