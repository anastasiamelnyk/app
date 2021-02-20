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
  searchQuery: '',
  facetFilters: [],
  selectedPkgAlgolia: {},
  isLoadingPkg: false,
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
  getSearchQuery: state => state.searchQuery,
  getFacetFilters: state => state.facetFilters,
  getSelectedPkgAlgolia: state => state.selectedPkgAlgolia,
  getLoadingPkg: state => state.isLoadingPkg,
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
  setSearchQuery(state, payload) {
    state.searchQuery = payload;
  },
  setFacetFilters(state, payload) {
    state.facetFilters = payload;
  },
  addFacetFilters(state, payload) {
    state.facetFilters = [ ...state.facetFilters, payload ];
  },
  setSelectedPkg(state, payload) {
    state.selectedPkgAlgolia = payload;
  },
  setLoadingPkg(state, payload) {
    state.isLoadingPkg = payload;
  },
};

const actions = {
  search({ state, commit }) {
    if (!state.didSearchHappen) commit('setSearchHappen', true);
    commit('setSearchRunning', true);

    index.search(state.searchQuery, {
      page: state.page,
      hitsPerPage: RESULTS_PER_PAGE,
      facetFilters: state.facetFilters,
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
  getPackage({ commit }, payload) {
    commit('setLoadingPkg', true);

    index.getObject(payload)
      .then(result => {
        commit('setSelectedPkg', result);
      })
      .finally(() => {
        commit('setLoadingPkg', false);
      });
  },
  clearSearchQuery({ state, commit }) {
    if (state.searchQuery) commit('setSearchQuery', '');
    if (state.page) commit('setPage', 0);
  },
  clearSearchFilters({state, commit }) {
    if (state.facetFilters.length) commit('setFacetFilters', []);
    if (state.page) commit('setPage', 0);
  },
};

export default { state, getters, mutations, actions };