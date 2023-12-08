<template>
  <div class="free">
    <div class="free_title">More Free Astrology Services</div>
    <div class="free_main">
      <a
        :href="`${item.url}${getCurrentRoute}`"
        class="sign"
        v-for="(item, index) in signData"
        :key="index"
      >
        <div class="sign_imgs">
          <img :src="item.imgs" alt="" />
        </div>
        <div class="sign_title">{{ item.name }}</div>
        <div class="sign_btn">GO To Now</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signData: [
        {
          name: 'Horoscopes',
          imgs: require('~/assets/img/home/more/more1.svg'),
          url: '/horroscope/aries-1/',
        },
        {
          name: 'Zodiac Signs',
          imgs: require('~/assets/img/home/more/more2.svg'),
          url: '/zodiac/',
        },
        {
          name: 'Love Compatibility',
          imgs: require('~/assets/img/home/more/more3.svg'),
          url: '/astrology/',
        },
        {
          name: 'Palm Reading',
          imgs: require('~/assets/img/home/more/more4.svg'),
          url: '',
        },
        {
          name: 'Ask the Genie',
          imgs: require('~/assets/img/home/more/more5.svg'),
          url: '',
        },
        {
          name: 'Chinese Signs',
          imgs: require('~/assets/img/home/more/more6.svg'),
          url: '',
        },
        {
          name: 'Ai Tarot',
          imgs: require('~/assets/img/home/more/more7.svg'),
          url: '/tarot/',
        },
        {
          name: 'Numerology Calculator',
          imgs: require('~/assets/img/home/more/more8.svg'),
          url: '',
        },
        {
          name: 'Kundli Matching',
          imgs: require('~/assets/img/home/more/more9.svg'),
          url: '',
        },
        {
          name: 'Quizzes',
          imgs: require('~/assets/img/home/more/more10.svg'),
          url: '/test/',
        },
        {
          name: 'Articles',
          imgs: require('~/assets/img/home/more/more11.svg'),
          url: '/resources/',
        },
        {
          name: 'Birth Chart',
          imgs: require('~/assets/img/home/more/more12.svg'),
          url: '/birthchart/',
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
.free {
  &_title {
    color: #fff;
    text-align: center;
    font-family: Cinzel Decorative;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
  }
  &_main {
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 16px;

    .sign {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      width: 161px;
      height: 161px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.5);
      position: relative;
      padding: 30px 20px 0;
      transition: transform 0.3s ease-out;

      &:nth-last-child(-n + 4) {
        display: none;
      }

      &_imgs {
        width: 49px;
        height: 49px;
        margin-bottom: 5px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &_title {
        color: #fff;
        text-align: center;
        font-family: Rubik;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
      }

      &_btn {
        position: absolute;
        bottom: 35px;
        color: #000;
        font-family: Rubik;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        border-radius: 42px;
        background: #fff;
        padding: 8px 16px;
        z-index: 3;
        opacity: 0;
        transition: opacity 0.3s ease-out;
      }
      &:hover {
        transform: scale(1.15);
        &::after {
          position: absolute;
          display: inline-block;
          content: '';
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: url('../../assets/img/home/more/hover.svg') no-repeat;
          background-size: 100%;
          z-index: 1;
        }
        .sign_btn {
          opacity: 1;
        }
      }
    }
  }
}

@media (max-width: 1500px) {
  .free {
    &_main {
      margin-top: 16px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      place-items: center;
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .free {
    &_title {
      display: none;
    }
    &_main {
      margin-top: 16px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      place-items: center;
      gap: 16 * $pr 5 * $pr;
      .sign {
        width: 111 * $pr;
        height: 111 * $pr;
        border-radius: 50%;
        padding: 20 * $pr 8 * $pr 0;
        transition: transform 0.3s ease-out;

        &:nth-last-child(-n + 4) {
          display: flex;
        }

        &_imgs {
          width: 33 * $pr;
          height: 33 * $pr;
          margin-bottom: 3 * $pr;
        }
        &_title {
          font-size: 14 * $pr;
          line-height: 18 * $pr;
        }

        &_btn {
          display: none;
        }
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
