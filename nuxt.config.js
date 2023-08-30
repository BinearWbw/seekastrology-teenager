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
    cdnUrl: 'https://asserts.gameseeks.com/',
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
        content:
          'width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui',
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Seekastrology is a platform that gathers countless young gamers with the best free online games. All of our games are designed to provide young people with a better way to relax and have fun, with healthy gameplay and a wide range of styles waiting for your selection. When you are looking for fun through games, Seekastrology will be your faithful choice, offering you a more comprehensive range of games, the most diverse selection and as many new surprises as possible!',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'Role-playing games, entertainment games, puzzle games, strategy games, cute games, pet games, parkour games, synthesis games, dress up games, princess games, adventure games, casual games, healing games, horror games, music games, cooking games',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content:
          'Seekastrology－dedicated to the dreams and wonders of the young crowd, play with your own colors in the game!',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Seekastrology is a platform that gathers countless young gamers with the best free online games. All of our games are designed to provide young people with a better way to relax and have fun, with healthy gameplay and a wide range of styles waiting for your selection. When you are looking for fun through games, Seekastrology will be your faithful choice, offering you a more comprehensive range of games, the most diverse selection and as many new surprises as possible!',
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
    { src: '@/plugins/aos', mode: 'client' },
    { src: '@/plugins/antd-ui', mode: 'client' },
    '@/plugins/cookiePersistence',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'vue-toastification/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-precompress',
    'cookie-universal-nuxt',
  ],

  cookies: {
    path: '/',
    // 其他选项...
  },
  nuxtPrecompress: {
    gzip: {
      enabled: true,
      filename: '[path].gz[query]',
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      enabled: true,
      filename: '[path].br[query]',
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
    enabled: true,
    report: false,
    test: /\.(js|css|html|txt|xml|svg|ttf)$/,
    middleware: {
      enabled: false,
      enabledStatic: true,
      encodingsPriority: ['br', 'gzip'],
    },
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
