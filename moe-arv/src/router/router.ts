import { createWebHistory, createRouter } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((route) => {
  let title = "Arvan Challenge";
  if (route.meta.pageTitle) {
    title = route?.meta?.pageTitle as string;
  }
  if (document) {
    document.title = title;
  }
});

export default router;
