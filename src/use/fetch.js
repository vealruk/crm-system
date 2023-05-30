import store from '../store/index'
import router from '../router'

export default async (url, method, body) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })

  if (response.status === 401) {
    router.replace('/login')
    store.dispatch('auth/logout')
    store.dispatch('setMessage', response.statusText)
  } else {
    return response.json()
  }
}
