<template>
  <div class="from_kund">
    <div class="from_kund_main">
      <client-only>
        <a-form-model ref="birthFormMini" :model="birthFormMini">
          <div class="mini_name">
            <a-form-model-item>
              <a-input
                v-model="birthFormMini.name"
                allow-clear
                placeholder="Name"
              />
            </a-form-model-item>
          </div>
          <div class="mini_time">
            <a-form-model-item>
              <a-input
                v-model="birthFormMini.year"
                placeholder="Year"
                type="number"
              />
            </a-form-model-item>
            <a-form-model-item>
              <a-input
                v-model="birthFormMini.month"
                placeholder="Mon"
                type="number"
              />
            </a-form-model-item>
            <a-form-model-item>
              <a-input
                v-model="birthFormMini.day"
                placeholder="Day"
                type="number"
              />
            </a-form-model-item>
            <a-form-model-item>
              <a-input
                v-model="birthFormMini.hour"
                placeholder="Hour"
                type="number"
              />
            </a-form-model-item>
            <a-form-model-item>
              <a-input
                v-model="birthFormMini.min"
                placeholder="Min"
                type="number"
              />
            </a-form-model-item>
            <a-form-model-item>
              <a-select v-model="birthFormMini.mol" placeholder="PM">
                <a-select-option value="AM"> AM </a-select-option>
                <a-select-option value="PM"> PM </a-select-option>
              </a-select>
            </a-form-model-item>
          </div>
          <div class="mini_place">
            <a-form-model-item>
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
                  v-for="d in cityData"
                  :key="d.name"
                  :channel="d"
                  :value="d.name"
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
  data() {
    return {
      birthFormMini: {
        name: '',
        gender: undefined,
        year: '',
        month: '',
        day: '',
        hour: '',
        min: '',
        mol: undefined,
        place: '',
      },
      fetching: false,
      cityData: [],
    }
  },
  methods: {
    // 城市搜索
    fetchCity(value) {
      this.fetching = true
      this.cityData = []
      this.$apiList.home.getCity({ name: value }).then((res) => {
        this.cityData = res.items
        this.fetching = false
      })
    },
    cityChange(value, option) {
      this.birthFormMini.place = option.data.attrs.channel
      //   console.log('选择的数据birthForm后后', this.birthFormMini)
      //   this.cityData = [] // 清除搜索的城市内容
      this.fetching = false
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
