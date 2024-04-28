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
      },
      {
        path:"register",
        name:"RegisterView",
        component: () => import("../components/pages/auth/register/RegisterIndex.vue"),
        meta:{
          pageTitle:"Register Page"
        }
      }
    ]
  },
];

export default routes;
