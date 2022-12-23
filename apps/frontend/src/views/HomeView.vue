<script lang="ts" setup>
import SpeechBubbleVue from "@/components/SpeechBubble.vue";
import doodle from "@/assets/img/doodle.png";
import sprite from "@/assets/img/rafa-sitting.svg";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useGuestStore } from "@/stores";
import { storeToRefs } from "pinia";

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
      <div class="content title">Hi, welcome to RAFAFEST!</div>
    </div>
    <div class="row justify-center">
      <SpeechBubbleVue class="bubble" style="font-size: large"
        >If you found your way here, this means we (you and me) have likely
        shared a shorter or longer, but most importantly significanant and
        important time together in my life! <br />
        It is about time we see each other again!
      </SpeechBubbleVue>
    </div>
    <div class="row justify-center">
      <div class="lets-go">
        <img class="doodle" :src="doodle" />
        <p>
          This is me, Raphael. <br />
          You'll see me throughout your invitation.
        </p>
        <router-link class="submit-button" to="/rafafest">
          Let's go &#10084;
        </router-link>
      </div>
    </div>
  </div>
  <img class="sprite-home-page" :src="sprite" />
</template>
<style>
.lets-go {
  margin-top: 30vh;
  margin-left: 30vw;
}
.doodle {
  bottom: 50px;
  right: 250px;
  position: absolute;
}
.sprite-home-page {
  bottom: 5vh;
  left: 5vw;
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

.bubble {
  margin: 0 10vw;
}

@media (min-width: 1280px) {
  .bubble {
    width: 30%;
  }
}
@media (max-width: 680px) {
  .sprite-home-page {
    bottom: 0vh;
    width: 40vw;
  }
  .doodle {
    display: none;
  }
  .lets-go {
    margin: 15vh 0;
  }
}
</style>
