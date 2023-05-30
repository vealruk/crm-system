import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'

export default (type, category, localize) => {
  const store = useStore()

  const { handleSubmit, isSubmitting, submitCount } = useForm()

  const { value: amount, errorMessage: aError, handleBlur: aBlur } = useField(
    'amount',
    yup
      .number()
      .min(1, localize('AmountRequired'))
      .transform((_, val) => val === Number(val) ? val : null)
      .required('Введите сумму')
  )

  const { value: description, errorMessage: dError, handleBlur: dBlur } = useField(
    'description',
    yup
      .string()
      .trim()
      .required(localize('EnterDescription'))
  )

  const isTooManyAttempts = computed(() => submitCount.value > 3)

  const bill = computed(() => store.getters['users/info'].bill)

  const newBill = ref(null)

  const canCreateRecord = computed(() => {
    if (type.value === 'income') {
      return true
    }

    return bill.value >= amount.value
  })

  const create = handleSubmit(async (values, { resetForm }) => {
    if (canCreateRecord.value) {
      try {
        const data = { ...values, categoryId: category.value, type: type.value, date: new Date().toJSON() }
        await store.dispatch('record/createRecord', data)
        newBill.value = type.value === 'income'
          ? bill.value + amount.value
          : bill.value - amount.value

        await store.dispatch('users/updateInfo', { bill: newBill.value })
        store.dispatch('setMessage', 'RecordHasBeenCreated')
        resetForm({
          values: {
            amount: 1,
            description: ''
          }
        })
        await store.dispatch('record/loadRecords')
      } catch (e) {}
    } else {
      store.dispatch('setMessage', 'NotEnoughMoney' + ' ' + (amount.value - bill.value))
    }
  })

  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => {
        submitCount.value = 0
      }, 10000)
    }
  })

  amount.value = 1

  return {
    create,
    isSubmitting,
    isTooManyAttempts,
    amount,
    aError,
    aBlur,
    description,
    dError,
    dBlur
  }
}
