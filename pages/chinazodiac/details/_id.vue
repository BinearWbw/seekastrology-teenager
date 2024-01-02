<template>
  <div class="china_details">
    <div class="china_details_top">
      <div class="item">
        <div class="imgs">
          <img :src="imgId" alt="zodiacData.name" />
        </div>
        <div class="sign_text">
          <p class="name">{{ zodiacData.name }}</p>
          <p class="list">Chinese Horoscope</p>
        </div>
      </div>
    </div>
    <div class="china_details_main">
      <div class="animal_left">
        <div class="details">
          <div class="text_p" v-html="zodiacData.desc"></div>
          <div class="item_p">
            <p class="title_p">Personality:</p>
            <div class="text_fe" v-html="zodiacData.personality"></div>
            <div class="google_ads">
              <google-ad id="" classNames="text_ad"></google-ad>
            </div>
            <p class="title_p">
              Love Compatibility Of The {{ zodiacData.name }}
            </p>
            <client-only>
              <div class="text_p" v-html="zodiacData.love_comp"></div>
            </client-only>
            <p class="title_p">Jobs Careers The {{ zodiacData.name }}</p>
            <client-only>
              <div class="text_p" v-html="zodiacData.jobs_careers || ''"></div>
            </client-only>
            <p class="title_p">Fortune :</p>
            <client-only>
              <div class="text_fe" v-html="zodiacData.fortune || ''"></div>
            </client-only>
          </div>
        </div>
      </div>
      <div class="animal_right">
        <div class="animal_right_list">
          <el-china-lity class="lity"></el-china-lity>
          <google-ad id="" classNames="right_ad"></google-ad>
          <home-pairing class="pairing"></home-pairing>
          <google-ad id="" classNames="right_ad two"></google-ad>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ error, $apiList, params }) {
    try {
      let imgId = ''
      let [zodiacData] = await Promise.all([
        /**详情 */
        $apiList.test
          .getAnimalsDetail({
            id: params.id.replace(
              /^.*?(\d*)$/,
              (str, match, index) => match || '0'
            ),
          })
          .then((res) => {
            imgId = require(`~/assets/img/zodiac/chin/chins_${res.id}.svg`)
            return res || null
          }),
      ])
      return { zodiacData, imgId }
    } catch (e) {
      error({ statusCode: e.code, message: e.msg })
    }
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.china_details {
  width: 100%;
  position: relative;
  &_top {
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(151, 71, 255, 0) 0%,
      rgba(151, 71, 255, 0.38) 100%
    );
    .item {
      width: 1400px;
      height: 214px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .imgs {
        width: 162px;
        > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .sign_text {
        margin-left: 56px;
        .name {
          color: #fff;
          font-family: Cinzel Decorative;
          font-size: 36px;
          font-style: normal;
          font-weight: 700;
          line-height: 48px;
          margin-bottom: 16px;
          position: relative;
          &::after {
            position: absolute;
            display: inline-block;
            left: 0;
            bottom: -8px;
            content: '';
            width: 100%;
            height: 1px;
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.2) 50.52%,
              rgba(255, 255, 255, 0) 100%
            );
          }
        }
        .list {
          color: #ffda8b;
          font-family: Rubik;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: 24px;
        }
      }
    }
  }
  &_main {
    width: 1400px;
    margin: 0 auto;
    padding: 56px 0;
    display: flex;
    .animal_left {
      flex: 1;
      .details {
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
        display: grid;
        gap: 16px;
        .title_p {
          color: #fff;
          font-size: 22px;
          line-height: 30px;
        }
        .text_p {
          color: rgba(255, 255, 255, 0.6);
        }
        .text_fe {
          padding-left: 16px;
          position: relative;
          color: rgba(255, 255, 255, 0.6);
          &::after {
            position: absolute;
            left: 0;
            top: 8px;
            content: '';
            width: 8px;
            height: 8px;
            background: #9747ff;
            border-radius: 50%;
          }
        }
        .item_p {
          display: grid;
          gap: 8px;
        }
        .google_ads {
          width: 100%;
          .text_ad {
            width: 750px;
            height: 125px;
            margin: 0 auto;
          }
        }
      }
    }
    .animal_right {
      width: 345px;
      margin-left: 102px;
      &_list {
        display: grid;
        gap: 32px;
        .right_ad {
          width: 336px;
          height: 305px;
          margin: 0 auto;
        }

        .pairing {
          :deep(.pairing_two_main) {
            width: 100%;
            .select_main {
              padding: 24px 16px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 1480px) {
  .china_details {
    &_top {
      .item {
        width: 100%;
        padding: 0 30px;
      }
    }
    &_main {
      width: 100%;
      padding: 56px 30px;
      .animal_left {
        .details {
          .google_ads {
            width: 100%;
            .text_ad {
              width: 90%;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 1000px) {
  .china_details {
    &_main {
      .animal_right {
        margin-left: 24px;
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .china_details {
    &_top {
      .item {
        width: 100%;
        padding: 24 * $pr 16 * $pr;
        height: auto;
        margin: 0 auto;
        display: flex;
        align-items: center;
        .imgs {
          width: 67 * $pr;
        }
        .sign_text {
          margin-left: 8 * $pr;
          .name {
            font-size: 22 * $pr;
            line-height: 30 * $pr;
            margin-bottom: 16 * $pr;
            &::after {
              bottom: -8 * $pr;
              height: 1 * $pr;
            }
          }
          .list {
            font-size: 16 * $pr;
            line-height: 22 * $pr;
          }
        }
      }
    }
    &_main {
      padding: 32 * $pr 16 * $pr;
      display: inherit;
      .animal_left {
        flex: 1;
        .details {
          font-family: Rubik;
          font-size: 14 * $pr;
          line-height: 24 * $pr;
          gap: 16 * $pr;
          .title_p {
            color: #fff;
            font-size: 18 * $pr;
            line-height: 24 * $pr;
          }
          .text_fe {
            padding-left: 16 * $pr;
            &::after {
              position: absolute;
              left: 0;
              top: 8 * $pr;
              width: 8 * $pr;
              height: 8 * $pr;
            }
          }
          .item_p {
            display: grid;
            gap: 8 * $pr;
          }
          .google_ads {
            width: 100%;
            .text_ad {
              width: 336 * $pr;
              height: 297 * $pr;
            }
          }
        }
      }
      .animal_right {
        width: 100%;
        margin-left: 0;
        margin-top: 16 * $pr;
        &_list {
          display: grid;
          gap: 16 * $pr;
          .lity {
            display: none;
          }

          .right_ad {
            width: 336 * $pr;
            height: 297 * $pr;
            margin: 0 auto;
          }
          .two {
            display: none;
          }

          .pairing {
            :deep(.pairing_two_main) {
              width: 100%;
              .select_main {
                padding: 24 * $pr 16 * $pr;
              }
            }
          }
        }
      }
    }
  }
}
</style>
