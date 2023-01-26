<script setup lang="ts">
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";
import {
  QToggle,
  QForm,
  QInput,
  QBtn,
  QCard,
  QCardActions,
  QCardSection,
  QDialog,
  useQuasar,
} from "quasar";
import { ref } from "vue";
import { EditFriend } from "@/features";
import type { Guest } from "@rafafest/core";

const guestStore = useGuestStore();
const $q = useQuasar();
const { guest } = storeToRefs(guestStore);
const showHelp = ref(false);
const canBringSomeone = ref(Boolean(guest?.value?.friends.length));
const showFriendEdit = ref(false);
const friendEdit = ref();
const onFriendEdit = (friend: Guest) => {
  friendEdit.value = friend;
  showFriendEdit.value = true;
};
const onFriendDelete = async (friend: any) => {
  $q.dialog({
    title: "Confirm",
    message: `Are you sure you want to uninvite ${friend.name}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    guestStore.deleteFriend(friend.id);
  });
};
</script>
<template>
  <div class="row items-center q-gutter-x-md" v-if="guest?.invites">
    <q-toggle
      v-model="canBringSomeone"
      :disable="Boolean(guest.friends.length)"
      icon="group"
    />
    Bringing someome?
    <q-btn
      icon="question_mark"
      size="sm"
      round
      flat
      @click="() => (showHelp = true)"
    />
  </div>
  <template v-if="guest">
    <template v-for="friend in guest?.friendsData" v-bind:key="friend">
      <q-form class="row q-gutter-x-md" v-if="canBringSomeone">
        <q-input
          id="name"
          class="col"
          rounded
          outlined
          disable
          label="First name"
          type="text"
          v-model="friend.name"
        />
        <q-input
          id="email"
          rounded
          outlined
          label="Email Address"
          disable
          type="email"
          v-if="friend.email"
          v-model="friend.email"
        />
        <q-btn
          v-if="!friend.email"
          flat
          round
          icon="edit"
          @click="() => onFriendEdit(friend)"
        />
        <q-btn
          v-if="friend.name && !friend.invites"
          flat
          round
          icon="delete"
          @click="() => onFriendDelete(friend)"
        />
      </q-form>
    </template>

    <template v-for="(newFriend, i) in guest.newFriends" v-bind:key="i">
      <q-form class="row q-gutter-x-md" v-if="canBringSomeone" :key="i">
        <q-input
          class="col"
          rounded
          outlined
          label="First name"
          type="text"
          v-model="guest.newFriends[i].name"
        />
        <q-input
          rounded
          outlined
          label="Email Address"
          type="email"
          v-model="guest.newFriends[i].email"
        />
      </q-form>
    </template>
  </template>
  <q-dialog v-model="showHelp">
    <q-card>
      <q-card-section>
        <div class="text-h6">Bringing a friend</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Do you want to bring a +1? Cool! Fill in their details and they will be
        added to the guest list. If you provide an email address, they will
        recieve an invite in their mailbox with a link. They can view their
        invite just like you can. If you want to manage your +1's invite, leave
        the email field blank and you will be able to edit their invite. PS: Let
        your +1 know, that their invite might end up in their spam folder.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showFriendEdit">
    <EditFriend :friend="friendEdit" />
  </q-dialog>
</template>
