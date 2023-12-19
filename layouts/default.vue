<template>
  <div>
    <Header/>
    <div class="default-layout">
      <slot/>
    </div>
    <Footer/>
    <Loader/>
    <Notices/>
  </div>
</template>

<script setup lang="ts">
import Header from '~/src/components/Header/Header.vue'
import Footer from "~/src/components/Footer/Footer.vue";
import Loader from "~/src/components/Loader/Loader.vue";
import Notices from "~/src/components/Notices/Notices.vue";
// import Footer from '@/components/Footer/Footer.vue'
// import Auth from "@/components/Popups/Auth/Auth.vue"
</script>