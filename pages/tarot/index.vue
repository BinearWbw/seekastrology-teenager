<template>
  <div class="tarot-container">
    <div class="tarot_top_ad">
      <div class="content">
        <p class="title">AI Tarot Guides</p>
        <p class="text">Find the deeper meaning with Al and Tarot</p>
      </div>
      <google-ad classNames="ad-box_row  h5_google" id="4356182716" />
      <div class="ai_reply">
        <ai-inquire></ai-inquire>
      </div>
    </div>
    <more-tarot class="more_tarot"></more-tarot>
    <all-tarot class="mt-h5-48"></all-tarot>
    <!-- <google-ad classNames="ad-box_row bottom_ad" id="6503037744" /> -->
  </div>
</template>

<script>
import MoreTarot from '~/components/tarot/MoreTarot.vue'
import AllTarot from '../../components/tarot/AllTarot.vue'
export default {
  name: 'tarot',
  components: {
    MoreTarot,
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
  margin: 40px 0;
  .tarot_top_ad {
    margin: 0 auto;
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
        margin-top: 16px;
      }
    }
    .h5_google {
      height: 280px;
    }
    .ai_reply {
      margin-top: 24px;
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
  height: 305px;
  margin: 24px auto;
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
.mt-h5-48 {
  margin-top: 56px;
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
  .mt-32 {
    margin-top: 32px;
  }
}

@media (max-width: 940px) {
  .mt-32 {
    margin-top: 32px;
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .tarot-container {
    padding: 0 0 48 * $pr;
    margin: 0;
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
      max-width: 100%;
      padding: 16 * $pr;
      display: flex;
      flex-direction: column;
      .content {
        order: 1;
        .title {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
        }
        .text {
          font-size: 16 * $pr;
          line-height: 22 * $pr;
          padding: 0 30 * $pr;
          margin-top: 16 * $pr;
        }
      }
      .h5_google {
        width: 336 * $pr;
        order: 3;
        height: 297 * $pr;
        margin-top: 0;
      }
      .ai_reply {
        order: 2;
        margin-top: 24 * $pr;
      }
    }
  }
  .title {
    font-family: 'Cinzel Decorative';
    font-style: normal;
    font-weight: 700 * $pr;
    font-size: 22 * $pr;
    line-height: 30 * $pr;
    text-align: center;
  }
  .add-box-wrapper {
    display: none;
  }
  .ad-box_row {
    width: 336 * $pr;
    height: 297 * $pr;
  }
  .more_tarot {
    padding: 0 16 * $pr !important;
  }
  .mt-120 {
    margin-top: 120 * $pr;
  }
  .mt-h5-48 {
    margin-top: 32 * $pr;
  }
  .bottom_ad {
    padding-top: 48 * $pr;
    margin: 0 auto;
    height: 345 * $pr;
  }
}
</style>
