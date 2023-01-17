<script setup lang="ts">
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";
import { QCheckbox } from "quasar";

const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
</script>

<template>
  <template v-if="guest">
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
  </template>
</template>
