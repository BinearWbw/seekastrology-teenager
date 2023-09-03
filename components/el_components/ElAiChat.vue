<template>
  <div class="chat_main">
    <div class="chat_frame" ref="chatContent">
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
        @aited="meSendContent"
        @keyup.enter="meSendContent"
      ></el-ai-input>
      <!-- <button class="button"  @click="aiReplyContent()">模拟ai回复</button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    }
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
    aiReplyContent() {
      let aiMsg = {
        msg: 'ai 回复内容',
        uid: 1, //判断是输入还是回复内容
      }
      this.chatList.push(aiMsg)
      this.scrollBottom()
    },
    meSendContent(val) {
      console.log('ai输入', val)
      let chatMsg = {
        msg: val,
        uid: 2, //uid
      }
      this.sendMsg(chatMsg)
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.chat_main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .chat_frame {
    width: 100%;
    height: 560px;
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
    .button {
      padding: 8px 32px;
      background-color: aquamarine;
      color: #000;
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .chat_main {
    width: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    .chat_frame {
      width: 100%;
      height: auto;
      flex: 1;
      max-height: 412 * $pr;
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
    }
  }
}
</style>
