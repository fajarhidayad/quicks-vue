<script setup lang="ts">
interface FABProps {
  title: string;
  isMenuActive: boolean;
  isPopoverActive: boolean;
}

const props = defineProps<FABProps>()
</script>

<template>
  <button :class="{
    'transition-all duration-300 bg-white rounded-full w-[60px] h-[60px] flex items-center justify-center': true,
    'translate-x-0 opacity-100': props.isMenuActive,
    'translate-x-full opacity-0 pointer-events-none': !props.isMenuActive,
  }">
    <span v-if="!props.isPopoverActive" class="absolute -top-3 text-xs text-white -translate-y-full">{{ props.title
    }}</span>
    <slot></slot>
  </button>
</template>
