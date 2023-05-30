<template>
  <div class="page-title">
    <h3>{{ $localize('Bill') }}</h3>

    <button class="btn waves-effect waves-light btn-small" @click="refresh">
      <i class="material-icons">refresh</i>
    </button>
  </div>

  <AppLoader v-if="isLoading"/>

  <div class="row" v-else>
    <home-bill :rates="currency.rates" />

    <home-currency
      :rates="currency.rates"
      :date="currency.date"
    />
  </div>
</template>

<script>
import HomeBill from '@/components/home/HomeBill'
import HomeCurrency from '@/components/home/HomeCurrency'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    const isLoading = ref(true)

    onMounted(async () => {
      try {
        await store.dispatch('users/fetchCurrency')
        isLoading.value = false
      } catch (e) {}
    })

    const refresh = async () => {
      isLoading.value = true
      try {
        await store.dispatch('users/fetchCurrency')
      } catch (e) {}
      isLoading.value = false
    }

    return {
      isLoading,
      currency: computed(() => store.getters['users/currency']),
      refresh
    }
  },
  components: { HomeBill, HomeCurrency }
}
</script>
