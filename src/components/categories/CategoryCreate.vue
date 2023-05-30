<template lang="">
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $localize('Create') }}</h4>
      </div>

      <form @submit.prevent="create">
        <div class="input-field">
          <input id="name" type="text" v-model="title" :class="{ invalid: tError }" @input="tBlur">
          <label for="name">{{ $localize('Title') }}</label>
          <span class="helper-text invalid" v-if="tError">{{ tError }}</span>
        </div>

        <div class="input-field">
          <input id="limit" type="number" v-model="limit" :class="{ invalid: lError }" @input="lBlur">
          <label for="limit">{{ $localize('Limit') }}</label>
          <span class="helper-text invalid" v-if="lError">{{ lError }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit" :disabled="isSubmitting || isTooManyAttempts">
          {{ $localize('Create') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useCategoryCreate from '@/use/category/category-create-form'
import { onMounted, inject } from 'vue'

export default {
  emits: ['created'],
  setup (_, { emit }) {
    const localize = inject('localize')

    onMounted(() => {
      // eslint-disable-next-line
      M.updateTextFields()
    })

    return {
      ...useCategoryCreate(emit, localize)
    }
  }
}

</script>
