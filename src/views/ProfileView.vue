<template>
  <div class="page-title">
    <h3>{{ $localize('ProfileTitle') }}</h3>
  </div>

  <form class="form" @submit.prevent="update">
    <div class="input-field">
      <input id="description" type="text" v-model="name" :class="{ invalid: nError }">
      <label for="description">{{ $localize('ChangeName') }}</label>
      <span class="helper-text invalid" v-if="nError">{{ nError }}</span>
    </div>

    <div class="switch">
      <p class="helper-text"> {{ $localize('ChangeLanguage') }}</p>
      <label>
        English
        <input type="checkbox" v-model="isRuLocale">
        <span class="lever"></span>
        Русский
      </label>
    </div>

    <button class="btn waves-effect waves-light" type="submit" :disabled="isSubmitting || isTooManyAttempts">
      {{ $localize('Update') }}
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
import useProfileForm from '@/use/profile/profile-form'
import { onMounted, inject } from 'vue'

export default {
  setup () {
    const localize = inject('localize')

    onMounted(() => {
      // eslint-disable-next-line
      M.updateTextFields()
    })

    return {
      ...useProfileForm(localize)
    }
  }
}
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
