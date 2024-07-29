<template>
  <button
    class="button"
    :class="[setColor, { disabled: disabled }]"
    :autofocus="autofocus"
    :disabled="disabled"
    :form="form"
    :name="name"
    :type="type"
    @click="handleClick($event)"
  >
    <slot>
      {{ value }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import '/src/assets/css/controls/button-custom.scss'
import { computed, provide } from 'vue'

const props = defineProps({
  // Default Button Props
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  form: { type: String, default: null },
  name: { type: String, default: null },
  type: { type: String as () => 'button' | 'submit' | 'reset' | undefined, default: 'button' },
  value: { type: [String, Number], default: null },

  // Custom Button Props
  bError: { type: Boolean, default: false },
  bErrorName: { type: String, default: null },
  bIcon: { type: String, default: null },
  bIconSize: { type: [String, Number], default: '24' },
  bIconColor: { type: String, default: '#FFFFFF' },
  bForm: { type: String, default: null }
})

const setColor = computed(() => {
  if (props.bForm) {
    return 'button' + `_${props.bForm}`
  }
})

const handleClick = (e: any) => {
  return e
}
provide('click', handleClick)
</script>