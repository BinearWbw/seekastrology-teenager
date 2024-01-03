<template>
  <div class="details_test">
    <google-ad :id="''" classNames="google_ad_top"></google-ad>
    <div class="details_test_main">
      <div class="particulars">
        <div class="particulars_title">
          Hello , Your palm reading result is :
        </div>
        <div class="particulars_test">
          <p>* This analysis is based on your selection</p>
          <p v-for="(item, index) in palmistry" :key="index">{{ item }}</p>
        </div>
        <div class="particulars_lis">Know About Your Hand</div>
        <palm-tis class="eltis"></palm-tis>
      </div>
      <div class="palm_cent">
        <google-ad :id="''" classNames="google_ad_cent"></google-ad>
        <palm-have></palm-have>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      palmistry: [],
    }
  },
  mounted() {
    this.palmistry = JSON.parse(localStorage.getItem('palmistry'))
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.details_test {
  width: 100%;
  .google_ad_top {
    display: none;
  }
  &_main {
    width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 354px;
    gap: 0 102px;
    padding: 48px 0;
    .particulars {
      &_title {
        color: #fff;
        font-family: Cinzel Decorative;
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 48px;
        margin-bottom: 8px;
      }
      &_test {
        color: rgba(255, 255, 255, 0.6);
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
      }
      &_lis {
        color: #fff;
        text-align: center;
        font-family: Rubik;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
        margin: 56px 0 16px;
      }
    }
    .palm_cent {
      width: 354px;
      .google_ad_cent {
        width: 300px;
        height: 625px;
        margin: 0 auto 32px;
      }
    }
  }
}

@media (max-width: 1470px) {
  .details_test {
    &_main {
      width: 100%;
      padding: 48px 30px;
    }
  }
}
@media (max-width: 1050px) {
  .details_test {
    &_main {
      grid-template-columns: repeat(1, 1fr);
      gap: 56px;
      padding: 48px 50px;
      .palm_cent {
        width: 100%;
        .google_ad_cent {
          width: 336px;
          height: 305px;
          margin: 0 auto 32px;
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .details_test {
    width: 100%;
    .google_ad_top {
      display: flex;
      flex-direction: column;
      width: 336 * $pr;
      height: 297 * $pr;
      margin: 0 auto;
    }
    &_main {
      width: 100%;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 32 * $pr;
      padding: 16 * $pr 16 * $pr 32 * $pr;
      .particulars {
        &_title {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
          margin-bottom: 8 * $pr;
        }
        &_test {
          font-size: 14 * $pr;
          line-height: 24 * $pr;
        }
        &_lis {
          font-size: 18 * $pr;
          line-height: 24 * $pr;
          margin: 32 * $pr 0 16 * $pr;
        }
      }
      .palm_cent {
        .google_ad_cent {
          width: 336 * $pr;
          height: 297 * $pr;
          margin: 0 auto 32 * $pr;
        }
      }
    }
  }
}
</style>
