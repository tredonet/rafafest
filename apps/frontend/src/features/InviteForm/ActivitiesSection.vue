<script setup lang="ts">
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";
import { QCheckbox } from "quasar";

const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
</script>
<template>
  <div class="row label">Activities</div>
  <div class="row" v-if="guest">
    <div class="col-6">
      <q-checkbox
        v-model="guest.activities"
        val="Beach"
        label="Beach - Friday, 14th"
        style="width: 100%"
        color="primary"
      />
      <q-checkbox
        v-model="guest.activities"
        val="PubCrawl"
        label="Pub Crawl - Friday, 14th"
        style="width: 100%"
        color="primary"
      />
      <q-checkbox
        v-model="guest.activities"
        val="DinnerTwo"
        label="Dinner - Saturday, 15th"
        style="width: 100%"
        color="primary"
      />
      <q-checkbox
        v-model="guest.activities"
        val="Brunch"
        label="Birthday Brunch - Sunday, 16th"
        style="width: 100%"
        color="primary"
      />
    </div>

    <div class="col-6">
      <q-checkbox
        v-model="guest.activities"
        val="DinnerOne"
        label="Dinner - Friday, 14th"
        style="width: 100%"
        color="primary"
      />
      <q-checkbox
        v-model="guest.activities"
        val="Park"
        label="Park Picnic - Saturday, 15th"
        style="width: 100%"
        color="primary"
      />
      <q-checkbox
        v-model="guest.activities"
        val="Party"
        label="Party - Saturday, 15th"
        style="width: 100%"
        color="primary"
      />
    </div>
  </div>
</template>
