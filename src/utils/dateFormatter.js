import { computed, reactive } from 'vue'
import store from '@/store'

export default (value, format = 'date') => {
  const options = reactive({})

  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
  }

  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }

  const locale = store.getters['users/info'].locale || 'ru-RU'

  const newDate = computed(() => {
    return new Intl.DateTimeFormat(locale, options).format(value)
  })

  return newDate.value
}
