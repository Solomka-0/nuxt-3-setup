<template>
  <div>
    <Header/>
    <div class="default-layout">
      <slot/>
    </div>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from '~/src/components/Header/Header.vue'
import Footer from "~/src/components/Footer/Footer.vue";
// import Loader from '@/components/Loader/Loader.vue'
// import Footer from '@/components/Footer/Footer.vue'
// import Auth from "@/components/Popups/Auth/Auth.vue"
</script>