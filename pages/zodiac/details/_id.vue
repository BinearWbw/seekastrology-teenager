<template>
  <div class="zodiac_details">
    <div class="zodiac_details_main">
      <div class="part_details">
        <div class="pull_down">
          <google-ad :id="'7918863055'" classNames="google_ad" />
          <el-selected
            :options="tabList"
            :pint="ids"
            @change="handleDropdownChange"
          ></el-selected>
        </div>
        <div class="introduce">
          <div class="right_cont">
            <h4>{{ `${zodiacIData.name} TRAITS` }}</h4>
            <div class="img_cont">
              <nuxt-img
                :src="zodiacIData.banner || '/'"
                fit="cover"
                width="900"
                height="325"
                loading="lazy"
                :alt="zodiacIData.name"
                format="auto"
              ></nuxt-img>
            </div>
            <div class="right_minute">
              <h4>{{ `OVERVIEW OF ${zodiacIData.name}` }}</h4>
              <div class="right_minute_min">
                <div class="part_one">
                  <div class="contents">
                    <p class="p_title">Tauaus Date:</p>
                    <p class="p_texts">{{ zodiacIData.basic?.dates || '' }}</p>
                  </div>
                  <div class="contents">
                    <p class="p_title">Symbil:</p>
                    <p class="p_texts">{{ zodiacIData.basic?.symbol || '' }}</p>
                  </div>
                  <div class="contents">
                    <p class="p_title">Ruler Planet:</p>
                    <p class="p_texts">{{ zodiacIData.basic?.planet || '' }}</p>
                  </div>
                  <div class="contents">
                    <p class="p_title">Basic Color:</p>
                    <p class="p_texts">{{ zodiacIData.basic?.color || '' }}</p>
                  </div>
                  <div class="contents">
                    <p class="p_title">Mode And Elemnt:</p>
                    <p class="p_texts">
                      {{ zodiacIData.basic?.mode_element || '' }}
                    </p>
                  </div>
                  <div class="contents">
                    <p class="p_title">House:</p>
                    <p class="p_texts">{{ zodiacIData.basic?.house || '' }}</p>
                  </div>
                </div>
                <div class="part_two">
                  <div class="contents">
                    <p class="p_title">Best Compatibility:</p>
                    <p class="p_texts">
                      {{ zodiacIData.basic?.compatibility || '' }}
                    </p>
                  </div>
                  <div class="contents">
                    <p class="p_title">Lucky Metal:</p>
                    <p class="p_texts">
                      {{ zodiacIData.basic?.lucky_metal || '' }}
                    </p>
                  </div>
                  <div class="contents">
                    <p class="p_title">Ruler Worthy Days:</p>
                    <p class="p_texts">
                      {{ zodiacIData.basic?.worth_days || '' }}
                    </p>
                  </div>
                  <div class="contents">
                    <p class="p_title">Lucky Numbers:</p>
                    <p class="p_texts">
                      {{ zodiacIData.basic?.lucky_numbers || '' }}
                    </p>
                  </div>
                  <div class="contents">
                    <p class="p_title">Lucky Gem:</p>
                    <p class="p_texts">
                      {{ zodiacIData.basic?.lucky_gem || '' }}
                    </p>
                  </div>
                  <div class="contents">
                    <p class="p_title">Tarot Card:</p>
                    <p class="p_texts">
                      {{ zodiacIData.basic?.tarot_card || '' }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="right_various" v-html="zodiacIData.desc"></div>
            </div>
          </div>
          <div class="left_tab">
            <el-select-menu
              :names="zodiacIData.name"
              :ids="ids"
            ></el-select-menu>
            <google-ad :id="'2910078952'" classNames="google_ad"></google-ad>
          </div>
        </div>
        <!-- <google-ad classNames="google_ad" :id="'3801702844'"></google-ad> -->
      </div>
      <div class="tab_control">
        <google-auto-ad classNames="google_ad" :id="'7549376164'" />
      </div>
    </div>
    <transition name="fade">
      <home-pop-articles class="sign_pop"></home-pop-articles>
    </transition>
    <div class="sign_tarot">
      <google-auto-ad classNames="google_ad" :id="'6197461548'" />
      <tarot-all-tarot></tarot-all-tarot>
    </div>
    <!-- <transition name="fade">
      <el-pairing></el-pairing>
    </transition> -->
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'zodiac_details',
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
      isLoading: false,
    }
  },
  async asyncData({ error, $apiList, params }) {
    try {
      let ids = params.id.replace(
          /^.*?(\d*)$/,
          (str, match, index) => match || '0'
        ),
        tabsDataList = null
      let [zodiacIData] = await Promise.all([
        $apiList.home
          .getZodiacDetails({
            origin: process.env.origin,
            id: params.id.replace(
              /^.*?(\d*)$/,
              (str, match, index) => match || '0'
            ),
          })
          .then((res) => {
            ids = res.id
            tabsDataList = res?.traits
            tabsDataList.push(res?.comp)
            return res
          }),
      ])
      return {
        zodiacIData,
        ids,
        tabsDataList,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
  methods: {
    handleDropdownChange(option) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      window.changePageUrl = `/zodiac/details/${option.name
        .replace(/[^a-zA-Z0-9\\s]/g, '-')
        .toLowerCase()}-${option.id}/`
      window.location.href = `/zodiac/details/${option.name
        .replace(/[^a-zA-Z0-9\\s]/g, '-')
        .toLowerCase()}-${option.id}/`
      this.isLoading = true
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.zodiac_details {
  &_main {
    margin: 0 auto;
    width: 1400px;
    .part_details {
      width: 100%;
      padding-top: 48px;
      position: relative;
      h3 {
        font-family: 'Cinzel Decorative';
        font-style: normal;
        font-weight: 700;
        font-size: 46px;
        line-height: 64px;
        text-align: center;
        color: #ffffff;
        margin-bottom: 64px;
      }
      .pull_down {
        width: 220px;
        position: absolute;
        top: 34px;
        left: 708px;
        .google_ad {
          display: none;
          height: 150px;
        }
      }
      .introduce {
        width: 100%;
        display: flex;
        .left_tab {
          flex: 1;
          padding-left: 48px;
          .google_ad {
            width: 100%;
            height: 250px;
            margin-top: 24px;
          }
        }
        .right_cont {
          width: 928px;
          h4 {
            font-family: 'Cinzel Decorative';
            font-style: normal;
            font-weight: 700;
            font-size: 26px;
            line-height: 36px;
            color: #ffffff;
          }
          @keyframes fade-in {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 0.5;
            }
            100% {
              opacity: 1;
            }
          }
          .blank_space {
            color: #9747ff;
            text-decoration: underline;
            margin-top: 8px;
          }
          .img_cont {
            width: 100%;
            height: 325px;
            margin: 24px 0;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .right_minute {
            &_min {
              display: flex;
              padding-top: 28px;
              .part_one {
                flex: 1;
              }
              .part_two {
                flex: 1;
              }
              .contents {
                display: flex;
                align-items: center;
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                margin-bottom: 16px;
                .p_title {
                  display: inline-block;
                  width: 170px;
                  font-size: 16px;
                  line-height: 22px;
                  color: rgba(255, 255, 255, 0.6);
                }
                .p_texts {
                  flex: 1;
                  font-size: 20px;
                  line-height: 28px;
                  color: #ffffff;
                }
              }
            }
            .right_various {
              font-family: 'Rubik';
              font-size: 16px;
              line-height: 28px;
              color: rgba(255, 255, 255, 0.6);
              margin-top: 28px;
              position: relative;
              text-align: left;
            }
          }
        }
      }
      .google_ad {
        width: 100%;
        height: 130px;
        margin: 48px auto;
      }
    }
    .tab_control {
      width: 100%;
      .google_ad {
        width: 1200px;
        margin: 95px auto 48px;
      }
    }
  }
  .sign_pop {
    margin-bottom: 96px;
  }
  .sign_tarot {
    margin-bottom: 96px;
    .google_ad {
      display: none;
    }
  }
}

@media (max-width: 1470px) {
  .zodiac_details {
    &_main {
      width: 100%;
      padding: 0 60px;
      .part_details {
        width: 100%;
        padding-top: 48px;
        .pull_down {
          left: 50%;
        }
        .introduce {
          width: 100%;
          display: flex;
          justify-content: space-around;
          .left_tab {
            flex: inherit;
            width: 25%;
            padding-left: 0;
          }
          .right_cont {
            width: 70%;
          }
        }
      }
      .tab_control {
        .google_ad {
          max-width: 100%;
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .zodiac_details {
    &_main {
      .part_details {
        .pull_down {
          left: 45%;
        }
      }
    }
  }
}

@media (max-width: 1025px) {
  .zodiac_details {
    &_main {
      padding: 0 5vw;
      .part_details {
        width: 100%;
        padding-top: 48px;
        .pull_down {
          left: 41%;
        }
        .introduce {
          width: 100%;
          display: flex;
          justify-content: space-around;
          .left_tab {
            flex: inherit;
            width: 150px;
            padding-left: 0;
          }
          .right_cont {
            width: auto;
            flex: 1;
            padding-right: 20px;
          }
        }
      }
      .tab_control {
        width: 100%;
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .zodiac_details {
    &_main {
      width: 100%;
      padding: 0 16 * $pr;
      .part_details {
        width: 100%;
        padding-top: 0;
        h3 {
          font-size: 36 * $pr;
          line-height: 48 * $pr;
          margin-bottom: 16 * $pr;
        }
        .pull_down {
          width: 100%;
          position: relative;
          left: 0;
          top: 0;
          margin: 24 * $pr 0;
          .google_ad {
            display: block;
            height: 90 * $pr;
          }
        }
        .introduce {
          width: 100%;
          display: flex;
          flex-direction: column;
          .left_tab {
            order: 1;
            width: 100%;
            .google_ad {
              display: none;
            }
          }
          .right_cont {
            width: 100%;
            order: 3;
            padding: 24 * $pr 0 0;
            h4 {
              font-size: 26 * $pr;
              line-height: 36 * $pr;
              text-align: center;
            }
            .img_cont {
              height: auto;
              margin: 16 * $pr 0;
            }
            .right_minute {
              &_min {
                flex-direction: column;
                padding-top: 18 * $pr;
                .contents {
                  margin-bottom: 16 * $pr;
                  .p_title {
                    width: 140 * $pr;
                    font-size: 14 * $pr;
                    line-height: 18 * $pr;
                  }
                  .p_texts {
                    font-size: 16 * $pr;
                    line-height: 22 * $pr;
                  }
                }
              }
              .right_various {
                font-size: 16 * $pr;
                line-height: 24 * $pr;
                margin-top: 16 * $pr;
              }
            }
          }
        }
        .google_ad {
          width: 100%;
          height: 299 * $pr;
          margin: 32 * $pr auto 48 * $pr;
          // overflow: hidden;
        }
      }
      .tab_control {
        .google_ad {
          width: 100%;
          margin: 48 * $pr 0;
        }
      }
    }
    .sign_pop {
      margin-bottom: 48 * $pr;
    }
    .sign_tarot {
      margin-bottom: 0;
      padding-bottom: 48 * $pr;
      .google_ad {
        display: block;
        width: 100%;
        padding: 0 16 * $pr;
      }
    }
  }
}
</style>
