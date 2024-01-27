<template>
  <div class="el_china">
    <div class="caption">
      Find Your chinese <br />
      animal sign
    </div>
    <p class="tess">
      Choose your date of birth and find out your Chinese zodiac sign
    </p>
    <div class="el_china_main">
      <p class="form_title">Birthdate:</p>
      <client-only>
        <a-form-model
          ref="chinaFormMini"
          :model="chinaZodiac"
          :rules="chinaZodiacForm"
          key="2"
        >
          <div class="form_main">
            <a-form-model-item prop="day">
              <a-select
                placeholder="Day"
                style="width: 100%"
                @change="chinaDaysChange"
              >
                <a-select-option v-for="l in 31" :key="l">
                  {{ l }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item prop="month">
              <a-select
                placeholder="Mon"
                style="width: 100%"
                @change="chinaMonthChange"
              >
                <a-select-option v-for="i in months" :key="i.li">
                  {{ i.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item prop="year">
              <a-select
                placeholder="Year"
                style="width: 100%"
                @change="chinaYearChange"
              >
                <a-select-option v-for="i in years" :key="i">
                  {{ i }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </div>
          <div class="submit">
            <button class="button" @click="submitZodiac">SEARCH</button>
          </div>
        </a-form-model>
      </client-only>
    </div>
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
        { name: 'Jan', li: 1 },
        { name: 'Feb', li: 2 },
        { name: 'Mar', li: 3 },
        { name: 'Apr', li: 4 },
        { name: 'May', li: 5 },
        { name: 'Jun', li: 6 },
        { name: 'Jul', li: 7 },
        { name: 'Aug', li: 8 },
        { name: 'Sep', li: 9 },
        { name: 'Oct', li: 10 },
        { name: 'Nov', li: 11 },
        { name: 'Dec', li: 12 },
      ],
      chinaZodiac: {
        year: '',
        month: '',
        day: '',
      },
      chinaZodiacForm: {
        year: [
          {
            required: true,
            message: 'Select',
            trigger: 'change',
          },
        ],
        month: [
          {
            required: true,
            message: 'Select',
            trigger: 'change',
          },
        ],
        day: [
          {
            required: true,
            message: 'Select',
            trigger: 'change',
          },
        ],
      },
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  methods: {
    chinaDaysChange(value) {
      this.chinaZodiac.day = value
    },
    chinaMonthChange(value) {
      this.chinaZodiac.month = value
    },
    chinaYearChange(value) {
      this.chinaZodiac.year = value
    },
    submitZodiac() {
      dataLayer.push({
        event: 'getResultButton',
      })
      this.$refs.chinaFormMini.validate((valid) => {
        if (valid) {
          this.isLoading = true
          let payData = {
            year: this.chinaZodiac.year,
            month: this.chinaZodiac.month,
            day: this.chinaZodiac.day,
          }
          this.$apiList.test.getAnimalsJudge(payData).then((res) => {
            this.isLoading = false
            if (res) {
              window.changePageUrl = `/chinazodiac/details/${res.id}/`
              window.location.href = `/chinazodiac/details/${res.id}/`
              localStorage.setItem(
                'payData',
                JSON.stringify(payData) // 更新支付Data
              )
            } else {
              this.$notification.open({
                message: 'Stop',
                description: 'Please enter the correct time',
                duration: 3,
                style: {
                  color: '#f00',
                },
              })
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.el_china {
  width: 456px;
  padding: 24px 32px;
  border-radius: 16px;
  background: rgba(151, 71, 255, 0.7);
  .caption {
    color: #fff;
    font-family: Cinzel Decorative;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    margin-bottom: 8px;
  }
  .tess {
    color: rgba(255, 255, 255, 0.6);
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    margin-bottom: 8px;
  }
  &_main {
    min-height: 126px;
    .form_title {
      color: #fff;
      font-family: Rubik;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      margin-bottom: 8px;
    }
    .form_main {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
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
    .submit {
      padding: 16px 20px 0;
      .button {
        width: 100%;
        height: 44px;
        padding: 8px 22px;
        color: #000;
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        border-radius: 42px;
        background: #fff;
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .el_china {
    width: 100%;
    padding: 24 * $pr;
    border-radius: 16 * $pr;
    .caption {
      font-size: 22 * $pr;
      line-height: 30 * $pr;
      margin-bottom: 16 * $pr;
    }
    .tess {
      font-size: 14 * $pr;
      line-height: 18 * $pr;
      margin-bottom: 16 * $pr;
    }
    &_main {
      min-height: auto;
      .form_title {
        font-size: 18 * $pr;
        line-height: 24 * $pr;
        margin-bottom: 16 * $pr;
      }
      .form_main {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8 * $pr;
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
      .submit {
        padding: 16 * $pr 0 0;
        .button {
          height: 44 * $pr;
          padding: 8 * $pr 22 * $pr;
          font-size: 16 * $pr;
          line-height: 22 * $pr;
          border-radius: 42 * $pr;
        }
      }
    }
  }
}
</style>
