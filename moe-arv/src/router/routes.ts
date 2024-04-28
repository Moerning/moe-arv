const routes = [
  {
    path: `/auth`,
    name: "AuthView",
    component: () => import("../layouts/AuthLayout.vue"),
    children:[
      {
        path:"login",
        name:"LoginView",
        component: () => import("../components/pages/auth/login/LoginIndex.vue"),
        meta:{
          pageTitle:"Login Page"
        }
      }
    ]
  },
];

export default routes;
