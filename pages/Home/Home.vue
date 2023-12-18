<template>
  <div class="home-page">
    <div class="page-content container">
      [ Контент домашней страницы (pages/Home.vue) ]
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";

// i18
const i18nPrefix = "pages.Home"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

defineI18nRoute({
  paths: {
    'en': '/',
    'de': '/',
    'es': '/',
    'fr': '/',
    'it': '/',
    'pt': '/',
    'zh': '/',
    'ja': '/',
    'ko': '/',
    'ru': '/',
    'hi': '/',
    'pl': '/',
    'cs': '/',
  }
})

</script>

<style>
@import "./style.scss";
</style>