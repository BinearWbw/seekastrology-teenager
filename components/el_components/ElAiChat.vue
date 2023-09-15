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
          <div class="chat_friend_text" v-show="item.msg !== ''">
            {{ item.msg }}
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
        :disable="disableds || flowDisabled || takeInput"
        @aited="meSendContent"
        @keyup.enter="meSendContent"
        :askInputVisible="askInputVisible"
      ></el-ai-input>
      <div class="doors" v-if="takeItOneAt">First draw a tarot card</div>
    </div>
    <div class="login" v-if="localAskInputVisible">
      <div class="login_content">
        <div class="login_content_header">
          Today's opportunity has been exhausted. Please come back tomorrow.
          want to add it to your desktop?
        </div>
        <button class="login_content_button" @click="download">Download</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventSourcePolyfill } from 'event-source-polyfill'
export default {
  props: ['disableds', 'cardName', 'descType'],
  data() {
    return {
      askInputVisible: true,
      chatList: [
        {
          msg: 'Welcome to Lotus Tarot Chatbot! ✨I m Aurora, your reader today. Please choose a card that resonates with you the most.',
          uid: 1,
        },
        {
          msg: "Then either ask a specific question for personalized guidance or click 'See Card Meaning' to self-explore symbolism and messages.",
          uid: 1,
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
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
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
          console.log(res)
          this.setNumberRequest = res
          if (res == 10) {
            this.localAskInputVisible = true
            this.frequency = false
            this.flowDisabled = true
          } else if (res == 3 && !this.getUserInfo?.token) {
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
        // console.log('向下滚动')
        this.stopScroll = true
      } else {
        // console.log('向上滚动')
        this.stopScroll = false
      }
      //   this.scrollBottom()
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
    aiReplyContent() {
      let aiMsg = {
        msg: 'ai 回复内容',
        uid: 1, //判断是输入还是回复内容
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
      this.handelAI(val)
      this.stopScroll = true //可以滚动了
    },

    // 调用Ai
    handelAI(val) {
      this.flowDisabled = true
      const eventSource = new EventSourcePolyfill(
        `https://astro.doitme.link/api/openai?origin=seekastrology&type=tarot&card=${this.cardName}&question=${val}&desc_type=${this.descType}`,
        {
          headers: {
            Authorization: this.getUserInfo?.token || '',
          },
        }
      )

      let ifOpen = false //控制重新选牌按钮
      let ifVisible = true // 控制重新登录状态

      // 监听事件open
      eventSource.addEventListener('open', (event) => {
        this.$set(this.chatList, this.chatList.length, {
          msg: '',
          uid: 1,
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
            ifVisible = false
            ifOpen = true
            return (this.chatList[this.chatList.length - 1].msg = '')
          } else {
            this.chatList[this.chatList.length - 1].msg += data
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
      word-break: break-all;

      .chat_friend {
        width: 100%;
        float: left;
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        &_text {
          max-width: 80%;
          padding: 16px 24px;
          color: #fff;
          font-family: 'Rubik';
          font-size: 22px;
          font-style: normal;
          font-weight: 400;
          line-height: 30px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.08);
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
        word-break: break-all;

        .chat_friend {
          width: 100%;
          float: left;
          margin-bottom: 10 * $pr;
          &_text {
            max-width: 80%;
            padding: 8 * $pr 16 * $pr;
            font-size: 14 * $pr;
            line-height: 18 * $pr;
            border-radius: 8 * $pr;
            background: rgba(255, 255, 255, 0.08);
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
