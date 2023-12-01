<template>
  <div class=footer>
    <div class="container">
      [ Footer ]
    </div>
  </div>
</template>

<script setup lang='ts'>
// i18
const i18nPrefix = "components.Footer"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

import "./footer.ts"
</script>

<style lang="scss">
@import "./style.scss";
</style>