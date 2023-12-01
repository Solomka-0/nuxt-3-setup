<template>
  <div class=header>
    <div class="container">
      [ Header ]
    </div>
  </div>
</template>

<script setup lang='ts'>
// i18
const i18nPrefix = "components.Header"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

import "./header.ts"
</script>

<style lang="scss">
@import "./style.scss";
</style>