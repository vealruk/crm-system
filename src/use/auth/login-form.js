import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default (localize) => {
  const router = useRouter()
  const store = useStore()

  const MIN_LENGTH = 6

  const { handleSubmit, isSubmitting, submitCount } = useForm()
  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    'email',
    yup
      .string()
      .trim()
      .required(localize('EmailRequired'))
      .email(localize('EmailValid'))
  )

  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    'password',
    yup
      .string()
      .trim()
      .required(localize('EnterPassword'))
      .min(MIN_LENGTH, localize('ValidPassword'))
  )

  const isTooManyAttempts = computed(() => submitCount.value > 3)

  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => {
        submitCount.value = 0
      }, 10000)
    }
  })

  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('auth/login', values)
      router.push('/home')
    } catch (e) {}
  })

  return {
    email,
    password,
    onSubmit,
    isTooManyAttempts,
    isSubmitting,
    eError,
    pError,
    eBlur,
    pBlur
  }
}
