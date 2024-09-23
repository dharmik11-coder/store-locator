// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css:['bootstrap/dist/css/bootstrap.min.css'],
  vite:{
    define:{
      'process.env.DEBUG':false,
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
