import algoliasearch from 'algoliasearch';
import { RESULTS_PER_PAGE } from '../../assets/js/constants';

const algolia = algoliasearch('OFCNCOG2CU', 'f54e21fa3a2a0160595bb058179bfb1e', { protocol: 'https:' });
const index = algolia.initIndex('npm-search');

const state = {
  searchResult: [],
  isSearchRunning: false,
};

const getters = {
  getSearchResul: state => state.searchResult,
  getSearchRunning: state => state.isSearchRunning,
};

const mutations = {
  setSearchRunning(state, payload) {
    state.isSearchRunning = payload;
  },
  setSearchResult(state, payload) {
    state.searchResult = payload;
  },
};

const actions = {
  search({ commit }, payload) {
    commit('setSearchRunning', true);

    index.search(payload.query, {
      page: payload.page || 0,
      hitsPerPage: RESULTS_PER_PAGE,
    }).then(({ hits }) => {
      commit('setSearchResult', hits);
    })
    .finally(() => {
      commit('setSearchRunning', false);
    });
  },
};

export default { state, getters, mutations, actions };