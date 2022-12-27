import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";
import { Quasar, Notify } from "quasar";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, {
  plugins: {
    Notify,
  },
  config: {
    brand: {
      primary: "#3AA655",
      secondary: "#FED85D",
      tertiary: "#ED0A3F",
      dark: "#333",
      mute: "#7D7D7D",
      soft: "#EEE",
      white: "#FFF",
    },
  },
});
app.mount("#app");
