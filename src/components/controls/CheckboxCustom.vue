<template>
    <div
        class="checkbox checkbox_default"
    >
        <input
            :id="id"
            :name="name"
            :checked="checked"
            type="checkbox"
            class="custom-checkbox"

            @click="handleClick($event)"
        >
        <label
            :for="id || name"
            class="checkbox__label"
        >
            <slot>
                {{ text }}
            </slot>
        </label>
    </div>
</template>

<script setup lang="ts">
import '/src/assets/css/controls/checkbox-custom.scss'
import { ref, watch, onMounted } from 'vue';

const initialValue = ref<boolean>(false)

const props = defineProps({
  // Default Checkbox Props
  name: { type: String, default: null },
  id: { type: String, default: null },
  text: { type: String, default: null },
  checked: { type: Boolean, default: false },
  value: { type: Boolean, default: false },

  // Checkbox Types
  defaultType: { type: Boolean, default: false }
})

const emit = defineEmits(['input', 'click'])

watch(() => props.value, (newval) => {
  initialValue.value = newval
})

watch(() => props.checked, (newval) => {
  initialValue.value = newval
})

watch(() => initialValue, (val, oldVal) => {
  if (val !== oldVal) {
    emit('input', val)
  }
})

onMounted(() => {
  initialValue.value = props.checked
})

const handleClick = (e: any) => {
  emit('click', e)
  if (!e.isPropagationStopped) {
    initialValue.value = e.target.checked
  }
  return e
}

</script>