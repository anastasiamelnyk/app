import Vue from 'vue';
import VueRouter from 'vue-router';

// Components
import Home from '../components/Home/index';
import Package from '../components/Package';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/:id',
        name: 'Package',
        component: Package,
      },
    ],
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
});

export default router;
