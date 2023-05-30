<template>
  <AppLoader v-if="isLoading" />

  <p v-else-if="!record">{{ $localize('RecordWithId') }} <strong>{{ id }}</strong> {{ $localize('DoesNotExist') }}</p>

  <div v-else>
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">{{ $localize('History') }}</router-link>
      <a class="breadcrumb">
        {{ record.typeText }}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card" :class="[record.typeClass]">
          <div class="card-content white-text">
            <p>{{ $localize('Description') }}: {{ record.description }}</p>
            <p>{{ $localize('Amount') }}: {{ currency(record.amount) }}</p>
            <p>{{ $localize('Category') }}: {{ record.title }}</p>
            <small>{{ date(new Date(record.date), 'date-time') }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, toRefs, inject } from 'vue'
import { useStore } from 'vuex'
import currencyFormatter from '@/utils/currencyFormatter'
import dateFormatter from '@/utils/dateFormatter'

export default {
  props: ['id'],
  setup (props) {
    const localize = inject('localize')

    const store = useStore()

    const { id } = toRefs(props)

    const isLoading = ref(true)

    // Обязательно указывай правильный тип данных перед тем, как что то складывать в переменную, иначе будет куча ошибок
    const record = ref({})
    const category = ref({})

    onMounted(async () => {
      try {
        record.value = await store.dispatch('record/loadRecordById', id.value)

        category.value = await store.dispatch('category/loadCategoryById', record.value.categoryId)

        record.value = {
          ...record.value,
          typeText: record.value.type === 'outcome' ? localize('Outcome') : localize('Income'),
          title: category.value.title,
          typeClass: record.value.type === 'outcome' ? 'red' : 'green'
        }
      } catch (e) {}

      isLoading.value = false
    })

    return {
      record,
      isLoading,
      currency: currencyFormatter,
      date: dateFormatter
    }
  }
}

</script>
