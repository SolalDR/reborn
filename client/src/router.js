import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Debug from './views/Debug.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/debug',
      name: 'debug',
      component: Debug,
    },
    {
      path: '/rooms/create',
      name: 'create-room',
      component: () => import('./views/rooms/Create.vue'),
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
