import { createRouter, createWebHistory } from "vue-router";
import { HomeView, InviteView, RafafestView, SplashView } from "@/views";
import { InviteChecker } from "@/features";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
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
      path: "/error",
      name: "error",
      component: SplashView,
    },
    {
      path: "/:code",
      name: "start",
      component: InviteChecker,
    },
  ],
});

export default router;
