import Vue from 'vue';
import Vuex from 'vuex';

// modules
import algoliaSearch from './modules/algoliaSearch';
import jsDelivr from './modules/jsDelivr';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    algoliaSearch,
    jsDelivr,
  }
})
