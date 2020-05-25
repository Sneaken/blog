import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Blog',
    component: () =>
      import(/* webpackChunkName: "blog" */ '@/views/blog/Blog.vue'),
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () =>
      import(/* webpackChunkName: "resume" */ '@/views/resume/Resume.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
