<script lang="ts" setup>
import spriteStanding from "@/assets/img/rafa-standing-2.svg";
import heartbreak from "@/assets/icons/heart-break.svg";
import heartbeat from "@/assets/icons/heartbeat.svg";
import heart from "@/assets/icons/heart.svg";
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";
import { QForm, QInput, QDialog, QDate, useQuasar } from "quasar";
import { computed, ref } from "vue";
import { RSVPView, GuestListView } from ".";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
const plusOne = ref(false);
const activities = ref(["dinner1", "dinner2", "party", "brunch"]);
const datesString = computed(
  () =>
    `${guest?.value?.attendenceDates.from ?? ""} - ${
      guest?.value?.attendenceDates.to ?? ""
    }`
);
const showDatePicker = ref(false);
const showGuestList = ref(false);
const changeAvailability = async (option: "yes" | "no" | "maybe") => {
  if (guest?.value?.attending) guest.value.attending = option;
  if (guest?.value) await guestStore.rsvp(guest.value);
  $q.notify({
    position: "top",
    message: "Success",
    color: "primary",
    timeout: 1000,
  });
  if (option === "no") router.push("/cry");
};
const onSubmit = async () => {
  try {
    if (guest?.value) await guestStore.rsvp(guest.value);
    $q.notify({
      position: "top",
      message: "Success",
      color: "primary",
      timeout: 1000,
    });
  } catch {
    $q.notify({
      position: "top",
      message: "Updating Failed :(",
      color: "red",
      timeout: 1000,
    });
  }
};
</script>
<template>
  <div class="page">
    <RSVPView
      v-if="guest?.attending !== 'yes' && guest?.attending !== 'maybe'"
    />
    <div v-if="guest?.attending === 'yes' || guest?.attending === 'maybe'">
      <div class="row justify-center" v-if="guest.attending === 'yes'">
        <div class="title-small blur-background">
          Awesome - looking forward to see you, {{ guest.name }}
        </div>
      </div>
      <div class="row justify-center" v-if="guest.attending === 'maybe'">
        <div class="title-small blur-background">
          I really hope to see you, {{ guest.name }}!
        </div>
      </div>
      <div class="row justify-center" v-if="guest">
        <q-form
          class="content-narrow blur-background q-col-gutter-y-md"
          @submit="onSubmit"
        >
          <div class="row label">Your details</div>
          <div class="row">
            <q-input
              id="name"
              class="col"
              rounded
              outlined
              :disable="Boolean(guest.name)"
              label="First name"
              v-model="guest.name"
            />
            <q-input
              id="surname"
              class="col"
              rounded
              outlined
              :disable="Boolean(guest.surname)"
              label="Last name"
              v-model="guest.surname"
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
                  (val) =>
                    (val && val.length > 0) || 'You know, to keep you updated',
                ]"
                v-model="guest.email"
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
                  v-model="guest.attendenceDates"
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
                v-model="guest.dietryPreference"
                val="vegetarian"
                label="Vegetarian"
                color="primary"
                style="width: 100%"
              />
              <q-checkbox
                v-model="guest.dietryPreference"
                val="nut-free"
                label="Nut-free"
                style="width: 100%"
                color="primary"
              />
            </div>
            <div class="col-4">
              <q-checkbox
                v-model="guest.dietryPreference"
                val="vegan"
                label="Vegan"
                style="width: 100%"
                color="primary"
              />
              <q-checkbox
                v-model="guest.dietryPreference"
                val="soy-free"
                label="Soy-free"
                style="width: 100%"
                color="primary"
              />
            </div>
            <div class="col-4">
              <q-checkbox
                v-model="guest.dietryPreference"
                val="gluten-free"
                label="Gluten-free"
                style="width: 100%"
                color="primary"
              />
              <q-checkbox
                v-model="guest.dietryPreference"
                val="lactose-free"
                label="Lactose-free"
                style="width: 100%"
                color="primary"
              />
            </div>
          </div>
          <div class="row">
            <q-toggle v-model="plusOne" disable icon="group" />
            Bringing someome?
            <div class="coming-soon" style="opacity: 0.6">Coming soon!</div>
          </div>

          <div class="row">
            <q-btn class="col custom-button" label="Save" type="submit" />
          </div>
          <div class="row label">Change your availability</div>
          <div class="row justify-left q-gutter-sm">
            <q-btn
              unelevated
              :class="guest.attending === 'yes' && 'hidden'"
              :color="guest.attending === 'yes' ? 'primary' : 'dark'"
              rounded
              :onclick="() => changeAvailability('yes')"
            >
              100% - Yes <img class="icon" :src="heart" />
            </q-btn>
            <q-btn
              unelevated
              :class="guest.attending === 'maybe' && 'hidden'"
              :color="guest.attending === 'maybe' ? 'primary' : 'dark'"
              rounded
              :onclick="() => changeAvailability('maybe')"
            >
              Not sure yet <img class="icon" :src="heartbeat" />
            </q-btn>
            <q-btn
              unelevated
              color="dark"
              rounded
              :onclick="() => changeAvailability('no')"
            >
              I can't <img class="icon" :src="heartbreak" />
            </q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </div>
  <q-btn
    fab
    icon="group"
    color="dark"
    class="fab"
    @click="() => (showGuestList = true)"
  />
  <q-dialog v-model="showGuestList"> <GuestListView/> </q-dialog>
  <img
    class="sprite-standing-smiling"
    :src="spriteStanding"
    v-if="guest?.attending === 'yes' || guest?.attending === 'maybe'"
  />
</template>
<style>
.fab {
  position: absolute;
  left: calc(100vw - 100px);
  bottom: 100px;
}
.sprite-standing-smiling {
  bottom: 0;
  left: 0;
  position: absolute;
  height: 80vh;
}
.label {
  font-family: "Patrick";
  font-size: 1rem;
  line-height: 60%;
}

@media (max-width: 680px) {
  .fab {
    position: absolute;
    left: calc(100vw - 60px);
    bottom: 120px;
    z-index: 1;
  }
  .sprite-standing-smiling {
    display: none;
  }
}
</style>
