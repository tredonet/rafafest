<template>
  <div class="speech-bubble"><slot /></div>
</template>
<style>
.speech-bubble {
  text-align: center;
  padding: 15px;
  position: relative;
  border: 3px solid var(--vt-c-black-mute);
  border-radius: 1.2em;
}

.speech-bubble:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 6%;
  width: 0;
  height: 0;
  border: 1.25em solid transparent;
  border-top-color: var(--vt-c-black-mute);
  border-bottom: 0;
  border-left: 0;
  margin-left: -0.625em;
  margin-bottom: -1.25em;
}
</style>
