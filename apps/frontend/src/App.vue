<script setup lang="ts">
import { NavBar } from "@/components";
import { RouterView } from "vue-router";
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";

const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
</script>

<template>
  <div class="view">
    <NavBar class="navbar" v-if="guest" />
    <div class="wrapper">
      <RouterView />
    </div>
  </div>
</template>
