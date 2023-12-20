<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { computed, ref } from 'vue';
import { getTasks } from '../../api';
import ChevronUp from '../../assets/icons/ChevronUp.vue';
import DropdownMenu from '../DropdownMenu.vue';
import Popover from '../Popover.vue';
import TaskItem from './TaskItem.vue';
import Loading from '../Loading.vue';

const categories = ['Personal Errands', 'Urgent To-Do'] as const

const props = defineProps<{ isActive: boolean }>()

const newTask = ref(false)

const { data: tasks, isLoading } = useQuery({
  queryKey: ['tasks'],
  queryFn: getTasks
})

const tasksDone = computed(() => {
  return tasks.value?.filter(item => item.isDone === true)
})
const tasksNotDone = computed(() => {
  return tasks.value?.filter(item => item.isDone === false)
})

function toggleNewTask() {
  newTask.value = !newTask.value;
}

</script>

<template>
  <Popover :is-active="props.isActive">
    <section class="flex flex-col h-full">
      <div class="flex items-center justify-between px-7 py-5">
        <DropdownMenu :width="288">
          <template #icon>
            <div
              class="ml-20 flex justify-between items-center focus:outline-none border border-primary-2 rounded px-[14px] py-[10px] w-32">
              <p>My Tasks</p>
              <ChevronUp class="rotate-180" />
            </div>
          </template>
          <template #content>
            <ul>
              <li v-for="cat in categories" class="border-b border-b-primary-3 last:border-b-0 text-primary-2">
                <button class="w-full text-start hover:bg-gray-100 p-3">{{ cat }}</button>
              </li>
            </ul>
          </template>
        </DropdownMenu>

        <button @click="toggleNewTask" class="bg-primary-1 text-white rounded px-4 py-2">New Task</button>
      </div>

      <ul v-if="tasks && !isLoading" class="flex-1 px-[29px] overflow-y-scroll">
        <TaskItem v-for="task in tasksNotDone" :key="task.id" :task="task" />
        <TaskItem v-for="task in tasksDone" :key="task.id" :task="task" />
        <TaskItem v-if="newTask"
          :task="{ id: 0.0, title: '', body: '', created_at: new Date(), isDone: false, deadline: new Date() }" />
      </ul>

      <Loading :is-loading="isLoading">Loading Task List...</Loading>
    </section>
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