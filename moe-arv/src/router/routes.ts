const routes = [
  {
    path: `/home`,
    name: "HomeView",
    component: () => import("../App.vue"),
  },
];

export default routes;
