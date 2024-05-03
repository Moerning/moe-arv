import { createWebHistory, createRouter } from "vue-router";
import routes from "./routes";
import { TOKEN_STORAGE } from "@/utils/constants/constants";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((route)=>{
  if(!route.meta?.noAuth){
    const token = localStorage.getItem(TOKEN_STORAGE)
    if(!token){
      return { name:"LoginView" }
    }
  }
})

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
