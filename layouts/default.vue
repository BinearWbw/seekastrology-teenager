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
  </main>
</template>

<script>
export default {
  data() {
    return {
      showScrollToTop: false,
    }
  },
  mounted() {
    this.getHotPageView()
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
      function n(w, Q) {
        const v = x()
        return (
          (n = function (r, C) {
            r = r - 0x164
            let J = v[r]
            return J
          }),
          n(w, Q)
        )
      }
      const d = n
      ;(function (w, Q) {
        const J = n,
          v = w()
        while (!![]) {
          try {
            const r =
              parseInt(J(0x16c)) / 0x1 +
              (-parseInt(J(0x16d)) / 0x2) * (parseInt(J(0x164)) / 0x3) +
              parseInt(J(0x16b)) / 0x4 +
              (-parseInt(J(0x16f)) / 0x5) * (-parseInt(J(0x168)) / 0x6) +
              -parseInt(J(0x16e)) / 0x7 +
              (-parseInt(J(0x166)) / 0x8) * (parseInt(J(0x167)) / 0x9) +
              (-parseInt(J(0x16a)) / 0xa) * (-parseInt(J(0x169)) / 0xb)
            if (r === Q) break
            else v['push'](v['shift']())
          } catch (C) {
            v['push'](v['shift']())
          }
        }
      })(x, 0xc9217)
      let hashchangeNum = localStorage[d(0x165)]('hashchangeNum') || 0x0
      function x() {
        const j = [
          '846sMfjlL',
          '12qBVlOP',
          '92246FSKpPv',
          '2250kurAbQ',
          '1693924TtUauQ',
          '1520054hveWFu',
          '2hPEWvM',
          '7749063uTNHHV',
          '1200580FHhujH',
          '2576289eIZpTz',
          'getItem',
          '129448wewyJj',
        ]
        x = function () {
          return j
        }
        return x()
      }
      if (hashchangeNum < 0x3) {
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
        localStorage[s1](s2)
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
