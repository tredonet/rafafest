import axios from "axios";

const API_URL = "/api/auth/";

async function login(username: string, password: string): Promise<string> {
  const response = axios.post<string>(API_URL + "login", {
    username,
    password,
  });
  return (await response).data;
}

export const auth = {
  login,
};
