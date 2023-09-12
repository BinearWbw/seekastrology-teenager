<template>
  <div class="forgotpwd">
    <div class="forgotpwd_main">
      <div class="forms">
        <h3 class="h3">Reset Password</h3>
        <no-ssr>
          <a-form-model
            ref="forgotForm"
            :model="forgotPwd"
            :rules="rulesForgot"
            key="0"
          >
            <!-- <p>Old password</p>
            <a-form-model-item label="" prop="oldPwd">
              <div class="names">
                <a-input
                  placeholder="Enter password"
                  allow-clear
                  v-model="forgotPwd.oldPwd"
                />
              </div>
            </a-form-model-item> -->
            <p>New Password</p>
            <a-form-model-item label="" prop="password1">
              <div class="pwd1">
                <a-input-password
                  v-model="forgotPwd.password1"
                  placeholder="Enter password"
                />
              </div>
            </a-form-model-item>
            <a-form-model-item label="" prop="password2">
              <div class="pwd2">
                <a-input-password
                  v-model="forgotPwd.password2"
                  placeholder="Enter password again"
                />
              </div>
            </a-form-model-item>
            <a-form-model-item>
              <div class="changebtn">
                <button class="button" @click="revisePwdSend">Change</button>
              </div>
            </a-form-model-item>
          </a-form-model>
        </no-ssr>
      </div>
    </div>
    <transition name="fade">
      <el-login-form v-if="formOf" @choce="forgotSend"></el-login-form>
    </transition>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please input the password again'))
      } else if (value !== this.forgotPwd.password1) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      forgotPwd: {
        // oldPwd: '',
        password1: '',
        password2: '',
      },
      rulesForgot: {
        // oldPwd: [
        //   {
        //     required: true,
        //     message: 'Your current password',
        //     trigger: 'blur',
        //   },
        //   {
        //     min: 6,
        //     message: 'Password entered is less than 6 characters',
        //     trigger: 'blur',
        //   },
        // ],
        password1: [
          {
            required: true,
            message: 'Enter your new password',
            trigger: 'change',
          },
          {
            min: 6,
            message: 'Password entered is less than 6 characters',
            trigger: ['blur', 'change'],
          },
        ],
        password2: [
          {
            required: true,
            message: 'Please enter new password again',
            trigger: ['blur', 'change'],
          },
          { validator: validatePass2, trigger: ['blur', 'change'] },
          {
            min: 6,
            message: 'Password entered is less than 6 characters',
            trigger: ['blur', 'change'],
          },
        ],
      },
      formOf: false,
    }
  },
  methods: {
    revisePwdSend() {
      this.$refs.forgotForm.validate((valid) => {
        if (valid) {
          let new_pwd = CryptoJS.MD5(this.forgotPwd.password2).toString(
            CryptoJS.enc.Hex
          )
          this.$apiList.user
            .forgetPwd({
              origin: process.env.origin,
              new_pwd,
            })
            .then((res) => {
              if (res && res?.code !== 400) {
                // 提示通知
                this.$notification.open({
                  message: 'Fulfill',
                  description: 'Reset successful please sign in.',
                  duration: 2,
                  style: {
                    color: '#0f0',
                  },
                })
                this.formOf = true
                let bodyStyle = document.body.style
                bodyStyle.overflow = 'hidden'
              } else {
                // 提示通知
                this.$notification.open({
                  message: 'Error',
                  description: 'fail to edit.',
                  duration: 2,
                  style: {
                    color: '#f00',
                  },
                })
              }
            })
        } else {
          // 提示通知
          this.$notification.open({
            message: 'Error',
            description: 'Error submit!!',
            duration: 2,
            style: {
              color: '#f00',
            },
          })
          return false
        }
      })
    },
    resetForm() {
      this.$refs.changeForm.resetFields()
    },
    forgotSend() {
      this.formOf = false
      let bodyStyle = document.body.style
      bodyStyle.overflow = ''
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.forgotpwd {
  width: 1400px;
  margin: 0 auto;
  &_main {
    padding: 96px 0 117px;
    display: flex;
    justify-content: center;
    .forms {
      width: 574px;
      .h3 {
        color: #fff;
        text-align: center;
        font-family: 'Cinzel Decorative';
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 48px;
        margin-bottom: 24px;
      }

      :deep(.ant-input) {
        height: 54px !important;
        border-radius: 27px !important;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(0, 0, 0, 0.08);
        padding-left: 24px;
        color: #fff;
        font-family: 'Rubik';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
      }
      :deep(.ant-input-clear-icon) {
        color: rgba(255, 255, 255, 0.08);
        font-size: 22px;
      }
      :deep(.ant-input-password-icon) {
        color: rgba(255, 255, 255, 0.08);
        font-size: 22px;
      }
      :deep(.has-error .ant-input-affix-wrapper .ant-input) {
        border-color: #f5222d;
      }
      p {
        color: rgba(255, 255, 255, 0.6);
        font-family: 'Rubik';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
      }
      .names {
        margin-top: 16px;
      }
      .pwd1 {
        margin-top: 16px;
      }
      .changebtn {
        .button {
          width: 220px;
          height: 44px;
          border-radius: 42px;
          background: #fff;
          color: #000;
          font-family: 'Rubik';
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
        }
      }
    }
  }
}
@media (max-width: 1450px) {
  .forgotpwd {
    width: 100%;
    margin: 0 auto;
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .forgotpwd {
    &_main {
      padding: 48 * $pr 24 * $pr 60 * $pr;
      .forms {
        width: 100%;
        .h3 {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
          margin-bottom: 24 * $pr;
        }

        :deep(.ant-input) {
          height: 44 * $pr !important;
          border-radius: 27 * $pr !important;
          border: 1 * $pr solid rgba(255, 255, 255, 0.08);
          padding-left: 16 * $pr;
          font-size: 16 * $pr;
          line-height: 18 * $pr;
        }
        :deep(.ant-input-clear-icon) {
          color: rgba(255, 255, 255, 0.08);
          font-size: 22 * $pr;
        }
        :deep(.ant-input-password-icon) {
          color: rgba(255, 255, 255, 0.08);
          font-size: 22 * $pr;
        }
        p {
          color: rgba(255, 255, 255, 0.6);
          font-family: 'Rubik';
          font-size: 16 * $pr;
          font-style: normal;
          font-weight: 400;
          line-height: 22 * $pr;
        }
        .names {
          margin-top: 16 * $pr;
        }
        .pwd1 {
          margin-top: 16 * $pr;
        }
        .changebtn {
          .button {
            width: 100%;
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
