<template>
  <div class="install">
    <button
      class="desktop common__btn"
      id="PWACLICKTO"
      v-if="prompt || screenWidth"
      @click="download"
    ></button>

    <transition name="makeup">
      <el-down-tips v-if="downTips" @closePro="closeProFat"></el-down-tips>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Desktop',
  data() {
    return {
      prompt: null,
      screenWidth: false,
      downTips: false,
    }
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', this.beforeinstallprompt)
    console.log(window.innerWidth)
    if (window.innerWidth <= 750) {
      this.screenWidth = true
    }
  },
  methods: {
    beforeinstallprompt(e) {
      this.prompt = e
      e.preventDefault()
      return false
    },
    download() {
      if (this.prompt) {
        this.prompt.prompt()
        this.prompt.userChoice
          .then((res) => {
            console.log(res)
            // {outcome: "dismissed", platform: ""} // cancel
            // {outcome: "accepted", platform: "web"} // complete
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.downTips = true
      }
    },
    closeProFat(value) {
      this.downTips = value
    },
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
.install {
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  width: 24px;
  display: flex;
  align-items: center;
  .desktop {
    width: 100%;
    height: 24px;
    background: url('../assets/img/header/download.svg') no-repeat;
    background-size: cover;
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .install {
    width: 24 * $pr;
    .desktop {
      height: 24 * $pr;
    }
  }
}
</style>
