import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Blog',
    component: () =>
      import(/* webpackChunkName: "blog" */ '@/views/Blog/Blog.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
