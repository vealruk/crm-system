import axios from '@/axios/requests'
import store from '../index'

export default {
  namespaced: true,
  state () {
    return {
      categories: []
    }
  },
  getters: {
    categories (state) {
      return state.categories
    }
  },
  mutations: {
    setCategories (state, category) {
      state.categories = category
    },
    addCategories (state, category) {
      state.categories.push(category)
    },
    clearCategory (state) {
      state.categories = []
    }
  },
  actions: {
    async loadCategories ({ dispatch, commit }) {
      try {
        const uid = store.getters['auth/uid']
        const token = store.getters['auth/token']
        const fbUrl = `/users/${uid}/categories.json?auth=${token}`

        const { data } = await axios.get(fbUrl)

        if (data) {
          const categories = Object.keys(data).map(id => ({ ...data[id], id }))
          commit('setCategories', categories)
          return categories
        } else {
          return []
        }
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
      }
    },
    async loadCategoryById ({ dispatch }, id) {
      try {
        const uid = store.getters['auth/uid']
        const token = store.getters['auth/token']
        const fbUrl = `/users/${uid}/categories/${id}.json?auth=${token}`

        const { data } = await axios.get(fbUrl)

        if (data) {
          return { ...data, id }
        }
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
      }
    },
    async createCategory ({ dispatch, commit }, payload) {
      try {
        const uid = store.getters['auth/uid']
        const token = store.getters['auth/token']
        const fbUrl = `/users/${uid}/categories.json?auth=${token}`

        const { data } = await axios.post(fbUrl, payload)

        if (data) {
          commit('addCategories', {
            limit: payload.limit,
            title: payload.title,
            id: data.name
          })
        }

        return {
          limit: payload.limit,
          title: payload.title,
          id: data.name
        }
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
      }
    },
    async updateCategory ({ dispatch, commit }, payload) {
      try {
        const uid = store.getters['auth/uid']
        const token = store.getters['auth/token']
        const fbUrl = `/users/${uid}/categories/${payload.id}.json?auth=${token}`

        const { id, ...formData } = payload

        await axios.put(fbUrl, formData)
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
      }
    }
  }
}
