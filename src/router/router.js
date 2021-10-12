import { createWebHashHistory, createRouter } from "vue-router";
import Main from "../views/Main.vue";
import Intro from "../views/Intro.vue";

const routes = [
  {
    path: "/",
    component: Intro,
  },
  {
    path: "/chart",
    component: Main,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
