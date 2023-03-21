<script setup lang="ts">
import clock from "@/assets/icons/clock.svg";
import marker from "@/assets/icons/marker.svg";
defineProps<{
  image?: string;
  title?: string;
  time?: string;
  location?: string;
  locationLink?: string;
  description?: string;
  tags?: string[];
}>();
</script>
<template>
  <q-card class="yolo-card">
    <img :src="image" />
    <div class="yolo-title">{{ title }}</div>
    <div class="flex justify-between">
      <div class="flex q-gutter-x-xs">
        <img :src="clock" />
        <div>{{ time }}</div>
      </div>
      <div class="flex q-gutter-x-xs">
        <img :src="marker" />
        <a
          :href="locationLink"
          target="_blank"
          style="color: black; cursor: pointer"
          >{{ location }}</a
        >
      </div>
    </div>
    <!-- <div class="flex tags">
      <div class="tag" v-for="tag in tags" v-bind:key="tag">
        {{ tag }}
      </div>
    </div> -->
  </q-card>
</template>
<style>
.yolo-card {
  border: 2px solid var(--vt-c-black-soft);
  border-radius: 0.5rem !important;
  width: clamp(10rem, 80vw, 18rem);
  padding: 0 0.5rem;
  box-shadow: 8px 8px 4px 2px rgba(0, 0, 0, 0.29) !important;
  -webkit-box-shadow: 8px 8px 4px 2px rgba(0, 0, 0, 0.29) !important;
}
.yolo-title {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
}
.yolo-card > * {
  margin: 0.5rem 0;
}
.tags {
  font-size: 0.5rem;
  gap: 0.5rem;
}
.tag {
  padding: 0.25rem 0.5rem;
  border: 2px solid var(--vt-c-black-soft);
  border-radius: 1rem;
}
</style>
