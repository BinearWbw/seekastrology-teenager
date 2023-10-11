<!--
 * @Date: 2023-06-06 14:21:49
 * @LastEditors: tian 249682049@qq.com
 * @LastEditTime: 2023-06-19 11:17:49
 * @FilePath: /seekastrology/components/tarot/MoreTarot.vue
 * @Description: 
-->
<template>
  <div class="container">
    <div class="title">
      {{
        $route.path.includes('/tarot') ? 'More Tarot Readings' : 'Tarot Reading'
      }}
    </div>
    <div class="more-tarot">
      <div class="more-tarot-items" v-show="type != 4">
        <a :href="`/tarot/type/${4}/`" class="link">
          <img src="~/assets/img/tarot/day.webp" alt="day" />
          <p class="item-title">Daily Tarot</p>
          <p class="item-sub-title">
            What does the future have in store for you? Now is time to discover
            the day’s possibilities!
          </p>
          <button class="button">Read More</button>
        </a>
      </div>

      <div class="more-tarot-items" v-show="type != 1">
        <a :href="`/tarot/type/${1}/`" class="link">
          <img src="~/assets/img/tarot/love.webp" alt="love" />
          <p class="item-title">Love Tarot Reading</p>
          <p class="item-sub-title">
            Receive personalized advice for your romantic dilemmas
          </p>
          <button class="button">Read More</button>
        </a>
      </div>

      <div class="more-tarot-items" v-show="type != 2">
        <a :href="`/tarot/type/${2}/`" class="link">
          <img src="~/assets/img/tarot/rich.webp" alt="rich" />
          <p class="item-title">Career Tarot Reading</p>
          <p class="item-sub-title">
            This free career Tarot reading is here to help you find success
          </p>
          <button class="button">Read More</button>
        </a>
      </div>

      <div class="more-tarot-items" v-show="type != 3">
        <a :href="`/tarot/type/${3}/`" class="link">
          <img src="~/assets/img/tarot/general.webp" alt="general" />
          <p class="item-title">Universal Tarot Reading</p>
          <p class="item-sub-title">
            Get the answers you need with this 3-card Tarot spread
          </p>
          <button class="button">Read More</button>
        </a>
      </div>

      <div class="more-tarot-items" v-show="type != 0">
        <a :href="`/tarot/type/${3}/`" class="link">
          <img src="~/assets/img/tarot/ai_tarot.webp" alt="general" />
          <p class="item-title">Ai Tarot</p>
          <p class="item-sub-title">
            Welcome to the seeastrology tarot chatbot! ✨ Please choose a card
            that resonates with you the most.
          </p>
          <button class="button">Read More</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoreTarot',
  props: {
    type: {
      type: [Number, String],
      default: '0',
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.title {
  font-family: 'Cinzel Decorative';
  font-style: normal;
  font-weight: 700;
  font-size: 46px;
  line-height: 64px;
  text-align: center;
}
.more-tarot {
  text-align: center;
  display: flex;
  justify-content: center;
  grid-gap: 16px;
  max-width: 1400px;
  margin: 34px auto 48px;
  flex-wrap: wrap;
  .more-tarot-items {
    width: 338px;
    justify-self: center;
    padding: 16px 16px 40px;
    box-sizing: border-box;
    background: linear-gradient(
      0.13deg,
      #08070f 0.11%,
      rgba(6, 5, 6, 0) 99.89%
    );
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(4px);
    border-radius: 6px;
    -webkit-transition: transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: translateY(-20px);
      .button {
        color: #000;
        background-color: #fff;
      }
    }
    .link {
      display: block;
      width: 100%;
      height: 100%;
    }
    img {
      // width: 100%;
      // height: 190px;
      width: 306px;
      height: 174px;
      object-fit: cover;
    }
  }
  .item-title {
    font-family: 'Rubik';
    font-size: 22px;
    line-height: 30px;
    color: #ffffff;
    margin-top: 16px;
  }
  .item-sub-title {
    margin-top: 8px;
    font-family: 'Rubik';
    font-size: 14px;
    line-height: 18px;
    color: rgba(255, 255, 255, 0.6);
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.button {
  margin-top: 24px;
  width: 124px;
  height: 32px;
  border: 1px solid #45454d;
  border-radius: 42px;
  font-family: 'Rubik';
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  line-height: 18px;
  -webkit-transition: background-color 0.3s, -webkit-color 0.3s;
  transition: background-color 0.3s, color 0.3s;
}

@media (max-width: 1470px) {
  .more-tarot {
    padding: 0 50px;
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .container {
    padding: 16 * $pr;
  }
  .title {
    font-family: 'Cinzel Decorative';
    font-style: normal;
    font-weight: 700;
    font-size: 26 * $pr;
    line-height: 36 * $pr;
    text-align: center;
  }
  .more-tarot {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100%);
    margin: 16 * $pr auto 0;
    padding: 0;
    .more-tarot-items {
      width: 100%;
      margin-left: 0;
      padding: 16 * $pr 16 * $pr 24 * $pr;
      border-radius: 6 * $pr;
      img {
        // height: 180px;
        width: 100%;
        height: 127 * $pr;
      }
      .item-title {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400 * $pr;
        font-size: 22 * $pr;
        line-height: 30 * $pr;
        margin-top: 16 * $pr;
      }
      .item-sub-title {
        font-size: 14 * $pr;
        line-height: 18 * $pr;
        margin-top: 8 * $pr;
      }
      .button {
        width: 220 * $pr;
        height: 32 * $pr;
        border-radius: 42 * $pr;
        font-size: 14 * $pr;
        line-height: 18 * $pr;
        margin-top: 24 * $pr;
      }
    }
    .link:not(:first-child) {
      margin-left: 0;
      margin-top: 24 * $pr;
    }
  }
}
</style>
