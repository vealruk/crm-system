// import useFetch from '@/use/fetch'
import axios from '@/axios/requests'
import cookie from 'vue-cookies'

export default {
  namespaced: true,
  state () {
    return {
      info: {},
      currency: {}
    }
  },
  getters: {
    info (state) {
      return state.info
    },
    currency (state) {
      return state.currency
    }
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    updateInfo (state, info) {
      state.info = { ...state.info, ...info }
    },
    clearInfo (state) {
      state.info = {}
    },
    setCurrency (state, currency) {
      state.currency = currency
    },
    clearCurrency (state) {
      state.currency = {}
    }
  },
  actions: {
    async loadInfo ({ commit, dispatch }) {
      try {
        const uid = cookie.get('uid')
        const token = cookie.get('token')
        const fbUrl = `/users/${uid}/info.json?auth=${token}`

        const { data } = await axios.get(fbUrl)
        commit('setInfo', data)
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
      }
    },

    async setInfo ({ dispatch }, payload) {
      try {
        const uid = cookie.get('uid')
        const token = cookie.get('token')
        const fbUrl = `/users/${uid}/info.json?auth=${token}`

        await axios.put(fbUrl, {
          name: payload.name,
          bill: 10000,
          locale: 'ru-RU'
        })
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
      }
    },

    async updateInfo ({ dispatch, commit, getters }, payload) {
      try {
        const uid = cookie.get('uid')
        const token = cookie.get('token')
        const fbUrl = `/users/${uid}/info.json?auth=${token}`

        const updateData = { ...getters.info, ...payload }

        await axios.put(fbUrl, updateData)
        commit('setInfo', updateData)
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
      }
    },
    async fetchCurrency ({ commit }) {
      try {
        const key = process.env.VUE_APP_FIXER
        const myHeaders = new Headers()
        myHeaders.append('apikey', key)

        const options = {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders
        }

        const res = await fetch('https://api.apilayer.com/fixer/latest?&symbols=USD,EUR,RUB', options)

        const currency = await res.json()

        commit('setCurrency', currency)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
