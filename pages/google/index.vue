<template>
  <div class="googles">
    <div class="googles_main">
      <div class="google_btn" @click="googleUserLogin">
        <div
          id="g_id_onload"
          data-client_id="557942159499-httiicel41q108da15eh982gs2ukk33s.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="popup"
          data-callback="handleSeekResponses"
          data-auto_prompt="false"
        ></div>
        <div
          class="g_id_signin"
          data-type="standard"
          data-shape="pill"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      googleIntervalId: null,
    }
  },

  methods: {
    googleUserLogin() {
      console.log('点击google登录')
      this.googleIntervalId = setInterval(() => {
        const usData = JSON.parse(localStorage.getItem('seekastrologyGoogle'))
        console.log('google登录-usData', usData)
        if (usData) {
          this.$apiList.user
            .getGoogleUser({
              site_id: process.env.origin,
              google_token: usData.credential,
            })
            .then((res) => {
              //存储userInfo
              console.log('google 登录', res)
              //跳转到首页
              this.$store.commit('UPDATE_USERINFO', res)
              localStorage.setItem(
                'userInfo',
                JSON.stringify(this.$store.state)
              )
              // this.hideLoginBox() //隐藏
              localStorage.setItem('seekastrologyGoogle', null)
              sessionStorage.setItem('recom', 'one')
              this.$emit('choce', false)
              clearInterval(this.googleIntervalId)
            })
        }
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
.googles {
  width: 100%;
  &_main {
    width: 200px;
    margin: 0 auto;
    .google_btn {
      width: 40px;
    }
  }
}
</style>
