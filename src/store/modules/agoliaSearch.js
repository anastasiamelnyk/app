import algoliasearch from 'algoliasearch';
import moment from 'moment';
import { RESULTS_PER_PAGE } from '../../assets/js/constants';

const algolia = algoliasearch('OFCNCOG2CU', 'f54e21fa3a2a0160595bb058179bfb1e', { protocol: 'https:' });
const index = algolia.initIndex('npm-search');

const state = {
  searchResult: [],
  isSearchRunning: false,
  page: 0,
  totalPages: 0,
  perPage: 0,
  didSearchHappen: false,
};

const getters = {
  getSearchRunning: state => state.isSearchRunning,
  getFilteredSearchResult: state => state.searchResult.map(cur => ({
    ...cur,
    created: moment(cur.created).format('DD MMM YYYY'),
    modified: moment(cur.modified).format('DD MMM YYYY'),
  })),
  getPage: state => state.page,
  getTotalPages: state => state.totalPages,
  getPerPage: state => state.perPage,
  getSearchHappen: state => state.didSearchHappen,
};

const mutations = {
  setSearchRunning(state, payload) {
    state.isSearchRunning = payload;
  },
  setSearchResult(state, payload) {
    state.searchResult = payload;
  },
  setPage(state, payload) {
    state.page = payload;
  },
  setTotalPages(state, payload) {
    state.totalPages = payload;
  },
  setPerPage(state, payload) {
    state.perPage = payload;
  },
  setSearchHappen(state, payload) {
    state.didSearchHappen = payload;
  },
};

const actions = {
  search({ state, commit }, payload) {
    if (!state.didSearchHappen) commit('setSearchHappen', true);
    commit('setSearchRunning', true);

    index.search(payload, {
      page: state.page,
      hitsPerPage: RESULTS_PER_PAGE,
    }).then(data => {
      commit('setSearchResult', data.hits);
      commit('setPage', data.page);
      commit('setTotalPages', data.nbPages);
      commit('setPerPage', data.hitsPerPage);
    })
    .finally(() => {
      commit('setSearchRunning', false);
    });
  },
};

export default { state, getters, mutations, actions };