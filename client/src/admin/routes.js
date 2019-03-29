export default [
  {
    path: '/admin/login',
    name: 'login',
    component: () => import('./pages/Login.vue'),
    meta: { layout: 'admin-default' },
  },
  {
    path: '/admin',
    name: 'dashboard',
    component: () => import('./pages/Dashboard.vue'),
    meta: { layout: 'admin' },
  },
  {
    path: '/admin/rooms/:name',
    name: 'rooms',
    component: () => import('./pages/Room.vue'),
    meta: { layout: 'admin' },
  },
  {
    path: '/admin/rooms',
    name: 'rooms',
    component: () => import('./pages/Rooms.vue'),
    meta: { layout: 'admin' },
  },

];
