import axios from "axios";
import type { Guest } from "@rafafest/core";

const API_URL = "/api/guest";

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

async function rsvp(body: rsvpData): Promise<void> {
  const response = await axios.post(`${API_URL}/rsvp`, body);
  return response.data;
}

export const guest = {
  get,
  rsvp,
};
