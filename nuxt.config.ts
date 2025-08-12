import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error vite-plugin-vuetify
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  build: {
    transpile: ["vuetify"],
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  ssr: true,
  app: {
    baseURL: "/wehelp_ai_application/",
  },
});
