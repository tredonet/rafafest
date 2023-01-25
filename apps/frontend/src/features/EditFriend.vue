<script setup lang="ts">
import { guest } from "@/api/guest";
import type { Guest } from "@rafafest/core";
import {
  QForm,
  QInput,
  QField,
  QIcon,
  QDialog,
  QDate,
  QCheckbox,
  QBtn,
} from "quasar";
import { computed, ref } from "vue";

const activities = ref(["dinner1", "dinner2", "party", "brunch"]);
const friend = ref<Guest>({
  name: "Tonino",
  surname: "Redonet",
  email: "toninoredonet@gmail.com",
  code: "80fchh4t3y3",
  attendenceDates: { from: "13/04/2023", to: "17/04/202" },
  attending: "yes",
  activities: [],
  invites: 1,
  friends: ["63d1245a36051917cddce945"],
  dietryPreference: ["vegetarian", "nut-free"],
  active: true,
  circle: "valencia",
  yearOfAcquaintance: 2022,
  yearsShared: 1,
});

const showDatePicker = ref(false);
const datesString = computed(
  () =>
    `${friend?.value?.attendenceDates.from ?? ""} - ${
      friend?.value?.attendenceDates.to ?? ""
    }`
);
const onSubmit = () => null;
</script>
<template>
  <q-form
    class="content-narrow blur-background q-col-gutter-y-md"
    @submit="onSubmit"
  >
    <div class="row label">Your details</div>
    <div class="row q-gutter-x-md">
      <q-input
        id="name"
        class="col"
        rounded
        outlined
        :disable="Boolean(friend.name)"
        label="First name"
        v-model="friend.name"
      />
      <q-input
        id="surname"
        class="col"
        rounded
        outlined
        :disable="Boolean(friend.surname)"
        label="Last name"
        v-model="friend.surname"
      />
    </div>
    <div class="row">
      <div class="col">
        <q-input
          id="email"
          rounded
          outlined
          label="Email Address"
          type="email"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'You know, to keep you updated',
          ]"
          v-model="friend.email"
        />
      </div>
    </div>
    <div class="row">
      <div class="col" @click="() => (showDatePicker = true)">
        <q-field
          rounded
          outlined
          label="Time in Valencia (if you already know)"
          stack-label
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
          <template v-slot:control>
            {{ datesString }}
          </template>
        </q-field>
        <q-dialog v-model="showDatePicker">
          <q-date
            v-model="friend.attendenceDates"
            range
            mask="DD/MM/YYYY"
            navigation-max-year-month="2023/04"
            navigation-min-year-month="2023/04"
            minimal
            @range-end="() => (showDatePicker = false)"
          />
        </q-dialog>
      </div>
    </div>
    <div class="row label">Activities</div>
    <div class="row">
      <div class="col-6">
        <q-checkbox
          v-model="activities"
          disable
          val="dinner1"
          label="Dinner - Friday, 14th"
          style="width: 100%"
          color="primary"
        />
        <q-checkbox
          v-model="activities"
          disable
          val="party"
          label="Party/Concert - Saturday, 15th"
          style="width: 100%"
          color="primary"
        />
      </div>
      <div class="col-6">
        <q-checkbox
          v-model="activities"
          disable
          val="dinner2"
          label="Dinner - Saturday, 15th"
          style="width: 100%"
          color="primary"
        />
        <q-checkbox
          v-model="activities"
          disable
          val="brunch"
          label="Birthday Brunch - Sunday, 16th"
          style="width: 100%"
          color="primary"
        />
        <div class="coming-soon" style="opacity: 0.6">Coming soon!</div>
      </div>
    </div>
    <template v-if="guest">
      <div class="row label">Diets</div>
      <div class="row">
        <div class="col-4">
          <q-checkbox
            v-model="friend.dietryPreference"
            val="vegetarian"
            label="Vegetarian"
            color="primary"
            style="width: 100%"
          />
          <q-checkbox
            v-model="friend.dietryPreference"
            val="nut-free"
            label="Nut-free"
            style="width: 100%"
            color="primary"
          />
        </div>
        <div class="col-4">
          <q-checkbox
            v-model="friend.dietryPreference"
            val="vegan"
            label="Vegan"
            style="width: 100%"
            color="primary"
          />
          <q-checkbox
            v-model="friend.dietryPreference"
            val="soy-free"
            label="Soy-free"
            style="width: 100%"
            color="primary"
          />
        </div>
        <div class="col-4">
          <q-checkbox
            v-model="friend.dietryPreference"
            val="gluten-free"
            label="Gluten-free"
            style="width: 100%"
            color="primary"
          />
          <q-checkbox
            v-model="friend.dietryPreference"
            val="lactose-free"
            label="Lactose-free"
            style="width: 100%"
            color="primary"
          />
        </div>
      </div>
    </template>

    <div class="row">
      <q-btn class="col custom-button" label="Save" type="submit" />
    </div>
  </q-form>
</template>
