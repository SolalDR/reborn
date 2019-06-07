import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Test from './views/Test';

import adminRoutes from './admin/routes';

Vue.use(Router);

export default new Router({
  routes: [
    ...adminRoutes,
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
    },
    {
      path: '/rooms/:id/join',
      name: 'join-room',
      component: () => import('./views/rooms/Join.vue'),
    },
    {
      path: '/rooms/:id',
      name: 'game',
      component: () => import('./views/Game.vue'),
    },
  ],
});
