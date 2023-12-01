// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
  ],

  app: {
    head: {
      meta: [
        {name: "robots", content: "noindex"}
      ],
      script: [
        {
          src: "https://www.google.com/recaptcha/api.js?render=explicit",
          // defer: true,
          async: true
        }
      ]
    }
  },

  runtimeConfig: {
    // public: {
    //   fullURI: "https://dominfo.info",
    //   domain: "Dominfo.info",
    //   ogImagePre: "/api/og-image/",
    //   // cdnDomain: "https://cdn.dominfo.org/",
    //   cdnDomain: "https://storage.dominfo.org/",
    //   support: {
    //     phone: "+7 (800) 600-40-87",
    //     email: "info@dominfo.info",
    //   },
    //   partner: {
    //     email: "partner@dominfo.ru",
    //     phone: "+7 (987) 654-32-10",
    //   },
    //   reCaptchaV2: {
    //     token: "6Lc5aBEpAAAAAK6cth-rnUJqwditJgIDsRxVNgik"
    //   }
    // },
  },

  i18n: {
    vueI18n: "i18n.config.ts",
    baseUrl: "https://dominfo.info",
    defaultLocale: "ru",
    strategy: "prefix_and_default",
    lazy: false,
    compilation: {
      escapeHtml: false,
      strictMessage: false,
    },
    detectBrowserLanguage: {
      alwaysRedirect: false,
      fallbackLocale: "",
      redirectOn: "root",
      useCookie: true,
      cookieCrossOrigin: false,
      cookieDomain: null,
      cookieKey: "i18n_redirected",
      cookieSecure: false,
    },
    // Locales
    langDir: "locales",
    locales: [
      {code: "ru", iso: "ru-RU", file: "ru.json"}
    ]
  },

  css: ["@/assets/scss/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  routeRules: {
    "/api/**": {
      proxy: {to: "http://api/api/**"} // Minikube
      //proxy: {to: "http://127.0.0.1:8081/api/**"} // Local
    },
  }
})
