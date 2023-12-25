<template>
  <div class="home-page">
    <div class="page-content container">
      [ Контент домашней страницы (pages/Home.vue) ]
    </div>
    <div @click="loader.setState(!loader.state)">Loader</div>
    <div @click="onError">
      Вывод ошибок
    </div>
    <!--    <div @click="notices.call('Ошибка')">Вызвать ошибку</div>-->
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";
import {useLoader} from "~/src/components/Loader/composables/useLoader";
import {useNotice} from "~/src/components/Notices/composables/useNotice";
import {ApiRequest} from "~/api/interfaces/ApiError";
import GetArticles from "~/api/endpoints/GetArticles.ts";

const loader = useLoader()
const notices = useNotice()

const onError = () => {
  throw new Error('Ошибка')
}

onMounted(() => {
  console.log(new GetArticles({a: 'a'}))

  // const a = new ApiRequest()
  // console.log('nice', Endpoints)
})

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