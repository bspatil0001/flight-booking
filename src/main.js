// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import jQuery from 'jquery'
import VeeValidate from 'vee-validate';

var Filters = require('./assets/filters');

Vue.use(VeeValidate);

global.jQuery = jQuery
global.$ = jQuery
Vue.config.productionTip = false

global.window.jQuery = jQuery
global.jQuery = jQuery
global.$ = jQuery
window.$ = window.jQuery = jQuery

/* eslint-disable no-new */
new Vue({
  el: '#app',
  filters: Filters,
  router,
  components: {App},
  template: '<App/>'
})
