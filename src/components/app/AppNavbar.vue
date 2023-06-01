<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="toggle">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ newDate.replace(' в', ',') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="dropdown">
            {{ userName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" href="#" class="black-text">
                <i class="material-icons">account_circle</i>{{ $localize('ProfileTitle') }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>{{ $localize('Exit') }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import dateFormatter from '@/utils/dateFormatter'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()

    const dropdown = ref(null)

    const interval = ref(null)
    const date = ref(new Date())

    const logout = () => {
      store.dispatch('auth/logout')
      router.push('/login?message=logout')
    }

    const users = computed(() => store.getters['users/info'])

    onMounted(() => {
      interval.value = setInterval(() => {
        date.value = new Date()
      }, 1000)
      // eslint-disable-next-line
      dropdown.value = M.Dropdown.init(dropdown.value, {
        constrainWidth: false
      })
    })

    onBeforeUnmount(() => {
      clearInterval(interval.value)
      if (dropdown.value && dropdown.value.destroy) {
        dropdown.value.destroy()
      }
    })

    return {
      toggle: () => store.commit('toggle'),
      dropdown,
      logout,
      newDate: computed(() => dateFormatter(date.value, 'date-time')),
      userName: computed(() => users.value?.name)
    }
  }
}

</script>
