<script setup lang="ts">
import { format } from 'date-fns';

const props = defineProps<{ user: string, body: string, created_at: Date }>()
</script>

<template>
  <li class="flex self-end gap-x-2">
    <button class="self-start mt-4">...</button>
    <div class="">
      <h3 class="text-chat-22 text-end mb-1">{{ props.user }}</h3>
      <div class="bg-chat-2 rounded p-[10px] text-primary-2">
        <p class="mb-2">{{ props.body }}</p>
        <p class="text-xs">{{ format(new Date(props.created_at), 'HH:mm') }}</p>
      </div>
    </div>
  </li>
</template>