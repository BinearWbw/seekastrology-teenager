<template>
  <div class="tarots">
    <div class="title">Tarot</div>
    <div class="tarots_main">
      <div class="tarot_ai">
        <p class="title">AI tarot</p>
        <p class="title_i">online Reading</p>
        <p class="texts">Get an answer with actionable advice!</p>
        <a class="button_a" :href="`/tarot/${getCurrentRoute}`">
          Pick a Card and Get an Ansuer
        </a>
        <i class="imgs_bg"></i>
      </div>
      <div class="tarot_item">
        <a
          class="tarot_item_a"
          :href="`${item.link}${getCurrentRoute}`"
          v-for="(item, index) in tarotData"
          :key="index"
        >
          <div class="li">
            <div class="titley">{{ item.name }}</div>
            <img :src="item.imgUrl" alt="" />
            <div class="button">Draw Card</div>
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
      tarotData: [
        {
          name: 'Daily Card',
          imgUrl: require('../../assets/img/home/more/tarot1.png'),
          link: '/tarot/type/4/',
        },
        {
          name: 'Love Card',
          imgUrl: require('../../assets/img/home/more/tarot2.png'),
          link: '/tarot/type/1/',
        },
        {
          name: 'Yes or No Tarot',
          imgUrl: require('../../assets/img/home/more/tarot3.png'),
          link: '/developing/',
        },
        {
          name: 'Career Tarot',
          imgUrl: require('../../assets/img/home/more/tarot4.png'),
          link: '/tarot/type/2/',
        },
        {
          name: 'Universal Card',
          imgUrl: require('../../assets/img/home/more/tarot5.png'),
          link: '/tarot/type/3/',
        },
        {
          name: 'Tarot Card',
          imgUrl: require('../../assets/img/home/more/tarot6.png'),
          link: '/tarot/cards/',
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
.tarots {
  > .title {
    color: #fff;
    text-align: center;
    font-family: Cinzel Decorative;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    padding-bottom: 16px;
  }
  &_main {
    position: relative;
    display: flex;
    .tarot_ai {
      width: 338px;
      height: 200px;
      position: relative;
      border-radius: 16px;
      background: linear-gradient(
        257deg,
        rgba(151, 71, 255, 0.2) 0%,
        rgba(151, 71, 255, 0.7) 100%
      );
      padding: 32px 24px 0;
      z-index: 10;
      .title {
        color: #fff;
        font-family: Cinzel Decorative;
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 30px;
      }
      .title_i {
        color: #fff;
        font-family: Cinzel Decorative;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
      }
      .texts {
        color: #fff;
        font-family: 'Rubik';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        margin: 16px 0;
      }
      .button_a {
        display: inline-block;
        border-radius: 42px;
        background: #fff;
        color: #000;
        font-family: 'Rubik';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        padding: 8px 16px;
      }
      .imgs_bg {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 224px;
        height: 198px;
        background: url('../../assets/img/home/more/tarot_max.png') no-repeat;
        background-size: cover;
        z-index: -1;
      }
    }
    .tarot_item {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      padding-left: 16px;
      gap: 16px;
      &_a {
        display: block;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.5);
        transition: transform 0.3s ease-out;
        &:hover {
          transform: scale(1.1);
          .li {
            &::after {
              z-index: 1;
            }
            .button {
              opacity: 1;
              bottom: 20px;
            }
          }
        }
        .li {
          position: relative;
          width: 161px;
          padding: 24px;
          border-radius: 8px;
          overflow: hidden;
          &::after {
            position: absolute;
            content: '';
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0.9;
            background: linear-gradient(
              180deg,
              rgba(151, 71, 255, 0) 50%,
              rgba(151, 71, 255, 0.75) 100%
            );
            z-index: -1;
          }
          .titley {
            color: #fff;
            text-align: center;
            font-family: Rubik;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            padding: 0 20px 8px;
          }
          > img {
            width: 113px;
            height: 100px;
            object-fit: cover;
          }
          .button {
            width: 100px;
            height: 34px;
            position: absolute;
            left: 50%;
            bottom: 10px;
            transform: translateX(-50%);
            color: #000;
            font-family: Rubik;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
            background: #fff;
            padding: 8px 16px;
            border-radius: 42px;
            z-index: 3;
            opacity: 0;
            transition: bottom 0.3s ease-out, opacity 0.3s ease-out;
          }
        }
      }
    }
  }
}

@media (max-width: 1470px) {
  .tarots {
    &_main {
      display: flex;
      flex-direction: column;
      align-items: center;
      .tarot_ai {
        margin-bottom: 16px;
      }
    }
  }
}
@media (max-width: 1200px) {
  .tarots {
    &_main {
      .tarot_item {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding-left: 0;
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .tarots {
    > .title {
      font-size: 22 * $pr;
      line-height: 30 * $pr;
      padding-bottom: 16 * $pr;
    }
    &_main {
      position: relative;
      display: flex;
      .tarot_ai {
        width: 100%;
        height: auto;
        border-radius: 16 * $pr;
        margin-bottom: 16 * $pr;
        background: linear-gradient(
          257deg,
          rgba(151, 71, 255, 0.2) 0%,
          rgba(151, 71, 255, 0.7) 100%
        );
        padding: 32 * $pr 24 * $pr;
        z-index: 10;
        .title {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
        }
        .title_i {
          font-size: 18 * $pr;
          line-height: 24 * $pr;
        }
        .texts {
          font-size: 14 * $pr;
          line-height: 18 * $pr;
          margin: 16 * $pr 0;
        }
        .button_a {
          display: inline-block;
          border-radius: 42 * $pr;
          background: #fff;
          color: #000;
          font-family: 'Rubik';
          font-size: 14 * $pr;
          font-style: normal;
          font-weight: 400;
          line-height: 18 * $pr;
          padding: 8 * $pr 16 * $pr;
        }
        .imgs_bg {
          width: 220 * $pr;
          height: 198 * $pr;
        }
      }
      .tarot_item {
        width: 100%;
        flex: 1;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding-left: 0;
        gap: 16 * $pr;
        &_a {
          display: block;
          border-radius: 8 * $pr;
          &:hover {
            transform: scale(1);
            .li {
              &::after {
                z-index: -1;
              }
              .button {
                opacity: 1;
                bottom: 16 * $pr;
              }
            }
          }
          .li {
            position: relative;
            width: auto;
            padding: 16 * $pr;
            border-radius: 8 * $pr;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            .titley {
              font-size: 16 * $pr;
              line-height: 22 * $pr;
              padding: 0 30 * $pr 8 * $pr;
            }
            > img {
              width: 132 * $pr;
              height: 116 * $pr;
              object-fit: cover;
            }
            .button {
              width: 100 * $pr;
              height: 34 * $pr;
              bottom: 16 * $pr;
              font-size: 14 * $pr;
              line-height: 18 * $pr;
              padding: 8 * $pr 16 * $pr;
              border-radius: 42 * $pr;
              z-index: 3;
              opacity: 1;
            }
          }
        }
      }
    }
  }
}
</style>
