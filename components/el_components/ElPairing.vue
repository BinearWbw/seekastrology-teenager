<template>
  <div class="pairing_max_main">
    <div class="pairing_module">
      <h3>ZODIAC COMPATIBILITY</h3>
      <div class="pairing_main">
        <div class="dynamic">
          <div class="dynamic_love">
            <el-selected-two
              :options="selectOptions"
              :title="'First Sign'"
              @change="handleDropdownChangeLeft"
            ></el-selected-two>
            <i class="icons"></i>
            <el-selected-two
              :options="selectOptions"
              :title="'Second Sign'"
              @change="handleDropdownChangeRight"
            >
            </el-selected-two>
          </div>
          <div class="dynamic_determine">
            <div class="determine_button">
              <button class="button" id="SIGNPAIR" @click="getStartPairingEl">
                Get Your Compatibility
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pairing',
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
      genderList: {
        males: '',
        malesId: 0,
        females: '',
        femalesId: 0,
      },
    }
  },
  methods: {
    handleDropdownChangeLeft(option) {
      this.genderList.males = option.name.toLowerCase()
      this.genderList.malesId = option.id
    },
    handleDropdownChangeRight(option) {
      this.genderList.females = option.name.toLowerCase()
      this.genderList.femalesId = option.id
    },
    getStartPairingEl() {
      sessionStorage.setItem('genderList', JSON.stringify(this.genderList))
      if (sessionStorage.getItem('genderList'))
        window.changePageUrl = `/astrology/`
      window.location.href = `/astrology/`
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.pairing_max_main {
  .pairing_module {
    width: 1400px;
    margin: 96px auto;
    h3 {
      font-family: 'Cinzel Decorative';
      font-style: normal;
      font-weight: 700;
      font-size: 46px;
      line-height: 64px;
      text-align: center;
      color: #ffffff;
    }
    .pairing_main {
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
  }
}

@media (max-width: 1450px) {
  //   .astrology {
  //     &_main {
  //       width: 100%;
  //       padding: 0 30px;
  //     }
  //   }
  .pairing_max_main {
    .pairing_module {
      width: 100%;
      margin: 96px auto;
      .pairing_main {
        .dynamic {
          &_love {
            padding: 48px 400px;
          }
        }
      }
    }
  }
}

@media (max-width: 1250px) {
  .pairing_max_main {
    .pairing_module {
      .pairing_main {
        .dynamic {
          &_love {
            padding: 48px 300px;
          }
        }
      }
    }
  }
}

@media (max-width: 1025px) {
  .pairing_max_main {
    .pairing_module {
      .pairing_main {
        .dynamic {
          &_love {
            padding: 48px 180px;
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);

  .pairing_max_main {
    // background: url('~/assets/img/home/page_bottomh5.webp') no-repeat bottom
    //   center;
    // background-size: 100%;
    .pairing_module {
      width: 100%;
      padding: 0 16 * $pr;
      margin: 48 * $pr auto 0;
      h3 {
        font-size: 26 * $pr;
        line-height: 36 * $pr;
        padding: 0 5 * $pr;
      }
      .pairing_main {
        margin-top: 16 * $pr;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.08);
        padding: 16 * $pr 14 * $pr;
        .pairing_select {
          padding: 0;
          flex-direction: column;
          .selects {
            width: 100%;
            margin-bottom: 16 * $pr;
          }
        }
        .dynamic {
          &_love {
            height: auto;
            padding: 0;
            margin-top: 24 * $pr;
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
              //   margin: 24 * $pr 0 93 * $pr;
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
          }
        }
      }
    }
  }
}
</style>
