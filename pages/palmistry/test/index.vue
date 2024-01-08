<template>
  <div class="palm_test">
    <div class="palm_test_main">
      <div class="title_test">Palm Reading: Online Palmistry Guide</div>
      <google-ad :id="'5513404296'" classNames="google_ad_top"></google-ad>
      <div class="answer">
        <p class="answer_title">{{ readingTest[choseIndex].title }}</p>
        <div class="topic">
          <div
            class="topic_item"
            v-for="(item, index) in readingTest[choseIndex].chose"
            :key="index"
          >
            <label>
              <div class="imgs">
                <nuxt-img
                  :src="item.icon"
                  fit="cover"
                  height="93"
                  :alt="item.name"
                  loading="lazy"
                  format="auto"
                ></nuxt-img>
              </div>
              <div class="input">
                <input
                  class="radio"
                  type="radio"
                  name="radio"
                  :value="index + 1"
                  v-model="palmFromTest"
                  @change="choosePalmTest"
                />
                <div class="inimg">
                  <nuxt-img
                    :src="item.icon"
                    fit="cover"
                    height="93"
                    :alt="item.name"
                    loading="lazy"
                    format="auto"
                  ></nuxt-img>
                </div>
                <span class="spans">{{ item.name }}</span>
              </div>
            </label>
          </div>
        </div>
        <div class="button_i">
          <button class="button" @click="chcoseNext">
            <span v-if="nextOfsubmit">Next</span> <span v-else>Done</span>
          </button>
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
      let readingTest = await $apiList.test
        .getPalmistryReading()
        .then((res) => {
          return res
        })
      return {
        readingTest,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
  data() {
    return {
      palmFromTest: null, // 选择当前的答案
      choseIndex: 0, // 问题下标
      answerChose: [], // 选择答案数组
      choosePalmTestExecuted: false, // 是否选择当前题目列表
      nextOfsubmit: true, // 按钮状态切换
      isLoading: false,
    }
  },
  methods: {
    choosePalmTest() {
      // 当前选择的答案
      this.choosePalmTestExecuted = true
    },
    chcoseNext() {
      if (this.choosePalmTestExecuted) {
        if (this.answerChose.length !== this.readingTest.length) {
          this.answerChose.push(this.palmFromTest)
        } else {
          this.answerChose[this.choseIndex] = this.palmFromTest // 当在最后一项选择时，只会替换最后的值，不能push
        }
        if (this.nextOfsubmit) {
          this.choseIndex++
          this.nextOfsubmit =
            this.choseIndex == this.readingTest.length - 1 ? false : true
          this.choosePalmTestExecuted = false
          this.palmFromTest = null
        } else {
          this.chcoseSubmit()
        }
      } else {
        // 提示通知
        this.$notification.open({
          message: 'Stop',
          description: 'Please make a selection for 1.!',
          duration: 2,
          style: {
            color: '#f00',
          },
        })
      }
    },
    chcoseSubmit() {
      // 获取选择的结果
      if (this.answerChose.length == this.readingTest.length) {
        this.isLoading = true
        this.$apiList.test
          .getPalmistryReadingResult({
            chose: this.answerChose,
          })
          .then((res) => {
            this.isLoading = false
            localStorage.setItem('palmistry', JSON.stringify(res))
            window.location = '/palmistry/details/'
            window.changePageUrl = '/palmistry/details/'
          })
      }
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
        place-items: center;
        gap: 24px;
        padding: 24px 0;
        &_item {
          width: 928px;
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
              height: 93px;
              border-radius: 8px;
              margin-bottom: 8px;
              display: flex;
              justify-content: center;
              background: #fff;
              img {
                height: 100%;
                border-radius: 8px;
                object-fit: cover;
              }
            }
            .input {
              display: flex;
              justify-content: center;
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
      .answer {
        .topic {
          &_item {
            width: 100%;
          }
        }
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
      padding: 16 * $pr 16 * $pr 32 * $pr;
      .title_test {
        font-size: 22 * $pr;
        line-height: 30 * $pr;
        // order: 2;
      }
      .google_ad_top {
        width: 336 * $pr;
        height: 297 * $pr;
        margin: 0 auto;
        // order: 1;
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
                  max-width: 76 * $pr;
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
