<script setup lang="ts">
import { SpeechBubble } from "@/components";
import rafa from "@/assets/doodles/rafa-oops.svg";
</script>
<template>
  <div class="title">OOOOOOOPPPS</div>
  <SpeechBubble class="text textbox" style="margin: 0 auto">
    It seems like we couldn't find your invite. Use your personal link to access
    your invite.
  </SpeechBubble>
  <div class="row justify-center">
    <img :src="rafa" />
  </div>
</template>
<style>
</style>
