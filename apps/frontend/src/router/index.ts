import { createRouter, createWebHistory } from "vue-router";
import {
  CryView,
  FAQView,
  GuestListView,
  HomeView,
  InviteView,
  RafafestView,
  SplashView,
  TipsView,
  TimetableView
} from "@/views";
import { InviteChecker } from "@/features";
import { LoginView, ManagerView } from "@/manager";

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
      path: "/guestlist",
      name: "guestlist",
      component: GuestListView,
    },
    {
      path: "/vlc-tips",
      name: "vlctips",
      component: TipsView,
    },
    {
      path: "/good-to-know",
      name: "goodtoknow",
      component: FAQView,
    },
    // {
    //   path: "/timetable",
    //   name: "timetable",
    //   component: TimetableView,
    // },
    {
      path: "/error",
      name: "noinvite",
      component: SplashView,
    },
    {
      path: "/cry",
      name: "cry",
      component: CryView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/manager",
      name: "manager",
      component: ManagerView,
    },
    {
      path: "/:code",
      name: "start",
      component: InviteChecker,
    },
  ],
});

export default router;
