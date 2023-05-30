import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { computed, watch, toRefs, ref } from 'vue'
import { useStore } from 'vuex'

export default (props, emit, localize) => {
  const store = useStore()

  const { categories } = toRefs(props)

  const { handleSubmit, isSubmitting, submitCount } = useForm()

  const current = ref(null)

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

  if (categories.value.length !== 0) {
    const { id, title: titleCat, limit: limitCat } = categories.value[0]

    current.value = id
    title.value = titleCat
    limit.value = limitCat
  }

  watch(current, val => {
    const cat = categories.value.find(cat => cat.id === val)
    title.value = cat.title
    limit.value = cat.limit
  })

  const edit = handleSubmit(async values => {
    try {
      await store.dispatch('category/updateCategory', { ...values, id: current.value })
      store.dispatch('setMessage', 'Category_HasBeenUpdated')
      emit('updated', { ...values, id: current.value })
    } catch (e) {}
  })

  return {
    title,
    tError,
    tBlur,
    limit,
    lError,
    lBlur,
    edit,
    isSubmitting,
    isTooManyAttempts,
    current
  }
}
