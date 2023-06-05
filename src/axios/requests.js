import axios from 'axios'
import router from '../router'
import store from '../store/index'
import cookie from 'vue-cookies'

const requestAxios = axios.create({
  baseURL: process.env.VUE_APP_FB_URL
})

requestAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    router.push('/login?message=auth')
    cookie.remove('uid')
    cookie.remove('token')
    store.dispatch('auth/logout')
  }

  return Promise.reject(error)
})

export default requestAxios
