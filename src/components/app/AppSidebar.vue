<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <li v-for="link in links" :key="link.url">
      <router-link :to="link.url" custom v-slot="{ navigate, href }">
        <a href="#" class="waves-effect waves-orange pointer" :class="{ active: $route.path.indexOf(href) !== -1 }"
          @click="navigate"
          >
          {{ link.title }}
        </a>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { ref, computed, inject } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const localize = inject('localize')

    const store = useStore()
    const links = ref([{
      title: localize('Bill'),
      url: '/home'
    },
    {
      title: localize('History'),
      url: '/history'
    },
    {
      title: localize('Planning'),
      url: '/planning'
    },
    {
      title: localize('NewRecord'),
      url: '/record'
    },
    {
      title: localize('Categories'),
      url: '/categories'
    }
    ])
    return {
      links,
      isOpen: computed(() => store.state.isOpenSidebar)
    }
  }
}

</script>
