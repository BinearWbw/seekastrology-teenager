<template>
  <div class="china_details">
    <!-- <google-ad :id="'5954072207'" classNames="china_ad_top"></google-ad> -->
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
          <google-ad
            :id="'4486482830'"
            classNames="china_ad_lity"
            v-if="payStatusSet"
          ></google-ad>

          <div class="item_p">
            <p class="title_p">Personality:</p>
            <div class="pay_off">
              <div
                class="text_fe personality"
                :class="{ blurs: !payStatusSet }"
                v-html="zodiacData.personality"
              ></div>
              <div class="pay_ornot" v-if="!payStatusSet">
                <div class="get_pay">
                  <div class="btn">
                    <p class="btn_title">Get your detailed Birth Chart</p>
                    <a href="/payment/4/" class="money" @click="currentRouter"
                      >${{ isPrice }} Pay Now</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="google_ads">
              <google-ad :id="'7484181264'" classNames="text_ad"></google-ad>
            </div>
            <p class="title_p">
              Love Compatibility Of The {{ zodiacData.name }}
            </p>
            <client-only>
              <div class="pay_off">
                <div
                  class="text_p"
                  :class="{ blurs: !payStatusSet }"
                  v-html="zodiacData.love_comp"
                ></div>
                <div class="pay_ornot" v-if="!payStatusSet">
                  <div class="get_pay">
                    <div class="btn">
                      <p class="btn_title">Get your detailed Birth Chart</p>
                      <a href="/payment/4/" class="money" @click="currentRouter"
                        >${{ isPrice }} Pay Now</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </client-only>
            <p class="title_p">Jobs Careers The {{ zodiacData.name }}</p>
            <client-only>
              <div class="pay_off">
                <div
                  class="text_p"
                  :class="{ blurs: !payStatusSet }"
                  v-html="zodiacData.jobs_careers || ''"
                ></div>
                <div class="pay_ornot" v-if="!payStatusSet">
                  <div class="get_pay">
                    <div class="btn">
                      <p class="btn_title">Get your detailed Birth Chart</p>
                      <a href="/payment/4/" class="money" @click="currentRouter"
                        >${{ isPrice }} Pay Now</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </client-only>
            <p class="title_p">Fortune :</p>
            <client-only>
              <div class="pay_off">
                <div
                  class="text_fe"
                  :class="{ blurs: !payStatusSet }"
                  v-html="zodiacData.fortune || ''"
                ></div>
                <div class="pay_ornot" v-if="!payStatusSet">
                  <div class="get_pay">
                    <div class="btn">
                      <p class="btn_title">Get your detailed Birth Chart</p>
                      <a href="/payment/4/" class="money" @click="currentRouter"
                        >${{ isPrice }} Pay Now</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </client-only>
          </div>
        </div>
      </div>
      <div class="animal_right">
        <div class="animal_right_list">
          <el-china-lity class="lity"></el-china-lity>
          <google-ad :id="'9971744541'" classNames="right_ad"></google-ad>
          <home-pairing class="pairing"></home-pairing>
          <google-ad :id="'4830097762'" classNames="right_ad two"></google-ad>
          <el-sign-new class="sign_new"></el-sign-new>
        </div>
      </div>
    </div>
    <transition name="unfold">
      <el-tips-pay v-if="payTips"></el-tips-pay>
    </transition>
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
  data() {
    return {
      payStatusSet: false,
      payTips: false,
      timerFun: null,
      isPrice: '',
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$apiList.user
        .getUserPrice({
          id: '4',
        })
        .then((res) => {
          this.isPrice = res?.price / 100 || null
        })
    })
    let order_no = this.$route.query.order_no
    if (process.client && order_no) {
      //   获取支付成功数据
      this.$apiList.user
        .setUserOrderData({
          order_id: order_no,
        })
        .then((res) => {
          if (res?.code) {
            // 提示通知
            this.$notification.open({
              message: 'Error',
              description: 'No payment successful',
              duration: 2,
              style: {
                color: '#f00',
              },
            })
            window.location.href = '/chinazodiac/'
            return
          }
          this.payTips = true
          this.payStatusSet = true // 显示所有数据
          this.timerFun = setTimeout(() => {
            this.payTips = false
          }, 2000)
        })
    }
  },
  methods: {
    currentRouter() {
      localStorage.setItem('payRouter', this.$route.path)
    },
  },
  beforeDestroy() {
    if (this.timerFun) clearTimeout(this.timerFun)
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.china_details {
  width: 100%;
  position: relative;
  .china_ad_top {
    display: none;
  }
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

        .china_ad_lity {
          display: none;
        }
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
        .personality {
          :deep(table) {
            border-collapse: separate;
            border-spacing: 1px 1px;
            margin: 16px 0;
            tr {
              th {
                padding: 3px;
                background: #9747ff;
              }
            }
            tr {
              td {
                padding: 3px;
                background: rgba(255, 255, 255, 0.08);
              }
            }
          }
        }
        .item_p {
          display: grid;
          gap: 8px;
          .blurs {
            filter: blur(3px);
            user-select: none;
          }
          .pay_off {
            position: relative;
            .pay_ornot {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              .get_pay {
                .btn {
                  .btn_title {
                    color: #ffda8b;
                    font-family: Rubik;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 22px;
                    text-align: center;
                    margin-bottom: 8px;
                  }
                  .money {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 295px;
                    height: 44px;
                    border-radius: 42px;
                    background: #ffda8b;
                    color: #000;
                    font-family: Rubik;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 22px;
                  }
                }
              }
            }
          }
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
        .sign_new {
          display: none;
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
    .china_ad_top {
      display: flex;
      flex-direction: column;
      width: 336 * $pr;
      height: 297 * $pr;
      margin: 0 auto;
    }
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
          .china_ad_lity {
            display: flex;
            flex-direction: column;
            width: 336 * $pr;
            height: 297 * $pr;
            margin: 0 auto;
          }
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
            .blurs {
              filter: blur(3 * $pr);
            }
            .pay_off {
              .pay_ornot {
                top: 20%;
                .get_pay {
                  .btn {
                    .btn_title {
                      font-size: 16 * $pr;
                      line-height: 22 * $pr;
                      margin-bottom: 8 * $pr;
                    }
                    .money {
                      width: 295 * $pr;
                      height: 44 * $pr;
                      border-radius: 42 * $pr;
                      font-size: 16 * $pr;
                      line-height: 22 * $pr;
                    }
                  }
                }
              }
            }
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
            display: none;
            :deep(.pairing_two_main) {
              width: 100%;
              .select_main {
                padding: 24 * $pr 16 * $pr;
              }
            }
          }
          .sign_new {
            display: block;
          }
        }
      }
    }
  }
}
</style>
