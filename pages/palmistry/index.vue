<template>
  <div class="palmistry">
    <google-ad :id="'5954072207'" classNames="google_ad_top"></google-ad>
    <div class="palmistry_main">
      <div class="palm">
        <p class="palm_title">Palm Reading: Online Palmistry Guide</p>
        <!-- <p class="palm_title h5_p">Answer Genie</p> -->
        <div class="oliy">
          <span
            class="palm_text texts_more_show"
            :class="{ texts_more: openExpand }"
          >
            Palmistry is an important science which tells us about the future
            very genuinely. Of, course there are the various branches of
            Astrology which predict the future course of an individual, but
            palmistry also give very clear and accurate results. In the other
            branches of Astrology, the moment of birth is very important (which
            at times is not available to the individual concerned) but in
            Palmistry, it is the lines and mounts on one's hand that hold the
            key to his future The small, thick, thin and oblique lines, mounts
            and markings in the palm of a person have the whole future imprinted
            therein. Here with a simple test, you can come to know about you and
            some general things what your hand and lines are predicting for you.
            The left hand is the hand we born with, the right hand is the hand
            we make. So it is suggested that you analyze your Right hand FIRST
            and then your Left Hand.
          </span>
          <span class="more_btn" @click="setOpenExpand">
            {{ openExpand ? 'Show Less' : 'Show More' }}
          </span>
        </div>
        <div class="palm_from">
          <div class="main_from">
            <client-only>
              <a-form-model
                ref="palmFrom"
                :model="palmFrom"
                :rules="rulesFormPalm"
              >
                <div class="form_name">
                  <span class="spans">Name</span>
                  <a-form-model-item prop="name">
                    <a-input
                      v-model="palmFrom.name"
                      allow-clear
                      placeholder="Name"
                    />
                  </a-form-model-item>
                </div>
                <div class="form_sex">
                  <div class="spans sexs">Sex</div>
                  <div class="labels">
                    <label
                      ><input
                        class="radio"
                        type="radio"
                        name="radio"
                        value="Male"
                        v-model="palmFrom.sex"
                        @change="choosePalm"
                      />
                      <span class="spans">Male</span>
                    </label>
                    <label
                      ><input
                        class="radio"
                        type="radio"
                        name="radio"
                        value="Female"
                        v-model="palmFrom.sex"
                        @change="choosePalm"
                      />
                      <span class="spans">Female</span>
                    </label>
                  </div>
                </div>
              </a-form-model></client-only
            >
            <div class="button">
              <button @click="submitUser">Get a free palmistry report</button>
            </div>
          </div>
        </div>
        <palm-tis class="eltis"></palm-tis>
        <p class="palm_title_mini">Palmistry Services</p>
        <p class="palm_text">
          PALMISTRY is the process of foretelling ones future by the imprints on
          the palm. Palmistry is based upon the interpretation of the general
          characteristics of one's hands, together with the study of the lines,
          their patterns and other formations, which appear on the palms and
          fingers.
        </p>
        <p class="palm_text m48_top">
          Palmistry is in itself a complete science which can forecast the
          future of an individual authentically. In the present day modern
          world, it would be very helpful for a person if his future is known.
          It would be easier for him to reach his destined destination. For this
          purpose we need an authentic science which can tell the complete past
          and to fore- see.
        </p>
        <p class="palm_text m48_top">
          Palmistry is an important science which tells us about the future very
          genuinely. Of, course there are the various branches of Astrology
          which predict the future course of an individual, but palmistry gets
          one step more in it the results are very clear and accurate. In the
          other branches of Astrology, the moment of birth is very important but
          in Palmistry, it is the lines and mounts on one's hand that hold the
          key to his future.
        </p>
        <p class="palm_text m48_top">
          The small, thick, thin and oblique lines in the palm of a person have
          the whole future imprinted therein. Palmistry has also contributed to
          the medical and criminal sciences. The events of a person can be
          easily recognized by an experienced Palmistry Expert and the finger
          imprints can be used to identify criminal cases.
        </p>
      </div>
      <div class="palm_cent">
        <google-ad :id="'5771644340'" classNames="google_ad_cent"></google-ad>
        <palm-have></palm-have>
      </div>
    </div>
    <transition name="unfold">
      <el-login-form v-show="perform" @choce="integerFormat"></el-login-form>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      palmFrom: {
        name: '',
        sex: null, //用户点击答案的下标,
      },
      rulesFormPalm: {
        name: [
          {
            required: true,
            message: 'Please enter name',
            trigger: 'change',
          },
        ],
      },
      perform: false,
      openExpand: false,
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  methods: {
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

    // 点击单选
    choosePalm() {
      if (this.palmFrom.sex === 'Male') {
        console.log('用户选择了 Male')
        // 执行 Male 相关逻辑
      } else if (this.palmFrom.sex === 'Female') {
        console.log('用户选择了 Female')
        // 执行 Female 相关逻辑
      }
    },

    // 点击提交
    submitUser() {
      dataLayer.push({
        event: 'getResultButton',
      })
      if (!this.getUserInfo?.email) {
        this.formTouched()
        return
      }
      this.$refs.palmFrom.validate((valid) => {
        if (valid) {
          if (!this.palmFrom.sex) this.palmFrom.sex = 'Female'
          window.location = '/palmistry/test/'
          window.changePageUrl = '/palmistry/test/'
        }
      })
    },
    setOpenExpand() {
      this.openExpand = !this.openExpand
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.palmistry {
  width: 100%;
  .google_ad_top {
    display: none;
  }
  &_main {
    width: 1400px;
    margin: 0 auto;
    padding: 48px 0 133px;
    display: grid;
    grid-template-columns: 1fr 354px;
    gap: 0 102px;
    .palm {
      .h5_p {
        display: none;
      }
      .palm_title {
        color: #fff;
        font-family: Cinzel Decorative;
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 48px;
        margin-bottom: 8px;
      }
      .texts_more {
        -webkit-line-clamp: unset !important;
        height: auto !important;
      }
      .oliy {
        .more_btn {
          display: none;
        }
      }
      .palm_text {
        color: rgba(255, 255, 255, 0.6);
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
      }
      .palm_title_mini {
        color: #fff;
        font-family: Rubik;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
        margin-bottom: 8px;
      }
      .m48_top {
        margin-top: 48px;
      }
      .palm_from {
        padding: 24px 0;
        margin: 56px 0;
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
        .main_from {
          width: 456px;
          margin: 0 auto;
          .spans {
            color: #fff;
            text-align: right;
            font-family: Rubik;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
          }
          .form_name {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 24px;
            align-items: center;
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
          .form_sex {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 24px;
            margin-top: 16px;
            align-items: center;
            padding: 7px 0;
            .sexs {
              width: 38px;
              text-align: right;
            }
            .labels {
              > label {
                cursor: pointer;
                margin-right: 32px;
              }
              .radio {
                border: 1px solid rgba(255, 255, 255, 0.6);
                height: 18px;
                width: 18px;
                margin-right: 8px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 50%;
                appearance: none;
                -webkit-appearance: none; /**隐藏原生控件**/
                flex-shrink: 0;
                cursor: pointer;
                &:checked {
                  //   position: relative;
                  &::before {
                    display: block;
                    position: absolute;
                    content: '';
                    background: url('~/assets/img/resources/checked.png')
                      no-repeat center center;
                    width: 21px;
                    height: 16px;
                  }
                }
              }
            }
          }
          .button {
            display: flex;
            justify-content: center;
            padding-top: 24px;
            > button {
              width: 344px;
              height: 44px;
              padding: 8px 32px;
              background: #fff;
              color: #000;
              font-family: Rubik;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
              border-radius: 42px;
            }
          }
        }
      }
      .eltis {
        margin-bottom: 56px;
      }
    }
    .palm_cent {
      width: 354px;
      .google_ad_cent {
        width: 300px;
        height: 625px;
        margin: 0 auto 32px;
      }
    }
  }
}
@media (max-width: 1470px) {
  .palmistry {
    &_main {
      width: 100%;
      padding: 48px 30px 133px;
    }
  }
}
@media (max-width: 1100px) {
  .palmistry {
    width: 100%;
    &_main {
      width: 100%;
      margin: 0 auto;
      padding: 48px 60px 133px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px 0;
      .palm_cent {
        width: 100%;
        .google_ad_cent {
          width: 100%;
          height: 275px;
          margin: 0 auto 32px;
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .palmistry {
    width: 100%;
    .google_ad_top {
      display: flex;
      flex-direction: column;
      width: 336 * $pr;
      height: 297 * $pr;
      margin: 0 auto;
    }
    &_main {
      padding: 16 * $pr 16 * $pr 32 * $pr;
      display: grid;
      grid-template-columns: 1fr;
      gap: 32 * $pr 0;
      .palm {
        .pc_p {
          display: none;
        }
        .h5_p {
          display: block;
          text-align: center;
        }
        .palm_title {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
          margin-bottom: 8 * $pr;
          text-align: center;
        }
        .texts_more_show {
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
        .oliy {
          .more_btn {
            display: block;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 14 * $pr;
            line-height: 24 * $pr;
            color: #9747ff;
            cursor: pointer;
            text-align: right;
          }
        }
        .palm_text {
          font-size: 14 * $pr;
          line-height: 24 * $pr;
        }
        .palm_title_mini {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
          margin-bottom: 8 * $pr;
        }
        .m48_top {
          margin-top: 32 * $pr;
        }
        .palm_from {
          padding: 24 * $pr 0;
          margin: 32 * $pr 0;
          &::after {
            height: 1 * $pr;
          }
          &::before {
            height: 1 * $pr;
          }
          .main_from {
            width: 100%;
            margin: 0 auto;
            .spans {
              font-size: 14 * $pr;
              line-height: 18 * $pr;
            }
            .form_name {
              width: 100%;
              display: grid;
              grid-template-columns: auto 1fr;
              gap: 16 * $pr;
              align-items: center;
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
            .form_sex {
              width: 100%;
              display: grid;
              grid-template-columns: auto 1fr;
              gap: 16 * $pr;
              margin-top: 16 * $pr;
              padding: 7 * $pr 0;
              .sexs {
                width: 35 * $pr;
                text-align: right;
              }
              .labels {
                > label {
                  cursor: pointer;
                  margin-right: 32 * $pr;
                  > span {
                    line-height: 21 * $pr;
                  }
                }
                .radio {
                  border: 1 * $pr solid rgba(255, 255, 255, 0.6);
                  height: 18 * $pr;
                  width: 18 * $pr;
                  margin-right: 8 * $pr;
                  &:checked {
                    //   position: relative;
                    &::before {
                      width: 21 * $pr;
                      height: 16 * $pr;
                      background-size: cover;
                    }
                  }
                }
              }
            }
            .button {
              padding-top: 24 * $pr;
              > button {
                width: 100%;
                height: 44 * $pr;
                padding: 8 * $pr 32 * $pr;
                font-size: 16 * $pr;
                line-height: 22 * $pr;
                border-radius: 42 * $pr;
              }
            }
          }
        }
        .eltis {
          margin-bottom: 32 * $pr;
        }
      }
      .palm_cent {
        width: 100%;
        .google_ad_cent {
          width: 336 * $pr;
          height: 297 * $pr;
          margin: 0 auto 32 * $pr;
        }
      }
    }
  }
}
</style>
