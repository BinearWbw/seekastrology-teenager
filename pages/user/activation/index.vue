<template>
  <div class="activation">
    <div class="activation_main">
      <div class="popo">
        <h3>Check your inbox</h3>
        <p class="text">
          To finish creating your account, click on the link sent to
        </p>
        <p class="email">
          {{ getSignSuccess.email || 'tarot@tarot.con' }}
        </p>
        <div class="btn">
          <button
            class="button"
            :class="{ disabled: isDisabled }"
            @click="sendAgains"
            :disabled="isDisabled"
          >
            RESEND THE LINK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'
export default {
  data() {
    return {
      isDisabled: false,
      timeout: null,
    }
  },
  computed: {
    ...mapGetters(['getIntersperseUrl', 'getSignSuccess']),
  },
  methods: {
    sendAgains: debounce(function () {
      // 防抖按钮
      this.isDisabled = true
      this.$apiList.user
        .sendEmailAgain({
          origin: process.env.origin,
          email: this.getSignSuccess.email || '',
        })
        .then((res) => {
          console.log('发送邮箱激活', res)
        })

      this.timeout = setTimeout(() => {
        this.isDisabled = false
      }, 8000)
    }, 500),
  },
  beforeDestroy() {
    if (this.timeout) clearTimeout(this.timeout)
  },
}
</script>

<style lang="scss" scoped>
.activation {
  width: 1400px;
  margin: 0 auto;
  &_main {
    width: 100%;
    .popo {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 96px 0 200px;
      > h3 {
        color: #fff;
        text-align: center;
        font-family: 'Cinzel Decorative';
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 48px;
        margin-bottom: 24px;
      }
      .text {
        color: rgba(255, 255, 255, 0.6);
        font-family: 'Rubik';
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
        margin-bottom: 16px;
      }
      .email {
        color: #9747ff;
        text-align: center;
        font-family: 'Rubik';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
      }
      .btn {
        padding-top: 24px;
        .button {
          height: 44px;
          padding: 0 32px;
          background-color: #fff;
          color: #000;
          font-family: 'Rubik';
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
          border-radius: 16px;
        }
        .disabled {
          cursor: not-allowed; /* 修改鼠标指针样式为“禁用” */
          opacity: 0.6; /* 降低按钮的不透明度，表示禁用状态 */
          pointer-events: none; /* 阻止禁用按钮上的交互事件 */
        }
      }
    }
  }
}
</style>
