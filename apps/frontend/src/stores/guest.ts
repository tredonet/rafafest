import api from "@/api";
import type { Friend, Guest } from "@rafafest/core";
import { defineStore } from "pinia";

const LOCAL_STORAGE_KEY = "guest";

interface GuestStoreState {
  guest?: Guest & {
    friendsData: Guest[];
    newFriends: Friend[];
  };
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
        const guest = await api.guest.get(code);
        const friendsData = await api.guest.getFriends(code);
        const newFriends = Array<Friend>(
          guest.invites - guest.friends.length
        ).fill({ name: undefined, email: undefined });
        this.guest = { ...guest, friendsData, newFriends };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.guest));
      } catch {
        this.guest = undefined;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    },
    updateInvite: async function () {
      try {
        if (!this.guest) return;
        await api.guest.updateInvite(this.guest);
        await this.fetch(this.guest.code);
      } catch {
        this.guest = undefined;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    },
    updateFriend: async function (friend: Guest) {
      try {
        if (!this.guest) return;
        await api.guest.updateFriend(this.guest.code, friend);
        await this.fetch(this.guest.code);
      } catch {
        /*no op */
      }
    },
    deleteFriend: async function (id: string) {
      try {
        if (!this.guest) return;
        await api.guest.deleteFriend(this.guest.code, id);
        await this.fetch(this.guest.code);
      } catch {
        /* no op*/
      }
    },
  },
});
