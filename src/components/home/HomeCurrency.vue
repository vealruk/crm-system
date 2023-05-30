<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ $localize('CurrencyAmountTitle') }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ $localize('Currency') }}</th>
              <th>{{ $localize('CurrencyType') }}</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{ cur }}</td>
              <td>{{ rates[cur].toFixed(2) }}</td>
              <td>{{ dateFormatter(new Date(date)) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormatter from '@/utils/dateFormatter'

export default {
  props: ['date', 'rates'],
  setup () {
    const currencies = ['RUB', 'USD', 'EUR']

    return {
      currencies,
      dateFormatter
    }
  }
}
</script>
