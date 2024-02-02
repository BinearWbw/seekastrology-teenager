<template>
  <div class="login_form">
    <div class="login_form_base">
      <div class="login_form_base_main">
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
            <!-- 关闭按钮 -->
            <i class="icon_off" @click="hideLoginContent">
              <img src="../../assets/img/login/openup.svg" alt="openup" />
            </i>
            <!-- h5背景 -->
            <img
              class="img_h5"
              src="~/assets//img/login/login_sun_h5.png"
              alt="logo_bg"
            />
            <!-- 登录 -->
            <div class="form_login" v-show="openif">
              <h2 class="login_h2">LogIn</h2>
              <client-only>
                <a-form-model
                  ref="ruleForm"
                  :model="form"
                  :rules="rules"
                  key="1"
                >
                  <a-form-model-item
                    label=""
                    prop="name"
                    :validateStatus="nameValidateStatus"
                  >
                    <template #help v-if="nameValidateStatus">
                      <div
                        v-html="errorMsg"
                        class="errorMsg"
                        @click="sendingMailbox(form.name)"
                      ></div>
                    </template>
                    <a-input
                      placeholder="Enter your email account"
                      allow-clear
                      autocomplete="off"
                      v-model="form.name"
                    />
                  </a-form-model-item>
                  <a-form-model-item
                    label=""
                    prop="password"
                    :validateStatus="passwordValidateStatus"
                  >
                    <template #help v-if="passwordValidateStatus">
                      <div v-html="errorMsg" class="errorMsg"></div>
                    </template>
                    <a-input-password
                      v-model="form.password"
                      autocomplete="off"
                      placeholder="Enter password"
                      @focus="passwordValidateStatus = ''"
                    />
                  </a-form-model-item>
                  <a-form-model-item>
                    <div class="submit">
                      <span class="forgot" @click="sendForgetPwdEmail"
                        >Forgot password</span
                      >
                      <button
                        class="button"
                        id="CLICKTOLOGIN"
                        @click="inputSubmit"
                      >
                        login
                      </button>
                    </div>
                  </a-form-model-item>
                </a-form-model>
              </client-only>
              <div class="noaccount">
                No account?
                <span class="up" @click="toggleSignUp">Sign Up</span>
              </div>
              <div class="text_or"><span>or</span></div>
              <div class="logo_google">
                <div class="google_btn" id="googleButtons"></div>
              </div>
            </div>
            <!-- 注册 -->
            <div class="form_sign" v-show="!openif">
              <h2 class="login_h2">Sign up</h2>
              <div class="next_one" v-show="nextif">
                <client-only>
                  <a-form-model
                    ref="ruleFormUp"
                    :model="formup"
                    :rules="rulesup"
                    key="2"
                  >
                    <a-form-model-item
                      label=""
                      prop="name"
                      :validateStatus="registerEmailValidateStatus"
                    >
                      <template #help v-if="registerEmailValidateStatus">
                        <div
                          v-html="errorMsg"
                          class="errorMsg"
                          @click="toggleLogin"
                        ></div>
                      </template>
                      <a-input
                        placeholder="Enter your email account"
                        allow-clear
                        autocomplete="off"
                        v-model="formup.name"
                        @focus="registerEmailValidateStatus = ''"
                      />
                    </a-form-model-item>
                    <a-form-model-item label="" prop="password1">
                      <a-input-password
                        autocomplete="off"
                        v-model="formup.password1"
                        placeholder="Enter password"
                      />
                    </a-form-model-item>
                    <a-form-model-item label="" prop="passwordtow">
                      <a-input-password
                        autocomplete="off"
                        v-model="formup.passwordtow"
                        placeholder="Enter password again"
                      />
                    </a-form-model-item>
                    <a-form-model-item>
                      <div class="submit signup">
                        <button class="button" @click="nextStep">Next</button>
                      </div>
                    </a-form-model-item>
                  </a-form-model>
                </client-only>
              </div>
              <!-- 注册下一步 -->
              <div class="next_user" v-show="!nextif">
                <div class="btn">
                  <button class="button_top" @click="backUp">＜ back</button>
                </div>
                <client-only>
                  <a-form-model
                    ref="nextFormUp"
                    :model="nextFormUp"
                    :rules="nextRules"
                    key="3"
                  >
                    <a-form-model-item prop="nickname">
                      <p class="title_p">User nickname</p>
                      <a-input
                        placeholder="Enter your nickname"
                        allow-clear
                        v-model="nextFormUp.nickname"
                      />
                    </a-form-model-item>
                    <a-form-model-item prop="time">
                      <p class="title_p">User birthday</p>
                      <a-date-picker
                        v-model="nextFormUp.time"
                        type="date"
                        valueFormat="YYYY-MM-DD"
                        placeholder="dd/mm/yyyy"
                        style="width: 100%"
                        :getCalendarContainer="(trigger) => trigger.parentNode"
                      />
                    </a-form-model-item>
                    <a-form-model-item>
                      <div class="submit signup">
                        <button
                          class="button"
                          id="CLICKSIGNUP"
                          @click="inputSignUp"
                        >
                          Sign up
                        </button>
                        <div class="terms">
                          Click here to view our
                          <a
                            :href="`/support/?name=privacy`"
                            @click="hideLoginContent"
                            >Privacy Agreement</a
                          >
                          and
                          <a
                            :href="`/support/?name=disclaimer`"
                            @click="hideLoginContent"
                            >Terms of Use</a
                          >
                        </div>
                      </div>
                    </a-form-model-item>
                  </a-form-model>
                </client-only>
              </div>
              <div class="noaccount" v-show="nextif">
                Already have an account?
                <span class="up" @click="toggleLogin">Login</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js'
import { mapMutations } from 'vuex'
export default {
  head() {
    return {
      script: [
        {
          src: 'https://accounts.google.com/gsi/client',
          defer: true,
        },
      ],
    }
  },
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
      nameValidateStatus: '', //控制邮箱字段的验证状态
      passwordValidateStatus: '', // 控制密码字段的验证状态
      registerEmailValidateStatus: '', //控制注册邮箱字段的验证状态
      errorMsg: '', // 错误提示
      isLoading: false, // loading
      form: {
        name: '',
        password: '',
      },
      rules: {
        name: [
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
        password: [
          {
            required: true,
            message: 'Please enter password',
            trigger: 'change',
          },
          {
            min: 6,
            message: 'Password entered is less than 6 characters',
            trigger: 'blur',
          },
        ],
      },
      formup: {
        name: '',
        password1: '',
        passwordtow: '',
      },
      rulesup: {
        name: [
          {
            required: true,
            message: 'Please fill in your email',
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
          {
            min: 6,
            message: 'Password entered is less than 6 characters',
            trigger: 'blur',
          },
        ],
        passwordtow: [
          {
            required: true,
            message: 'Please enter password again',
            trigger: 'blur',
          },
          {
            min: 6,
            message: 'Password entered is less than 6 characters',
            trigger: 'blur',
          },
          { validator: validatePass2, trigger: 'change' },
        ],
      },

      nextFormUp: {
        nickname: '',
        time: '',
      },
      nextRules: {
        nickname: [
          {
            required: true,
            message: 'Please fill in your nickname',
            trigger: 'blur',
          },
        ],
        time: [
          {
            required: true,
            message: 'Your birthday',
            trigger: 'blur',
          },
        ],
      },

      openif: true,
      nextif: true,
      googleIntervalId: null,
      routerData: ['/tarot/'],
    }
  },

  mounted() {
    // 初始化 Google 登录
    google.accounts.id.initialize({
      client_id:
        '557942159499-httiicel41q108da15eh982gs2ukk33s.apps.googleusercontent.com',
      callback: this.handleCredentialResponse, //返回Google登录用户信息的回调
      context: 'signin',
    })

    // render button
    google.accounts.id.renderButton(document.getElementById('googleButtons'), {
      type: 'icon',
      size: 'large',
      text: 'signin_with',
      shape: 'circle',
      theme: 'filled_blue',
      width: 40,
    })
  },
  methods: {
    ...mapMutations(['hideLoginBox']),
    // 登录
    inputSubmit() {
      console.log('当前路由', this.$route.path)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.isLoading = true
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
                localStorage.setItem(
                  'userInfo',
                  JSON.stringify(this.$store.state)
                )
                // this.hideLoginBox() //隐藏
                this.$emit('choce', false)
                sessionStorage.setItem('recom', 'one')

                const isRouter = this.routerData.some(
                  (irou) => this.$route.path == irou
                )
                if (isRouter) {
                  window.location.reload()
                }
                // window.changePageUrl = '/userto/2/'
                // window.location.href = '/userto/2/'
              } else if (res.code === 400) {
                this.passwordValidateStatus = 'error'
                this.errorMsg = `<span>Incorrect username or password</span>`
                // alert(res.msg)
              } else if (res.code === 1001) {
                //未激活
                this.nameValidateStatus = 'error'
                this.errorMsg = `<span>your mailbox is not activated, <a href="/user/">activate immediately</a></span>`
              } else if (res.code == 10001) {
                this.nameValidateStatus = 'error'
                this.errorMsg = `<span>Email is not verified</span>`
              } else if (res.code == 10002) {
                this.nameValidateStatus = 'error'
                this.errorMsg = `<span>Email not found, Please re-register</span>`
              } else if (res.code == 10003) {
                this.passwordValidateStatus = 'error'
                this.errorMsg = `<span>Password error</span>`
              }
              this.isLoading = false
            })
        }
      })
    },
    // 去激活邮箱页面
    sendingMailbox(a) {
      this.$eventBus.$emit('emails', a)
      this.$store.commit('SIGN_SUCCESS', a)
      window.changePageUrl = `/user/`
      window.location.href = '/user/'
    },
    // 下一步
    nextStep() {
      this.$refs.ruleFormUp.validate((valid) => {
        if (valid) {
          this.nextif = false
        }
      })
    },
    // 注册
    inputSignUp() {
      this.$eventBus.$emit('emails', 'dadws')
      this.$refs.nextFormUp.validate((valid) => {
        if (valid) {
          this.isLoading = true
          let pwds = CryptoJS.MD5(this.formup.passwordtow).toString(
            CryptoJS.enc.Hex
          )
          const dateString = this.nextFormUp.time
          const timestamp = new Date(dateString).getTime()

          this.$apiList.user
            .getRegister({
              origin: process.env.origin,
              email: this.formup.name,
              pwd: pwds,
              user_name: this.nextFormUp.nickname,
              birthday: timestamp,
            })
            .then((res) => {
              if (res.code === 400) {
                // alert(res.msg)
                this.nextif = true
                //
                this.registerEmailValidateStatus = 'error'
                this.errorMsg = `<span>your email has been registered, <a>login now</a></span>`
              } else if (res.code == 1004) {
                this.backUp()
                this.registerEmailValidateStatus = 'error'
                this.errorMsg = `<span>your email has been registered, <a>login now</a></span>`
              } else {
                dataLayer.push({
                  event: 'signUpSuccess',
                })

                this.$store.commit('SIGN_SUCCESS', res.email)
                this.$eventBus.$emit('emails', res.email)
                this.$emit('choce')

                // 注册直接登录
                this.$store.commit('UPDATE_USERINFO', res)
                localStorage.setItem(
                  'userInfo',
                  JSON.stringify(this.$store.state)
                )
                sessionStorage.setItem('recom', 'one')
                // window.changePageUrl = '/userto/2/'
                // window.location.href = '/userto/2/'
                const isRouter = this.routerData.some(
                  (irou) => this.$route.path == irou
                )
                if (isRouter) {
                  window.location.reload()
                }
              }
              this.isLoading = false
            })
        }
      })
    },
    //忘记密码-发送邮件
    sendForgetPwdEmail() {
      const emailPattern = /^[\w\.-]+@[\w\.-]+\.\w+$/
      const foEmail = emailPattern.test(this.form.name)
      if (!this.form.name || !foEmail) {
        // 提示通知
        this.$notification.open({
          message: 'Email',
          description: 'Please confirm your email.',
          duration: 3,
          style: {
            color: '#9747ff',
          },
        })
      } else {
        this.$apiList.user
          .sendForgetPwdEmail({
            origin: process.env.origin,
            email: this.form.name,
          })
          .then((res) => {
            if (res) {
              // 提示通知
              this.$notification.open({
                message: 'Go to mailbox',
                description: 'Please check your email.',
                duration: 3,
                style: {
                  color: '#9747ff',
                },
              })
            } else {
              // 提示通知
              this.$notification.open({
                message: 'Error',
                description: 'Email is incorrect.',
                duration: 2,
                style: {
                  color: '#f00',
                },
              })
            }
          })
      }
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
      //   this.hideLoginBox() //隐藏
      clearInterval(this.googleIntervalId)
      this.$emit('choce', false)
    },
    backUp() {
      this.nextif = true
    },
    // google 登录
    handleCredentialResponse(response) {
      if (response) {
        this.$apiList.user
          .getGoogleUser({
            site_id: process.env.origin,
            google_token: response.credential,
          })
          .then((res) => {
            this.$store.commit('UPDATE_USERINFO', res)
            localStorage.setItem('userInfo', JSON.stringify(this.$store.state))
            sessionStorage.setItem('recom', 'one')
            this.$emit('choce', false)
            const isRouter = this.routerData.some(
              (irou) => this.$route.path == irou
            )
            if (isRouter) {
              window.location.reload()
            }
          })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:math';

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
  &_base {
    position: relative;
    width: 100%;
    height: 100%;
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
          position: relative;
          .img_h5 {
            display: none;
          }
          .icon_off {
            position: absolute;
            right: 16px;
            top: 16px;
            display: inline-block;
            width: 24px;
            height: 24px;
            border-radius: 12px;
            background: rgba(0, 0, 0, 0.5);
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
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
              .terms {
                padding-top: 16px;
                color: rgba(255, 255, 255, 0.6);
                font-family: 'Rubik';
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px;
                > a {
                  color: var(--9747-ff, #9747ff);
                }
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
              display: flex;
              justify-content: center;
              position: relative;
              .google_btn {
                width: 40px;
                z-index: 100;
              }
            }
            .next_user {
              .btn {
                padding-bottom: 16px;
                .button_top {
                  height: 44px;
                  padding: 0 32px;
                  border-radius: 42px;
                  border: 1px solid rgba(255, 255, 255, 0.3);
                  color: rgba(255, 255, 255, 0.6);
                  font-family: 'Rubik';
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 22px;
                }
              }
              .title_p {
                color: rgba(255, 255, 255, 0.6);
                font-family: 'Rubik';
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px;
                padding-bottom: 8px;
              }
            }
            .errorMsg {
              font-family: Rubik;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 18px;
              padding-bottom: 3px;
              span {
                color: #cf3c3c !important;
                a {
                  color: #fff !important;
                  text-decoration-line: underline !important;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1000px) {
  .login_form {
    &_base {
      &_main {
        width: auto;
        height: auto;
        .main_form {
          flex-direction: column;
          .login_left {
            padding: 16px;
            .login_text {
              .text {
                padding-left: 0;
              }
            }
          }
          .login_right {
            padding: 48px 24px 24px 24px;
          }
        }
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .login_form {
    position: fixed;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5 * $pr);
    padding: 16 * $pr;
    overflow: auto;
    &_base {
      &_main {
        top: 5%;
        left: initial;
        transform: initial;
        border-radius: 24 * $pr;
        border: 1 * $pr solid rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(8 * $pr);
        padding: 2 * $pr;
        width: 100%;
        .main_form {
          width: 100%;
          height: auto;
          border-radius: 21 * $pr;
          border: 1 * $pr solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(8 * $pr);
          padding: 0;
          display: flex;
          .login_left {
            display: none;
          }
          .login_right {
            width: 100%;
            flex-shrink: 0;
            border-radius: 12 * $pr;
            background: rgba(255, 255, 255, 0.08);
            padding: 24 * $pr 14 * $pr;
            .icon_off {
              right: 16 * $pr;
              top: 16 * $pr;
              width: 24 * $pr;
              height: 24 * $pr;
              border-radius: 12 * $pr;
            }
            .img_h5 {
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 116 * $pr;
              object-fit: cover;
              z-index: -1;
            }
            .form_login,
            .form_sign {
              .login_h2 {
                font-size: 22 * $pr;
                line-height: 48 * $pr;
                margin-bottom: 16 * $pr;
              }
              :deep(.ant-form-item) {
                margin-bottom: 16 * $pr;
              }
              :deep(.ant-form-item-with-help) {
                margin-bottom: 0;
              }
              :deep(.ant-input) {
                height: 46 * $pr !important;
                border-radius: 27 * $pr !important;
                border: 1 * $pr solid rgba(255, 255, 255, 0.08);
                background: rgba(0, 0, 0, 0.08);
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
              :deep(.has-error .ant-input-affix-wrapper .ant-input) {
                border-color: #f5222d;
              }
              .submit {
                position: relative;
                padding-top: 36 * $pr;
                .forgot {
                  font-size: 16 * $pr;
                  line-height: 22 * $pr;
                  cursor: pointer;
                  &:hover {
                    color: #fff;
                  }
                }
                .button {
                  width: 100%;
                  height: 44 * $pr;
                  border-radius: 42 * $pr;
                  font-size: 16 * $pr;
                  line-height: 22 * $pr;
                }
                .terms {
                  padding-top: 16 * $pr;
                  font-family: 'Rubik';
                  font-size: 16 * $pr;
                  line-height: 22 * $pr;
                }
              }
              .signup {
                padding: 0;
              }
              .noaccount {
                font-size: 16 * $pr;
                line-height: 22 * $pr;
                padding-top: 0;
              }
              .text_or {
                font-size: 16 * $pr;
                line-height: 22 * $pr;
                margin: 16 * $pr 0;
                &::before {
                  content: '';
                  height: 1 * $pr;
                }
                span {
                  padding: 0 10 * $pr;
                }
              }
              .logo_google {
                height: 40 * $pr;
              }
              .next_user {
                .btn {
                  padding-bottom: 16 * $pr;
                  .button_top {
                    height: 44 * $pr;
                    padding: 0 32 * $pr;
                    border-radius: 42 * $pr;
                    border: 1 * $pr solid rgba(255, 255, 255, 0.3);
                    font-size: 16 * $pr;
                    line-height: 22 * $pr;
                  }
                }
                .title_p {
                  font-size: 16 * $pr;
                  line-height: 22 * $pr;
                  padding-bottom: 8 * $pr;
                }
              }
              .errorMsg {
                font-size: 12 * $pr;
                line-height: 16 8 $pr;
              }
            }
          }
        }
      }
    }
  }
}
</style>
