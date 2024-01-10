<template>
  <div>
    <div class="tarot-container">
      <div class="title">{{ titleText[type] || '' }}</div>
      <div class="tarot-section">
        <div class="tarot-box">
          <tarot-play :type="type" ref="play"></tarot-play>
        </div>
      </div>
      <div class="introduce-box">
        <div class="intro">
          <div class="intro-title">
            {{ textObj[type] && textObj[type].title }}
          </div>
          <div
            class="intro-content"
            v-html="textObj[type] && textObj[type].desc"
          ></div>
        </div>
      </div>
      <google-ad class="ad-box_row mt_80" id="6755169246" />
      <more-tarot class="el_more" :type="type"></more-tarot>
    </div>
    <home-your-choice class="el_choice"></home-your-choice>
    <div class="el_pop">
      <home-pop-articles></home-pop-articles>
    </div>
  </div>
</template>

<script>
import MoreTarot from '../../../components/tarot/MoreTarot.vue'
import TarotPlay from '../../../components/tarot/TarotPlay.vue'
export default {
  name: 'type',
  components: {
    MoreTarot,
    TarotPlay,
  },
  watch: {
    $route(to, from) {
      if (to.query.type != from.query.type) {
        window && window.scrollTo(0, 0)
        this.$refs.play && this.$refs.play.resetData()
        this.type = to.query.type
      }
    },
  },
  data() {
    return {
      type: null,
      titleText: {
        1: 'Love Tarot Reading',
        2: 'Tarot Career Reading',
        3: 'Universal Tarot Reading',
        4: 'Choose 1 Cards From The Deck Below:',
        5: 'Choose 1 Cards From The Deck Below:',
      },
      textObj: {
        1: {
          title: 'About The Love Tarot Reading',
          desc: "When you have a problem in your love life -- no matter how simple or complex it is -- it has a way of taking over everything! You can't think straight, everything about your circumstances feels frustrating, and you're confused about your next steps. Fortunately, our Free Love Tarot Reading provides the help you need by offering personalized guidance for your situation!<br/>This love Tarot spread is perfect for those moments when you're searching for answers about your love life. Based on the popular Celtic Cross spread, this 3-card reading gets to the heart of the matter to help you better understand the specific challenges you are facing and the ways your circumstances can be helped or hurt. Each position in this free online love Tarot reading offers just the right amount of insight, making it easy to understand and act on.<br />Don't wait for your romantic situation to change itself! Start creating the romantic future you deserve with a Free Love Tarot Reading NOW!",
        },
        2: {
          title: 'About The Career Tarot Reading',
          desc: "Sometimes we know what we want, but we don't necessarily have a path to achieve it. This spread is here for you to help you find that path, and the things within you that can help you achieve your goals. Unlike the previous spread, which was more along the lines of using the day to day as a foundation to build a future, this spread uses the first card, your goal, as a means to ground the entire spread, and how you can earn it.",
        },
        3: {
          title: 'About The Universal Tarot Reading',
          desc: "Based on the classic Celtic Cross spread, this Free Tarot Reading is designed to help you move through whatever issues you're facing with greater clarity and confidence. From personal matters to questions about love, career, finances, or a major decision you need to make, this versatile spread has advice for any area of your life.<br />When you need more guidance than just one card can provide, a 3-card Tarot spread is just right. In this free reading you'll get a card that represents your feelings and mindset in this moment, another that represents your current situation, and one that represents the challenges you may experience. With this new knowledge, you'll have a greater understanding of your circumstances and influences, as well as a better idea of the tools and solutions currently available to you.<br />Don't spend another day stressing about your situation! Use the personalized insight in this free online Tarot reading to get the answers you need NOW!",
        },
      },
    }
  },
  asyncData({ error, $apiList, params }) {
    return {
      type: params.type,
    }
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.tarot-container {
  color: #fff;
  padding: 40px 0 0;
  .title {
    font-family: 'Cinzel Decorative';
    font-style: normal;
    font-weight: 700;
    font-size: 46px;
    line-height: 64px;
    text-align: center;
  }
  .tarot-section {
    margin-top: 32px;
    display: flex;
    justify-content: center;
    .add-box-wrapper {
      width: 160px;
      height: 600px;
    }
    .ad-box {
      width: 160px;
      height: 600px;
      position: fixed;
      background-color: #555761;
    }
    .tarot-box {
      margin-left: 32px;
      margin-right: 32px;
      flex: 1;
      max-width: 1400px;
    }
  }
  .ad-box_row {
    width: 1200px;
    height: 305px;
    margin: 0 auto;
    &.mt_80 {
      margin-top: 24px;
    }
  }
  .divination {
    margin-top: 80px;
  }
  .introduce-box {
    max-width: 1400px;
    margin: 24px auto 0;
    .intro {
      display: grid;
      grid-template-columns: 40% 50%;
      justify-content: space-between;
    }
    .intro-title {
      font-family: 'Cinzel Decorative';
      font-weight: 700;
      font-size: 46px;
      line-height: 64px;
      align-self: center;
    }
    .intro-content {
      font-family: 'Rubik';
      font-style: normal;
      font-size: 16px;
      line-height: 28px;
    }
    .divination-title {
      font-family: 'Cinzel Decorative';
      font-style: normal;
      font-weight: 700;
      font-size: 46px;
      line-height: 64px;
      text-align: center;
    }
    .divination-wrapper {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-column-gap: 115px;
      grid-row-gap: 60px;
      margin-top: 60px;
    }
    .divination-content {
      width: 80%;
    }
  }
  .el_more {
    margin-top: 24px;
    :deep(.more-tarot) {
      margin-bottom: 0;
    }
  }
}
.el_choice {
  margin-top: 56px;
}
.el_pop {
  margin: 56px 0;
}
@media (max-width: 1450px) {
  .tarot-container {
    .introduce-box {
      max-width: 1100px;
      .intro-title {
        font-size: 32px;
        line-height: 48px;
      }
    }
    .ad-box_row {
      max-width: 100%;
    }
  }
}
@media (max-width: 1200px) {
  .tarot-container {
    .ad-box_row {
      padding: 0 30px;
    }
    .introduce-box {
      max-width: 100%;
      padding: 0 30px;
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .tarot-container {
    padding: 16 * $pr 16 * $pr 0;
    .title {
      font-size: 22 * $pr;
      line-height: 30 * $pr;
    }
    .tarot-section {
      margin-top: 16 * $pr;
      display: flex;
      justify-content: center;
      .add-box-wrapper {
        display: none;
      }
      .tarot-box {
        margin-left: 0;
        margin-right: 0;
        flex: 1;
      }
    }
    .ad-box_row {
      width: 336 * $pr;
      height: 297 * $pr;
      padding: 0;
      &.mt_80 {
        margin: 16 * $pr auto 0;
      }
    }
    .introduce-box {
      width: 100%;
      padding: 0;
      margin: 16 * $pr auto 0;
      .intro {
        display: flex;
        flex-direction: column;
        .intro-title {
          font-family: 'Cinzel Decorative';
          font-style: normal;
          font-weight: 700;
          font-size: 22 * $pr;
          line-height: 30 * $pr;
          text-align: center;
        }
        .intro-content {
          font-family: 'Rubik';
          font-style: normal;
          font-weight: 400;
          font-size: 18 * $pr;
          line-height: 28 * $pr;
          color: #d2d3d7;
        }
      }
    }
    .el_more {
      margin-top: 16 * $pr;
      padding: 0;
    }
  }
  .el_choice {
    margin-top: 16 * $pr;
  }
  .el_pop {
    margin: 32 * $pr 0;
  }
}
</style>
