<script setup lang="ts">
import { NavBar } from "@/components";
import { RouterView } from "vue-router";
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";

const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
onBeforeMount(async () => {
  if (guest?.value) await guestStore.fetch(guest.value.code);
});
</script>

<template>
  <div class="view">
    <NavBar class="navbar" v-if="guest" />
    <div class="wrapper">
      <RouterView />
    </div>
  </div>
</template>
