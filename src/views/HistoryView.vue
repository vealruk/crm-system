<template>
  <div class="page-title">
    <h3>{{ $localize('History_Title') }}</h3>
  </div>

  <AppLoader v-if="isLoading" />

  <p class="center" v-else-if="!records">
    {{ $localize('NoRecords') }}
    <router-link to="/record">{{ $localize('AddFirst') }}</router-link>
  </p>

  <div v-else>
    <div class="history-chart">
      <Pie
        :options="chartOptions"
        :data="chartData"
      />
    </div>

    <section>
      <history-table :records="items"></history-table>
      <paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="$localize('Back')"
        :next-text="$localize('Forward')"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      >
      </paginate>
    </section>
  </div>

</template>

<script>
import { onMounted, ref, reactive, inject } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

import HistoryTable from '@/components/history/HistoryTable'
import paginationMixin from '../mixins/pagination.mixin'
import useFetchCategories from '@/use/category/useFetchCategories'
import useFetchRecords from '@/use/record/useFetchRecords'
import randomColor from '@/utils/randomColor'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  mixins: [paginationMixin],
  setup () {
    const isLoading = ref(true)

    const localize = inject('localize')

    const {
      setupPagination,
      items,
      pageCount,
      pageChangeHandler,
      page
    } = paginationMixin()

    const records = ref([])
    const categories = ref([])

    const chartData = ref(null)

    const chartOptions = reactive({
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false
      }
    })

    onMounted(async () => {
      await useFetchRecords(records)
      await useFetchCategories(categories)

      const colors = ref([])

      if (records.value) {
        setupPagination(records.value.map(rec => {
          colors.value.push(randomColor())

          return {
            ...rec,
            title: categories.value
              .find(cat => cat.id === rec.categoryId).title,
            typeText: rec.type === 'outcome' ? localize('Outcome') : localize('Income'),
            typeClass: rec.type === 'outcome' ? 'red' : 'green'
          }
        }))

        chartData.value = {
          labels: categories.value.map(cat => cat.title),
          responsive: true,
          maintainAspectRatio: true,
          datasets: [
            {
              label: localize('CostsForCategories'),
              data: categories.value.map(cat => {
                return records.value.reduce((total, rec) => {
                  if (rec.categoryId === cat.id && rec.type === 'outcome') {
                    total += +rec.amount
                  }
                  return total
                }, 0)
              }),
              backgroundColor: colors.value
            }
          ]
        }
      }

      isLoading.value = false
    })

    return {
      records,
      isLoading,
      pageChangeHandler,
      items,
      pageCount,
      page,
      chartOptions,
      chartData
    }
  },
  components: { HistoryTable, Pie }
}
</script>
