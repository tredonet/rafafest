import api from "@/api";
import type { rsvpData } from "@/api/guest";
import type { Guest } from "@rafafest/core";
import { defineStore } from "pinia";

const LOCAL_STORAGE_KEY = "guest";

interface GuestStoreState {
  guest?: Guest;
}

export const useGuestStore = defineStore("guest", {
  state: (): GuestStoreState => {
    const localGuest = localStorage.getItem(LOCAL_STORAGE_KEY);
    const guest = localGuest ? JSON.parse(localGuest) : undefined;
    return { guest };
  },
  actions: {
    fetch: async function (code: string) {
      try {
        this.guest = await api.guest.get(code);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.guest));
      } catch {
        this.guest = undefined;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    },
    rsvp: async function (data: rsvpData) {
      try {
        await api.guest.rsvp(data);
        this.guest = await api.guest.get(data.code);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.guest));
      } catch {
        this.guest = undefined;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    },
  },
});
