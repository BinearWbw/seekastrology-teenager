import sitemap from './config/sitemap'
import routes from './config/routes'

module.exports = {
  target: 'static',

  generate: {
    // crawler: false,
    manifest: false,
    concurrency: 500,
    interval: 100,
    routes() {
      return routes
    },
  },
  /*
   ** Server configuration
   */
  server: {
    port: 3001,
    host: '0.0.0.0',
  },

  env: {
    origin: 'seekastrology',
  },

  axios: {
    baseURL: process.env.PUBLIC_URL,
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.PUBLIC_URL,
    },
    cdnUrl: 'https://www.doitme.link/',
    // cdnUrl: 'http://192.168.6.63:9907/',  // 徐波
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.PRIVATE_URL,
    },
  },

  transition: {
    name: 'fade',
    mode: 'out-in',
  },

  productionSourceMap: process.env.NODE_ENV === 'development' ? true : false,

  telemetry: false,

  // hooks: {
  //   'render:route': (url, result) => {
  //     result.html = result.html
  //       .replace(/ data-n-head=".*?"/gi, '')
  //       .replace(/ data-hid=".*?"/gi, '')
  //   },
  // },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Seekastrology',
    meta: [
      { charset: 'utf-8' },
      {
        hid: 'theme-color',
        property: 'theme-color',
        content: '#1f2128',
      },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
      { name: 'apple-mobile-web-app-title', content: 'seekastrology' },
      { name: 'HandheldFriendly', content: 'true' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,minimal-ui',
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Find free horoscopes, tarot AI, astrology quizzes, latest astrology news, horoscope personality traits on seekastrology.com, your one-stop platform for all things astrological...',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'One Card Tarot Reading with AI empowered Chatbot offer free and personalized reading based on your question. Pick a card and then write down your question in ...',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content:
          'Get your free seekastrology.com daily horoscope: Aries Taurus Gemini Cancer Leo Virgo Scorpio Sagittarius Capricorn ...',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Discover a true divination experience at seeastrology .com! Get answers that reveal your love, marriage and career through tarot divination.',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://seekastrology.com/',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://seekastrology.com/favicon.png',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:domain',
        name: 'twitter:domain',
        content: 'seekastrology.com',
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://seekastrology.com/',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content:
          'Seekastrology－dedicated to the dreams and wonders of the young crowd, play with your own colors in the game!',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Seekastrology is a platform that gathers countless young gamers with the best free online games. All of our games are designed to provide young people with a better way to relax and have fun, with healthy gameplay and a wide range of styles waiting for your selection. When you are looking for fun through games, Seekastrology will be your faithful choice, offering you a more comprehensive range of games, the most diverse selection and as many new surprises as possible!',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://seekastrology.com/favicon.png',
      },
    ],
    link: [
      { rel: 'preconnect', href: 'https://www.doitme.link' },
      { rel: 'preconnect', href: 'https://asserts.gameseeks.com' },
      { rel: 'preconnect', href: 'https://www.seekastrology.com' },
      { rel: 'preconnect', href: 'https://seekastrology.com' },
      { rel: 'preload', as: 'image', href: '/img/rotating_sun.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', sizes: '512x512', href: '/favicon.png' },
      { rel: 'apple-touch-icon', href: '/favicon.png' },
    ],
    // htmlAttrs: {
    //   translate: 'no',
    // },
  },

  router: {
    mode: 'history',
    trailingSlash: true, // 在生产环境中保留尾部斜杠
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss',
    'aos/dist/aos.css',
    'ant-design-vue/dist/antd.css',
  ],

  loading: false,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/axios',
    '~plugins/utils',
    '~/plugins/event-bus.js', // 添加事件总线插件
    '~plugins/cookiePersistence',
    { src: '~plugins/aos', ssr: false },
    { src: '~plugins/antd-ui', ssr: false, mode: 'client' },
    // { src: '~plugins/cookiePersistence', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'vue-toastification/nuxt',
    '@nuxtjs/sitemap',
    'cookie-universal-nuxt',
  ],

  extend(config, ctx) {
    if (ctx.idDev) {
      config.entry.push('eventsource-polyfill')
    }
  },

  cookies: {
    path: '/',
    // 其他选项...
  },

  sitemap: sitemap,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/pwa', '@nuxt/image'],

  toast: {
    draggable: false,
  },

  pwa: {
    icon: {
      source: '/favicon.png',
      fileName: 'favicon.png',
    },
    manifest: {
      name: 'seekastrology',
      short_name: 'seekastrology',
      description:
        'Seekastrology is a platform that gathers countless young gamers with the best free online games. All of our games are designed to provide young people with a better way to relax and have fun, with healthy gameplay and a wide range of styles waiting for your selection. When you are looking for fun through games, Seekastrology will be your faithful choice, offering you a more comprehensive range of games, the most diverse selection and as many new surprises as possible!',
    },
    // workbox: {
    //   dev: true,
    // },
  },

  image: {
    provider: 'cloudflare',
    cloudflare: {
      baseURL: 'https://www.doitme.link/',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /* https://gamecenter-superman.oss-cn-chengdu.aliyuncs.com/web/ */
    // publicPath: process.env.PUBLIC_PATH,
    // maxChunkSize: 300000,
    html: {
      minify: false,
    },
    extractCSS: {
      ignoreOrder: true,
    },
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: true,
        minSize: 10000,
        maxSize: 250000,
        cacheGroups: {
          vendor: {
            name: 'node_vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            maxSize: 250000,
          },
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
          commons: {
            test: /node_modules[\\/](vue|vue-loader|vue-router|vuex|vue-meta|core-js|@babel\/runtime|axios|webpack|setimmediate|timers-browserify|process|regenerator-runtime|cookie|js-cookie|is-buffer|dotprop|nuxt\.js)[\\/]/,
            chunks: 'all',
            priority: 10,
            name: true,
          },
        },
      },
    },
  },
}
