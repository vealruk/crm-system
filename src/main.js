import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import localizePlugin from './utils/localize.plugin'
import titlePlugin from './utils/title.plugin'
import AppLoader from './components/app/AppLoader.vue'
import Paginate from 'vuejs-paginate-next'
import VueCookies from 'vue-cookies'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './index.css'

createApp(App)
  .component('AppLoader', AppLoader)
  .component('paginate', Paginate)
  .use(store)
  .use(router)
  .use(VueCookies, { expires: '1d' })
  .use(messagePlugin)
  .use(localizePlugin)
  .use(titlePlugin)
  .mount('#app')
