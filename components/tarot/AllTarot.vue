<!--
 * @Date: 2023-06-06 14:21:49
 * @LastEditors: tian 249682049@qq.com
 * @LastEditTime: 2023-06-20 16:44:54
 * @FilePath: /seekastrology/components/tarot/AllTarot.vue
 * @Description: 
-->
<template>
  <div class="cards-box">
    <div class="card-wrapper">
      <div class="card-title">
        <p class="title_h5">Tarot Cared</p>
        The <span class="number">78</span> Tarot cards are divided into two main
        sections, the Major Arcana and Minor Arcana, and further into four
        suits:
      </div>
      <div class="card-righter">
        <a :href="`/tarot/cards/${getCurrentRoute}`"
          ><button class="button">View All</button>
        </a>
      </div>
    </div>
    <ul class="card-list">
      <li class="card-items">
        <a :href="`/tarot/cards/${getCurrentRoute}`">
          <img
            src="~/assets/img/tarot/card0.webp"
            alt=""
            class="card-item-img"
          />
          <div class="card-text">The Fool</div>
        </a>
      </li>
      <li class="card-items">
        <a :href="`/tarot/cards/${getCurrentRoute}`">
          <img
            src="~/assets/img/tarot/card1.webp"
            alt=""
            class="card-item-img"
          />
          <div class="card-text">The Magician</div>
        </a>
      </li>
      <li class="card-items">
        <a :href="`/tarot/cards/${getCurrentRoute}`">
          <img
            src="~/assets/img/tarot/card2.webp"
            alt=""
            class="card-item-img"
          />
          <div class="card-text">The High Priestess</div>
        </a>
      </li>
      <li class="card-items">
        <a :href="`/tarot/cards/${getCurrentRoute}`">
          <img
            src="~/assets/img/tarot/card3.webp"
            alt=""
            class="card-item-img"
          />
          <div class="card-text">The Empress</div>
        </a>
      </li>
      <li class="card-items">
        <a :href="`/tarot/cards/${getCurrentRoute}`">
          <img
            src="~/assets/img/tarot/card4.webp"
            alt=""
            class="card-item-img"
          />
          <div class="card-text">The Emperor</div>
        </a>
      </li>
    </ul>
    <ul class="card-list-mobile">
      <li class="list-mobile">
        <a :href="`/tarot/cards/${getCurrentRoute}`">
          <img
            src="~/assets/img/tarot/card0.webp"
            alt=""
            class="list-mobile-img"
          />
        </a>
      </li>
      <li class="list-mobile">
        <a :href="`/tarot/cards/${getCurrentRoute}`">
          <img
            src="~/assets/img/tarot/card1.webp"
            alt=""
            class="list-mobile-img"
          />
        </a>
      </li>
      <li class="list-mobile">
        <a :href="`/tarot/cards/${getCurrentRoute}`">
          <img
            src="~/assets/img/tarot/card2.webp"
            alt=""
            class="list-mobile-img"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AllTarot',
  data() {
    return {}
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
$block: 220px;
$spacing: 75px;
.cards-box {
  padding-top: 96px;
  background-image: url('~assets/img/tarot/card_bg.webp');
  background-size: 100%;
  background-repeat: no-repeat;
  margin-top: 48px;
  .card-wrapper {
    display: flex;
    width: 1400px;
    margin: 0 auto;
    // padding: 0 10px;
    box-sizing: border-box;
    // justify-content: space-between;
    // .button {
    //   margin-left: 315px;
    // }
    .card-title {
      font-family: 'Cinzel Decorative';
      font-style: normal;
      font-weight: 700;
      font-size: 26px;
      line-height: 36px;
      width: 760px;
      .number {
        font-size: 40px;
      }
      .title_h5 {
        display: none;
      }
    }
    .card-righter {
      flex: 1;
      a {
        display: block;
        width: 220px;
        height: 44px;
        margin-left: 134px;
        margin-top: 18px;
        .button {
          width: 220px;
          height: 44px;
          border: 1px solid #45454d;
          border-radius: 42px;
          font-family: 'Rubik';
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          line-height: 18px;
          -webkit-transition: background-color 0.3s, -webkit-color 0.3s;
          transition: background-color 0.3s, color 0.3s;
          &:hover {
            color: #000;
            background-color: #fff;
          }
        }
      }
    }
  }

  .card-list {
    // max-width: 1400px;
    // margin: 60px auto 0;
    display: grid;
    grid-gap: 75px;
    grid-template-columns: repeat(5, 220px);
    justify-content: center;
    text-align: center;
    margin-top: 60px;
    .card-items {
      -webkit-transition: transform 0.3s ease-in-out;
      transition: transform 0.3s ease-in-out;
      &:hover {
        transform: translateY(-20px);
      }
    }
    .card-item-img {
      height: 440px;
      width: 100%;
      border-radius: 12px;
    }
    .card-text {
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 400;
      font-size: 22px;
      line-height: 30px;
      color: rgba(255, 255, 255, 0.6);
      margin-top: 16px;
    }
  }
  .card-list-mobile {
    display: none;
  }
}

@media (max-width: (5 * $block + 4 * $spacing + 20px)) {
  .cards-box {
    padding-top: 30px;
    .card-wrapper {
      width: 4 * $block + 3 * 45px;
    }
    .card-list {
      grid-template-columns: repeat(4, 220px);
      grid-gap: 45px;
    }
  }
}
@media (max-width: (4 * $block + 3 * $spacing + 20px)) {
  .cards-box {
    padding-top: 10px;
    .card-wrapper {
      width: 3 * $block + 2 * 45px;
      .card-title {
        font-size: 16px;
        width: 100%;
      }
    }
    .card-list {
      margin-top: 10px;
      grid-template-columns: repeat(3, 220px);
    }
  }
}
@media (max-width: (3 * $block + 2 * $spacing + 20px)) {
  .cards-box {
    .card-wrapper {
      width: 2 * $block + 1 * $spacing;
      .card-title {
        font-size: 14px;
        .number {
          font-size: 30px;
        }
      }
      .card-righter {
        align-self: center;
        a {
          margin-left: 0;
        }
      }
    }
    .card-list {
      grid-template-columns: repeat(2, 220px);
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .cards-box {
    background: url('~assets/img/tarot/card_bg_mobile.webp') no-repeat;
    // background-position: center -32 * $pr;
    background-size: 100%;
    margin-left: -16 * $pr;
    margin-right: -16 * $pr;
    height: auto;
    padding: 0;
    margin: 48 * $pr 0;
    .card-wrapper {
      width: 100%;
      flex-direction: column;
      align-items: center;

      .card-title {
        margin-top: 28 * $pr;
        font-family: 'Rubik';
        width: 295 * $pr;
        font-weight: 400;
        font-size: 22 * $pr;
        line-height: 30 * $pr;
        text-align: center;
        color: rgba(255, 255, 255, 0.6);

        .number {
          font-size: 26 * $pr;
          font-family: 'Cinzel Decorative';
          font-style: normal;
          font-weight: 700;
          line-height: 30px;
          color: #fff;
        }
        .title_h5 {
          display: block;
          padding-bottom: 16 * $pr;
          color: #fff;
          text-align: center;
          font-family: 'Cinzel Decorative';
          font-size: 26 * $pr;
          font-style: normal;
          font-weight: 700;
          line-height: 36 * $pr;
        }
      }
      .card-righter {
        a {
          width: 220 * $pr;
          height: 44 * $pr;
          .button {
            width: 220 * $pr;
            height: 44 * $pr;
            font-size: 16 * $pr;
            line-height: 22 * $pr;
          }
        }
      }
      .button {
        margin-left: 0;
      }
    }
    .card-title {
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 400;
      font-size: 22 * $pr;
      line-height: 30 * $pr;
      text-align: center;
    }
    .card-list {
      display: none;
    }
    .card-list-mobile {
      display: flex;
      justify-content: center;
      transform: translateY(40px);
      background-image: url('~assets/img/tarot/card_bg_list.webp');
      background-size: 100%;
      background-repeat: no-repeat;
      .list-mobile {
        width: 114 * $pr;
        border-radius: 10 * $pr;
        overflow: hidden;
      }
      .list-mobile:nth-child(1) {
        transform: translateX(50%) rotate(-5deg);
      }
      .list-mobile:nth-child(2) {
        transform: translateY(-16px) rotate(7deg);
      }
      .list-mobile:nth-child(3) {
        transform: translate(-50%, 16px) rotate(15deg);
      }
      .list-mobile-img {
        width: 100%;
      }
    }
  }
}
</style>
