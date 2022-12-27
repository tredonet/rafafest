<script lang="ts" setup>
import spriteStanding from "@/assets/img/rafa-standing-2.svg";
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";
import { QForm, QInput, QDialog, QDate } from "quasar";
import { computed, ref } from "vue";
import { RSVPView } from ".";

const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
const plusOne = ref(false);
const model = ref({ from: "2023/04/14", to: "2023/04/17" });
const selection = ref(["dinner1", "dinner2", "party", "brunch"]);
const diet = ref([]);
const dates = computed(() => `${model.value.from} - ${model.value.to}`);
const showModel = ref(false);
</script>
<template>
  <RSVPView v-if="guest?.attending !== 'yes' && guest?.attending !== 'maybe'" />
  <div
    v-if="guest?.attending === 'yes' || guest?.attending === 'maybe'"
    class="invite-wrapper"
  >
    <div class="row justify-center">
      <div class="title-small blur-background">
        Awesome - looking forward to see you, {{ guest.name }}
      </div>
    </div>
    <div class="row justify-center" v-if="guest">
      <q-form class="content-narrow blur-background q-col-gutter-y-md">
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
          <div class="col" @click="() => (showModel = true)">
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
                {{ dates }}
              </template>
            </q-field>
            <q-dialog v-model="showModel">
              <q-date
                v-model="model"
                range
                minimal
                @range-end="() => (showModel = false)"
              />
            </q-dialog>
          </div>
        </div>
        <div class="row label">Activities</div>
        <div class="row">
          <div class="col-6">
            <q-checkbox
              v-model="selection"
              disable
              val="dinner1"
              label="Dinner - Friday, 14th"
              style="width: 100%"
              color="primary"
            />
            <q-checkbox
              v-model="selection"
              disable
              val="party"
              label="Party/Concert - Saturday, 15th"
              style="width: 100%"
              color="primary"
            />
          </div>
          <div class="col-6">
            <q-checkbox
              v-model="selection"
              disable
              val="dinner2"
              label="Dinner - Saturday, 15th"
              style="width: 100%"
              color="primary"
            />
            <q-checkbox
              v-model="selection"
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
              v-model="diet"
              val="vegetarian"
              label="Vegetarian"
              color="primary"
              style="width: 100%"
            />
            <q-checkbox
              v-model="diet"
              val="nut-free"
              label="Nut-free"
              style="width: 100%"
              color="primary"
            />
          </div>
          <div class="col-4">
            <q-checkbox
              v-model="diet"
              val="vegan"
              label="Vegan"
              style="width: 100%"
              color="primary"
            />
            <q-checkbox
              v-model="diet"
              val="soy-free"
              label="Soy-free"
              style="width: 100%"
              color="primary"
            />
          </div>
          <div class="col-4">
            <q-checkbox
              v-model="diet"
              val="gluten-free"
              label="Gluten-free"
              style="width: 100%"
              color="primary"
            />
            <q-checkbox
              v-model="diet"
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
      </q-form>
    </div>
    <img class="sprite-standing-smiling" :src="spriteStanding" />
  </div>
</template>
<style>
.sprite-standing-smiling {
  bottom: 60px;
  left: 0;
  position: absolute;
  height: 80vh;
}
.invite-wrapper {
  height: 100vh;
  overflow-y: scroll;
}
.label {
  font-family: "Patrick";
  font-size: 1rem;
  line-height: 60%;
}
@media (max-width: 680px) {
  .sprite-standing-smiling {
    display: none;
  }
}
</style>
