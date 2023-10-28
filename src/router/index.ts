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

export const routes = [
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
  {
    path: "/PostView",
    name: "PostView",
    meta: {
      title: "PostView",
      breadCrumb: processBreadcrumb([
        {
          text: "PostView",
          routeName: "PostView",
        },
      ]),
    },
    component: () => import("@/views/PostView.vue"),
  },
  {
    path: "/FunctionalProgramView",
    name: "FunctionalProgram",
    meta: {
      title: "FunctionalProgram",
      breadCrumb: processBreadcrumb([
        {
          text: "FunctionalProgram",
          routeName: "FunctionalProgram",
        },
      ]),
    },
    component: () => import("@/views/FunctionalProgram.vue"),
  },
  {
    path: "/ThirdUITest",
    name: "ThirdUITest",
    meta: {
      title: "ThirdUITest",
      breadCrumb: processBreadcrumb([
        {
          text: "ThirdUITest",
          routeName: "ThirdUITest",
        },
      ]),
    },
    component: () => import("@/views/ThirdUITest.vue"),
  },
  {
    path: "/testSlots",
    name: "testSlots",
    meta: {
      title: "testSlots",
      breadCrumb: processBreadcrumb([
        {
          text: "testSlots",
          routeName: "testSlots",
        },
      ]),
    },
    component: () => import("@/views/testSlots.vue"),
  },
  {
    path: "/testAPI",
    name: "testAPI",
    meta: {
      title: "testAPI",
      breadCrumb: processBreadcrumb([
        {
          text: "testAPI",
          routeName: "testAPI",
        },
      ]),
    },
    component: () => import("@/views/testAPI.vue"),
  },
  {
    path: "/PiniaView",
    name: "PiniaView",
    meta: {
      title: "PiniaView",
      breadCrumb: processBreadcrumb([
        {
          text: "PiniaView",
          routeName: "PiniaView",
        },
      ]),
    },
    component: () => import("@/views/PiniaView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
