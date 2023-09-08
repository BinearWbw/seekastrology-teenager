<template>
  <div class="tarot-container">
    <div class="title">What the Tarot Cards Mean in This Reading</div>
    <div class="title h5_title">Tarot Cards Reading</div>
    <google-ad classNames="title_ad" id="3725681222" />
    <div class="tarot-section">
      <!-- <div class="add-box-wrapper">
        <google-ad classNames="ad-box" id="1311270876"></google-ad>
      </div> -->
      <div class="main-content">
        <ul class="content-list">
          <li
            class="content-list-item"
            v-for="(item, index) in cardsInfo"
            :key="index"
          >
            <div class="card-wrapper">
              <nuxt-img
                class="card-img"
                :class="{ 'card-img-rotate': item.desc_type == 2 }"
                :src="item.icon || '/'"
                fit="cover"
                :alt="item.name"
                loading="lazy"
              ></nuxt-img>
              <div class="card-text">{{ item.card_name }}</div>
            </div>
            <div class="desc">
              <div class="desc-title">
                {{ subTitleText[type][index] || item.card_name }}
              </div>
              <div class="desc-text">{{ item.desc }}</div>
            </div>
          </li>
        </ul>
      </div>
      <!-- <div class="add-box-wrapper">
        <google-ad classNames="ad-box" id="6372025868"></google-ad>
      </div> -->
    </div>
    <google-auto-ad classNames="google_ad" id="8937629395" />
    <more-tarot class="mt-48"></more-tarot>
    <google-auto-ad classNames="google_ad" id="6563597553" />
  </div>
</template>

<script>
import GoogleAd from '../../../components/GoogleAd.vue'
import MoreTarot from '../../../components/tarot/MoreTarot.vue'
export default {
  name: 'answer',
  components: {
    MoreTarot,
    GoogleAd,
  },
  data() {
    return {
      cardsInfo: [],
      type: 1,
      titleText: {
        1: 'Love Tarot Reading',
        2: 'Tarot Career Reading',
        3: 'Universal Tarot Reading',
        4: 'Choose 1 Cards From The Deck Below:',
      },
      subTitleText: {
        //类型:1-爱情、2-事业、3-通用、4-日常
        1: [
          'First Position: Do Our Souls Already Know Each Other',
          'Second Position: Should I Invest My Time in This Relationship',
          'Third Position: How Does the Future of This Relationship Look',
        ],
        2: [
          'purpose ： Why did you choose this job in the first place?',
          'responsibilities：- What is your role here?',
          'Progress - Your current state - How do you feel about the work?',
          'rewards - What you stand to gain from this job, financially, spiritually, or otherwise?',
          'future - What is a possible future that is coming from all of this',
        ],
        3: ['Past', 'Present', 'Future'],
        4: ['card name'],
      },
    }
  },
  mounted() {
    this.type = this.$route.query.type || '4'
    const cardsInfo = sessionStorage.getItem('cardsInfo')
    if (cardsInfo) {
      this.cardsInfo = JSON.parse(cardsInfo)
    }
    if (this.type == 4) {
      this.subTitleText[this.type][0] = this.cardsInfo[0].card_name
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
    padding: 0 30px;
    &.h5_title {
      display: none;
    }
  }

  .tarot-section {
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
    }
  }
  .main-content {
    margin: 124px 32px 0;
    flex: 1;
    max-width: 1400px;
    .content-list-item {
      display: flex;
      &:not(:first-child) {
        margin-top: 97px;
      }
      .card-wrapper {
        margin-right: 137px;
      }
      .card-img {
        height: 420px;
        width: 210px;
      }
      .card-img-rotate {
        transform: rotate(180deg);
      }
      .card-text {
        text-align: center;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 30px;
        color: rgba(255, 255, 255, 0.6);
        margin-top: 12px;
      }
      .desc-title {
        font-family: 'Cinzel Decorative';
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 48px;
      }
      .desc-text {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        margin-top: 40px;
        color: #d2d3d7;
      }
    }
  }
  .mt-48 {
    margin-top: 48px;
  }
  .mt-200 {
    margin-top: 200px;
  }

  .title_ad {
    width: 1200px;
    height: 130px;
    margin: 48px auto 0;
  }

  .google_ad {
    width: 1200px;
    height: 130px;
    margin: 48px auto;
  }
}
@media (max-width: 1550px) {
  .content-list-item {
    padding: 0 50px;
  }
}

@media (max-width: 1450px) {
  .tarot-container {
    .title_ad {
      max-width: 100%;
      padding: 0 30px;
    }

    .google_ad {
      max-width: 100%;
      padding: 0 30px;
    }
  }
}
@media (max-width: 1050px) {
  .tarot-container {
    color: #fff;
    padding: 40px 30px 0;
    .title {
      padding: 0;
    }
    .ad-box_row {
      width: 100%;
    }
    .mt-48 {
      margin-top: 48px;
    }
    .title_ad {
      width: 100%;
      max-width: 100%;
    }
    .google_ad {
      width: 100%;
      max-width: 100%;
    }
    .main-content {
      .content-list-item {
        padding: 0;
        .card-wrapper {
          margin-right: 50px;
        }
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .tarot-container {
    padding: 30 * $pr 16 * $pr 0;
    > .container {
      padding: 0;
    }
    .title {
      font-family: 'Cinzel Decorative';
      font-style: normal;
      font-weight: 700;
      font-size: 36 * $pr;
      line-height: 48 * $pr;
      display: none;
      &.h5_title {
        display: block;
      }
    }
    .tarot-section {
      .ad-box {
        display: none;
      }
      .add-box-wrapper {
        display: none;
      }
    }
    .main-content {
      margin: 0;
      width: 100%;
      .content-list {
        .content-list-item {
          flex-direction: column;
          margin-top: 48 * $pr;
          background-image: url('~assets/img/tarot/explain-bg.png');
          background-repeat: no-repeat;
          background-size: 100%;
          .card-wrapper {
            margin: 0 auto 26 * $pr;
            .card-img {
              width: 170 * $pr;
              height: 340 * $pr;
            }
          }
          .card-text {
            font-family: 'Rufina';
            font-style: normal;
            font-weight: 400;
            font-size: 18 * $pr;
            line-height: 30 * $pr;
          }
          .desc-title {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 22 * $pr;
            line-height: 30 * $pr;
          }
          .desc-text {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 14 * $pr;
            line-height: 24 * $pr;
            color: rgba(255, 255, 255, 0.6);
            margin-top: 8 * $pr;
          }
        }
      }
    }
    .mt-48 {
      margin-top: 48 * $pr;
    }
    .title_ad {
      width: 100%;
      height: 114 * $pr;
      margin: 48 * $pr auto 0;
      padding: 0;
      display: none;
    }
    .google_ad {
      width: 100%;
      margin: 48 * $pr auto;
      padding: 0;
    }
  }
}
</style>
