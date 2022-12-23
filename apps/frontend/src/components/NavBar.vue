<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { useRoute } from "vue-router";
import NavBarItem from "./NavBarItem.vue";
const [open, setOpen] = useToggle(false);
const route = useRoute();
</script>
<template>
  <nav class="navbar">
    <NavBarItem
      to="Home"
      :class="!open && route.fullPath !== '/home' && 'collapsed'"
      :onclick="() => setOpen(!open)"
    />
    <NavBarItem
      to="Rafafest"
      :class="!open && route.fullPath !== '/rafafest' && 'collapsed'"
      :onclick="() => setOpen(!open)"
    />
    <NavBarItem
      to="VLC Tips"
      disabled
      :class="!open && route.fullPath !== '/vlc-tips' && 'collapsed'"
      :onclick="() => setOpen(!open)"
    />
    <NavBarItem
      to="Timetable"
      disabled
      :class="!open && route.fullPath !== '/timetable' && 'collapsed'"
      :onclick="() => setOpen(!open)"
    />
    <NavBarItem
      to="Good to Know"
      disabled
      :class="!open && route.fullPath !== '/good-to-know' && 'collapsed'"
      :onclick="() => setOpen(!open)"
    />
    <NavBarItem
      to="My invite"
      :class="!open && route.fullPath !== '/my-invite' && 'collapsed'"
      :onclick="() => setOpen(!open)"
    />
  </nav>
</template>
<style>
.navbar {
  font-family: "Patrick", Helvetica, Arial;
  font-size: x-large;
  margin: 2vh 5vw;
  display: flex;
  justify-content: center;
  gap: 1vw;
}

@media (max-width: 600px) {
  .navbar {
    display: block;
  }
  .collapsed {
    display: none;
  }
}
</style>
