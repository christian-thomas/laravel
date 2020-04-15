import Lang from 'lang.js';
import Vue from 'vue';

const contexts = require.context('@/lang/', true, /\.php$/);

const messages = contexts.keys().reduce((acc, filename) => {
	const key = filename
		.replace(/^\.\//, '')
		.replace(/\.php$/, '')
		.replace(/\//g, '.');

	acc[key] = contexts(filename);

	return acc;
}, {});

const lang = new Lang({
	...window.app.i18n,
	messages,
});

Vue.filter('choice', (...args) => lang.choice(...args));
Vue.filter('trans', (...args) => lang.get(...args));
