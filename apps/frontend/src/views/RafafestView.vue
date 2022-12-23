<script lang="ts" setup>
import spriteStanding from "@/assets/img/rafa-standing.svg";
import spriteSitting from "@/assets/img/rafa-sitting-2.svg";
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useRouter, RouterLink } from "vue-router";

onBeforeMount(() => {
  const router = useRouter();
  const guestStore = useGuestStore();
  const { guest } = storeToRefs(guestStore);
  if (!guest?.value) return router.push("/error");
});
</script>
<template>
  <div class="q-pa-md doc-container">
    <div class="row justify-center">
      <div class="title">RAFAFEST - Rapha turns 30</div>
    </div>
    <div class="row justify-center">
      <div class="subtitle">15th of April, 2023</div>
    </div>
    <div class="row justify-center">
      <div class="blur-background">
        <p class="text textbox">
          Yep. I am turning 30 years old - at least according to my birth
          certificate it my parents drawer (at least that’s where it should be).
          <br /><br />

          So, when life gives you lemons, throw a big party and invite all your
          friends, family, and the beautiful souls that have shared a longer or
          shorter period in your life. Me and some great masterminds are still
          working very hard behind the scenes to make RAFAFEST a hopefully
          unforgetable experience for all the people that are currently in my
          Instagram “Close friends” circle to the amazing human beings that I
          have not been in touch with for a while! <br /><br />
          So, what is happening? Celebrate, enjoy, cry, laugh, eat, drink,
          party, and relax. Invited are groups and individuals from over 10
          countries, that have been at one point part of my journey.<br /><br />
          When is it going to be? Rafafest will happen between the 14. and 17.
          of April, 2023 in Valencia, Spain. The main day will be the 15th of
          April!
          <br /><br />
          What next? This little website will grow over the next few months with
          updates, more context, and info on how to get here, where to stay,
          what to do - and all other major or minor details.<br /><br />
          But, first things first - I need to know who is coming!
        </p>
      </div>
    </div>
    <div class="row justify-center">
      <div class="sign-me-up">
        <router-link class="custom-button" to="/my-invite">
          <img class="sprite-sitting" :src="spriteSitting" />
          Sign me up!
        </router-link>
      </div>
    </div>
  </div>
  <img class="sprite-standing" :src="spriteStanding" />
</template>
<style>
.sign-me-up {
  margin-left: 50vw;
}
.sprite-standing {
  bottom: 0;
  left: 0vw;
  position: absolute;
  height: 80vh;
}
.sprite-sitting {
  position: absolute;
  left: 6rem;
  top: -190px;
}
.textbox {
  max-height: 50vh;
  max-width: 50vw;
  overflow-y: scroll;
}
@media (max-width: 680px) {
  .sign-me-up {
    margin-left: 0 !important;
  }
  .sprite-sitting {
    display: none;
  }
  .sprite-standing {
    display: none;
  }
  .textbox {
    max-width: 100vw;
  }
}
</style>
