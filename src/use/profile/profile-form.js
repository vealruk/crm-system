import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'

export default (localize) => {
  const store = useStore()

  const { handleSubmit, isSubmitting, submitCount } = useForm()

  const { value: name, errorMessage: nError, handleBlur: nBlur } = useField(
    'name',
    yup
      .string()
      .trim()
      .required(localize('RequiredName'))
  )

  const isRuLocale = ref(true)

  const isTooManyAttempts = computed(() => submitCount.value > 3)

  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => {
        submitCount.value = 0
      }, 10000)
    }
  })

  const update = handleSubmit(async values => {
    try {
      await store.dispatch('users/updateInfo', { ...values, locale: isRuLocale.value ? 'ru-RU' : 'en-US' })
      store.dispatch('setMessage', 'UpdateInfo')
    } catch (e) {}
  })

  name.value = store.getters['users/info'].name
  isRuLocale.value = store.getters['users/info'].locale === 'ru-RU'

  return {
    name,
    nError,
    nBlur,
    update,
    isRuLocale,
    isSubmitting,
    isTooManyAttempts
  }
}
