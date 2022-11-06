<script setup lang="ts">
import { usePreferredColorScheme } from "@vueuse/core";
import HomeView from "./views/HomeView.vue";
import imageWhite from "@/assets/img/IMG_0178_th_white.png";
import imageBlack from "@/assets/img/IMG_0178_th_black.png";

const preferredColor = usePreferredColorScheme();
</script>

<template>
  <div class="wrapper">
    <div class="imageWrapper">
      <img
        class="image"
        :src="preferredColor === 'light' ? imageBlack : imageWhite"
      />
    </div>
    <div class="textWrapper">
      <HomeView />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.image {
  opacity: 0.1;
  width: 150vw;
  overflow: hidden;
}

.imageWrapper {
  position: absolute;
  top: 10vh;
  left: -25vw;
  overflow: hidden;
}

.textWrapper {
  overflow: hidden;
  position: absolute;
  left: 33vw;
  top: 35vh;
}

@media (min-width: 1024px) {
  .image {
    opacity: 0.5;
    height: 100vh;
    width: 90vh;
  }

  .imageWrapper {
    position: absolute;
    left: 45vh;
    top: 0;
    height: 100vh;
    width: 45vh;
    overflow: hidden;
  }

  .textWrapper {
    height: 100vh;
    position: absolute;
    left: 58vw;
    top: 30vh;
  }
}
</style>
