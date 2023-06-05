import axios from 'axios'
import cookie from 'vue-cookies'

export default {
  namespaced: true,
  getters: {
    isAuthenticated () {
      return !!cookie.get('token')
    }
  },
  mutations: {
    // logout (state, { commit }) {
    // state.token = null
    // state.uid = null
    // localStorage.removeItem(TOKEN_KEY)
    // localStorage.removeItem('uid')
    // commit('users/clearInfo', '', { root: true })
    // commit('users/clearCurrency', '', { root: true })
    // }
  },
  actions: {
    logout ({ commit }) {
      // commit('logout', { commit })
      cookie.remove('uid')
      cookie.remove('token')
      commit('users/clearInfo', '', { root: true })
      commit('record/clearRecord', '', { root: true })
      commit('category/clearCategory', '', { root: true })
    },

    async login ({ dispatch, commit }, payload) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`

      try {
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        cookie.set('uid', data.localId)
        cookie.set('token', data.idToken)
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
      }
    },

    async register ({ dispatch, commit }, payload) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`

      try {
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        cookie.set('uid', data.localId)
        cookie.set('token', data.idToken)
        commit('clearMessage', null, { root: true })
        await dispatch('users/setInfo', payload, { root: true })
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
        throw new Error()
      }

      // const catchError = async (data) => {
      //   if (data.error) {
      //     dispatch('setMessage', data.error.message, { root: true })
      //   } else {
      //     commit('setUid', data?.localId)
      //     commit('setToken', data?.idToken)
      //     await dispatch('users/updateInfo', { data, info: payload }, { root: true })
      //     commit('clearMessage', null, { root: true })
      //   }
      // }

      // await useFetch(url, 'POST', JSON.stringify({
      //   ...payload, returnSecureToken: true
      // }))
      //   .then(data => catchError(data))
    }
  }
}
