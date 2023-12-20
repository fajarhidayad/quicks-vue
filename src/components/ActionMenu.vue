<script setup lang="ts">
import { ref } from 'vue';
import InboxIcon from '../assets/icons/InboxIcon.vue';
import QuickIcon from '../assets/icons/QuickIcon.vue';
import FloatActionButton from './FloatActionButton.vue';
import TaskIcon from '../assets/icons/TaskIcon.vue';
import Inbox from './Inbox/Inbox.vue';
import Task from './Task/Task.vue';

type PopoverState = 'Inbox' | 'Task' | null

const isMenuActive = ref(false);
const isPopoverActive = ref<PopoverState>(null);

function togglePopover(state: PopoverState) {
  if (isPopoverActive.value === state) isPopoverActive.value = null
  else {
    isPopoverActive.value = state
  }
}

function toggleMenu() {
  isMenuActive.value = !isMenuActive.value
  isPopoverActive.value = null
}
</script>

<template>
  <div class="absolute flex flex-row-reverse gap-x-[26px] items-center bottom-[27px] right-[34px] z-50">
    <div class="relative z-50">
      <button @click="toggleMenu" :class="{
        ' rounded-full w-[68px] h-[68px] flex items-center justify-center transition-all duration-200': true,
        'bg-primary-1': isPopoverActive === null,
        'bg-indicator-2': isPopoverActive === 'Inbox',
        'bg-indicator-1': isPopoverActive === 'Task',
      }">
        <InboxIcon v-if="isPopoverActive === 'Inbox'" :is-active="true" />
        <TaskIcon v-else-if="isPopoverActive === 'Task'" :is-active="true" />
        <QuickIcon v-else />
      </button>
      <div @click="togglePopover(null)" :class="{
        'absolute -z-10 top-0 bg-primary-3 w-[68px] h-[68px] rounded-full transition-all duration-200': true,
        '-translate-x-[15px]': isPopoverActive,
        'translate-x-0': !isPopoverActive
      }">
      </div>
      <Inbox :is-active="isPopoverActive === 'Inbox'" />
      <Task :is-active="isPopoverActive === 'Task'" />
    </div>
    <FloatActionButton v-if="isPopoverActive !== 'Inbox'" title="Inbox" @click="togglePopover('Inbox')"
      :is-menu-active="isMenuActive" :is-popover-active="isPopoverActive !== null">
      <InboxIcon :is-active="false" />
    </FloatActionButton>
    <FloatActionButton v-if="isPopoverActive !== 'Task'" title="Task" @click="togglePopover('Task')"
      :is-menu-active="isMenuActive" :is-popover-active="isPopoverActive !== null">
      <TaskIcon :is-active="false" />
    </FloatActionButton>
  </div>
</template>