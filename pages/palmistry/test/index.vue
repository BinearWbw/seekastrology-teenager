<template>
  <div class="palm_test">
    <div class="palm_test_main">
      <div class="title_test">Palm Reading: Online Palmistry Guide</div>
      <google-ad :id="''" classNames="google_ad_top"></google-ad>
      <div class="answer">
        <p class="answer_title">Select the right finger type you have.</p>
        <div class="topic">
          <div class="topic_item" v-for="i in 3" :key="i">
            <label>
              <div class="imgs">
                <img src="~/assets/img/zodiac/chzo/palm.png" alt="#" />
              </div>
              <div class="input">
                <input
                  class="radio"
                  type="radio"
                  name="radio"
                  value="What the Poruthams Indicate:"
                  v-model="palmFromTest"
                  @change="choosePalmTest"
                />
                <div class="inimg">
                  <img src="~/assets/img/zodiac/chzo/palm.png" alt="#" />
                </div>
                <span class="spans">What the Poruthams Indicate: </span>
              </div>
            </label>
          </div>
        </div>
        <div class="button_i">
          <button class="button">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      palmFromTest: null,
    }
  },
  methods: {
    choosePalmTest() {
      console.log('当前选择的答案', this.palmFromTest)
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.palm_test {
  width: 100%;
  &_main {
    width: 1400px;
    margin: 0 auto;
    display: grid;
    gap: 32px;
    padding: 48px 0 32px;
    .title_test {
      color: #fff;
      text-align: center;
      font-family: Cinzel Decorative;
      font-size: 36px;
      font-style: normal;
      font-weight: 700;
      line-height: 48px;
    }
    .google_ad_top {
      width: 970px;
      height: 115px;
      margin: 0 auto;
    }
    .answer {
      &_title {
        color: #fff;
        text-align: center;
        font-family: Rubik;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
      }
      .topic {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        padding: 24px 0;
        &_item {
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.08);
          transition: transform 0.3s ease-in;
          &:hover {
            transform: scale(1.01);
          }
          > label {
            padding: 16px;
            display: block;
            cursor: pointer;
            .imgs {
              width: 100%;
              height: 304px;
              border-radius: 8px;
              overflow: hidden;
              margin-bottom: 8px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .input {
              display: flex;
              align-items: center;
              .radio {
                border: 1px solid rgba(255, 255, 255, 0.6);
                height: 18px;
                width: 18px;
                margin: 0 8px;
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
              .inimg {
                display: none;
              }
              .spans {
                color: #fff;
                font-family: Rubik;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px;
              }
            }
          }
        }
      }
      .button_i {
        display: flex;
        justify-content: center;
        .button {
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
}
@media (max-width: 1470px) {
  .palm_test {
    width: 100%;
    &_main {
      width: 100%;
      padding: 48px 30px 32px;
    }
  }
}
@media (max-width: 1166px) {
  .palm_test {
    &_main {
      .google_ad_top {
        width: 90%;
        height: 115px;
        margin: 0 auto;
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .palm_test {
    width: 100%;
    &_main {
      width: 100%;
      margin: 0 auto;
      display: grid;
      gap: 32 * $pr;
      padding: 0 16 * $pr 32 * $pr;
      .title_test {
        font-size: 22 * $pr;
        line-height: 30 * $pr;
        order: 2;
      }
      .google_ad_top {
        width: 300 * $pr;
        height: 67 * $pr;
        margin: 0 auto;
        order: 1;
      }
      .answer {
        order: 2;
        &_title {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
        }
        .topic {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 16 * $pr;
          padding: 16 * $pr 0;
          &_item {
            border-radius: 8 * $pr;
            > label {
              padding: 16px;
              display: block;
              cursor: pointer;
              .imgs {
                display: none;
              }
              .input {
                display: flex;
                align-items: center;
                .radio {
                  border: 1 * $pr solid rgba(255, 255, 255, 0.6);
                  height: 18 * $pr;
                  width: 18 * $pr;
                  margin: 0 8 * $pr;
                  &:checked {
                    &::before {
                      width: 21 * $pr;
                      height: 16 * $pr;
                      background-size: cover;
                    }
                  }
                }
                .inimg {
                  display: block;
                  width: 76 * $pr;
                  height: 54 * $pr;
                  border-radius: 8 * $pr;
                  margin-right: 8 * $pr;
                  overflow: hidden;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                }
                .spans {
                  flex: 1;
                  font-size: 14 * $pr;
                  line-height: 18 * $pr;
                }
              }
            }
          }
        }
        .button_i {
          .button {
            width: 205 * $pr;
            height: 44 * $pr;
            border-radius: 42 * $pr;
            font-size: 16 * $pr;
            line-height: 22 * $pr;
          }
        }
      }
    }
  }
}
</style>
