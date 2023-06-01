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
        <input id="password" type="password" v-model="password"
          :class="{ invalid: pError }" @input="pBlur">
        <label for="password">{{ $localize('Password') }}</label>
        <small class="helper-text invalid" v-if="pError">
          {{ pError }}
        </small>
      </div>

      <div class="input-field">
        <input id="name" type="text" v-model="name" :class="{ invalid: nError }" @input="nBlur">
        <label for="name">{{ $localize('Name') }}</label>
        <small class="helper-text invalid" v-if="nError">{{ $localize('RequiredName') }}</small>
      </div>

      <p>
        <label>
          <input type="checkbox" v-model="agree" @input="aBlur"/>
          <span class="helper-text" :class="{ invalid: aError }">{{ $localize('AcceptRules') }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit" :disabled="isSubmitting || isTooManyAttempts">
          {{ $localize('Register') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center helper-text invalid" v-if="isTooManyAttempts">{{ $localize('TooManyAttempts') }}</p>

      <p class="center">
        {{ $localize('HasAccount') }}
        <router-link to="/login">{{ $localize('Login') }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useRegisterForm from '@/use/auth/register-form'
import { inject } from 'vue'

export default {
  setup () {
    const localize = inject('localize')

    return {
      ...useRegisterForm(localize)
    }
  }
}

</script>
