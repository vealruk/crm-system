import store from '@/store/index'
import { computed } from 'vue'

export default async categories => {
  if (store.getters['category/categories'].length === 0) {
    try {
      categories.value = await store.dispatch('category/loadCategories')
    } catch (e) {}
  } else {
    const getCategories = computed(() => store.getters['category/categories'])
    categories.value = getCategories.value
  }
}
