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
    path: '/article/:id',
    name: 'DetailPage',
    component: () =>
      import(/* webpackChunkName: "blog" */ '@/views/detail/DetailPage.vue'),
    props: true,
  },
  {
    path: '/article',
    redirect: '/',
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () =>
      import(/* webpackChunkName: "resume" */ '@/views/resume/Resume.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
