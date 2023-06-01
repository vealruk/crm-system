<template>
  <div class="card">
    <h1 class="card-title center">4<span>0</span>4</h1>
    <p class="card-text center">{{ $localize('NotFoundPath') }}</p>
  </div>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style scoped lang="scss">
 .card {
    padding: 20px;

    @media (min-width: 768px) {
      padding: 40px 110px;
    }

    &-title {
      color: #262626;
      font-size: 165px;
      font-weight: 700;

      span {
        color: #00b7ff;
      }
    }

    &-text {
      font-size: 22px;
      font-weight: 400;
      text-transform: uppercase;
      color: #151515;
    }
 }
</style>
