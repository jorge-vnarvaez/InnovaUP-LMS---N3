// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: [
        'postcss-import',
        "@tailwindcss/nesting",
        '@nuxtjs/tailwindcss',
        './modules/n3-directus-authentication/index.js',
        './modules/n3-block-builder/index.js',
        './modules/smart-ui/index.js',
        'nuxt-quasar-ui',
        'nuxt-icon',
    ],
    plugins: [
        '~/plugins/db/schema-nuxt3.js',
        '~/plugins/objectToQueryString/objectToQueryString-nuxt3.js',
        '~/plugins/sanitization-rules/sanitization-rules-nuxt3.js',
        '~/plugins/js-video-url-parser/js-video-url-parser.js',
    ],
    vite: {
        css: {
            devSourcemap: true,
        },
    },
    // css: [
      // 'quasar/fonts',
      // 'quasar/animations',
      // 'quasar/icons',
      // 'quasar/css',
      // 'quasar/brand' // If config.brand is used
      // '@/assets/tailwind.css',
    // ],
    quasar: {
      extras: {
        fontIcons: ['material-icons']
      }
    },
    css: [
        "@/assets/scss/main.scss",
    ],
    // axios: {
    //   baseURL: 'http://localhost:4000',
    // },
    runtimeConfig: {
        privateExampleKey: '123',
        public: {
          apiBase: '/api',
          api: {
            baseURL:
              process.env.NODE_ENV === 'production'
                ? process.env.API_BASE_URL_PRODUCTION
                : process.env.API_BASE_URL_DEVELOPMENT,
            publicURL:
              process.env.NODE_ENV === 'production'
                ? process.env.PUBLIC_URL_PRODUCTION
                : process.env.PUBLIC_URL_DEVELOPMENT,
          },
        }
    },
    postcss: {
      plugins: {
        "postcss-import": {},
        "tailwindcss/nesting": {},
        tailwindcss: {},
        autoprefixer: {},
      }

    }

})
