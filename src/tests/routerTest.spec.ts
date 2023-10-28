import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { flushPromises, mount } from "@vue/test-utils";
import { useRouter, useRoute } from "vue-router";
import { vi } from "vitest";
import { id } from "element-plus/es/locale";

const App = {
  template: `
    <router-link to="/posts">Go to posts</router-link>
    <router-view />
  `,
};

const Posts = {
  template: `
    <h1>Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.name }}
      </li>
    </ul>
  `,
  setup() {
    const posts = ref([{ id: 1, name: "Testing Vue Router" }]);
    return {
      posts,
    };
  },
};

const routes = [
  {
    path: "/",
    component: {
      template: "Welcome to the blogging app",
    },
  },
  {
    path: "/posts",
    component: Posts,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

it("routing", async () => {
  router.push("/");

  // After this line, router is ready
  await router.isReady();

  const wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  });
  expect(wrapper.html()).toContain("Welcome to the blogging app");

  await wrapper.find("a").trigger("click");
  await flushPromises();
  expect(wrapper.html()).toContain("Testing Vue Router");
});

const Component = {
  template: `<button @click="redirect">Click to Edit</button>`,
  props: ["isAuthenticated"],
  setup(props: any) {
    const router = useRouter();
    const route = useRoute();

    const redirect = () => {
      if (props.isAuthenticated) {
        router.push(`/posts/${route.params.id}/edit`);
      } else {
        router.push("/404");
      }
    };

    return { redirect };
  },
};

vi.mock("vue-router", async () => {
  const actual = await vi.importActual("vue-router");
  const router = actual.createRouter({
    history: actual.createMemoryHistory(),
    routes: [], // 你的路由配置
  });

  // mock useRouter 方法
  const useRouter = () => router;

  return {
    ...actual,
    useRouter, // 返回 mock 后的 useRouter 方法
  };
});

it("allows authenticated user to edit a post", async () => {
  useRoute.mockImplementationOnce(() => ({
    params: {
      id: 1,
    },
  }));

  const push = vi.fn();
  useRouter.mockImplementationOnce(() => ({
    push,
  }));

  const wrapper = mount(Component, {
    props: {
      isAuthenticated: true,
    },
    global: {
      stubs: ["router-link", "router-view"],
    },
  });

  await wrapper.find("button").trigger("click");

  expect(push).toHaveBeenCalledTimes(1);
});

// real router
