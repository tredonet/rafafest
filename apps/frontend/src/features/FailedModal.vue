<script lang="ts" setup>
import { Modal } from "@/components";
const haha = () => alert("dvdvdf");
</script>
<template>
  <Modal title="Something went wrong..." :button-action="haha">
    Something went wrong responding your invite.<br />
    Maybe try again later.
  </Modal>
</template>
