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
          pageTitle:"Login Page",
          noAuth:true
        }
      },
      {
        path:"register",
        name:"RegisterView",
        component: () => import("../components/pages/auth/register/RegisterIndex.vue"),
        meta:{
          pageTitle:"Register Page",
          noAuth:true
        }
      }
    ]
  },
  {
    path: `/articles`,
    name: "ArticlesView",
    component: () => import("../layouts/DashboardLayout.vue"),
    children:[
      {
        path:"list",
        name:"ArticlesListView",
        component: () => import("../components/pages/articles/list/ArticleListIndex.vue"),
        meta:{
          pageTitle:"Articles"
        }
      },
      {
        path:"create",
        name:"CreateArticle",
        component: () => import("../components/pages/articles/form/CreateArticleIndex.vue"),
        meta:{
          pageTitle:"Add Article"
        }
      },
      {
        path:"edit/:slug",
        name:"EditArticle",
        component: () => import("../components/pages/articles/form/EditArticleIndex.vue"),
        meta:{
          pageTitle:"Edit Article"
        }
      },
    ]
  },
];

export default routes;
