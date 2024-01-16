<template>
  <article class="home">
    <div class="meteor">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="tip_down" v-show="isScrolled"></div>
    <div class="home__main">
      <section class="module choice">
        <google-auto-ad :id="'1087831010'" classNames="google_ad_pc" />
        <el-more-free></el-more-free>
      </section>
      <section class="module explore">
        <google-ad
          :id="'6197461548'"
          classNames="google_ad_h5_report"
        ></google-ad>
        <div class="collection" id="MORESERVICES">
          <home-report class="report"></home-report>
          <home-matching class="matching"></home-matching>
          <home-pairing class="pairing"></home-pairing>
        </div>
      </section>
      <section class="module article">
        <div class="infor_module">
          <home-infor-module
            title="Article"
            :inforData="articleData"
          ></home-infor-module>
          <home-infor-module
            title="Video"
            :inforData="videoData"
          ></home-infor-module>
          <home-infor-module
            title="Quiz"
            :inforData="quizData"
          ></home-infor-module>
        </div>

        <div class="list_tabs">
          <!-- <home-tabs :tabs="horroData" @click-selected="handleTabSelected">
            <template>
              <home-infor-module
                v-if="selectedTabIndex === 0"
                title="Article"
                :inforData="articleData"
              ></home-infor-module>
              <home-infor-module
                v-if="selectedTabIndex === 1"
                title="Video"
                :inforData="videoData"
              ></home-infor-module>
              <home-infor-module
                v-if="selectedTabIndex === 2"
                title="Quiz"
                :inforData="quizData"
              ></home-infor-module>
            </template>
          </home-tabs> -->
          <el-widget></el-widget>
        </div>

        <google-ad
          :id="'1626224357'"
          classNames="google_ad_article"
        ></google-ad>
      </section>
      <section class="module quizzes">
        <home-horoscopes></home-horoscopes>
      </section>
      <section class="module new_pop">
        <home-tarot></home-tarot>
      </section>
    </div>
    <!-- <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition> -->
  </article>
</template>

<script>
export default {
  name: 'Home',
  async asyncData({ error, $apiList, params }) {
    try {
      let [articleData, videoData, quizData] = await Promise.all([
        $apiList.articles
          .getNewsList({
            origin: process.env.origin,
            page: 1,
            size: 3,
            kind: 1,
          })
          .then((res) => {
            return res.list || []
          }),
        $apiList.articles
          .getNewsList({
            origin: process.env.origin,
            page: 1,
            size: 3,
            kind: 2,
          })
          .then((res) => {
            return res.list || []
          }),

        $apiList.test
          .getTestList({
            origin: process.env.origin,
            page: 18,
            size: 3,
          })
          .then((res) => {
            return res.list || []
          }),
      ])
      return {
        articleData,
        videoData,
        quizData,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
  data() {
    return {
      isScrolled: false,
      isLoading: true,
      timer: null,
      horroData: [
        {
          tabs: 'Article',
        },
        {
          tabs: 'Video',
        },
        {
          tabs: 'Quiz',
        },
      ],
      selectedTabIndex: 0,
    }
  },
  mounted() {
    this.activeInit()
    this.isScrolled = window.scrollY < 600
    window.addEventListener('scroll', this.handleScroll)

    //首页loading
    // let newUser = localStorage.getItem('newUser')
    // if (!newUser) {
    //   localStorage.setItem('newUser', JSON.stringify(1))
    //   window.addEventListener('message', this.handleMessage)
    //   this.timer = setTimeout(() => {
    //     this.isLoading = false
    //   }, 3000)
    // } else {
    //   this.isLoading = false
    // }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    /* 检测账号激活 */
    activeInit() {
      const currentURL = window.location.href
      if (currentURL.includes('key=')) {
        // 提取 key和type 参数的值
        const urlParams = new URLSearchParams(window.location.search)
        const key = urlParams.get('key')
        const type = urlParams.get('type')
        this.$apiList.user.accountActive({ key, type }).then((res) => {
          if (res?.token) {
            this.$store.commit('UPDATE_USERINFO', res)
            localStorage.setItem('userInfo', JSON.stringify(this.$store.state))
            // 提示通知
            this.$notification.open({
              message: 'Finish',
              description: 'Login successful.',
              duration: 2,
              style: {
                color: '#0f0',
              },
            })
            window.location.href = '/'
          }
        })
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY < 600
      if (window.scrollY > 600) {
        window.removeEventListener('scroll', this.handleScroll)
      }
    },
    //首页loading
    // handleMessage(e) {
    //   if (
    //     typeof e.data === 'string' &&
    //     e.data.includes('adReady') &&
    //     e.origin == 'https://googleads.g.doubleclick.net'
    //   ) {
    //     console.log('ok')
    //     this.show = false
    //     this.timer && clearTimeout(this.timer)
    //     this.timer = null
    //   }
    // },
    handleTabSelected(index) {
      this.selectedTabIndex = index
    },
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
.home {
  position: relative;
  .tip_down {
    position: fixed;
    left: 50%;
    bottom: 100px;
    width: 54px;
    height: 36px;
    background: url('../assets/img/home/tip_down.svg') no-repeat;
    background-size: cover;
    z-index: 50;
    animation: bounce 1s linear infinite;
    @keyframes bounce {
      0% {
        transform: translateY(0) translateX(-50%);
      }
      20% {
        transform: translateY(-5px) translateX(-50%);
      }
      40% {
        transform: translateY(-15px) translateX(-50%);
      }
      60% {
        transform: translateY(-20px) translateX(-50%);
      }
      80% {
        transform: translateY(-10px) translateX(-50%);
      }
      100% {
        transform: translateY(0) translateX(-50%);
      }
    }
  }
  .meteor {
    span {
      position: absolute;
      width: 4px;
      height: 4px;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1),
        0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 1);
      opacity: 0;
      animation: animate 3s linear infinite;
      z-index: 66;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100px;
        height: 3px;
        background: linear-gradient(90deg, #fff, transparent);
      }
      &:nth-child(1) {
        top: -10%;
        right: 0;
        left: initial;
        animation-delay: 0.3s;
        animation-duration: 1.6s;
      }
      &:nth-child(2) {
        top: -5%;
        right: 0;
        left: initial;
        animation-delay: 0.2s;
        animation-duration: 3s;
      }
      &:nth-child(3) {
        top: 0;
        right: 30%;
        left: initial;
        animation-delay: 0.4s;
        animation-duration: 2s;
      }
      &:nth-child(4) {
        top: -1%;
        right: 50%;
        left: initial;
        animation-delay: 0.6s;
        animation-duration: 1.5s;
      }
      &:nth-child(5) {
        top: 0;
        right: 60%;
        left: initial;
        animation-delay: 0.8s;
        animation-duration: 2.5s;
      }
      &:nth-child(6) {
        top: 0;
        right: 70%;
        left: initial;
        animation-delay: 1s;
        animation-duration: 3s;
      }
      &:nth-child(7) {
        top: -10%;
        right: 60%;
        left: initial;
        animation-delay: 1.2s;
        animation-duration: 1.75s;
      }
      &:nth-child(8) {
        top: 5%;
        right: 50%;
        left: initial;
        animation-delay: 1.4s;
        animation-duration: 1.25s;
      }
      &:nth-child(9) {
        top: 3%;
        right: 10%;
        left: initial;
        animation-delay: 0.75s;
        animation-duration: 2.25s;
      }
      &:nth-child(10) {
        top: 0;
        right: 0;
        left: initial;
        animation-delay: 2.75s;
        animation-duration: 2.25s;
      }
      @keyframes animate {
        0% {
          transform: rotate(315deg) translateX(0);
          opacity: 0;
          visibility: hidden;
        }
        30% {
          opacity: 0;
          visibility: hidden;
        }
        60% {
          opacity: 1;
          visibility: visible;
        }
        90% {
          opacity: 0;
          visibility: hidden;
        }
        100% {
          transform: rotate(315deg) translateX(-1000px);
          opacity: 0;
          visibility: hidden;
        }
      }
    }
  }
  .google_ad_h5 {
    display: none;
  }
  &__main {
    margin: 0 auto;
    width: 1400px;
    position: relative;
    .module {
      margin-top: 56px;

      .google_ad {
        width: 100%;
        color: #808080;
      }
      &.choice {
        margin-top: 16px;
        .google_ad_pc {
          max-width: 1200px;
          margin: 0 auto 24px;
          min-height: 305px;
        }
      }
      &.explore {
        .google_ad_h5_report {
          display: none;
        }
        .collection {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .google_ad {
          display: none;
        }
      }
      &.article {
        .infor_module {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .list_tabs {
          display: none;
        }

        .google_ad_article {
          width: 970px;
          height: 115px;
          margin: 56px auto 0;
        }
      }
      &.new_pop {
        margin-bottom: 56px;
      }
    }
  }
  .all_tarot {
    margin-bottom: 56px;
  }
}
@media (max-width: 1435px) {
  .home {
    &__main {
      width: 1200px;
      .module {
        &.explore {
          .collection {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 456px);
            justify-content: center;
          }
        }
        &.article {
          .infor_module {
            grid-template-columns: repeat(2, 456px);
            justify-content: center;
          }
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .home {
    &__main {
      width: 1000px;
      .module {
        &.choice {
          .google_ad {
            width: 100%;
          }
        }
      }
    }
  }
}

@media (max-width: (1024px)) {
  .home {
    &__main {
      width: 100%;
      .module {
        .google_ad {
          width: 100%;
        }
        &.explore {
          .collection {
            grid-template-columns: repeat(1, 456px);
          }
        }
        &.article {
          .infor_module {
            grid-template-columns: repeat(1, 456px);
          }
          .google_ad_article {
            width: 90%;
          }
        }
        &.choice {
          .google_ad {
            width: 100%;
            margin: 40px auto 0;
            padding: 0 50px;
            background-color: initial;
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .home {
    .tip_down {
      bottom: 10 * $pr;
      width: 36 * $pr;
      height: 24 * $pr;
      @keyframes bounce {
        0% {
          transform: translateY(0) translateX(-50%);
        }
        20% {
          transform: translateY(-5 * $pr) translateX(-50%);
        }
        40% {
          transform: translateY(-15 * $pr) translateX(-50%);
        }
        60% {
          transform: translateY(-20 * $pr) translateX(-50%);
        }
        80% {
          transform: translateY(-10 * $pr) translateX(-50%);
        }
        100% {
          transform: translateY(0) translateX(-50%);
        }
      }
    }
    .meteor {
      span {
        &:nth-child(3) {
          display: none;
        }
        &:nth-child(4) {
          top: 30 * $pr;
          right: -20 * $pr;
          left: initial;
          animation-delay: 0.6s;
          animation-duration: 1.5s;
        }
        &:nth-child(6) {
          display: none;
        }
        &:nth-child(8) {
          display: none;
        }
        &:nth-child(10) {
          display: none;
        }
        @keyframes animate {
          0% {
            transform: rotate(315deg) translateX(0);
            opacity: 0;
            visibility: hidden;
          }
          30% {
            opacity: 1;
            visibility: visible;
          }
          40% {
            opacity: 0;
            visibility: hidden;
          }
          60% {
            opacity: 0;
            visibility: hidden;
          }
          90% {
            opacity: 0;
            visibility: hidden;
          }
          100% {
            transform: rotate(315deg) translateX(-1000px);
            opacity: 0;
            visibility: hidden;
          }
        }
      }
    }
    .google_ad_h5 {
      width: 320 * $pr;
      min-height: 117 * $pr;
      margin: 0 auto 16 * $pr;
      padding: 0;
      display: flex;
      flex-direction: column;
    }
    &__main {
      padding: 0 16 * $pr;
      width: 100%;
      .module {
        margin-top: 32 * $pr;
        &.choice {
          margin-top: 0;
          > .choice {
            padding: 0;
          }
          .google_ad_pc {
            display: none;
          }
        }
        &.explore {
          margin-top: 32 * $pr;

          .google_ad_h5_report {
            display: flex;
            flex-direction: column;
            width: 336 * $pr;
            height: 297 * $pr;
            margin: 24 * $pr auto 0;
          }

          .collection {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 32 * $pr;
            display: none;
            .report {
              display: none;
            }
          }
        }
        &.article {
          .infor_module {
            display: none;
          }
          .list_tabs {
            display: block;
          }
          .google_ad_article {
            width: 336 * $pr;
            height: 297 * $pr;
            margin: 32 * $pr auto 0;
          }
        }
        &.quizzes {
          > .pop_maximum {
            padding: 0;
          }
          //   margin-top: 48 * $pr;
        }
        &.new_pop {
          margin-bottom: 32 * $pr;
        }
      }
      :deep(.pairing_max_main .pairing_module) {
        padding: 0;
      }
    }
    .all_tarot {
      margin-bottom: 0;
      padding-bottom: 32 * $pr;
    }
  }
}
</style>
