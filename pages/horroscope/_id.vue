<template>
  <div class="horroscope">
    <!-- <google-ad classNames="horroscope_googlead" :id="'7036206358'"></google-ad> -->
    <div class="horroscope_main">
      <div class="horoscope_details">
        <google-ad classNames="google_ad" :id="'4376417914'"></google-ad>
        <div class="datails_list">
          <div class="list_top">
            <h3>
              <!-- {{ toUpperBig(currentName) }}
              <br /> -->
              {{ moreData[comentIds].name }}
              Horoscopes
            </h3>
            <div class="pull_down" ref="pullscroll">
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
          <google-ad classNames="google_ad" :id="'7036206358'"></google-ad>
          <google-search-ad querys="horroscope"></google-search-ad>
        </div>
      </div>
      <div class="mexplore">
        <el-explore-more />
      </div>
    </div>
    <transition name="fade">
      <el-pairing></el-pairing>
    </transition>
    <div class="horoscope_more">
      <google-ad
        classNames="google_ad"
        dataFullWidth="true"
        :id="'4184846228'"
      />
    </div>
    <div class="daily_horo">
      <el-daily-horoscope></el-daily-horoscope>
    </div>
    <transition name="fade">
      <tarot-more-tarot class="more_tarot"></tarot-more-tarot>
    </transition>
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
  </div>
</template>

<script>
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
          tabs: '2024',
          type: 'y',
        },
      ],
      comentId: 0,
      currentTime: 'd',
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
  },
  mounted() {
    this.getCurrentTexts()
  },
  methods: {
    async getHoroscopeData(id = 1, kind = 'd') {
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
      this.isLoading = true
      // 创建a标签方便触发穿插广告
      const signa = document.createElement('a')
      signa.href = `/horroscope/${option.name
        .replace(/[^a-zA-Z0-9\\s]/g, '-')
        .toLowerCase()}-${option.id}/`
      document.body.appendChild(signa)
      signa.click()
      document.body.removeChild(signa)
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
        this.$refs.pullscroll.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
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
.horroscope {
  &_googlead {
    display: none;
  }
  &_main {
    margin: 0 auto 56px;
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
        :deep(.google_search) {
          margin-bottom: 0;
        }
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
          margin: 24px auto 0;
        }
      }
    }
    .mexplore {
      padding-top: 56px;
    }
  }
  .horoscope_more {
    padding: 24px 0 0;
    .google_ad {
      width: 1200px;
      height: 305px;
      margin: 0 auto;
    }
  }
  .daily_horo {
    padding-bottom: 56px;
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
    .horoscope_more {
      .google_ad {
        max-width: 100%;
        margin: 0 auto;
        padding: 0 30px;
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
    }
    .horoscope_more {
      .google_ad {
        width: 100%;
        margin: 0 auto;
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .horroscope {
    &_googlead {
      display: flex;
      width: 320 * $pr;
      height: 117 * $pr;
      margin: 0 auto 16 * $pr;
    }
    &_main {
      width: 100%;
      padding: 0 16 * $pr;
      margin: 0 auto;
      .horoscope_details {
        display: flex;
        padding: 0 0 24 * $pr;
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
            justify-content: space-between;
            margin-bottom: 24 * $pr;
            padding-top: 24 * $pr;
            h3 {
              font-family: Rubik;
              font-size: 22 * $pr;
              line-height: 30 * $pr;
              font-weight: 500;
              position: relative;
              padding-left: 7 * $pr;
              &::before {
                position: absolute;
                display: inline-block;
                width: 2 * $pr;
                height: 30 * $pr;
                content: '';
                top: 0;
                left: 0;
                background: #9747ff;
              }
            }
            .pull_down {
              width: 106 * $pr;
              height: 30 * $pr;
              :deep(.selected) {
                height: auto;
                .selected_main {
                  padding: 7 * $pr 16 * $pr;
                  height: auto;
                  .select_img {
                    display: none;
                  }
                  .select_text {
                    font-size: 12 * $pr;
                    line-height: 16 * $pr;
                  }
                  .select_icon {
                    width: 8 * $pr;
                    height: 8 * $pr;
                  }
                }
              }
              :deep(.options) {
                top: 36 * $pr;
                .left_tab_list {
                  padding-left: 10 * $pr;
                }
              }
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
            width: 336 * $pr;
            height: 297 * $pr;
            margin: 16 * $pr auto 0;
          }
        }
      }
      .mexplore {
        padding-top: 32 * $pr;
      }
    }
    .horoscope_more {
      .google_ad {
        width: 336 * $pr;
        height: 297 * $pr;
        padding: 0;
      }
    }
    .daily_horo {
      padding-bottom: 32 * $pr;
    }
    .more_tarot {
      padding-bottom: 32 * $pr;
    }
  }
}
</style>
