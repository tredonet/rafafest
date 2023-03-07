import axios from "axios";
import type { Circle, Friend, Guest } from "@rafafest/core";

const API_URL = "/api/guest";

export type GuestListGuest = {
  name: string;
  surname: string;
  circle: Circle;
  attending: "yes" | "no" | "maybe" | null;
};

type StoreGuest = Guest & {
  friendsData?: Guest[];
  newFriends: Friend[];
};

const headers = (code: string) => ({
  headers: {
    code,
  },
});

async function get(code: string): Promise<Guest> {
  const response = await axios.get<Guest>(`${API_URL}/find?code=${code}`);
  return response.data;
}

async function list(code: string): Promise<GuestListGuest[]> {
  const response = await axios.get<GuestListGuest[]>(
    `${API_URL}/list`,
    headers(code)
  );
  return response.data;
}

async function listAll(bearer_token: string): Promise<Guest[]> {
  const response = await axios.get<Guest[]>(API_URL, {
    headers: {
      Authorization: `Bearer: ${bearer_token}`,
    },
  });
  return response.data;
}

async function updateInvite(guest: StoreGuest): Promise<void> {
  delete guest.friendsData;
  const response = await axios.post(`${API_URL}/update`, guest);
  return response.data;
}

async function getFriends(code: string): Promise<Guest[]> {
  const response = await axios.get<Guest[]>(
    `${API_URL}/getfriends`,
    headers(code)
  );
  return response.data;
}

async function updateFriend(code: string, friend: Guest): Promise<void> {
  const response = await axios.post(
    `${API_URL}/updatefriend`,
    friend,
    headers(code)
  );
  return response.data;
}

async function deleteFriend(code: string, id: string): Promise<void> {
  await axios.post<null>(`${API_URL}/deletefriend/`, { id }, headers(code));
}

export const guest = {
  get,
  list,
  listAll,
  updateInvite,
  getFriends,
  updateFriend,
  deleteFriend,
};
