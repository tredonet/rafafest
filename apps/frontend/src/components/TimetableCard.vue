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
  imageRatio: string;
}>();
</script>
<template>
  <q-card class="timetable-card">
    <img :src="image" :style="{ aspectRatio: imageRatio }" />
    <div class="timetable-title">{{ title }}</div>
    <div class="flex justify-between timetable-subtitle">
      <div class="flex q-gutter-x-xs">
        <img :src="clock" />
        <div>{{ time }}</div>
      </div>
      <div class="flex q-gutter-x-xs">
        <img :src="marker" />
        <a
          class="locationlink timetable-subtitle"
          :href="locationLink"
          target="_blank"
          >{{ location }}</a
        >
      </div>
    </div>
  </q-card>
</template>
<style>
.locationlink {
  color: black;
  cursor: pointer;
  font-size: 1rem;
  line-height: normal;
}
.timetable-card {
  border: 2px solid var(--vt-c-black-soft);
  border-radius: 0.5rem !important;
  width: clamp(10rem, 14vw, 30rem);
  padding: 0 0.75rem;
  box-shadow: 8px 8px 4px 2px rgba(0, 0, 0, 0.29) !important;
  -webkit-box-shadow: 8px 8px 4px 2px rgba(0, 0, 0, 0.29) !important;
}
.timetable-title {
  font-size: clamp(0.8rem, 1vw, 1.25rem);
}
.timetable-subtitle {
  font-size: clamp(0.5rem, 0.8vw, 1.25rem);
}
.timetable-card > * {
  margin: 0.25rem 0;
}
.timetable-card > img {
  margin-top: 0.75rem;
}
.timetable-card > img {
  object-fit: cover;
}
</style>
