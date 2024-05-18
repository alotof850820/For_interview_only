// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";
import { VitePWA } from "vite-plugin-pwa";

// Utilities
import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    deps: {
      inline: ["vuetify"],
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
    VitePWA({
      manifest: {
        name: "PWA 学习",
        description: "我的第一个 PWA 项目",
        theme_color: "#00bd7e",
        icons: [
          {
            src: "/App_icon192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/App_icon512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/App_icon60.png",
            sizes: "60x60",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 5050,
    host: "0.0.0.0",
  },
});
