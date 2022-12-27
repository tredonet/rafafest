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
  <div class="row justify-center">
    <div class="title">RAFAFEST - Rapha turns 30</div>
  </div>
  <div class="row justify-center">
    <div class="subtitle">15th of April, 2023</div>
  </div>
  <div class="row justify-center">
    <div class="content-narrow blur-background">
      <p class="text textbox">
        Yep. I am turning 30 years old - at least according to my birth
        certificate (by the way, where the heck did I leave it again? Probably
        in some drawer at my parents’ house). <br /><br />
        So, when life gives you lemons, throw a big party and invite all the
        beautiful souls that have hopped along for the ride for a longer or
        shorter period in your life. Me and some great masterminds are still
        working very hard behind the scenes to make RAFAFEST a hopefully
        unforgetable experience for you, wether you’re on my Instagram Close
        Friends List or on my ‘damnit, I should call them again some time List’!
        <br />
        So, what’s the deal with this Birthday-Party-Coachella Thing? Celebrate,
        enjoy, cry, laugh, eat, drink, party, and relax. Invited are lovely
        humans from over 10 countries, that have been a part of my journey.
        <br />
        The Big W’s? Rafafest will happen from 14. to 17. of April, 2023
        somewhere in beautiful Valencia, Spain. The Main Event will be the 15th
        of April! <br /><br />
        What next? This little website will grow over the next few months with
        updates, more context, and information on how to get here, where to
        stay, what to do - and all other major or minor details. <br /><br />
        But, first things first - I need to know who is coming, click that thing
        over there!
      </p>
    </div>
  </div>
  <div class="row justify-center">
    <div class="sign-me-up">
      <router-link class="custom-button" to="/my-invite">
        <img class="sprite-sitting" :src="spriteSitting" />
        Answer your invitation
      </router-link>
    </div>
  </div>
  <img class="sprite-standing" :src="spriteStanding" />
</template>
<style>
.sign-me-up {
  margin-top: 5vh;
  margin-left: 50vw;
}
.sprite-standing {
  bottom: 0;
  left: 0;
  position: absolute;
  height: 80vh;
}
.sprite-sitting {
  position: absolute;
  left: 11rem;
  top: -190px;
}
.textbox {
  margin: 1rem 0;
  max-height: 50vh;
  max-width: 50vw;
  overflow-y: scroll;
}
@media (max-width: 680px) {
  .sign-me-up {
    margin-top: 0;
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
    max-height: 45vh;
  }
}
</style>
