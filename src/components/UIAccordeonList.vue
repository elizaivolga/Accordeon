<template>
  <div class="accordeon-list">
    <div class="accordeon-list__header">
      <h1>Вопросы и ответы</h1>
      <div class="edit" @click="isEditing = !isEditing">
        {{ isEditing ? 'preview' : 'edit' }}
      </div>
    </div>
    <div v-if="questions.length > 0" class="accordeon-list__content">
      <UIAccordeonItem
        v-for="question in questions"
        :key="question.id"
        :id="question.id"
        :name="question.name"
        :answer="question.answer"
        :isPinned="question.isPinned"
        :isEditing="isEditing"
        @edit="openModal(question)"
        @delete="deleteQuestion(question.id)"
      />
    </div>
    <div class="accordeon-list__empty" v-else>
      Тут пока ничего нет.
      <div class="description" v-if="!isEditing">
        Перейдите в <span @click="isEditing = !isEditing">режим редактирования</span> и добавьте
        свой первый вопрос
      </div>
      <div class="description" v-else>
        Нажмите на кнопку <span @click="openModal(undefined)">Добавить</span>, чтобы создать первый вопрос
      </div>
    </div>
    <ButtonCustom
      v-if="isEditing"
      class="accordeon-list__create"
      bForm="add"
      @click="openModal(undefined)"
    >
      <span>Добавить <strong>+</strong></span>
    </ButtonCustom>
  </div>
  <UIQuestionFormModal v-if="modalOpen" :question="currentQuestion" @close="modalOpen = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuestionsStore } from '../stores/questionsStore'
import UIAccordeonItem from '../components/UIAccordeonItem.vue'
import UIQuestionFormModal from './UIQuestionFormModal.vue'
import type { IQuestion } from '@/types/questions'

defineProps<{
  questions: IQuestion[]
}>()

const store = useQuestionsStore()

const isEditing = ref<boolean>(false)

const modalOpen = ref<boolean>(false)
const currentQuestion = ref<IQuestion | undefined>()

function openModal(question: IQuestion | undefined = undefined) {
  modalOpen.value = true
  currentQuestion.value = question
}

async function deleteQuestion(id: string) {
  try {
    await store.deleteQuestion(id)
  } catch (error) {
    console.error('Error deleting question:', error)
  }
}
</script>

<style lang="scss" scoped>
.accordeon-list {
  &__header {
    margin-bottom: 9px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .edit {
      cursor: pointer;
      color: var(--link);
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__empty {
    padding: 44px 29px;
    font-weight: 400;
    font-size: 14px;
    line-height: 129%;
    text-align: center;
    color: #777;
    span {
      cursor: pointer;
      color: var(--link);
    }
  }
  &__create {
    margin-top: 11px;
  }
}
</style>