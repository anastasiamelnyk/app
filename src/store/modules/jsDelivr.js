import axios from 'axios';
const endpoint = 'https://data.jsdelivr.com/v1';

const state = {
  selectedPkgJsDelivr: {},
  isLoadingJsDelivr: false,
};

const getters = {
  getSelectedPkgJsDelivr: state => state.selectedPkgJsDelivr,
  getLoadingJsDelivr: state => state.isLoadingJsDelivr,
};

const mutations = {
  setSelectedPkgJsDelivr(state, payload) {
    state.selectedPkgJsDelivr = {
      ...state.selectedPkgJsDelivr,
      ...payload,
    };
  },
  setLoadingJsDelivr(state, payload) {
    state.isLoadingJsDelivr = payload;
  },
};

const actions = {
  getJsDelivrInfo({ commit, dispatch }, payload) {
    commit('setLoadingJsDelivr', true);

    Promise.all([
      dispatch('getVersions', payload),
      dispatch('getMonthUsageStats', payload),
      dispatch('getBadge', payload),
    ]).finally(() => {
      commit('setLoadingJsDelivr', false);
    });
  },
  getVersions({ commit }, payload) {
    axios.get(`${endpoint}/package/npm/${payload}`).then(res => {
      commit('setSelectedPkgJsDelivr', res);
    });
  },
  getMonthUsageStats({ commit }, payload) {
    axios.get(`${endpoint}/package/npm/${payload}/stats`).then(res => {
      commit('setSelectedPkgJsDelivr', res);
    });
  },
  getBadge({ commit }, payload) {
    axios.get(`${endpoint}/package/npm/${payload}/badge`).then(({ data }) => {
      commit('setSelectedPkgJsDelivr', { badge: data });
    });
  },
};

export default { state, getters, mutations, actions };