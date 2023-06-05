import axios from '@/axios/requests'
import cookie from 'vue-cookies'

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
        const uid = cookie.get('uid')
        const token = cookie.get('token')

        const fbUrl = `/users/${uid}/categories.json?auth=${token}`

        const { data } = await axios.get(fbUrl)

        if (!data) {
          return []
        }

        const categories = Object.keys(data).map(id => ({ ...data[id], id }))
        commit('setCategories', categories)
        return categories
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
        return []
      }
    },
    async loadCategoryById ({ dispatch }, id) {
      try {
        const uid = cookie.get('uid')
        const token = cookie.get('token')
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
        const uid = cookie.get('uid')
        const token = cookie.get('token')
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
    async updateCategory ({ dispatch }, payload) {
      try {
        const uid = cookie.get('uid')
        const token = cookie.get('token')
        const fbUrl = `/users/${uid}/categories/${payload.id}.json?auth=${token}`

        const { id, ...formData } = payload

        await axios.put(fbUrl, formData)
      } catch (e) {
        dispatch('setMessage', e.response.data.error.message, { root: true })
      }
    }
  }
}
