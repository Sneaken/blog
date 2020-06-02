import '@/utils/register-hooks';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
import 'highlight.js/styles/vs2015.css';
import '@/assets/styles/less/common.less';
import '@/assets/styles/less/icon.less';
import '@/assets/styles/less/animation-effects.less';
import '@/assets/styles/less/transition.less';
import '@/utils/animation-effects.ts';
import '@/utils/development.ts';

Vue.config.productionTip = false;

store.dispatch('init').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});
