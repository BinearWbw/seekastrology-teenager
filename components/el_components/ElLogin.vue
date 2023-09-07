<template>
  <div class="login">
    <transition name="fade">
      <button class="button" v-if="!getUserInfo.email" @click="loginTo">
        Log in
      </button>
    </transition>
    <div class="user_login" v-if="getUserInfo.email" @click="myProfile">
      <div class="user_img">
        <img :src="userImgIcon" alt="" />
      </div>
      <span class="names">{{ updateName }}</span>
      <img
        class="arrow"
        :class="{ arrowto: opens }"
        src="~/assets/img/login/down_arrow.svg"
        alt=""
      />
      <transition name="fade">
        <div class="drop_down" tabindex="0" @blur="closeDropdown" v-if="opens">
          <a
            v-for="(item, index) in dropData"
            :key="index"
            :href="`${item.path}`"
            >{{ item.name }}</a
          >
          <div class="log_out" @click="logOutTo">Log out</div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <el-login-form v-if="formOf" @choce="showunde"></el-login-form>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      opens: false,
      dropData: [
        { name: 'Your Profile', path: '/userrevise/1/' },
        { name: 'Tarot Record', path: '/userto/1/' },
        { name: 'Subscribe Record', path: '/userto/2/' },
        { name: 'Change Password', path: '/userrevise/2/' },
      ],
      formOf: false,
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
    updateName() {
      return this.getUserInfo.user_name || 'MY profile'
    },
    userImgIcon() {
      const imgUrl = this.getUserInfo.icon
        ? `${this.$config.cdnUrl + this.getUserInfo.icon}`
        : require('~/assets/img/login/user.svg')
      return imgUrl
    },
  },
  mounted() {
    // 添加点击文档其他地方的事件监听器
    document.addEventListener('click', this.closeDropdown)
  },
  methods: {
    ...mapMutations(['showLoginBox']),
    loginTo() {
      //   this.showLoginBox()
      this.formOf = true
    },
    showunde(val) {
      console.log('弹窗', val)
      this.formOf = false
    },
    myProfile() {
      this.opens = !this.opens
    },
    closeDropdown(event) {
      // 判断点击事件的目标是否在下拉菜单内
      const dropdown = this.$el
      if (!dropdown.contains(event.target)) {
        // 如果不在下拉菜单内，则关闭下拉菜单
        this.opens = false
      }
    },
    logOutTo() {
      // 退出登录-清楚用户信息
      this.$store.commit('UPDATE_USERINFO', {})
      window.changePageUrl = '/'
      window.location.href = '/'
    },
  },
  beforeDestroy() {
    // 在组件销毁之前移除事件监听器
    document.removeEventListener('click', this.closeDropdown)
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.login {
  display: flex;
  align-items: center;
  margin-left: 16px;
  .button {
    padding: 8px 32px;
    height: 44px;
    color: #0c0916;
    font-family: 'Cinzel Decorative';
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
    border-radius: 42px;
    background: #fff;
  }
  .user_login {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    .user_img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .names {
      color: rgba(255, 255, 255, 0.6);
      font-family: 'Cinzel Decorative';
      font-size: 14px;
      font-style: normal;
      min-width: 100px;
      font-weight: 700;
      line-height: 18px;
      padding: 0 8px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .arrow {
      width: 10px;
      height: 10px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    .arrowto {
      transform: rotate(-180deg);
    }
    .drop_down {
      position: absolute;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      width: 220px;
      padding: 12px 0;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(18, 7, 36, 0.9);
      a {
        display: block;
        color: rgba(255, 255, 255, 0.6);
        font-family: 'Rubik';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        padding: 6px 24px;
        &:hover {
          background-color: #24104a;
          color: #fff;
        }
      }
      .log_out {
        font-family: 'Rubik';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        padding: 6px 24px;
        color: #ff4646;
        &:hover {
          background-color: #24104a;
        }
      }
    }
  }
}
@media (max-width: (1366px)) {
  .login {
    .button {
      padding: 8px 20px;
      height: 32px;
    }
    .user_login {
      .user_img {
        width: 33px;
        height: 33px;
      }
      .drop_down {
        position: absolute;
        top: 45px;
        left: inherit;
        right: 0;
        transform: inherit;
      }
    }
  }
}
@media (max-width: (1100px)) {
  .login {
    .user_login {
      .names {
        display: none;
      }
      .arrow {
        display: none;
      }
    }
  }
}
@media (max-width: (1024px)) {
  .login {
    .user_login {
      .user_img {
        width: 30px;
        height: 30px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .names {
        display: block;
      }
      .arrow {
        display: block;
      }
      .drop_down {
        position: fixed;
        top: 0;
        left: inherit;
        right: 0;
        transform: inherit;
        width: 100%;
        height: 100%;
        padding: 46px 0 0;
        border: none;
        background: rgba(0, 0, 0, 0.75);
        backdrop-filter: blur(5px);
        a {
          color: #fff;
          padding: 16px 24px;
          text-align: center;
          background-color: #000;
          &:hover {
            background-color: #160f24;
          }
          position: relative;
          &::after {
            position: absolute;
            content: '';
            left: 0;
            bottom: 0;
            height: 1px;
            width: 100%;
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.2) 50.52%,
              rgba(255, 255, 255, 0) 100%
            );
          }
        }
        .log_out {
          padding: 16px 24px 24px;
          color: #ff4646;
          text-align: center;
          background-color: #000;
          &:hover {
            color: #fff;
            background-color: #832828;
          }
        }
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .login {
    display: flex;
    align-items: center;
    margin-left: 16 * $pr;
    .button {
      padding: 0;
      width: 30 * $pr;
      height: 30 * $pr;
      border-radius: 50%;
      font-size: 10 * $pr;
      font-weight: 700;
      line-height: 12 * $pr;
      background: #fff;
    }
    .user_login {
      .user_img {
        width: 30 * $pr;
        height: 30 * $pr;
        border-radius: 50%;
      }
      .names {
        display: none;
      }
      .arrow {
        display: none;
      }
      .drop_down {
        padding: 46 * $pr 0 0;
        backdrop-filter: blur(5 * $pr);
        a {
          color: #fff;
          font-size: 16 * $pr;
          line-height: 22 * $pr;
          padding: 16 * $pr 24 * $pr;
          &::after {
            position: absolute;
            height: 1 * $pr;
          }
        }
        .log_out {
          font-size: 16 * $pr;
          line-height: 22 * $pr;
          padding: 16 * $pr 24 * $pr 24 * $pr;
        }
      }
    }
  }
}
</style>
