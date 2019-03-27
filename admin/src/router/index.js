import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
  ],
});
