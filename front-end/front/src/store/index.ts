import Vue from 'vue';
import { initUID } from '@/utils/uid-manager';

export const store = Vue.observable({
  userID: '',
});

export const mutations = {
  setUserID(value: string) {
    store.userID = value;
  },
};

export const actions = {
  async init() {
    const userID = (await initUID()) as string;
    mutations.setUserID(userID);
  },
};
