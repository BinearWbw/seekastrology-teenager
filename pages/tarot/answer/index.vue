<template>
  <div class="tarot-container">
    <!-- <div class="title">What the Tarot Cards Mean in This Reading</div>
    <div class="title h5_title">Tarot Cards Reading</div> -->
    <div class="li_top_ad">
      <google-ad classNames="title_ad" id="5954072207" />
    </div>
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
                :class="{
                  'card-img-rotate':
                    item.desc_type == 2 && item.meaning_type !== 5,
                }"
                :src="item.icon || '/'"
                fit="cover"
                width="340"
                height="680"
                :alt="item.name"
                loading="lazy"
                format="auto"
              ></nuxt-img>
              <!-- <div class="card-text">{{ item.card_name }}</div> -->
            </div>
            <div class="desc">
              <div class="desc-title">
                {{ subTitleText[type][index] || item.card_name }}
              </div>
              <div class="answer" v-show="item.meaning_type == 5">
                Answer: {{ item.desc_type == 1 ? 'Yes' : 'No' }}
              </div>
              <div
                class="desc-text"
                :class="{ texts_more: openExpand }"
                v-html="item.desc"
              ></div>
              <div class="more_btn" @click="setOpenExpand">
                {{ openExpand ? 'Show Less' : 'Show More' }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <google-ad classNames="google_ad" id="8937629395" />
    <tarot-more-tarot class="more"></tarot-more-tarot>
  </div>
</template>

<script>
export default {
  name: 'answer',
  data() {
    return {
      cardsInfo: [],
      type: 1,
      titleText: {
        1: 'Love Tarot Reading',
        2: 'Tarot Career Reading',
        3: 'Universal Tarot Reading',
        4: 'Choose 1 Cards From The Deck Below:',
        5: 'Choose 1 Cards From The Deck Below:',
      },
      subTitleText: {
        //类型:1-爱情、2-事业、3-通用、4-日常
        1: [
          'First Position: Do Our Souls Already Know Each Other',
          'Second Position: Should I Invest My Time in This Relationship',
          'Third Position: How Does the Future of This Relationship Look',
        ],
        2: [
          'purpose: Why did you choose this job in the first place?',
          'responsibilities: - What is your role here?',
          'Progress - Your current state - How do you feel about the work?',
          'rewards - What you stand to gain from this job, financially, spiritually, or otherwise?',
          'future - What is a possible future that is coming from all of this',
        ],
        3: ['Past', 'Present', 'Future'],
        4: ['card name'],
        5: ['card name'],
      },
      openExpand: false,
    }
  },
  mounted() {
    this.type = this.$route.query.type || '4'
    const cardsInfo = sessionStorage.getItem('cardsInfo')
    if (cardsInfo) {
      this.cardsInfo = JSON.parse(cardsInfo)
    }
    if (this.type == 4 || this.type == 5) {
      this.subTitleText[this.type][0] = this.cardsInfo[0].card_name
    }
  },
  methods: {
    setOpenExpand() {
      this.openExpand = !this.openExpand
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.tarot-container {
  color: #fff;
  padding: 40px 0;
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
    margin: 24px 32px 0;
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
      .answer {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 28px;
        margin-top: 8px;
        color: #fff;
      }
      .desc-text {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        margin-top: 24px;
        color: #d2d3d7;
      }
      .more_btn {
        display: none;
      }
    }
  }
  .mt-200 {
    margin-top: 200px;
  }

  .title_ad {
    width: 1200px;
    height: 130px;
    margin: 24px auto 0;
  }

  .google_ad {
    width: 1200px;
    height: 305px;
    margin: 24px auto;
  }
  :deep(.more-tarot) {
    margin-bottom: 0;
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
    padding: 0 16 * $pr 32 * $pr;
    display: flex;
    flex-direction: column;
    > .container {
      padding: 0;
    }
    .title {
      font-family: 'Cinzel Decorative';
      font-style: normal;
      font-weight: 700;
      font-size: 22 * $pr;
      line-height: 30 * $pr;
      order: 2;
      display: none;
      &.h5_title {
        display: block;
      }
    }
    .tarot-section {
      order: 3;
      .ad-box {
        display: none;
      }
      .add-box-wrapper {
        display: none;
      }
    }
    .main-content {
      order: 4;
      margin: 0;
      width: 100%;
      .content-list {
        .content-list-item {
          flex-direction: column;
          align-items: flex-start;
          margin-top: 0;
          background-image: url('~assets/img/tarot/explain-bg.png');
          background-repeat: no-repeat;
          background-size: 100%;
          .card-wrapper {
            margin: 0 auto 26 * $pr;
            .card-img {
              width: 100 * $pr;
              height: 200 * $pr;
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
          .answer {
            font-size: 18 * $pr;
            line-height: 28 * $pr;
            margin-top: 0;
          }
          .desc-text {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 14 * $pr;
            line-height: 24 * $pr;
            color: rgba(255, 255, 255, 0.6);
            margin-top: 0;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
          }
          .texts_more {
            -webkit-line-clamp: unset !important;
            height: auto !important;
          }
          .more_btn {
            display: block;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 16 * $pr;
            line-height: 28 * $pr;
            color: #9747ff;
            cursor: pointer;
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
      margin: 0 auto 16 * $pr;
      padding: 0;
    }
    .li_top_ad {
      order: 1;
    }
    .google_ad {
      width: 336 * $pr;
      height: 297 * $pr;
      margin: 16 * $pr auto;
      padding: 0;
      order: 5;
    }
    .more {
      order: 6;
    }
  }
}
</style>
