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
            <div class="pet_select" ref="petScroll">
              <el-selected-three
                :options="selectOptions"
                @changeSign="handleDropdownChangeLeft"
              ></el-selected-three>
            </div>
          </div>
        </div>
        <div class="context" v-if="newText">
          <div class="msgtext">
            <h3 class="h3_title">{{ nameSign }} and Pets Compatibility</h3>
            <transition name="fade">
              <div class="teletext" v-html="newText"></div>
            </transition>
          </div>
          <!-- <google-auto-ad classNames="google_ad" :id="'4184846228'" /> -->
        </div>
        <home-quizzes class="quizzes"></home-quizzes>
        <el-daily-horoscope></el-daily-horoscope>
      </div>
    </div>
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
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
      isLoading: false,
      nameSign: '',
    }
  },
  methods: {
    // 获取星座与宠物的配对内容
    handleDropdownChangeLeft(option) {
      this.isLoading = true
      this.$apiList.home
        .getZodiacDetails({
          origin: process.env.origin,
          id: option.id,
        })
        .then((res) => {
          this.newText = res.pet_comp
          this.nameSign = option.name
          this.isLoading = false
          this.$refs.petScroll.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        })
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
      height: 230px;
      margin: 48px auto 0;
    }
    .pairing {
      width: 1400px;
      padding: 50px 0 96px;
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
        position: relative;
        z-index: 10;
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
            scroll-margin-top: -100px;
          }
        }
      }
      .context {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 96px;
        z-index: 9;
        .msgtext {
          width: 1164px;
          .h3_title {
            color: #fff;
            font-family: 'Cinzel Decorative';
            font-size: 36px;
            font-style: normal;
            font-weight: 700;
            line-height: 48px;
            margin-bottom: 24px;
          }
          .teletext {
            // padding-bottom: 48px;
            :deep(h2) {
              color: #fff;
              font-family: 'Rubik';
              font-size: 22px;
              font-style: normal;
              font-weight: 500;
              line-height: 30px;
              margin-top: 24px;
            }
            :deep(h3),
            :deep(h4) {
              color: #fff;
              font-family: 'Rubik';
              font-size: 18px;
              font-style: normal;
              font-weight: 500;
              line-height: 24px;
              margin-top: 8px;
            }
            :deep(p),
            :deep(li) {
              color: rgba(255, 255, 255, 0.6);
              font-family: 'Rubik';
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 28px;
            }
          }
        }
        .google_ad {
          width: 100%;
          max-width: 1200px;
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
      .google_ad_top {
        width: 100%;
        max-width: 1200px;
      }
      .pairing {
        padding: 50px 30px 96px;
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
      .google_ad_top {
        width: 100%;
        max-width: auto;
        height: 130 * $pr;
        margin: 0 auto;
      }
      .pairing {
        width: 100%;
        padding: 24 * $pr 16 * $pr 48 * $pr;
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
              scroll-margin-top: -80 * $pr;
            }
          }
        }
        .context {
          padding-top: 48 * $pr;
          .msgtext {
            .h3_title {
              font-size: 26 * $pr;
              line-height: 36 * $pr;
              margin-bottom: 24 * $pr;
            }
            .teletext {
              //   padding-bottom: 48 * $pr;
              :deep(h2) {
                font-size: 16 * $pr;
                line-height: 28 * $pr;
                margin-top: 24 * $pr;
              }
              :deep(h3),
              :deep(h4) {
                font-size: 16 * $pr;
                line-height: 24 * $pr;
                margin-top: 8 * $pr;
              }
              :deep(p),
              :deep(li) {
                font-size: 14 * $pr;
                line-height: 24 * $pr;
              }
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
