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
  <router-link :class="itemClass" :to="path">{{ props.to }}</router-link>
</template>
<style>
.nav-item {
  display: block;
  color: var(--color-background-mute-inverted);
  width: 13vw;
  text-align: center;
  text-decoration: none;
  border: 5px solid var(--color-background-mute-inverted);
  border-radius: 15px;
}

.selected {
  background-color: var(--color-background-mute-inverted);
  color: var(--color-heading-inverted);
}

.nav-item:hover:not(.selected) {
  color: var(--color-background-inverted);
  border-color: var(--color-background-inverted);
  cursor: pointer;
}

.disabled {
  cursor: default !important;
  opacity: 0.4;
}
</style>
