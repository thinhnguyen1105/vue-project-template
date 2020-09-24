import { Vendor } from '@/api/repository/vendorRepository.js'
import get from 'lodash-es/get'
const state = {
  vendor: {},
  settings: {},
  dataHomePage: []
}
const actions = {
  async fetchVendor({ commit }) {
    const res = await Vendor.getVendorIdFromOrigin();
    await commit('setVendor', res)
    return res;
  },
  async getSettingsVendor({ commit, state }) {
    const res = await Vendor.getSettingsVendor(state.vendor.vendorId, state.vendor.clientId);
    commit('setSettings', res.item)
    return res.item;
  },
  async fetchDataForHomePage({ commit, state }, { query }) {
    const res = await Vendor.fetchDataForHomePage(state.vendor.vendorId, query)
    commit('setDataHomePage', res)
    return res
  }
}
const mutations = {
  setVendor(state, vendor) {
    state.vendor = vendor
  },
  setSettings(state, settings) {
    state.settings = settings
  },
  setDataHomePage(state, dataHomePage) {
    state.dataHomePage = dataHomePage || []
  },
}
const getters = {
  getViewData(state) {
    return get(state.settings, 'learn.themeConfig.viewData')
  },
  getDataHomePage(state) {
    return state.dataHomePage
  }
}
export default {
  state,
  actions,
  getters,
  mutations,
  namespaced: true
}
