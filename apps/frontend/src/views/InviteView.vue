<script lang="ts" setup>
import spriteStanding from "@/assets/doodles/rafa-standing-2.svg";
import heartbreak from "@/assets/icons/heart-break.svg";
import heartbeat from "@/assets/icons/heartbeat.svg";
import heart from "@/assets/icons/heart.svg";
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";
import {
  QForm,
  QInput,
  QDialog,
  QDate,
  useQuasar,
  QBtn,
  QCard,
  QCardActions,
  QCardSection,
  QField,
  QIcon,
} from "quasar";
import { computed, onBeforeMount, ref } from "vue";
import {
  ActivitiesSection,
  DietSection,
  FriendSection,
} from "@/features/InviteForm";
import { RSVPView } from ".";
import { useRouter } from "vue-router";
import { AxiosError } from "axios";

const $q = useQuasar();
const router = useRouter();
const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
onBeforeMount(() => {
  if (guest?.value) guestStore.fetch(guest.value.code);
});

const datesString = computed(
  () =>
    `${guest?.value?.attendenceDates.from ?? ""} - ${
      guest?.value?.attendenceDates.to ?? ""
    }`
);
const showDatePicker = ref(false);
const showWhatsappDialog = ref(false);
const changesSaved = ref(false);

const changeAvailability = async (option: "yes" | "no" | "maybe") => {
  if (guest?.value?.attending) guest.value.attending = option;
  try {
    await guestStore.updateInvite();
    $q.notify({
      position: "top",
      message: "Success",
      color: "primary",
      timeout: 1000,
    });
    if (option === "no") router.push("/cry");
  } catch (e) {
    const msg = e instanceof AxiosError ? `[${e.response?.data}]` : "";
    $q.notify({
      position: "top",
      message: `We screwed someting up :( ${msg}`,
      color: "red",
      timeout: 3000,
    });
  }
};
const onSubmit = async () => {
  try {
    await guestStore.updateInvite();
    changesSaved.value = true;
  } catch (e) {
    const msg = e instanceof AxiosError ? `[${e.response?.data}]` : "";
    $q.notify({
      position: "top",
      message: `We screwed someting up :( ${msg}`,
      color: "red",
      timeout: 3000,
    });
  }
};
</script>
<template>
  <RSVPView v-if="guest?.attending !== 'yes' && guest?.attending !== 'maybe'" />
  <div v-if="guest?.attending === 'yes' || guest?.attending === 'maybe'">
    <div class="row justify-center" v-if="guest.attending === 'yes'">
      <div class="title-small blur-background">
        Awesome - looking forward to seeing you, {{ guest.name }}
      </div>
    </div>
    <div class="row justify-center" v-if="guest.attending === 'maybe'">
      <div class="title-small blur-background">
        I really hope to see you, {{ guest.name }}!
      </div>
    </div>

    <div class="row justify-center" v-if="guest">
      <q-form
        class="textbox blur-background q-col-gutter-y-md"
        @submit="onSubmit"
      >
        <div class="row label">Your details</div>
        <div class="row q-gutter-x-md">
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
        <ActivitiesSection />
        <DietSection />

        <FriendSection />
        <div class="row">
          <q-btn class="col custom-button" label="Save" type="submit" />
        </div>
        <div class="row label">Change your availability</div>
        <div class="row justify-between q-gutter-sm">
          <div class="q-gutter-x-sm">
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
          <div class="whatsapp" @click="() => (showWhatsappDialog = true)">
            Join Whatsapp group
          </div>
        </div>
      </q-form>
    </div>
  </div>
  <q-btn
    rounded
    icon-right="wb_sunny"
    color="dark"
    class="fabutton big"
    label="Who's coming?"
    @click="() => $router.push('/guestlist')"
  />
  <q-btn
    fab
    icon="group"
    color="dark"
    class="fabutton small"
    @click="() => $router.push('/guestlist')"
  />
  <img
    class="sprite-standing-smiling hide-mobile"
    :src="spriteStanding"
    v-if="guest?.attending === 'yes' || guest?.attending === 'maybe'"
  />
  <q-dialog v-model="changesSaved">
    <q-card>
      <q-card-section>
        <div class="text-h6">Saved</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Cool beans, you will hear from me soon when there are more updates on
        this page.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showWhatsappDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Join the WhatsApp group!</div>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-center"
        >No spam. Promise.
      </q-card-section>

      <q-card-section class="q-pt-none row justify-center">
        <!-- <img :src="link" /> -->
      </q-card-section>
      <q-card-section class="q-pt-none row justify-center">
        PS: if you're on your phone, click
        <a class="whatsapp-link" href="#"> here </a>.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style>
.fabutton {
  position: fixed !important;
  left: calc(100vw - 100px);
  bottom: 100px;
}
.fabutton.big {
  left: calc(100vw - 250px);
}
.whatsapp {
  text-decoration: none;
  color: var(--color-primary);
  font-weight: 700;
}
.whatsapp-link {
  text-decoration: none;
  margin-left: 3px;
  color: var(--color-primary);
  font-weight: 700;
}
.sprite-standing-smiling {
  bottom: 0;
  left: 0;
  position: fixed;
  height: 80vh;
}
.label {
  font-family: "Patrick";
  font-size: 1rem;
  line-height: 60%;
}

@media (max-width: 680px) {
  .fabutton {
    left: calc(100vw - 60px);
    bottom: 120px;
  }
  .fabutton.big {
    display: none;
  }
}
@media (min-width: 680px) {
  .fabutton.small {
    display: none;
  }
}
</style>
