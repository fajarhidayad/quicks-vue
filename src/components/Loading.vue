<script setup lang="ts">
const props = defineProps<{ isLoading: boolean }>()
</script>

<template>
  <div v-if="props.isLoading" class="flex-1 flex flex-col justify-center items-center gap-y-3">
    <div
      class="w-16 h-16 border-8 border-t-[#C8C8C8] border-r-[#C8C8C8] border-l-[#F8F8F8] border-b-[#F8F8F8] rounded-full animate-spin">
    </div>
    <p class="text-primary-2 text-sm">
      <slot></slot>
    </p>
  </div>
</template>