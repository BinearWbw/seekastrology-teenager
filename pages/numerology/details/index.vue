<template>
  <div class="numerology_detail">
    <div class="numerology_detail_main">
      <p class="de_title">Numerology Report</p>
      <google-ad :id="'6346359415'" classNames="google_de_top"></google-ad>
      <div class="process">
        <div class="course" v-if="ifCourse">
          <div class="tips">
            <p class="tips_title">{{ titleContent.name }}</p>
            <p class="tips_text">
              {{ titleContent.desc }}
            </p>
          </div>
          <div class="slide">
            <client-only>
              <a-carousel
                :dots="false"
                ref="carousels"
                :afterChange="panelCallback"
              >
                <div v-for="(item, index) in numerologyData" :key="index">
                  <div class="line_up">
                    <div class="numbers">
                      <div class="num">{{ item.num }}</div>
                      <p class="lis">{{ numerUser.name }}</p>
                      <p class="lis">{{ numerUserFun }}</p>
                    </div>
                    <div
                      class="letter"
                      :class="{ blurs: payStatusSet }"
                      v-html="item.desc"
                    ></div>
                  </div>
                </div>
              </a-carousel>
            </client-only>
            <div class="pay_ornot" v-if="payStatusSet">
              <div class="get_pay">
                <div class="btn">
                  <p class="btn_title">Get your detailed Birth Chart</p>
                  <a href="/payment/2/" class="money" @click="currentRouter"
                    >${{ isPrice }} Pay Now</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="push_button">
            <div>
              <button
                class="btn_left"
                @click="scrollToPrev"
                v-show="prevButtonText"
              >
                <i></i><span>&emsp;{{ prevButtonText }}</span>
              </button>
            </div>
            <button class="btn_right" @click="scrollToNext">
              <span v-show="marke !== 3">Your&nbsp;</span
              >{{ nextButtonText }}&emsp;<i></i>
            </button>
          </div>
        </div>
        <div class="result" v-else>
          <div class="result_text">
            <div
              class="centes"
              v-for="(i, index) in numerologyData"
              :key="index"
            >
              <span class="span"> {{ carNum[index] }} {{ i.num }}</span>
              &thinsp;<span class="span_two" v-html="i.desc"></span>
            </div>
          </div>
          <div class="push_button">
            <button class="btn_left" @click="goBack">
              <i></i><span>&nbsp;Your Personality Number</span>
            </button>
            <button class="btn_right" @click="reStart">
              Start Over&nbsp;<i></i>
            </button>
          </div>
        </div>
      </div>
      <div class="more">
        <p class="title">Horoscopes</p>
        <el-explore-more />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ error, $apiList, params, query }) {
    try {
      console.log('query', query.order_no)
    } catch (e) {
      error({ statusCode: e.code, message: e.msg })
    }
  },
  data() {
    return {
      numerologyData: [],
      numerUser: null,
      carouselDom: null,
      carNum: ['Life Path', 'Destiny', 'Personality', 'Soul Urge'],
      marke: 0,
      ifCourse: true,
      months: [
        { name: 'Jan', li: '01' },
        { name: 'Feb', li: '02' },
        { name: 'Mar', li: '03' },
        { name: 'Apr', li: '04' },
        { name: 'May', li: '05' },
        { name: 'Jun', li: '06' },
        { name: 'Jul', li: '07' },
        { name: 'Aug', li: '08' },
        { name: 'Sep', li: '09' },
        { name: 'Oct', li: '10' },
        { name: 'Nov', li: '11' },
        { name: 'Dec', li: '12' },
      ],
      payStatusSet: false,
      isPrice: '',
    }
  },
  mounted() {
    let order_no = this.$route.query.order_no
    this.payStatusSet = true
    this.$nextTick(() => {
      this.numerologyData = JSON.parse(localStorage.getItem('numerology'))
      this.numerUser = JSON.parse(localStorage.getItem('numerUser'))
      this.carouselDom = this.$refs.carousels
      //获取价格
      this.$apiList.user
        .getUserPrice({
          id: '2',
        })
        .then((res) => {
          this.isPrice = res?.price / 100 || null
        })
    })
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
            window.location.href = '/numerology/'
            return
          }
          this.payStatusSet = false // 显示所有数据
          this.numerologyData = res.res
        })
    }
  },
  computed: {
    // 用户填写的日期
    numerUserFun() {
      if (this.numerUser) {
        let li = this.months.find((item) => item.li == this.numerUser.month)
        return `${li.name}  ${this.numerUser.day} , ${this.numerUser.year}`
      }
    },
    prevButtonText() {
      // 根据当前页的信息设置按钮文本
      switch (this.marke) {
        case 0:
          return null
        case 1:
          return 'Your Life Path Number'
        case 2:
          return 'Your Destiny Number'
        case 3:
          return 'Your Personality Number'
        default:
          return null
      }
    },

    nextButtonText() {
      // 下一页的信息设置按钮文本
      switch (this.marke) {
        case 0:
          return ' Destiny Number'
        case 1:
          return ' Personality Number'
        case 2:
          return ' Soul Urge Number'
        case 3:
          return 'Summary'
      }
    },
    titleContent() {
      switch (this.marke) {
        case 0:
          return {
            name: 'Your Life Path Number',
            desc: 'Your life path number is derived from your birthdate and tells you a great deal about your strengths, weaknesses, and tendencies. It can help you see your path more clearly so you can spot the most advantageous opportunities for your life when they pop up.',
          }
        case 1:
          return {
            name: 'Your Destiny Number',
            desc: 'Your destiny number takes every letter of your name into account. This number gives vou a peek into your greater purpose in this life.Your destiny number takes every letter of vour name into account. This number aives vou a peek into vour qreater purpose in this life.',
          }
        case 2:
          return {
            name: 'Your Personality Number',
            desc: "Your personality number offers insight into how others see you. Derived from the consonants in your name, this is the filter through which people first perceive your personality. It may not accurately reflect what's underneath. Understanding how you look to others at your frst introduction will help you overcome erroneous perceptions and let your inner self shine through.",
          }
        case 3:
          return {
            name: 'Your Soul Urge Number',
            desc: 'Your soul urge number is calculated using the vowels in your name. This number will give you insight into your deepest desires. These are not always reflected on the surface, but reside deep within your soul.',
          }
      }
    },
  },
  methods: {
    scrollToNext() {
      const carouselDom = this.$refs.carousels
      if (this.marke !== 3) {
        carouselDom.next()
      } else {
        if (!this.payStatusSet) {
          this.ifCourse = false // 支付成功时才可进入
        }
      }
    },
    scrollToPrev() {
      const carouselDom = this.$refs.carousels
      if (this.marke !== 0) {
        carouselDom.prev()
      }
    },
    // 面板切换的回调
    panelCallback(to) {
      this.marke = to
    },
    goBack() {
      window.location.reload()
    },
    reStart() {
      window.changePageUrl = '/numerology/'
      window.location.href = '/numerology/'
    },
    // 保存当前路由给支付
    currentRouter() {
      localStorage.setItem('payRouter', this.$route.path)
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.numerology_detail {
  &_main {
    width: 1400px;
    margin: 0 auto;
    display: grid;
    gap: 32px;
    padding: 48px 0 32px;
    .de_title {
      color: #fff;
      text-align: center;
      font-family: Cinzel Decorative;
      font-size: 36px;
      font-style: normal;
      font-weight: 700;
      line-height: 48px;
    }
    .google_de_top {
      width: 970px;
      height: 115px;
      margin: 0 auto;
    }
    .process {
      padding: 24px 0;
      position: relative;
      &::after {
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0;
        top: 0;
        content: '';
        display: block;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.2) 50.52%,
          rgba(255, 255, 255, 0) 100%
        );
      }
      &::before {
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0;
        bottom: 0;
        content: '';
        display: block;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.2) 50.52%,
          rgba(255, 255, 255, 0) 100%
        );
      }
      .course {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 24px;
        .tips {
          font-family: Rubik;
          font-style: normal;
          font-weight: 400;
          .tips_title {
            color: #fff;
            font-size: 22px;
            line-height: 30px;
            margin-bottom: 8px;
          }
          .tips_text {
            color: rgba(255, 255, 255, 0.6);
            font-size: 16px;
            line-height: 28px;
          }
        }
        .slide {
          width: 1400px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.08);
          position: relative;
          .pay_ornot {
            position: absolute;
            width: 100%;
            height: 100%;
            bottom: 0;
            left: 0;
            padding-left: 240px;
            .get_pay {
              width: 100%;
              height: 100%;
              position: relative;
              .btn {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
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
          .line_up {
            padding: 24px;
            display: flex;
            align-items: center;
            //   transition: transform 0.5s ease;
            .numbers {
              width: 215px;
              position: relative;
              &::after {
                position: absolute;
                display: block;
                content: '';
                height: 100%;
                width: 1px;
                right: 0;
                top: 0;
                background: linear-gradient(
                  rgba(255, 255, 255, 0) 0%,
                  rgba(255, 255, 255, 0.2) 50.52%,
                  rgba(255, 255, 255, 0) 100%
                );
              }
              .num {
                color: #ffda8b;
                text-align: center;
                font-family: Cinzel Decorative;
                font-size: 155px;
                font-style: normal;
                font-weight: 700;
                line-height: 100%;
                text-transform: capitalize;
              }
              .lis {
                color: #fff;
                text-align: center;
                font-family: Rubik;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px;
                margin-top: 8px;
              }
            }
            .letter {
              flex: 1;
              padding-left: 24px;
              color: #fff;
              text-align: center;
              font-family: Rubik;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 28px;
            }
            .blurs {
              filter: blur(3px);
            }
          }
        }
      }
      .push_button {
        display: flex;
        width: 100%;
        justify-content: space-between;
        .btn_left {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 44px;
          padding: 0 24px;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: #fff;
          font-family: Rubik;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
          i {
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url('../../../assets/img/zodiac/chzo/numerology_left.svg')
              no-repeat;
            background-size: cover;
          }
          &:hover {
            background: rgba(0, 0, 0, 0.4);
          }
        }
        .btn_right {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 44px;
          padding: 0 24px;
          border-radius: 32px;
          background: #fff;
          color: #000;
          font-family: Rubik;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
          transition: transform 0.3s ease-in-out;
          i {
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url('../../../assets/img/zodiac/chzo/numerology_right.svg')
              no-repeat;
            background-size: cover;
          }
          &:hover {
            transform: scale(1.02);
          }
        }
      }
      .result {
        display: grid;
        gap: 24px;
        &_text {
          display: grid;
          gap: 16px;
          .centes {
            font-family: Rubik;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            .span {
              color: #ffda8b;
              font-size: 22px;
              line-height: 30px;
            }
            .span_two {
              :deep(p) {
                display: inline;
              }
            }
          }
        }
      }
    }

    .more {
      .title {
        color: #fff;
        text-align: center;
        font-family: Cinzel Decorative;
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 30px;
      }
      :deep(.explore_main) {
        .title {
          display: none;
        }
      }
    }
  }
}

@media (max-width: 1470px) {
  $pr: math.div(1vw, 4);
  .numerology_detail {
    &_main {
      width: 100%;
      padding: 48px 30px 32px;
      .process {
        .course {
          place-items: center;
          .slide {
            width: 350 * $pr;
          }
        }
      }
    }
  }
}

@media (max-width: 1100px) {
  .numerology_detail {
    &_main {
      .google_de_top {
        width: 90%;
        height: 115px;
        margin: 0 auto;
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .numerology_detail {
    &_main {
      width: 100%;
      margin: 0 auto;
      display: grid;
      gap: 0;
      padding: 16 * $pr 16 * $pr 32 * $pr;
      .de_title {
        font-size: 22 * $pr;
        line-height: 30 * $pr;
      }
      .google_de_top {
        width: 336 * $pr;
        height: 287 * $pr;
        margin: 16 * $pr auto 0;
      }
      .process {
        padding: 16 * $pr 0;
        margin: 32 * $pr 0;
        order: 2;
        &::after {
          height: 1 * $pr;
        }
        &::before {
          height: 1 * $pr;
        }
        .course {
          display: grid;
          gap: 16 * $pr;
          place-items: inherit;
          .tips {
            text-align: center;
            .tips_title {
              font-size: 18 * $pr;
              line-height: 24 * $pr;
              margin-bottom: 8 * $pr;
            }
            .tips_text {
              font-size: 14 * $pr;
              line-height: 24 * $pr;
            }
          }
          .slide {
            width: 343 * $pr;
            .pay_ornot {
              padding-left: 0;
              padding-top: 185 * $pr;
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
            .line_up {
              padding: 24 * $pr;
              flex-direction: column;
              border-radius: 16 * $pr;

              .numbers {
                width: 100%;
                position: relative;
                padding-bottom: 16 * $pr;
                &::after {
                  height: 1 * $pr;
                  width: 100%;
                  right: 0;
                  top: initial;
                  bottom: 0;
                  background: linear-gradient(
                    90deg,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0.2) 50.52%,
                    rgba(255, 255, 255, 0) 100%
                  );
                }
                .num {
                  font-size: 85 * $pr;
                }
                .lis {
                  font-size: 16 * $pr;
                  line-height: 22 * $pr;
                  margin-top: 8 * $pr;
                }
              }
              .letter {
                flex: 1;
                padding-left: 0;
                padding-top: 16 * $pr;
                font-size: 14 * $pr;
                line-height: 24 * $pr;
              }
              .blurs {
                filter: blur(3 * $pr);
              }
            }
          }
        }
        .push_button {
          display: flex;
          justify-content: space-between;
          .btn_left {
            width: auto;
            height: 44 * $pr;
            padding: 0 24 * $pr;
            border-radius: 32 * $pr;
            border: 1 * $pr solid rgba(255, 255, 255, 0.4);
            i {
              width: 24 * $pr;
              height: 24 * $pr;
            }
            span {
              display: none;
            }
          }
          .btn_right {
            height: 44 * $pr;
            padding: 0 24 * $pr;
            border-radius: 32 * $pr;
            font-size: 16 * $pr;
            line-height: 22 * $pr;
            i {
              width: 24 * $pr;
              height: 24 * $pr;
            }
            span {
              display: none;
            }
          }
        }
        .result {
          display: grid;
          gap: 16 * $pr;
          &_text {
            display: grid;
            gap: 16 * $pr;
            .centes {
              font-size: 14 * $pr;
              line-height: 24 * $pr;
              .span {
                color: #ffda8b;
                font-size: 18 * $pr;
                line-height: 24 * $pr;
              }
            }
          }
        }
      }

      .more {
        order: 2;
        .title {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
          padding-bottom: 16 * $pr;
        }
      }
    }
  }
}
</style>
