<template>
  <div class="matching">
    <div class="matching_main">
      <div class="titles">Kundli Matching</div>
      <p class="text">Enter Boy's Details (Enter girl's detail on next page)</p>
      <div class="forms">
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
                  placeholder="Month"
                  type="number"
                />
              </a-form-model-item>
              <a-form-model-item>
                <a-input
                  v-model="birthFormMini.day"
                  placeholder="Date"
                  type="number"
                />
              </a-form-model-item>
            </div>
            <div class="mini_time">
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
                  placeholder="Minute"
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
              <div class="place">
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
                    <a-spin
                      v-if="fetching"
                      slot="notFoundContent"
                      size="small"
                    />
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
              <div class="button_a">
                <a href="">CONTINUE</a>
              </div>
            </div>
          </a-form-model>
        </client-only>
      </div>
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
.matching {
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
