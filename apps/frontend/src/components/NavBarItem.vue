<script setup lang="ts">
import { computed } from "vue";
import { useRouter, RouterLink } from "vue-router";

type Props = {
  to: string;
  disabled: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const path = computed(() => "/" + props.to.toLowerCase().replace(" ", "-"));

const itemClass = computed(() => {
  const router = useRouter();
  let val = "nav-item";
  if (props.disabled) val += " disabled";
  if (path.value == router.currentRoute.value.path) val += " selected";
  return val;
});
</script>
<template>
  <router-link :class="itemClass" :to="props.disabled ? '' : path">{{
    props.to
  }}</router-link>
</template>
<style>
.nav-item {
  display: block;
  color: var(--color-background-mute-inverted);
  padding: 5px 0;
  width: 100%;
  text-align: center;
  text-decoration: none;
  border: 5px solid var(--color-background-mute-inverted);
  border-radius: 15px;
  white-space: nowrap;
}

.selected {
  background-color: var(--color-background-mute-inverted);
  color: var(--color-heading-inverted);
}

.nav-item:hover:not(.selected):not(.disabled) {
  color: var(--color-background-inverted);
  border-color: var(--color-background-inverted);
  cursor: pointer;
}

.disabled {
  cursor: default !important;
  opacity: 0.4;
}
</style>
