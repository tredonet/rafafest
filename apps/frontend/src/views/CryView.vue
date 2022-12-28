<script lang="ts" setup>
import { useGuestStore } from "@/stores";
import sprite from "@/assets/img/rafa-crying.svg";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

onBeforeMount(() => {
  const router = useRouter();
  const guestStore = useGuestStore();
  const { guest } = storeToRefs(guestStore);
  if (!guest?.value) return router.push("/error");
  if (guest.value.attending !== "no") return router.push("/home");
});
</script>
<template>
  <div class="page">
    <div class="row justify-left">
      <div class="title" style="margin: 2vh 5vw">
        Nooooo... - let’s have one last dance
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-6">
        <p class="lyrics">
          Slip inside the eye of your mind <br />
          Don't you know you might find <br />
          A better place to play? <br />
          You said that you'd never been<br />
          But all the things that you've seen <br />
          Slowly fade away<br /><br />

          So I start a revolution from my bed <br />
          'Cause you said the brains <br />
          I had went to my head <br />
          Step outside, summertime's in bloom <br />
          Stand up beside the fireplace <br />
          Take that look from off your face <br />
          You ain't ever gonna burn my heart out
          <br /><br />
          And so, Sally can wait <br />
          She knows it's too late as we're walking on by <br />
          Her soul slides away <br />
          But don't look back in anger, I heard you say

          <br /><br />
          Take me to the place where you go <br />
          Where nobody knows if it's night or day <br />
          Please don't put your life in the hands <br />
          Of a rock 'n' roll band Who'll throw it all away
          <br /><br />
          I'm gonna start a revolution from my bed <br />
          'Cause you said the brains <br />
          I had went to my head <br />
          Step outside, 'cause summertime's in bloom <br />
          Stand up beside the fireplace <br />
          Take that look from off your face <br />
          'Cause you ain't ever gonna burn my heart out
          <br /><br />
          "Don't Look Back In Anger" - Oasis
        </p>
      </div>
      <div class="col-6 self-end">
        <p class="notes supertitle">
          What a major bummer. But no worries, still love you!
        </p>
        <div class="title">See you soon!</div>
        <div class="signature">--Rapha</div>
      </div>
    </div>
  </div>
  <img :src="sprite" class="sprite-crying" />
</template>
<style>
.lyrics {
  float: right;
  font-size: 1rem;
  line-height: 100%;
  font-family: "Patrick";
}
.supertitle {
  width: 50%;
  margin: 0vh 10vw;
  float: right;
}
.signature {
  width: 50%;
  font-size: 1.5rem;
  float: right;
  font-family: "Patrick";
}

.sprite-crying {
  bottom: 0;
  left: 0vw;
  position: absolute;
  height: 80vh;
}

@media (max-width: 680px) {
  .sprite-crying {
    display: none;
  }
}
@media (min-width: 1024px) {
  .lyrics {
    font-size: 1rem;
  }
}
@media (min-width: 1280px) {
  .lyrics {
    font-size: 1.2rem;
  }
}
</style>
