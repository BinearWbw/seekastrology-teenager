<template>
  <div class="explore">
    <div class="explore_main">
      <p class="title">Explore More</p>
      <div class="explore_main_tag" data-aos="zoom-out">
        <div class="tag_list" v-for="(item, index) in moreData" :key="index">
          <a
            :href="`${getIntersperseUrl + item.path}`"
            class="tag_list_aos"
            id="EXPLORE"
          >
            <div class="tag_list_aos_round">
              <img :src="item.imgUrl" alt="#" />
            </div>
            <p class="p_pc">{{ item.name }}</p>
            <p class="p_h5">{{ addTag(item.name) }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'explore_more',
  data() {
    return {
      moreData: [
        {
          name: "Today's Horoscope",
          path: '/horroscope/aries-1/',
          imgUrl: require('~/assets/img/horroscope/today.svg'),
        },
        {
          name: 'Love Horoscope',
          path: '/horroscope/aries-1-1/',
          imgUrl: require('~/assets/img/horroscope/love_sign.svg'),
        },
        {
          name: 'Health Horoscope',
          path: '/horroscope/aries-2-1/',
          imgUrl: require('~/assets/img/horroscope/healthy_sign.svg'),
        },
        {
          name: 'Career Horoscope',
          path: '/horroscope/aries-3-1/',
          imgUrl: require('~/assets/img/horroscope/cupational_sign.svg'),
        },
        {
          name: 'Money Horoscope',
          path: '/horroscope/aries-4-1/',
          imgUrl: require('~/assets/img/horroscope/wealth_sign.svg'),
        },
        {
          name: '2023 Horoscope',
          path: '/horroscope/aries-5-1/',
          imgUrl: require('~/assets/img/horroscope/2023.svg'),
        },
        {
          name: 'Zodiac Signs',
          path: '/zodiac/',
          imgUrl: require('~/assets/img/horroscope/sign_all.svg'),
        },
        {
          name: 'The daily tarot',
          path: '/tarot/',
          imgUrl: require('~/assets/img/horroscope/today_tarot.svg'),
        },
        {
          name: 'Love Matcher',
          path: '/astrology/',
          imgUrl: require('~/assets/img/horroscope/love_pairing.svg'),
        },
        {
          name: 'Free Quizzes',
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
  computed: {
    ...mapGetters(['getIntersperseUrl']),
  },
  methods: {
    addTag(str) {
      const strof = str.replace(/\s/, '\n')
      return strof
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
        &:nth-child(6),
        &:last-child {
          margin-right: 0;
        }
        &_aos {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px 16px;
          border-radius: 44px;
          background: rgba(255, 255, 255, 0.08);
          &:hover {
            background: var(--9747-ff, #9747ff);
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
            color: rgba(255, 255, 255, 0.6);
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
    &_main {
      &_tag {
        .tag_list {
          &:nth-child(5),
          &:last-child {
            margin-right: 0;
          }
          &:nth-child(6) {
            margin-right: 16px;
          }
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .explore {
    width: 100%;
    &_main {
      &_tag {
        .tag_list {
          &:nth-child(4),
          &:nth-child(9),
          &:last-child {
            margin-right: 0;
          }
          &:nth-child(5) {
            margin-right: 16px;
          }
        }
      }
    }
  }
}

@media (max-width: 1050px) {
  .explore {
    width: 100%;
    &_main {
      &_tag {
        padding: 0 30px;
        .tag_list {
          &:last-child {
            margin-right: 0;
          }
          &:nth-child(4),
          &:nth-child(9),
          &:nth-child(5) {
            margin-right: 16px;
          }
        }
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
        // display: grid;
        justify-content: start;
        // overflow-x: scroll;
        // grid-template-columns: repeat(6, 1fr);
        // height: 81 * $pr;
        // gap: 10 * $pr 5 * $pr;
        padding: 0;
        .tag_list {
          padding: 5 * $pr 2.5 * $pr;
          border-radius: 44 * $pr;
          margin-right: 0;
          margin-top: 0;
          &:nth-child(4),
          &:nth-child(6),
          &:nth-child(9),
          &:nth-child(5) {
            margin-right: 0;
          }
          &_aos {
            width: auto;
            // padding: 4 * $pr 12 * $pr;
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
