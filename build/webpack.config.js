const path = require('path');

module.exports = {
	entry: './resources/assets/js/app.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, '../public/compiled/js'),
	},
};
