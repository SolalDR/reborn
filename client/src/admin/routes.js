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
];
