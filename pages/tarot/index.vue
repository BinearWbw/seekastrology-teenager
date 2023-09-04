<!--
 * @Date: 2023-06-09 09:27:30
 * @LastEditors: tian 249682049@qq.com
 * @LastEditTime: 2023-06-15 10:57:26
 * @FilePath: /seekastrology/pages/tarot/index.vue
 * @Description: 
-->
<template>
  <div class="tarot-container">
    <div class="tarot_top_ad">
      <div class="content">
        <p class="title">One Card Tarot</p>
        <p class="text">
          Pick a card then write down your question in the chatbot below to get
          a FREE personalized reading.
        </p>
      </div>
      <google-ad classNames="ad-box_row mt-48 h5_google" id="4356182716" />
    </div>
    <div class="ai_reply">
      <ai-inquire></ai-inquire>
    </div>
    <!-- <div class="title">Choose 1 Cards From The Deck Below:</div> -->
    <!-- <div class="tarot-section"> -->
    <!-- <div class="add-box-wrapper">
        <google-ad classNames="ad-box" id="4068446091"></google-ad>
      </div> -->
    <!-- <div class="tarot-box"> -->
    <!-- <tarot-play type="4"></tarot-play> -->
    <!-- </div> -->
    <!-- <div class="add-box-wrapper">
        <google-ad classNames="ad-box" id="9572904273"></google-ad>
      </div> -->
    <!-- </div> -->

    <more-tarot class="mt-48"></more-tarot>
    <google-auto-ad classNames="ad-box_row mt-32" id="7816119415" />
    <all-tarot class="mt-48"></all-tarot>
    <google-auto-ad
      classNames="ad-box_row mt-32 mt-120 mb-32"
      id="6503037744"
    />
  </div>
</template>

<script>
import MoreTarot from '../../components/tarot/MoreTarot.vue'
import TarotPlay from '../../components/tarot/TarotPlay.vue'
import AllTarot from '../../components/tarot/AllTarot.vue'
// import GoogleAd from '../../components/GoogleAd.vue'
export default {
  name: 'tarot',
  components: {
    MoreTarot,
    TarotPlay,
    AllTarot,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.tarot-container {
  color: #fff;
  margin-top: 40px;
  .tarot_top_ad {
    margin: 0 auto;
    padding-bottom: 48px;
    max-width: 1400px;
    .content {
      .title {
        color: #fff;
        text-align: center;
        font-family: 'Cinzel Decorative';
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 48px;
      }
      .text {
        color: #fff;
        font-family: 'Rubik';
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
        text-align: center;
        padding: 0 260px;
        margin-top: 24px;
      }
    }
    .h5_google {
      height: 280px;
    }
  }
}
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
    background-color: #555761;
    position: fixed;
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
  margin: 0 auto;
}
.button {
  margin-top: 18px;
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
  &:hover {
    color: #000;
    background-color: #fff;
  }
}
.mt-48 {
  margin-top: 48px;
}
.mt-32 {
  margin-top: 32px;
}
.mb-32 {
  margin-bottom: 32px;
}
@media (max-width: 1450px) {
  .tarot-container {
    .title {
      padding: 0 30px;
    }
    .tarot-section {
      padding: 0 30px;
    }
  }
  .ad-box_row {
    max-width: 95vw;
    margin: 0 auto;
  }
  .mt-48 {
    margin-top: 48px;
  }
  .mt-32 {
    margin-top: 32px;
  }
}

@media (max-width: 940px) {
  .mt-48 {
    margin-top: 48px;
  }
  .mt-32 {
    margin-top: 32px;
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .tarot-container {
    padding: 16 * $pr;
    .title {
      padding: 0;
    }
    .tarot-section {
      padding: 0;
    }
    > .container {
      padding: 0;
    }
    .tarot_top_ad {
      margin: 0 auto;
      padding-bottom: 48 * $pr;
      max-width: 100%;
      .content {
        .title {
          font-size: 26 * $pr;
          line-height: 36 * $pr;
        }
        .text {
          font-size: 16 * $pr;
          line-height: 22 * $pr;
          padding: 0 30 * $pr;
          margin-top: 16 * $pr;
        }
      }
      .h5_google {
        height: 130 * $pr;
      }
    }
  }
  .title {
    font-family: 'Cinzel Decorative';
    font-style: normal;
    font-weight: 700 * $pr;
    font-size: 26 * $pr;
    line-height: 36 * $pr;
    text-align: center;
  }
  .add-box-wrapper {
    display: none;
  }
  .ad-box_row {
    width: 100%;
  }
  .mt-120 {
    margin-top: 120 * $pr;
  }
  .mt-48 {
    margin-top: 48 * $pr;
  }
}
</style>
