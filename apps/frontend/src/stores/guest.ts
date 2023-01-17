import api from "@/api";
import type { rsvpData } from "@/api/guest";
import type { Friend, Guest } from "@rafafest/core";
import { defineStore } from "pinia";

const LOCAL_STORAGE_KEY = "guest";

interface GuestStoreState {
  guest?: Guest & {
    friendsData: Friend[];
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
    rsvp: async function (data: rsvpData) {
      try {
        await api.guest.rsvp(data);
        await this.fetch(data.code);
      } catch {
        this.guest = undefined;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
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
