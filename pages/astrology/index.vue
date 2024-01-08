<template>
  <div class="astrology">
    <div class="astrology_main">
      <div class="pairing">
        <h3>ZODIAC COMPATIBILITY</h3>
        <div class="pairing_main">
          <p class="choose">Choose Two Zodiac Signs</p>
          <div class="dynamic">
            <div class="dynamic_love">
              <el-selected-two
                :options="selectOptions"
                :title="'First Sign'"
                :pint="malesId"
                @change="handleDropdownChangeLeft"
              ></el-selected-two>
              <i class="icons"></i>
              <el-selected-two
                :options="selectOptions"
                :title="'Second Sign'"
                :pint="femalesId"
                @change="handleDropdownChangeRight"
              >
              </el-selected-two>
            </div>
            <div class="dynamic_determine" ref="target">
              <div class="determine_button">
                <button
                  class="button"
                  id="GETSTARTPAIRING"
                  @click="getStartPairing"
                >
                  Get Your Compatibility
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="pairing_text">
          <div class="text_list">
            <transition name="fade">
              <div
                class="introduce"
                ref="astrologyData"
                v-html="compatibilityData"
              ></div>
            </transition>
          </div>
          <google-ad
            classNames="google_ad"
            :dataFullWidth="'true'"
            :id="'3521651188'"
          ></google-ad>
        </div>
      </div>
    </div>
    <transition name="fade">
      <el-daily-horoscope></el-daily-horoscope>
    </transition>
    <div class="poparticles">
      <home-pop-articles></home-pop-articles>
    </div>
    <div class="all_tarot">
      <tarot-all-tarot></tarot-all-tarot>
    </div>
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import { adBreakInit, showAdBreak } from '@/utils/ad'
export default {
  name: 'astrology',
  data() {
    return {
      selectOptions: [
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
      selectImgLeft: 0,
      selectImgRight: 0,
      malesId: 0,
      femalesId: 0,
      compatibilityData: '',
      isLoading: false,
      idAdArray: '4256255492',
    }
  },
  mounted() {
    this.infoGetStartPairing()
    adBreakInit()
  },
  watch: {
    compatibilityData(val) {
      if (val) {
        this.isLoading = false
        this.$refs.target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    },
  },
  methods: {
    handleDropdownChangeLeft(option) {
      this.selectImgLeft = option.id - 1
      this.males = option.name.toLowerCase()
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    handleDropdownChangeRight(option) {
      this.selectImgRight = option.id - 1
      this.females = option.name.toLowerCase()
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    getStartPairing() {
      if (this.males && this.females) {
        this.isLoading = true
        this.$apiList.home
          .getZodiacComp({
            origin: process.env.origin,
            male: this.males,
            female: this.females,
          })
          .then((res) => {
            this.isLoading = false
            this.compatibilityData = res
            sessionStorage.removeItem('genderList')
            showAdBreak(this.adComplete)
            this.getGoogleAd()
          })
      } else {
        // 提示通知
        this.$notification.open({
          message: 'Stop',
          description: 'Please choose two Star sign.',
          duration: 2,
          style: {
            color: '#f00',
          },
        })
      }
    },
    infoGetStartPairing() {
      const storedObject = sessionStorage.getItem('genderList')
      if (storedObject) {
        const { malesId, femalesId, males, females } = JSON.parse(storedObject)
        this.malesId = malesId
        this.femalesId = femalesId
        this.selectImgLeft = malesId - 1
        this.selectImgRight = femalesId - 1
        this.males = males
        this.females = females
        this.getStartPairing()
      }
    },
    getGoogleAd() {
      this.$nextTick(() => {
        const astrologyData = this.$refs.astrologyData
        const h4Element = astrologyData.querySelectorAll('h4')
        h4Element.forEach((item, index) => {
          if (index == 2) {
            const adContainer = document.createElement('div')
            adContainer.className = 'leftAdText'

            // 创建动态组件实例
            const adComponent = new Vue({
              render: (h) =>
                h('google-auto-ad', {
                  props: {
                    classNames: 'leftAdText',
                    id: this.idAdArray,
                  },
                }),
            })

            // 挂载动态组件
            adComponent.$mount()

            // 将动态组件的根 DOM 元素添加到容器
            adContainer.appendChild(adComponent.$el)

            // 在 h4 元素之前插入广告容器
            item.parentNode.insertBefore(adContainer, item)
            return
          }
        })
      })
    },
    adComplete(data) {
      console.log(data)
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.astrology {
  position: relative;
  &_main {
    margin: 0 auto;
    width: 1400px;
    z-index: 5;
    .pairing {
      padding: 24px 0 0;
      > h3 {
        font-family: 'Cinzel Decorative';
        font-style: normal;
        font-weight: 700;
        font-size: 46px;
        line-height: 64px;
        text-align: center;
        color: #ffffff;
      }
      .pairing_main {
        margin-top: 24px;
        .choose {
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          font-family: 'Rubik';
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
          text-align: center;
        }
        .pairing_select {
          padding: 0 80px;
          display: flex;
          justify-content: space-around;
          .selects {
            width: 338px;
          }
        }
        .dynamic {
          &_love {
            padding: 48px 483px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icons {
              display: inline-block;
              width: 96px;
              height: 80px;
              background: url('~/assets/img/home/pairing_two.svg') no-repeat
                center center;
              background-size: cover;
            }
          }

          &_determine {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            p {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 22px;
              text-align: center;
              color: rgba(255, 255, 255, 0.6);
            }
            .determine_button {
              width: 278px;
              height: 44px;
              position: relative;
              &::before {
                position: absolute;
                content: '';
                width: 17px;
                left: 0;
                top: 0;
                height: 100%;
                background: url('../../assets/img/astrology/astr_btn.svg')
                  no-repeat;
                background-size: cover;
              }
              &::after {
                position: absolute;
                content: '';
                width: 17px;
                right: 0;
                top: 0;
                height: 100%;
                background: url('../../assets/img/astrology/astr_btn.svg')
                  no-repeat;
                background-size: cover;
                transform: scaleX(-1);
              }
              .button {
                width: 100%;
                height: 100%;
                font-family: 'Cinzel Decorative';
                font-style: normal;
                font-weight: 900;
                font-size: 17px;
                line-height: 21px;
                background: linear-gradient(
                    137.81deg,
                    rgba(255, 255, 255, 0.17) 20.27%,
                    rgba(255, 255, 255, 0) 41.14%
                  ),
                  linear-gradient(
                    180deg,
                    #c18f65 -18.33%,
                    rgba(183, 129, 84, 0.95) 35.52%,
                    rgba(99, 66, 38, 0.76) 85.86%,
                    rgba(161, 96, 68, 0.97) 105.26%,
                    #c18f65 116.67%
                  );
                letter-spacing: -0.06em;
                border: 1px solid #ffd58c;
                border-radius: 6px;
                text-shadow: 0px 2px 1px rgba(0, 0, 0, 0.44);
                color: #fbdcc0;
              }
            }
          }
        }
      }
      .pairing_text {
        width: 1164px;
        margin: 0 auto;
        position: relative;
        .text_list {
          width: 100%;
          padding-bottom: 24px;
          z-index: 5;
          position: relative;
          .title {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 22px;
            line-height: 30px;
            color: #ffffff;
            margin-bottom: 8px;
          }
          .introduce {
            font-family: 'Rubik';
            font-size: 16px;
            line-height: 28px;
            color: rgba(255, 255, 255, 0.6);
            :deep(h1),
            :deep(h2),
            :deep(h3),
            :deep(h4),
            :deep(h5),
            :deep(h6) {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 22px;
              line-height: 30px;
              margin: 48px 0 8px;
              color: #fff;
            }
            :deep(a) {
              color: rgba(255, 255, 255, 0.6);
              pointer-events: none;
            }
            :deep(.leftAdText) {
              .leftAdText {
                margin-top: 48px;
                .title {
                  height: 25px;
                  margin: 0;
                  color: #fff;
                }
              }
            }
          }
        }
        .google_ad {
          width: 100%;
          height: 130px;
          margin: 0 auto;
        }
      }
    }
  }
  .poparticles {
    margin-top: 56px;
  }
  .all_tarot {
    padding: 0 0 56px;
  }
}
@media (max-width: 1450px) {
  .astrology {
    &_main {
      width: 100%;
      padding: 0 50px;
      .pairing {
        .pairing_main {
          .dynamic {
            &_love {
              padding: 48px 362px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1250px) {
  .astrology {
    &_main {
      .google_ad {
        &:first-child {
          width: 100%;
        }
      }
      .pairing {
        .pairing_main {
          .dynamic {
            &_love {
              padding: 48px 212px;
            }
          }
        }
        .pairing_text {
          width: 100%;
        }
      }
    }
  }
}

@media (max-width: 1025px) {
  .astrology {
    &_main {
      .pairing {
        .pairing_main {
          .pairing_select {
            padding: 0 50px;
          }
          .dynamic {
            &_love {
              padding: 48px 130px;
            }
            &_determine {
              .google_ad {
                width: 100%;
              }
            }
          }
        }
        .pairing_text {
          width: 100%;
          .google_ad {
            width: 100%;
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .astrology {
    &_main {
      margin: 0 auto;
      width: 100%;
      padding: 0;
      .google_ad {
        margin: 0;
        &:first-child {
          height: 130 * $pr;
        }
      }
      .pairing {
        padding: 0 16 * $pr;
        > h3 {
          font-size: 36 * $pr;
          line-height: 48 * $pr;
          padding-top: 24 * $pr;
        }
        .pairing_main {
          margin-top: 16 * $pr;
          padding: 16 * $pr 14 * $pr;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          .pairing_select {
            padding: 0;
            flex-direction: column;
            .selects {
              width: 100%;
              margin-bottom: 16 * $pr;
            }
          }
          .choose {
            font-size: 14 * $pr;
            line-height: 18 * $pr;
          }
          .dynamic {
            &_love {
              height: auto;
              padding: 0;
              margin-top: 32 * $pr;
              .icons {
                width: 71 * $pr;
                height: 60 * $pr;
              }
            }

            &_determine {
              margin-top: 16 * $pr;
              p {
                font-size: 14 * $pr;
                line-height: 18 * $pr;
              }
              .determine_button {
                width: 277 * $pr;
                height: 60 * $pr;
                &::before {
                  width: 17 * $pr;
                }
                &::after {
                  width: 17 * $pr;
                }
                .button {
                  font-size: 17 * $pr;
                  line-height: 21 * $pr;
                  border: 1 * $pr solid #ffd58c;
                  border-radius: 6 * $pr;
                  text-shadow: 0px 2 * $pr 1 * $pr rgba(0, 0, 0, 0.44);
                }
              }
              .google_ad {
                width: 336 * $pr;
                height: 297 * $pr;
              }
            }
          }
        }
        .pairing_text {
          width: 100%;
          .text_list {
            width: 100%;
            padding-bottom: 24 * $pr;
            .title {
              font-size: 22 * $pr;
              line-height: 30 * $pr;
              margin-bottom: 8 * $pr;
            }
            .introduce {
              font-size: 16 * $pr;
              line-height: 24 * $pr;
              :deep(h1),
              :deep(h2),
              :deep(h3),
              :deep(h4),
              :deep(h5),
              :deep(h6) {
                font-size: 22 * $pr;
                line-height: 30 * $pr;
                margin: 24 * $pr 0 8 * $pr;
                color: #fff;
              }
              :deep(.leftAdText) {
                .leftAdText {
                  width: 100%;
                  margin: 24 * $pr auto 0;
                  .title {
                    height: 17 * $pr;
                  }
                }
              }
            }
          }
          .google_ad {
            width: 336 * $pr;
            height: 297 * $pr;
          }
        }
      }
    }
    .poparticles {
      margin-top: 0;
    }
    .all_tarot {
      padding: 0 0 48 * $pr;
    }
  }
}
</style>
