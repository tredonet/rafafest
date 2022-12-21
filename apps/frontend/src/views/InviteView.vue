<script lang="ts" setup>
import spritePeople from "@/assets/img/people.svg";
import heartbreak from "@/assets/icons/heart-break.svg";
import heartbeat from "@/assets/icons/heartbeat.svg";
import heart from "@/assets/icons/heart.svg";
</script>
<template>
  <div class="row justify-center">
    <div class="col-4 title">Let's get you signed up</div>
  </div>
  <div class="row justify-center">
    <div class="col-4 notes">
      Lorem ipsum dolor sit amet consectetur. Scelerisque pharetra elementum
      amet nulla. In suspendisse pulvinar maecenas non risus dolor commodo
      scelerisque. Duis venenatis id nunc rutrum viverra magna.
    </div>
  </div>
  <div class="row justify-center">
    <q-form class="col-4 q-gutter-sm">
      <div class="row q-gutter-sm">
        <q-input
          class="col"
          rounded
          outlined
          label="First name"
          v-model="undefined"
        />
        <q-input
          class="col"
          rounded
          outlined
          label="Last name"
          v-model="undefined"
        />
      </div>
      <div class="row q-gutter-sm">
        <div class="col">
          <q-input
            rounded
            outlined
            label="Email Address"
            type="email"
            v-model="undefined"
          />
        </div>
      </div>
      <div class="row q-gutter-sm">
        <div class="col notes">
          Most importantly: are you able to be in Valencia on and around the
          15th of April, 2023?
        </div>
      </div>
      <div class="row q-gutter-sm">
        <q-btn class="col" unelevated color="primary" rounded>
          100% - Yes <img class="icon" :src="heart" />
        </q-btn>
        <q-btn class="col" unelevated color="dark" rounded>
          Not sure yet <img class="icon" :src="heartbeat" />
        </q-btn>
        <q-btn class="col" unelevated color="dark" rounded>
          I can't <img class="icon" :src="heartbreak" />
        </q-btn>
      </div>
      <div class="row q-gutter-sm">
        <q-btn class="col custom-button" label="Confirm" />
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
  position: absolute;
  right: 5vw;
  bottom: 0;
}
</style>
