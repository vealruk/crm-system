import axios from 'axios'

const TOKEN_KEY = 'jwt-token'

export default {
  namespaced: true,
  state () {
    return {
      token: localStorage.getItem(TOKEN_KEY),
      uid: localStorage.getItem('uid')
    }
  },
  getters: {
    token (state) {
      return state.token
    },
    uid (state) {
      return state.uid
    },
    isAuthenticated (_, getters) {
      return !!getters.token
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    setUid (state, uid) {
      state.uid = uid
      localStorage.setItem('uid', uid)
    },
    logout (state, { commit }) {
      state.token = null
      state.uid = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem('uid')
      // commit('users/clearInfo', '', { root: true })
      // commit('users/clearCurrency', '', { root: true })
    }
  },
  actions: {
    logout ({ commit }) {
      commit('logout', { commit })
      commit('users/clearInfo', '', { root: true })
      commit('record/clearRecord', '', { root: true })
      commit('category/clearCategory', '', { root: true })
    },
    async login ({ dispatch, commit }, payload) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`

      try {
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        commit('setToken', data?.idToken)
        commit('setUid', data?.localId)
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
      }
    },

    async register ({ dispatch, commit }, payload) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`

      try {
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        commit('setToken', data.idToken)
        commit('setUid', data?.localId)
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
