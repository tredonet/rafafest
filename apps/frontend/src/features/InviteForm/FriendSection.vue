<script setup lang="ts">
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";
import { QToggle, QForm, QInput, QBtn } from "quasar";
import { ref } from "vue";

const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);

const willBringSomeone = ref(Boolean(guest?.value?.friends.length));
const onSubmitPlusOne = () => null;
</script>
<template>
  <div class="row" v-if="guest?.invites">
    <q-toggle
      v-model="willBringSomeone"
      :disable="Boolean(guest.friends.length)"
      icon="group"
    />
    Bringing someome?
  </div>

  <template v-for="friend in guest?.friendsData" v-bind:key="friend.name">
    <q-form
      @submit="onSubmitPlusOne"
      class="row q-gutter-x-md"
      v-if="willBringSomeone || guest?.friends.length"
    >
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
        id="email"
        rounded
        outlined
        label="Email Address"
        :disable="Boolean(friend.email)"
        type="email"
        v-model="friend.email"
      />
      <q-btn v-if="friend.name" flat round icon="edit" type="submit" />
      <q-btn v-if="friend.name" flat round icon="delete" type="submit" />
    </q-form>
  </template>
</template>
