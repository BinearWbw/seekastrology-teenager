<template>
  <div class="star_sign">
    <div class="star_sign_item">
      <a class="list" v-for="(item, index) in sign" :key="index">
        <img class="imgs" :src="item.img" alt="" />
        <p class="title">{{ item.name }}</p>
        <p class="time">{{ item.times }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sign: [
        {
          name: 'Aries',
          times: 'Mar21 - Apr19',
          img: require('~/assets/img/zodiac/sign/aries.svg'),
        },
        {
          name: 'Taurus',
          times: 'Apr20 - May20',
          img: require('~/assets/img/zodiac/sign/taurus.svg'),
        },
        {
          name: 'Gemini',
          times: 'May21 - Jun20',
          img: require('~/assets/img/zodiac/sign/gemini.svg'),
        },
        {
          name: 'Cancer',
          times: 'Jun21 - Jul22',
          img: require('~/assets/img/zodiac/sign/cancer.svg'),
        },
        {
          name: 'Leo',
          times: 'Jul23 - Aug22',
          img: require('~/assets/img/zodiac/sign/leo.svg'),
        },
        {
          name: 'Virgo',
          times: 'Aug23 - Sep22',
          img: require('~/assets/img/zodiac/sign/virgo.svg'),
        },
        {
          name: 'Libra',
          times: 'Sep23 - Oct22',
          img: require('~/assets/img/zodiac/sign/libra.svg'),
        },
        {
          name: 'Scorpio',
          times: 'Oct23 - Nov21',
          img: require('~/assets/img/zodiac/sign/aries.svg'),
        },
        {
          name: 'Sagittarius',
          times: 'Nov22 - Dec21',
          img: require('~/assets/img/zodiac/sign/aries.svg'),
        },
        {
          name: 'Capricorn',
          times: 'Dec22 - Jan19',
          img: require('~/assets/img/zodiac/sign/aries.svg'),
        },
        {
          name: 'Aquarius',
          times: 'Jan20 - Feb18',
          img: require('~/assets/img/zodiac/sign/aries.svg'),
        },
        {
          name: 'Pisces',
          times: 'Feb19 - Mar20',
          img: require('~/assets/img/zodiac/sign/aries.svg'),
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.star_sign {
  width: 100%;
  padding: 24px 0;
  position: relative;
  &::before {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    top: 0;
    left: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50.52%,
      rgba(255, 255, 255, 0) 100%
    );
  }
  &::after {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50.52%,
      rgba(255, 255, 255, 0) 100%
    );
  }
  &_item {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(102px, 1fr));
    gap: 16px;
    .list {
      display: block;
      width: 102px;
      height: 102px;
      border-radius: 50%;
      padding: 17px 16px;
      background: rgba(0, 0, 0, 0.5);
      font-family: Rubik;
      text-align: center;
      font-style: normal;
      font-weight: 400;
      position: relative;
      transition: transform 0.3s ease-in-out;
      &:hover {
        transform: scale(1.1);
      }
      .imgs {
        width: 30px;
        height: 30px;
        object-fit: cover;
      }
      .title {
        color: #fff;
        font-size: 16px;
        line-height: 22px;
      }
      .time {
        color: rgba(255, 255, 255, 0.6);
        font-size: 12px;
        line-height: 16px;
        position: absolute;
        bottom: 17px;
        left: 13px;
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .star_sign {
    width: 100%;
    padding: 16 * $pr 0;
    position: relative;
    &::before {
      height: 1 * $pr;
    }
    &::after {
      height: 1 * $pr;
    }
    &_item {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16 * $pr 5 * $pr;
      .list {
        display: block;
        width: 111 * $pr;
        height: 111 * $pr;
        border-radius: 50%;
        padding: 21 * $pr 0;
        .imgs {
          width: 30 * $pr;
          height: 30 * $pr;
        }
        .title {
          color: #fff;
          font-size: 16 * $pr;
          line-height: 22 * $pr;
        }
        .time {
          font-size: 12 * $pr;
          line-height: 16 * $pr;
          width: 100%;
          text-align: center;
          bottom: 21 * $pr;
          left: 0;
        }
      }
    }
  }
}
</style>
