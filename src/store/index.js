import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import users from './modules/users.module'
import category from './modules/category.module'
import record from './modules/record.module'

const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  state () {
    return {
      isOpenSidebar: false,
      message: null
    }
  },
  getters: {
    message: state => state.message
  },
  mutations: {
    setMessage (state, message) {
      state.message = message
    },
    clearMessage (state) {
      state.message = null
    },
    toggle (state) {
      state.isOpenSidebar = !state.isOpenSidebar
    }
  },
  actions: {
    setMessage ({ commit }, message) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('clearMessage')
      }, 5000)
    }
  },
  modules: {
    auth,
    users,
    category,
    record
  },
  plugins
})
