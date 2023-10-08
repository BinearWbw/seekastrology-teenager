<template>
  <div class="inquiry">
    <div class="inquiry_pet">
      <google-ad classNames="google_ad_top" :id="'9680645670'" />
      <div class="pairing">
        <div class="pairing_petmain">
          <div class="peter">
            <h3>Which Pet Is Your Zodiac Match?</h3>
            <p class="tipsy">Find out what pets are compatible with you!</p>
            <div class="file_context">
              Astrology plays an important part and role in your pet's life, be
              it a cat, a dog, a parrot, a pigeon, a horse, etc. Ever wondered
              why your dog or cat behaves differently? The answers could be
              determined by their date of birth and how astrology affects their
              character.You'll have an easier time in raising your pets if you
              understand what makes them they are and how their basic behavior
              will
            </div>
            <div class="pet_select">
              <el-selected-three
                :options="selectOptions"
                @changeSign="handleDropdownChangeLeft"
              ></el-selected-three>
            </div>
          </div>
        </div>
        <div class="context">
          <div class="msgtext">
            <transition name="fade">
              <div class="teletext" v-if="newText" v-html="newText"></div>
            </transition>
          </div>
          <google-auto-ad classNames="google_ad" :id="'4184846228'" />
        </div>
        <home-quizzes class="quizzes"></home-quizzes>
        <el-daily-horoscope></el-daily-horoscope>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      malesId: 0,
      newText: '',
    }
  },
  methods: {
    handleDropdownChangeLeft(option) {
      console.log('当前的选择', option)
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.inquiry {
  &_pet {
    .google_ad_top {
      width: 1200px;
      height: 315px;
      margin: 48px auto 0;
    }
    .pairing {
      width: 1400px;
      padding: 96px 0;
      margin: 0 auto;
      &_petmain {
        width: 100%;
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.08) 0%,
          rgba(255, 255, 255, 0) 100%
        );
        backdrop-filter: blur(8px);
        padding: 3px;
        .peter {
          width: 100%;
          border-radius: 21px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(8px);
          background: url('../../assets/img/teenager/animal_sign_1.webp')
            no-repeat;
          background-size: cover;
          padding: 44px 92px 42px;
          > h3 {
            color: #fff;
            text-align: center;
            font-family: 'Cinzel Decorative';
            font-size: 36px;
            font-style: normal;
            font-weight: 700;
            line-height: 48px;
          }
          .tipsy {
            color: #fff;
            font-family: 'Rubik';
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            text-align: center;
            margin: 24px 0;
          }
          .file_context {
            color: #ffda8b;
            font-family: 'Rubik';
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
          }
          .pet_select {
            display: flex;
            flex-direction: column;
            padding-top: 46px;
            align-items: center;
          }
        }
      }
      .context {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 96px;
        .msgtext {
          width: 1164px;
          .teletext {
            padding-bottom: 48px;
          }
        }
        .google_ad {
          width: 1200px;
        }
      }
      .quizzes {
        padding-top: 66px;
      }
    }
  }
}
@media (max-width: 1470px) {
  .inquiry {
    &_pet {
      padding: 0 30px;
      .google_ad_top {
        width: 100%;
        max-width: 1200px;
      }
      .pairing {
        width: 100%;
        .context {
          .msgtext {
            width: 100%;
          }
          .google_ad {
            width: 100%;
            max-width: 1200px;
          }
        }
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .inquiry {
    &_pet {
      padding: 0 16 * $pr;
      .google_ad_top {
        width: 100%;
        max-width: auto;
        height: 130 * $pr;
        margin: 0 auto;
      }
      .pairing {
        width: 100%;
        padding: 34 * $pr 0 48 * $pr;
        &_petmain {
          border-radius: 24 * $pr;
          border: 1 * $pr solid rgba(255, 255, 255, 0.4);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          backdrop-filter: blur(8 * $pr);
          padding: 3 * $pr;
          .peter {
            border-radius: 21 * $pr;
            border: 1 * $pr solid rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(8 * $pr);
            background: url('../../assets/img/teenager/animal_sign_h5.png')
              no-repeat;
            background-size: contain;
            padding: 21 * $pr;
            > h3 {
              font-size: 26 * $pr;
              line-height: 36 * $pr;
            }
            .tipsy {
              font-size: 14 * $pr;
              line-height: 24 * $pr;
              margin: 16 * $pr 0;
            }
            .file_context {
              font-size: 14 * $pr;
              line-height: 24 * $pr;
            }
            .pet_select {
              padding-top: 16 * $pr;
            }
          }
        }
        .context {
          padding-top: 48 * $pr;
          .msgtext {
            .teletext {
              padding-bottom: 48 * $pr;
            }
          }
          .google_ad {
            width: 100%;
            max-width: auto;
          }
        }
        .quizzes {
          padding-top: 0;
        }
      }
    }
  }
}
</style>
