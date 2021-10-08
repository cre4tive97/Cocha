import { createWebHashHistory, createRouter } from "vue-router";
import Main from "../views/Main.vue"

const routes = [
  {
    path: "/",
    component : Main
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router; 