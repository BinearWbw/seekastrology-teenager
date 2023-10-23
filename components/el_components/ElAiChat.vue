<template>
  <div class="chat_main">
    <div
      class="chat_frame"
      ref="chatContent"
      :class="askInputVisible && frequency ? 'height' : 'short'"
      @scroll="scrollChange"
    >
      <div class="chat_wrapper" v-for="(item, index) in chatList" :key="index">
        <div class="chat_friend" v-if="item.uid !== 2">
          <div class="chat_friend_msg">
            <div class="chat_friend_msg_text" v-show="item.msg !== ''">
              <div class="card_img" v-if="item.cho == 2">
                <a
                  class="card_img_li"
                  v-if="item.img"
                  :href="`/tarot/details/${item.nam
                    .replace(/[^a-zA-Z0-9\\s]/g, '-')
                    .toLowerCase()}-${item.cid}/`"
                >
                  <nuxt-img
                    class="imgs"
                    :src="item.img"
                    fit="cover"
                    width="80"
                    height="160"
                    :alt="item.nam"
                    loading="lazy"
                    format="auto"
                  ></nuxt-img>
                </a>
                <p>{{ item.nam }}</p>
              </div>
              {{ item.msg }}
              <button
                class="btn_card"
                v-if="item.cho == 1"
                :disabled="!isLastLength(index)"
                @click="openCardSelect"
              >
                Draw Cards
              </button>
            </div>
          </div>
        </div>
        <div class="chat_me" v-else>
          <div class="chat_me_text">
            {{ item.msg }}
          </div>
        </div>
      </div>
    </div>
    <div class="input_send" v-if="!localAskInputVisible">
      <el-ai-input
        :btn="'Send'"
        id="SENDAIMATTER"
        :disable="flowDisabled"
        @aited="meSendContent"
        @keyup.enter="meSendContent"
        :askInputVisible="askInputVisible"
      ></el-ai-input>
    </div>
    <div class="login" v-if="localAskInputVisible">
      <div class="login_content">
        <div class="login_content_header">
          Today's opportunity has been exhausted. Please come back tomorrow.
          want to add it to your desktop?
        </div>
        <button class="login_content_button" id="PWACLICKTO" @click="download">
          Download
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventSourcePolyfill } from 'event-source-polyfill'
export default {
  props: ['cardData'],
  data() {
    return {
      askInputVisible: true,
      chatList: [
        {
          msg: '✨ Welcome to the seeastrology tarot chatbot! Please focus and ask a specific question that burns within you. You can ask your question up to once for free, log in to get more questions. Get started!',
          uid: 1,
          cho: '',
        },
      ],
      flowDisabled: false,
      loginOnce: false,
      takeItOneAt: true,
      takeInput: false,
      lastScrollTop: 0,
      stopScroll: true,
      localAskInputVisible: false,
      prompt: null,
      frequency: true,
      setNumberRequest: 0,
      cardDataAll: null,
      meDataAll: '',
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  watch: {
    cardData(val) {
      this.cardDataAll = this.cardData // 赋值
      if (this.cardDataAll) {
        this.handelAI(this.meDataAll)
        this.stopScroll = true //可以滚动了
      }
    },
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', this.beforeinstallprompt)
    this.$eventBus.$on('disabos', (receivedData) => {
      this.takeItOneAt = receivedData
      this.takeInput = receivedData
    })
    this.getNumberRequests()
  },
  methods: {
    // 检测ai剩余次数
    async getNumberRequests() {
      this.$apiList.user
        .getAiDegree({ origin: process.env.origin })
        .then((res) => {
          this.setNumberRequest = res
          if (res == 5) {
            this.localAskInputVisible = true
            this.frequency = false
            this.flowDisabled = true
          } else if (res == 1 && !this.getUserInfo?.token) {
            this.askInputVisible = false
            this.takeItOneAt = false
            this.flowDisabled = true
          }
        })
    },
    //发送信息
    sendMsg(msgList) {
      this.chatList.push(msgList)
      this.scrollBottom()
    },
    // 检测向下向上滚动
    scrollChange(e) {
      const to = e.target.scrollTop
      const ty = to - this.lastScrollTop
      this.lastScrollTop = to

      if (ty > 0) {
        // 向下滚动
        this.stopScroll = true
      } else {
        // 向上滚动
        this.stopScroll = false
      }
    },
    scrollBottom() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent
        this.$utils.scrollAnimation(
          scrollDom,
          scrollDom.scrollHeight - scrollDom.offsetHeight
        )
      })
    },
    // 模拟Ai 回答
    aiReplyContent(val) {
      let aiMsg = {
        msg: val,
        uid: 1, //判断是输入还是回复内容
        cho: 1, //没有值的时候,显示抽牌按钮
      }
      this.chatList.push(aiMsg)
      if (!this.stopScroll) {
        return
      } else {
        this.scrollBottom()
      }
    },
    //输入ai 问题
    meSendContent(val) {
      let chatMsg = {
        msg: val,
        uid: 2, //uid
      }
      this.sendMsg(chatMsg)
      this.meDataAll = val
      this.$eventBus.$emit('meData', true)
      if (!this.cardDataAll) {
        this.aiReplyContent(
          'Please choose a card that resonates with you the most.'
        )
      }
    },

    // 调用Ai
    handelAI(val) {
      this.flowDisabled = true
      const eventSource = new EventSourcePolyfill(
        `https://astro.doitme.link/api/openai?origin=seekastrology&type=tarot&card=${this.cardData.card_name}&question=${val}&desc_type=${this.cardData.desc_type}`,
        {
          headers: {
            Authorization: this.getUserInfo?.token || '',
          },
        }
      )

      let ifOpen = false //控制重新选牌按钮

      // 监听事件open
      eventSource.addEventListener('open', (event) => {
        this.$set(this.chatList, this.chatList.length, {
          msg: '',
          uid: 1,
          cho: 2,
          img: '',
          nam: '',
          cid: 1,
        })
      })
      // 监听事件流数据
      eventSource.addEventListener('message', (event) => {
        let data = event.data
        if (data) {
          //拼接字符
          if (data == 'StreamFinished') {
          } else if (data == '1003') {
            this.localAskInputVisible = true
            ifOpen = true
            this.frequency = false
            return (this.chatList[this.chatList.length - 1].msg = '')
          } else if (data == '1002') {
            ifOpen = true
            return (this.chatList[this.chatList.length - 1].msg = '')
          } else {
            this.chatList[this.chatList.length - 1].msg += data
            this.chatList[this.chatList.length - 1].nam =
              this.cardData.card_name
            this.chatList[this.chatList.length - 1].img = this.cardData.icon
            this.chatList[this.chatList.length - 1].cid = this.cardData.card_id
          }
          if (!this.stopScroll) {
            return
          } else {
            this.scrollBottom()
          }
        }
      })

      // 监听错误事件
      eventSource.addEventListener('error', (event) => {
        eventSource.close()
        this.getNumberRequests() //检测ai剩余次数
        if (!this.getUserInfo?.token && this.setNumberRequest == 2) return // 限制显示重新选牌按钮的闪烁
        if (this.setNumberRequest == 9) return // 限制显示重新选牌按钮的闪烁
        this.flowDisabled = ifOpen || false
        this.askInputVisible = true
        this.takeInput = true
        this.takeItOneAt = true
        this.cardDataAll = null // 滞空卡片数据
        this.meDataAll = '' // 滞空已经回答的问题
      })
    },
    beforeinstallprompt(e) {
      this.prompt = e
      e.preventDefault()
      return false
    },
    download() {
      if (this.prompt) {
        this.prompt.prompt()
        this.prompt.userChoice
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    openCardSelect() {
      console.log('打开卡牌选择')
      this.$eventBus.$emit('cardSelect', true)
    },
    // 验证是否最后一个索引
    isLastLength(index) {
      return index === this.chatList.length - 1
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.height {
  height: 560px;
}
.short {
  height: 471px;
}
.chat_main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .chat_frame {
    width: 100%;
    // height: 560px;
    overflow-y: scroll;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      width: 0; /* Safari,Chrome 隐藏滚动条 */
      height: 0; /* Safari,Chrome 隐藏滚动条 */
      display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
    }
    .chat_wrapper {
      position: relative;
      .chat_friend {
        width: 100%;
        float: left;
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        &_msg {
          max-width: 80%;
          &_text {
            padding: 16px 24px;
            color: #fff;
            font-family: 'Rubik';
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: 30px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.08);
            .card_img {
              display: none;
            }
            .btn_card {
              display: none;
            }
          }
        }
      }
      .chat_me {
        width: 100%;
        margin-bottom: 16px;
        float: right;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        &_text {
          max-width: 80%;
          padding: 16px 24px;
          color: #fff;
          font-family: 'Rubik';
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
          border-radius: 16px;
          background: var(--9747-ff, #9747ff);
        }
      }
    }
  }
  .input_send {
    padding-top: 16px;
    position: relative;
    .doors {
      position: absolute;
      bottom: 0;
      left: 50%;
      // width: 100%;
      padding: 10px;
      border-radius: 11px;
      background-color: rgba(0, 0, 0, 0.3);
      line-height: 22px;
      color: rgba(255, 255, 255, 0.6);
      font-family: 'Rubik';
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      cursor: not-allowed;
      transform: translateX(-50%) translateY(-80%);
    }
  }
  .login {
    margin-top: 16px;
    border-radius: 27px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    backdrop-filter: blur(8px);
    &_content {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      &_header {
        padding: 0 10px;
        color: #ffda8b;
        font-family: 'Rubik';
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
      }
      &_button {
        padding: 8px 32px;
        border-radius: 42px;
        background: var(--9747-ff, #9747ff);
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

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .height {
    height: 412 * $pr;
  }
  .short {
    height: 310 * $pr;
  }
  .chat_main {
    width: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    .chat_frame {
      width: 100%;
      //   height: auto;
      //   flex: 1;
      //   max-height: 412 * $pr;
      overflow-y: scroll;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 0; /* Safari,Chrome 隐藏滚动条 */
        height: 0; /* Safari,Chrome 隐藏滚动条 */
        display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }
      .chat_wrapper {
        position: relative;
        .chat_friend {
          width: 100%;
          float: left;
          margin-bottom: 10 * $pr;
          &_msg {
            max-width: 95%;
            position: relative;
            &_text {
              padding: 8 * $pr 16 * $pr;
              font-size: 14 * $pr;
              line-height: 18 * $pr;
              border-radius: 8 * $pr;
              background: rgba(255, 255, 255, 0.08);
              .card_img {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding-bottom: 15 * $pr;
                > p {
                  flex: 1;
                  font-size: 16 * $pr;
                  line-height: 20 * $pr;
                  font-family: 'Cinzel Decorative';
                }
                .card_img_li {
                  display: block;
                  width: 80 * $pr;
                  height: 160 * $pr;
                  margin-right: 20 * $pr;
                  border-radius: 10 * $pr;
                  overflow: hidden;
                  position: relative;
                  &::before {
                    content: 'See Card Meanings';
                    position: absolute;
                    width: 100%;
                    bottom: 0;
                    left: 0;
                    background: rgba(0, 0, 0, 0.6);
                    color: #fff;
                    text-align: center;
                    font-family: Rubik;
                    font-size: 11 * $pr;
                  }
                  .imgs {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                }
              }
              .btn_card {
                display: table;
                min-width: 10px;
                padding: 6 * $pr 16 * $pr;
                color: #333;
                font-family: 'Rubik';
                font-size: 14 * $pr;
                line-height: 18 * $pr;
                font-style: normal;
                font-weight: 400;
                text-align: right;
                border-radius: 25 * $pr;
                background-color: #fff;
                margin-top: 6 * $pr;
                &.btn_card[disabled] {
                  background-color: rgba(255, 255, 255, 0.5);
                }
              }
            }
          }
        }
        .chat_me {
          width: 100%;
          margin-bottom: 16 * $pr;
          &_text {
            max-width: 80%;
            padding: 8 * $pr 16 * $pr;
            font-size: 14 * $pr;
            line-height: 18 * $pr;
            border-radius: 8 * $pr;
            background: var(--9747-ff, #9747ff);
          }
        }
      }
    }
    .input_send {
      padding-top: 16 * $pr;
      .doors {
        padding: 10 * $pr;
        border-radius: 11 * $pr;
        background-color: rgba(0, 0, 0, 0.3);
        line-height: 22 * $pr;
        font-size: 16 * $pr;
        white-space: nowrap;
        transform: translateX(-50%) translateY(-70%);
      }
    }
    .login {
      margin: 10 * $pr;
      border-radius: 27 * $pr;
      border: 1 * $pr solid rgba(255, 255, 255, 0.4);
      border: none;
      backdrop-filter: blur(8 * $pr);
      &_content {
        padding: 16 * $pr;
        gap: 8 * $pr;
        &_header {
          padding: 0 10 * $pr;
          font-size: 16 * $pr;
          line-height: 22 * $pr;
        }
        &_button {
          padding: 8 * $pr 32 * $pr;
          border-radius: 42 * $pr;
          font-size: 16 * $pr;
          line-height: 22 * $pr;
        }
      }
    }
  }
}
</style>
