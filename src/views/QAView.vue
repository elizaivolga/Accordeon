<template>
  <div class="QA-page">
    <router-link to="/" class="QA-page__breadcrumps">&lt; На главную</router-link>
    <div class="QA-page__loading" v-if="isLoading">Loading...</div>
    <div class="QA-page__question" v-else>
      <h1 class="title">{{ question?.name }}</h1>
      <div class="answer">{{ question?.answer }}</div>
      <div class="nav">
        <ButtonCustom bForm="edit" @click="modalOpen = true">edit</ButtonCustom>
        <ButtonCustom bForm="del" @click="deleteQuestion">del</ButtonCustom>
      </div>
    </div>

    <UIQuestionFormModal v-if="modalOpen" :question="question" @close="handleModalClose" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useQuestionsStore } from '../stores/questionsStore'
import { ref, onMounted } from 'vue'

import UIQuestionFormModal from '../components/UIQuestionFormModal.vue'
import type { IQuestion } from '@/types/questions'
import questionsService from '@/services/questionsService'

const route = useRoute()
const router = useRouter()
const store = useQuestionsStore()
const isLoading = ref<boolean>(true)

const questionId = ref<string>(route.params.id.toString())

const modalOpen = ref<boolean>(false)

const question = ref<IQuestion | undefined>()

async function handleModalClose() {
  modalOpen.value = false;
  question.value = await questionsService.getQuestionById(questionId.value);
}

async function deleteQuestion() {
  try {
    await store.deleteQuestion(questionId.value);
    router.push('/');
  } catch (error) {
    console.error('Error deleting question:', error);
  }
}

onMounted(async () => {
  try {
    question.value = await questionsService.getQuestionById(questionId.value)
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
})
</script>



<style lang="scss" scoped>
.QA-page {
  padding: 17px 11px;
  word-break: break-word;
  &__breadcrumps {
    cursor: pointer;
    font-weight: 400;
    font-size: 18px;
    line-height: 67%;
    color: #000;
  }
  &__loading {
    padding: 35px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__question {
    .title {
      margin: 12px 0;
      font-size: 18px;
      line-height: 100%;
    }
    .answer {
      margin-bottom: 14px;
      font-size: 16px;
      line-height: 125%;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}
</style>