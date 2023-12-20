<script setup lang="ts">
import UserIcon from '../../assets/icons/UserIcon.vue';
import type { Room } from '../../types'
import { format } from 'date-fns'

const { room } = defineProps<{ room: Room }>()
</script>

<template>
  <li class="flex py-6 border-b border-b-primary-3 cursor-pointer">
    <div class="flex">
      <figure class="rounded-full w-[34px] h-[34px] bg-primary-4 flex items-center justify-center">
        <UserIcon color="black" />
      </figure>
      <figure class="rounded-full w-[34px] h-[34px] bg-primary-1 flex items-center justify-center -translate-x-1/2">
        <UserIcon color="white" />
      </figure>
    </div>
    <div class="flex-1 text-primary-2">
      <div class="flex items-center gap-x-4 mb-2">
        <h3 class="text-primary-1 font-bold">{{ room.name }}</h3>
        <p>{{ format(new Date(room.created_at), 'MMMM d, yyyy HH:mm') }}</p>
      </div>
      <h4 class="font-bold">Cameron Philips :</h4>
      <p>Please check this out!</p>
    </div>
    <span class="bg-indicator-3 rounded-full w-[10px] h-[10px] self-center"></span>
  </li>
</template>