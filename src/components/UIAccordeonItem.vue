<template>
    <div class="accordeon-item">
        <div class="accordeon-item__question" @click="toggleAnswer">
        <h2 class="name">{{ name }}</h2>
        <div class="functional">
            <ButtonCustom v-if="isEditing" class="functional__edit" bForm="edit" @click.stop="openModal">edit</ButtonCustom>
            <ButtonCustom v-if="isEditing" class="functional__del" bForm="del" @click.stop="deleteQuestion">del</ButtonCustom>
            <div v-if="!isPinned" class="functional__expand">{{ isExpanded ? '-' : '+' }}</div>
            <div v-else class="functional__pinned"><svg-icon icon="pin" /></div>
        </div>
        </div>
        <transition name="slide">
        <div class="accordeon-item__answer" v-show="isExpanded">
            <div class="text">
                {{ answer }}
            </div>
            <router-link v-if="!isEditing" :to="`/${id}`" class="more-details">Подробнее...</router-link>
        </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SvgIcon from '@/components/controls/SvgIcon.vue'

const props = defineProps<{
  id: string,
  name: string,
  answer: string,
  isPinned: boolean,
  isEditing: boolean
}>()

const isExpanded = ref<boolean>(props.isPinned)

const emit = defineEmits<{
    (event: 'edit'): void,
    (event: 'delete', id: string): void;
}>();

function toggleAnswer() {
    if (!props.isPinned) {
        isExpanded.value = !isExpanded.value;
    }
}

function openModal() {
    emit('edit');
}

function deleteQuestion() {
    emit('delete', props.id);
}
</script>

<style lang="scss" scoped>
.accordeon-item {
    word-break: break-word;
    &__question {
        cursor: pointer;
        padding: 10px 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--text-color-alternative);
        border-radius: 5px;
        background: var(--box-header-color);
        transition: 0.3s;
        .name {
            font-size: var(--font-size-md);
            line-height: 112%;
        }
        .functional {
            display: flex;
            align-items: center;
            &__edit {
                margin-right: 8px;
            }
            &__expand {
                margin-left: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                width: 16px;
                height: 16px;
                font-weight: 700;
                font-size: 12px;
                line-height: 100%;
            }
            &__pinned {
                margin-left: 8px;
            }
        }
        &:active {
            scale: 0.98;
        }
    }
    &__answer {
        overflow: hidden;
        border-radius: 0 0 5px 5px;
        background: var(--box-color);
        padding: 8px;
        transition: max-height 0.3s ease-out, padding 0.3s ease-out;
        .text {
            margin-bottom: 8px;
        }
    }
    .slide-enter-active, .slide-leave-active {
        transition: max-height 0.3s ease, padding 0.3s ease;
    }

    .slide-enter-from, .slide-leave-to {
        max-height: 0;
        padding: 0 8px;
    }

    .slide-enter-to {
        max-height: fit-content;
    }
}
</style>