import api from "@/api";
import type { rsvpData } from "@/api/guest";
import type { Friend, Guest as _Guest } from "@rafafest/core";
import { defineStore } from "pinia";

const LOCAL_STORAGE_KEY = "guest";
type Guest = _Guest & {
  friendsData: Friend[];
};

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
        const guest = await api.guest.get(code);
        const friendsData = await Promise.all(
          Array(guest.invites)
            .fill(0)
            .map(async (_, index) => {
              return guest.friends[index]
                ? await fetchPlusOne(
                    guest.code,
                    guest.friends[index].toString()
                  )
                : {
                    name: undefined,
                    email: undefined,
                    mainGuest: false,
                  };
            })
        );
        this.guest = { ...guest, friendsData };
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

const fetchPlusOne = async (code: string, id: string): Promise<Friend> => {
  try {
    return await api.guest.getFriend(code, id);
  } catch {
    return {
      name: "error",
      email: "error",
      mainGuest: true,
    };
  }
};
