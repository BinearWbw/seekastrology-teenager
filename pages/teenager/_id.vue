<template>
  <div class="horroscopes">
    <google-ad classNames="horroscopes_googlead" :id="'7036206358'"></google-ad>
    <div class="horroscopes_top_bg">
      <div class="imgbg"></div>
    </div>
    <div class="horroscopes_main">
      <div class="horoscope_details">
        <google-ad classNames="google_ad" :id="'4376417914'"></google-ad>
        <div class="datails_list">
          <div class="list_top">
            <h3>{{ toUpperBig(currentName) }} Teen</h3>
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
              <el-tabs :tabs="horroData">
                <template>
                  <div class="text_form">
                    <div
                      class="texts"
                      :class="{ texts_more: openExpand }"
                      ref="textMore"
                      v-html="youlistData"
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
        <google-auto-ad classNames="google_ad" :id="'4184846228'" />
      </div>
    </div>
    <transition name="fade">
      <el-lnformation></el-lnformation>
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
import ElLnformation from '../../components/el_components/ElLnformation.vue'
export default {
  components: { ElLnformation },
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
      isLoading: false,
      aoMore: false,
      openExpand: false,
      timeout: null,
      ids: 1,
      currentName: '',
      youlistData: '',
    }
  },
  created() {
    this.isLoading = true
    this.ids = this.$route.params.id.replace(
      /^.*?(\d*)$/,
      (str, match, index) => match || '0'
    )
    this.$apiList.home
      .getZodiacHoroscopeWeekly({
        origin: process.env.origin,
        id: this.ids,
        type: 'teen',
      })
      .then((res) => {
        this.currentName = res.name
        this.youlistData = res.weekly
        this.isLoading = false
      })
  },
  mounted() {
    this.getCurrentTexts()
  },
  methods: {
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
    toUpperBig(str) {
      return str?.charAt(0).toUpperCase() + str?.slice(1)
    },
    getCurrentTexts() {
      this.timeout = setTimeout(() => {
        const moreConten = this.$refs.textMore
        const aoMore = moreConten.scrollHeight > moreConten.offsetHeight
        this.aoMore = aoMore
      }, 1000)
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
    margin: 0 auto 96px;
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
              :deep(strong) {
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
    &_googlead {
      display: flex;
      width: 100%;
      height: 110 * $pr;
      position: relative;
    }
    &_top_bg {
      top: 110 * $pr;
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
        padding: 110 * $pr 0 0;
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
        .google_ad {
          width: 100%;
        }
      }
    }
  }
}
</style>
