import axios from "axios";
import type { Circle, Friend, Guest } from "@rafafest/core";

const API_URL = "/api/guest";

export type GuestListGuest = {
  name: string;
  surname: string;
  circle: Circle;
  attending: "yes" | "no" | "maybe" | null;
};

export type rsvpData =
  | Guest
  | {
      code: string;
      name: string;
      surname: string;
      email: string;
      attending: string;
    };

async function get(code: string): Promise<Guest> {
  const response = await axios.get<Guest>(`${API_URL}/find?code=${code}`);
  return response.data;
}

async function list(code: string): Promise<GuestListGuest[]> {
  const config = {
    headers: {
      code,
    },
  };
  const response = await axios.get<GuestListGuest[]>(`${API_URL}/list`, config);
  return response.data;
}

async function updateInvite(body: rsvpData): Promise<void> {
  const response = await axios.post(`${API_URL}/rsvp`, body);
  return response.data;
}

async function getFriend(code: string, id: string): Promise<Friend> {
  const config = {
    headers: {
      code,
    },
  };
  const response = await axios.get<Friend>(
    `${API_URL}/getfriend/${id}`,
    config
  );
  return response.data;
}

async function deleteFriend(code: string, id: string): Promise<void> {
  const config = {
    headers: {
      code,
    },
  };
  await axios.post<null>(`${API_URL}/deletefriend/`, { id }, config);
}

export const guest = {
  get,
  list,
  updateInvite,
  getFriend,
  deleteFriend,
};
