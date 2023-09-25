<template>
  <div class="explore">
    <div class="explore_main">
      <p class="title">Explore More</p>
      <div class="explore_main_tag" data-aos="zoom-out">
        <div
          class="tag_list"
          v-for="(item, index) in moreData"
          :key="index"
          v-show="isHorroscopePage(index)"
        >
          <a :href="`${item.path}`" class="tag_list_aos" id="EXPLORE">
            <div class="tag_list_aos_round">
              <img :src="item.imgUrl" alt="item.name" />
            </div>
            <p>{{ item.name }}</p>
            <!-- <p class="p_h5">{{ addTag(item.name) }}</p> -->
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'explore_more',
  data() {
    return {
      moreData: [
        {
          name: 'Daily horoscope',
          path: '/horroscope/aries-1/',
          imgUrl: require('~/assets/img/horroscope/today.svg'),
        },
        {
          name: 'Love',
          path: '/horroscope/aries-1-1/',
          imgUrl: require('~/assets/img/horroscope/love_sign.svg'),
        },
        {
          name: 'Health',
          path: '/horroscope/aries-2-1/',
          imgUrl: require('~/assets/img/horroscope/healthy_sign.svg'),
        },
        {
          name: 'Career',
          path: '/horroscope/aries-3-1/',
          imgUrl: require('~/assets/img/horroscope/cupational_sign.svg'),
        },
        {
          name: 'Money',
          path: '/horroscope/aries-4-1/',
          imgUrl: require('~/assets/img/horroscope/wealth_sign.svg'),
        },
        {
          name: '2023 horoscope',
          path: '/horroscope/aries-5-1/',
          imgUrl: require('~/assets/img/horroscope/2023.svg'),
        },
        {
          name: 'Zodiac Signs',
          path: '/zodiac/',
          imgUrl: require('~/assets/img/horroscope/sign_all.svg'),
        },
        {
          name: 'Ai tarot',
          path: '/tarot/',
          imgUrl: require('~/assets/img/horroscope/today_tarot.svg'),
        },
        {
          name: 'Daily tarot',
          path: '/tarot/type/4/',
          imgUrl: require('~/assets/img/horroscope/today_tarot.svg'),
        },
        {
          name: 'Universal tarot',
          path: '/tarot/type/3/',
          imgUrl: require('~/assets/img/horroscope/today_tarot.svg'),
        },
        {
          name: 'Compatibility',
          path: '/astrology/',
          imgUrl: require('~/assets/img/horroscope/love_pairing.svg'),
        },
        {
          name: 'Quizs',
          path: '/test/',
          imgUrl: require('~/assets/img/horroscope/free_test.svg'),
        },
        {
          name: 'Articles',
          path: '/resources/',
          imgUrl: require('~/assets/img/horroscope/article.svg'),
        },
      ],
    }
  },

  methods: {
    addTag(str) {
      const strof = str.replace(/\s/, '\n')
      return strof
    },
    isHorroscopePage(index) {
      return !(
        this.$route.path.includes('horroscope') &&
        (index === 0 || index === 5)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.explore {
  width: 100%;
  &_main {
    .title {
      color: #fff;
      text-align: center;
      font-family: 'Cinzel Decorative';
      font-size: 36px;
      font-style: normal;
      font-weight: 700;
      line-height: 48px;
    }
    &_tag {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;
      .tag_list {
        cursor: pointer;
        border-radius: 44px;
        margin-right: 16px;
        margin-top: 16px;
        &:nth-child(11) {
          .tag_list_aos {
            background: #ed6ddf;
          }
        }
        &:nth-child(12) {
          .tag_list_aos {
            background: #6aa6ff;
          }
        }
        &:last-child {
          .tag_list_aos {
            background: #f09968;
          }
        }
        .isvisible {
          display: none;
        }
        &_aos {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px 16px;
          border-radius: 44px;
          background: var(--9747-ff, #9747ff);
          transition: transform 0.3s ease-in-out;
          &:hover {
            transform: scale(1.1);
            p {
              color: #fff;
            }
          }

          &_round {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            fill: #d9d9d9;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          p {
            color: #fff;
            font-family: 'Rubik';
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            padding-left: 6px;
            &.p_h5 {
              display: none;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1435px) {
  .explore {
    width: 100%;
  }
}

@media (max-width: 1050px) {
  .explore {
    width: 100%;
    &_main {
      &_tag {
        padding: 0 30px;
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .explore {
    width: 100%;
    &_main {
      .title {
        font-size: 26 * $pr;
        line-height: 36 * $pr;
        padding-bottom: 16 * $pr;
      }
      &_tag {
        justify-content: start;
        padding: 0;
        .tag_list {
          padding: 5 * $pr 2.5 * $pr;
          border-radius: 44 * $pr;
          margin-right: 0;
          margin-top: 0;
          &_aos {
            width: auto;
            padding: 4 * $pr 10 * $pr;
            border-radius: 44 * $pr;

            background: var(--9747-ff, #9747ff);
            &_round {
              min-width: 24 * $pr;
              max-width: 24 * $pr;
              height: 24 * $pr;
            }
            p {
              font-size: 12 * $pr;
              line-height: 14 * $pr;
              padding-left: 6 * $pr;
              color: #fff;
              &.p_pc {
                display: none;
              }
              &.p_h5 {
                display: block;
                white-space: pre;
              }
            }
          }
        }
      }
    }
  }
}
</style>
