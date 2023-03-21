<script setup lang="ts">
import { SpeechBubble } from "@/components";
import rafa from "@/assets/doodles/rafa-oops.svg";
</script>
<template>
  <div class="page row justify-center items-center">
    <div>
      <div class="row justify-center">
        <div class="title">OOOOOOOPPPS</div>
      </div>
      <div class="row justify-center bubble row-margin">
        <SpeechBubble class="text-large content-narrow">
          It seems like we couldn't find your invite. Use your personal link to
          access your invite.
        </SpeechBubble>
      </div>
      <img class="rafa-oops" :src="rafa" />
    </div>
  </div>
</template>
