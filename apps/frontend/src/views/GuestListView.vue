<script lang="ts" setup>
import api from "@/api";
import type { GuestListGuest } from "@/api/guest";
import { QItem, QItemLabel, QItemSection, QList, QToggle } from "quasar";
import { computed, onBeforeMount, ref } from "vue";
import { useGuestStore } from "@/stores";
import { circleColour, attendanceIcon, capitalize } from "../utils";
import { storeToRefs } from "pinia";

const guestData = ref<GuestListGuest[]>([]);
const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
onBeforeMount(async () => {
  guestData.value = await api.guest.list(guest?.value?.code || "");
  guestData.value.sort((a, b) => (a.circle < b.circle ? 1 : -1));
});

const filter = ref(false);
const filteredGuestData = computed(() =>
  guestData.value.filter((guest) => guest.attending && guest.attending !== "no")
);
</script>
<template>
  <div class="title align-left">
    Here’s a list of confirmed and unconfirmed peeps
  </div>
  <div class="row justify-center">
    <div style="margin: 0 2rem">
      <div class="row text notes q-gutter-x-lg">
        <q-toggle v-model="filter" icon="filter_alt" size="lg" />
        Filter
      </div>
      <q-list class="row justify-evenly q-gutter-sm">
        <q-item
          v-for="guest in filter ? filteredGuestData : guestData"
          v-bind:key="guest.name"
          class="list-item"
        >
          <div
            class="sepa"
            :style="`--circle: ${circleColour(guest.circle)};`"
          />
          <q-item-section>
            <q-item-label>{{ guest.name }} {{ guest.surname }}</q-item-label>
            <q-item-label caption style="display: inline; font-size: 1rem">{{
              capitalize(guest.circle)
            }}</q-item-label>
            <img
              :class="`attending-icon ${guest.attending}`"
              :src="attendanceIcon(guest.attending)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<style>
.sepa {
  margin: auto 10px auto -10px;
  height: 90%;
  width: 2px;
  border-radius: 99px;
  background-color: var(--circle);
}
.list-item {
  display: block;
  color: var(--vt-c-black-mute);
  width: 20rem;
  text-align: left;
  text-decoration: none;
  border: 3px solid var(--vt-c-black-mute);
  border-radius: 10px;
  white-space: nowrap;
  font-family: "Patrick";
}
.attending-icon {
  position: absolute;
  right: 0;
}

.attending-icon.yes {
  filter: invert(46%) sepia(71%) saturate(414%) hue-rotate(83deg)
    brightness(101%) contrast(46%);
}

.attending-icon.no {
  filter: invert(24%) sepia(82%) saturate(7434%) hue-rotate(339deg)
    brightness(92%) contrast(63%);
}

.attending-icon.maybe {
  filter: invert(97%) sepia(36%) saturate(5682%) hue-rotate(314deg)
    brightness(108%) contrast(59%);
}
</style>
