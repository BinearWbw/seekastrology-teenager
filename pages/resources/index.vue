<template>
  <div class="resources">
    <div class="resources_main">
      <google-ad classNames="google_ad_top" :id="'5954072207'" />
      <div class="resources_main_title">HOT Content</div>
      <section class="pop_article">
        <home-pop-articles></home-pop-articles>
      </section>
      <div class="resources_main_btm" ref="mainBtm">
        <div class="resources_main_btm_tabs">
          <div
            v-for="(item, index) in tabs"
            :key="'tab' + index"
            class="resources_main_btm_tabs_item"
            id="RESOURCESTABS"
            :class="index == currentTabIndex ? 'current_tabs' : ''"
            @click="changeTab(item, index)"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="resources_main_btm_line"></div>
        <transition name="fade">
          <div
            class="resources_main_btm_main"
            v-if="newsData?.list?.length > 0"
          >
            <div v-for="(item, index) in newsData?.list" :key="index">
              <a
                class="resources_main_btm_main_item"
                :href="`/resources/details/${item.name
                  .trim()
                  .replace(/[^\w\d]/g, '-')
                  .toLowerCase()}-${item.id}/`"
              >
                <!-- type0为文本 type1为视频， -->
                <template v-if="item.kind == 0">
                  <div class="resources_main_btm_main_item_img">
                    <nuxt-img
                      :src="item.icon || '/'"
                      fit="cover"
                      width="338"
                      height="200"
                      :alt="item.name"
                      class="resources_main_btm_main_item_img_pic"
                      loading="lazy"
                      format="auto"
                    ></nuxt-img>
                  </div>
                  <div class="resources_main_btm_main_item_text">
                    <div class="resources_main_btm_main_item_text_title">
                      {{ item.name }}
                    </div>
                    <div class="resources_main_btm_main_item_text_subscribe">
                      {{ item.text }}
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div
                    class="resources_main_btm_main_item_img"
                    id="RESOURCESVIDEO"
                  >
                    <nuxt-img
                      :src="item.icon || '/'"
                      fit="cover"
                      width="338"
                      height="200"
                      :alt="item.name"
                      class="resources_main_btm_main_item_img_video"
                      loading="lazy"
                      format="auto"
                    ></nuxt-img>
                    <img
                      src="../../assets/img/resources/play_icon.png"
                      alt="play icon"
                      class="resources_main_btm_main_item_img_play"
                    />
                    <div class="resources_main_btm_main_item_img_time">
                      {{ $utils.formatMMSS(item.sec) }}
                    </div>
                  </div>
                  <div class="resources_main_btm_main_item_vtitle">
                    {{ item.name }}
                  </div>
                </template>
              </a>
              <google-ad
                v-if="(index + 1) % 5 === 0"
                :id="googleAdIds[index % googleAdIds.length]"
                classNames="google_ad_loading"
              ></google-ad>
            </div>
            <google-ad
              classNames="google_ad_length"
              v-if="newsData?.list.length >= 2"
              :id="'6715555076'"
            />
          </div>
        </transition>
        <div class="resources_main_btm_loading" v-if="loading">
          <img
            src="../../assets/img/resources/loading.png"
            alt="loading"
            class="loading"
          />
        </div>
        <div class="resources_main_btm_btn" v-if="search.page < totalPage">
          <button class="resources_main_btm_btn_moreBtn" @click="getNews(item)">
            Load More
          </button>
        </div>
      </div>
    </div>
    <div class="foot_components" ref="foot_components">
      <transition name="fade">
        <home-your-choice></home-your-choice>
      </transition>
      <transition name="fade">
        <tarot-more-tarot></tarot-more-tarot>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      newsData: {},
      isFrist: true,
      tabs: [
        { name: 'All' },
        { name: 'Video', kind: 2 },
        { name: 'Artlcle', kind: 1 },
      ],
      search: {
        page: 1,
        size: 20,
      },
      item: {}, // 当前的资讯类型
      googleAdIds: [
        '5568464365',
        '4830097762',
        '7484181264',
        '9971744541',
        '4486482830',
        '3465756968',
      ],
    }
  },
  async asyncData({ error, $apiList }) {
    try {
      let currentTabIndex = 0,
        totalNum = 0,
        totalPage = 1
      let [list] = await Promise.all([
        /**顶部推荐 */
        $apiList.articles
          .getNewsRec({
            origin: process.env.origin,
          })
          .then((res) => {
            res = res?.length > 0 ? res.slice(0, 5) : null
            return res || null
          }),
      ])
      return {
        list,
        totalNum,
        totalPage,
        currentTabIndex,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.msg })
    }
  },
  mounted() {
    this.getQuestionData()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getNews(ites) {
      this.loading = true
      this.search.page += 1
      let getNewsParams = {
        origin: process.env.origin,
        kind: ites.kind || '',
        ...this.search,
      }
      if (this.currentTabIndex == 0) delete getNewsParams.cate
      this.$apiList.articles
        .getNewsList(getNewsParams)
        .then((res) => {
          res.list &&
            res.list.map((item) => {
              this.newsData.list.push(item)
            })
          this.totalNum = res.count
          this.totalPage =
            Math.ceil(this.totalNum / this.search.size) === 0
              ? 1
              : Math.ceil(this.totalNum / this.search.size)
          this.loading = false
        })
        .catch((error) => {
          this.search.page -= 1
          this.loading = false
        })
    },

    // 获取资讯数据
    getQuestionData() {
      this.loading = true
      let search = {
        page: 1,
        size: 20,
      }
      this.$apiList.articles
        .getNewsList({
          origin: process.env.origin,
          ...search,
        })
        .then((res) => {
          this.newsData = res
          this.currentTabIndex = 0
          this.totalNum = this.newsData.count
          this.totalPage =
            Math.ceil(this.totalNum / search.size) === 0
              ? 1
              : Math.ceil(this.totalNum / search.size)
          this.loading = false
        })
    },

    /** 点击切换tabs*/
    changeTab(item, index) {
      this.item = item
      this.currentTabIndex = index
      this.search.page = 0
      this.newsData.list = []
      this.getNews(item)
    },
    // 滚动懒加载请求数据
    handleScroll() {
      const screenWidth =
        window.innerWidth || document.documentElement.clientWidth
      if (screenWidth <= 750) {
        const docScroHei = document.documentElement.scrollHeight
        const inHeight = window.innerHeight
        let scrolls = docScroHei - inHeight
        if (scrolls == window.scrollY) {
          this.getNews(this.item)
          return
        }
      }
    },
  },
  computed: {
    normalList() {
      return this.list.filter((_, index) => index !== 0)
    },
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
$block: 338px;
$spacing: 16px;
.current_tabs {
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #ffffff !important;
  }
  span {
    color: #000000 !important;
  }
}
.resources {
  width: 100%;
  &_main {
    width: 1400px;
    margin: 0 auto;
    .pop_article {
      :deep(.h5_size),
      :deep(.button) {
        display: none;
      }
      :deep(.pop_maximum) {
        margin-top: 0;
      }
    }
    &_title {
      font-family: 'Cinzel Decorative';
      font-style: normal;
      font-weight: 700;
      font-size: 46px;
      line-height: 64px;
      color: #ffffff;
      text-align: center;
      padding-bottom: 8px;
    }
    &_top {
      display: flex;
      margin-top: 32px;
      height: 100%;
      &_left {
        width: 574px;
        min-height: 628px;
        display: block;
        &_img {
          width: 574px;
          height: 471px;
          position: relative;
          &_pic {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &_video {
            width: 574px;
            height: 471px;
          }
          &_play {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 82px;
            height: 82px;
          }

          &_time {
            position: absolute;
            right: 10px;
            bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 81px;
            height: 32px;
            background: rgba(0, 0, 0, 0.55);
            border-radius: 9px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: #ffffff;
          }
          &_tarot {
            display: none;
          }
        }
        &_content {
          margin: 27px 22px;
          &_title {
            display: flex;
            justify-content: space-between;

            &_text {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 22px;
              line-height: 30px;
              color: #ffffff;
              overflow: hidden;
              white-space: normal;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              display: -webkit-box;
            }
            &_date {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 22px;
              color: rgba(255, 255, 255, 0.6);
            }
          }
          &_subscribe {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            /* or 138% */
            color: rgba(255, 255, 255, 0.6);
            margin-top: 8px;
            overflow: hidden;
            white-space: normal;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            display: -webkit-box;
          }
          &_btn {
            margin-top: 16px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            border: 1px solid #45454d;
            border-radius: 42px;
            width: 113px;
            height: 32px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            color: rgba(255, 255, 255, 0.6);
          }
          &_h5date {
            display: none;
          }
        }
      }
      &_right {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(2, 397px);
        grid-gap: 16px;
        margin-left: 16px;
        &_item {
          width: 397px;
          min-height: 326px;
          display: flex;
          flex-direction: column;
          align-items: center;

          &_img {
            width: 397px;
            height: 198px;
            position: relative;

            &_video,
            &_pic {
              width: 100%;
              height: 100%;
              border-radius: 12px;
              object-fit: cover;
            }
            &_play {
              width: 82px;
              height: 82px;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
            &_time {
              align-items: center;
              background: rgba(0, 0, 0, 0.55);
              border-radius: 9px;
              bottom: 10px;
              color: #fff;
              display: flex;
              font-family: Rubik;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              height: 32px;
              justify-content: center;
              line-height: 22px;
              position: absolute;
              right: 10px;
              width: 81px;
            }
            &_tarot {
              display: none;
            }
          }
          &_content {
            margin: 16px 0 0 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &_title {
              display: flex;
              justify-content: space-between;
              &_text {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 22px;
                line-height: 30px;
                color: #ffffff;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
            }
            &_date {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 22px;
              color: rgba(255, 255, 255, 0.6);
              margin-top: 8px;
            }
            &_subscribe {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 22px;
              color: rgba(255, 255, 255, 0.6);
              margin-top: 8px;
              overflow: hidden;
              white-space: normal;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              display: -webkit-box;
            }
          }
        }
      }
    }
    .google_ad_top {
      width: 1200px;
      height: 305px;
      margin: 24px auto;
    }
    .google_ad {
      width: 1200px;
      height: 130px;
      margin: 24px auto;
    }
    .google_ad_btm {
      width: 1200px;
      height: 305px;
      margin: 24px auto;
    }
    &_btm {
      margin-top: 40px;
      scroll-margin-top: -50px;
      &_tabs {
        display: flex;
        justify-content: center;
        align-items: center;
        &_item {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          // width: 86px;
          padding: 7px 22px;
          height: 32px;
          // background: #ffffff;
          border-radius: 42px;
          margin-right: 24px;
          transition: background-color 0.3s ease-in-out;
          &:hover {
            background-color: hsla(0, 0%, 100%, 0.1);
          }
          span {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }
      &_line {
        height: 1px;
        margin: 22px 0 24px 0;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.2) 50.52%,
          rgba(255, 255, 255, 0) 100%
        );
      }
      &_btn {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 24px;
        flex-direction: column;
        &_moreBtn {
          margin: 0 auto;
          border: 1px solid #45454d;
          border-radius: 42px;
          color: hsla(0, 0%, 100%, 0.7);
          font-family: Rubik;
          font-size: 16px;
          height: 44px;
          line-height: 22px;
          transition: background-color 0.3s, color 0.3s;
          width: 220px;
          &:hover {
            background-color: #fff;
            color: #000;
          }
        }
      }

      &_main {
        display: grid;
        grid-template-columns: repeat(4, 338px);
        gap: 32px 16px;
        .google_ad_loading {
          display: none;
        }
        .google_ad_length {
          display: none;
        }
        &_item {
          &_img {
            width: 100%;
            height: 225px;
            position: relative;
            object-fit: cover;
            border-radius: 12px;
            overflow: hidden;
            &_pic {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            &_video {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            &_play {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 82px;
              height: 82px;
            }

            &_time {
              position: absolute;
              right: 10px;
              bottom: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 81px;
              height: 32px;
              background: rgba(0, 0, 0, 0.55);
              border-radius: 9px;
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 22px;
              color: #ffffff;
            }
            &_tarot {
              display: none;
            }
          }
          &_vtitle {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 22px;
            line-height: 30px;
            text-align: center;
            color: #ffffff;
            margin-top: 16px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          &_text {
            &_title {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 22px;
              line-height: 30px;
              color: #ffffff;
              margin-top: 16px;
              width: 100%;
              // overflow: hidden;
              // white-space: nowrap;
              // text-overflow: ellipsis;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              // min-height: 60px;
            }
            &_date {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 22px;
              color: rgba(255, 255, 255, 0.6);
              margin-top: 8px;
              text-align: center;
            }
            &_subscribe {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 22px;
              color: rgba(255, 255, 255, 0.6);
              margin-top: 8px;
              overflow: hidden;
              white-space: normal;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              display: -webkit-box;
            }
          }
        }
      }
      &_loading {
        display: flex;
        justify-content: center;
        .loading {
          width: 32px;
          height: 32px;
          margin: 32px auto 0;
          animation: spin 1s infinite linear reverse;
        }
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
    &_various {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .foot_components {
    margin-top: 56px;
    .choice {
      margin-bottom: 56px;
    }
  }
}
@media (max-width: (4 * $block + 3 * $spacing + 350px)) {
  .resources {
    &_main {
      width: 100%;
      &_title {
        text-align: center;
      }
      &_top {
        flex-direction: column;
        align-items: center;
        &_right {
          margin-left: 0;
        }
      }
      &_btm {
        &_main {
          grid-template-columns: repeat(3, 338px);
          justify-content: center;
        }
      }
    }
  }
}
@media (max-width: (3 * $block + 2 * $spacing+ 150px)) {
  .resources {
    &_main {
      width: 100%;
      &_title {
        text-align: center;
      }
      &_top {
        flex-direction: column;
        align-items: center;
      }
      &_btm {
        &_main {
          grid-template-columns: repeat(2, 338px);
          justify-content: center;
        }
      }
      .google_ad_top,
      .google_ad,
      .google_ad_btm {
        width: 900px;
      }
    }
  }
}
@media (max-width: (2 * $block + 1 * $spacing + 100px)) {
  .resources {
    &_main {
      &_btm {
        &_main {
          grid-template-columns: repeat(2, 338px);
        }
      }
      .google_ad_top,
      .google_ad,
      .google_ad_btm {
        width: 700px;
      }
    }
  }
}
@media (max-width: (900px)) {
  .resources {
    &_main {
      &_top {
        &_right {
          grid-template-columns: repeat(2, 300px);
        }
      }
      &_btm {
        &_tabs {
          width: 700px;
          margin: 0 auto;
          overflow-x: scroll;
          justify-content: start;
          &_item {
            flex-shrink: 0;
          }
        }
        &_main {
          grid-template-columns: repeat(2, 300px);
        }
      }
      .google_ad_top,
      .google_ad,
      .google_ad {
        width: 700px;
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .resources {
    .pop_article {
      display: none;
    }
    &_main {
      width: 100%;
      &_title {
        display: none;
        margin-top: 16 * $pr;
        font-size: 22 * $pr;
        line-height: 30 * $pr;
        text-align: center;
        padding-bottom: 8 * $pr;
      }
      &_top {
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 12 * $pr;
        &_left {
          width: 343 * $pr;
          min-height: 234 * $pr;

          &_img {
            width: 343 * $pr;
            height: 193 * $pr;
            object-fit: cover;
            &_video,
            &_pic {
              width: 343 * $pr;
              height: 193 * $pr;
            }
            &_play {
              width: 38 * $pr;
              height: 38 * $pr;
            }
            &_time {
              top: 6 * $pr;
              width: 47 * $pr;
              height: 18 * $pr;
              border-radius: 6 * $pr;
              font-size: 12 * $pr;
              line-height: 16 * $pr;
            }
            &_tarot {
              display: block;
              position: absolute;
              width: 59 * $pr;
              height: 22 * $pr;
              background: #000000;
              border-radius: 6 * $pr;
              font-family: 'Rufina';
              font-style: normal;
              font-weight: 700;
              font-size: 12 * $pr;
              line-height: 16 * $pr;
              display: flex;
              align-items: center;
              text-align: center;
              justify-content: center;
              color: #ffffff;
              left: 50%;
              transform: translate(-50%, 0);
              bottom: -11 * $pr;
            }
          }
          &_content {
            margin: 10 * $pr 5 * $pr 12 * $pr;
            &_title {
              justify-content: center;
              align-items: center;
              &_text {
                font-size: 14 * $pr;
                line-height: 18 * $pr;
                color: rgba(255, 255, 255, 0.6);
                overflow: hidden;
                white-space: normal;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                display: -webkit-box;
              }
              &_date {
                display: none;
              }
            }
            &_subscribe,
            &_btn {
              display: none;
            }
            &_h5date {
              display: block;
              font-family: 'Rubik';
              font-style: normal;
              font-size: 12 * $pr;
              line-height: 16 * $pr;
              color: rgba(255, 255, 255, 0.6);
              text-align: center;
            }
          }
        }
        &_right {
          grid-template-columns: repeat(2, 169 * $pr);
          grid-gap: 0 5 * $pr;
          margin-left: 0;
          justify-content: center;
          &_item {
            width: 169 * $pr;
            min-height: 150 * $pr;
            &_img {
              width: 169 * $pr;
              height: 95 * $pr;
              &_video,
              &_pic {
                width: 169 * $pr;
                height: 95 * $pr;
              }
              &_play {
                width: 38 * $pr;
                height: 38 * $pr;
              }
              &_time {
                top: 6 * $pr;
                width: 47 * $pr;
                height: 18 * $pr;
                border-radius: 6 * $pr;
                font-size: 12 * $pr;
                line-height: 16 * $pr;
              }
              &_tarot {
                display: block;
                position: absolute;
                width: 59 * $pr;
                height: 22 * $pr;
                background: #000000;
                border-radius: 6 * $pr;
                font-family: 'Rufina';
                font-style: normal;
                font-weight: 700;
                font-size: 12 * $pr;
                line-height: 16 * $pr;
                display: flex;
                align-items: center;
                text-align: center;
                justify-content: center;
                color: #ffffff;
                left: 50%;
                transform: translate(-50%, 0);
                bottom: -11 * $pr;
              }
            }
            &_content {
              margin: 12 * $pr 5 * $pr;
              &_title {
                &_text {
                  font-size: 14 * $pr;
                  line-height: 18 * $pr;
                  text-align: center;
                  color: rgba(255, 255, 255, 0.6);
                  text-align: left;
                  word-break: break-all;
                  // margin-top: 12 * $pr;
                }
              }
              &_subscribe {
                display: none;
              }
            }
          }
        }
      }
      .google_ad {
        width: 336 * $pr;
        height: 297 * $pr;
        margin: 16 * $pr auto;
      }
      .google_ad_top {
        width: 320 * $pr;
        height: 117 * $pr;
        margin: 0 auto;
        display: none;
      }
      .google_ad_btm {
        width: 336 * $pr;
        height: 297 * $pr;
        margin: 16 * $pr auto;
      }

      &_btm {
        width: 100%;
        margin: 16 * $pr 0 32 * $pr;
        scroll-margin-top: 60 * $pr;
        &_tabs {
          width: 91%;
          margin: 0 auto;
          // margin: 0 16 * $pr auto;
          justify-content: start;
          overflow-x: scroll;
          &_item {
            // width: 86 * $pr;
            padding: 7 * $pr 22 * $pr;
            height: 32 * $pr;
            flex-shrink: 0;
            margin-right: 9 * $pr;
            span {
              font-size: 14 * $pr;
            }
          }
        }
        &_btn {
          display: none;
          margin-top: 24 * $pr;
          &_moreBtn {
            width: 295 * $pr;
            height: 44 * $pr;
            font-size: 16 * $pr;
            line-height: 22 * $pr;
            border-radius: 42 * $pr;
            background-color: #fff;
            color: #000;
          }
        }
        &_loading {
          .loading {
            width: 32 * $pr;
            height: 32 * $pr;
            margin-top: 24 * $pr;
          }
        }
        &_main {
          grid-template-columns: 1fr;
          gap: 16 * $pr;
          width: 100%;
          margin: 0 16 * $pr auto;
          margin-left: 0;
          .google_ad_loading {
            display: flex;
            flex-direction: column;
            width: 336 * $pr;
            height: 297 * $pr;
            margin: 16 * $pr auto 0;
          }
          .google_ad_length {
            grid-row-end: 3;
            display: flex;
            flex-direction: column;
            width: 336 * $pr;
            height: 297 * $pr;
            margin: 16 * $pr auto 0;
          }
          &_item {
            width: 100%;
            &_img {
              width: 100%;
              height: 211 * $pr;
              &_video,
              &_pic {
                width: 100%;
                height: 211 * $pr;
              }
              &_play {
                width: 38 * $pr;
                height: 38 * $pr;
              }
              &_tarot {
                display: block;
                position: absolute;
                width: 59 * $pr;
                height: 22 * $pr;
                background: #000000;
                border-radius: 6 * $pr;
                font-family: 'Rufina';
                font-style: normal;
                font-weight: 700;
                font-size: 12 * $pr;
                line-height: 16 * $pr;
                display: flex;
                align-items: center;
                text-align: center;
                justify-content: center;
                color: #ffffff;
                left: 50%;
                transform: translate(-50%, 0);
                bottom: -11 * $pr;
              }
              &_time {
                width: 47 * $pr;
                height: 18 * $pr;
                font-size: 12 * $pr;
                top: 6 * $pr;
                right: 5 * $pr;
                color: rgba(255, 255, 255, 0.6);
              }
            }
            &_vtitle {
              font-size: 14 * $pr;
              line-height: 18 * $pr;
              color: rgba(255, 255, 255, 0.6);
              margin-top: 12 * $pr;
            }
            &_text {
              padding: 12 * $pr 5 * $pr;
              word-break: break-all;
              &_title,
              &_date {
                font-size: 14 * $pr;
                line-height: 18 * $pr;
                color: rgba(255, 255, 255, 0.6);
                width: 100%;
                margin-top: 0;
                word-break: break-all;
              }
              &_title {
                white-space: normal;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                display: -webkit-box;
                // margin-top: 12 * $pr;
              }
              &_subscribe {
                display: none;
              }
            }
          }
        }
      }
    }
    .foot_components {
      display: none;
      margin-top: 32 * $pr;
      .choice {
        margin-bottom: 32 * $pr;
      }
    }
  }
}
</style>
