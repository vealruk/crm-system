import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export default (emit, localize) => {
  const store = useStore()

  const { handleSubmit, isSubmitting, submitCount } = useForm()

  const { value: title, errorMessage: tError, handleBlur: tBlur } = useField(
    'title',
    yup
      .string()
      .trim()
      .required(localize('CategoryTitle'))
  )

  const { value: limit, errorMessage: lError, handleBlur: lBlur } = useField(
    'limit',
    yup
      .number()
      .min(100, localize('MinValue'))
      .transform((_, val) => val === Number(val) ? val : null)
      .required(localize('LimitRequired'))
  )

  const isTooManyAttempts = computed(() => submitCount.value > 3)

  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => {
        submitCount.value = 0
      }, 10000)
    }
  })

  limit.value = 100

  const create = handleSubmit(async (values, { resetForm }) => {
    try {
      const category = await store.dispatch('category/createCategory', values)
      resetForm({
        values: {
          title: '',
          limit: 100
        }
      })
      store.dispatch('setMessage', 'Category_HasBeenCreated')
      emit('created', category)
    } catch (e) {}
  })

  return {
    title,
    tError,
    tBlur,
    limit,
    lError,
    lBlur,
    create,
    isSubmitting,
    isTooManyAttempts
  }
}
