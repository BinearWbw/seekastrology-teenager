<template>
  <div class="from_kund">
    <div class="from_kund_main">
      <client-only>
        <a-form-model
          ref="birthFormKundli"
          :model="birthFormMini"
          :rules="rulesKundliForm"
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
                <a-spin v-if="fetching" slot="notFoundContent" size="small" />
                <a-select-option
                  v-for="(d, index) in cityData"
                  :key="index"
                  :channel="d"
                >
                  {{ d.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </div>
        </a-form-model>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sex'],
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
        year: '',
        month: '',
        day: '',
        hour: '',
        min: '',
        sec: '',
        place: '',
      },
      rulesKundliForm: {
        name: [
          {
            required: true,
            message: 'Please enter name',
            trigger: 'change',
          },
          {
            validator: this.validateNumbers,
            trigger: 'blur',
          },
        ],
        year: [
          {
            required: true,
            message: 'Select year',
            trigger: 'change',
          },
        ],
        month: [
          {
            required: true,
            message: 'Select month',
            trigger: 'change',
          },
        ],
        day: [
          {
            required: true,
            message: 'Select day',
            trigger: 'change',
          },
        ],
        hour: [
          {
            required: true,
            message: 'Select hour',
            trigger: 'change',
          },
        ],
        min: [
          {
            required: true,
            message: 'Select min',
            trigger: 'change',
          },
        ],
        sec: [
          {
            required: true,
            message: 'Select sec',
            trigger: 'change',
          },
        ],
        place: [
          {
            required: true,
            message: 'Please enter Birth place',
            trigger: 'change',
          },
        ],
      },
      fetching: false,
      cityData: [],
    }
  },
  mounted() {
    // console.log('sex', this.sex)
  },
  methods: {
    // 城市搜索
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
      //   this.cityData = [] // 清除搜索的城市内容
      this.fetching = false
    },
    validateNumbers(rule, value, callback) {
      const regex = /^[^0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/
      if (regex.test(value)) {
        callback()
      } else {
        callback(new Error('Please enter correct name'))
      }
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
    // 输入内容验证
    submitForm() {
      this.$refs.birthFormKundli.validate((valid) => {
        if (valid) {
          const dataForm = {
            name: this.birthFormMini.name,
            lat: String(this.birthFormMini.place.latitude),
            lon: String(this.birthFormMini.place.longitude),
            place: this.birthFormMini.place.name,
            gender: this.sex,
            tzone: String(this.birthFormMini.place.timezoneOffset),
          }
          // 转换为数字
          for (const [key, value] of Object.entries(this.birthFormMini)) {
            if (!isNaN(parseInt(value))) {
              dataForm[key] = parseInt(value)
            }
          }
          this.$emit('submitform', dataForm)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.from_kund {
  &_main {
    width: 447px;
    .mini_name {
      width: 100%;
      margin-bottom: 16px;
    }
    .mini_time {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 5px;
      margin-bottom: 16px;
    }
    .mini_place {
      width: 212px;
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
      color: #fff;
      font-family: 'Rubik';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      padding-left: 16px;
    }
    :deep(.ant-input-clear-icon) {
      color: rgba(255, 255, 255, 0.08);
      font-size: 22px;
    }

    :deep(.ant-form-item-control) {
      line-height: 0;
    }
    :deep(.ant-select-selection) {
      height: 34px !important;
      border-radius: 24px !important;
      border: 1px solid rgba(255, 255, 255, 0.5);
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      font-family: 'Rubik';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      padding-left: 16px;
      .ant-select-selection__rendered {
        height: 100%;
        margin: 0;
        .ant-select-selection-selected-value {
          line-height: 33px;
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
      border-color: #f5222d;
      background: rgba(0, 0, 0, 0.2);
      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
    :deep(.ant-form-explain) {
      padding-left: 8px;
    }
  }
}

@media (max-width: 1470px) {
  .from_kund {
    &_main {
      width: 100%;
    }
  }
}

@media (max-width: 1200px) {
  .from_kund {
    &_main {
      .mini_time {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .from_kund {
    &_main {
      .mini_name {
        margin-bottom: 16 * $pr;
      }
      .mini_time {
        display: grid;
        gap: 16 * $pr 5 * $pr;
        margin-bottom: 16 * $pr;
      }
      .mini_place {
        width: 212 * $pr;
      }

      // 深层修改input样式
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
        height: 34 * $pr !important;
        border-radius: 24 * $pr !important;
        border: 1 * $pr solid rgba(255, 255, 255, 0.5);
        padding-left: 18 * $pr;
        font-size: 14 * $pr;
        line-height: 18 * $pr;
      }
      :deep(.ant-input-clear-icon) {
        font-size: 22 * $pr;
      }

      :deep(.ant-form-item-control) {
        line-height: 0;
      }
      :deep(.ant-select-selection) {
        height: 34 * $pr !important;
        border-radius: 24 * $pr !important;
        border: 1 * $pr solid rgba(255, 255, 255, 0.5);
        padding-left: 18 * $pr;
        font-size: 14 * $pr;
        line-height: 18 * $pr;
        .ant-select-selection__rendered {
          height: 100%;
          margin: 0;
          .ant-select-selection-selected-value {
            line-height: 33 * $pr;
          }
          .ant-select-selection__placeholder {
            font-size: 14 * $pr;
          }
        }
      }
    }
  }
}
</style>
