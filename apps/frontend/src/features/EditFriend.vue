<script setup lang="ts">
import { useGuestStore } from "@/stores";
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
  QCard,
  QCardActions,
  QCardSection,
  useQuasar,
} from "quasar";
import { computed, ref } from "vue";
type Props = {
  friend: Guest;
};

const $q = useQuasar();
const guestStore = useGuestStore();
const props = defineProps<Props>();
const activities = ref(["dinner1", "dinner2", "party", "brunch"]);
const friend = ref(props.friend);
const showDatePicker = ref(false);
const datesString = computed(
  () =>
    `${friend?.value?.attendenceDates.from ?? ""} - ${
      friend?.value?.attendenceDates.to ?? ""
    }`
);
const onSubmit = async () => {
  try {
    console.log('HIER');
    await guestStore.updateFriend(friend.value);
  } catch {
    $q.notify({
      position: "top",
      message: `Updating ${friend.value.name}'s invite Failed :(`,
      color: "red",
      timeout: 1000,
    });
  }
};
</script>
<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <q-form class="blur-background q-col-gutter-y-md" v-if="friend">
        <div class="row label">{{ friend.name }}'s details</div>
        <div class="row q-gutter-x-md">
          <q-input
            id="name"
            class="col"
            rounded
            outlined
            label="First name"
            v-model="friend.name"
          />
          <q-input
            id="surname"
            class="col"
            rounded
            outlined
            label="Last name"
            v-model="friend.surname"
          />
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
      </q-form>
    </q-card-section>

    <q-card-actions vertical>
      <q-btn
        class="col custom-button"
        label="Save"
        type="submit"
        @click="onSubmit"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>
