<script setup lang="ts">
import api from "@/api";
import { GuestListWidget } from "@/components";
import { useAuthStore } from "@/stores";
import type { Activity, Guest } from "@rafafest/core";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { circleColour, attendanceIcon } from "../utils";

const authStore = useAuthStore();
const { token } = storeToRefs(authStore);
const showAttendanceDates = ref(false);
const router = useRouter();
const data = ref<Guest[]>([]);
const activities: Activity[] = [
  "Beach",
  "PubCrawl",
  "Park",
  "Dinner",
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
    <div class="flex content q-gutter-xl presence-list justify-center">
      <GuestListWidget
        v-for="activity in activities"
        :guestList="
          data.filter((guest) => guest.attending && guest.attending != 'no')
        "
        :activityFilter="activity"
        v-bind:key="activity"
      />
      <q-card class="faq-card guestlist-card">
        <q-card-section>
          <div class="text-h5">Attendence Dates</div>
        </q-card-section>

        <q-separator inset />
        <q-card-actions class="widget-actions">
          <q-btn class="button" @click="() => (showAttendanceDates = true)"
            >List</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>
  </div>
  <q-dialog v-model="showAttendanceDates" fullWidth>
    <q-card>
      <q-card-section>
        <div class="text-h6">Attendance Dates</div>
      </q-card-section>
      <q-card-section>
        <q-list class="row justify-evenly q-gutter-sm">
          <q-item
            v-for="guest in data.filter(
              (guest) => guest.attending == 'yes' || guest.attending == 'maybe'
            )"
            v-bind:key="guest.name"
            class="list-item"
          >
            <div
              class="sepa"
              :style="`--circle: ${circleColour(guest.circle)};`"
            />
            <q-item-section>
              <q-item-label>{{ guest.name }} {{ guest.surname }}</q-item-label>
              <q-item-label caption style="display: inline; font-size: 1rem"
                >{{ guest.attendenceDates.from }} -
                {{ guest.attendenceDates.to }}</q-item-label
              >
              <img
                v-if="guest.attending"
                :class="`attending-icon ${guest.attending}`"
                :src="attendanceIcon(guest.attending)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
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
