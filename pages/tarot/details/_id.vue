<template>
  <div class="tarot-container">
    <google-ad
      classNames="ad-box_row"
      style="width: 100%"
      id="3247169078"
    ></google-ad>
    <div class="title mt-44-mobile">{{ cardsInfo.name }} Card Meaning</div>
    <div class="tarot-section">
      <!-- <div class="add-box-wrapper">
        <google-ad classNames="ad-box" id="2979575766"></google-ad>
      </div> -->
      <div class="main-content">
        <ul class="content-list">
          <li class="content-list-item">
            <div class="card-wrapper">
              <nuxt-img
                class="card-img"
                :src="cardsInfo.icon || '/'"
                fit="cover"
                :alt="cardsInfo.name"
                width="300"
                height="600"
                loading="lazy"
                format="auto"
              ></nuxt-img>
              <div class="card-text">{{ cardsInfo.name }}</div>
            </div>
            <div class="desc">
              <div class="desc-text" v-html="cardsInfo.desc"></div>
            </div>
          </li>
        </ul>
      </div>
      <!-- <div class="add-box-wrapper">
        <google-ad classNames="ad-box" id="6727249080"></google-ad>
      </div> -->
    </div>
    <google-ad classNames="ad-box_row bottom_ad" id="1099517884"></google-ad>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      cardsInfo: {},
    }
  },
  async asyncData({ error, $apiList, query, params }) {
    try {
      const cardsInfo = await $apiList.tarot.getDetail({
        origin: process.env.origin,
        id: params.id.replace(
          /^.*?(\d*)$/,
          (str, match, index) => match || '0'
        ),
      })
      return {
        cardsInfo,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.tarot-container {
  color: #fff;
  ::v-deep h2,
  ::v-deep h3 {
    font-family: 'Cinzel Decorative';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 36px;
    color: #ffffff !important;
    margin-top: 40px;
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
  display: flex;
  justify-content: center;
  .add-box-wrapper {
    width: 160px;
    height: 600px;
  }
  .ad-box {
    position: fixed;
    width: 160px;
    height: 600px;
    background-color: #555761;
  }
}
.ad-box_row {
  width: 100%;
  max-width: 1400px;
  height: 130px;
  margin: 24px auto 0;
}
.bottom_ad {
  padding: 24px 0;
}
.main-content {
  margin: 24px 32px 0;
  flex: 1;
  max-width: 1400px;
  .content-list-item {
    margin-top: 24px;
    display: flex;
    &:not(:first-child) {
      margin-top: 97px;
    }
    .card-wrapper {
      margin-right: 137px;
      .card-img {
        height: 600px;
      }
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
      ::v-deep p {
        margin-top: 30px;
      }
    }
  }
}
.mt-48 {
  margin-top: 48px;
}
.mb-48 {
  margin-bottom: 48px;
}
.mt-48_minus {
  margin-top: -48px;
}
.mt-44-mobile {
  margin-top: 24px;
}
.mt-32 {
  margin-top: 32px;
}
.mt-75 {
  margin-top: 75px;
}
.mt-200 {
  margin-top: 200px;
}

@media (max-width: 1450px) {
  .ad-box_row {
    width: 95vw;
    max-width: 95vw;
  }
  .tarot-section {
    .main-content {
      max-width: 100%;
      margin: 40px 0 0;
      padding: 0 70px;
      .card-wrapper {
        margin-right: 100px;
      }
    }
  }
}
@media (max-width: 900px) {
  .tarot-section {
    .main-content {
      .card-wrapper {
        margin-right: 50px;
        .card-img {
          height: 500px;
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .tarot-container {
    padding: 0 16 * $pr 16 * $pr;
  }
  .main-content {
    margin: 0 !important;
    padding: 0 !important;
  }
  .add-box-wrapper {
    display: none;
  }
  .ad-box_row {
    width: 336 * $pr;
    height: 297 * $pr;
    margin: 0 auto;
  }

  .title {
    font-family: 'Cinzel Decorative';
    font-style: normal;
    font-weight: 700;
    font-size: 26 * $pr;
    line-height: 36 * $pr;
  }
  .content-list {
    .content-list-item {
      flex-direction: column;
      margin-top: 8 * $pr;
      .card-wrapper {
        margin: 0 auto 24 * $pr;
        .card-img {
          width: 170 * $pr;
          height: 340 * $pr;
        }
      }
      .desc-text {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 14 * $pr;
        line-height: 24 * $pr;
        ::v-deep p {
          margin-top: 16 * $pr;
        }
        :deep(h3),
        :deep(h2) {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
          margin: 0 !important;
          margin-top: 0;
        }
      }
    }
  }
  .mt-48 {
    margin-top: 24 * $pr;
  }
  .mb-48 {
    margin-bottom: 24 * $pr;
  }
  .mt-44-mobile {
    margin-top: 16 * $pr;
  }
}
</style>
