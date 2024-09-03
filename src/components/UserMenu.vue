<script setup lang="ts">
import type { User } from 'lucia';

defineProps<{
  currentUser: User | null;
}>();

const logout = () => {
  
};
</script>

<template>
  <div class="flex">
    <div v-if="currentUser">
      {{ currentUser && currentUser.email }}

      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <a href="/login">Login</a>
    </div>
  </div>
</template>
