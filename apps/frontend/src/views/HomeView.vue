<script lang="ts" setup>
import { SpeechBubble } from "@/components";
import doodle from "@/assets/img/doodle.png";
import sprite from "@/assets/doodles/rafa-sitting.svg";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";

const router = useRouter();
const guestStore = useGuestStore();
const { guest } = storeToRefs(guestStore);
onBeforeMount(() => {
  if (!guest?.value) return router.push("/error");
});
</script>
<template>
  <div class="title">Hi {{ guest?.name }}, you are invited to RAFAFEST!</div>
  <div class="row justify-center bubble">
    <SpeechBubble class="text textbox">
      If you found your way here, this means you have shared some significant
      and important time of my life with me - no matter if short or long,<br />
      so I would say: <br />
      It’s about time we see each other again!
    </SpeechBubble>
  </div>
  <div class="row justify-center">
    <div class="lets-go">
      <img class="sprite-home-page" :src="sprite" />
      <img class="arrow hide-mobile" :src="doodle" />
      <p>
        Obviously, this is me, Raphael. <br />
        You'll see me throughout your invitation.
      </p>
      <router-link class="submit-button" to="/rafafest">
        Let's go &#10084;
      </router-link>
    </div>
  </div>
</template>
<style>
.lets-go {
  margin-left: 30vw;
}
.arrow {
  margin-left: -15vw;
  margin-bottom: -100px;
}
.sprite-home-page {
  right: 30vw;
  position: absolute;
  height: 60vh;
}

.submit-button {
  color: var(--vt-c-white-mute);
  background-color: var(--vt-c-black-mute);
  border-radius: 10px;
  width: 100%;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: larger;
}
.submit-button:hover {
  color: var(--vt-c-white);
  background-color: var(--vt-c-black);
  cursor: pointer;
}

@media (max-width: 680px) {
  .sprite-home-page {
    top: -25vh;
    right: 15vh;
    height: 25vh;
  }
  .lets-go {
    margin: 25vh auto 0 auto;
  }
}
</style>
