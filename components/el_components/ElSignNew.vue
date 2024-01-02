<template>
  <div class="star_sign">
    <div class="star_sign_item">
      <a
        class="list"
        :href="`/chinazodiac/details/${item.id}/`"
        v-for="item in sign"
        :key="item.id"
      >
        <div class="imgs">
          <img :src="item.img" alt="item.name" />
        </div>
        <p class="title">{{ item.name }}</p>
        <!-- <p class="time">{{ item.times }}</p> -->
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
          name: 'Rat',
          id: '1',
          img: require('~/assets/img/zodiac/chin/chin_1.svg'),
        },
        {
          name: 'Ox',
          id: '2',
          img: require('~/assets/img/zodiac/chin/chin_2.svg'),
        },
        {
          name: 'Tiger',
          id: '3',
          img: require('~/assets/img/zodiac/chin/chin_3.svg'),
        },
        {
          name: 'Rabbit',
          id: '4',
          img: require('~/assets/img/zodiac/chin/chin_4.svg'),
        },
        {
          name: 'Dragon',
          id: '5',
          img: require('~/assets/img/zodiac/chin/chin_5.svg'),
        },
        {
          name: 'Snake',
          id: '6',
          img: require('~/assets/img/zodiac/chin/chin_6.svg'),
        },
        {
          name: 'Horse',
          id: '7',
          img: require('~/assets/img/zodiac/chin/chin_7.svg'),
        },
        {
          name: 'Sheep',
          id: '8',
          img: require('~/assets/img/zodiac/chin/chin_8.svg'),
        },
        {
          name: 'Monkey',
          id: '9',
          img: require('~/assets/img/zodiac/chin/chin_9.svg'),
        },
        {
          name: 'Rooster',
          id: '10',
          img: require('~/assets/img/zodiac/chin/chin_10.svg'),
        },
        {
          name: 'Dog',
          id: '11',
          img: require('~/assets/img/zodiac/chin/chin_11.svg'),
        },
        {
          name: 'Pig',
          id: '12',
          img: require('~/assets/img/zodiac/chin/chin_12.svg'),
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
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 102px;
      height: 102px;
      border-radius: 50%;
      padding: 10px 0;
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
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .title {
        color: #fff;
        font-size: 16px;
        line-height: 22px;
        overflow: hidden;
        white-space: normal;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
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
        width: 111 * $pr;
        height: 111 * $pr;
        border-radius: 50%;
        padding: 14 * $pr 0;
        .imgs {
          width: 60 * $pr;
          height: 60 * $pr;
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
