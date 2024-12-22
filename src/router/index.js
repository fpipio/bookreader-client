import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LibraryView from "../views/LibraryView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/libraries",
    name: "libraries",
    component: LibraryView,
  },
  {
    path: "/libraries/:id",
    name: "library-detail",
    component: () => import("../views/LibraryDetailView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
