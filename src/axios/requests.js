import axios from 'axios'
import router from '../router'
import store from '../store/index'

const requestAxios = axios.create({
  baseURL: process.env.VUE_APP_FB_URL
})

requestAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    router.push('/login?message=auth')
    store.dispatch('auth/logout')
  }

  return Promise.reject(error)
})

export default requestAxios
