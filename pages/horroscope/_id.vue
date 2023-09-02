<template>
  <div class="horroscope">
    <div class="horroscope_main">
      <div class="horoscope_details">
        <google-ad classNames="google_ad" :id="'4376417914'"></google-ad>
        <div class="datails_list">
          <div class="list_top">
            <h3>
              {{ toUpperBig(currentName) }}
              <br />
              {{ moreData[comentIds].name }}
              Horoscope
            </h3>
            <div class="pull_down">
              <el-selected
                :options="tabList"
                :pint="ids"
                @change="handleDropdownChange"
              ></el-selected>
            </div>
          </div>
          <div class="list_main">
            <div class="list_tabs">
              <el-tabs
                :tabs="horroData"
                :tabsId="tabsId"
                @click="correspondingTime"
                id="HORROSCOPETABS"
              >
                <template>
                  <div class="text_form">
                    <div class="format_date">
                      {{ $utils.horoscopeFormatDate(currentTime) }}
                    </div>
                    -
                    <div class="texts" v-html="moreData[comentIds].texts"></div>
                  </div>
                </template>
              </el-tabs>
            </div>
          </div>
          <google-ad classNames="google_ad" :id="'8124091233'"></google-ad>
        </div>
      </div>
      <div class="horoscope_more">
        <h3>Read More Horoscope</h3>
        <div class="more_main">
          <div
            class="more_list"
            v-for="(item, index) in moreData"
            :key="index"
            @click="setCorresponding(index)"
            id="HOROSCOPETYPE"
            v-show="index != comentIds"
          >
            <div class="more_title">
              <div class="img_top">
                <img :src="item.imgUrl" alt="#" />
              </div>
              <p>{{ item.title }}</p>
            </div>
            <div class="more_text">
              <div class="p_text" v-html="item.texts"></div>
              <button class="button">Get Your Horoscope</button>
            </div>
          </div>
        </div>
        <google-auto-ad classNames="google_ad" :id="'4184846228'" />
      </div>
    </div>
    <transition name="fade">
      <tarot-more-tarot></tarot-more-tarot>
    </transition>
    <transition name="fade">
      <el-pairing></el-pairing>
    </transition>
    <div class="daily_horo">
      <el-daily-horoscope></el-daily-horoscope>
    </div>
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Horroscope',
  data() {
    return {
      tabList: [
        {
          name: 'Aries',
          imgUrl: require('~/assets/img/home/choice/Aries.png'),
          id: 1,
        },
        {
          name: 'Taurus',
          imgUrl: require('~/assets/img/home/choice/Taurus.png'),
          id: 2,
        },
        {
          name: 'Gemini',
          imgUrl: require('~/assets/img/home/choice/Gemini.png'),
          id: 3,
        },
        {
          name: 'Cancer',
          imgUrl: require('~/assets/img/home/choice/Cancer.png'),
          id: 4,
        },
        {
          name: 'Leo',
          imgUrl: require('~/assets/img/home/choice/Leo.png'),
          id: 5,
        },
        {
          name: 'Virgo',
          imgUrl: require('~/assets/img/home/choice/Virgo.png'),
          id: 6,
        },
        {
          name: 'Libra',
          imgUrl: require('~/assets/img/home/choice/Libra.png'),
          id: 7,
        },
        {
          name: 'Scorpio',
          imgUrl: require('~/assets/img/home/choice/Scorpio.png'),
          id: 8,
        },
        {
          name: 'Sagittarius',
          imgUrl: require('~/assets/img/home/choice/Sagittarius.png'),
          id: 9,
        },
        {
          name: 'Capricorn',
          imgUrl: require('~/assets/img/home/choice/Capricorn.png'),
          id: 10,
        },
        {
          name: 'Aquarius',
          imgUrl: require('~/assets/img/home/choice/Aquarius.png'),
          id: 11,
        },
        {
          name: 'Pisces',
          imgUrl: require('~/assets/img/home/choice/Pisces.png'),
          id: 12,
        },
      ],
      horroData: [
        {
          tabs: 'Today',
          type: 'd',
        },
        {
          tabs: 'Weekly',
          type: 'w',
        },
        {
          tabs: 'Monthly',
          type: 'm',
        },
        {
          tabs: '2023',
          type: 'y',
        },
      ],
      comentId: 0,
      currentTime: 'd',
      comentIdSession: 0,
      isLoading: false,
      isSetTimes: null,
    }
  },
  async asyncData({ error, $apiList, params }) {
    try {
      let ids = 1,
        currentName = '',
        comentIds = 0,
        regey = /-([0-9]+)-/,
        madeId = null,
        tabsId = 0
      let [youlistData] = await Promise.all([
        $apiList.home
          .getZodiacHoroscope({
            origin: process.env.origin,
            id: params.id.replace(
              /^.*?(\d*)$/,
              (str, match, index) => match || '0'
            ),
            kind: 'd',
          })
          .then((res) => {
            ids = res.id
            madeId = regey.exec(params.id)
            if (madeId && madeId[1] !== '5') {
              comentIds = madeId[1]
            }
            if (madeId && madeId[1] == '5') {
              tabsId = madeId[1]
            }
            currentName = res.name
            return res.horoscope
          }),
      ])
      return {
        ids,
        youlistData,
        currentName,
        comentIds,
        tabsId,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
  computed: {
    moreData() {
      return [
        {
          name: 'Daily',
          title: 'Daily Horoscope',
          imgUrl: require('~/assets/img/horroscope/daily_horoscope.png'),
          texts: this.youlistData?.general,
        },
        {
          name: 'Love',
          title: 'Love Horoscope',
          imgUrl: require('~/assets/img/horroscope/love_horoscope.png'),
          texts: this.youlistData?.love,
        },
        {
          name: 'Health',
          title: 'Health Horoscope',
          imgUrl: require('~/assets/img/horroscope/health_horoscope.png'),
          texts: this.youlistData?.health,
        },
        {
          name: 'Career',
          title: 'Career Horoscope',
          imgUrl: require('~/assets/img/horroscope/career_horoscope.png'),
          texts: this.youlistData?.career,
        },
        {
          name: 'Money',
          title: 'Money Horoscope',
          imgUrl: require('~/assets/img/horroscope/money_horoscope.png'),
          texts: this.youlistData?.finances,
        },
      ]
    },
    ...mapGetters(['getIntersperseUrl']),
  },
  created() {},
  mounted() {},
  methods: {
    async getHoroscopeData(id = 1, kind = 'd') {
      await this.$apiList.home
        .getZodiacHoroscope({
          origin: process.env.origin,
          id,
          kind,
        })
        .then((res) => {
          this.youlistData = res.horoscope
        })
    },
    handleDropdownChange(option) {
      // 点击下拉框
      this.ids = option.id
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      window.changePageUrl = `/horroscope/${option.name
        .replace(/[^a-zA-Z0-9\\s]/g, '-')
        .toLowerCase()}-${option.id}/`
      window.location.href = `/horroscope/${option.name
        .replace(/[^a-zA-Z0-9\\s]/g, '-')
        .toLowerCase()}-${option.id}/`
      this.isLoading = true
    },
    setCorresponding(i) {
      // 点击其他运势
      this.$nextTick(() => {
        this.isLoading = true
        this.isSetTimes = setTimeout(() => {
          this.comentIds = i
          this.isLoading = false
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }, 500)
      })
    },
    correspondingTime(i) {
      // 点击tabs
      this.currentTime = i.type
      this.getHoroscopeData(this.ids, i.type)
    },
    toUpperBig(str) {
      return str?.charAt(0).toUpperCase() + str?.slice(1)
    },
  },
  destroyed() {
    if (this.isSetTimes) clearTimeout(this.isSetTimes)
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.horroscope {
  &_main {
    margin: 0 auto 48px;
    width: 1400px;
    .horoscope_details {
      display: flex;
      padding: 48px 0;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.2) 50.52%,
          rgba(255, 255, 255, 0) 100%
        );
      }
      .google_ad {
        width: 300px;
      }
      .datails_list {
        flex: 1;
        padding-left: 54px;
        .list_top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 48px;
          h3 {
            font-family: 'Cinzel Decorative';
            font-style: normal;
            font-weight: 700;
            font-size: 36px;
            line-height: 48px;
            color: #ffffff;
          }
          .pull_down {
            width: 338px;
            height: 60px;
          }
        }
        .list_main {
          width: 100%;
          .list_tabs {
            width: 100%;
            .text_form {
              padding-top: 24px;
              .format_date {
                display: inline;
                font-family: 'Rubik Medium';
                font-style: normal;
                font-size: 16px;
                line-height: 28px;
                color: #9747ff;
              }
              .texts {
                display: inline;
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 28px;
                color: rgba(255, 255, 255, 0.6);
                ::v-deep(:first-child) {
                  display: inline;
                }
              }
            }
          }
        }
        .google_ad {
          width: 924px;
          height: 130px;
          margin: 48px auto 0;
        }
      }
    }
    .horoscope_more {
      padding: 48px 0 0;
      h3 {
        font-family: 'Cinzel Decorative';
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 48px;
        text-align: center;
        color: #ffffff;
      }
      .more_main {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        padding: 48px 0;
        .more_list {
          padding: 30px 24px 24px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 6px;
          cursor: pointer;
          transition: transform 0.3s ease-in-out;
          .more_title {
            padding-bottom: 16px;
            position: relative;
            &::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 1px;
              background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.2) 50.52%,
                rgba(255, 255, 255, 0) 100%
              );
            }
            .img_top {
              height: auto;
              text-align: center;
              img {
                object-fit: contain;
              }
            }
            p {
              font-family: 'Rubik';
              font-size: 22px;
              line-height: 30px;
              text-align: center;
              color: #ffffff;
            }
          }
          .more_text {
            display: flex;
            flex-direction: column;
            align-items: center;
            .p_text {
              font-family: 'Rubik';
              font-size: 16px;
              line-height: 22px;
              text-align: center;
              color: rgba(255, 255, 255, 0.6);
              margin: 16px 0;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
            }
            .button {
              width: 220px;
              height: 32px;
              border: 1px solid #45454d;
              border-radius: 42px;
              font-family: 'Rubik';
              font-size: 14px;
              line-height: 18px;
              color: rgba(255, 255, 255, 0.6);
              -webkit-transition: background-color 0.3s, -webkit-color 0.3s;
              transition: background-color 0.3s, color 0.3s;
            }
          }
          &:hover {
            transform: translateY(-10px);
            border-color: rgba(255, 255, 255, 0.6);
            .more_text {
              .button {
                color: #000;
                background-color: #fff;
              }
            }
          }
        }
      }
      .google_ad {
        width: 1200px;
        margin: 0 auto;
      }
    }
  }
  .daily_horo {
    padding-bottom: 96px;
  }
}
@media (max-width: 1470px) {
  .horroscope {
    &_main {
      width: 100%;
      padding: 0 60px;
      .horoscope_details {
        .datails_list {
          padding-left: 30px;
          .google_ad {
            width: 100%;
          }
        }
      }
    }
  }
}

@media (max-width: 1350px) {
  .horroscope {
    &_main {
      .horoscope_more {
        .more_main {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      .horoscope_more {
        .google_ad {
          max-width: 100%;
          margin: 0 auto;
        }
      }
    }
  }
}

@media (max-width: 1000px) {
  .horroscope {
    &_main {
      .horoscope_details {
        > .google_ad {
          display: none;
        }
        .datails_list {
          padding-left: 0;
        }
      }
      .horoscope_more {
        .google_ad {
          width: 100%;
          margin: 0 auto;
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .horroscope {
    &_main {
      width: 100%;
      padding: 0 16 * $pr;
      margin: 0 auto 48 * $pr;
      .horoscope_details {
        display: flex;
        padding: 48 * $pr 0 24 * $pr;
        position: relative;
        &::after {
          height: 1 * $pr;
        }
        > .google_ad {
          display: none;
        }
        .datails_list {
          width: 100%;
          flex: 1;
          padding-left: 0;
          .list_top {
            display: flex;
            justify-content: initial;
            flex-direction: column-reverse;
            margin-bottom: 24 * $pr;
            h3 {
              font-size: 26 * $pr;
              line-height: 36 * $pr;
              text-align: center;
            }
            .pull_down {
              width: 100%;
              height: auto;
              margin-bottom: 24 * $pr;
            }
          }
          .list_main {
            width: 100%;
            .list_tabs {
              .text_form {
                padding-top: 12 * $pr;
                .format_date {
                  font-size: 16 * $pr;
                  line-height: 28 * $pr;
                }
                .texts {
                  font-size: 16 * $pr;
                  line-height: 28 * $pr;
                }
              }

              ::v-deep(.tab-header) {
                justify-content: space-around;
                .tab-item {
                  flex: 1;
                  margin: 0;
                  padding: 7 * $pr 0;
                }
              }
            }
          }
          .google_ad {
            width: 100%;
            height: 299 * $pr;
            margin: 23 * $pr auto 0;
          }
        }
      }
      .horoscope_more {
        padding: 24 * $pr 0 0;
        h3 {
          font-size: 26 * $pr;
          line-height: 36 * $pr;
        }
        .more_main {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24 * $pr;
          padding: 24 * $pr 0 49 * $pr;
          .more_list {
            padding: 16 * $pr 24 * $pr 24 * $pr;
            border: 1 * $pr solid rgba(255, 255, 255, 0.7);
            border-radius: 6 * $pr;
            .more_title {
              padding-bottom: 16 * $pr;
              &::after {
                height: 1 * $pr;
              }
              p {
                font-size: 22 * $pr;
                line-height: 30 * $pr;
              }
              .img_top {
                img {
                  width: 170 * $pr;
                  height: 154 * $pr;
                  object-fit: cover;
                }
              }
            }
            .more_text {
              .p_text {
                font-size: 16 * $pr;
                line-height: 22 * $pr;
                margin: 16 * $pr 0;
                -webkit-line-clamp: 2;
                height: 44 * $pr;
              }
              .button {
                width: 220 * $pr;
                height: 32 * $pr;
                border: 1 * $pr solid #45454d;
                border-radius: 42 * $pr;
                font-size: 14 * $pr;
                line-height: 18 * $pr;
              }
            }
            &:hover {
              transform: translateY(0);
            }
          }
        }
        .google_ad {
          width: 100%;
        }
      }
    }
    .daily_horo {
      padding-bottom: 48 * $pr;
    }
  }
}
</style>
