<template>
  <div class="input_main">
    <no-ssr>
      <a-form-model ref="aiForm" :model="aiData" :rules="rules">
        <template v-if="askInputVisible">
          <a-form-model-item label="" prop="text">
            <a-input
              placeholder="Ask a question"
              allow-clear
              :disabled="disable"
              @keyup.enter="inputSubmit"
              v-model="aiData.text"
            />
          </a-form-model-item>
          <button class="button" v-if="nameHasValue" @click="inputSubmit">
            {{ btn }}
          </button>
        </template>
      </a-form-model>
      <a-form-model ref="todayForm" :model="emailData" :rules="emailRules">
        <div class="login" v-if="!askInputVisible">
          <div class="login_content">
            <div class="login_content_header">
              Today's free Tarot AI count has been used up, please log in to
              your account for more counts!
            </div>
            <!-- <div class="login_content_label">Email Address*</div> -->
            <!-- <a-form-model-item label="" prop="emails">
              <a-input
                placeholder="Enter your email account"
                allow-clear
                @keyup.enter="emailSubmit"
                v-model="emailData.email"
              />
            </a-form-model-item> -->
            <button class="emailButton" @click="emailSubmit">Send</button>
          </div>
        </div>
      </a-form-model>
    </no-ssr>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['btn', 'disable', 'askInputVisible'],
  data() {
    return {
      aiData: {
        text: '',
      },
      rules: {
        text: [
          {
            required: true,
            message: 'Question cannot be empty',
            trigger: 'change',
          },
        ],
      },
      emailData: {
        email: '',
      },
      emailRules: {
        emails: [
          {
            required: true,
            message: 'Please enter email',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Please input the correct email address',
            trigger: ['blur', 'change'],
          },
        ],
      },
      localAskInputVisible: this.askInputVisible,
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
    nameHasValue() {
      return this.aiData.text !== ''
    },
  },
  methods: {
    emailSubmit() {
      console.log('点击打开登录框')
      this.$eventBus.$emit('loginShow', true)
      //邮箱功能暂时不要
      //   this.$refs.todayForm.validate((valid) => {
      //     if (valid) {
      //       console.log(valid)
      //       // this.$emit('aited', this.aiData.text)
      //     } else {
      //       console.log('error submit!!')
      //       return false
      //     }
      //   })
    },
    inputSubmit() {
      this.$refs.aiForm.validate((valid) => {
        if (valid) {
          this.$emit('aited', this.aiData.text)
          this.aiData.text = ''
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.input_main {
  width: 100%;
  height: 54px;
  position: relative;
  .button {
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    width: auto;
    padding: 8px 32px;
    border-radius: 42px;
    background: #fff;
    color: #000;
    font-family: 'Rubik';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }
  :deep(.ant-input) {
    height: 54px !important;
    border-radius: 54px !important;
    border-color: rgba(0, 0, 0, 0.08);
    background: rgba(255, 255, 255, 0.08);
    padding-left: 24px;
    color: #fff;
    font-family: 'Rubik';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }
  :deep(.ant-input-affix-wrapper .ant-input:not(:last-child)) {
    padding-right: 140px;
  }
  :deep(.ant-input-clear-icon) {
    color: rgba(255, 255, 255, 0.08);
    font-size: 22px;
    position: relative;
    right: 110px;
  }
  :deep(.has-error .ant-input-affix-wrapper .ant-input) {
    background-color: rgba(0, 0, 0, 0.08);
    border-color: #f5222d;
  }
  .login {
    // min-height: auto;
    border-radius: 27px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    backdrop-filter: blur(8px);
    &_content {
      padding: 16px;
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
      &_label {
        padding: 0 10px;
        color: rgba(255, 255, 255, 0.6);
        font-family: 'Rubik';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
      }
      :deep(.ant-form-item) {
        margin-bottom: 0;
      }
      :deep(.ant-input) {
        border-radius: 27px !important;
        border-color: rgba(255, 255, 255, 0.08);
        background: rgba(0, 0, 0, 0.24);
      }
      :deep(.ant-input-clear-icon) {
        color: rgba(255, 255, 255, 0.08);
        font-size: 22px;
        position: relative;
        right: initial;
      }
      .emailButton {
        border-radius: 42px;
        background: #9747ff;
        padding: 8px 32px;
        color: #fff;
        font-family: 'Rubik';
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
  .input_main {
    width: 100%;
    height: 44 * $pr;
    position: relative;
    .button {
      position: absolute;
      top: 50%;
      right: 8 * $pr;
      transform: translateY(-50%);
      width: auto;
      padding: 8 * $pr 32 * $pr;
      border-radius: 42 * $pr;
      background: #fff;
      color: #000;
      font-family: 'Rubik';
      font-size: 16 * $pr;
      font-style: normal;
      font-weight: 400;
      line-height: 22 * $pr;
    }
    :deep(.ant-input) {
      height: 44 * $pr !important;
      border-radius: 44 * $pr !important;
      border-color: rgba(0, 0, 0, 0.08);
      background: rgba(255, 255, 255, 0.08);
      padding-left: 16 * $pr;
      color: #fff;
      font-family: 'Rubik';
      font-size: 16 * $pr;
      font-style: normal;
      font-weight: 400;
      line-height: 22 * $pr;
    }
    :deep(.ant-input-affix-wrapper .ant-input:not(:last-child)) {
      padding-right: 140 * $pr;
    }
    :deep(.ant-input-clear-icon) {
      color: rgba(255, 255, 255, 0.08);
      font-size: 22 * $pr;
      position: relative;
      right: 100 * $pr;
    }
    :deep(.has-error .ant-input-affix-wrapper .ant-input) {
      background-color: rgba(0, 0, 0, 0.08);
      border-color: #f5222d;
    }
    :deep(.ant-form-explain) {
      padding: 0 0 0 16 * $pr;
    }
    .login {
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
        &_label {
          padding: 0 10 * $pr;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14 * $pr;
          line-height: 18 * $pr;
        }

        :deep(.ant-input) {
          border-radius: 27 * $pr !important;
        }
        :deep(.ant-input-clear-icon) {
          font-size: 22 * $pr;
        }
        :deep(.ant-input-affix-wrapper .ant-input:not(:last-child)) {
          padding-right: 35 * $pr;
        }
        .emailButton {
          border-radius: 42 * $pr;
          padding: 8 * $pr 32 * $pr;
          font-size: 14 * $pr;
          line-height: 18 * $pr;
        }
      }
    }
  }
}
</style>
