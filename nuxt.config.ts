// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    // '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/ionic',
    '@vueuse/nuxt',
  ],
  ionic: {
    css: {
      utilities: true,
    },
  },
})
