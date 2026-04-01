export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-03-27',

  vite: {
    server: {
      allowedHosts: true,
    },
  },
})
