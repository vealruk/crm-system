import axios from '@/axios/requests'
import store from '../index'

export default {
  namespaced: true,
  state () {
    return {
      records: []
    }
  },
  getters: {
    records (state) {
      return state.records
    }
  },
  mutations: {
    setRecords (state, records) {
      state.records = records
    },
    addRecord (state, record) {
      state.records.push(record)
    },
    clearRecord (state) {
      state.records = []
    }
  },
  actions: {
    async loadRecords ({ dispatch, commit }) {
      try {
        const uid = await store.getters['auth/uid']
        const token = await store.getters['auth/token']
        const fbUrl = `/users/${uid}/records.json?auth=${token}`

        const { data } = await axios.get(fbUrl)

        if (data) {
          const records = Object.keys(data).map(id => ({ ...data[id], id }))
          commit('setRecords', records)
          return records
        }
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
      }
    },
    async loadRecordById ({ dispatch }, id) {
      try {
        const uid = await store.getters['auth/uid']
        const token = await store.getters['auth/token']
        const fbUrl = `/users/${uid}/records/${id}.json?auth=${token}`

        const { data } = await axios.get(fbUrl)

        if (data) {
          return { ...data, id }
        }
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
      }
    },

    async createRecord ({ dispatch, commit }, payload) {
      try {
        const uid = await store.getters['auth/uid']
        const token = await store.getters['auth/token']
        const fbUrl = `/users/${uid}/records.json?auth=${token}`

        const { data } = await axios.post(fbUrl, payload)

        commit('addRecord', { ...payload, id: data.name })
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
      }
    }
  }
}
