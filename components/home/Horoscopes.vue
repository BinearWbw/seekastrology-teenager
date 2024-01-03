<template>
  <div class="horo">
    <div class="horo_main">
      <div class="title">Horoscopes</div>
      <div class="itmes">
        <a
          :href="`${item.path}${getCurrentRoute}`"
          class="itmes_a"
          v-for="(item, index) in horoData"
          :key="index"
        >
          <div class="bos">
            <div class="imgs">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="bos_li">
              <p>{{ item.name }}</p>
              <span>Read more ></span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      horoData: [
        {
          name: 'Daily Horoscope',
          path: '/horroscope/aries-1/',
          imgUrl: require('~/assets/img/horroscope/today.svg'),
        },
        {
          name: '2024 Horoscope',
          path: '/horroscope/aries-5-1/',
          imgUrl: require('~/assets/img/horroscope/2023.svg'),
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
          name: 'Teenager Horoscope',
          path: '/teenager/aries-1/',
          imgUrl: require('~/assets/img/horroscope/teen.svg'),
        },
        {
          name: 'Pet Horoscope',
          path: '/petsign/aries-1/',
          imgUrl: require('~/assets/img/horroscope/pet.svg'),
        },
      ],
    }
  },
  computed: {
    getCurrentRoute() {
      return this.$route.path === '/' ? '?from=home' : ''
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.horo {
  width: 100%;
  &_main {
    width: 100%;
    .title {
      color: #fff;
      text-align: center;
      font-family: Cinzel Decorative;
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: 30px;
    }
    .itmes {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      padding-top: 16px;
      &_a {
        display: block;
        border-radius: 16px;
        background: #9747ff;
        &:hover {
          background: #8840e6;
        }
        .bos {
          display: flex;
          padding: 16px 24px;
          align-items: center;
          max-width: 338px;
          .imgs {
            width: 36px;
            height: 36px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .bos_li {
            flex: 1;
            padding-left: 16px;
            > p {
              color: #fff;
              font-family: Rubik;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
            }
            > span {
              display: inline-block;
              color: #ffda8b;
              font-family: Rubik;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 18px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1250px) {
  .horo {
    width: 100%;
    &_main {
      width: 100%;
      .title {
        color: #fff;
        text-align: center;
        font-family: Cinzel Decorative;
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 30px;
      }
      .itmes {
        display: grid;
        grid-template-columns: repeat(2, 338px);
        justify-content: center;
        gap: 16px;
        padding-top: 16px;
        &_a {
          display: block;
          border-radius: 16px;
          background: #9747ff;
          &:hover {
            background: #8840e6;
          }
          .bos {
            display: flex;
            padding: 16px 24px;
            align-items: center;
            max-width: auto;
            .imgs {
              width: 36px;
              height: 36px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .bos_li {
              flex: 1;
              padding-left: 16px;
              > p {
                color: #fff;
                font-family: Rubik;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px;
              }
              > span {
                display: inline-block;
                color: #ffda8b;
                font-family: Rubik;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 18px;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .horo {
    &_main {
      .title {
        font-size: 22 * $pr;
        line-height: 30 * $pr;
      }
      .itmes {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8 * $pr;
        padding-top: 8 * $pr;
        &_a {
          display: block;
          border-radius: 16 * $pr;
          .bos {
            display: flex;
            padding: 16 * $pr;
            .imgs {
              width: 36 * $pr;
              height: 36 * $pr;
            }
            .bos_li {
              flex: 1;
              padding-left: 8 * $pr;
              > p {
                font-size: 14 * $pr;
                line-height: 18 * $pr;
              }
              > span {
                display: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
