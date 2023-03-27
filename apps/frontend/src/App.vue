<script setup lang="ts">
import { NavBar } from "@/components";
import { RouterView } from "vue-router";
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";

const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
</script>

<template>
  <div class="my-container">
    <NavBar v-if="guest" />
    <RouterView />
  </div>
</template>
<style>
.my-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
iframe {
  flex: 1;
}
</style>
