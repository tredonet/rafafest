<script setup lang="ts">
import { usePreferredColorScheme } from "@vueuse/core";
import { NavBar } from "@/components";
import { RouterView } from "vue-router";
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";

const preferredColor = usePreferredColorScheme();
const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
</script>

<template>
  <div class="wrapper">
    <NavBar class="navbar" v-if="guest" />
    <div class="content">
      <RouterView class="content" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--color-background-soft);
}

.navbar {
  height: 5vh;
}

.content {
  margin: 0 auto;
  height: 90vh;
  overflow-y: scroll;
}
</style>
