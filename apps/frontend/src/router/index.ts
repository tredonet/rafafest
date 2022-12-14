import { createRouter, createWebHistory } from "vue-router";
import { HomeView, InviteView, RafafestView, SplashView } from "@/views";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/my-invite",
      name: "invite",
      component: InviteView,
    },
    {
      path: "/rafafest",
      name: "rafafest",
      component: RafafestView,
    },
    {
      path: "/splash",
      name: "splash",
      component: SplashView,
    },
  ],
});

export default router;
