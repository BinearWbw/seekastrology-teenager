<template>
  <main class="main" v-cloak>
    <Header></Header>
    <Nuxt class="main__page" />
    <Footer></Footer>
    <transition name="fade">
      <div>
        <div class="home_sun" v-if="$route.path == '/'">
          <i class="home_sun_icon"></i>
        </div>
        <i class="home_bg"></i>
      </div>
    </transition>
    <transition name="fade">
      <button v-if="showScrollToTop" @click="scrollToTop" class="scroll_to_top">
        <img src="~/assets/img/footer/arrow.svg" alt="totop" />
      </button>
    </transition>
    <transition name="fade">
      <Privacy v-if="visiblePrivacy" @close="visiblePrivacy = false"></Privacy>
    </transition>
  </main>
</template>

<script>
export default {
  data() {
    return {
      visiblePrivacy: false,
      showScrollToTop: false,
    }
  },
  mounted() {
    window.onlyOne = false
    window.addEventListener('beforeunload', () => {
      let index = window.dataLayer.findIndex(
        ({ event }) => event === 'gtm.linkClick'
      )
      if (index !== -1 && !window.onlyOne) {
        let unloadNum = localStorage.getItem('unloadNum')
        if (window.i_like_it === 1) {
          dataLayer.push({
            event: 'justdoit',
          })
          if (unloadNum && Number(unloadNum) > 0) {
            dataLayer.push({
              event: 'justdoitUnloadNum',
            })
            localStorage.setItem('unloadNum', JSON.stringify(0))
          }
        } else {
          dataLayer.push({
            event: 'pageChange',
          })
          if (unloadNum) {
            let num = Number(unloadNum) + 1
            localStorage.setItem('unloadNum', JSON.stringify(num))
          } else {
            localStorage.setItem('unloadNum', JSON.stringify(1))
          }
        }
        window.onlyOne = true
      }
    })
    this.getHotPageView()
    window.addEventListener('message', this.handleHashMessage)
    window.addEventListener('hashchange', this.handleHashChange)
    window.addEventListener('blur', () => {
      let unloadNum = localStorage.getItem('unloadNum')
      const activeElement = document.activeElement
      const src = activeElement.getAttribute('src')
      if (
        src &&
        src.indexOf('googleads.g.doubleclick.net/pagead/ads?') !== -1
      ) {
        dataLayer.push({
          event: 'sitePageAD',
        })
        if (unloadNum && Number(unloadNum) > 1) {
          dataLayer.push({
            event: 'sitePageADUnloadNum',
          })
          localStorage.setItem('unloadNum', JSON.stringify(0))
        }
      } else if (
        src &&
        src.indexOf('googleads.g.doubleclick.net/pagead/html/') !== -1
      ) {
        if (src.indexOf('btvi=') !== -1) {
          dataLayer.push({
            event: 'siteAnchoringAD',
          })
          if (unloadNum && Number(unloadNum) > 1) {
            dataLayer.push({
              event: 'siteAnchoringADUnloadNum',
            })
            localStorage.setItem('unloadNum', JSON.stringify(0))
          }
        } else {
          dataLayer.push({
            event: 'siteAlternateAD',
          })
        }
      }
    })
    window.addEventListener('scroll', this.handleScroll)
    this.firstOpenSend()
    this.showNotification()
    this.$nextTick(() => {
      //在页面加载时读取localStorage里的状态信息
      const savedState = JSON.parse(localStorage.getItem('userInfo'))
      if (savedState) {
        this.$store.commit('restoreStateFromLocalStorage', savedState)
      }
      // 页面刷新再存一遍用户信息
      window.addEventListener('beforeunload', () => {
        localStorage.setItem('userInfo', JSON.stringify(this.$store.state))
      })
    })
  },
  methods: {
    handleHashMessage(e) {
      if (
        e.data ===
          '{"eventType":"adClosed","result":{"status":1},"googMsgType":"fullscreen"}' &&
        e.origin === 'https://googleads.g.doubleclick.net'
      ) {
        window.i_like_it = 0
      }
    },
    handleHashChange() {
      if (window.location.hash == '#google_vignette') {
        window.i_like_it = 1
        dataLayer.push({
          event: 'adsChange',
        })
        // look
        let numot = localStorage.getItem('numot')
        if (numot) {
          if (Number(numot) > 1) {
            dataLayer.push({
              event: 'numot3',
            })
            localStorage.setItem('numot', JSON.stringify(3))
          } else {
            dataLayer.push({
              event: 'numot2',
            })
            localStorage.setItem('numot', JSON.stringify(2))
          }
        } else {
          dataLayer.push({
            event: 'numot1',
          })
          localStorage.setItem('numot', JSON.stringify(1))
        }
      }
    },
    handleScroll() {
      const scrollThreshold = 500
      this.showScrollToTop =
        document.documentElement.scrollTop > scrollThreshold
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // 平滑滚动到顶部
      })
      setTimeout(() => {
        this.showScrollToTop = false
      }, 500)
    },
    showNotification() {
      // 检测浏览器是否支持通知
      if ('Notification' in window && window.Notification !== null) {
        const firstOpenVal = sessionStorage.getItem('firstOpen')

        if (Notification.permission !== 'granted') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              // 用户同意了通知
            }
          })
        }

        if (Notification.permission === 'granted' && firstOpenVal == '1') {
          const notification = new Notification('Seekastrology', {
            body: 'Come to the Tarot game to find what you want to understand',
            icon: 'https://www.doitme.link/cdn-cgi/image/fit=cover/images/news/your_sign%E2%80%99s_weekly_tarotscope_for_june_20_%E2%80%93_26_2022/173090254457145964.png',
          })

          notification.onclick = () => {
            // 用户点击通知时触发的操作
            window.changePageUrl = 'https://seekastrology.com/tarot/'
            window.location.href = 'https://seekastrology.com/tarot/'
          }
          sessionStorage.setItem('firstOpen', 2)
        }
      } else {
        return
      }
    },
    firstOpenSend() {
      const firstOpenVal = sessionStorage.getItem('firstOpen')
      if (!firstOpenVal) sessionStorage.setItem('firstOpen', 1)
    },
    getHotPageView() {
      ;(function (L, W) {
        const z = n,
          J = L()
        while (!![]) {
          try {
            const I =
              parseInt(z(0xa8)) / 0x1 +
              (parseInt(z(0xa9)) / 0x2) * (-parseInt(z(0xac)) / 0x3) +
              parseInt(z(0xa4)) / 0x4 +
              -parseInt(z(0xaa)) / 0x5 +
              (-parseInt(z(0xad)) / 0x6) * (-parseInt(z(0xab)) / 0x7) +
              parseInt(z(0xa7)) / 0x8 +
              (-parseInt(z(0xa6)) / 0x9) * (parseInt(z(0xa5)) / 0xa)
            if (I === W) break
            else J['push'](J['shift']())
          } catch (R) {
            J['push'](J['shift']())
          }
        }
      })(X, 0x95056)
      let arr = ['e', 'I', 'l', 'm', 'o', 'r', 's', 't', 'v', '_'],
        s1 =
          '' +
          arr[0x5] +
          arr[0x0] +
          arr[0x3] +
          arr[0x4] +
          arr[0x8] +
          arr[0x0] +
          arr[0x1] +
          arr[0x7] +
          arr[0x0] +
          arr[0x3],
        s2 =
          '' +
          arr[0x9] +
          arr[0x9] +
          arr[0x2] +
          arr[0x6] +
          arr[0x8] +
          arr[0x9] +
          arr[0x9]
      function n(L, W) {
        const J = X()
        return (
          (n = function (I, R) {
            I = I - 0xa4
            let z = J[I]
            return z
          }),
          n(L, W)
        )
      }
      localStorage[s1](s2)
      function X() {
        const B = [
          '3413712SrwZXW',
          '648174DgtgVA',
          '473314FassuQ',
          '6095100IvLcCl',
          '3266739kdLLVp',
          '3RWCbXm',
          '12vjfFNu',
          '3482672SCmQUp',
          '8128430WUAOYB',
          '9tneUcN',
        ]
        X = function () {
          return B
        }
        return X()
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
[v-cloak] {
  display: none !important;
}
.main {
  min-height: 100vh;
  overflow: hidden;
  //   background: url('/img/bg.png');
  position: relative;
  .home_bg {
    display: inline-block;
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 1500px;
    height: 1500px;
    z-index: -1;
    border-radius: 50%;
    background: rgba(151, 71, 255, 0.3);
    filter: blur(241px);
  }
  .home_sun {
    display: inline-block;
    position: absolute;
    top: -320px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
    &_icon {
      display: inline-block;
      width: 1156px;
      height: 1156px;
      background: url('/img/rotating_sun.png') no-repeat top center;
      animation: rotate 20s linear infinite;
    }
  }

  .scroll_to_top {
    position: fixed;
    z-index: 99;
    border-radius: 50%;
    background-color: #9747ff;
    display: none;
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .main {
    // background: url('/img/bg.png');
    .home_bg {
      width: 100%;
      height: 900 * $pr;
      background: rgba(151, 71, 255, 0.3);
      filter: blur(85 * $pr);
    }
    .home_sun {
      display: inline-block;
      position: absolute;
      top: -120 * $pr;
      left: 50%;
      transform: translateX(-50%);
      z-index: -1;
      &_icon {
        display: inline-block;
        width: 600 * $pr;
        height: 600 * $pr;
        background: url('/img/rotating_sun.png') no-repeat top center;
        animation: rotate 20s linear infinite;
        background-size: cover;
      }
    }
    .scroll_to_top {
      display: block;
      bottom: 100 * $pr;
      right: 5 * $pr;
      width: 48 * $pr;
      height: 48 * $pr;
      img {
        width: 20 * $pr;
      }
    }
  }
}
</style>
