<template>
  <div class="matching">
    <div class="matching_main">
      <div class="titles">Kundli Matching</div>
      <!-- 男生信息 -->
      <div class="forms boys" v-if="isform">
        <p class="text">
          Enter Boy's Details (Enter girl's detail on next page)
        </p>
        <client-only>
          <a-form-model
            ref="birthFormMini"
            :model="birthFormMini"
            :rules="rulesMaleForm"
            key="1"
          >
            <div class="mini_name">
              <a-form-model-item prop="name">
                <a-input
                  v-model="birthFormMini.name"
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
            <div class="mini_time">
              <a-form-model-item prop="hour">
                <a-select
                  placeholder="Hour"
                  style="width: 100%"
                  @change="hourChange"
                >
                  <a-select-option v-for="l in hours" :key="l">
                    {{ l }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item prop="min">
                <a-select
                  placeholder="Min"
                  style="width: 100%"
                  @change="minutesChange"
                >
                  <a-select-option v-for="l in minutes" :key="l">
                    {{ l }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item prop="sec">
                <a-select
                  placeholder="Sec"
                  style="width: 100%"
                  @change="secondChange"
                >
                  <a-select-option v-for="s in minutes" :key="s">
                    {{ s }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </div>
            <div class="mini_place">
              <div class="place">
                <a-form-model-item prop="place">
                  <a-select
                    show-search
                    placeholder="Birth Place"
                    style="width: 100%"
                    :filter-option="false"
                    :not-found-content="fetching ? undefined : null"
                    :default-active-first-option="false"
                    @search="fetchCity"
                    @change="cityChange"
                  >
                    <a-spin
                      v-if="fetching"
                      slot="notFoundContent"
                      size="small"
                    />
                    <a-select-option
                      v-for="d in cityData"
                      :key="d.name"
                      :channel="d"
                    >
                      {{ d.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </div>
              <div class="button_a">
                <a @click="setContinue">CONTINUE</a>
              </div>
            </div>
          </a-form-model>
        </client-only>
      </div>
      <!-- 女生信息 -->
      <div class="forms girls" v-else>
        <p class="text">Enter Girl's Details</p>
        <client-only>
          <a-form-model
            ref="femaleFormMini"
            :model="femaleFormMini"
            :rules="rulesMaleForm"
            key="2"
          >
            <div class="mini_name">
              <a-form-model-item prop="name">
                <a-input
                  v-model="femaleFormMini.name"
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
                  @change="girlYearChange"
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
                  @change="girlMonthChange"
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
                  @change="girlDaysChange"
                >
                  <a-select-option v-for="l in 31" :key="l">
                    {{ l }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </div>
            <div class="mini_time">
              <a-form-model-item prop="hour">
                <a-select
                  placeholder="Hour"
                  style="width: 100%"
                  @change="girlHourChange"
                >
                  <a-select-option v-for="l in hours" :key="l">
                    {{ l }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item prop="min">
                <a-select
                  placeholder="Min"
                  style="width: 100%"
                  @change="girlMinutesChange"
                >
                  <a-select-option v-for="l in minutes" :key="l">
                    {{ l }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item prop="sec">
                <a-select
                  placeholder="Sec"
                  style="width: 100%"
                  @change="girlSecondChange"
                >
                  <a-select-option v-for="s in minutes" :key="s">
                    {{ s }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </div>
            <div class="mini_place">
              <div class="place">
                <a-form-model-item prop="place">
                  <a-select
                    show-search
                    placeholder="Birth Place"
                    style="width: 100%"
                    :filter-option="false"
                    :not-found-content="fetching ? undefined : null"
                    :default-active-first-option="false"
                    @search="girlFetchCity"
                    @change="girlCityChange"
                  >
                    <a-spin
                      v-if="fetching"
                      slot="notFoundContent"
                      size="small"
                    />
                    <a-select-option
                      v-for="d in femaleCityData"
                      :key="d.name"
                      :channel="d"
                    >
                      {{ d.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </div>
              <div class="button_a">
                <a @click="retrieveData">OBTAIN</a>
              </div>
            </div>
          </a-form-model>
        </client-only>
      </div>
    </div>
    <transition name="fade">
      <el-loading-mini v-if="isLoading"></el-loading-mini>
    </transition>
    <transition name="unfold">
      <el-login-form v-show="perform" @choce="integerFormat"></el-login-form>
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
    const hours = Array.from({ length: 24 }, (_, index) => index)
    const minutes = Array.from({ length: 60 }, (_, index) => index)
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
      hours,
      minutes,
      birthFormMini: {
        name: '',
        gender: 'Male',
        year: '',
        month: '',
        day: '',
        hour: '',
        min: '',
        sec: '',
        place: '',
      },
      femaleFormMini: {
        name: '',
        gender: 'Female',
        year: '',
        month: '',
        day: '',
        hour: '',
        min: '',
        sec: '',
        place: '',
      },
      fetching: false,
      cityData: [],
      femaleCityData: [],
      rulesMaleForm: {
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
        hour: [
          {
            required: true,
            message: 'Select',
            trigger: 'change',
          },
        ],
        min: [
          {
            required: true,
            message: 'Select',
            trigger: 'change',
          },
        ],
        sec: [
          {
            required: true,
            message: 'Select',
            trigger: 'change',
          },
        ],
        place: [
          {
            required: true,
            message: 'Birth place',
            trigger: 'change',
          },
        ],
      },
      isLoading: false,
      isform: true,
      perform: false,
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  methods: {
    // 登录显示
    formTouched() {
      this.perform = true
      let bodyStyle = document.body.style
      bodyStyle.overflow = 'hidden'
    },
    // 登录隐藏
    integerFormat() {
      this.perform = false
      let bodyStyle = document.body.style
      bodyStyle.overflow = ''
    },

    // 男 - 信息
    fetchCity(value) {
      this.fetching = true
      this.cityData = []
      this.$apiList.home.getKundliCity({ name: value }).then((res) => {
        this.cityData = res.data
        this.fetching = false
      })
    },
    cityChange(value, option) {
      this.birthFormMini.place = option.data.attrs.channel
      //   console.log('选择的数据birthForm后后', this.birthFormMini)
      //   this.cityData = [] // 清除搜索的城市内容
      this.fetching = false
    },
    yearChange(value) {
      this.birthFormMini.year = value
    },
    monthChange(value) {
      this.birthFormMini.month = value
    },
    daysChange(value) {
      this.birthFormMini.day = value
    },
    hourChange(value) {
      this.birthFormMini.hour = value
    },
    minutesChange(value) {
      this.birthFormMini.min = value
    },
    secondChange(value) {
      this.birthFormMini.sec = value
    },

    // 女 - 信息
    girlFetchCity(value) {
      this.fetching = true
      this.femaleCityData = []
      this.$apiList.home.getKundliCity({ name: value }).then((res) => {
        this.femaleCityData = res.data
        this.fetching = false
      })
    },
    girlCityChange(value, option) {
      this.femaleFormMini.place = option.data.attrs.channel
      //   console.log('选择的数据birthForm后后', this.FemaleFormMini)
      //   this.cityData = [] // 清除搜索的城市内容
      this.fetching = false
    },
    girlYearChange(value) {
      this.femaleFormMini.year = value
    },
    girlMonthChange(value) {
      this.femaleFormMini.month = value
    },
    girlDaysChange(value) {
      this.femaleFormMini.day = value
    },
    girlHourChange(value) {
      this.femaleFormMini.hour = value
    },
    girlMinutesChange(value) {
      this.femaleFormMini.min = value
    },
    girlSecondChange(value) {
      this.femaleFormMini.sec = value
    },

    setContinue() {
      this.$refs.birthFormMini.validate((valid) => {
        if (valid) {
          if (!this.getUserInfo?.email) {
            this.formTouched()
            return
          }
          this.isLoading = true
          setTimeout(() => {
            this.isLoading = false
            this.isform = false
          }, 1000)
        }
      })
    },
    retrieveData() {
      this.$refs.femaleFormMini.validate((valid) => {
        if (valid) {
          const m_detail = {
            lat: String(this.birthFormMini?.place?.latitude),
            lon: String(this.birthFormMini?.place?.longitude),
            tzone: String(this.birthFormMini?.place?.timezoneOffset),
          }
          Object.assign(m_detail, this.birthFormMini)
          m_detail.place = this.birthFormMini?.place?.name
          const f_detail = {
            lat: String(this.femaleFormMini?.place?.latitude),
            lon: String(this.femaleFormMini?.place?.longitude),
            tzone: String(this.femaleFormMini?.place?.timezoneOffset),
          }
          Object.assign(f_detail, this.femaleFormMini)
          f_detail.place = this.femaleFormMini?.place?.name
          this.isLoading = true
          this.$apiList.home
            .getKundliMaking({
              f_detail: f_detail,
              m_detail: m_detail,
            })
            .then((res) => {
              this.isLoading = false
              localStorage.setItem(
                'kundli',
                JSON.stringify(res) // 更新用户匹配数据
              )
              localStorage.setItem(
                'kundliBoth',
                JSON.stringify({
                  f_detail: f_detail,
                  m_detail: m_detail,
                }) // 更新用户存储信息
              )
              window.location.href = '/kundli/details/?from=home'
            })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.matching {
  position: relative;
  &_main {
    width: 456px;
    min-height: 282px;
    border-radius: 16px;
    background: rgba(151, 71, 255, 0.7);
    padding: 24px 32px;
    .titles {
      color: #fff;
      text-align: center;
      font-family: Cinzel Decorative;
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: 30px;
      padding-bottom: 8px;
    }
    .text {
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
      font-family: Rubik;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
    }

    // 表单
    .forms {
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

      // input内容
      .mini_name {
        padding: 8px 0;
      }
      .mini_time {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        margin-bottom: 8px;
      }
      .mini_place {
        display: flex;
        align-items: center;
        .place {
          flex: 1;
        }
        .button_a {
          padding-left: 8px;
          a {
            display: block;
            height: 44px;
            color: #000;
            font-family: Rubik;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 30px;
            padding: 8px 32px;
            border-radius: 42px;
            background: #fff;
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .matching {
    &_main {
      width: 100%;
      min-height: auto;
      border-radius: 16 * $pr;
      padding: 24 * $pr 21 * $pr;
      .titles {
        font-size: 22 * $pr;
        line-height: 30 * $pr;
        padding-bottom: 8 * $pr;
      }
      .text {
        font-size: 14 * $pr;
        line-height: 18 * $pr;
      }

      // 表单
      .forms {
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

        // input内容
        .mini_name {
          padding: 8 * $pr 0;
        }
        .mini_time {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8 * $pr;
          margin-bottom: 8 * $pr;
        }
        .mini_place {
          display: block;
          align-items: center;
          .place {
            flex: 1;
          }
          .button_a {
            padding: 8 * $pr 0 0;
            text-align: center;
            a {
              display: inline-block;
              width: 259 * $pr;
              height: 44 * $pr;
              font-size: 16 * $pr;
              line-height: 30 * $pr;
              padding: 8 * $pr 32 * $pr;
              border-radius: 42 * $pr;
            }
          }
        }
      }
    }
  }
}
</style>
