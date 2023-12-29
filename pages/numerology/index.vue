<template>
  <div class="numerology">
    <google-ad :id="''" classNames="google_ad_top"></google-ad>
    <div class="numerology_main">
      <div class="calculator">
        <p class="calculator_title">Numerology Calculator</p>
        <p class="calculator_text">
          Numerology calculator helps you decode your magical numbers, hidden
          powers, personality traits, and life challenges using numerology
          number and name. Numerology, the study of numbers is based on your
          name and birth date. The sum of value, which then becomes your ruling
          number, provides a correlation of energies exist in the cosmic plan.
          So, unleash your hidden talent and discover what numbers hold for your
          future using the tool, Numerology Calculator:
        </p>
        <div class="calculator_from">
          <div class="froms">
            <client-only>
              <a-form-model
                ref="numerologyFrom"
                :model="numerologyData"
                :rules="numerologyRules"
              >
                <div class="mini_name">
                  <a-form-model-item prop="name">
                    <a-input
                      v-model="numerologyData.name"
                      allow-clear
                      placeholder="Name"
                    />
                  </a-form-model-item>
                </div>
                <div class="mini_time">
                  <a-form-model-item prop="year">
                    <a-select
                      placeholder="Year"
                      style="width: 100%"
                      @change="yearChange"
                    >
                      <a-select-option v-for="i in years" :key="i">
                        {{ i }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item prop="month">
                    <a-select
                      placeholder="Mon"
                      style="width: 100%"
                      @change="monthChange"
                    >
                      <a-select-option v-for="i in months" :key="i.li">
                        {{ i.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item prop="day">
                    <a-select
                      placeholder="Day"
                      style="width: 100%"
                      @change="daysChange"
                    >
                      <a-select-option v-for="l in 31" :key="l">
                        {{ l }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </div>
              </a-form-model>
            </client-only>
          </div>
          <div class="button_i">
            <button @click="numerologySubmit">Match Your Kundli</button>
          </div>
        </div>
        <div class="referral">
          <div>
            <p class="calculator_title_mini">
              Dasama Porutham (Ten Compatibility Factors) for Kundali Matching
            </p>
            <p class="calculator_text">
              Dasama (ten) Porutham or Thirumana (marriage) Porutham is a vital
              part of India's traditional marriage process. Dasama Porutham was
              devised by Indian sages of ancient times to match the prospective
              couple's horoscopes to check the levels of compliance and
              flexibility between them. These top ten factors have since been
              perceived as the yardstick for gauging the compatibility of a
              couple in Kundali Matching. The Poruthams are evaluated mainly
              based on the comparison of Nakshatras (birth stars) of the boy and
              the girl.
            </p>
          </div>
          <div>
            <p class="calculator_title_mini">
              Dasama Porutham (Ten Compatibility Factors) for Kundali Matching
            </p>
            <p class="calculator_text">
              Dasama (ten) Porutham or Thirumana (marriage) Porutham is a vital
              part of India's traditional marriage process. Dasama Porutham was
              devised by Indian sages of ancient times to match the prospective
              couple's horoscopes to check the levels of compliance and
              flexibility between them. These top ten factors have since been
              perceived as the yardstick for gauging the compatibility of a
              couple in Kundali Matching. The Poruthams are evaluated mainly
              based on the comparison of Nakshatras (birth stars) of the boy and
              the girl.
            </p>
          </div>
          <div>
            <p class="calculator_title_mini">What is a Destiny number?</p>
            <p class="calculator_text">
              The name's core numeral is a destiny or expression number.This is
              the digit, which describes who you are and what you are or what
              you become.This is referred to as destiny and your life's purpose.
              This is the sum of all name numbers of alphabets.
            </p>
          </div>
          <div>
            <p class="calculator_title_mini">What is a Destiny number?</p>
            <p class="calculator_text">
              The name's core numeral is a destiny or expression number.This is
              the digit, which describes who you are and what you are or what
              you become.This is referred to as destiny and your life's purpose.
              This is the sum of all name numbers of alphabets.
            </p>
          </div>
        </div>
      </div>
      <div class="cal_cent">
        <google-ad :id="''" classNames="google_ad_cat"></google-ad>
        <el-widget class="widget"></el-widget>
      </div>
    </div>
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    const currentYear = new Date().getFullYear()
    const startYear = 1928
    const years = Array.from(
      { length: currentYear - startYear + 1 },
      (_, index) => startYear + index
    )
    return {
      years,
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
      numerologyData: {
        name: '',
        year: '',
        month: '',
        day: '',
      },
      numerologyRules: {
        name: [
          {
            required: true,
            message: 'Please enter name',
            trigger: 'change',
          },
        ],
        year: [
          {
            required: true,
            message: 'Year',
            trigger: 'change',
          },
        ],
        month: [
          {
            required: true,
            message: 'Month',
            trigger: 'change',
          },
        ],
        day: [
          {
            required: true,
            message: 'Day',
            trigger: 'change',
          },
        ],
      },
      isLoading: false,
    }
  },
  methods: {
    yearChange(value) {
      this.numerologyData.year = value
    },
    monthChange(value) {
      this.numerologyData.month = value
    },
    daysChange(value) {
      this.numerologyData.day = value
    },
    numerologySubmit() {
      this.$refs.numerologyFrom.validate((valid) => {
        if (valid) {
          this.isLoading = true
          let dayNumber = this.numerologyData.day.toString().padStart(2, '0') //处理小于10的数字,拼0
          this.$apiList.test
            .getNumerology({
              name: this.numerologyData.name,
              date: `${this.numerologyData.year}${this.numerologyData.month}${dayNumber}`,
            })
            .then((res) => {
              this.isLoading = false
              localStorage.setItem('numerology', JSON.stringify(res))
              localStorage.setItem(
                'numerUser',
                JSON.stringify(this.numerologyData)
              )
              window.changePageUrl = '/numerology/details/'
              window.location.href = '/numerology/details/'
            })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.numerology {
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
    .calculator {
      .calculator_title {
        color: #fff;
        font-family: Cinzel Decorative;
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 48px;
        margin-bottom: 8px;
      }
      .calculator_text {
        color: rgba(255, 255, 255, 0.6);
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
      }
      .calculator_title_mini {
        color: #fff;
        font-family: Rubik;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
        margin-bottom: 8px;
      }
      .referral {
        display: grid;
        gap: 16px;
      }

      &_from {
        margin: 56px 0;
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
        .froms {
          width: 440px;
          margin: 0 auto;

          .mini_name {
            margin-bottom: 16px;
          }
          .mini_time {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 5px;
          }

          // 深层修改input样式
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
          :deep(.ant-form-item-with-help) {
            margin-bottom: 0;
          }

          :deep(.ant-input) {
            height: 34px !important;
            border-radius: 24px !important;
            border: 1px solid rgba(255, 255, 255, 0.5);
            background: rgba(0, 0, 0, 0.2);
            padding-left: 18px;
            color: #fff;
            font-family: 'Rubik';
            font-size: 14px;
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
            position: relative;
          }
          :deep(.ant-select-selection) {
            height: 34px !important;
            border-radius: 24px !important;
            border: 1px solid rgba(255, 255, 255, 0.5);
            background: rgba(0, 0, 0, 0.2);
            padding-left: 18px;
            color: #fff;
            font-family: 'Rubik';
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
            .ant-select-selection__rendered {
              height: 100%;
              margin: 0;
              .ant-select-selection-selected-value {
                line-height: 32px;
              }
              .ant-select-selection__placeholder {
                color: rgba(255, 255, 255, 0.3);
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
              }
            }
            .ant-select-arrow {
              display: none;
            }
          }
          :deep(.ant-form-explain) {
            padding: 0 18px 0 0;
            position: absolute;
            right: 0;
            bottom: 0;
            line-height: 8px;
            font-size: 12px;
          }
          :deep(.has-error .ant-input),
          :deep(.has-error .ant-select-selection) {
            border-color: #f5222d;
            background: rgba(0, 0, 0, 0.2);
            &:hover {
              background-color: rgba(0, 0, 0, 0.2);
            }
          }
        }

        .button_i {
          padding-top: 24px;
          display: flex;
          justify-content: center;
          button {
            width: 344px;
            height: 44px;
            border-radius: 42px;
            background: #fff;
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
    .cal_cent {
      width: 354px;
      .google_ad_cat {
        width: 300px;
        height: 625px;
        margin: 0 auto 32px;
      }
    }
  }
}

@media (max-width: 1470px) {
  .numerology {
    &_main {
      width: 100%;
      gap: 0 52px;
      padding: 48px 30px;
    }
  }
}
@media (max-width: 1020px) {
  .numerology {
    &_main {
      grid-template-columns: repeat(1, 1fr);
      gap: 32px;
      .cal_cent {
        width: 500px;
        margin: 0 auto;
        .google_ad_cat {
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
  .numerology {
    .google_ad_top {
      display: flex;
      flex-direction: column;
      width: 300 * $pr;
      height: 67 * $pr;
      margin: 0 auto;
    }
    &_main {
      gap: 32 * $pr;
      padding: 16 * $pr 16 * $pr 32 * $pr;
      .calculator {
        .calculator_title {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
          margin-bottom: 8 * $pr;
        }
        .calculator_text {
          font-size: 14 * $pr;
          line-height: 24 * $pr;
        }
        .calculator_title_mini {
          font-size: 18 * $pr;
          line-height: 24 * $pr;
          margin-bottom: 8 * $pr;
        }
        .referral {
          display: grid;
          gap: 16 * $pr;
        }

        &_from {
          margin: 32 * $pr 0;
          padding: 24 * $pr 0;
          position: relative;
          &::after {
            height: 1 * $pr;
          }
          &::before {
            height: 1 * $pr;
          }
          .froms {
            width: 100%;
            .mini_name {
              margin-bottom: 16 * $pr;
            }
            .mini_time {
              gap: 5 * $pr;
            }

            // 深层修改input样式
            :deep(.ant-form-item) {
              margin-bottom: 0;
            }
            :deep(.ant-input) {
              &::placeholder {
                color: rgba(255, 255, 255, 0.4);
                font-family: 'Rubik';
                font-size: 14 * $pr;
                line-height: 18 * $pr;
              }
            }
            :deep(.ant-form-item-with-help) {
              margin-bottom: 0;
            }
            :deep(.ant-input) {
              height: 34 * $pr !important;
              border-radius: 24 * $pr !important;
              border: 1 * $pr solid rgba(255, 255, 255, 0.5);
              padding-left: 16 * $pr;
              font-size: 14 * $pr;
              line-height: 18 * $pr;
            }
            :deep(.ant-input-clear-icon) {
              color: rgba(255, 255, 255, 0.08);
              font-size: 22 * $pr;
            }

            :deep(.ant-form-item-control) {
              line-height: 0;
            }
            :deep(.ant-select-selection) {
              height: 34 * $pr !important;
              border-radius: 24 * $pr !important;
              border: 1 * $pr solid rgba(255, 255, 255, 0.5);
              background: rgba(0, 0, 0, 0.2);
              padding-left: 16 * $pr;
              font-size: 14 * $pr;
              line-height: 18 * $pr;
              .ant-select-selection__rendered {
                height: 100%;
                margin: 0;
                .ant-select-selection-selected-value {
                  line-height: 34 * $pr;
                }
                .ant-select-selection__placeholder {
                  color: rgba(255, 255, 255, 0.3);
                  font-size: 14 * $pr;
                  font-style: normal;
                  font-weight: 400;
                }
              }
            }
            :deep(.ant-form-explain) {
              padding: 0 8 * $pr 0 0;
              position: absolute;
              right: 0;
              bottom: 0;
              line-height: 8 * $pr;
              font-size: 12 * $pr;
            }
          }

          .button_i {
            padding-top: 24 * $pr;
            button {
              width: 205 * $pr;
              height: 44 * $pr;
              border-radius: 42 * $pr;
              font-size: 16 * $pr;
              line-height: 22 * $pr;
            }
          }
        }
      }
      .cal_cent {
        width: 100%;
        margin: 0 auto;
        display: grid;
        .widget {
          order: 1;
        }
        .google_ad_cat {
          width: 336 * $pr;
          height: 297 * $pr;
          margin: 32 * $pr auto 0;
          order: 2;
        }
      }
    }
  }
}
</style>
