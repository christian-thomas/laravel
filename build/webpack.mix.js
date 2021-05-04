const mix = require('laravel-mix');
const ESLintPlugin = require('eslint-webpack-plugin');

const { compiled, src } = require('./helpers');
const { config: { browserSync, css, js }, paths } = require('./config');

const postCssPlugins = [
	require('postcss-units')(),
	require('tailwindcss')('./build/tailwind.config.js'),
];

if (mix.inProduction()) {
	postCssPlugins.push(require('@fullhuman/postcss-purgecss')({
		content: [
			src('../views/**/*.blade.php'),
			src('js/**/*.{js,vue}'),
		],
		// https://medium.com/@kyis/vue-tailwind-purgecss-the-right-way-c70d04461475
		defaultExtractor: content => content.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [],
		whitelist: css.purgeCssWhitelist,
		whitelistPatterns: css.purgeCssWhitelistPatterns.map(element => new RegExp(element)),
	}));
}

if (js.lint) {
	mix.webpackConfig((webpack) => {
		return {
			plugins: [
				new ESLintPlugin({
					extensions: ['js', 'vue'],
					overrideConfigFile: './build/.eslintrc',
				}),
			],
		};
	});
}

// Typical setup
mix
	.alias({
		'assets': __dirname + '/../resources/assets',
	})
	.options({
		autoprefixer: {
			options: css.autoprefixer,
			enabled: true,
		},
		cleanCss: css.cleanCss,
		fileLoaderDirs: {
			fonts: `${paths.compiled}/fonts`,
			images: `${paths.compiled}/img`,
		},
		processCssUrls: false,
		postCss: postCssPlugins,
		clearConsole: !(process.env.NO_CLI_FLUSH),
	})
	.browserSync(browserSync)
	.setPublicPath(paths.dest);

const combined = [];

css.files.forEach((filename) => {
	mix.sass(src(`scss/${filename}`), compiled('temp'));
	combined.push(`${paths.dest}/${compiled('temp')}/${filename.replace('scss', 'css')}`);
});
js.files.forEach(filename => mix.js(src(`js/${filename}`), compiled('js')).vue({ version: 2 }));

mix.combine(combined, `${paths.dest}/${compiled('css')}/app.css`);

// Uncomment if you want to separate vendor files.
// mix.extract(js.extract);

if (mix.inProduction()) {
	mix.version();
} else {
	mix.sourceMaps(false, 'eval-cheap-source-map');
}
