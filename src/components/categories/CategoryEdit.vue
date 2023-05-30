<template lang="">
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $localize('Edit') }}</h4>
      </div>

      <form @submit.prevent="edit">
        <div class="input-field">
          <select ref="select" v-model="current">
           <option
              v-for="cat in categories"
              :value="cat.id"
              :key="cat.id"
            >
              {{ cat.title }}
          </option>
          </select>
          <label>
            {{ $localize('SelectCategory') }}
          </label>
        </div>

        <div class="input-field">
          <input id="name-edit" type="text" v-model="title" :class="{ invalid: tError }" @input="tBlur">
          <label for="name-edit">{{ $localize('Title') }}</label>
          <span class="helper-text invalid" v-if="tError">{{ tError }}</span>
        </div>

        <div class="input-field">
          <input id="limit-edit" type="number" v-model="limit" :class="{ invalid: lError }" @input="lBlur">
          <label for="limit-edit">{{ $localize('Limit') }}</label>
          <span class="helper-text invalid" v-if="lError">{{ lError }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit" :disabled="isSubmitting || isTooManyAttempts">
          {{ $localize('Update') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useCategoryEdit from '@/use/category/category-edit-form'
import { onMounted, ref, onBeforeUnmount, inject } from 'vue'

export default {
  emits: ['updated'],
  props: ['categories'],
  setup (props, { emit }) {
    const select = ref(null)
    const selectInit = ref(null)

    const localize = inject('localize')

    onMounted(() => {
      // eslint-disable-next-line
      selectInit.value = M.FormSelect.init(select.value)
      // eslint-disable-next-line
      M.updateTextFields()
    })

    onBeforeUnmount(() => {
      if (selectInit.value && selectInit.value.destroy) {
        selectInit.value.destroy()
      }
    })

    return {
      ...useCategoryEdit(props, emit, localize),
      select
    }
  }
}

</script>
