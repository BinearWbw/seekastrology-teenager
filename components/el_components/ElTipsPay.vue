<template>
  <div class="pay_main">
    <div class="main">
      <div class="tips_pay">
        <i class="succeed_icon"> </i>
        <div class="tis_text">Payment successful! unlocked report</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.pay_main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  .main {
    width: 100%;
    position: relative;
    .tips_pay {
      position: absolute;
      left: 50%;
      top: 300px;
      transform: translateX(-50%);
      width: 207px;
      padding: 16px;
      background-color: #9747ff;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .succeed_icon {
        width: 24px;
        height: 24px;
        background: url('~/assets/img/home/succeed.svg') no-repeat;
        background-size: 100%;
      }
      .tis_text {
        color: #fff;
        text-align: center;
        font-family: Rubik;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        padding-top: 8px;
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .pay_main {
    .main {
      .tips_pay {
        left: 50%;
        top: 160 * $pr;
        transform: translateX(-50%);
        width: 207 * $pr;
        padding: 16 * $pr;
        border-radius: 8 * $pr;
        .succeed_icon {
          width: 24 * $pr;
          height: 24 * $pr;
        }
        .tis_text {
          font-size: 18 * $pr;
          line-height: 24 * $pr;
          padding-top: 8 * $pr;
        }
      }
    }
  }
}
</style>
