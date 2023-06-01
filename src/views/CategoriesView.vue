<template>
  <div class="page-title">
    <h3>{{ $localize('Categories') }}</h3>
  </div>
  <section>
    <AppLoader v-if="isLoading"/>

    <div class="row" v-else>
      <CategoryCreate @created="create"/>

      <!-- Атрибут key помогает отрисовывать заново компоненты, когда меняются какие либо модели -->
      <CategoryEdit
        v-if="categories.length"
        :categories="categories"
        @updated="update"
        :key="categories.length + updateCount"
      />

      <p v-else class="center">{{ $localize('NoCategories') }}</p>

    </div>
  </section>
</template>

<script>
import { onMounted, ref } from 'vue'
import CategoryCreate from '../components/categories/CategoryCreate'
import CategoryEdit from '../components/categories/CategoryEdit'
import useFetchCategories from '@/use/category/useFetchCategories'

export default {
  setup () {
    const isLoading = ref(true)

    const updateCount = ref(0)

    const categories = ref([])

    onMounted(async () => {
      await useFetchCategories(categories)
      isLoading.value = false
    })

    const update = cat => {
      const idx = categories.value.findIndex(c => c.id === cat.id)
      categories.value[idx].title = cat.title
      categories.value[idx].limit = cat.limit
      updateCount.value++
    }

    const create = values => {
      categories.value.push(values)
    }

    return {
      isLoading,
      categories,
      update,
      updateCount,
      create
    }
  },
  components: { CategoryEdit, CategoryCreate }
}
</script>
