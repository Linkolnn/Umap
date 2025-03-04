import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['nuxt-svgo'],
  alias: {
    '@color' : resolve(__dirname, 'assets/color.sass'),
    '@mixin' : resolve(__dirname, 'assets/mixin.sass'),
    '@global' : resolve(__dirname, 'assets/global.sass'),
    '@fonts' : resolve(__dirname, 'assets/fonts.sass'),
    '@composables' : resolve(__dirname, '/composables'),
    '@services' : resolve(__dirname, '/services'),
    '@utils' : resolve(__dirname, '/utils'),
  },

  app: {
    head: {
      script: [
        {
          src: 'https://api-maps.yandex.ru/2.1/?apikey=8c153f10-4f81-4adc-bf29-7321c5d48ce3&lang=ru_RU',
          async: true,
        }
      ],
      title: 'Umap',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
          sizes: 'any'
        },
      ]
    }
  },
  svgo: {
    autoImportPath: "./assets/icons/",
    componentPrefix: "Icon",
    svgoConfig: {
      plugins: [
        { 
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
            }
          }
        }
      ]
    }
  },
})