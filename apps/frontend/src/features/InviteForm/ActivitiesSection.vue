<script setup lang="ts">
import { QCheckbox } from "quasar";
import { ref } from "vue";

const activities = ref(["dinner1", "dinner2", "party", "brunch"]);
</script>
<template>
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
</template>
