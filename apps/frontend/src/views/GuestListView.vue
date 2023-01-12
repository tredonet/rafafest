<script lang="ts" setup>
import api from "@/api";
import { Circle } from "@rafafest/core";
import yes from "@/assets/icons/check-circle.svg";
import no from "@/assets/icons/times-circle.svg";
import maybe from "@/assets/icons/question-circle.svg";
import rsvp from "@/assets/icons/clock.svg";
import type { GuestListGuest } from "@/api/guest";
import { QItem, QItemLabel, QItemSection, QList, QToggle } from "quasar";
import { computed, onBeforeMount, ref } from "vue";
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";

const guestData = ref<GuestListGuest[]>([]);
const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
onBeforeMount(async () => {
  guestData.value = await api.guest.list(guest?.value?.code || "");
  guestData.value.sort((a, b) => (a.circle < b.circle ? 1 : -1));
});

const filter = ref(false);
const guestList = computed(() => {
  return filter.value
    ? guestData.value.filter(
        (guest) => guest.attending && guest.attending !== "no"
      )
    : guestData.value;
});

function cap(string: string | undefined) {
  if (!string) return;
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function icon(attending: "yes" | "no" | "maybe" | null) {
  if (!attending) return rsvp;
  const icons = {
    yes,
    no,
    maybe,
  };
  return icons[attending];
}
function circleColour(circle: Circle): string {
  const colours = {
    wolfach: "#005198",
    freiburg: "#CE2638",
    utrecht: "#CC0000",
    budapest: "#436F4D",
    valencia: "#FCDD09",
    bolt: "#34D186",
    nagua: "#002D62",
    gigtor: "#77D848",
    alongtheway: "#7C62FF",
  };
  return colours[circle];
}
</script>
<template>
  <div class="page">
    <div class="content-wide">
      <div class="row justify-left" style="margin: 0 5%">
        <div class="title">
          Here’s a list of confirmed and unconfirmed peeps
        </div>
      </div>
    </div>
    <div class="row justify-center">
      <div class="content-wide">
        <div class="row notes q-gutter-x-lg">
          <q-toggle v-model="filter" icon="filter_alt" size="lg" />
          Filter
        </div>
        <q-list class="row justify-evenly q-gutter-sm">
          <q-item
            v-for="guest in guestList"
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
                cap(guest.circle)
              }}</q-item-label>
              <img
                :class="`attending-icon ${guest.attending}`"
                :src="icon(guest.attending)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
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
