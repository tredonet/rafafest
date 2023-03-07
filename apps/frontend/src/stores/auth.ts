import { defineStore } from "pinia";

const LOCAL_STORAGE_KEY = "auth";

interface AuthStoreState {
  token: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthStoreState => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY) || "";
    return { token };
  },
});
