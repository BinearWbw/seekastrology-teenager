<template>
  <div class="details">
    <div class="top_ad" v-if="showQuestions">
      <google-ad classNames="google_top" :id="'5954072207'" />
    </div>
    <div class="details_main">
      <div class="details_main_left">
        <div class="details_main_left_top">
          <div class="details_main_left_top_menu">
            <a href="javascript:history.back(-1)">Quizzes</a> <span>></span>
            <a href="" style="color: #ffffff">Quizzes Details</a>
          </div>
          <div class="details_main_left_top_content">
            <div class="details_main_left_top_content_main">
              <!-- pc端 -->
              <div
                class="details_main_left_top_content_main_pc"
                ref="nameAndDesc"
              >
                <!-- 标题 -->
                <div class="details_main_left_top_content_main_pc_name">
                  {{ dataInfo.name }}
                </div>
                <!-- 描述 -->
                <div
                  class="details_main_left_top_content_main_pc_desc"
                  v-if="currentQuestionIndex == 0"
                  v-html="dataInfo.desc"
                ></div>
              </div>
              <!-- h5端 -->
              <div class="details_main_left_top_content_main_h5">
                <!-- 开始答题前 -->
                <template v-if="!showQuestions">
                  <div class="details_main_left_top_content_main_h5_img">
                    <nuxt-img
                      :src="dataInfo.icon || '/'"
                      fit="cover"
                      :alt="dataInfo.name"
                      width="290"
                      height="148"
                      loading="lazy"
                      format="auto"
                    ></nuxt-img>
                  </div>
                  <div class="details_main_left_top_content_main_h5_name">
                    {{ dataInfo.name }}
                  </div>
                  <div
                    class="details_main_left_top_content_main_h5_btn"
                    @click="startTest"
                    id="STARTTEST"
                  >
                    Start Test
                  </div>
                  <div
                    class="details_main_left_top_content_main_h5_desc"
                    :class="{ texts_more: openExpand }"
                    v-html="dataInfo.desc"
                  ></div>
                  <div class="more_btn" @click="setOpenExpand">
                    {{ openExpand ? 'Show Less' : 'Show More' }}
                  </div>
                </template>
              </div>
              <!-- 问题和答案选项 -->
              <template v-if="!showResult && showQuestions">
                <!-- 问题 -->
                <div class="details_main_left_top_content_main_questions">
                  {{ currentQuestionIndex + 1 }}.{{
                    dataInfo.questions[currentQuestionIndex].question
                  }}
                </div>
                <!-- 图片 -->
                <nuxt-img
                  v-if="dataInfo.questions[currentQuestionIndex].image"
                  :src="dataInfo.questions[currentQuestionIndex].image || '/'"
                  fit="cover"
                  :alt="dataInfo.questions[currentQuestionIndex].question"
                  class="details_main_left_top_content_main_questionImage"
                  width="700"
                  loading="lazy"
                  format="auto"
                ></nuxt-img>
                <!-- 答案选项 -->
                <div class="details_main_left_top_content_main_answer">
                  <div
                    class="details_main_left_top_content_main_answer_item"
                    v-for="(item, index) in dataInfo.questions[
                      currentQuestionIndex
                    ].answers"
                    :key="index"
                    :class="[
                      {
                        'green-border':
                          index == trueIndex && dataInfo.quest_type == 1,
                      },
                      {
                        'red-border':
                          index != trueIndex &&
                          checkedAnswer == index &&
                          dataInfo.quest_type == 1,
                      },
                    ]"
                  >
                    <label
                      ><input
                        class="radio"
                        type="radio"
                        name="radio"
                        :value="index"
                        v-model="checkedAnswer"
                        @change="chooseAnswer(item, index)"
                        :disabled="disabledFlag"
                      />
                      <div
                        class="img_answer"
                        v-if="item.answer.includes('images')"
                      >
                        <nuxt-img
                          :src="item.answer || '/'"
                          fit="cover"
                          :alt="item.answer"
                          width="338"
                          height="200"
                          loading="lazy"
                          format="auto"
                        ></nuxt-img>
                      </div>
                      <p v-else>{{ item.answer }}</p>
                    </label>
                  </div>
                </div>
                <div class="details_main_left_top_content_main_btm">
                  <div class="details_main_left_top_content_main_btm_count">
                    <span id="currentQuestion">{{
                      currentQuestionIndex + 1
                    }}</span
                    >/{{ dataInfo.questions.length }}
                  </div>
                  <transition name="fade">
                    <div
                      class="details_main_left_top_content_main_btm_resultbtn"
                      id="RESULTBTN"
                      @click="getQuizResult"
                      v-if="
                        currentQuestionIndex + 1 == dataInfo.questions.length &&
                        nextFlag
                      "
                    >
                      Get Your Result
                    </div>
                    <div
                      v-else
                      class="details_main_left_top_content_main_btm_btn"
                      @click="nextQuestion"
                      id="NEXTBTN"
                      :class="
                        nextFlag &&
                        currentQuestionIndex + 1 < dataInfo.questions.length
                          ? ''
                          : 'stop-next'
                      "
                    >
                      Next >>
                    </div>
                  </transition>
                </div>
              </template>
              <!-- 回答结果 -->
              <template v-if="showResult">
                <div
                  class="details_main_left_top_result"
                  v-if="dataInfo.quest_type == 1"
                >
                  <div class="details_main_left_top_result_score">
                    Result:<span> {{ result.score }}</span>
                  </div>
                </div>
                <div class="details_main_left_top_result" v-else>
                  <div class="details_main_left_top_result_title">
                    {{ result.title }}
                  </div>
                  <div
                    class="details_main_left_top_result_desc"
                    v-html="result.desc"
                  ></div>
                  <div class="img_desc" v-if="result.icon">
                    <nuxt-img
                      :src="result.icon || '/'"
                      fit="cover"
                      :alt="result.icon"
                      width="400"
                      height="250"
                      loading="lazy"
                      format="auto"
                    ></nuxt-img>
                  </div>
                </div>
                <div
                  id="RETAKE"
                  class="details_main_left_top_result_retake"
                  @click="retake()"
                >
                  Restart This Quiz
                </div>
              </template>
            </div>
          </div>
        </div>
        <google-ad classNames="google_ad" :id="'5595713395'" />
        <google-search-ad querys="quiz"></google-search-ad>
        <div class="lmore">
          <el-explore-more />
        </div>
        <div class="details_main_left_btm">
          <div class="details_main_left_btm_title">MOST POPULAR QUIZZES</div>
          <div class="details_main_left_btm_list">
            <a
              :href="`/test/details/${item.name
                .trim()
                .replace(/[^\w\d]/g, '-')
                .toLowerCase()}-${item.id}/`"
              class="details_main_left_btm_list_item"
              v-for="item in btmList"
              :key="item.id"
            >
              <div class="details_main_left_btm_list_item_img">
                <nuxt-img
                  :src="item.icon || '/'"
                  fit="cover"
                  :alt="item.name"
                  width="400"
                  height="250"
                  loading="lazy"
                  format="auto"
                ></nuxt-img>
              </div>
              <div class="details_main_left_btm_list_item_text">
                <div class="details_main_left_btm_list_item_text_name">
                  {{ item.name }}
                </div>
              </div>
            </a>
          </div>
        </div>
        <!-- <google-ad classNames="google_ad" :id="'5404141708'" /> -->
      </div>
      <div class="details_main_right">
        <google-ad classNames="google_ad" :id="'9971744541'"></google-ad>
        <!-- <google-ad classNames="google_ad" :id="'3899488348'"></google-ad> -->
      </div>
    </div>
    <!-- <div class="foot_components" ref="foot_components">
      <transition name="fade">
        <home-your-choice class="choice"></home-your-choice>
      </transition>
      <transition name="fade">
        <tarot-more-tarot></tarot-more-tarot>
      </transition>
    </div> -->
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
  </div>
</template>
<script>
import { adBreakInit, showAdBreak } from '@/utils/ad'
export default {
  data() {
    return {
      currentQuestionIndex: 0, //当前问题下标，默认0
      answers: [], //用户选择的每道问题答案
      nextFlag: false, //下一题状态
      checkedAnswer: -1, //用户点击答案的下标
      trueIndex: -1, //正确答案下标
      showResult: false, //展示结果
      result: {}, //返回的数据
      disabledFlag: false, //禁用单选框状态
      showQuestions: false, //展示问答（pc端直接展示问题和回答列表、h5先展示详情，点击开始答题后展示问题和回答列表）
      screenWidth: 0, //屏幕宽度
      //currentRoute: '#', //当前路由
      isLoading: false,
      openExpand: false,
    }
  },
  async asyncData({ error, route, $apiList, params, $utils }) {
    try {
      let totalNum = 0,
        totalPage = 1,
        search = {
          page: 1,
          size: 10,
        }
      let [dataInfo, btmList] = await Promise.all([
        /**顶部问答 */
        $apiList.test
          .getQuizDetail({
            origin: process.env.origin,
            id: params.id.replace(
              /^.*?(\d*)$/,
              (str, match, index) => match || '0'
            ),
          })
          .then((res) => {
            return res || null
          }),
        /**底部列表 */
        $apiList.test
          .getRecList({
            origin: process.env.origin,
            rand: true,
          })
          .then((res) => {
            return res?.list || null
          }),
      ])

      return {
        dataInfo,
        btmList,
        totalNum,
        totalPage,
        search,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.msg })
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    // 初始化答案
    initializeAnswer() {
      const dailyTsxt = JSON.parse(localStorage.getItem('quiz_results')) //获取跳转前的结果
      if (dailyTsxt) {
        this.isLoading = true
        this.$apiList.test
          .getQuizResult({
            origin: process.env.origin,
            id: dailyTsxt.id,
            answers: dailyTsxt.answers,
          })
          .then((res) => {
            // 请求答案
            this.isLoading = false
            localStorage.setItem('quiz_results', null)
            this.result = res
          })
        //显示标题和描述
        this.$refs.nameAndDesc.style.display = 'block'
        //展示结果
        this.showResult = true
      }
    },
    /** 屏幕尺寸变化*/
    handleResize() {
      this.screenWidth = window.innerWidth
      //如果是h5
      if (this.screenWidth <= 750) {
        //隐藏标题和描述
        this.$refs.nameAndDesc.style.display = 'none'
        //隐藏回答问题列表
        // this.showQuestions = false
        if (this.showResult || this.currentQuestionIndex > 0 || this.nextFlag) {
          //显示回答问题列表
          this.showQuestions = true
        }
        if (this.showResult) {
          //显示标题和描述
          this.$refs.nameAndDesc.style.display = 'block'
        }

        //pc端
      } else {
        //显示回答问题列表
        this.showQuestions = true
        this.$refs.nameAndDesc.style.display = 'block'
      }
    },
    /**开始答题 */
    startTest() {
      this.showQuestions = true
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    /**重新做题 */
    retake() {
      //取消展示回答结果
      this.showResult = false
      //将currentQuestionIndex改为0，回到第一题
      this.currentQuestionIndex = 0
      //更改radio禁用状态，用户可以点击
      this.disabledFlag = false
      //禁用下一题按钮
      this.nextFlag = false
      //重置单选框选中状态
      this.checkedAnswer = -1
      //重置正确答案下标
      this.trueIndex = -1
      //重置回答数组
      this.answers = []
      //展示问题
      this.showQuestions = true
      if (this.screenWidth <= 750) {
        //隐藏标题和描述
        this.$refs.nameAndDesc.style.display = 'none'
      }
    },
    /**获取最终分数或者正确答案和描述 */
    getQuizResult() {
      //   const datalis = {
      //     id: this.dataInfo.id,
      //     answers: this.answers,
      //   }
      //localStorage.setItem('quiz_results', JSON.stringify(datalis)) //存入值跳转页面时拿取
      this.isLoading = true
      this.$apiList.test
        .getQuizResult({
          origin: process.env.origin,
          id: this.dataInfo.id,
          answers: this.answers,
        })
        .then((res) => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
          this.isLoading = false
          this.result = res
          //隐藏详情，展示问题和回答列表
          this.showQuestions = true
          //显示标题和描述
          this.$refs.nameAndDesc.style.display = 'block'
          //展示结果
          this.showResult = true
          showAdBreak(this.adComplete)
        })
    },
    /**选择答案 */
    chooseAnswer(item, index) {
      //1为对错 2为非对错题
      if (!this.disabledFlag) {
        //对错
        if (this.dataInfo.quest_type == 1) {
          /**
           * 如果用户选择的不正确：
           * 1.将用户选择的答案标记红色边框
           * 2.标正确答案标记绿色变边框
           * 否则：
           * 将用户选择的答案标记绿色边框
           */
          //获取用户点击的下标
          this.checkedAnswer = index
          //获取本道题对的答案下标
          this.trueIndex = this.dataInfo.questions[
            this.currentQuestionIndex
          ].answers.findIndex((item) => item.correct === true)
          //判断回答数组当前下标是否为undefined，如果是才赋值
          if (this.answers[this.currentQuestionIndex] == undefined) {
            this.answers[this.currentQuestionIndex] = item.bucket
            //不让用户重新选答案,禁用radio
            this.disabledFlag = true
          }
        } else {
          //非对错题-直接赋值 用户可改变选择的答案
          this.answers[this.currentQuestionIndex] = item.bucket
        }
      }
      //选择答案后才能点击下一题
      this.nextFlag = true
    },
    /**下一题 */
    nextQuestion() {
      if (
        !this.nextFlag ||
        this.currentQuestionIndex + 1 == this.dataInfo.questions.length
      ) {
        // alert('Please make a selection for 1.!')
        // 提示通知
        this.$notification.open({
          message: 'Stop',
          description: 'Please make a selection for 1.!',
          duration: 2,
          style: {
            color: '#f00',
          },
        })
        return
      }
      //更改radio禁用状态
      this.disabledFlag = false
      //禁用下一题按钮
      this.nextFlag = false
      //重置单选框选中状态
      this.checkedAnswer = -1
      //重置正确答案下标
      this.trueIndex = -1
      //翻页
      this.currentQuestionIndex++
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      const adBreakIndex =
        this.dataInfo.questions.length - this.currentQuestionIndex
      if (adBreakIndex == 1) {
        adBreakInit() // 最后一道题时初始化插页广告
      }
    },
    adComplete(data) {
      console.log(data)
    },
    setOpenExpand() {
      this.openExpand = !this.openExpand
    },
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
$block: 220px;
$spacing: 55px;

.green-border {
  border: 1px solid #4beb6e !important;
  label {
    color: #fff !important;
  }
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.red-border {
  border: 1px solid #ff3e3e !important;
  label {
    color: #fff !important;
  }
  background-color: rgba(255, 255, 255, 0.1) !important;
}
.stop-next {
  color: rgba(255, 255, 255, 0.7) !important;
  background: transparent !important;
  border: 1px solid #45454d !important;
  // pointer-events: none !important;
  opacity: 0.5;
}
.details {
  width: 100%;
  .top_ad {
    .google_top {
      display: none;
    }
  }
  &_main {
    width: 1400px;
    margin: 56px auto 48px;
    display: flex;
    justify-content: space-between;
    &_left {
      width: 1046px;
      display: flex;
      flex-direction: column;
      align-items: center;
      &_top {
        padding: 24px 118px 103px 118px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 30px;
        width: 100%;
        &_menu {
          padding-top: 24px;
          a,
          span {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: rgba(255, 255, 255, 0.6);
          }
          span {
            margin: 0 5px;
          }
        }
        &_content {
          margin-top: 48px;
          &_main {
            &_pc {
              &_name {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 22px;
                line-height: 30px;
                color: rgba(255, 255, 255, 0.6);
              }
              &_desc {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;
                color: rgba(255, 255, 255, 0.6);
                margin-top: 16px;
                :deep(*) {
                  color: rgba(255, 255, 255, 0.6);
                  pointer-events: none;
                  cursor: default;
                }
              }
            }
            &_h5 {
              display: none;
            }

            &_questions {
              margin-top: 48px;
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 22px;
              line-height: 30px;
              color: #ffffff;
              margin-bottom: 16px;
            }
            &_questionImage {
              width: 100%;
              height: 100%;
            }
            &_answer {
              display: grid;
              grid-template-columns: repeat(2, 338px);
              grid-gap: 16px;
              margin-top: 16px;
              &_item {
                min-height: 40px;
                background-color: rgba(255, 255, 255, 0.06);
                border-radius: 18px;
                border: 1px solid transparent;
                cursor: pointer;
                &:hover {
                  background-color: rgba(255, 255, 255, 0.1);
                  p {
                    color: #fff;
                  }
                }
                label {
                  font-family: 'Rubik';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 22px;
                  color: rgba(255, 255, 255, 0.6);
                  width: auto;
                  display: flex;
                  align-items: center;
                  cursor: pointer;
                  height: 100%;
                  position: relative;
                  .img_answer {
                    border-radius: 18px;
                    overflow: hidden;
                    img {
                      object-fit: cover;
                    }
                  }
                  p {
                    // flex: 1;
                    max-width: 338px;
                    min-width: 338px;
                    cursor: pointer;
                    display: block;
                    word-wrap: break-word;
                    padding: 19px 10px 19px 46px;
                  }
                  input {
                    position: absolute;
                    left: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.6);
                    height: 18px;
                    width: 18px;
                    background: rgba(255, 255, 255, 0.1);
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
            }
            &_btm {
              margin-top: 32px;
              display: flex;
              align-items: center;
              &_count {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 22px;
                line-height: 30px;
                color: rgba(255, 255, 255, 0.6);
              }
              &_btn {
                margin-left: 6px;
                width: 119px;
                height: 44px;
                left: 171px;
                top: 302px;
                background: #ffffff;
                border-radius: 42px;
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
              }
              &_resultbtn {
                width: 179px;
                height: 44px;
                background: #9747ff;
                border-radius: 42px;
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                margin-left: 9px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                // .get_result {
                //   width: 100%;
                //   height: 100%;
                //   color: #ffffff;
                // }
              }
            }
          }
        }

        &_result {
          margin-top: 46px;
          &_score {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 22px;
            line-height: 30px;
            /* identical to box height, or 136% */
            color: #ffffff;
            span {
              color: #9747ff;
            }
          }
          &_title {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 22px;
            line-height: 30px;
            color: #9747ff;
          }
          &_desc {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            color: rgba(255, 255, 255, 0.6);
            margin-top: 16px;
          }
          .img_desc {
            margin-top: 24px;
            img {
              object-fit: cover;
            }
          }
          &_retake {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 300px;
            height: 46px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: rgba(255, 255, 255, 0.6);
            margin-top: 50px;
            cursor: pointer;
            border-radius: 42px;
            border: 1px solid #45454d;
            background: rgba(217, 217, 217, 0);
          }
        }
      }
      &_btm {
        width: 100%;
        margin-top: 24px;
        &_title {
          font-family: 'Cinzel Decorative';
          font-style: normal;
          font-weight: 700;
          font-size: 36px;
          line-height: 48px;
          text-transform: uppercase;
          color: #ffffff;
          text-align: center;
        }
        &_list {
          display: grid;
          grid-template-columns: repeat(4, 220px);
          grid-gap: 55px;
          margin-top: 24px;
          &_item {
            display: block;
            width: 220px;
            &_img {
              width: 220px;
              height: 220px;
              object-fit: cover;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            &_text {
              margin-top: 16px;
              &_name {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                text-align: center;
                color: rgba(255, 255, 255, 0.6);
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
            }
          }
        }
      }
      .google_ad {
        width: 100%;
        height: 305px;
        margin-top: 24px;
      }
      .lmore {
        display: none;
      }
    }
    &_right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .google_ad {
        width: 300px;
        height: 600px;
        margin-bottom: 96px;
        // overflow: hidden;
      }
    }
  }
  .foot_components {
    padding: 24px 0 0;
    .choice {
      margin-bottom: 48px;
    }
  }
}
@media (max-width: (4 * $block + 3 * $spacing + 354px)) {
  .details {
    &_main {
      width: 90%;
      &_left {
        width: 70%;
        &_top {
          padding: 24px 60px 50px;
          &_content {
            &_main {
              &_answer {
                grid-gap: 6px;
              }
            }
          }
        }
        .google_ad {
          width: 100%;
        }
        &_btm {
          &_list {
            grid-template-columns: repeat(3, 220px);
            justify-content: center;
          }
        }
      }
    }
  }
}
@media (max-width: (3 * $block + 2 * $spacing + 354px + 100px)) {
  .details {
    &_main {
      &_left {
        &_top {
          padding: 12px 30px 25px;
        }
        &_btm {
          &_list {
            grid-gap: 20px;
          }
        }
      }
    }
  }
}
@media (max-width: (3 * $block + 2 * $spacing + 354px)) {
  .details {
    &_main {
      &_left {
        &_top {
          &_content {
            &_main {
              &_answer {
                grid-template-columns: repeat(2, 50%);
                &_item {
                  width: 100%;
                }
              }
            }
          }
        }
        &_btm {
          &_list {
            grid-gap: 20px;
          }
        }
      }
      &_right {
        .google_ad {
          width: 90%;
        }
      }
    }
  }
}
@media (max-width: (3 * $block + 2 * $spacing + 300px)) {
  .details {
    &_main {
      &_left {
        &_top {
          &_content {
            &_main {
              &_answer {
                grid-gap: 20px;
              }
            }
          }
        }
        &_btm {
          &_list {
            grid-template-columns: repeat(2, 220px);
          }
        }
      }
    }
  }
}
@media (max-width: (2 * $block + 1 * $spacing + 350px)) {
  .details {
    &_main {
      &_right {
        align-items: flex-start;
        margin-left: 20px;
        .google_ad {
          width: 70%;
        }
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .details {
    .top_ad {
      height: 171 * $pr;
      .google_top {
        position: fixed;
        top: 46 * $pr;
        left: 0;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 171 * $pr;
        z-index: 10;
        background: #1e1233;
      }
    }
    &_main {
      width: 100%;
      padding: 0 16 * $pr 32 * $pr;
      margin: 0;

      &_left {
        width: 100%;
        &_top {
          padding: 32 * $pr 16 * $pr 24 * $pr;
          border-radius: 30 * $pr;
          margin-top: 16 * $pr;
          &_menu {
            margin-top: 24 * $pr;
            padding: 0;
            display: none;
            a,
            span {
              font-size: 12 * $pr;
              line-height: 16 * $pr;
            }
            span {
              margin: 0 5 * $pr;
            }
          }
          &_content {
            margin-top: 0;
            &_main {
              &_pc {
                display: none;
                &_name {
                  font-size: 16 * $pr;
                  line-height: 22 * $pr;
                  color: #ffffff;
                }
                &_desc {
                  font-size: 14 * $pr;
                  line-height: 18 * $pr;
                  margin-top: 16 * $pr;
                }
              }
              &_questionImage {
                width: 100%;
                height: 100%;
              }
              &_h5 {
                display: block;
                &_img {
                  object-fit: contain;
                  img {
                    width: 100%;
                    object-fit: contain;
                    border-radius: 8 * $pr;
                  }
                }
                &_name {
                  font-family: 'Rubik';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 16 * $pr;
                  line-height: 22 * $pr;
                  color: #ffffff;
                  margin-top: 32 * $pr;
                  text-align: center;
                }
                &_desc {
                  margin-top: 16 * $pr;
                  font-family: 'Rubik';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 14 * $pr;
                  line-height: 18 * $pr;
                  color: rgba(255, 255, 255, 0.6);
                  :deep(*) {
                    color: rgba(255, 255, 255, 0.6);
                    pointer-events: none;
                    cursor: default;
                  }
                  text-overflow: ellipsis;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-line-clamp: 5;
                  -webkit-box-orient: vertical;
                }
                &_btn {
                  width: 136 * $pr;
                  height: 44 * $pr;
                  background: #ffffff;
                  border-radius: 42 * $pr;
                  margin: 16 * $pr auto 0;
                  font-family: 'Rubik';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 16 * $pr;
                  color: #000000;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .texts_more {
                  -webkit-line-clamp: unset !important;
                  height: auto !important;
                }
                .more_btn {
                  font-family: 'Rubik';
                  font-style: normal;
                  font-weight: 400;
                  text-align: right;
                  font-size: 16 * $pr;
                  line-height: 28 * $pr;
                  color: #9747ff;
                  cursor: pointer;
                }
              }
              &_questions {
                font-size: 22 * $pr;
                line-height: 30 * $pr;
                margin-top: 0;
                margin-bottom: 16 * $pr;
              }

              &_answer {
                grid-gap: 8 * $pr;
                grid-template-columns: repeat(1, 311 * $pr);
                margin-top: 16 * $pr;
                &_item {
                  width: 311 * $pr;
                  height: auto;
                  border-radius: 18 * $pr;
                  // padding: 0 10 * $pr;
                  label {
                    font-size: 16 * $pr;
                    line-height: 22 * $pr;
                    .img_answer {
                      width: 100%;
                      border-radius: 18 * $pr;
                      overflow: hidden;
                      img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                      }
                    }
                    input {
                      left: 16 * $pr;
                      height: 18 * $pr;
                      width: 18 * $pr;
                      &:checked {
                        &::before {
                          width: 18 * $pr;
                          height: 18 * $pr;
                        }
                      }
                    }
                    p {
                      max-width: inherit;
                      min-width: inherit;
                      padding: 10 * $pr 10 * $pr 10 * $pr 45 * $pr;
                    }
                  }
                }
              }
              &_btm {
                justify-content: flex-end;
                &_count {
                  font-family: 'Rufina';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 22 * $pr;
                  line-height: 30 * $pr;
                }
                &_btn {
                  width: 119 * $pr;
                  height: 44 * $pr;
                  font-size: 16 * $pr;
                  line-height: 22 * $pr;
                  border-radius: 42 * $pr;
                  margin-left: 12 * $pr;
                }
                &_resultbtn {
                  width: 179 * $pr;
                  height: 44 * $pr;
                  font-size: 16 * $pr;
                }
              }
              .google_ad {
                width: 336 * $pr;
                height: 297 * $pr;
                margin-top: 16 * $pr;
              }
            }
          }

          &_result {
            &_score {
              font-size: 22 * $pr;
              line-height: 30 * $pr;
            }
            .img_desc {
              margin-top: 16 * $pr;
              img {
                width: 100%;
                object-fit: cover;
              }
            }
            &_retake {
              margin: 0 auto;
              width: 200 * $pr;
              height: 40 * $pr;
              font-size: 16 * $pr;
              line-height: 22 * $pr;
              border-radius: 20 * $pr;
              margin-top: 30 * $pr;
            }
          }
        }
        .google_ad {
          width: 336 * $pr;
          height: 297 * $pr;
          margin-top: 16 * $pr;
        }
        .lmore {
          display: block;
          margin-top: 8 * $pr;
        }
        &_btm {
          margin-top: 16 * $pr;
          &_title {
            display: none;
          }
          &_list {
            gap: 32 * $pr;
            grid-template-columns: 1fr;
            margin-top: 22 * $pr;
            &_item {
              width: 100%;
              &_img {
                width: 100%;
                height: 171 * $pr;
                border-radius: 6 * $pr;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              &_text {
                margin-top: 8 * $pr;
                &_name {
                  font-size: 14 * $pr;
                  line-height: 18 * $pr;
                }
              }
            }
          }
        }
      }
      &_right {
        display: none;
      }
    }
    .foot_components {
      padding: 16 * $pr 0 32 * $pr;
      .choice {
        margin-bottom: 32 * $pr;
      }
    }
  }
}
</style>
