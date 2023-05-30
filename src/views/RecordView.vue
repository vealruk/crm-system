<template>
  <div class="page-title">
    <h3>{{ $localize('NewRecord') }}</h3>
  </div>

  <AppLoader v-if="isLoading" />

  <p class="center" v-else-if="categories.length === 0">{{ $localize('NoCategories') }} <router-link to="/categories">{{ $localize('AddNewCategory') }}</router-link>
  </p>

  <form class="form" v-else @submit.prevent="create">
    <div class="input-field">
      <select ref="select" v-model="category">
        <option v-for="cat in categories" :value="cat.id" :key="cat.id">
          {{ cat.title }}
        </option>
      </select>
      <label>{{ $localize('SelectCategory') }}</label>
    </div>

    <p>
      <label>
        <input class="with-gap" name="type" type="radio" value="income" v-model="type"/>
        <span>{{ $localize('Income') }}</span>
      </label>
    </p>

    <p>
      <label>
        <input class="with-gap" name="type" type="radio" value="outcome" v-model="type"/>
        <span>{{ $localize('Outcome') }}</span>
      </label>
    </p>

    <div class="input-field">
      <input id="amount" type="number" v-model="amount" :class="{invalid: aError}">
      <label for="amount">{{ $localize('Amount') }}</label>
      <span class="helper-text invalid" v-if="aError">{{ aError }}</span>
    </div>

    <div class="input-field">
      <input id="description" type="text" :class="{invalid: dError}" v-model="description">
      <label for="description">{{ $localize('Description') }}</label>
      <span class="helper-text invalid" v-if="dError">{{ dError }}</span>
    </div>

    <button class="btn waves-effect waves-light" type="submit" :disabled="isSubmitting || isTooManyAttempts">
      {{ $localize('Create') }}
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
import { onBeforeUnmount, onMounted, ref, nextTick, watch, inject } from 'vue'
import useRecordForm from '../use/record/record-form'
import useFetchCategories from '@/use/category/useFetchCategories'

export default {
  setup () {
    const localize = inject('localize')

    const select = ref(null)
    const selectInit = ref(null)
    const isLoading = ref(true)

    const category = ref(null)
    const categories = ref([])
    const type = ref('income')

    onMounted(async () => {
      await useFetchCategories(categories)

      if (categories.value.length !== 0) {
        category.value = categories.value[0].id
      }

      nextTick(() => {
        // eslint-disable-next-line
        selectInit.value = M.FormSelect.init(select.value)
        // eslint-disable-next-line
        M.updateTextFields()
      })

      isLoading.value = false
    })

    onBeforeUnmount(() => {
      if (selectInit.value && selectInit.value.destroy) {
        selectInit.value.destroy()
      }
    })

    watch(category, val => {
      category.value = val
    })

    return {
      select,
      categories,
      isLoading,
      category,
      type,
      ...useRecordForm(type, category, localize)
    }
  }
}

</script>
