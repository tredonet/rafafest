<script lang="ts" setup>
import spritePeople from "@/assets/doodles/people.svg";
import heartbreak from "@/assets/icons/heart-break.svg";
import heartbeat from "@/assets/icons/heartbeat.svg";
import heart from "@/assets/icons/heart.svg";
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";
import { QForm, QInput, QBtn, useQuasar } from "quasar";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { AxiosError } from "axios";

const $q = useQuasar();
const router = useRouter();
const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
const lastNameLocked = ref(false);
onBeforeMount(() => {
  if (!guest?.value) return router.push("/error");
  lastNameLocked.value = Boolean(guest.value.surname);
});

const rsvp = ref(guest?.value?.attending || "yes");
const onSetRSVP = (option: "yes" | "no" | "maybe") => {
  rsvp.value = option;
};

const onSubmit = async () => {
  try {
    if (!guest?.value) throw new Error("No invite info found");
    guest.value.attending = rsvp.value;
    await guestStore.updateInvite();
    if (rsvp.value === "no") router.push("/cry");
  } catch (e) {
    const msg = e instanceof AxiosError ? `[${e.response?.data}]` : "";
    $q.notify({
      position: "center",
      message: `We screwed someting up :( ${msg}`,
      color: "red",
      timeout: 3000,
    });
  }
};
</script>
<template>
  <div class="title blur-background">Let's get you signed up</div>
  <div class="subtitle">Latest by 10th of February, 2023</div>
  <div class="row justify-center">
    <div class="textbox text notes blur-background">
      You know the drill, fill in the blanks, get an annoying e-mail-newsletter
      that you will always be too lazy to unsubscribe to again. Just kidding, I
      only wanna read your name on my guest list and get a big fat smile on my
      face because I’m looking forward to seeing you.
    </div>
  </div>
  <div class="row justify-center">
    <div class="textbox text notes blur-background">Let's start with you!</div>
  </div>
  <div class="row justify-center" v-if="guest">
    <q-form
      class="textbox blur-background q-col-gutter-y-md"
      @submit="onSubmit"
    >
      <div class="flex q-gutter-x-sm">
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
          :disable="lastNameLocked"
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
        <div class="col text notes blur-background">
          Most importantly: are you able to be in Valencia on and around the
          15th of April, 2023?
        </div>
      </div>
      <div class="row justify-evenly q-gutter-sm">
        <q-btn
          unelevated
          :color="rsvp === 'yes' ? 'primary' : 'dark'"
          rounded
          :onclick="() => onSetRSVP('yes')"
        >
          100% - Yes <img class="icon" :src="heart" />
        </q-btn>
        <q-btn
          unelevated
          :color="rsvp === 'maybe' ? 'primary' : 'dark'"
          rounded
          :onclick="() => onSetRSVP('maybe')"
        >
          Not sure yet <img class="icon" :src="heartbeat" />
        </q-btn>
        <q-btn
          unelevated
          :color="rsvp === 'no' ? 'primary' : 'dark'"
          rounded
          :onclick="() => onSetRSVP('no')"
        >
          I can't <img class="icon" :src="heartbreak" />
        </q-btn>
      </div>
      <div class="row">
        <q-btn class="col custom-button" label="Confirm" type="submit" />
      </div>
    </q-form>
  </div>
  <img class="sprite" :src="spritePeople" />
</template>
<style>
.icon {
  margin-left: 20px;
}
.sprite {
  width: 25vw;
  z-index: -1;
  position: absolute;
  right: 5vw;
  bottom: 5vh;
}
@media (max-width: 680px) {
  .sprite {
    width: 70vw;
    right: 15vw;
  }
}
</style>
