<script lang="ts" setup>
import SpeechBubbleVue from "@/components/SpeechBubble.vue";
</script>
<template>
  <div class="q-pa-md doc-container">
    <div class="row justify-center">
      <div class="col-7 title">Hi, welcome to RAFAFEST!</div>
    </div>
    <div class="row justify-center">
      <SpeechBubbleVue class="col-6" style="font-size: large"
        >If you found your way here, this means we (you and me) have likely
        shared a shorter or longer, but most importantly significanant and
        important time together in my life! <br />
        It is about time we see each other again!
      </SpeechBubbleVue>
    </div>
    <div class="row justify-end lets-go">
      <div class="col-5">
        <p>
          This is me, Raphael. <br />
          You'll see me throughout your invitation.
        </p>
        <router-link class="submit-button" to="/rafafest"
          >Let's go &#10084;</router-link
        >
      </div>
    </div>
  </div>
</template>
<style>
.lets-go{
  margin: 150px;
}
.submit-button {
  color: var(--color-background-mute);
  background-color: var(--color-background-mute-inverted);
  border-radius: 10px;
  width: 100%;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: larger;
}
.submit-button:hover {
  color: var(--color-background);
  background-color: var(--color-background-inverted);
  cursor: pointer;
}
</style>
