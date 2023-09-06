<template>
  <div class="quizzes_own">
    <div class="quizzes">
      <h3 :class="{ h5_size: $route.path !== '/' }">pOPULAR qUIZZES</h3>
      <div class="quizzes_sliding">
        <div class="swiper_list">
          <swiper class="swiper" :options="swiperOptions">
            <swiper-slide
              class="swiper__item"
              v-for="item of homeQuizzesData"
              :key="item.id"
            >
              <a
                :href="`/test/details/${item.name
                  .trim()
                  .replace(/[^\w\d]/g, '-')
                  .toLowerCase()}-${item.id}/${getCurrentRoute}`"
              >
                <div class="banner_img">
                  <nuxt-img
                    :src="item.icon || '/'"
                    fit="cover"
                    width="400"
                    height="400"
                    loading="lazy"
                    :alt="item.name"
                  ></nuxt-img>
                </div>
                <p>{{ item.name }}</p>
              </a>
            </swiper-slide>
          </swiper>
          <div class="swiper_pagination"></div>
        </div>
        <div class="quizzes_two">
          <div class="quizzes_two_list">
            <a
              :href="`/test/details/${item.name
                .trim()
                .replace(/[^\w\d]/g, '-')
                .toLowerCase()}-${item.id}/${getCurrentRoute}`"
              v-for="(item, index) in homeQuizzesData"
              :key="index"
            >
              <div class="matrix">
                <div class="imgs">
                  <nuxt-img
                    :src="item.icon || '/'"
                    fit="cover"
                    width="220"
                    height="220"
                    loading="lazy"
                    :alt="item.name"
                  ></nuxt-img>
                </div>
                <p>{{ item.name }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <button class="button" @click="pathToTestPage">Read More</button>
    </div>
    <div class="google_ad_main">
      <google-auto-ad :id="'1580825037'" classNames="google_ad" />
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'quizzes',
  props: ['homeQuizzes'],
  data() {
    return {
      homeQuizzesData: [],
      swiperOptions: {
        slidesPerView: 'auto',
        loop: true,
        direction: 'horizontal',
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper_pagination',
        },
        navigation: {
          nextEl: '.banner_next',
          prevEl: '.banner_prev',
        },
        speed: 500,
        grabCursor: true,
      },
    }
  },
  async fetch() {
    let [homeQuizzesData] = await Promise.all([
      this.$apiList.home
        .getZodiacHomeQuiz({
          origin: process.env.origin,
        })
        .then((res) => {
          return res.list || []
        }),
    ])
    this.homeQuizzesData = homeQuizzesData
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    getCurrentRoute() {
      return this.$route.path === '/' ? '?from=home' : ''
    },
  },
  methods: {
    pathToTestPage() {
      window.changePageUrl =
        window.location.pathname === '/' ? '/test/?from=home' : '/test/'
      window.location =
        window.location.pathname === '/' ? '/test/?from=home' : '/test/'
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.quizzes_own {
  width: 1400px;
  margin: 30px auto 0;
  display: flex;
  align-items: flex-start;
  padding-top: 36px;
  justify-content: space-between;

  .google_ad_main {
    width: 338px;
    height: 100%;
    padding-top: 48px;
    .google_ad {
      width: 100%;
      height: 74px;
    }
  }
  .quizzes {
    width: 928px;
    height: auto;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-family: 'Cinzel Decorative';
      font-weight: 700;
      font-size: 36px;
      line-height: 48px;
      color: #fff;
    }
    &_sliding {
      width: 100%;
      flex: 1;
      padding: 16px 0;
      display: flex;
      .banner {
        width: 64px;
        height: 220px;
        text-align: center;
        position: relative;
      }
      .swiper_list {
        display: none;
        flex: 1;
        margin: 0 35px;
        height: 100%;
        overflow: hidden;
        appearance: none;
        backface-visibility: hidden;
        -webkit-appearance: none;
        -webkit-backface-visibility: hidden;
        .swiper {
          width: 100%;
          height: 100%;
          &__item {
            width: 220px;
            height: 280px;
            color: rgba(255, 255, 255, 0.6);
            overflow: hidden;
            appearance: none;
            backface-visibility: hidden;
            transform: translate(0, 0, 0);
            -webkit-appearance: none;
            -webkit-backface-visibility: hidden;
            -webkit-transform: translate3d(0, 0, 0);
            margin-right: 16px;
            .banner_img {
              width: 220px;
              height: 220px;
              margin-bottom: 6px;
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }
            p {
              font-family: 'Rubik';
              font-size: 16px;
              line-height: 22px;
              text-align: center;
              color: rgba(255, 255, 255, 0.6);
              padding: 0 20px !important;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
        .swiper_pagination {
          display: none;
        }
      }
      .quizzes_two {
        width: 100%;
        &_list {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px 16px;
          .matrix {
            width: 220px;
            border-radius: 12px;
            padding-bottom: 8px;
            transition: background-color 0.3s, transform 0.3s ease-in-out;
            .imgs {
              width: 100%;
              height: 220px;
              margin-bottom: 16px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 12px;
              }
            }
            p {
              color: rgba(255, 255, 255, 0.6);
              text-align: center;
              font-family: Rubik;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
              padding: 0 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            &:hover {
              transform: scale(1.04);
              background-color: rgba(238, 238, 244, 0.1);
            }
          }
        }
      }
    }
    .button {
      width: 220px;
      height: 44px;
      border: 1px solid #45454d;
      border-radius: 42px;
      font-family: 'Rubik';
      color: rgba(255, 255, 255, 0.6);
      font-size: 16px;
      line-height: 22px;
      -webkit-transition: background-color 0.3s, -webkit-color 0.3s;
      transition: background-color 0.3s, color 0.3s;
      color: #000;
      background-color: #fff;
    }
  }
}
@media (max-width: 1435px) {
  .quizzes_own {
    width: 1200px;
    .quizzes {
      width: auto;
      height: auto;

      &_sliding {
        .quizzes_two {
          &_list {
            grid-template-columns: repeat(3, 220px);
          }
        }
      }
    }
  }
}
@media (max-width: 1300px) {
  .quizzes_own {
    width: 1000px;
    .google_ad {
      width: 238px;
      height: 574px;
    }
  }
}

@media (max-width: (1100px)) {
  .quizzes_own {
    width: 100%;
    justify-content: space-evenly;
    .quizzes {
      padding: 0;
      &_sliding {
        .quizzes_two {
          &_list {
            grid-template-columns: repeat(2, 220px);
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .quizzes_own {
    width: 100%;
    margin: 48 * $pr auto 0;
    display: block;
    padding-top: 0;

    .google_ad_main {
      width: 100%;
      height: auto;
      padding-top: 48 * $pr;
      .google_ad {
        width: 100%;
      }
    }
    .quizzes {
      width: 100%;
      height: 100%;
      padding: 0 24 * $pr 0;
      background-size: cover;
      h3 {
        font-size: 26 * $pr;
        line-height: 36 * $pr;
        text-align: center;
      }
      .h5_size {
        font-size: 26 * $pr;
        line-height: 36 * $pr;
      }
      &_sliding {
        width: 100%;
        padding: 16 * $pr 0 0;
        display: flex;
        .banner {
          display: none;
        }
        .swiper_list {
          display: block;
          margin: 0;
          .swiper {
            width: 100%;
            height: 100%;
            &__item {
              width: 100%;
              height: 100%;
              .banner_img {
                width: 100%;
                height: 295 * $pr;
                margin-bottom: 16 * $pr;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius: 12 * $pr;
                }
              }
              p {
                font-size: 16 * $pr;
                line-height: 22 * $pr;
                padding: 0 !important;
              }
            }
          }
          .swiper_pagination {
            display: block;
            text-align: center;
            padding: 15 * $pr 0 32 * $pr;
            :deep(swiper-pagination-bullet) {
              padding: 0 5px;
            }
          }
          :deep(.swiper-pagination-bullet) {
            width: 6 * $pr;
            height: 6 * $pr;
            margin-right: 8 * $pr;
            border-radius: 50%;
            position: relative;
            transition: transform 0.5s ease;
            &::before {
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background-color: #fff;
            }
          }
          :deep(.swiper-pagination-bullet-active) {
            border-color: #fff;
            transform: scale(1.2);
            &::before {
              background-color: #ffffff;
            }
          }
        }
        .quizzes_two {
          display: none;
        }
      }
      .button {
        width: 295 * $pr;
        height: 44 * $pr;
        border-radius: 42 * $pr;
        font-size: 16 * $pr;
        line-height: 22 * $pr;
        border: 1 * $pr solid #45454d;
        background: #fff;
        color: #000;
      }
    }
  }
}
</style>
