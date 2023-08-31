<template>
  <div class="login_form">
    <div class="login_form_main" tabindex="0" @blur="hideLoginContent">
      <div class="main_form">
        <div class="login_left">
          <div class="login_text">
            <div class="text">
              <h3>Why Sign Up?</h3>
              <p>• Get personalized information</p>
              <p>• Get more Tarot AI times</p>
              <p>• Push relevant content anytime</p>
              <p>Keep your history</p>
              <p>• Free daily/weekly/monthly/yearly <br />horoscopes</p>
              <p>
                • Free love/career/health/financial <br />
                horoscopes
              </p>
            </div>
          </div>
        </div>
        <div class="login_right">
          <!-- 登录 -->
          <div class="form_login" v-if="openif">
            <h2 class="login_h2">LogIn</h2>
            <client-only>
              <a-form-model ref="ruleForm" :model="form" :rules="rules" key="1">
                <a-form-model-item label="" prop="name">
                  <a-input
                    placeholder="Enter your email account"
                    allow-clear
                    v-model="form.name"
                  />
                </a-form-model-item>
                <a-form-model-item label="" prop="password">
                  <a-input-password
                    v-model="form.password"
                    placeholder="Enter password"
                  />
                </a-form-model-item>
                <a-form-model-item>
                  <div class="submit">
                    <span class="forgot" @click="sendForgetPwdEmail"
                      >Forgot password</span
                    >
                    <button class="button" @click="inputSubmit">login</button>
                  </div>
                </a-form-model-item>
              </a-form-model>
            </client-only>
            <div class="noaccount">
              No account? <span class="up" @click="toggleSignUp">Sign Up</span>
            </div>
            <div class="text_or" v-if="false"><span>or</span></div>
            <div class="logo_google" v-if="false">
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M5.10671 12.5166C6.49339 9.75532 8.62066 7.4341 11.2508 5.81237C13.8809 4.19063 16.9101 3.33228 20 3.33325C24.4917 3.33325 28.265 4.98325 31.15 7.67492L26.3717 12.4549C24.6434 10.8033 22.4467 9.96159 20 9.96159C15.6584 9.96159 11.9834 12.8949 10.675 16.8333C10.3417 17.8333 10.1517 18.8999 10.1517 19.9999C10.1517 21.0999 10.3417 22.1666 10.675 23.1666C11.985 27.1066 15.6584 30.0383 20 30.0383C22.2417 30.0383 24.15 29.4466 25.6434 28.4466C26.5091 27.8766 27.2503 27.137 27.822 26.2724C28.3938 25.4079 28.7844 24.4363 28.97 23.4166H20V16.9699H35.6967C35.8934 18.0599 36 19.1966 36 20.3783C36 25.4549 34.1834 29.7283 31.03 32.6283C28.2734 35.1749 24.5 36.6666 20 36.6666C17.8111 36.6675 15.6434 36.237 13.6209 35.3997C11.5985 34.5624 9.76079 33.3348 8.21298 31.787C6.66516 30.2392 5.43753 28.4015 4.60027 26.379C3.763 24.3565 3.3325 22.1889 3.33338 19.9999C3.33338 17.3099 3.97671 14.7666 5.10671 12.5166Z"
                    fill="white"
                  />
                </svg>
              </i>
            </div>
          </div>
          <!-- 注册 -->
          <div class="form_sign" v-if="!openif">
            <h2 class="login_h2">Sign up</h2>
            <client-only>
              <a-form-model
                ref="ruleFormUp"
                :model="formup"
                :rules="rulesup"
                key="2"
              >
                <div class="next_one" v-if="nextif">
                  <a-form-model-item label="" prop="name">
                    <a-input
                      placeholder="Enter your email account"
                      allow-clear
                      v-model="formup.name"
                    />
                  </a-form-model-item>
                  <a-form-model-item label="" prop="password1">
                    <a-input-password
                      v-model="formup.password1"
                      placeholder="Enter password"
                    />
                  </a-form-model-item>
                  <a-form-model-item label="" prop="passwordtow">
                    <a-input-password
                      v-model="formup.passwordtow"
                      placeholder="Enter password again"
                    />
                  </a-form-model-item>
                  <a-form-model-item>
                    <div class="submit signup">
                      <button class="button" @click="nextStep">Next</button>
                    </div>
                  </a-form-model-item>
                </div>

                <div class="next_user" v-if="!nextif">
                  <a-form-model-item prop="nickname">
                    <a-input
                      placeholder="Enter your nickname"
                      allow-clear
                      v-model="formup.nickname"
                    />
                  </a-form-model-item>
                  <a-form-model-item prop="time">
                    <a-date-picker
                      v-model="formup.time"
                      type="date"
                      valueFormat="YYYY-MM-DD"
                      placeholder="Pick a date"
                      style="width: 100%"
                    />
                  </a-form-model-item>
                  <a-form-model-item>
                    <div class="submit signup">
                      <button class="button" @click="inputSignUp">
                        Sign up
                      </button>
                    </div>
                  </a-form-model-item>
                </div>
              </a-form-model>
            </client-only>
            <div class="noaccount">
              Already have an account?
              <span class="up" @click="toggleLogin">Login</span>
            </div>
            <div class="text_or"><span>or</span></div>
            <div class="logo_google">
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M5.10671 12.5166C6.49339 9.75532 8.62066 7.4341 11.2508 5.81237C13.8809 4.19063 16.9101 3.33228 20 3.33325C24.4917 3.33325 28.265 4.98325 31.15 7.67492L26.3717 12.4549C24.6434 10.8033 22.4467 9.96159 20 9.96159C15.6584 9.96159 11.9834 12.8949 10.675 16.8333C10.3417 17.8333 10.1517 18.8999 10.1517 19.9999C10.1517 21.0999 10.3417 22.1666 10.675 23.1666C11.985 27.1066 15.6584 30.0383 20 30.0383C22.2417 30.0383 24.15 29.4466 25.6434 28.4466C26.5091 27.8766 27.2503 27.137 27.822 26.2724C28.3938 25.4079 28.7844 24.4363 28.97 23.4166H20V16.9699H35.6967C35.8934 18.0599 36 19.1966 36 20.3783C36 25.4549 34.1834 29.7283 31.03 32.6283C28.2734 35.1749 24.5 36.6666 20 36.6666C17.8111 36.6675 15.6434 36.237 13.6209 35.3997C11.5985 34.5624 9.76079 33.3348 8.21298 31.787C6.66516 30.2392 5.43753 28.4015 4.60027 26.379C3.763 24.3565 3.3325 22.1889 3.33338 19.9999C3.33338 17.3099 3.97671 14.7666 5.10671 12.5166Z"
                    fill="white"
                  />
                </svg>
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please input the password again'))
      } else if (value !== this.formup.password1) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        password: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Please input the correct email address',
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          {
            required: true,
            message: 'please enter password',
            trigger: 'change',
          },
        ],
      },
      formup: {
        name: '',
        password1: '',
        passwordtow: '',
        nickname: '',
        time: '',
      },
      rulesup: {
        name: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Please input the correct email address',
            trigger: ['blur', 'change'],
          },
        ],
        password1: [
          {
            required: true,
            message: 'please enter password',
            trigger: 'change',
          },
        ],
        passwordtow: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
          },
          { validator: validatePass2, trigger: 'change' },
        ],
        nickname: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
          },
        ],
        time: [
          {
            required: true,
            message: 'Please select a time',
            trigger: 'blur',
          },
        ],
      },

      openif: true,
      nextif: true,
    }
  },
  methods: {
    ...mapMutations(['hideLoginBox']),
    // 登录
    inputSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let pwds = CryptoJS.MD5(this.form.password).toString(CryptoJS.enc.Hex)
          this.$apiList.user
            .getLogin({
              origin: process.env.origin,
              email: this.form.name,
              pwd: pwds,
            })
            .then((res) => {
              if (res.hasOwnProperty('token')) {
                this.$store.commit('UPDATE_USERINFO', res)
                console.log('登录', res)
                this.hideLoginBox() //隐藏
              } else if (res.code === 400) {
                alert(res.msg)
              }
            })
        }
      })
    },
    // 注册
    inputSignUp() {
      this.$refs.ruleFormUp.validate((valid) => {
        if (valid) {
          let pwds = CryptoJS.MD5(this.formup.passwordtow).toString(
            CryptoJS.enc.Hex
          )
          const dateString = this.formup.time
          const timestamp = new Date(dateString).getTime()

          this.$apiList.user
            .getRegister({
              origin: process.env.origin,
              email: this.formup.name,
              pwd: pwds,
              user_name: this.formup.nickname,
              birthday: timestamp,
            })
            .then((res) => {
              console.log('res', res)
              if (res.code === 400) {
                alert(res.msg)
              } else {
                this.hideLoginBox() //隐藏
                window.location.hash = '/user/activation/' //跳转到账号激活页面
                this.$store.commit('SIGN_SUCCESS', res.email)
              }
            })
        }
      })
    },
    //忘记密码-发送邮件
    sendForgetPwdEmail() {
      this.$apiList.user
        .sendForgetPwdEmail({
          origin: process.env.origin,
          email: this.form.name,
        })
        .then((res) => {
          if (res) {
            alert('Please check your email')
          } else {
            alert('Email is incorrect')
          }
        })
    },

    toggleLogin() {
      this.openif = true
      this.$refs.ruleFormUp.resetFields()
    },
    toggleSignUp() {
      this.openif = false
      this.$refs.ruleForm.resetFields()
    },
    hideLoginContent() {
      this.hideLoginBox() //隐藏
    },
    nextStep() {
      if (this.formup.name && this.formup.password1) {
        this.nextif = !this.nextif
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login_form {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  overflow: hidden;
  z-index: 999;
  &_main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 928px;
    height: 580px;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: #120724;
    backdrop-filter: blur(8px);
    padding: 2px;
    box-sizing: border-box;

    .main_form {
      width: 100%;
      height: 100%;
      border-radius: 21px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(8px);
      padding: 12px;
      display: flex;
      .login_left {
        flex: 1;
        flex-shrink: 0;
        background: url('~/assets/img/login/login_sun.png') center no-repeat;
        background-size: contain;
        .login_text {
          height: 100%;
          display: flex;
          align-items: center;
          .text {
            font-family: 'Rubik';
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 28px;
            padding-left: 32px;
            h3 {
              color: #fff;
            }
            p {
              color: rgba(255, 255, 255, 0.6);
            }
          }
        }
      }
      .login_right {
        width: 424px;
        height: 100%;
        flex-shrink: 0;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.08);
        padding: 48px 24px 0 24px;
        .form_login,
        .form_sign {
          .login_h2 {
            color: #fff;
            text-align: center;
            font-family: 'Cinzel Decorative';
            font-size: 36px;
            font-style: normal;
            font-weight: 700;
            line-height: 48px;
            margin-bottom: 24px;
          }
          :deep(.ant-form-item) {
            margin-bottom: 16px;
          }
          :deep(.ant-form-item-with-help) {
            margin-bottom: 0;
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
            min-height: 19px;
            font-size: 12px;
          }

          .submit {
            position: relative;
            padding-top: 36px;
            .forgot {
              display: block;
              position: absolute;
              top: 0;
              right: 0;
              color: rgba(255, 255, 255, 0.6);
              font-family: 'Rubik';
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
              cursor: pointer;
              &:hover {
                color: #fff;
              }
            }
            .button {
              width: 100%;
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
          .signup {
            padding: 0;
          }
          .noaccount {
            color: rgba(255, 255, 255, 0.6);
            font-family: 'Rubik';
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            text-align: center;
            padding-top: 8px;
            .up {
              color: var(--9747-ff, #9747ff);
              cursor: pointer;
            }
          }
          .text_or {
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            font-family: 'Rubik';
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            position: relative;
            margin: 24px 0;
            &::before {
              content: '';
              width: 100%;
              height: 1px;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.2) 50.52%,
                rgba(255, 255, 255, 0) 100%
              );
              z-index: -1;
            }
            span {
              background: #251a35;
              padding: 0 10px;
              z-index: 1;
            }
          }
          .logo_google {
            height: 40px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
