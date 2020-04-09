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
						presets: [
							[
								'@babel/preset-env',
								{
									// https://babeljs.io/docs/en/babel-preset-env#options
								},
							],
						],
					},
				},
			},
		],
	},
};
