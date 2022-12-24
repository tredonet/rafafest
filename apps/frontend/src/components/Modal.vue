<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from "quasar";
import { computed } from "vue";

type Props = {
  title: string;
  buttonText?: string;
  buttonAction?: () => any;
};
const props = withDefaults(defineProps<Props>(), {
  title: "Title",
  buttonText: "OK",
});
const onClickHander = computed(() => props.buttonAction);
</script>
<template>
  <q-dialog>
    <q-card>
      <q-card-section>
        <div class="modal-title">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-large">
        <slot />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          unelevated
          class="confirm-button"
          :label="buttonText"
          @click="onClickHander"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style>
.modal-title {
  color: var(--vt-c-black);
  text-align: center;
  font-size: 2rem;
  font-family: "ManropeExtra";
}
.confirm-button {
  width: 50%;
  margin: 2vh 0;
  font-size: 2.5rem;
}
</style>
