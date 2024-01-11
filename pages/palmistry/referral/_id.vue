<template>
  <div class="palmistry_type">
    <div class="palmistry_type_main">
      <div class="content">
        <div class="title">Elementary Hand</div>
        <div class="main_text">
          <div class="img_text">
            <div class="imgs" v-if="!palmisRefData.hand_icons">
              <nuxt-img
                :src="palmisRefData.icon"
                fit="cover"
                width="298"
                height="180"
                :alt="palmisRefData.name"
                loading="lazy"
                format="auto"
              ></nuxt-img>
            </div>
            <div class="pli">
              <p class="img_title">{{ palmisRefData.name }}</p>
              <p class="text_p">
                Palmistry is an important science which tells us about the
                future very genuinely. Of, course there are the various branches
                of Astrology which predict the future course of an individual,
                but palmistry also give very clear and accurate results. In the
                other branches of Astrology, the moment of birth is and mounts
                on one's hand that hold the key to his future
              </p>
            </div>
          </div>
          <div class="hands" v-if="palmisRefData.hand_icons">
            <div
              class="list_hand"
              v-for="(item, index) in palmisRefData.hand_icons"
              :key="index"
            >
              <div class="imgs">
                <nuxt-img
                  :src="item.icon"
                  fit="cover"
                  width="224"
                  height="160"
                  :alt="item.name"
                  loading="lazy"
                  format="auto"
                ></nuxt-img>
              </div>
              <div class="text">{{ item.name }}</div>
            </div>
          </div>
          <div class="text_p" v-html="palmisRefData.desc"></div>
        </div>
      </div>
      <div class="ad_list">
        <google-ad :id="'4171622210'" classNames="google_ad_list"></google-ad>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ error, $apiList, params }) {
    try {
      const expression = params.id
      let palmisRefData
      if (expression.includes('-')) {
        //    包含减号
        const match = expression.split('-').map(Number) // 分别拿到id 并且转成数字
        palmisRefData = await $apiList.test
          .getPalmistryChild({
            id: match[0],
            child_id: match[1],
          })
          .then((res) => {
            return res
          })
      } else {
        //    不包含减号
        palmisRefData = await $apiList.test
          .getPalmistryMsg({
            id: params.id,
          })
          .then((res) => {
            return res
          })
      }
      return {
        palmisRefData,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.palmistry_type {
  &_main {
    width: 1400px;
    margin: 0 auto;
    padding: 48px 0;
    display: grid;
    grid-template-columns: 1fr 354px;
    gap: 0 102px;
    .content {
      .title {
        color: #fff;
        text-align: center;
        font-family: Cinzel Decorative;
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 48px;
        margin-bottom: 56px;
      }
      .main_text {
        .img_text {
          display: flex;
          margin-bottom: 8px;
          .imgs {
            width: 298px;
            height: 180px;
            margin-right: 8px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .img_title {
            color: #fff;
            font-family: Rubik;
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: 30px;
            margin-bottom: 8px;
          }
          .pli {
            flex: 1;
          }
        }
        .hands {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin: 16px 0;
          .list_hand {
            border-radius: 8px;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.08);
            .imgs {
              height: 160px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .text {
              color: #fff;
              text-align: center;
              font-family: Rubik;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
              padding: 8px;
            }
          }
        }
        .text_p {
          color: rgba(255, 255, 255, 0.6);
          font-family: Rubik;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px;
          :deep(h3),
          :deep(h2),
          :deep(h4),
          :deep(h5),
          :deep(*) {
            color: rgba(255, 255, 255, 0.6) !important;
          }
        }
      }
    }
    .ad_list {
      .google_ad_list {
        width: 300px;
        height: 625px;
        margin: 0 auto;
      }
    }
  }
}

@media (max-width: 1470px) {
  .palmistry_type {
    &_main {
      width: 100%;
      padding: 48px 30px;
      grid-template-columns: 1fr 354px;
      gap: 0 48px;
    }
  }
}
@media (max-width: 1000px) {
  .palmistry_type {
    &_main {
      width: 100%;
      margin: 0 auto;
      padding: 48px 30px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .palmistry_type {
    &_main {
      padding: 0 16 * $pr 32 * $pr;
      gap: 32 * $pr;
      .content {
        order: 2;
        .title {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
          margin-bottom: 32 * $pr;
        }
        .main_text {
          .img_text {
            display: flex;
            margin-bottom: 8 * $pr;
            flex-direction: column;
            .imgs {
              width: 343 * $pr;
              height: 207 * $pr;
              margin-right: 0;
              margin-bottom: 8 * $pr;
            }
            .img_title {
              font-size: 22 * $pr;
              line-height: 30 * $pr;
              margin-bottom: 8 * $pr;
            }
            .pli {
              flex: 1;
            }
          }
          .hands {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16 * $pr;
            margin: 16 * $pr 0;
            .list_hand {
              border-radius: 8 * $pr;
              .imgs {
                height: 130 * $pr;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              .text {
                font-size: 14 * $pr;
                line-height: 18 * $pr;
                padding: 8 * $pr;
              }
            }
          }
          .text_p {
            font-size: 14 * $pr;
            line-height: 24 * $pr;
            :deep(h3),
            :deep(h2),
            :deep(h4),
            :deep(h5),
            :deep(*) {
              color: rgba(255, 255, 255, 0.6) !important;
            }
          }
        }
      }
      .ad_list {
        order: 1;
        .google_ad_list {
          width: 336 * $pr;
          height: 297 * $pr;
        }
      }
    }
  }
}
</style>
