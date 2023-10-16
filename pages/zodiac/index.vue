<template>
  <div class="zodiac">
    <div class="zodiac_main">
      <div class="zodiac_main_news">
        <div class="zodiac_main_news_top">
          <div class="top_text">
            <h3>Zodiac Signs Meanings and Characteristics</h3>
            <h3 class="h5_text">Zodiac Signs</h3>
            <google-ad :id="'4424329425'" classNames="google_ad" />
          </div>
        </div>
        <div class="zodiac_main_news_list">
          <div class="zodiac_signs">
            <div class="each" v-for="(item, index) in zodiacList" :key="index">
              <a
                :href="`/zodiac/details/${item.name
                  .replace(/[^a-zA-Z0-9\\s]/g, '-')
                  .toLowerCase()}-${item.id}/`"
              >
                <h4>{{ toUpperBig(item.name) }}</h4>
                <p class="time">{{ item.dates }}</p>
                <div class="text">{{ item.main_label }}</div>
                <nuxt-img
                  :src="item.icon"
                  fit="cover"
                  width="180"
                  height="126"
                  :alt="item.name"
                  loading="lazy"
                  format="auto"
                ></nuxt-img>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="zodiac_main_other">
        <div class="other_main">
          <google-ad :id="'1578014121'" classNames="google_ad" />
          <el-pairing-two class="pairing"></el-pairing-two>
          <el-pop-articles></el-pop-articles>
        </div>
      </div>
    </div>
    <div class="zodiac_el">
      <home-quizzes class="quizzes"></home-quizzes>
      <div class="zodiac_google">
        <google-auto-ad :id="'3950489038'" classNames="google_ad" />
      </div>
      <tarot-more-tarot></tarot-more-tarot>
    </div>

    <!-- <transition name="fade">
      <home-pop-articles></home-pop-articles>
    </transition> -->
  </div>
</template>

<script>
import GoogleAd from '../../components/GoogleAd.vue'

import MoreTarot from '../../components/tarot/MoreTarot.vue'
export default {
  components: { GoogleAd, MoreTarot },
  name: 'Zodiac',
  async asyncData({ error, $apiList }) {
    try {
      let zodiacList = await $apiList.home
        .getZodiacHomeAstro({
          origin: process.env.origin,
        })
        .then((res) => {
          return res || []
        })
      return {
        zodiacList,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
  methods: {
    toUpperBig(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.zodiac {
  &_main {
    margin: 0 auto;
    width: 1400px;
    padding: 32px 0 46px;
    display: flex;
    justify-content: space-between;
    &_news {
      width: 928px;
      &_top {
        width: 100%;
        position: relative;
        .top_text {
          width: 100%;
          padding: 16px 0 24px;
          margin-right: auto;
          h3 {
            font-family: 'Cinzel Decorative';
            font-style: normal;
            font-weight: 700;
            font-size: 36px;
            line-height: 48px;
            color: #ffffff;
            margin-bottom: 24px;
          }
          p {
            font-family: 'Rubik';
            font-size: 16px;
            line-height: 28px;
            color: rgba(255, 255, 255, 0.6);
          }
          .h5_text {
            display: none;
          }
          .google_ad {
            width: 100%;
            height: 164px;
          }
        }
      }

      &_list {
        width: 100%;
        .zodiac_signs {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          .each {
            padding: 32px 16px;
            box-sizing: border-box;
            border: 1px solid rgba(255, 255, 255, 0);
            // border-radius: 6px;
            box-sizing: border-box;
            cursor: pointer;
            transition: border-color 0.3s, background-color 0.3s ease-in-out;
            a {
              display: block;
              box-sizing: border-box;
              position: relative;
              transition: transform 0.3s ease-in-out;
              h4 {
                font-family: 'Cinzel Decorative';
                font-style: normal;
                font-weight: 700;
                font-size: 26px;
                line-height: 36px;
                color: #fff;
              }
              .time {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #9747ff;
              }
              .text {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;
                color: rgba(255, 255, 255, 0.6);
                overflow: hidden;
                padding-right: 80px;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              img {
                position: absolute;
                right: -40px;
                top: 50%;
                transform: translateY(-50%);
                transition: transform 0.3s ease-in-out;
              }
            }

            &:hover {
              border-color: rgba(255, 255, 255, 0.6);
              background-color: rgba(255, 255, 255, 0.04);
              a {
                transform: translateY(-5px);
                img {
                  transform: scale(1.1) translateY(-60px);
                }
              }
            }
          }
        }
      }
    }
    &_other {
      width: 425px;
      .other_main {
        width: 100%;
        .google_ad {
          width: 100%;
          height: 250px;
          overflow: hidden;
        }
        .pairing {
          margin-top: 32px;
          margin-bottom: 30px;
        }
      }
    }
  }

  &_el {
    padding: 0 0 50px;
    display: flex;
    flex-direction: column;
    .zodiac_google {
      display: none;
    }
    .quizzes {
      margin-bottom: 96px;
    }
  }
}

@media (max-width: 1450px) {
  .zodiac {
    &_main {
      width: 100%;
      justify-content: space-evenly;
      &_news {
        width: 700px;
        &_list {
          width: 100%;
          .zodiac_signs {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      }
    }
  }
}

@media (max-width: 1250px) {
  .zodiac {
    &_main {
      display: block;
      padding: 32px 50px 96px;
      justify-content: space-between;
      &_news {
        width: 100%;
        &_top {
          width: 100%;
          position: relative;
          .top_text {
            h3 {
              text-align: center;
            }
          }
        }

        &_list {
          width: 100%;
          .zodiac_signs {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      }
      &_other {
        width: 100%;
        padding: 40px 10vw 0;
        .other_main {
          width: 100%;
          .google_ad {
            width: 100%;
            height: 250px;
            overflow: hidden;
          }
          .pairing {
            margin-top: 32px;
            margin-bottom: 48px;
          }
        }
      }
    }
    &_google {
      margin: 0 auto;
      width: 100%;
      padding: 0 50px;
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .zodiac {
    &_main {
      width: 100%;
      padding: 0;
      display: block;
      &_news {
        width: 100%;
        &_top {
          padding-bottom: 24 * $pr;
          width: 100%;
          background-position-y: 0;
          background-size: contain;
          background-image: none;
          position: relative;
          .top_text {
            width: 100%;
            padding: 0;
            margin-right: auto;
            text-align: center;
            display: flex;
            flex-direction: column;
            h3 {
              font-size: 26 * $pr;
              line-height: 36 * $pr;
              margin-bottom: 0;
            }
            p {
              font-size: 16 * $pr;
              line-height: 24 * $pr;
            }
            p:not(:last-child) {
              display: none;
            }
            h3:first-of-type {
              display: none;
            }
            .h5_text {
              display: block;
              order: 2;
              padding-top: 24 * $pr;
            }
            .google_ad {
              order: 1;
              height: 130 * $pr;
            }
          }
        }

        &_list {
          width: 100%;
          padding: 0 16 * $pr;
          .zodiac_signs {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 5 * $pr;
            .each {
              padding: 32 * $pr 16 * $pr;
              box-sizing: border-box;
              border: none;
              border-radius: 6 * $pr;
              background: rgba(255, 255, 255, 0.05);
              a {
                display: block;
                box-sizing: border-box;
                position: relative;
                transition: transform 0.3s ease-in-out;
                h4 {
                  font-family: 'Rubik';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 22 * $pr;
                  line-height: 30 * $pr;
                  color: #fff;
                }
                .time {
                  font-size: 16 * $pr;
                  line-height: 22 * $pr;
                }
                .text {
                  font-size: 12 * $pr;
                  line-height: 16 * $pr;
                  padding-right: 0;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 6;
                  -webkit-box-orient: vertical;
                }
                img {
                  position: absolute;
                  right: -24 * $pr;
                  top: 8 * $pr;
                  width: 111 * $pr;
                  height: auto;
                }
              }
              &:hover {
                border-color: rgba(255, 255, 255, 0.6);
                a {
                  transform: translateY(-5 * $pr);
                  img {
                    transform: scale(1.1) translateY(-30 * $pr);
                  }
                }
              }
            }
          }
          .google_ad {
            width: 100%;
            margin: 24 * $pr auto 32 * $pr;
          }
        }
      }
      &_other {
        width: 100%;
        padding: 48 * $pr 16 * $pr;
        .other_main {
          width: 100%;
          .google_ad {
            width: 100%;
            height: 250 * $pr;
          }
          .pairing {
            margin-top: 48 * $pr;
            margin-bottom: 48 * $pr;
          }
        }
      }
    }

    &_el {
      padding: 0;
      .zodiac_google {
        display: block;
        width: 100%;
        padding: 0 16 * $pr;
        order: 1;
        margin-top: 48 * $pr;
      }
      .quizzes {
        margin-bottom: 48 * $pr;
        order: 2;
        :deep(.google_ad_main) {
          display: none;
        }
      }
    }
  }
}
</style>
