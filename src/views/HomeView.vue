<template>
  <div class="home-page">
    <div v-if="isLoading">Loading...</div>
    <UIAccordeonList v-else :questions="questions"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useQuestionsStore } from '../stores/questionsStore'
import UIAccordeonList from '../components/UIAccordeonList.vue'


const isLoading = ref<boolean>(true)
const store = useQuestionsStore()
const questions = computed(() => {
  const sortedQuestions = [...store.questions]
  sortedQuestions.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
  return sortedQuestions
})

onMounted(async () => {
  try {
    await store.loadQuestions()
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="scss" scoped>
.home-page {
  box-sizing: border-box;
  padding: 30px 11px;
}
</style>