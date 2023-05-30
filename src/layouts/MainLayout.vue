<template>
  <AppLoader v-if="isLoading"/>

  <div class="app-main-layout" v-else>
    <app-navbar />

    <app-sidebar :key="info" />

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>

    <div class="fixed-action-btn" v-tooltip="$localize('CreateNewRecord')">
      <router-link href="#" class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watch, inject, ref } from 'vue'
import { useStore } from 'vuex'
import AppNavbar from '@/components/app/AppNavbar.vue'
import AppSidebar from '@/components/app/AppSidebar.vue'
import tooltipDirective from '@/directives/tooltip.directive'

export default {
  directives: { tooltip: tooltipDirective },
  name: 'main-layout',
  setup () {
    const store = useStore()
    const $message = inject('message')

    const error = computed(() => store.getters.message)

    const isLoading = ref(true)

    watch(error, val => {
      if (val) {
        $message(val)
      }
    })

    // Лучше делать асинк запросы в маунтед
    onMounted(async () => {
      if (!Object.keys(store.getters['users/info']).length) {
        try {
          await store.dispatch('users/loadInfo')
        } catch (error) {}
      }

      isLoading.value = false
    })

    return {
      isOpen: computed(() => store.state.isOpenSidebar),
      isLoading,
      info: computed(() => store.getters['users/info'])
    }
  },
  components: {
    AppNavbar,
    AppSidebar
  }
}
</script>
