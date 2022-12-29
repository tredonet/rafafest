import axios from "axios";
import { guests } from "../../../guest";

const config = {
  headers: {
    Authorization:
      "TOKEN",
  },
};
const host = 'http://localhost:8000';
// const host = "https://rafafest.com";

for (const guest of guests) {
  axios
    .post(`${host}/api/guest/invite`, guest, config)
    .then((res) => console.log(res.data.name))
    .catch((error) => console.log(`${guest.name} failed because ${error}`));
}
