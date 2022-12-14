<script setup lang="ts">
import NavBarItem from "./NavBarItem.vue";
</script>
<template>
  <nav>
    <NavBarItem to="Home" />
    <NavBarItem to="Rafafest" />
    <NavBarItem to="VLC Tips" disabled />
    <NavBarItem to="Timetable" disabled />
    <NavBarItem to="Good to Know" disabled />
    <NavBarItem to="My invite" />
  </nav>
</template>
<style>
nav {
  font-family: "Patrick", Helvetica, Arial;
  font-size: x-large;
  margin: 1vw 0;
  display: flex;
  justify-content: center;
  gap: 1vw;
}
</style>
