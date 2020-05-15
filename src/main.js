import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(VueMaterial);

const curVueApp = new Vue({
    components: { App },
    template: '<App/>',
    render: h => h(App)
}).$mount('#app');

curVueApp.__proto__.$material.locale = {
	startYear: 2020,
	endYear: 2050,
	dateFormat: 'dd.MM.yyyy',
	days: [
		'Воскресенье', 'Понедельник', 'Вторник',
		'Среда', 'Четверг', 'Пятница', 'Суббота'
	],
	shortDays: [
		'Вск', 'Пнд', 'Втр', 'Сре',
		'Чтв', 'Птн', 'Суб'
	],
	shorterDays: [
		'Вс', 'Пн', 'Вт', 'Ср',
		'Чт', 'Пт', 'Сб'
	],
	months: [
		'Январь', 'Февраль', 'Март',
		'Апрель', 'Май', 'Июнь',
		'Июль', 'Август', 'Сентябрь',
		'Октябрь', 'Ноябрь', 'Декабрь'
	],
	shortMonths: [
		'Янв.', 'Фев.', 'Мрт.', 'Апр.',
		'Май', 'Июн.', 'Июл.', 'Авг.',
		'Сен.', 'Окт.', 'Ноя.', 'Дек.'
	],
	shorterMonths: [
		'Я', 'Ф', 'М', 'А', 'М', 'И',
		'И', 'А', 'С', 'О', 'Н', 'Д'
	],
	firstDayOfAWeek: 1
};