import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IQuestion } from '@/types/questions';
import QuestionsService from '@/services/questionsService';

export const useQuestionsStore = defineStore('questionsStore', () => {
  const questions = ref<IQuestion[]>([]);

  async function loadQuestions() {
    questions.value = await QuestionsService.loadQuestions();
  }

  async function addQuestion(newQuestion: IQuestion) {
    questions.value = await QuestionsService.addQuestion(questions.value, newQuestion);
  }

  async function updateQuestion(updatedQuestion: IQuestion) {
    questions.value = await QuestionsService.updateQuestion(questions.value, updatedQuestion);
  }

  async function deleteQuestion(id: string) {
    questions.value = await QuestionsService.deleteQuestion(questions.value, id);
  }


  return {
    questions,
    loadQuestions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
  };
});
