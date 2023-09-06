<template>
  <transition name="fade">
    <div class="privacy">
      <p class="text">
        We use unpersonalized cookies to keep our site working and collect
        statistics for marketing purposes.See the Privacy and Cookie Policy
        <a href="/privacy.html" target="_blank">Learn more</a>
      </p>
      <button class="common-btn btn">Accept</button>
      <div class="privacy__main">
        <p class="text">
          We use unpersonalized cookies to keep our site working and collect
          statistics for marketing purposes.See the Privacy and Cookie Policy
          <a href="/privacy.html" target="_blank">Learn more</a>
        </p>
        <button class="common-btn btn" @click="accept">Accept</button>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Privacy',
  methods: {
    accept() {
      let data = {
        accept: 0,
      }
      localStorage.setItem('cookiesPrivacy', JSON.stringify(data))
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
.privacy {
  width: 100%;
  padding: 16px 28px;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  .text {
    visibility: hidden;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    min-width: 0;
    font-size: 16px;
    line-height: 20px;
    color: #aaabbd;
    a {
      color: #6e60f3;
      text-decoration: underline;
      -webkit-transition: color 0.3s;
      transition: color 0.3s;
      &:hover {
        color: #aaabbd;
      }
    }
  }
  .btn {
    visibility: hidden;
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    width: 140px;
    height: 40px;
    border-radius: 6px;
    font-size: 16px;
    color: #fff;
    background: #6c5dd3;
    -webkit-box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    -webkit-transition: background 0.3s;
    transition: background 0.3s;
    &:hover {
      background: #7a78ff;
    }
  }
  &__main {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 8;
    width: 100%;
    padding: 16px 28px;
    background: #111216;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .text {
      visibility: visible;
    }
    .btn {
      visibility: visible;
    }
  }
}
@media (max-width: 500px) {
  $pr: math.div(1vw, 3.75);
  .privacy {
    padding: 8 * $pr 12 * $pr;
    &__main {
      padding: 8 * $pr 12 * $pr;
    }
    .text {
      font-size: 12 * $pr;
      line-height: 18 * $pr;
    }
    .btn {
      margin-left: 5 * $pr;
      width: 120 * $pr;
      height: 40 * $pr;
      border-radius: 6 * $pr;
      font-size: 14 * $pr;
      -webkit-box-shadow: 0 4 * $pr 20 * $pr rgba(0, 0, 0, 0.25);
      box-shadow: 0 4 * $pr 20 * $pr rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
