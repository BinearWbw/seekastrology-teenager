<template>
  <div class="details">
    <div class="details_start">
      <google-ad classNames="google_ad_top" :id="'9680645670'" />
      <div class="mains">
        <div class="remains">
          <div class="remains_left">aas</div>
          <div class="remains_right">
            <el-pairing-two class="pairing"></el-pairing-two>
            <google-ad classNames="google_ad_right" :id="''" />
            <div class="choices">
              <home-your-choice-mini></home-your-choice-mini>
            </div>
          </div>
        </div>
        <el-explore-more class="explore" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.details {
  &_start {
    .google_ad_top {
      width: 1200px;
      height: 315px;
      margin: 48px auto 0;
    }
    .mains {
      width: 1400px;
      margin: 0 auto;
      padding: 48px 0 96px;
      .remains {
        width: 100%;
        display: flex;
        padding-bottom: 96px;
        &_left {
          flex: 1;
          padding-right: 47px;
        }
        &_right {
          .pairing {
            margin-bottom: 24px;
          }
          .google_ad_right {
            width: 425px;
            height: 228px;
          }
          .choices {
            width: 425px;
          }
        }
      }
    }
  }
}
@media (max-width: 1470px) {
  .details {
    &_start {
      padding: 0 30px;
      .google_ad_top {
        max-width: 1200px;
        width: 100%;
      }
      .mains {
        width: 100%;
      }
    }
  }
}
@media (max-width: 990px) {
  .details {
    &_start {
      padding: 0 16px;
      .google_ad_top {
        max-width: 100%;
        margin: 0;
      }
      .mains {
        .remains {
          width: 100%;
          display: flex;
          flex-direction: column;
          &_left {
            flex: 1;
            padding-right: 0;
          }
          &_right {
            display: flex;
            flex-direction: column;
            align-items: center;
            .pairing {
              width: 100%;
            }
            .google_ad_right {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .details {
    &_start {
      padding: 0 16 * $pr;
      .google_ad_top {
        height: 280 * $pr;
      }
      .mains {
        padding: 30 * $pr 0 48 * $pr;
        .remains {
          padding-bottom: 48 * $pr;
          &_left {
            flex: 1;
          }
          &_right {
            .pairing {
              margin-bottom: 48 * $pr;
            }
            .google_ad_right {
              height: 280 * $pr;
            }
            .choices {
              width: 100%;
              padding-top: 48 * $pr;
            }
          }
        }
      }
    }
  }
}
</style>
