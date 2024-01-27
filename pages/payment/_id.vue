<template>
  <div class="pay">
    <div class="pay_main">
      <a :href="payRouter" class="btn_back">{{ '< ' }}back</a>
      <div class="feature">
        <div>
          <div class="pay_ment">
            <div class="pay_ment_titles">
              <p class="tals">Cart</p>
              <div class="msg">
                <div class="imgs">
                  <img :src="imgType[routeId]" alt="#" />
                </div>
                <div class="teat">
                  <div class="teat_title">
                    Guide to Your Astrology Birth Chart
                    <span class="title_money">${{ isPrice.old_price }}</span>
                  </div>
                  <p class="teat_desc">
                    lt's easy to find out your birth horoscope with a birthchart
                    calculator. In your natal chart, the zodiac signenergy at
                    play can tell show you strengths, weaknesses,biggest fears,
                    and more. Here, you'll receive a detailedbirth chart
                    analysis that really shows who you really are.
                  </p>
                </div>
              </div>
            </div>
            <div class="pay_ment_desc">
              <p class="tals">Credit Card</p>
              <div class="pay_form">
                <client-only>
                  <a-form-model
                    ref="payMentForm"
                    :model="payFormData"
                    :rules="payRulesForm"
                  >
                    <div class="form_main">
                      <div>
                        <p class="sub_title">Payment method</p>
                        <a-form-model-item prop="payType">
                          <a-select
                            v-model="payFormData.payType"
                            placeholder="Select payment card type"
                            @change="payTypeChange"
                          >
                            <a-select-option value="1">
                              Credit card
                            </a-select-option>
                            <a-select-option value="2"> PIX </a-select-option>
                            <a-select-option value="3"> OVO </a-select-option>
                            <a-select-option value="4"> DANA </a-select-option>
                            <a-select-option value="5"> QRIS </a-select-option>
                            <a-select-option value="6">
                              LinkAjaApplink
                            </a-select-option>
                            <a-select-option value="7">
                              IndonesiaBankTransfer
                            </a-select-option>
                            <a-select-option value="8">
                              ShopeepayJumpApp
                            </a-select-option>
                          </a-select>
                        </a-form-model-item>
                      </div>
                      <div>
                        <p class="sub_title">First Name</p>
                        <a-form-model-item prop="firstName">
                          <a-input
                            v-model="payFormData.firstName"
                            allow-clear
                            placeholder="Enter card First Name"
                          />
                        </a-form-model-item>
                      </div>
                      <div>
                        <p class="sub_title">Last Name</p>
                        <a-form-model-item prop="lastName">
                          <a-input
                            v-model="payFormData.lastName"
                            allow-clear
                            placeholder="Enter Last Name"
                          />
                        </a-form-model-item>
                      </div>
                      <div>
                        <p class="sub_title">Email</p>
                        <a-form-model-item prop="email">
                          <a-input
                            v-model="payFormData.email"
                            allow-clear
                            :disabled="isDisable"
                            placeholder="Enter Email"
                          />
                        </a-form-model-item>
                      </div>
                      <div v-if="payFormData.payType === '1'">
                        <p class="sub_title">Card Number*</p>
                        <a-form-model-item prop="card">
                          <a-input
                            v-model="payFormData.card"
                            allow-clear
                            @input="handleCardInput"
                            placeholder="Enter card number"
                          />
                        </a-form-model-item>
                      </div>
                      <div class="card_msg" v-if="payFormData.payType === '1'">
                        <div>
                          <p class="sub_title">Expiry Date*</p>
                          <div class="mm_yy">
                            <div>
                              <a-form-model-item>
                                <a-input
                                  v-model="payFormData.month"
                                  placeholder="MM"
                                  @input="handleMonthInput"
                                  type="number"
                                />
                              </a-form-model-item>
                            </div>
                            /
                            <div class="yy">
                              <a-form-model-item prop="year">
                                <a-input
                                  v-model="payFormData.year"
                                  placeholder="YYYY"
                                  @input="handleYearInput"
                                  type="number"
                                />
                              </a-form-model-item>
                            </div>
                          </div>
                        </div>
                        <div class="code_cvc">
                          <p class="sub_title">Card Code (CVC)*</p>
                          <a-form-model-item prop="code">
                            <a-input
                              v-model="payFormData.code"
                              allow-clear
                              placeholder="CVC"
                            />
                          </a-form-model-item>
                        </div>
                      </div>
                    </div>
                  </a-form-model>
                </client-only>
              </div>
            </div>
            <div class="policy">
              As part of this service, you will also receive occasional special
              offers fromSeekastrology.com. You can modify or cancel your
              subscription at any time.By clicking on "PLACE ORDER" you accept
              the the <a href="#">Terms of Service</a> and
              <a href="#">Privacy Policy</a>.
            </div>
            <div class="pay_ment_money">
              <div class="price">
                Total (USD): <span class="truth">${{ isPrice.price }}</span
                ><span class="first">( ${{ isPrice.old_price }} )</span>
              </div>
              <div class="failure" v-if="payStatusFailed">
                <div class="so">
                  <i class="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"
                        fill="#FF3939"
                      />
                    </svg>
                  </i>
                  Payment failure
                </div>
                <a class="icon" @click="failure">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12.0007 10.5867L16.9507 5.63672L18.3647 7.05072L13.4147 12.0007L18.3647 16.9507L16.9507 18.3647L12.0007 13.4147L7.05072 18.3647L5.63672 16.9507L10.5867 12.0007L5.63672 7.05072L7.05072 5.63672L12.0007 10.5867Z"
                      fill="#FF3939"
                    />
                  </svg>
                </a>
              </div>
              <button class="button" @click="setCheckout">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
        <div class="pay_tips">
          <div class="lis">
            <el-collapse :title="'Shop Help'" :id="1">
              <template>
                <div class="easy">
                  lt’s easy to find out your birth horoscope with a birthchart
                  calculator. In your natal chart, the zodiac signenergy at play
                  can tell show you strengths, weaknesses,biggest fears, and
                  more. Here, you’ll receive a detailedbirth chart analysis that
                  really shows who you really are.lt’s easy to find out your
                  birth horoscope with a birthchart calculator. In your natal
                  detailedbirth chart analysis that really shows who you really
                  are.
                </div>
              </template></el-collapse
            >
            <el-collapse :title="'Terms of Trade'" :id="2">
              <template>
                <div class="easy">
                  lt’s easy to find out your birth horoscope with a birthchart
                  calculator. In your natal chart, the zodiac signenergy at play
                  can tell show you strengths, weaknesses,biggest fears, and
                  more. Here, you’ll receive a detailedbirth chart analysis that
                  really shows who you really are.lt’s easy to find out your
                  birth horoscope with a birthchart calculator. In your natal
                  chart, the zodiac signenergy at play can tell show you
                  strengths, weaknesses,biggest fears, and more. Here, you’ll
                  are.
                </div>
              </template></el-collapse
            >
            <el-collapse :title="'Privacy Polivcy'" :id="3">
              <template>
                <div class="easy">
                  lt’s easy to find out your birth horoscope with a birthchart
                  calculator. In your natal chart, the zodiac signenergy at play
                  can tell show you strengths, weaknesses,biggest fears, and
                  more. Here, you’ll receive a detailedbirth chart analysis that
                  really shows who you really are.lt’s easy to find out your
                  birth horoscope with a birthchart calculator. In your natal
                  chart, the zodiac signenergy at play can tell show you
                  strengths, weaknesses,biggest fears, and more. Here, you’ll
                  receive a detailedbirth chart analysis that really shows who
                  you really are.lt’s easy to find out your birth horoscope with
                  a birthchart calculator. In your natal chart, the zodiac
                  signenergy at play can tell show you strengths,
                  weaknesses,biggest fears, and more. Here, you’ll receive a
                  detailedbirth chart analysis that really shows who you really
                  are. a birthchart calculator. In your natal chart, the zodiac
                  signenergy at play can tell show you strengths,
                  weaknesses,biggest fears, and more. Here, you’ll receive a
                  detailedbirth chart analysis that really shows who you really
                  a birthchart calculator. In your natal chart, the zodiac
                  signenergy at play can tell show you strengths,
                  weaknesses,biggest fears, and more. Here, you’ll receive a
                  detailedbirth chart analysis that really shows who you really
                  a birthchart calculator. In your natal chart, the zodiac
                  signenergy at play can tell show you strengths,
                  weaknesses,biggest fears, and more. Here, you’ll receive a
                  detailedbirth chart analysis that really shows who you really
                  a birthchart calculator. In your natal chart, the zodiac
                  signenergy at play can tell show you strengths,
                  weaknesses,biggest fears, and more. Here, you’ll receive a
                  detailedbirth chart analysis that really shows who you really
                </div>
              </template></el-collapse
            >
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
  </div>
</template>

<script>
export default {
  async asyncData({ error, $apiList, params }) {
    try {
      let routeId = parseInt(params.id)
      let [isPrice] = await Promise.all([
        $apiList.user
          .getUserPrice({
            id: params.id,
          })
          .then((res) => {
            return res || null
          }),
      ])
      return { routeId, isPrice }
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
  data() {
    return {
      payFormData: {
        payType: '1',
        firstName: '',
        lastName: '',
        card: '',
        month: '',
        year: '',
        code: '',
        email: '',
      },
      payRulesForm: {
        payType: [
          {
            required: true,
            message: 'Please select card type',
            trigger: 'change',
          },
        ],
        firstName: [
          {
            required: true,
            message: 'Please fill in the first name',
            trigger: 'change',
          },
        ],
        lastName: [
          {
            required: true,
            message: 'Please fill in the last name',
            trigger: 'change',
          },
        ],
        email: [
          {
            required: true,
            message: 'Please enter email',
            trigger: 'change',
          },
          {
            type: 'email',
            message: 'Please input the correct email address',
            trigger: ['blur', 'change'],
          },
        ],
        card: [
          {
            required: true,
            message: 'Please fill in the card number',
            trigger: 'change',
          },
        ],
        year: [
          {
            required: true,
            message: 'Please enter MM/YY',
            trigger: 'change',
          },
          {
            validator: this.validateYear,
            trigger: 'blur',
          },
        ],
        code: [
          {
            required: true,
            message: 'Please fill in the  code',
            trigger: 'change',
          },
        ],
      },
      imgType: [
        '',
        require('~/assets/img/payment/birth_chart.jpg'),
        require('~/assets/img/payment/numerology.jpg'),
        require('~/assets/img/payment/kundli.jpg'),
        require('~/assets/img/payment/china_zodiac.jpg'),
      ],
      payDataStr: '',
      isLoading: false,
      payStatusFailed: false,
      payRouter: '',
      isDisable: false,
    }
  },
  mounted() {
    if (process.client) {
      this.payDataStr = localStorage.getItem('payData')
      this.payRouter = localStorage.getItem('payRouter')
      let userEmail = JSON.parse(localStorage.getItem('userInfo'))
      if (userEmail.userInfo?.email) {
        this.payFormData.email = userEmail.userInfo?.email
        this.isDisable = true
      }
    }
  },
  methods: {
    setCheckout() {
      this.$refs.payMentForm.validate((valid) => {
        if (valid) {
          this.isLoading = true
          this.$apiList.user
            .setUserPayMent({
              origin: process.env.origin,
              card: this.payFormData.card.replace(/\s/g, ''),
              first_name: this.payFormData.firstName,
              last_name: this.payFormData.lastName,
              email: this.payFormData.email, // 用户邮箱
              expiration_month: this.payFormData.month, // 过期月
              expiration_year: this.payFormData.year, //过期年
              security_code: this.payFormData.code, // 安全码
              pay_type: this.payFormData.payType, // 卡片类型
              price_id: this.routeId, //订单类型 1-出生图
              data: this.payDataStr, // 请求的数据
            })
            .then((res) => {
              this.isLoading = false
              console.log('支付返回数据', res)
              if (res?.code || res.status !== '1') {
                // 提示通知
                this.$notification.open({
                  message: 'Error',
                  description: res.msg,
                  duration: 2,
                  style: {
                    color: '#f00',
                  },
                })
                this.payStatusFailed = true
              } else {
                this.payStatusFailed = false
                if (res.issuer_url.trim() == '') {
                  window.changePageUrl = `${this.payRouter}?order_no=${res.order_no}`
                  window.location.href = `${this.payRouter}?order_no=${res.order_no}`
                } else {
                  window.open(res.issuer_url, '_blank')
                }
              }
            })
        }
      })
    },
    // 验证年月是否都有值
    validateYear(rule, value, callback) {
      if (value && this.payFormData.month) {
        callback()
      } else {
        callback(new Error('Please enter MM/YY'))
      }
    },

    handleMonthInput() {
      this.payFormData.month = this.payFormData.month
        .replace(/\D/g, '')
        .slice(0, 2)
    },
    handleYearInput() {
      this.payFormData.year = this.payFormData.year
        .replace(/\D/g, '')
        .slice(0, 4)
    },
    handleCardInput() {
      // 去除非数字字符
      let cleanedNumber = this.payFormData.card.replace(/\D/g, '')
      cleanedNumber = cleanedNumber.slice(0, 16)
      // 每四个字符添加一个空格
      cleanedNumber = cleanedNumber.replace(/(.{4})/g, '$1  ')
      // 更新数据模型
      this.payFormData.card = cleanedNumber.trim()
    },
    failure() {
      this.payStatusFailed = false
    },
    // 切换卡片类型
    payTypeChange(val) {
      if (val !== '1') {
        this.payFormData.card = ''
        this.payFormData.month = '' // 过期月
        this.payFormData.year = '' //过期年
        this.payFormData.code = '' // 安全码
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.pay {
  width: 100%;
  &_main {
    width: 1400px;
    margin: 48px auto;
    padding-left: 120px;
    .btn_back {
      display: inline-block;
      height: 44px;
      padding: 8px 32px;
      border-radius: 42px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: rgba(255, 255, 255, 0.6);
      font-family: Rubik;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      margin-bottom: 24px;
      cursor: pointer;
    }
    .feature {
      display: flex;
      .pay_ment {
        width: 760px;
        padding-right: 68px;
        position: relative;
        display: grid;
        grid-template-columns: 1fr;
        gap: 32px;
        &::before {
          position: absolute;
          width: 1px;
          height: 100%;
          max-height: 458px;
          top: 0;
          right: 0;
          content: '';
          background: linear-gradient(
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50.52%,
            rgba(255, 255, 255, 0) 100%
          );
        }
        .tals {
          color: #fff;
          font-family: 'Cinzel Decorative';
          font-size: 22px;
          font-style: normal;
          font-weight: 700;
          line-height: 30px;
        }
        .pay_ment_titles {
          .msg {
            display: flex;
            padding-top: 8px;
            .imgs {
              width: 110px;
              height: 110px;
              img {
                border-radius: 8px;
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .teat {
              flex: 1;
              padding-left: 16px;
              &_title {
                color: #fff;
                font-family: Rubik;
                font-size: 22px;
                font-style: normal;
                font-weight: 400;
                line-height: 30px;
                margin-bottom: 8px;
                position: relative;
                padding-right: 100px;
                .title_money {
                  position: absolute;
                  top: 0;
                  right: 0;
                }
              }
              &_desc {
                color: rgba(255, 255, 255, 0.6);
                font-family: Rubik;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 18px;
              }
            }
          }
        }
        .pay_ment_desc {
          .pay_form {
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.08);
            padding: 16px;
            margin-top: 8px;

            :deep(.ant-form-item) {
              margin-bottom: 0;
            }
            :deep(.ant-input) {
              &::placeholder {
                color: rgba(255, 255, 255, 0.3);
                font-family: 'Rubik';
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 18px;
              }
            }
            .ant-input:focus,
            .ant-input-focused {
              box-shadow: none; /* 可选，去除获取焦点时的阴影效果 */
            }
            :deep(.ant-form-item-with-help) {
              margin-bottom: 0;
            }
            :deep(.ant-input) {
              height: 44px !important;
              border-radius: 24px !important;
              border: 1px solid rgba(255, 255, 255, 0.6);
              background: rgba(7, 6, 6, 0.1);
              padding-left: 18px;
              color: #fff;
              font-family: 'Rubik';
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 18px;
            }
            :deep(.ant-input-clear-icon) {
              color: rgba(255, 255, 255, 0.08);
              font-size: 22px;
            }

            :deep(.ant-form-item-control) {
              line-height: 0;
            }
            :deep(.ant-select-selection) {
              height: 44px !important;
              border-radius: 24px !important;
              border: 1px solid rgba(255, 255, 255, 0.6);
              background: rgba(7, 6, 6, 0.1);
              padding-left: 18px;
              color: #fff;
              font-family: 'Rubik';
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 18px;
              .ant-select-selection__rendered {
                height: 100%;
                margin: 0;
                .ant-select-selection-selected-value {
                  line-height: 42px;
                }
                .ant-select-selection__placeholder {
                  color: rgba(255, 255, 255, 0.3);
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                }
              }
            }
            :deep(.has-error .ant-input),
            :deep(.has-error .ant-select-selection) {
              border-color: none;
            }
            :deep(.ant-form-explain) {
              padding-left: 18px;
            }
            .form_main {
              display: grid;
              grid-template-columns: 1fr;
              gap: 24px;
              .sub_title {
                color: #fff;
                font-family: Rubik;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px;
                margin-bottom: 8px;
              }
              .card_msg {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
                .mm_yy {
                  display: flex;
                  align-items: center;
                  color: rgba(255, 255, 255, 0.6);
                  font-family: Rubik;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 18px;
                  background: rgba(7, 6, 6, 0.1);
                  border-radius: 24px !important;
                  border: 1px solid rgba(255, 255, 255, 0.6);
                  padding-left: 10px;
                  position: relative;
                  :deep(.ant-input) {
                    width: 35px;
                    height: 44px !important;
                    border-radius: inherit !important;
                    border: none;
                    background: inherit;
                    padding-left: 7px;
                    padding-right: 0;
                  }
                  :deep(.ant-form-explain) {
                    padding-left: 10px;
                    width: 300px;
                    position: absolute !important;
                    left: -50px;
                  }

                  .yy {
                    flex: 1;
                    :deep(.ant-input) {
                      width: 100%;
                    }
                  }
                }
              }
            }
          }
        }
        .policy {
          color: rgba(255, 255, 255, 0.6);
          font-family: Rubik;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 24px;
          > a {
            color: #9747ff;
            text-decoration-line: underline;
          }
        }
        .pay_ment_money {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          .price {
            color: #fff;
            font-family: Rubik;
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: 30px;
            .truth {
              color: #ffda8b;
              font-size: 28px;
              font-style: normal;
              font-weight: 600;
            }
            .first {
              display: inline-block;
              padding-left: 8px;
              text-decoration: line-through;
            }
          }
          .failure {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 16px;
            border-radius: 8px;
            background: rgba(255, 57, 57, 0.2);
            color: #ff3939;
            font-family: Rubik;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            .icon {
              width: 24px;
              height: 24px;
              display: inline-block;
            }
            .so {
              display: flex;
              .icon {
                margin-right: 8px;
              }
            }
          }
          .button {
            width: 338px;
            height: 56px;
            color: #000;
            font-family: Rubik;
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: 30px;
            border-radius: 42px;
            background: #ffda8b;
          }
        }
      }
      .pay_tips {
        flex: 1;
        padding-left: 65px;
        .lis {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          :deep(.deployable) {
            padding: 0 24px 0 16px;
            .deployable_text1_title {
              padding: 16px;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
            }
          }
          .easy {
            color: rgba(255, 255, 255, 0.6);
            font-family: Rubik;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            padding-left: 16px;
            max-height: 360px;
            overflow: auto;
            &::-webkit-scrollbar {
              width: 3px;
            }
            &::-webkit-scrollbar-thumb {
              background-color: #999999;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1470px) {
  .pay {
    width: 100%;
    &_main {
      width: 100%;
      margin: 48px auto;
      padding: 0 60px;
    }
  }
}

@media (max-width: 1220px) {
  .pay {
    width: 100%;
    &_main {
      .feature {
        display: flex;
        flex-direction: column;
        align-items: center;
        .pay_ment {
          padding-right: 0;
          padding-bottom: 32px;
          &::before {
            position: absolute;
            width: 100%;
            height: 1px;
            top: inherit;
            right: 0;
            bottom: 0;
            content: '';
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.2) 50.52%,
              rgba(255, 255, 255, 0) 100%
            );
          }
        }
        .pay_tips {
          flex: 1;
          padding-left: 0;
          padding-top: 32px;
          .lis {
            display: grid;
            grid-template-columns: repeat(1, 600px);
          }
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .pay {
    &_main {
      .feature {
        .pay_ment {
          width: 100%;
        }
        .pay_tips {
          width: 100%;
          .lis {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(1, 100%);
            gap: 16px;
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .pay {
    width: 100%;
    &_main {
      width: 100%;
      margin: 24 * $pr auto 32 * $pr;
      padding: 0 16 * $pr;
      .btn_back {
        display: inline-block;
        height: 44 * $pr;
        padding: 8 * $pr 32 * $pr;
        border-radius: 42 * $pr;
        border: 1 * $pr solid rgba(255, 255, 255, 0.3);
        color: rgba(255, 255, 255, 0.6);
        font-family: Rubik;
        font-size: 16 * $pr;
        line-height: 28 * $pr;
        margin-bottom: 32 * $pr;
      }
      .feature {
        .pay_ment {
          width: 100%;
          padding-right: 0;
          padding-bottom: 32 * $pr;
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32 * $pr;
          &::before {
            height: 1 * $pr;
            max-height: inherit;
            top: inherit;
            right: 0;
            bottom: 0;
          }
          .tals {
            font-size: 22 * $pr;
            line-height: 30 * $pr;
          }
          .pay_ment_titles {
            .msg {
              display: flex;
              padding-top: 8 * $pr;
              .imgs {
                width: 60 * $pr;
                height: 60 * $pr;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius: 8 * $pr;
                }
              }
              .teat {
                flex: 1;
                padding-left: 16 * $pr;
                &_title {
                  color: #fff;
                  font-family: Rubik;
                  font-size: 22 * $pr;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 30 * $pr;
                  margin-bottom: 8 * $pr;
                  position: relative;
                  padding-right: 60 * $pr;
                  .title_money {
                    position: absolute;
                    top: 0;
                    right: 0;
                  }
                }
                &_desc {
                  font-size: 14 * $pr;
                  line-height: 18 * $pr;
                }
              }
            }
          }
          .pay_ment_desc {
            .pay_form {
              border-radius: 8 * $pr;
              background: rgba(255, 255, 255, 0.08);
              padding: 16 * $pr;
              margin-top: 8 * $pr;

              :deep(.ant-form-item) {
                margin-bottom: 0;
              }
              :deep(.ant-input) {
                &::placeholder {
                  font-size: 14 * $pr;
                  line-height: 18 * $pr;
                }
              }
              :deep(.ant-form-item-with-help) {
                margin-bottom: 0;
              }
              :deep(.ant-input) {
                height: 44 * $pr !important;
                border-radius: 24 * $pr !important;
                border: 1 * $pr solid rgba(255, 255, 255, 0.6);
                padding-left: 18 * $pr;
                font-size: 16 * $pr;
                line-height: 18 * $pr;
              }
              :deep(.ant-input-clear-icon) {
                font-size: 22 * $pr;
              }

              :deep(.ant-form-item-control) {
                line-height: 0;
              }
              :deep(.ant-select-selection) {
                height: 44 * $pr !important;
                border-radius: 24 * $pr !important;
                border: 1 * $pr solid rgba(255, 255, 255, 0.6);
                background: rgba(7, 6, 6, 0.1);
                padding-left: 18 * $pr;
                color: #fff;
                font-family: 'Rubik';
                font-size: 16 * $pr;
                font-style: normal;
                font-weight: 400;
                line-height: 18 * $pr;
                .ant-select-selection__rendered {
                  height: 100%;
                  margin: 0;
                  .ant-select-selection-selected-value {
                    line-height: 42 * $pr;
                  }
                  .ant-select-selection__placeholder {
                    color: rgba(255, 255, 255, 0.3);
                    font-size: 14 * $pr;
                    font-style: normal;
                    font-weight: 400;
                  }
                }
              }
              :deep(.has-error .ant-input),
              :deep(.has-error .ant-select-selection) {
                border-color: none;
              }
              :deep(.ant-form-explain) {
                padding-left: 18 * $pr;
              }
              .form_main {
                display: grid;
                grid-template-columns: 1fr;
                gap: 24 * $pr;
                .sub_title {
                  font-size: 16 * $pr;
                  line-height: 22 * $pr;
                  margin-bottom: 8 * $pr;
                }
                .card_msg {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 8 * $pr;
                  .mm_yy {
                    display: flex;
                    align-items: center;
                    color: rgba(255, 255, 255, 0.6);
                    font-family: Rubik;
                    font-size: 14 * $pr;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 18 * $pr;
                    background: rgba(7, 6, 6, 0.1);
                    border-radius: 24 * $pr !important;
                    border: 1 * $pr solid rgba(255, 255, 255, 0.6);
                    padding-left: 10 * $pr;
                    :deep(.ant-input) {
                      width: 35 * $pr;
                      height: 44 * $pr !important;
                      border-radius: inherit !important;
                      border: none;
                      background: inherit;
                      padding-left: 7 * $pr;
                      padding-right: 0;
                    }
                    :deep(.ant-form-explain) {
                      padding-left: 10px;
                      width: 180 * $pr;
                      position: absolute !important;
                      left: -50 * $pr;
                    }
                    .yy {
                      flex: 1;
                      :deep(.ant-input) {
                        width: 100%;
                      }
                    }
                  }
                }
              }
            }
          }
          .policy {
            font-size: 14 * $pr;
            line-height: 24 * $pr;
            > a {
              color: #9747ff;
              text-decoration-line: underline;
            }
          }
          .pay_ment_money {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16 * $pr;
            .price {
              font-size: 22 * $pr;
              line-height: 30 * $pr;
              .truth {
                color: #ffda8b;
                font-size: 28 * $pr;
                font-weight: 600;
              }
              .first {
                display: inline-block;
                padding-left: 8 * $pr;
                text-decoration: line-through;
              }
            }
            .failure {
              padding: 8 * $pr 16 * $pr;
              border-radius: 8 * $pr;
              font-family: Rubik;
              font-size: 18 * $pr;
              line-height: 24 * $pr;
              .icon {
                width: 24px;
                height: 24px;
                display: inline-block;
              }
              .so {
                display: flex;
                .icon {
                  margin-right: 8px;
                }
              }
            }
            .button {
              width: 100%;
              height: 56 * $pr;
              font-size: 22 * $pr;
              line-height: 30 * $pr;
              border-radius: 42 * $pr;
            }
          }
        }
        .pay_tips {
          flex: 1;
          padding-left: 0;
          padding-top: 32 * $pr;
          width: 100%;
          .lis {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(1, 100%);
            gap: 16 * $pr;
            :deep(.deployable) {
              padding: 0 24 * $pr 0 16 * $pr;
              .deployable_text1_title {
                padding: 16 * $pr;
                font-size: 16 * $pr;
                line-height: 22 * $pr;
              }
            }
            .easy {
              font-size: 14 * $pr;
              line-height: 24 * $pr;
              padding-left: 16 * $pr;
              max-height: 360px;
              overflow-y: scroll;
              &::-webkit-scrollbar {
                width: 3 * $pr !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
