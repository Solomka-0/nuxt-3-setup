<template>
  <!-- Обработка при наведении -->
  <div class="notices" @mouseenter="isHover = true" @mouseleave="isHover = false">
    <!--  Вывод списка, определение состояния (скрытый / отображается)  -->
    <div v-for="item in queue" class="notices__message" :class="{'notices__message_hidden': !isHover && !item.state}"
         :style="{animation: !isHover && !item.state ? `hide ${timeout}ms linear forwards` : 'none'}">
      <div class="notices__message-text">{{ item.message }}</div>
      <div @click="notices.drop(item.index)" class="esc_rounded"></div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {useNotice} from "~/src/components/Notices/composables/useNotice"

const props = withDefaults(defineProps<{
  timeout?: number,
}>(), {
  timeout: 500
})

const notices = useNotice()
const isHover = ref(false)

const queue = computed(() => {
  // Обращаемся к полю render, чтобы отследить re-render очереди
  notices.render

  if(!isHover.value) {
    // Вызывает метод удаления элемента с задержкой
    notices.queue.map((item) => {
      if (!item.state) {
        item.reset()
        setTimeout(() => {
          // Удаляет из списка, в зависимости от состояния элемента (hover + state)
          if (!isHover.value && !item.state) {
            notices.drop(item.index)
          }
        }, props.timeout)
      }
      return item
    })
    return notices.queue
  }
  return notices.queue
})

// i18
const i18nPrefix = "components.Notices"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

</script>

<style lang="scss">
@import "./style.scss";
</style>