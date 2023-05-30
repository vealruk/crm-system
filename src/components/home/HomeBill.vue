<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ $localize('BillInCurrency') }}</span>

        <p class="currency-line" v-for="cur in currencies" :key="cur">
          <span>{{ currency(getCurrency(cur), cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import currency from '@/utils/currencyFormatter'

export default {
  props: ['rates'],
  setup (props) {
    const store = useStore()

    const currencies = ['RUB', 'USD', 'EUR']

    const { rates } = toRefs(props)

    // let base = null

    const bill = computed(() => store.getters['users/info']).value.bill

    // eslint-disable-next-line
    const base = computed(() => bill / (rates.value['RUB'] / rates.value['EUR']))

    const getCurrency = (currency) => {
      return Math.floor(base.value * rates.value[currency])
    }

    return {
      currencies,
      getCurrency,
      currency
    }
  }
}
</script>
