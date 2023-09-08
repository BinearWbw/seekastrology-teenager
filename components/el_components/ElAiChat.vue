<template>
  <div class="chat_main">
    <div
      class="chat_frame"
      ref="chatContent"
      :class="askInputVisible ? 'height' : 'short'"
    >
      <div class="chat_wrapper" v-for="(item, index) in chatList" :key="index">
        <div class="chat_friend" v-if="item.uid !== 2">
          <div class="chat_friend_text">
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
    <div class="input_send">
      <el-ai-input
        :btn="'Send'"
        :disable="disableds || flowDisabled"
        @aited="meSendContent"
        @keyup.enter="meSendContent"
        :askInputVisible="askInputVisible"
      ></el-ai-input>
      <div class="doors" v-if="disableds">First draw a tarot card</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { EventSourcePolyfill } from 'event-source-polyfill'
export default {
  props: ['disableds', 'cardName'],
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
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  methods: {
    //发送信息
    sendMsg(msgList) {
      this.chatList.push(msgList)
      this.scrollBottom()
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
      this.scrollBottom()
    },
    //输入ai 问题
    meSendContent(val) {
      let chatMsg = {
        msg: val,
        uid: 2, //uid
      }
      if (!this.getUserInfo?.token && this.loginOnce) {
        //展示输入邮箱模块，隐藏问题输入框
        this.askInputVisible = false
        return
      } else {
        this.askInputVisible = true
      }
      this.sendMsg(chatMsg)
      this.handelAI(val)
    },

    // 调用Ai
    handelAI(val) {
      this.flowDisabled = true
      const eventSource = new EventSource(
        `https://astro.doitme.link/api/openai?origin=seekastrology&type=tarot&card=${this.cardName}&question=${val}`
        // {
        //   headers: {
        //     Authorization: this.getUserInfo?.token,
        //   },
        // }
      )

      this.$apiList.user
        .getApiOpenai({
          origin: process.env.origin,
          type: 'tarot',
          card: this.cardName,
          question: val,
        })
        .then((res) => {
          //   console.log('本地ai 接口', res)
          // if (res.data) {
          //   //拼接字符
          //   if (res.data == 'StreamFinished') {
          //   } else {
          //     this.chatList[this.chatList.length - 1].msg += res.data
          //   }
          //   this.scrollBottom()
          // }
        })

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
        // console.log('在线ai 接口', data)
        if (data) {
          //拼接字符
          if (data == 'StreamFinished') {
          } else {
            this.chatList[this.chatList.length - 1].msg += data
          }
          this.scrollBottom()
        }
      })

      // 监听错误事件
      eventSource.addEventListener('error', (event) => {
        console.log('end')
        eventSource.close()
        this.flowDisabled = false
        // 没有登录只能询问一次
        if (!this.getUserInfo?.token) this.loginOnce = true
      })
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
  height: 497px;
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
    .button {
      padding: 8px 32px;
      background-color: aquamarine;
      color: #000;
    }
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
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .height {
    height: 412 * $pr;
  }
  .short {
    height: 330 * $pr;
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
  }
}
</style>
