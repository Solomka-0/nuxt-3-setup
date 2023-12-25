<template>
  <nuxt-layout>
    <nuxt-page/>
  </nuxt-layout>
</template>

<script setup lang="ts">
import {useNotice} from "~/src/components/Notices/composables/useNotice";

const nuxtApp = useNuxtApp()
const notices = useNotice()

// Обработка ошибок (Передача в Notice)
nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
  console.log(error)
  notices.call(error)
}
</script>
