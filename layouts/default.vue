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
    let url = 'https://seekastrology.com'
    if (window.location.host == 'seekastrology.com') {
      url = 'https://www.seekastrology.com'
    } else if (window.location.host == 'www.seekastrology.com') {
      url = 'https://seekastrology.com'
    } else {
      url = `http://${window.location.host}`
    }
    this.$store.commit('UPDATE_INTERSPERSE_URL', url)
    window.addEventListener('scroll', this.handleScroll)
    this.firstOpenSend()
    this.showNotification()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
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
      const firstOpenVal = sessionStorage.getItem('firstOpen')

      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            // 用户同意了通知
            console.log('用户同意通知')
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
          window.location.href = 'https://seekastrology.com/tarot/'
        }
        sessionStorage.setItem('firstOpen', 2)
      }
    },
    firstOpenSend() {
      const firstOpenVal = sessionStorage.getItem('firstOpen')
      if (!firstOpenVal) sessionStorage.setItem('firstOpen', 1)
    },
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
