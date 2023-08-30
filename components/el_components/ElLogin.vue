<template>
  <div class="login" tabindex="0" @blur="closeDropdown">
    <button class="button" v-if="!getUserInfo.email" @click="loginTo">
      Log in
    </button>
    <div class="user_login" v-if="getUserInfo.email" @click="myProfile">
      <img class="user_img" src="~/assets/img/login/user.svg" alt="" />
      <span class="names">{{ updateName }}</span>
      <img
        class="arrow"
        :class="{ arrowto: opens }"
        src="~/assets/img/login/down_arrow.svg"
        alt=""
      />
      <transition name="fade">
        <div class="drop_down" v-if="opens">
          <a
            v-for="(item, index) in dropData"
            :key="index"
            :href="`${getIntersperseUrl + item.path}`"
            @click="logOutTo(item.name)"
            >{{ item.name }}</a
          >
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      opens: false,
      dropData: [
        { name: 'Your Profile', path: '/user/' },
        { name: 'Tarot Record', path: '/user/' },
        { name: 'Subscribe Record', path: '/user/revise/' },
        { name: 'Change Password', path: '/user/revise/' },
        { name: 'Log out', path: '/' },
      ],
    }
  },
  computed: {
    ...mapGetters(['getIntersperseUrl', 'getUserInfo']),
    updateName() {
      return this.getUserInfo.user_name || 'MY profile'
    },
  },
  mounted() {
    console.log('vuex数据', this.getUserInfo.email)
  },
  methods: {
    ...mapMutations(['showLoginBox']),
    loginTo() {
      this.showLoginBox()
    },
    myProfile() {
      this.opens = !this.opens
    },
    closeDropdown() {
      this.opens = false
    },
    logOutTo(item) {
      if (item == 'Log out') {
        this.$store.commit('UPDATE_USERINFO', {})
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  padding: 0 16px;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.06);
  }
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
      object-fit: cover;
    }
    .names {
      color: rgba(255, 255, 255, 0.6);
      font-family: 'Cinzel Decorative';
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 18px;
      padding: 0 8px;
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
        &:last-child {
          color: #ff4646;
        }
        &:hover {
          background-color: #24104a;
          color: #fff;
          &:last-child {
            color: #ff4646;
          }
        }
      }
    }
  }
}
</style>
