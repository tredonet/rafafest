<script setup lang="ts">
import api from "@/api";
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const { token } = storeToRefs(authStore);
const onLogin = async () => {
  try {
    error.value = false;
    // const bearer_token = await api.auth.login(username.value, password.value);
    const bearer_token = 0;
    if (!bearer_token) throw new Error();
    token.value = bearer_token;
    router.push("/manager");
  } catch (e) {
    console.log(e);
    error.value = true;
  }
};
</script>
<template>
  <div class="flex justify-center items-center loginbox">
    <q-card square bordered class="q-pa-lg shadow-4 login-card">
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            square
            filled
            clearable
            v-model="username"
            label="username"
          />
          <q-input
            square
            filled
            v-model="password"
            type="password"
            label="password"
          />
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn
          class="custom-button full-width"
          label="Login"
          @click="onLogin"
        />
      </q-card-actions>

      <q-card-section v-if="error" class="text-center q-pa-none">
        <p class="text-red-6">Failed to login</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<style>
.loginbox {
  top: 30%;
}

.login-card {
  width: 360px;
}
</style>
