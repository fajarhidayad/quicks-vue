<script setup lang="ts">
const props = defineProps<{ isActive: boolean }>()
</script>
  
<template>
  <div :class="{
    'absolute bottom-[83px] right-0 bg-white rounded w-[734px] h-[737px] transition-all duration-200': true,
    'translate-y-4 opacity-0 pointer-events-none': !props.isActive,
    'translate-y-0 opacity-100': props.isActive
  }">
    <slot></slot>
  </div>
</template>
