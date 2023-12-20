<script setup lang="ts">
import { ref } from 'vue';
import { formatDistanceToNowStrict, format } from 'date-fns'
import CheckIcon from '../../assets/icons/CheckIcon.vue';
import ChevronUp from '../../assets/icons/ChevronUp.vue';
import ClockIcon from '../../assets/icons/ClockIcon.vue';
import PencilIcon from '../../assets/icons/PencilIcon.vue';
import ThreeDots from '../../assets/icons/ThreeDots.vue';
import type { Task } from '../../types';
import DropdownMenu from '../DropdownMenu.vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { setTaskDone, deleteTask } from '../../api'

const { task } = defineProps<{ task: Task }>()
const emits = defineEmits<{ (e: '@toggleTaskDone', id: number, isDone: boolean): void }>()

const queryClient = useQueryClient()

const isDone = ref(task.isDone)
const isOpen = ref(!isDone.value)
const title = ref(task.title)
const deadline = ref(task.deadline)
const body = ref(task.body)

const setDoneMutation = useMutation({
  mutationFn: setTaskDone,
  onSuccess() {
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
  }
})

const deleteMutation = useMutation({
  mutationFn: deleteTask,
  onSuccess() {
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
  }
})

function toggleDetail() {
  isOpen.value = !isOpen.value
}

function toggleTaskDone() {
  setDoneMutation.mutate({ id: task.id, isDone: !task.isDone })
}
</script>

<template>
  <li class="flex items-start gap-x-[22.5px] border-b border-b-primary-3 last:border-b-transparent py-5">
    <div class="flex relative mt-1">
      <input type="checkbox" :value="isDone" :onchange="toggleTaskDone" :checked="isDone"
        class="relative peer appearance-none w-[18px] h-[18px] rounded-sm border-2 border-primary-3 bg-none" />
      <CheckIcon class="absolute left-[1px] top-[1px] hidden peer-checked:block pointer-events-none" />
    </div>

    <div class="flex-1">
      <div class="flex justify-between items-start gap-x-3">
        <input v-if="!task.title" :class="{
          'flex-1 text-primary-2 px-[14px] py-3 font-bold border border-transparent rounded focus:border-primary-3 focus:outline-none': true,
          'line-through text-primary-3': isDone
        }" placeholder="Type Task Title" v-model="title" />
        <h3 v-if="task.title" :class="{ 'text-primary-2 font-bold': true, 'line-through text-primary-3': isDone }">{{
          task.title }}</h3>

        <div class="flex flex-shrink-0 ml-auto">
          <p v-if="!isDone" class="text-indicator-3 text-sm mr-5">{{ formatDistanceToNowStrict(new Date(task.deadline)) +
            ' left' }}
          </p>
          <p class="text-primary-3 text-sm mr-[10px]">{{ format(new Date(task.deadline), 'dd/MM/yyyy') }}</p>
          <button class="mr-4" @click="toggleDetail">
            <ChevronUp
              :class="{ 'transition-all duration-300 ease-out': true, 'rotate-0': isOpen, 'rotate-180': !isOpen }" />
          </button>
          <DropdownMenu :width="126">
            <template #icon class="mr-5">
              <ThreeDots />
            </template>
            <template #content>
              <button @click="deleteMutation.mutate(task.id)"
                class="text-indicator-3 px-[18px] py-4 w-fit">Delete</button>
            </template>
          </DropdownMenu>
        </div>
      </div>

      <div :class="{
        'flex items-center gap-x-[18px] mb-3 transition-all duration-200 ease-out': true,
        'mt-3 max-h-fit': isOpen,
        'max-h-0 overflow-hidden pointer-events-none': !isOpen
      }">
        <ClockIcon />
        <input v-model="deadline" type="date" class="border border-primary-2 rounded p-3 w-[193px]" />
      </div>

      <div :class="{
        'flex items-start gap-x-[18px]': true,
        'max-h-fit': isOpen,
        'max-h-0 overflow-hidden pointer-events-none': !isOpen
      }">
        <div class="flex-shrink-0 mt-3">
          <PencilIcon :color="task.body ? 'active' : 'inactive'" />
        </div>
        <textarea v-model="body"
          class="flex-1 text-primary-2 focus:outline-none border border-transparent rounded p-3 focus:border-primary-3"
          rows="1" placeholder="Description" />
      </div>
    </div>
  </li>
</template>