<script lang="ts" setup>
import api from "@/api";
import type { GuestListGuest } from "@/api/guest";
import { QCard, QItem, QItemLabel, QItemSection, QList } from "quasar";
import { onBeforeMount, ref } from "vue";

const list = ref<GuestListGuest[]>([]);
onBeforeMount(async () => {
  list.value = await api.guest.list();
  list.value.sort((a, b) => (a.circle < b.circle ? 1 : -1));
});
function cap(string: string | undefined) {
  if (!string) return;
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>
<template>
  <q-card style="margin: 0 1vw">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Guest List</q-toolbar-title>
    </q-toolbar>
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="guest in list" v-bind:key="guest.name">
        <q-item-section>
          <q-item-label>{{ guest.name }} {{ guest.surname }}</q-item-label>
          <q-item-label caption>{{ cap(guest.circle) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>
