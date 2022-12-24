<script lang="ts" setup>
import { Modal } from "@/components";
import { useRouter } from "vue-router";
const router = useRouter();
const redirect = () => router.push("/cry");
</script>
<template>
  <Modal title="Noooo :(" :button-action="redirect" button-text="CRY">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus
    sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea
    at omnis vel numquam exercitationem aut, natus minima, porro labore.
  </Modal>
</template>
