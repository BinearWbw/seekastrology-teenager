<template>
  <div class="pop_maximum">
    <div class="pop_main" :class="{ pop_main_activity: getCurrentCtivity }">
      <h3 :class="{ h5_size: getCurrentCtivity }">Popular Articles</h3>
      <div class="pop_news">
        <div class="news_left">
          <a
            :href="`/resources/details/${getHomeNewsData[0]?.name
              .trim()
              .replace(/[^\w\d]/g, '-')
              .toLowerCase()}-${getHomeNewsData[0]?.id}/${getCurrentRoute}`"
          >
            <div class="left_img">
              <nuxt-img
                :src="getHomeNewsData[0]?.icon || '/'"
                fit="cover"
                width="691"
                height="320"
                loading="lazy"
                format="auto"
                :alt="getHomeNewsData[0]?.name"
              ></nuxt-img>
              <span class="main_type">{{
                getMainType(getHomeNewsData[0]?.main_type)
              }}</span>
            </div>
            <div class="news_left_text">
              <div class="text_cont">
                <p class="cont_title">{{ getHomeNewsData[0]?.name }}</p>
                <p class="cont_more" v-html="getHomeNewsData[0]?.text"></p>
              </div>
              <div class="text_time">
                {{ $utils.formatMMDD(getHomeNewsData[0]?.created_at) }}
              </div>
            </div>
          </a>
        </div>
        <ul class="news_right">
          <li v-for="(item, index) in normalList" :key="index">
            <a
              class="resources_main_top_left"
              :href="`/resources/details/${item.name
                .trim()
                .replace(/[^\w\d]/g, '-')
                .toLowerCase()}-${item.id}/${getCurrentRoute}`"
            >
              <div class="news_right_img">
                <nuxt-img
                  :src="item.icon || '/'"
                  fit="cover"
                  width="408"
                  height="230"
                  loading="lazy"
                  format="auto"
                  :alt="item.name"
                ></nuxt-img>
                <span class="main_type">{{ getMainType(item.main_type) }}</span>
              </div>
              <div class="news_right_text">
                <p>{{ item.name }}</p>
                <p v-if="item.kind == 0" v-html="item.text"></p>
              </div>
              <div class="news_right_time">
                {{ $utils.formatMMDD(item.created_at) }}
              </div>
            </a>
          </li>
        </ul>
      </div>
      <button class="button" @click="pathToPage">Read More</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopArticles',
  props: ['homeNews'],
  data() {
    return {
      getHomeNewsData: [],
    }
  },
  async fetch() {
    let [getHomeNewsData] = await Promise.all([
      this.$apiList.articles
        .getNewsRec({
          origin: process.env.origin,
        })
        .then((res) => {
          return res.slice(0, 5) || []
        }),
    ])
    this.getHomeNewsData = getHomeNewsData
  },
  computed: {
    normalList() {
      return this.getHomeNewsData?.filter((_, index) => index !== 0)
    },
    getCurrentRoute() {
      return this.$route.path === '/' ? '?from=home' : ''
    },
    getCurrentCtivity() {
      //   return this.$route.path === '/' ? false : true
      return true
    },
  },
  methods: {
    pathToPage() {
      window.changePageUrl =
        window.location.pathname === '/'
          ? '/resources/?from=home'
          : '/resources/'
      window.location =
        window.location.pathname === '/'
          ? '/resources/?from=home'
          : '/resources/'
    },
    getMainType(type) {
      switch (type) {
        case '3':
          return 'TAROT'
        case '4':
          return 'ASTROLOGY'
        case '5':
          return 'LOVE'
        default:
          return ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.pop_maximum {
  width: 1400px;
  margin: 96px auto 0;
  z-index: 1;
  .pop_main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    h3 {
      font-family: 'Cinzel Decorative';
      font-weight: 700;
      font-size: 36px;
      line-height: 48px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
    }
    .pop_news {
      flex: 1;
      width: 100%;
      padding: 16px 0 24px;
      display: flex;
      .news_left {
        width: 691px;
        height: 100%;
        margin-right: 32px;
        cursor: pointer;
        transition: background-color 0.3s;
        border-radius: 12px;
        .left_img {
          width: 100%;
          min-height: 320px;
          margin-bottom: 16px;
          .main_type {
            display: none;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 12px;
          }
        }
        &_text {
          display: flex;
          align-items: center;
          .text_cont {
            flex: 1;
            font-family: 'Rubik';
            padding-right: 50px;
            .cont_title {
              font-size: 22px;
              line-height: 30px;
              color: #ffffff;
            }
            .cont_more {
              font-size: 14px;
              line-height: 18px;
              color: rgba(255, 255, 255, 0.6);
              margin: 8px 0;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            a {
              font-family: 'Rubik';
              font-size: 14px;
              line-height: 18px;
              color: #9747ff;
            }
          }
          .text_time {
            width: 65px;
            font-family: 'Rubik';
            font-size: 22px;
            line-height: 30px;
            color: #ffffff;
          }
        }
        &:hover {
          background-color: rgba(255, 255, 255, 0.08);
        }
      }
      .news_right {
        flex: 1;
        width: 100%;
        & > :last-child {
          margin-bottom: 0;
        }
        li {
          width: 100%;
          margin-bottom: 16px;
          transition: background-color 0.3s;
          border-radius: 8px;
          a {
            width: 100%;
            height: 96px;
            display: flex;
            justify-content: space-between;
            .news_right_img {
              width: 118px;
              height: 100%;
              margin-right: 16px;
              box-sizing: border-box;
              .main_type {
                display: none;
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 8px;
              }
            }

            .news_right_text {
              width: 424px;
              font-family: 'Rubik';
              padding: 8px 0 0;
              & > :nth-child(1) {
                font-size: 22px;
                line-height: 30px;
                color: #ffffff;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
              & > :nth-child(2) {
                font-size: 16px;
                line-height: 22px;
                margin-top: 8px;
                color: rgba(255, 255, 255, 0.6);
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }

            .news_right_time {
              margin-left: auto;
              font-family: 'Rubik';
              font-size: 16px;
              line-height: 22px;
              color: #ffffff;
              padding: 6px 10px 0 0;
            }
          }
          &:hover {
            background-color: rgba(255, 255, 255, 0.08);
          }
        }
      }
    }
    .button {
      width: 220px;
      height: 44px;
      border: 1px solid #45454d;
      border-radius: 42px;
      font-family: 'Rubik';
      color: rgba(255, 255, 255, 0.6);
      font-size: 16px;
      line-height: 22px;
      color: #000;
      background-color: #fff;
      -webkit-transition: background-color 0.3s, -webkit-color 0.3s;
      transition: background-color 0.3s, color 0.3s;
    }
  }
}

@media (max-width: 1435px) {
  .pop_maximum {
    width: 1200px;
  }
}

@media (max-width: 1250px) {
  .pop_maximum {
    width: 100%;
    padding: 0 30px;
    .pop_main {
      .pop_news {
        padding: 16px 30px 26px;
        .news_left {
          flex: 1;
          width: auto;
          margin-right: 16px;
          .left_img {
            min-height: auto;
          }
        }
        .news_right {
          li {
            a {
              height: auto;

              .news_right_text {
                width: auto;
                flex: 1;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .pop_maximum {
    width: 1000px;
  }
}

@media (max-width: (1024px)) {
  .pop_maximum {
    width: 100%;
    margin: 80px auto 0;
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .pop_maximum {
    margin: 48 * $pr auto 0;
    padding: 0 16 * $pr;
    .pop_main {
      position: relative;
      h3 {
        font-size: 26 * $pr;
        line-height: 36 * $pr;
      }
      .h5_size {
        font-size: 26 * $pr;
        line-height: 36 * $pr;
      }
      .pop_news {
        flex: 1;
        width: 100%;
        padding: 16 * $pr 0 0;
        display: block;
        .news_left {
          width: 100%;
          height: 100%;
          margin-right: 0;
          .left_img {
            width: 100%;
            min-height: 159 * $pr;
            margin-bottom: 16 * $pr;
            .main_type {
              display: none;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
          &_text {
            position: relative;
            .text_cont {
              flex: 1;
              padding-right: 0;
              .cont_title {
                font-size: 22 * $pr;
                line-height: 30 * $pr;
                color: #ffffff;
              }
              .cont_more {
                font-size: 14 * $pr;
                line-height: 18 * $pr;
                margin: 8 * $pr 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
              }
              a {
                font-size: 14 * $pr;
                line-height: 18 * $pr;
              }
            }
            .text_time {
              display: none;
              position: absolute;
              top: 10 * $pr;
              right: 0;
              width: 40 * $pr;
              font-size: 14 * $pr;
              line-height: 18 * $pr;
              color: rgba(255, 255, 255, 0.6);
            }
          }
        }
        .news_right {
          flex: 1;
          width: 100%;
          margin: 32 * $pr 0;
          & > :last-child {
            margin-bottom: 0;
          }
          li {
            width: 100%;
            margin-bottom: 24 * $pr;
            transition: background-color 0.3s;
            a {
              width: 100%;
              height: 62 * $pr;
              display: flex;
              justify-content: space-between;
              .news_right_img {
                width: 107 * $pr;
                height: 62 * $pr;
                margin-right: 11 * $pr;
                box-sizing: border-box;
                .main_type {
                  display: none;
                }
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }

              .news_right_text {
                width: auto;
                flex: 1;
                margin: 0;
                padding: 0;
                & > :nth-child(1) {
                  font-size: 14 * $pr;
                  line-height: 18 * $pr;
                  //   padding-right: 30 * $pr;
                }
                & > :nth-child(2) {
                  font-size: 12 * $pr;
                  line-height: 16 * $pr;
                  margin-top: 8 * $pr;
                }
              }

              .news_right_time {
                display: none;
                position: absolute;
                margin-left: 0;
                right: 0;
                font-family: 'Rubik';
                font-size: 12 * $pr;
                line-height: 16 * $pr;
                color: rgba(255, 255, 255, 0.6);
                padding: 0;
              }
            }
            &:hover {
              background-color: rgba(255, 255, 255, 0.08);
              .news_right_img {
                img {
                  filter: grayscale(0);
                }
              }
            }
          }
        }
      }
      .button {
        display: none;
        width: 295 * $pr;
        height: 44 * $pr;
        border-radius: 42 * $pr;
        font-size: 16 * $pr;
        line-height: 22 * $pr;
        background: #fff;
        color: #000;
      }
    }
  }

  .pop_maximum {
    margin: 48 * $pr auto 0;
    padding: 0 16 * $pr;
    .pop_main_activity {
      display: initial;
      .pop_news {
        .news_left {
          width: 100%;
          height: 100%;
          margin-right: 0;
          .left_img {
            width: 100%;
            margin-bottom: 10 * $pr;
            position: relative;
            .main_type {
              display: inline-block;
              position: absolute;
              left: 50%;
              bottom: -10 * $pr;
              transform: translateX(-50%);
              padding: 3 * $pr 9 * $pr;
              background-color: #000;
              border-radius: 6 * $pr;
              color: #fff;
              text-align: center;
              font-size: 12 * $pr;
              font-family: 'Rufina';
              font-style: normal;
              font-weight: 700;
              line-height: 16 * $pr;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
          &_text {
            position: relative;
            .text_cont {
              flex: 1;
              padding-right: 0;
              .cont_title {
                font-size: 14 * $pr;
                line-height: 18 * $pr;
                color: rgba(255, 255, 255, 0.6);
                text-align: center;
                padding: 0 10 * $pr;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .cont_more {
                display: none;
              }
              a {
                font-size: 14 * $pr;
                line-height: 18 * $pr;
              }
            }
            .text_time {
              display: none;
            }
          }
        }
        .news_right {
          flex: 1;
          width: 100%;
          margin: 12 * $pr 0 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 0 5 * $pr;
          & > :last-child {
            margin-bottom: 0;
          }
          li {
            width: auto;
            margin-bottom: 12 * $pr;
            transition: background-color 0.3s;
            a {
              width: 100%;
              height: auto;
              display: block;
              justify-content: space-between;
              .news_right_img {
                width: 100%;
                height: 95 * $pr;
                margin-right: 11 * $pr;
                box-sizing: border-box;
                position: relative;
                .main_type {
                  display: inline-block;
                  position: absolute;
                  left: 50%;
                  bottom: -11 * $pr;
                  transform: translateX(-50%);
                  padding: 3 * $pr 9 * $pr;
                  background-color: #000;
                  border-radius: 6 * $pr;
                  color: #fff;
                  text-align: center;
                  font-size: 12 * $pr;
                  font-family: 'Rufina';
                  font-style: normal;
                  font-weight: 700;
                  line-height: 16 * $pr;
                  align-items: flex-start;
                }
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }

              .news_right_text {
                width: auto;
                flex: 1;
                margin: 0;
                padding: 0;
                & > :nth-child(1) {
                  font-size: 14 * $pr;
                  line-height: 18 * $pr;
                  color: rgba(255, 255, 255, 0.6);
                  margin-top: 12 * $pr;
                  padding: 0 5 * $pr;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                & > :nth-child(2) {
                  display: none;
                }
              }

              .news_right_time {
                display: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
