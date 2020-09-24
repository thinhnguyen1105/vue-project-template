import { Auth } from '@/api/repository/authRepository.js'
import Base64 from '@/helpers/encodeBase64.js'
import { cipher, decipher } from '@/helpers/cipher.js'
const AUTH_USER_STORAGE_NAME = 'ol-credentials-auth-user'

const state = {
  auth: null,
  authenticated: false
}
const actions = {
  async initAuthen({ commit, dispatch, rootState }) {
    const vendorId = rootState.vendor.vendor.vendorId
    let authUser = _loadAuthUser(vendorId)
    if (authUser) {
      dispatch('validateAuthUser', { authUser, vendorId })
    } else commit('setAuth', null)
  },
  async signIn({ commit, rootState }, payload) {
    const currentVendorId = rootState.vendor.vendor.vendorId
    if (!payload.email || !payload.password)
      throw new Error(`[Auth.SignIn] 'username' & 'password' && 'password' required!`)
    let body = {
      email: payload.email,
      password: Base64.encode(payload.password),
      vendorId: currentVendorId
    }
    const res = await Auth.signIn(body)
    _saveAuthUser(res, currentVendorId)
    commit('setAuth', res)
    commit('setAuthenticated', true)
    return res;
  },
  async signOut({ commit }) {
    commit('setAuth', null)
    commit('setAuthenticated', false)
    _removeAuthUser()
  },
  async refreshToken({ commit }, authUser) {
    const newTokens = await Auth.refreshToken(authUser)
    const newAuthUser = {
      ...authUser,
      ...newTokens
    }
    commit('setAuth', newAuthUser)
    _saveAuthUser(newAuthUser, newAuthUser.vendorId)
  },
  async validateAuthUser({ commit, dispatch }, payload) {
    const { authUser, vendorId } = payload
    let now = Date.now()
    let { accessTokenExpiredAt } = authUser
    if (accessTokenExpiredAt < now) {
      await dispatch('refreshToken', authUser)
    } else {
      commit('setAuth', authUser)
      commit('setAuthenticated', true)
      _saveAuthUser(authUser, vendorId)
    }
  }
}
const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  },
  setAuthenticated(state, val) {
    state.authenticated = val
  },
}
const getters = {
  getAuthUser: (state) => state.auth,
  getAuthenticated: (state) => state.authenticated,
}

// helpers

function _saveAuthUser(authUser, vendorId) {
  let authUserEncoded = cipher(vendorId)(JSON.stringify(authUser))
  return window.localStorage.setItem(AUTH_USER_STORAGE_NAME, authUserEncoded)
}

function _removeAuthUser() {
  return window.localStorage.removeItem(AUTH_USER_STORAGE_NAME)
}

function _loadAuthUser(vendorId) {
  let authUserEncoded = localStorage.getItem(AUTH_USER_STORAGE_NAME)
  return authUserEncoded
    ? JSON.parse(decipher(vendorId)(authUserEncoded))
    : null
}

export default {
  state,
  actions,
  getters,
  mutations,
  namespaced: true
}
