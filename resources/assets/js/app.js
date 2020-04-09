// /* eslint-disable no-new */

// import Vue from 'vue';
// // import svg4everybody from 'svg4everybody';

// // import './bootstrap';
// // import lang from './i18n';

// // // Common
// // import EButton from './components/common/Button';
// // import ELabel from './components/common/Label';
// // import ETable from './components/common/Table';
// // import Breadcrumb from './components/common/Breadcrumb';
// // import Icon from './components/common/Icon';
// // import IconText from './components/common/IconText';
// // import Pagination from './components/common/Pagination';
// // import Placeholder from './components/common/Placeholder';

// // // Accounts
// // // import ForgotPasswordForm from './components/accounts/ForgotPasswordForm';
// // // import LoginForm from './components/accounts/LoginForm';
// // // import PasswordResetForm from './components/accounts/PasswordResetForm';
// // // import RegisterForm from './components/accounts/RegisterForm';
// // // import ResendVerifyCodeForm from './components/accounts/ResendVerifyCodeForm';

// // Vue.filter('trans', (...args) => lang.get(...args));

// // // Global
// // Vue.component('EButton', EButton);
// // Vue.component('ELabel', ELabel);
// // Vue.component('ETable', ETable);
// // Vue.component('Breadcrumb', Breadcrumb);
// // Vue.component('Icon', Icon);
// // Vue.component('IconText', IconText);
// // Vue.component('Pagination', Pagination);
// // Vue.component('Placeholder', Placeholder);

// new Vue({
// 	el: '#app',

// 	// Local
// 	components: {
// 		// App
// 		// ForgotPasswordForm,
// 		// LoginForm,
// 		// PasswordResetForm,
// 		// RegisterForm,
// 		// ResendVerifyCodeForm,

// 		// Styleguide
// 		// ExampleStyleguideOnlyComponent,
// 	},

// 	mounted() {
// 		// svg4everybody();
// 		window.alert('mounted');
// 	},
// });

const delay = timeout => new Promise(resolve => window.setTimeout(resolve, timeout));

(async () => {
	console.log(...[1, 2, 3]);

	await delay(1000);

	console.log(789);
})();

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }

window.alert(159);
