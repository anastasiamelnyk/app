import Vue from 'vue';
import Vuex from 'vuex';

// modules
import agoliaSearch from './modules/agoliaSearch';
import jsDelivr from './modules/jsDelivr';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    agoliaSearch,
    jsDelivr,
  }
})
