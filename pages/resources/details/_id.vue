<template>
  <div class="details">
    <google-ad classNames="google_top" :id="'4405062797'" />
    <div class="details_main">
      <div class="details_main_left">
        <div class="details_main_left_top">
          <div class="details_main_left_top_menu">
            <a href="javascript:history.back(-1)">Article</a> <span>></span>
            <a href="" style="color: #ffffff">Article Details</a>
          </div>
          <!-- 0-文章、1-视频）-->
          <div class="details_main_left_top_content" v-if="dataInfo.kind == 0">
            <div class="details_main_left_top_content_title">
              {{ dataInfo.name }}
            </div>
            <div class="details_main_left_top_content_subtitle">
              <div class="details_main_left_top_content_subtitle_btn">
                {{ dataInfo.main_type }}
              </div>
              <div class="details_main_left_top_content_subtitle_time">
                {{ $utils.formatYYYYMMDDHHMM(dataInfo.created_at) }}
              </div>
            </div>
            <div class="details_main_left_top_content_img">
              <nuxt-img
                :src="dataInfo.icon || '/'"
                fit="cover"
                :alt="dataInfo.name"
                class="details_main_left_top_content_img_pic"
              ></nuxt-img>
            </div>

            <div
              class="details_main_left_top_content_text"
              ref="dataDesc"
              v-html="dataInfo.desc"
            ></div>
          </div>
          <div class="details_main_left_top_content" v-else>
            <div class="details_main_left_top_content_title">
              {{ dataInfo.name }}
            </div>
            <div class="details_main_left_top_content_subtitle">
              <div class="details_main_left_top_content_subtitle_btn">
                Tarot
              </div>
              <div class="details_main_left_top_content_subtitle_time">
                {{ $utils.formatYYYYMMDDHHMM(dataInfo.created_at) }}
              </div>
            </div>
            <div class="details_main_left_top_content_video">
              <!-- <nuxt-img
                :src="dataInfo.icon"
                fit="cover"
                :alt="dataInfo.name"
                class="details_main_left_top_content_img_video"
                v-if="!playState"
              ></nuxt-img> -->
              <iframe
                id="video-element"
                frameborder="0"
                allow="accelerometer"
                autoplay="true"
                allowfullscreen="allowfullscreen"
                seamless="seamless"
                scrolling="no"
                loading="lazy"
                type="text/html"
                :src="dataInfo.desc"
                :title="dataInfo.name"
              ></iframe>
              <!-- <img
                src="../../../assets/img/resources/play_icon.png"
                alt=""
                class="details_main_left_top_content_img_play"
                @click="playState = true"
                v-if="!playState"
              /> -->
            </div>
          </div>
        </div>
        <google-auto-ad classNames="leftAd" :id="'9575035598'" />
      </div>
      <div class="details_main_right">
        <google-ad classNames="rightAd" :id="'8812069528'"></google-ad>
        <!-- 右侧列表 -->
        <!-- <div class="details_main_right_list">
          <a
            :href="`${getIntersperseUrl}/resources/details/${item.name
              .trim()
              .replace(/[^\w\d]/g, '-')
              .toLowerCase()}-${item.id}/`"
            class="details_main_right_list_item"
            v-for="(item, index) in immedList"
            :key="index"
          >
            <span>{{ item.name }}</span>
            <img src="../../../assets/img/resources/d_02.png" alt="" />
          </a>
        </div> -->
      </div>
    </div>
    <div class="details_footer">
      <div class="details_footer_title">Trending Articles</div>
      <div class="details_footer_list">
        <a
          :href="`${getIntersperseUrl}/resources/details/${item.name
            .trim()
            .replace(/[^\w\d]/g, '-')
            .toLowerCase()}-${item.id}/`"
          class="details_footer_list_item"
          v-for="(item, index) in footList"
          :key="index"
        >
          <!-- (0-文章、1-视频） -->
          <template v-if="item.kind == 0">
            <div class="details_footer_list_item_img">
              <nuxt-img
                :src="item.icon || '/'"
                fit="cover"
                :alt="item.name"
                class="details_footer_list_item_img_pic"
              ></nuxt-img>
              <div class="details_footer_list_item_img_tarot">TAROT</div>
            </div>
            <div class="details_footer_list_item_text">
              <div class="details_footer_list_item_text_title">
                {{ item.name }}
              </div>
              <!-- <div class="details_footer_list_item_text_subscribe">
                {{ item.text }}
              </div> -->
              <!-- <div class="details_footer_list_item_text_date">
                {{ $utils.formatMMDD(item.created_at) }}
              </div> -->
            </div>
          </template>
          <template v-else>
            <div class="details_footer_list_item_img">
              <nuxt-img
                :src="item.icon || '/'"
                fit="cover"
                :alt="item.name"
                class="details_footer_list_item_img_video"
              ></nuxt-img>
              <img
                src="../../../assets/img/resources/play_icon.png"
                alt=""
                class="details_footer_list_item_img_play"
              />
              <!-- <div class="details_footer_list_item_img_time">
                {{ $utils.formatMMSS(item.sec) }}
              </div> -->
              <div class="details_footer_list_item_img_tarot">TAROT</div>
            </div>
            <div class="details_footer_list_item_vtitle">
              {{ item.name }}
            </div>
          </template>
        </a>
      </div>
    </div>
    <google-auto-ad classNames="google_ad_footer" :id="'4872824519'" />
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
import { mapGetters } from 'vuex'
import Vue from 'vue'
export default {
  data() {
    return {
      playState: false,
      idAdArray: [
        '9753329066',
        '4309430695',
        '7374577739',
        '4748414395',
        '2122251057',
        '2621794561',
        '7107834487',
        '8474539438',
        '3030641061',
        '3864909266',
      ],
    }
  },
  mounted() {
    const dataDesc = this.$refs.dataDesc
    const h3Element = dataDesc.querySelectorAll('h2')

    h3Element.forEach((item, index) => {
      // 顺序选择一个 id
      const randomIdt = index % this.idAdArray.length //保证 index 的值都在 idAdArray.length 内
      const randomId = this.idAdArray[randomIdt]

      const adContainer = document.createElement('div')
      adContainer.className = 'leftAdText'

      // 创建动态组件实例
      const adComponent = new Vue({
        render: (h) =>
          h('google-observer-auto-ad', {
            props: {
              classNames: 'leftAdText',
              id: randomId,
            },
          }),
      })

      // 挂载动态组件
      adComponent.$mount()

      // 将动态组件的根 DOM 元素添加到容器
      adContainer.appendChild(adComponent.$el)

      // 在 h3 元素之前插入广告容器
      item.parentNode.insertBefore(adContainer, item)
    })
  },
  async asyncData({ error, $apiList, params }) {
    try {
      let totalNum = 0,
        totalPage = 1,
        search = {
          page: 1,
          size: 10,
        }
      let [dataInfo, footList] = await Promise.all([
        /**详情 */
        $apiList.articles
          .getNewsDetail({
            origin: process.env.origin,
            id: params.id.replace(
              /^.*?(\d*)$/,
              (str, match, index) => match || '0'
            ),
          })
          .then((res) => {
            return res.detail || null
          }),
        /**底部推荐 */
        $apiList.articles
          .getNewsRec({
            origin: process.env.origin,
          })
          .then((res) => {
            return res || null
          }),
      ])
      // let immedList = await $apiList.articles
      //   .getNews({
      //     origin: process.env.origin,
      //     cate: dataInfo.main_type_id,
      //   })
      //   .then((res) => {
      //     return res?.list || null
      //   })
      return {
        footList,
        // immedList,
        dataInfo,
        totalNum,
        totalPage,
        search,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.msg })
    }
  },
  methods: {
    /**获取对应详情数据 */
    getDetailsInfo(id) {
      this.playState = false
      this.getDataInfo(id)
      let top = document.documentElement.scrollTop || document.body.scrollTop
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    },
    /**
     * 获取右侧列表
     */
    getNews() {
      this.$apiList.articles
        .getNews({
          origin: process.env.origin,
          cate: this.dataInfo.main_type_id,
        })
        .then((res) => {
          this.immedList = res.list
        })
    },
    /**通过id获取数据详情 */
    getDataInfo(id = null) {
      this.$apiList.articles
        .getNewsDetail({
          origin: process.env.origin,
          id: id == null ? this.$route.query.id : id,
        })
        .then((res) => {
          this.dataInfo = res
          //获取对应右侧列表
          // this.getNews()
        })
    },
  },
  computed: {
    ...mapGetters(['getIntersperseUrl']),
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
$block: 456px;
$spacing: 16px;
.details {
  width: 100%;
  .google_top {
    display: none;
  }
  .google_ad_footer {
    display: none;
    // overflow: hidden;
  }
  &_main {
    width: 1400px;
    margin: 0 auto;
    display: flex;
    margin-top: 48px;
    &_left {
      width: 1046px;

      &_top {
        border-radius: 30px;
        background: #1b102f;
        padding: 24px 118px 96px;
        &_menu {
          // margin-left: 118px;
          padding-top: 24px;
          a,
          span {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: rgba(255, 255, 255, 0.6);
          }
          span {
            margin: 0 5px;
          }
        }
        &_content {
          margin-top: 48px;
          &_title {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 500;
            font-size: 36px;
            line-height: 48px;
            color: #ffffff;
          }
          &_subtitle {
            display: flex;
            margin-top: 8px;
            align-items: center;
            &_btn {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 78px;
              height: 24px;
              background: #ffffff;
              border-radius: 42px;
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 18px;
              color: #000000;
            }
            &_time {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 18px;
              color: rgba(255, 255, 255, 0.6);
              margin-left: 18px;
            }
          }
          &_video {
            width: 100%;
            height: 456px;
            margin-top: 48px;
            position: relative;
            #video-element {
              width: 100%;
              height: 100%;
            }
          }
          &_img {
            margin-top: 48px;
            width: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            height: 324px;
            &_video,
            &_pic {
              width: 100%;
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
          }
          &_text {
            margin-top: 48px;
            :deep(*) {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 28px;
              color: rgba(255, 255, 255, 0.6);
              margin-bottom: 20px;
              // word-break: break-all;
              background: transparent !important;
              // width: 100%;
              height: 100%;
              object-fit: contain;
            }
            :deep(img) {
              max-width: 100%;
              height: auto;
              margin-bottom: 0;
            }
            :deep(figure) {
              display: flex;
              justify-content: center;
            }
            :deep(.leftAdText) {
              .leftAdText {
                height: 130px;
                margin-bottom: 50px;
                .title {
                  height: 25px;
                  margin: 0;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .leftAd {
        width: 100%;
        margin: 0 auto;
        margin-top: 47px;
      }
    }
    &_right {
      width: 338px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .rightAd {
        width: 300px;
        height: 600px;
      }
      &_list {
        margin-top: 48px;
        width: 100%;
        background: rgba(1, 1, 2, 0.9);
        border-radius: 30px;
        margin-left: 16px;

        &_item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 60px;
          margin-left: 32px;
          cursor: pointer;
          span {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: rgba(255, 255, 255, 0.6);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          img {
            width: 10px;
            height: 10px;
            margin-right: 16px;
          }
        }
      }
    }
  }
  &_footer {
    width: 1400px;
    margin: 0 auto;
    margin-top: 48px;
    &_title {
      font-family: 'Cinzel Decorative';
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 48px;
      color: #ffffff;
      margin-bottom: 24px;
      text-align: center;
    }
    &_list {
      display: grid;
      grid-template-columns: repeat(4, 338px);
      grid-gap: 16px;
      margin-bottom: 130px;
      &_item {
        display: block;
        &_img {
          width: 100%px;
          height: 225px;
          position: relative;
          object-fit: cover;
          &_pic {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &_video {
            width: 100%;
            height: 100%;
          }
          &_play {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 52px;
            height: 52px;
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
            text-align: center;
            color: #fff;
            margin-top: 12px;
            font-size: 16px;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
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
            text-align: center;
            overflow: hidden;
            white-space: normal;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            display: -webkit-box;
          }
        }
      }
    }
  }
  .foot_components {
    padding: 0 0 48px;
    .choice {
      margin-bottom: 48px;
    }
  }
}
//1400
@media (max-width: (3 * $block + 2 * $spacing + 90px)) {
  .details {
    &_main {
      justify-content: center;
      width: 100%;
      &_left {
        width: 65%;
        margin-left: 30px;
        &_ad {
          width: 100%;
        }
        &_top {
          padding: 24px 60px 96px;
          &_content {
            object-fit: contain;
            &_img {
              width: 100%;
            }
          }
        }
        .leftAd {
          width: 100%;
        }
      }
      &_right {
        width: 25%;
        padding: 0 20px;
        .rightAd {
          width: 100%;
          margin-left: 20px;
          margin-top: 48px;
        }
      }
    }
    &_footer {
      width: 100%;
      &_title {
        text-align: center;
      }
      &_list {
        grid-template-columns: repeat(2, 456px);
        justify-content: center;
      }
    }
  }
}
@media (max-width: (2 * $block + 1 * $spacing + 90px)) {
  .details {
    &_main {
      &_left {
        &_top {
          padding: 0 30px 25px;
        }
      }
      &_right {
        &_ad {
          margin-left: 20px;
          margin-top: 48px;
        }
      }
    }
    &_footer {
      &_list {
        grid-template-columns: repeat(1, 456px);
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .details {
    .google_top {
      display: block;
      width: 343 * $pr;
      height: 83 * $pr;
      margin: 0 auto;
    }
    &_main {
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 32 * $pr;
      &_left {
        width: 343 * $pr;
        margin-left: 0;
        &_top {
          padding: 24 * $pr 16 * $pr;
          &_menu {
            display: none;
            margin-left: 0;
            margin-top: 0;
            font-size: 12 * $pr;
            padding-top: 24 * $pr;
            a,
            span {
              font-size: 12 * $pr;
              line-height: 16 * $pr;
            }
            span {
              margin: 0 5 * $pr;
            }
          }
          &_content {
            padding: 0;
            margin: 0;
            // margin-top: 32 * $pr;
            &_title {
              font-size: 22 * $pr;
              line-height: 30 * $pr;
              word-break: break-all;
            }
            &_subtitle {
              margin-top: 16 * $pr;
              &_btn {
                width: 78 * $pr;
                height: 24 * $pr;
                border-radius: 42 * $pr;
                font-size: 14 * $pr;
                line-height: 18 * $pr;
              }
              &_time {
                font-size: 14 * $pr;
                line-height: 18 * $pr;
              }
            }
            &_video {
              margin-top: 32 * $pr;
              height: 200 * $pr;
            }
            &_img {
              margin-top: 32 * $pr;
              height: 155 * $pr;
            }
            &_text {
              margin-top: 32 * $pr;
              :deep(*) {
                font-size: 14 * $pr;
                line-height: 24 * $pr;
                margin-bottom: 20 * $pr;
              }
              :deep(.leftAdText) {
                .leftAdText {
                  height: 100 * $pr;
                  margin-bottom: 48 * $pr;
                  .title {
                    height: 17 * $pr;
                  }
                }
              }
            }
          }
        }

        .leftAd {
          width: 343 * $pr;
          margin-top: 47 * $pr;
        }
      }
      &_right {
        width: 100%;
        margin-left: 0;
        &_ad {
          display: none;
        }
        &_list {
          width: 343 * $pr;
          border-radius: 30 * $pr;
          margin-top: 48 * $pr;
          margin-left: 0;
          padding: 0 21 * $pr 0 32 * $pr;
          &_item {
            height: 54 * $pr;
            margin-left: 0;
            span {
              font-size: 16 * $pr;
              line-height: 22 * $pr;
            }
            img {
              width: 10 * $pr;
              height: 10 * $pr;
            }
          }
        }
        .rightAd {
          display: none;
        }
      }
    }
    &_footer {
      width: 100%;
      padding: 0 16 * $pr;
      &_title {
        text-align: center;
        font-size: 26 * $pr;
        line-height: 36 * $pr;
      }
      &_list {
        grid-gap: 24 * $pr 0;
        grid-template-columns: repeat(1, 343 * $pr);
        margin-bottom: 48 * $pr;
        &_item {
          width: 343 * $pr;
          object-fit: contain;
          &_img {
            width: 100%;
            height: 179 * $pr;
            &_pic,
            &_video {
              width: 100%;
            }
            &_play {
              width: 50 * $pr;
              height: 50 * $pr;
            }
            &_time {
              width: 40 * $pr;
              height: 20 * $pr;
              font-size: 12 * $pr;
              right: 10 * $pr;
            }
          }
          &_vtitle {
            background: rgba(255, 255, 255, 0.1);
            margin-top: 0;
            width: 343 * $pr;
            font-size: 22 * $pr;
            line-height: 30 * $pr;
          }
          &_text {
            background: rgba(255, 255, 255, 0.1);
            &_title {
              font-size: 22 * $pr;
              line-height: 30 * $pr;
              width: 343 * $pr;
              margin-top: 0;
              padding-top: 16 * $pr;
            }
            &_subscribe,
            &_date {
              font-size: 16 * $pr;
              line-height: 22 * $pr;
            }
          }
        }
      }
    }
    .google_ad_footer {
      margin: 0 auto;
      display: block;
      width: 343 * $pr;
      height: 299 * $pr;
      // overflow: hidden;
    }
    .foot_components {
      padding: 0 0 48 * $pr;
      .choice {
        margin-bottom: 48 * $pr;
      }
    }
  }
}
</style>
