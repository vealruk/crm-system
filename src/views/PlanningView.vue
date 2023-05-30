<template>

  <div class="page-title">
    <h3>{{ $localize('Planning') }}</h3>
    <h4>{{ currency(info.bill) }}</h4>
  </div>

  <AppLoader v-if="isLoading" />

  <p class="center" v-else-if="categories.length === 0">
    {{ $localize('NoCategories') }}
    <router-link to="/categories">{{ $localize('AddNewCategory') }}</router-link>
  </p>

  <section v-else>
    <div v-for="cat in categories" :key="cat.id">
      <p>
        <strong>{{ cat.title }}:</strong>
        {{ currency(cat.spend) }} {{ $localize('Of') }} {{ currency(cat.limit) }}
      </p>
      <div class="progress" v-tooltip="cat.tooltip">
        <div class="determinate" :class="cat.progressColor" :style="{width: `${cat.progressPercent}%`}"></div>
      </div>
    </div>
  </section>

</template>

<script>
import { computed, onMounted, ref, inject } from 'vue'
import { useStore } from 'vuex'
import currency from '@/utils/currencyFormatter'
import tooltipDirective from '@/directives/tooltip.directive'
import useFetchCategories from '@/use/category/useFetchCategories'
import useFetchRecords from '@/use/record/useFetchRecords'
import useTransformCategories from '@/use/planning/useTransformCategories'

export default {
  directives: { tooltip: tooltipDirective },
  setup () {
    const localize = inject('localize')

    const store = useStore()
    const isLoading = ref(true)

    const records = ref([])
    const categories = ref([])

    const transformCategories = ref([])

    onMounted(async () => {
      await useFetchCategories(categories)
      await useFetchRecords(records)

      useTransformCategories(categories, records, transformCategories, localize)

      isLoading.value = false
    })

    return {
      categories: transformCategories,
      info: computed(() => store.getters['users/info']),
      isLoading,
      currency
    }
  }
}

</script>
