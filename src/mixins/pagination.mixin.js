import { ref } from 'vue'
import { useRoute } from 'vue-router'
import _ from 'lodash'
import router from '@/router'

export default () => {
  const route = useRoute()

  const page = ref(+route.query.page) || ref(1)
  const pageSize = ref(4)
  const pageCount = ref(0)
  const allItems = ref([])
  const items = ref([])

  const setupPagination = (arr) => {
    allItems.value = _.chunk(arr, pageSize.value)
    pageCount.value = _.size(allItems.value)
    items.value = allItems.value[page.value - 1] || allItems.value[0]
  }

  const pageChangeHandler = (page) => {
    router.push(`${route.path}?page=${page}`)
    items.value = allItems.value[page - 1] || allItems.value[0]
  }

  return {
    setupPagination,
    items,
    pageCount,
    page,
    pageChangeHandler
  }
}
