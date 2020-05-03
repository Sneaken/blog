import Vue from 'vue';
import Vuex from 'vuex';
import { initUID } from '@/utils/uidManager';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userID: '',
  },
  mutations: {
    setUserID(state, value: string) {
      state.userID = value;
    },
  },
  actions: {
    async init({ commit }) {
      const userID = await initUID();
      commit('setUserID', userID);
    },
  },
  modules: {},
});
