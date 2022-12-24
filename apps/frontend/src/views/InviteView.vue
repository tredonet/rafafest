<script lang="ts" setup>
import spritePeople from "@/assets/img/people.svg";
import heartbreak from "@/assets/icons/heart-break.svg";
import heartbeat from "@/assets/icons/heartbeat.svg";
import heart from "@/assets/icons/heart.svg";
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";
import { QForm, QInput, QBtn, useQuasar } from "quasar";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/api";

const router = useRouter();
const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
const $q = useQuasar();

onBeforeMount(() => {
  if (!guest?.value) return router.push("/error");
});

const rsvp = ref(guest?.value?.attending || "yes");
const onSetRSVP = (option: "yes" | "no" | "maybe") => {
  rsvp.value = option;
};

const onSubmit = async () => {
  try {
    if (!guest?.value) throw new Error("No invite info found");
    const { code, name, surname, email } = guest.value;
    const attending = rsvp.value;
    await api.guest.rsvp({ code, name, surname, email, attending });
    guestStore.fetch(guest.value.code);
    alert("Thank you!");
  } catch {
    alert("RSVP failed");
  }
};
</script>
<template>
  <div class="row justify-center">
    <div class="content title blur-background">Let's get you signed up</div>
  </div>
  <div class="row justify-center row-margin">
    <div class="content-narrow notes blur-background">
      Lorem ipsum dolor sit amet consectetur. Scelerisque pharetra elementum
      amet nulla. In suspendisse pulvinar maecenas non risus dolor commodo
      scelerisque. Duis venenatis id nunc rutrum viverra magna.
    </div>
  </div>
  <div class="row justify-center" v-if="guest">
    <q-form
      class="content-narrow blur-background q-col-gutter-y-md"
      @submit="onSubmit"
    >
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
        <div class="col notes blur-background">
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
