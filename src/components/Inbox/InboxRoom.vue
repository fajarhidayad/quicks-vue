<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import CloseIcon from '../../assets/icons/CloseIcon.vue';
import LeftArrowIcon from '../../assets/icons/LeftArrowIcon.vue';
import { getRoomById, getMessages } from "../../api"
import Loading from '../Loading.vue';
import Message from './Message.vue';

const props = defineProps<{ idRoom: number }>()
const emits = defineEmits<{ (e: '@closeRoom'): void, (e: '@closePopover'): void }>()

const { data: room, isLoading } = useQuery({
  queryKey: ["chatRoom", props.idRoom],
  queryFn: async () => {
    const data = await getRoomById(props.idRoom)
    return data
  }
})

const { data: messages } = useQuery({
  queryKey: ['chatMessages', props.idRoom],
  queryFn: async () => {
    const data = await getMessages(props.idRoom)
    console.log(data);
    return data
  }
})
</script>

<template>
  <section v-if="!isLoading && room" class="flex flex-col h-full">
    <div class="flex items-center px-6 py-5 border-b border-b-[#B2B2B2] gap-x-[14px]">
      <button @click="emits('@closeRoom')">
        <LeftArrowIcon />
      </button>

      <div class="mr-auto">
        <h3 class="text-primary-1 mb-2">{{ room[0].name }}</h3>
        <p class="text-xs text-primary-2">{{ room[0].user.length }} Participants</p>
      </div>

      <button @click="emits('@closePopover')">
        <CloseIcon />
      </button>
    </div>

    <ul class="flex-1 px-5 py-3 flex flex-col gap-y-2">
      <Message v-for="message in messages" :key="message.id" :body="message.body" :user="message.user"
        :created_at="message.created_at" />

      <li class="flex items-center justify-between gap-x-7 mt-5">
        <span class="h-[1px] flex-1 bg-primary-2"></span>
        <p class="text-primary-2 font-bold">Today June 09, 2021</p>
        <span class="h-[1px] flex-1 bg-primary-2"></span>
      </li>

      <li class="flex gap-x-2">
        <div class="">
          <h3 class="text-chat-11 mb-1">Mary Hilda</h3>
          <div class="bg-chat-1 rounded p-[10px] text-primary-2">
            <p class="mb-2">No worries. It will be completed ASAP. I’ve asked him yesterday.</p>
            <p class="text-xs">19:32</p>
          </div>
        </div>
        <button class="self-start mt-4">...</button>
      </li>

      <li class="flex items-center justify-between gap-x-7 mt-5">
        <span class="h-[1px] flex-1 bg-indicator-3"></span>
        <p class="text-indicator-3 font-bold">New Message</p>
        <span class="h-[1px] flex-1 bg-indicator-3"></span>
      </li>

      <li class="flex gap-x-2">
        <div class="">
          <h3 class="text-chat-33 mb-1">Obaidullah Amarkhil</h3>
          <div class="bg-chat-3 rounded p-[10px] text-primary-2">
            <p class="mb-2">Morning. I’ll try to do them. Thanks</p>
            <p class="text-xs">19:32</p>
          </div>
        </div>
        <button class="self-start mt-4">...</button>
      </li>
    </ul>

    <div class="py-6 px-5 flex mt-auto gap-x-3">
      <input type="text" class="flex-1 border border-primary-3 rounded focus:outline-none py-[10px] px-4"
        placeholder="Type a new message" />
      <button class="bg-primary-1 text-white rounded py-2 px-4">Send</button>
    </div>
  </section>

  <div v-if="isLoading" class="h-full flex">
    <Loading :is-loading="isLoading">
      Loading chats...
    </Loading>
  </div>
</template>