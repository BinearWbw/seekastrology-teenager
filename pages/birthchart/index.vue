<template>
  <div class="astrolabe">
    <div class="astrolabe_main">
      <google-ad :id="''" classNames="google_ad_top"></google-ad>
      <div class="astrolabe_count">
        <h3 class="title">Free Birth Chart Calculator</h3>
        <div class="form_main">
          <div class="form">
            <client-only>
              <a-form-model
                ref="birthForm"
                :model="birthForm"
                :rules="rulesForm"
              >
                <div class="grid_form">
                  <div class="form_name">
                    <p>Name</p>
                    <a-form-model-item prop="name">
                      <a-input
                        v-model="birthForm.name"
                        allow-clear
                        placeholder="Enter Your Name"
                      />
                    </a-form-model-item>
                  </div>
                  <div class="form_gender">
                    <p>Gender</p>
                    <a-form-model-item prop="gender">
                      <a-select
                        v-model="birthForm.gender"
                        placeholder="Choose your gender"
                        allow-clear
                      >
                        <a-select-option value="Male"> Male </a-select-option>
                        <a-select-option value="Female">
                          Female
                        </a-select-option>
                      </a-select>
                    </a-form-model-item>
                  </div>
                  <div class="form_date">
                    <p>Date birth</p>
                    <div class="form_date_list">
                      <a-form-model-item prop="year">
                        <a-input
                          v-model="birthForm.year"
                          placeholder="Year"
                          type="number"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="month">
                        <a-input
                          v-model="birthForm.month"
                          placeholder="Month"
                          type="number"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="day">
                        <a-input
                          v-model="birthForm.day"
                          placeholder="Date"
                          type="number"
                        />
                      </a-form-model-item>
                    </div>
                  </div>
                  <div class="form_time">
                    <p>Time birth</p>
                    <div class="form_time_list">
                      <a-form-model-item prop="hour">
                        <a-input
                          v-model="birthForm.hour"
                          placeholder="Hour"
                          type="number"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="min">
                        <a-input
                          v-model="birthForm.min"
                          placeholder="Minute"
                          type="number"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="mol">
                        <a-select v-model="birthForm.mol" placeholder="PM">
                          <a-select-option value="AM"> AM </a-select-option>
                          <a-select-option value="PM"> PM </a-select-option>
                        </a-select>
                      </a-form-model-item>
                    </div>
                  </div>
                  <div class="form_place">
                    <p>Birth Place</p>
                    <a-form-model-item prop="place">
                      <a-select
                        show-search
                        placeholder="Enter Place of Birth"
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
                </div>
              </a-form-model>
            </client-only>
            <div class="buttons">
              <button @click="submintForm">Create Chart</button>
            </div>
          </div>
          <div class="form_img"></div>
        </div>
        <div class="place_text">
          <p class="text_title">How to Read Your Birth Chart?</p>
          <p class="text_ref">
            Your natal chart will show you the placement of each of the planets
            in various zodiac signs at the time of your birth. In some
            instances, you may have several planets in the same constellation,
            in others, it may be more scattered. Each planet has its own
            function and by learning how to read each one, you can discover more
            about yourself and your journey.
          </p>
          <div class="place_content">
            <div
              class="place_content_item"
              v-for="(item, index) in signData"
              :key="index"
            >
              <div class="imgs">
                <img :src="item.imgs" alt="#" />
              </div>
              <div class="small">
                <p class="text_title">{{ item.name }}</p>
                <p class="text_ref">
                  {{ item.texts }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="unfold">
      <el-login-form v-if="perform" @choce="integerFormat"></el-login-form>
    </transition>
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      birthForm: {
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
      rulesForm: {
        name: [
          {
            required: true,
            message: 'Please enter name',
            trigger: 'change',
          },
        ],
        gender: [
          {
            required: true,
            message: 'Please select gender',
            trigger: 'change',
          },
        ],
        year: [
          {
            required: true,
            message: 'Please enter year',
            trigger: 'change',
          },
          {
            max: 4,
            message: 'Year is too long',
            trigger: 'blur',
          },
        ],
        month: [
          {
            required: true,
            message: 'Please enter month',
            trigger: 'change',
          },
          {
            max: 2,
            message: 'Month is too long',
            trigger: 'blur',
          },
        ],
        day: [
          {
            required: true,
            message: 'Please enter daily',
            trigger: 'change',
          },
          {
            max: 2,
            message: 'Daily is too long',
            trigger: 'blur',
          },
        ],
        hour: [
          {
            required: true,
            message: 'Please enter hour',
            trigger: 'change',
          },
          {
            max: 2,
            message: 'Hour is too long',
            trigger: 'blur',
          },
        ],
        min: [
          {
            required: true,
            message: 'Please enter minute',
            trigger: 'change',
          },
          {
            max: 2,
            message: 'Minute is too long',
            trigger: 'blur',
          },
        ],
        mol: [
          {
            required: true,
            message: 'Please select time',
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
      signData: [
        {
          name: 'The Sun',
          texts:
            'The location of the sun in your chart is your main sign. It represents your conscious self, ego, and sense of self. ',
          imgs: require('~/assets/img/home/birth/sun.svg'),
        },
        {
          name: 'The Moon',
          texts:
            'Your emotional, inner world—your shadow self—is best represented by your moon sign. You can look at the key traits of this sign to learn more about your most private self, your intuition, and your relationships with the main maternal influences in your life. ',
          imgs: require('~/assets/img/home/birth/moon.svg'),
        },
        {
          name: 'Mercury',
          texts:
            'Mercury rules communication as well as our thought process. Consider where Mercury falls in your birth chart for how you perceive and rationalize things. It will reveal to you how you make decisions and how you process and disseminate information.',
          imgs: require('~/assets/img/home/birth/mercury-1.svg'),
        },
        {
          name: 'Venus',
          texts:
            'The divine feminine planet of Venus represents pleasure, love, and money. Your sign in Venus can provide you with the awareness of how you perceive love, your views on courtship and romance, as well as your personal tastes.',
          imgs: require('~/assets/img/home/birth/mercury-2.svg'),
        },
        {
          name: 'Mars',
          texts:
            'Mars represents action, physical passion, and drive. The divine masculine planet of Mars embodies how you assert yourself in the world. Consider this planet for an insight into what gives you a sense of direction and the raw energy of which you get out of bed every day. You can see the manifestation of this energy clearly when you are under pressure, competing, or racing to meet a deadline.',
          imgs: require('~/assets/img/home/birth/mercury.svg'),
        },
        {
          name: 'Jupiter',
          texts:
            'Jupiter is the planet of expansion, abundance, spirituality, and philosophy. Your Jupiter sign can give you insight into your attitudes around education, your philosophies, and what morals govern your life. Its location in your birth chart can reveal your perceptions around wealth, receiving gifts and blessings, and experiences of travel and long journeys.',
          imgs: require('~/assets/img/home/birth/jupiter.svg'),
        },
        {
          name: 'Saturn',
          texts:
            'Saturn concerns your approach to work and your professional achievements. You can look to your Saturn sign to tell you about your ambition, discipline, and maturity to life.',
          imgs: require('~/assets/img/home/birth/saturn.svg'),
        },
        {
          name: 'Uranus',
          texts:
            'Uranus is an eccentric planet and its position in your chart can symbolize your individuality and the way you handle change or the unexpected.',
          imgs: require('~/assets/img/home/birth/jupiter-1.svg'),
        },
        {
          name: 'Neptune',
          texts:
            'Being a planet of fantasy and illusion, the placement of Neptune in your chart can demonstrate the areas in your life that could bring up confusion. It may address the parts of your life that you tend to avoid or try to sweep under the rug.',
          imgs: require('~/assets/img/home/birth/neptune.svg'),
        },
        {
          name: 'Pluto',
          texts:
            'Though it is a small planet, the energy of Pluto is not to be reckoned with. The placement of this planet in your chart indicates the areas of your life where creation meets destruction. It is the hidden, primal self that can slip out in intense moments.',
          imgs: require('~/assets/img/home/birth/pluto.svg'),
        },
      ],
      birthChart: '',
      fetching: false,
      cityData: [],
      perform: false,
      isLoading: false,
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  mounted() {},
  methods: {
    // 登录弹出
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
    submintForm() {
      console.log('输入', this.$refs.birthForm)
      if (!this.getUserInfo?.email) {
        this.formTouched()
        return
      }
      this.$refs.birthForm.validate((valid) => {
        if (valid) {
          const birthLocalTime = this.$utils.formatDateNatal(
            this.birthForm.hour,
            this.birthForm.mol
          )
          console.log('时间转换', birthLocalTime)
          console.log('信息确认提交', this.birthForm)
          this.isLoading = true
          this.$apiList.home
            .getNatal({
              year: Number(this.birthForm.year),
              month: Number(this.birthForm.month),
              day: Number(this.birthForm.day),
              hour: birthLocalTime,
              min: Number(this.birthForm.min),
              sec: 1,
              name: this.birthForm.name,
              gender: this.birthForm.gender,
              lat: this.birthForm.place.lat,
              lon: this.birthForm.place.lng,
              place: this.birthForm.place.name,
            })
            .then((res) => {
              if (res.code) {
                // 提示通知
                this.$notification.open({
                  message: 'Errors',
                  description: res.msg,
                  duration: 4,
                  style: {
                    color: '#f00',
                  },
                })
              } else {
                localStorage.setItem(
                  'births',
                  JSON.stringify(res) // 更新用户存储信息
                )
                this.isLoading = false
                window.changePageUrl = '/birthchart/details/'
                window.location.href = '/birthchart/details/'
              }
            })
        }
      })
    },
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
      this.birthForm.place = option.data.attrs.channel
      console.log('选择的数据birthForm后后', this.birthForm)
      //   this.cityData = [] // 清除搜索的城市内容
      this.fetching = false
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.astrolabe {
  &_main {
    width: 1400px;
    padding: 24px 0 56px;
    margin: 0 auto;
    .google_ad_top {
      width: 1200px;
      height: 305px;
      margin: 0 auto 24px;
    }
    .astrolabe_count {
      .title {
        color: #fff;
        text-align: center;
        font-family: 'Cinzel Decorative';
        font-size: 46px;
        font-style: normal;
        font-weight: 700;
        line-height: 64px;
      }
      .form_main {
        display: flex;
        padding-top: 48px;
        align-items: center;
        .form {
          width: 692px;
          margin-right: 185px;
          .grid_form {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 32px 16px;
            p {
              color: #fff;
              font-family: 'Rubik';
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
              margin-bottom: 8px;
            }
            .form_date {
              &_list {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 7px;
              }
            }
            .form_time {
              &_list {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 7px;
              }
            }
            .form_place {
              grid-column: span 2;
            }
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
              border-color: #f5222d;
            }
            :deep(.ant-form-explain) {
              padding-left: 18px;
            }
          }
          .buttons {
            display: flex;
            justify-content: center;
            padding-top: 48px;
            button {
              width: 338px;
              height: 44px;
              color: #000;
              font-family: 'Rubik';
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
              padding: 8px 0;
              border-radius: 42px;
              background-color: #fff;
            }
          }
        }
        .form_img {
          width: 456px;
          height: 456px;
          background: url('~/assets/img/home/birthplace.png') no-repeat;
          background-size: cover;
        }
      }
      .place_text {
        font-family: Rubik;
        padding-top: 48px;
        .text_title {
          color: #fff;
          font-size: 22px;
          font-style: normal;
          font-weight: 500;
          line-height: 30px;
        }
        .text_ref {
          color: rgba(255, 255, 255, 0.6);
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px;
        }
        .place_content {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          padding-top: 48px;
          gap: 48px 102px;
          &_item {
            display: flex;
            .imgs {
              width: 30px;
              height: 30px;
              margin-right: 16px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .small {
              flex: 1;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 1450px) {
  .astrolabe {
    &_main {
      width: 100%;
      padding: 24px 30px 56px;
      .google_ad_top {
        width: 90%;
      }
      .astrolabe_count {
        .form_main {
          .form {
            margin-right: 20px;
          }
        }
      }
    }
  }
}

@media (max-width: 1250px) {
  .astrolabe {
    &_main {
      .astrolabe_count {
        .form_main {
          flex-direction: column;
          .form {
            margin-right: 0;
            order: 2;
          }
          .form_img {
            order: 1;
          }
        }
        .place_text {
          .place_content {
            gap: 48px 48px;
          }
        }
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .astrolabe {
    &_main {
      width: 100%;
      padding: 0 0 32 * $pr;
      margin: 0 auto;
      .google_ad_top {
        width: 320 * $pr;
        height: 117 * $pr;
        margin: 0 auto 16 * $pr;
      }
      .astrolabe_count {
        .title {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
        }
        .form_main {
          display: flex;
          padding: 24 * $pr 16 * $pr 0;

          .form {
            width: 100%;
            margin-right: 0;
            order: 2;
            .grid_form {
              width: 100%;
              display: grid;
              grid-template-columns: 1fr;
              grid-auto-flow: row;
              gap: 16 * $pr 0;
              padding: 0 20 * $pr;
              p {
                font-size: 16 * $pr;
                line-height: 22 * $pr;
                margin-bottom: 8 * $pr;
              }
              .form_name {
                grid-column: span 2;
              }
              .form_gender {
                grid-column: span 2;
              }
              .form_date {
                grid-column: span 2;
                &_list {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 7px;
                }
              }
              .form_time {
                grid-column: span 2;
                &_list {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 7 * $pr;
                }
              }
              .form_place {
                grid-column: span 2;
              }
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
                padding-left: 15 * $pr;
                font-size: 16 * $pr;
                line-height: 18 * $pr;
              }
              :deep(.ant-input-clear-icon) {
                font-size: 22 * $pr;
              }
              :deep(.ant-select-selection) {
                height: 44 * $pr !important;
                border-radius: 24 * $pr !important;
                border: 1 * $pr solid rgba(255, 255, 255, 0.6);
                padding-left: 15 * $pr;
                font-size: 16 * $pr;
                line-height: 18 * $pr;
                .ant-select-selection__rendered {
                  .ant-select-selection-selected-value {
                    line-height: 42 * $pr;
                  }
                  .ant-select-selection__placeholder {
                    font-size: 14 * $pr;
                  }
                }
              }
              :deep(.ant-form-explain) {
                padding-left: 15 * $pr;
              }
            }
            .buttons {
              padding: 24 * $pr 20 * $pr 0;
              button {
                width: 100%;
                height: 44 * $pr;
                font-size: 16 * $pr;
                line-height: 22 * $pr;
                padding: 8 * $pr 0;
                border-radius: 42 * $pr;
              }
            }
          }
          .form_img {
            width: 255 * $pr;
            height: 255 * $pr;
            order: 1;
          }
        }
        .place_text {
          font-family: Rubik;
          padding: 24 * $pr 16 * $pr 0;

          .text_title {
            font-size: 16 * $pr;
            line-height: 28 * $pr;
          }
          .text_ref {
            font-size: 14 * $pr;
            line-height: 24 * $pr;
          }
          .place_content {
            display: grid;
            grid-template-columns: 1fr;
            padding-top: 24 * $pr;
            gap: 24 * $pr 0;
            &_item {
              display: flex;
              .imgs {
                width: 30 * $pr;
                height: 30 * $pr;
                margin-right: 16 * $pr;
              }
              .small {
                flex: 1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
