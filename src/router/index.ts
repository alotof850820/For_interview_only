import { createRouter, createWebHistory } from "vue-router";

const processBreadcrumb = (
  lastRoute: Array<{ text: string; routeName: string; query?: any }> = []
) => {
  lastRoute.unshift({
    text: "Home",
    routeName: "Home",
  });
  return lastRoute;
};

const routes = [
  {
    path: "/",
    redirect: "/Home",
  },
  {
    path: "/Home",
    name: "Home",
    meta: {
      title: "Home",
      breadCrumb: processBreadcrumb([]),
    },
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/TodoList",
    name: "TodoList",
    meta: {
      title: "TodoList",
      breadCrumb: processBreadcrumb([
        {
          text: "TodoList",
          routeName: "TodoList",
        },
      ]),
    },
    component: () => import("@/views/TodoList.vue"),
  },
  {
    path: "/SetTime",
    name: "SetTime",
    meta: {
      title: "SetTime",
      breadCrumb: processBreadcrumb([
        {
          text: "SetTime",
          routeName: "SetTime",
        },
      ]),
    },
    component: () => import("@/views/SetTime.vue"),
  },
  {
    path: "/VueTest",
    name: "VueTest",
    meta: {
      title: "VueTest",
      breadCrumb: processBreadcrumb([
        {
          text: "VueTest",
          routeName: "VueTest",
        },
      ]),
    },
    component: () => import("@/views/VueTest.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
