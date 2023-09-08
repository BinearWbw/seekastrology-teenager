<template>
  <div class="revise">
    <div class="revise_main">
      <a class="atop" :href="`/userto/1/`">
        <button class="button_top">＜ back</button>
      </a>
      <div class="menu">
        <div class="menu_left">
          <div
            class="left_name"
            :class="{ activate: activeMenu == 0 }"
            @click="selectMenu(0)"
          >
            Edit your profile
          </div>
          <div
            class="left_password"
            :class="{ activate: activeMenu == 1 }"
            @click="selectMenu(1)"
          >
            Change password
          </div>
        </div>
        <div class="menu_right">
          <div class="h5_title">Edit your profile</div>
          <div class="menu_name" v-if="activeMenu == 0">
            <p>User nickname</p>
            <div class="name_input">
              <el-input-name
                @namested="valueNames"
                :btn="'Send'"
              ></el-input-name>
            </div>
            <p>Bound email address</p>
            <div class="email_input">
              <el-input
                :holder="getUserInfo.email"
                @emitted="valueEmail"
                :btn="'Send'"
                :disable="false"
              ></el-input>
            </div>
          </div>
          <div class="h5_title">Change password</div>
          <div class="menu_password" v-if="activeMenu == 1 || isInnerWidthBox">
            <no-ssr>
              <a-form-model
                ref="changeForm"
                :model="revisePwd"
                :rules="rulesup"
                key="0"
              >
                <p>Old password</p>
                <a-form-model-item label="" prop="oldPwd">
                  <div class="names">
                    <a-input
                      placeholder="Enter password"
                      allow-clear
                      v-model="revisePwd.oldPwd"
                    />
                  </div>
                </a-form-model-item>
                <p>Change password</p>
                <a-form-model-item label="" prop="password1">
                  <div class="pwd1">
                    <a-input-password
                      v-model="revisePwd.password1"
                      placeholder="Enter password"
                    />
                  </div>
                </a-form-model-item>
                <a-form-model-item label="" prop="password2">
                  <div class="pwd2">
                    <a-input-password
                      v-model="revisePwd.password2"
                      placeholder="Enter password again"
                    />
                  </div>
                </a-form-model-item>
                <a-form-model-item>
                  <div class="changebtn">
                    <button class="button" @click="revisePwdSend">
                      Change
                    </button>
                  </div>
                </a-form-model-item>
              </a-form-model>
            </no-ssr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please input the password again'))
      } else if (value !== this.revisePwd.password1) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      revisePwd: {
        oldPwd: '',
        password1: '',
        password2: '',
      },
      rulesup: {
        oldPwd: [
          {
            required: true,
            message: 'Your current password',
            trigger: 'blur',
          },
          {
            min: 6,
            message: 'Password entered is less than 6 characters',
            trigger: ['blur', 'change'],
          },
        ],
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
            trigger: 'blur',
          },
          {
            min: 6,
            message: 'Password entered is less than 6 characters',
            trigger: ['blur', 'change'],
          },
          { validator: validatePass2, trigger: ['blur', 'change'] },
        ],
      },
      isInnerWidthBox: false,
    }
  },
  async asyncData({ error, $apiList, params }) {
    try {
      let ids = Number(params.id)
      let activeMenu = ids - 1
      return {
        activeMenu,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  mounted() {
    this.isInnerWidth()
  },
  methods: {
    ...mapMutations(['showLoginBox']),
    selectMenu(list) {
      this.activeMenu = list
    },
    isInnerWidth() {
      const wid = window.innerWidth
      if (wid <= 750) {
        this.isInnerWidthBox = true
      } else {
        this.isInnerWidthBox = false
      }
    },
    valueNames(value) {
      this.$apiList.user
        .setUserMsg({
          origin: process.env.origin,
          user_name: value,
        })
        .then((res) => {
          if (res.hasOwnProperty('token')) {
            this.$store.commit('UPDATE_USERINFO', res)
          } else {
            alert('未能修改', res.msg)
          }
        })
    },
    valueEmail(value) {
      this.$apiList.user
        .setUserMsg({
          origin: process.env.origin,
          new_email: value,
        })
        .then((res) => {
          if (res.hasOwnProperty('token')) {
            this.$store.commit('UPDATE_USERINFO', res)
          } else {
            alert('未能修改', res.msg)
          }
        })
    },
    revisePwdSend() {
      this.$refs.changeForm.validate((valid) => {
        if (valid) {
          let pwd = CryptoJS.MD5(this.revisePwd.oldPwd).toString(
            CryptoJS.enc.Hex
          )
          let new_pwd = CryptoJS.MD5(this.revisePwd.password2).toString(
            CryptoJS.enc.Hex
          )
          this.$apiList.user
            .setUserMsg({
              origin: process.env.origin,
              pwd,
              new_pwd,
            })
            .then((res) => {
              if (res.hasOwnProperty('token')) {
                this.$store.commit('UPDATE_USERINFO', res)
                this.resetForm()
                alert('Successfully modified')
                this.showLoginBox()
              } else {
                alert('wrong password', res.msg)
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
@use 'sass:math';
.revise {
  width: 1400px;
  margin: 0 auto;
  &_main {
    padding: 48px 196px 174px;
    .atop {
      display: inline-block;
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
    .menu {
      display: flex;
      padding-top: 17px;
      &_left {
        width: 235px;
        height: 372px;
        color: rgba(255, 255, 255, 0.6);
        text-align: center;
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        position: relative;
        &::before {
          position: absolute;
          right: 0;
          top: 0;
          content: '';
          width: 1px;
          height: 100%;
          background: linear-gradient(
            360deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50.52%,
            rgba(255, 255, 255, 0) 100%
          );
        }
        .left_name {
          padding: 16px 0;
          position: relative;
          cursor: pointer;
          &:hover {
            color: #fff;
          }
          &::before {
            position: absolute;
            left: 0;
            bottom: 0;
            content: '';
            width: 100%;
            height: 1px;
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.2) 50.52%,
              rgba(255, 255, 255, 0) 100%
            );
          }
        }
        .left_password {
          padding: 16px 0;
          position: relative;
          cursor: pointer;
          &:hover {
            color: #fff;
          }
          &::before {
            position: absolute;
            left: 0;
            bottom: 0;
            content: '';
            width: 100%;
            height: 1px;
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.2) 50.52%,
              rgba(255, 255, 255, 0) 100%
            );
          }
        }
        .activate {
          color: #fff !important;
          &::after {
            position: absolute;
            content: '';
            right: 0;
            top: 0;
            width: 2px;
            height: 100%;
            background: #9747ff;
          }
        }
      }
      &_right {
        flex: 1;
        padding-left: 118px;
        .h5_title {
          display: none;
        }
        .menu_name {
          p {
            color: rgba(255, 255, 255, 0.6);
            font-family: 'Rubik';
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
          }
          .name_input {
            margin: 16px 0 24px;
          }
          .email_input {
            margin: 16px 0 24px;
          }
        }
        .menu_password {
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
  }
}
@media (max-width: 1450px) {
  .revise {
    width: 100%;
  }
}
@media (max-width: 1100px) {
  .revise {
    &_main {
      padding: 48px 40px 174px;
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .revise {
    &_main {
      padding: 24 * $pr 24 * $pr 48 * $pr;
      .atop {
        display: inline-block;
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
      .menu {
        display: flex;
        padding-top: 24 * $pr;
        &_left {
          display: none;
        }
        &_right {
          flex: 1;
          padding-left: 0;
          .h5_title {
            display: block;
            color: #fff;
            text-align: center;
            font-family: 'Rubik';
            font-size: 22 * $pr;
            font-style: normal;
            font-weight: 400;
            line-height: 30 * $pr;
            padding: 12 * $pr 0;
            margin-bottom: 24 * $pr;
            &::after {
              content: '';
              display: block;
              width: 100%;
              height: 1 * $pr;
              position: relative;
              left: 0;
              bottom: -12 * $pr;
              background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.2) 50.52%,
                rgba(255, 255, 255, 0) 100%
              );
            }
          }
          .menu_name {
            p {
              font-size: 16 * $pr;
              line-height: 22 * $pr;
            }
            .name_input {
              margin: 8 * $pr 0 24 * $pr;
            }
            .email_input {
              margin: 8 * $pr 0 48 * $pr;
            }
          }
          .menu_password {
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
              font-size: 16 * $pr;
              line-height: 22 * $pr;
            }
            .names {
              margin-top: 24 * $pr;
            }
            .pwd1 {
              margin-top: 24 * $pr;
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
  }
}
</style>
