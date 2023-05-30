import store from '@/store'
import { reactive } from 'vue'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'

const locales = reactive({
  'ru-RU': ru,
  'en-US': en
})

export default {
  install (app) {
    const localize = (key) => {
      const locale = store.getters['users/info'].locale || 'ru-RU'

      return locales[locale][key] || `[Localize error]: key '${key}' not found`
    }

    app.config.globalProperties.$localize = localize
    app.provide('localize', localize)
  }
}
