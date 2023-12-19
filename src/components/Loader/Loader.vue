<template>
  <div class=loader__wrapper
       :class="{ 'loader_disabled': !loader.state }"
  >
    <div class="loader">
      <img src="@/public/ui/loaders/tube.svg">
    </div>
  </div>
</template>

<script setup lang='ts'>
import {useLoader} from './composables/useLoader'

// i18
const i18nPrefix = "components.Loader"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const loader = useLoader()
</script>

<style lang="scss">
@import "./style.scss";
</style>