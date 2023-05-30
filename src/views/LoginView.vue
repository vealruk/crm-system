<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{ $localize('CRM_Title') }}</span>
      <div class="input-field">
        <input id="email" type="text" v-model="email" :class="{ invalid: eError }" @input="eBlur">
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="eError">
          {{ eError }}
        </small>
      </div>
      <div class="input-field">
        <input id="password" type="password" v-model="password" :class="{ invalid: pError }" @input="pBlur">
        <label for="password">{{$localize('Password')}}</label>
        <small class="helper-text invalid" v-if="pError">
          {{ pError }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit" :disabled="isSubmitting || isTooManyAttempts">
          {{$localize('Login')}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center helper-text invalid" v-if="isTooManyAttempts">{{$localize('TooManyAttempts')}}</p>

      <p class="center">
        {{ $localize('NoAccount') }}
        <router-link to="/register">{{ $localize('Register') }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import useLoginForm from '@/use/auth/login-form'

export default {
  setup () {
    const route = useRoute()
    const store = useStore()

    const localize = inject('localize')

    onMounted(() => {
      if (route.query.message) {
        store.dispatch('setMessage', route.query.message)
      }
    })

    return {
      ...useLoginForm(localize)
    }
  }
}

</script>

<style>

</style>
