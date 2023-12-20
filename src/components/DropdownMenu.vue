<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{ width: number }>()

const isActive = ref(false)
const menu = ref<HTMLDivElement | null>(null)

function toggleMenu() {
  isActive.value = !isActive.value;
}

function clickOutside(e: MouseEvent) {
  if (!menu.value) return;
  if (e.target == menu.value || e.composedPath().includes(menu.value)) return
  else {
    isActive.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', clickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', clickOutside)
})
</script>

<template>
  <div ref="menu" class="relative">
    <button @click="toggleMenu">
      <slot name="icon"></slot>
    </button>

    <div v-if="isActive" :class="{ 'absolute z-50 top-7 right-0 bg-white rounded border border-primary-3': true, }"
      :style="{ width: `${props.width}px` }">
      <slot name="content"></slot>
    </div>
  </div>
</template>
