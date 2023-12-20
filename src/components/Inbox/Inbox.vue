<script setup lang="ts">
import { ref } from 'vue';
import Popover from '../Popover.vue';
import SearchIcon from '../../assets/icons/SearchIcon.vue';
import InboxItem from './InboxItem.vue';
import InboxRoom from './InboxRoom.vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { getMessageRoom } from '../../api';
import Loading from '../Loading.vue';

const props = defineProps<{ isActive: boolean }>()

const emit = defineEmits<{
  (e: '@toggle', state: boolean): void
}>()
const popoverActive = ref(false);
const isRoomActive = ref(false)
const idRoom = ref<number>(0)

const queryClient = useQueryClient()

const { data: messageRooms, isLoading } = useQuery({
  queryKey: ['messageRoom'],
  queryFn: getMessageRoom,
})

function closePopover() {
  popoverActive.value = false
}

function joinRoom(id: number) {
  isRoomActive.value = true;
  idRoom.value = id
}

function closeRoom() {
  isRoomActive.value = false;
}
</script>

<template>
  <Popover :is-active="props.isActive">
    <section v-if="!isRoomActive" class="pl-[34px] pt-5 flex flex-col h-full">
      <div
        class="rounded border border-primary-3 px-[58px] py-[10px] mr-[34px] flex justify-between items-center gap-x-2">
        <input id="search" type="text" placeholder="Search" class="focus:outline-none flex-1">
        <label for="search">
          <SearchIcon color="#333" :width="12" :height="12" />
        </label>
      </div>

      <Loading :is-loading="isLoading">
        Loading Chats...
      </Loading>

      <ul v-if="!isLoading" class="flex-1 overflow-y-scroll pr-[34px]">
        <InboxItem v-for="room in messageRooms" :key="room.id" :room="room" @click="joinRoom(room.id)" />
      </ul>
    </section>
    <InboxRoom v-else @@close-room="closeRoom" @@close-popover="closePopover" :id-room="idRoom" />
  </Popover>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #bdbdbd;
  border-radius: 10px;
}
</style>