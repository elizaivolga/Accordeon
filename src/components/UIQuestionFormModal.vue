<template>
  <div class="modal-window">
    <div class="modal-window__wrapper">
      <form class="question-form" @submit.prevent="submitForm">
        <div class="question-form__header">
          <h3 class="name">{{ isCreate ? 'Добавить' : 'Редактировать' }} вопрос</h3>
          <div class="close" @click="closeModal()">close</div>
        </div>
        <div class="question-form__info">
          <InputCustom
            v-model="questionForm.name"
            :i-error="v$.name.$error"
            :i-error-name="v$.name.required.$message"
            title="Вопрос:"
          />
          <InputCustom
            v-model="questionForm.answer"
            :i-error="v$.answer.$error"
            :i-error-name="v$.answer.required.$message"
            title="Ответ:"
            textarea
          />
        </div>
        <CheckboxCustom
          :checked="questionForm.isPinned"
          class="question-form__pinned"
          @change="questionForm.isPinned = !questionForm.isPinned"
        >
          Закрепить сверху
        </CheckboxCustom
        >
        <ButtonCustom type="submit" class="question-form__submit" bForm="add">
          {{ isCreate ? 'Добавить' : 'Сохранить' }}
        </ButtonCustom>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IQuestion } from '@/types/questions'
import { useQuestionsStore } from '@/stores/questionsStore'
import { reactive, computed } from 'vue'
import { required, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const props = defineProps<{
  question: IQuestion | undefined
}>()

const isCreate = computed(() => !props.question)

const store = useQuestionsStore()
const emit = defineEmits<{
  (event: 'close'): void
}>()

const questionForm = reactive({
  name: props.question?.name || '',
  answer: props.question?.answer || '',
  isPinned: Boolean(props.question?.isPinned)
})

const rules = computed(() => ({
  name: { required: helpers.withMessage('Поле обязательно для ввода', required) },
  answer: { required: helpers.withMessage('Поле обязательно для ввода', required) }
}))

const v$ = useVuelidate(rules, questionForm)

function closeModal() {
  emit('close')
}

async function submitForm() {
  try {
    await v$.value.$validate()
    if (!v$.value.$error) {
      const questionData: IQuestion = {
        id: isCreate.value ? Date.now().toString() : props.question!.id,
        name: questionForm.name,
        answer: questionForm.answer,
        isPinned: questionForm.isPinned
      }
      
      if (isCreate.value) {
        await store.addQuestion(questionData)
      } else {
        await store.updateQuestion(questionData)
      }

      closeModal()
    }
  } catch (error) {
    console.error('Ошибка при обработке вопроса:', error)
  }
}
</script>

<style lang="scss" scoped>
.modal-window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  &__wrapper {
    background: #fff;
    border-radius: 10px;
    width: 400px;
    padding: 13px 14px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
}

.question-form {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;

    .name {
      margin: 0;
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
    }

    .close {
      cursor: pointer;
      font-size: var(--font-size-xs);

      &:hover {
        color: #888;
      }
    }
  }

  &__info {
    margin-bottom: 16px;

    & > *:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__pinned {
    margin-bottom: 16px;
  }
}
</style>