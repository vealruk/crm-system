<template lang="">
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ $localize('Amount') }}</th>
        <th>{{ $localize('Date') }}</th>
        <th>{{ $localize('Type') }}</th>
        <th>{{ $localize('Category') }}</th>
        <th>{{ $localize('Open') }}</th>
      </tr>
    </thead>

    <tbody>

      <tr v-for="(rec, idx) in records" :key="rec.id">
        <td>{{ ++idx }}</td>
        <td>{{ currency(rec.amount) }}</td>
        <td>{{ date(new Date(rec.date), 'date-time') }}</td>
        <td>{{ rec.title }}</td>
        <td>
          <span class="white-text badge" :class="rec.typeClass">{{ rec.typeText }}</span>
        </td>
        <td>
          <router-link :to="`/detail/${rec.id}`" custom v-slot="{ navigate }">
            <button class="btn-small btn" @click="navigate" v-tooltip="'Посмотреть запись'">
              <i class="material-icons">open_in_new</i>
            </button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import currencyFormatter from '@/utils/currencyFormatter'
import dateFormatter from '@/utils/dateFormatter'
import tooltipDirective from '@/directives/tooltip.directive'

export default {
  directives: { tooltip: tooltipDirective },
  props: ['records'],
  setup () {
    return {
      currency: currencyFormatter,
      date: dateFormatter
    }
  }
}

</script>
