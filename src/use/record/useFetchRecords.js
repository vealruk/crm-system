import store from '@/store/index'
import { computed } from 'vue'

export default async records => {
  if (store.getters['record/records'].length === 0) {
    try {
      records.value = await store.dispatch('record/loadRecords')
    } catch (e) {}
  } else {
    const getRecords = computed(() => store.getters['record/records'])

    records.value = getRecords.value
  }
}
