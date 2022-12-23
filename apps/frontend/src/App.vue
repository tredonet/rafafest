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
    <div class="page">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  z-index: 10;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
  background-color: var(--vt-c-white-soft);
}

.page {
  margin: 0 auto;
  height: calc(100vh - 58px);
  overflow-y: scroll;
}
</style>
