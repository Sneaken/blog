import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
import '@/assets/css/base.less';
import 'antd-iconfont/iconfont.css';
import '@/assets/css/animation-effects.less';
import '@/api/animationEffects';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
