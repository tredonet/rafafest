<script setup lang="ts">
import api from "@/api";
import { guest } from "@/api/guest";
import { GuestListWidget } from "@/components";
import { useAuthStore } from "@/stores";
import type { Activity, Guest } from "@rafafest/core";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const { token } = storeToRefs(authStore);
const router = useRouter();
const data = ref<Guest[]>([]);
const activities: Activity[] = [
  "Beach",
  "DinnerOne",
  "PubCrawl",
  "Park",
  "DinnerTwo",
  "Party",
  "Brunch",
];

onBeforeMount(async () => {
  if (!token.value) return router.push("/login");
  try {
    //@ts-ignore
    data.value = await api.guest.listAll(token.value.token);
  } catch {
    router.push("/login");
  }
});
</script>
<template>
  <div class="row justify-center">
    <div class="content-wide flex q-gutter-xl justify-center presence-list">
      <GuestListWidget
        v-for="activity in activities"
        :guestList="
          data.filter((guest) => guest.attending && guest.attending != 'no')
        "
        :activityFilter="activity"
        v-bind:key="activity"
      />
    </div>
  </div>
</template>
<style>
.presence-list ul {
  list-style: none;
  line-height: normal;
}
.presence-list ul > li {
  font-weight: 500;
  font-size: 1.1rem;
}
</style>
