<template>
  <div class="reports">
    <div class="reports_main">
      <div class="frees">Free Birth Chart Natal Chart Report</div>
      <div class="discover">
        Discover the key to your life path & personality
      </div>
      <div class="linkmain">
        <a :href="`/birthchart/${getCurrentRoute}`" class="link"
          >CREATE CHART</a
        >
      </div>
      <div class="imgin">
        <div class="imgin_imgs"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getCurrentRoute() {
      return this.$route.path === '/' ? '?from=home' : ''
    },
  },
}
</script>

<style lang="scss" scoped>
.reports {
  &_main {
    width: 456px;
    min-height: 282px;
    background: rgba(255, 218, 139, 0.5);
    border-radius: 16px;
    padding: 24px 32px;
    position: relative;
    overflow: hidden;
    .frees {
      color: #fff;
      text-align: center;
      font-family: Cinzel Decorative;
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: 30px;
    }
    .discover {
      color: #fff;
      font-family: Rubik;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      padding: 43px 0 43px 138px;
    }
    .linkmain {
      text-align: center;
      .link {
        display: inline-block;
        padding: 8px 32px;
        height: 44px;
        color: #000;
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
        border-radius: 42px;
        background: #fff;
        text-align: center;
      }
    }
    .imgin {
      position: absolute;
      left: -29px;
      top: 55%;
      transform: translateY(-50%);
      width: 178px;
      height: 178px;
      background: url('~/assets/img/home/inside.svg') no-repeat;
      background-size: 110px 110px;
      background-position: center;
      &_imgs {
        width: 100%;
        height: 100%;
        background: url('~/assets/img/home/outside.svg') no-repeat;
        background-size: 99%;
        animation: rotate 20s linear infinite;
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
