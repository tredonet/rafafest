import api from "@/api";
import { dummyGuest } from "@/dummydata/guest";
import type { Friend, Guest } from "@rafafest/core";
import { AxiosError } from "axios";
import { defineStore } from "pinia";

// const LOCAL_STORAGE_KEY = "guest";

interface GuestStoreState {
  guest?: Guest & {
    friendsData: Guest[];
    newFriends: Friend[];
  };
}

export const useGuestStore = defineStore("guest", {
  state: (): GuestStoreState => {
    // const localGuest = localStorage.getItem(LOCAL_STORAGE_KEY);
    // const guest = localGuest ? JSON.parse(localGuest) : undefined;
    const guest = dummyGuest;
    //@ts-ignore
    return { guest };
  },
  actions: {
    fetch: async function (code: string) {
      try {
        // const guest = await api.guest.get(code);
        const guest = dummyGuest;
        // const friendsData = await api.guest.getFriends(code);
        const friendsData: Guest[] = [];
        const newFriends: Friend[] = [];
        for (let i = 0; i < guest.invites - guest.friends.length; i++) {
          newFriends.push({ name: undefined, email: undefined });
        }
        //@ts-ignore for dummy data
        this.guest = { ...guest, friendsData, newFriends };
        // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.guest));
      } catch (e) {
        if (e instanceof AxiosError && e.response?.data === "not_found") {
          this.guest = undefined;
          // localStorage.removeItem(LOCAL_STORAGE_KEY);
        } else {
          throw e;
        }
      }
    },
    updateInvite: async function () {
      if (!this.guest) return;
      // await api.guest.updateInvite(this.guest);
      await this.fetch(this.guest.code);
    },
    updateFriend: async function (friend: Guest) {
      if (!this.guest) return;
      // await api.guest.updateFriend(this.guest.code, friend);
    },
    deleteFriend: async function (id: string) {
      if (!this.guest) return;
      // await api.guest.deleteFriend(this.guest.code, id);
      await this.fetch(this.guest.code);
    },
  },
});
