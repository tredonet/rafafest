<script setup lang="ts">
import type { Activity, Guest } from "@rafafest/core";
import { computed, ref } from "vue";

const props = defineProps<{
  guestList: Guest[];
  activityFilter: Activity;
}>();

const showList = ref(false);
const showDietryOptions = computed(() =>
  ["Dinner", "Brunch"].includes(props.activityFilter)
);

const attendees = computed(() =>
  props.guestList.filter((guest) =>
    guest.activities.includes(props.activityFilter)
  )
);
const abscences = computed(() =>
  props.guestList.filter(
    (guest) => !guest.activities.includes(props.activityFilter)
  )
);

const dietryList = computed(() => {
  let list = {
    vegetarian: 0,
    vegan: 0,
    "lactose-free": 0,
    "gluten-free": 0,
    "soy-free": 0,
    "nut-free": 0,
  };

  attendees.value.forEach((guest) => {
    guest.dietryPreference.forEach((diet) => list[diet]++);
  });

  return Object.entries(list).filter(([key, val]) => val);
});
</script>
<template>
  <q-card class="faq-card guestlist-card">
    <q-card-section>
      <div class="text-h5">{{ activityFilter }}</div>
      <div class="text-subtitle2">
        {{ attendees.length }}/{{ guestList.length }}
      </div>
    </q-card-section>
    <q-separator v-if="showDietryOptions" inset />
    <q-card-section v-if="showDietryOptions">
      <ul>
        <li v-for="[key, val] in dietryList" v-bind:key="key">
          {{ key }}: {{ val }}
        </li>
      </ul>
    </q-card-section>
    <q-separator inset />
    <q-card-actions class="widget-actions">
      <q-btn class="button" @click="() => (showList = true)">List</q-btn>
    </q-card-actions>
  </q-card>

  <q-dialog v-model="showList" class="presence-list">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ activityFilter }}</div>
      </q-card-section>
      <q-card-section horizontal>
        <div>
          <q-card-section>
            <div class="text-h6">Attendees</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <ul>
              <li v-for="attendee of attendees" v-bind:key="attendee.name">
                {{ attendee.name }}
                <div v-if="showDietryOptions" class="dietry-preference">
                  {{ attendee.dietryPreference.join(", ") }}
                </div>
              </li>
            </ul>
          </q-card-section>
        </div>
        <div>
          <q-card-section>
            <div class="text-h6">Abscences</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <ul>
              <li v-for="abscence of abscences" v-bind:key="abscence.name">
                {{ abscence.name }}
              </li>
            </ul>
          </q-card-section>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
.guestlist-card {
  width: 20rem;
}

.widget-actions > * {
  flex: 1;
}
.dietry-preference {
  font-family: "Patrick";
  color: var(--vt-c-text-light-2);
  margin: 0 8px;
}
</style>
