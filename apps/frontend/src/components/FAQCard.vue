<script setup lang="ts">
import { QCard, QCardSection } from "quasar";
defineProps<{
  sprite: string;
  title: string;
  spriteLeft?: boolean;
  backgroundImage?: string;
}>();
</script>
<template>
  <q-card class="faq-card">
    <img
      v-if="backgroundImage"
      :src="backgroundImage"
      class="backgroundimage"
    />
    <div class="card-title">{{ title }}</div>
    <div :class="`row ${spriteLeft ? 'reverse' : ''}`">
      <div class="card-content card-text">
        <q-card-section>
          <slot />
        </q-card-section>
      </div>
      <div class="card-sprite self-end">
        <img
          :src="sprite"
          :style="spriteLeft ? 'float:left;' : 'float:right;'"
        />
      </div>
    </div>
  </q-card>
</template>
<style>
.card-title {
  margin: 1rem;
  margin-bottom: 0;
  font-size: 1.5rem;
  font-family: "Patrick";
}
.card-content {
  max-width: 35rem;
  backdrop-filter: blur(2px);
}
.card-text {
  font-family: "ManropeSemi";
  font-size: 0.8rem;
  line-height: normal;
}
.faq-card {
  border: 2px solid var(--vt-c-black-soft);
  border-radius: 15px !important;
  padding: 0 2rem;
  box-shadow: 8px 8px 4px 2px rgba(0, 0, 0, 0.29) !important;
  -webkit-box-shadow: 8px 8px 4px 2px rgba(0, 0, 0, 0.29) !important;
}
.card-sprite {
  margin: 1rem;
  flex: 1;
}
.backgroundimage {
  position: absolute;
  opacity: 0.2;
  height: 20rem;
  width: auto !important;
  bottom: 0;
  left: 0;
}
</style>
