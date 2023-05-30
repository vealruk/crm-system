<template>
  <component :is="`${layout}-layout`" v-if="layout"></component>
</template>

<script>
import { computed, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'

export default {
  setup () {
    const route = useRoute()

    const title = inject('title')

    const name = computed(() => route.name)

    watch(name, val => {
      document.title = `${title(val)} | CRM - System`
    })

    return {
      layout: computed(() => route.meta.layout || 'auth')
    }
  },
  components: {
    MainLayout,
    AuthLayout
  }
}

</script>
