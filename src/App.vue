<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';
import Navbar from './components/Navbar.vue';
import ActionMenu from './components/ActionMenu.vue';

</script>

<template>
  <div class="min-h-screen flex bg-[#333]">
    <Sidebar />
    <main class="relative flex-1">
      <Navbar />
      <ActionMenu />
    </main>
  </div>
</template>

<style scoped></style>
