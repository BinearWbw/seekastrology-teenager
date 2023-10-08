<template>
  <div class="horroscopes">
    <div class="horroscopes_top_bg">
      <div class="imgbg"></div>
    </div>
    <google-ad classNames="horroscopes_googlead" :id="'7036206358'"></google-ad>
    <div class="horroscopes_main">
      <div class="horoscope_details">
        <google-ad classNames="google_ad" :id="'4376417914'"></google-ad>
        <div class="datails_list">
          <div class="list_top">
            <h3>
              <!-- {{ toUpperBig(currentName) }}
              <br />
              {{ moreData[comentIds].name }}
              Horoscope -->
              {{ toUpperBig(currentName) }} Teen
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
              >
                <template>
                  <div class="text_form">
                    <div class="format_date">
                      {{ $utils.horoscopeFormatDate(currentTime) }}
                    </div>
                    <div
                      class="texts"
                      :class="{ texts_more: openExpand }"
                      ref="textMore"
                      v-html="moreData[comentIds].texts"
                    ></div>
                    <div class="more_btn" v-if="aoMore" @click="setOpenExpand">
                      {{ openExpand ? 'Show Less' : 'Show More' }}
                    </div>
                  </div>
                </template>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
      <div class="mexplore">
        <el-explore-more />
      </div>
      <transition name="fade">
        <el-join-us class="joins"></el-join-us>
      </transition>
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
                <img :src="item.imgUrl" :alt="item.title" />
              </div>
              <p>{{ item.title }}</p>
            </div>
            <div class="more_text">
              <p>{{ item.title }}</p>
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
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Horroscopes',
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
          tabs: 'Weekly',
          type: 'w',
        },
      ],
      comentId: 0,
      currentTime: 'w',
      comentIdSession: 0,
      isLoading: false,
      isSetTimes: null,
      aoMore: false,
      openExpand: false,
      timeout: null,
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
            kind: 'w',
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
  },
  mounted() {
    this.getCurrentTexts()
  },
  methods: {
    async getHoroscopeData(id = 1, kind = 'w') {
      this.isLoading = true
      await this.$apiList.home
        .getZodiacHoroscope({
          origin: process.env.origin,
          id,
          kind,
        })
        .then((res) => {
          this.isLoading = false
          this.youlistData = res.horoscope
          this.getCurrentTexts()
        })
    },
    handleDropdownChange(option) {
      // 点击下拉框
      this.ids = option.id
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      window.changePageUrl = `/teenager/${option.name
        .replace(/[^a-zA-Z0-9\\s]/g, '-')
        .toLowerCase()}-${option.id}/`
      window.location.href = `/teenager/${option.name
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
        this.getCurrentTexts()
      })
    },
    correspondingTime(i) {
      // 点击tabs
      this.currentTime = i.type
      this.getHoroscopeData(this.ids, i.type)
      this.openExpand = false
    },
    toUpperBig(str) {
      return str?.charAt(0).toUpperCase() + str?.slice(1)
    },
    getCurrentTexts() {
      this.timeout = setTimeout(() => {
        const moreConten = this.$refs.textMore
        const aoMore = moreConten.scrollHeight > moreConten.offsetHeight
        this.aoMore = aoMore
      }, 500)
    },
    setOpenExpand() {
      this.openExpand = !this.openExpand
      if (!this.openExpand) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    },
  },
  destroyed() {
    if (this.isSetTimes) clearTimeout(this.isSetTimes)
    if (this.timeout) clearTimeout(this.timeout)
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.horroscopes {
  position: relative;
  &_googlead {
    display: none;
  }
  &_top_bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1400px;
    flex-shrink: 0;
    .imgbg {
      width: 100%;
      height: 420px;
      background: url('~/assets/img/teenager/teenager_sign.webp') no-repeat;
      background-size: cover;
    }
  }
  &_main {
    margin: 0 auto 48px;
    width: 1400px;
    .horoscope_details {
      display: flex;
      padding: 288px 0 48px;
      .google_ad {
        width: 300px;
        height: 250px;
      }
      .datails_list {
        flex: 1;
        padding-left: 54px;
        .list_top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
          align-items: center;
          h3 {
            font-family: 'Cinzel Decorative';
            font-style: normal;
            font-weight: 700;
            font-size: 36px;
            line-height: 48px;
            color: #ffffff;
            position: relative;
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
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 28px;
                color: rgba(255, 255, 255, 0.6);
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 8;
                -webkit-box-orient: vertical;
                ::v-deep(:first-child) {
                  display: inline;
                }
              }
              .texts_more {
                -webkit-line-clamp: unset !important;
              }
              .more_btn {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 28px;
                color: #9747ff;
                cursor: pointer;
              }
            }
          }
        }
        .google_ad {
          width: 924px;
          min-height: 130px;
          margin: 48px auto 0;
        }
      }
    }
    .mexplore {
      padding-top: 48px;
    }
    .joins {
      padding-top: 96px;
    }
    .horoscope_more {
      padding: 96px 0 0;
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
            > p {
              display: none;
            }
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
}
@media (max-width: 1470px) {
  .horroscopes {
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
  .horroscopes {
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
  .horroscopes {
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
  .horroscopes {
    padding-top: 96 * $pr;
    &_googlead {
      display: block;
      width: 343 * $pr;
      height: 110 * $pr;
      margin: 0 auto 24 * $pr;
      position: relative;
    }
    &_top_bg {
      width: 450 * $pr;
      .imgbg {
        width: 100%;
        height: 135 * $pr;
      }
    }
    &_main {
      width: 100%;
      padding: 0 16 * $pr;
      margin: 0 auto 48 * $pr;
      .horoscope_details {
        display: flex;
        padding: 24 * $pr 0;
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
                  height: 224 * $pr;
                }
                .texts_more {
                  -webkit-line-clamp: unset !important;
                  height: auto !important;
                }
                .more_btn {
                  font-size: 16 * $pr;
                  line-height: 28 * $pr;
                }
              }
            }
          }
          .google_ad {
            display: none;
            width: 100%;
            height: 299 * $pr;
            margin: 23 * $pr auto 0;
          }
        }
      }
      .mexplore {
        padding-top: 48 * $pr;
      }
      .joins {
        padding-top: 48 * $pr;
      }
      .horoscope_more {
        padding: 48 * $pr 0 0;
        h3 {
          font-size: 26 * $pr;
          line-height: 36 * $pr;
        }
        .more_main {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 16 * $pr;
          padding: 24 * $pr 0 49 * $pr;
          .more_list {
            padding: 9 * $pr 16 * $pr;
            border-radius: 6 * $pr;
            border: none;
            background: rgba(255, 255, 255, 0.08);
            display: flex;
            .more_title {
              padding-bottom: 0;
              padding-right: 10 * $pr;
              &::after {
                display: none;
              }
              p {
                display: none;
              }
              .img_top {
                img {
                  width: 76 * $pr;
                  height: 68 * $pr;
                  object-fit: cover;
                }
              }
            }
            .more_text {
              align-items: initial;
              > p {
                display: block;
                color: #fff;
                font-family: 'Rubik';
                font-size: 16 * $pr;
                font-style: normal;
                font-weight: 400;
                line-height: 22 * $pr;
              }
              .p_text {
                font-size: 12 * $pr;
                line-height: 16 * $pr;
                margin: 6 * $pr 0 3 * $pr;
                -webkit-line-clamp: 2;
                height: 32 * $pr;
                text-align: left;
              }
              .button {
                display: none;
              }
            }
            &:hover {
              transform: translateY(0);
              border: none;
            }
          }
        }
        .google_ad {
          width: 100%;
        }
      }
    }
  }
}
</style>
