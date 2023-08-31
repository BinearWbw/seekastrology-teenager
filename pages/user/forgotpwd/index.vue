<template>
  <div class="forgotpwd">
    <div class="forgotpwd_main">
      <div class="forms">
        <h3 class="h3">Reset Password</h3>
        <client-only>
          <a-form-model
            ref="forgotForm"
            :model="forgotPwd"
            :rules="rulesForgot"
            key="0"
          >
            <p>Old password</p>
            <a-form-model-item label="" prop="oldPwd">
              <div class="names">
                <a-input
                  placeholder="Enter password"
                  allow-clear
                  v-model="forgotPwd.oldPwd"
                />
              </div>
            </a-form-model-item>
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
        </client-only>
      </div>
    </div>
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
        oldPwd: '',
        password1: '',
        password2: '',
      },
      rulesForgot: {
        oldPwd: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
          },
        ],
        password1: [
          {
            required: true,
            message: 'please enter password',
            trigger: 'change',
          },
        ],
        password2: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
          },
          { validator: validatePass2, trigger: 'change' },
        ],
      },
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
                alert('Reset successful')
              } else {
                alert('fail to edit')
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.changeForm.resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
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
      :deep(.ant-form-explain) {
        padding: 0 0 0 24px;
        font-size: 12px;
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
</style>
