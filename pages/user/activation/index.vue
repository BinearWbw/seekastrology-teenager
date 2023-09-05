<template>
  <div class="activation">
    <div class="activation_main">
      <div class="popo">
        <img class="headerImg" src="@/assets/img/login/emailIcon.png" alt="" />
        <div class="content">
          <h3>Check your inbox</h3>
          <p class="text">
            To finish creating your account, click on the link sent to
          </p>
          <p class="email">
            {{ getSignSuccess || 'tarot@tarot.con' }}
          </p>
        </div>

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
@use 'sass:math';
.activation {
  width: 1400px;
  margin: 0 auto;
  &_main {
    width: 100%;
    .popo {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px 0 200px;
      .headerImg {
        width: 102px;
        height: 102px;
      }
      .content {
        margin: 24px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        > h3 {
          color: #fff;
          text-align: center;
          font-family: 'Rubik';
          font-size: 22px;
          font-style: normal;
          font-weight: 400;
          line-height: 30px;
        }
        .text {
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          font-family: 'Rubik';
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
        }
        .email {
          color: #fff;
          text-align: center;
          font-family: 'Rubik';
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px; /* 137.5% */
          text-decoration-line: underline;
        }
      }

      .btn {
        .button {
          height: 44px;
          padding: 8px 32px;
          background-color: #fff;
          color: #000;
          font-family: 'Rubik';
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
          border-radius: 42px;
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
@media (max-width: 1450px) {
  .activation {
    width: 100%;
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .activation {
    &_main {
      width: 100%;
      .popo {
        padding: 48 * $pr 41 * $pr 150 * $pr;
        > h3 {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
          margin-bottom: 24 * $pr;
        }
        .text {
          font-size: 14 * $pr;
          line-height: 18 * $pr;
          margin-bottom: 16 * $pr;
        }
        .email {
          font-size: 12 * $pr;
          line-height: 16 * $pr;
        }
        .btn {
          padding-top: 24 * $pr;
          .button {
            height: 44 * $pr;
            padding: 0 32 * $pr;
            font-size: 14 * $pr;
            line-height: 18 * $pr;
            border-radius: 42 * $pr;
          }
        }
      }
    }
  }
}
</style>
