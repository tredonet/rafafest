<script setup lang="ts">
import { usePreferredColorScheme } from "@vueuse/core";
import { NavBar } from "./components";

const preferredColor = usePreferredColorScheme();
</script>

<template>
  <div class="wrapper">
    <NavBar class="navbar" />
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
  height: 90vh;
  overflow-y: scroll;
}
</style>
