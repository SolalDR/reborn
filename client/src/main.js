import Vue from 'vue';
import VueMaterial from 'vue-material';
import App from './App.vue';
import router from './router';
import store from './store';
import Socket from './plugins/Socket';
import DefaultLayout from './layouts/Default.vue';
import AdminLayout from './admin/layouts/Admin.vue';
import AdminDefaultLayout from './admin/layouts/Default.vue';
import './registerServiceWorker';
import 'vue-material/dist/vue-material.min.css';
import './admin/styles/admin.scss';

Vue.config.productionTip = false;

// Components
Vue.component('default-layout', DefaultLayout);
Vue.component('admin-layout', AdminLayout);
Vue.component('admin-default-layout', AdminDefaultLayout);

// Plugins
Vue.use(VueMaterial);
Vue.use(Socket);

Vue.component('router-link', Vue.options.components.RouterLink);
Vue.component('router-view', Vue.options.components.RouterView);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
