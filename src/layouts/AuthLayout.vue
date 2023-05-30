<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import { computed, watch, inject } from 'vue'
import { useStore } from 'vuex'
// import { message } from '@/utils/messages'

export default {
  setup () {
    const store = useStore()
    const $message = inject('message')

    const error = computed(() => store.getters.message)

    watch(error, val => {
      if (val) {
        $message(val)
      }
    })

    return {}
  }
}

</script>

<style>

</style>
