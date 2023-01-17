<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";

const router = useRouter();
const code = router.currentRoute.value.params.code.toString();
const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
onBeforeMount(async () => {
  await guestStore.fetch(code);
  if (guest?.value) return router.push("/home");
  return router.push("/error");
});
</script>
<template>
  <div>{{ JSON.stringify(guest) }}}</div>
</template>
