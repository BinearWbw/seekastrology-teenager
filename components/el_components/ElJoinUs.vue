<template>
  <div class="join_main">
    <div class="content">
      <div class="content_main">
        <div class="title">Join us</div>
        <p class="h5 tips">Get your daily horoscope for free</p>
        <button class="button">
          <span class="pc">Get your daily horoscope for free</span>
          <span class="h5">Join now</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.join_main {
  .content {
    width: 1400px;
    margin: 0 auto;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    backdrop-filter: blur(8px);
    padding: 3px;
    &_main {
      border-radius: 21px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(8px);
      padding: 21px 0 33px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        color: #fff;
        text-align: center;
        font-family: 'Cinzel Decorative';
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 48px;
      }
      .button {
        margin-top: 16px;
        color: #000;
        font-family: 'Rubik';
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
        height: 56px;
        padding: 8px 120px;
        border-radius: 42px;
        background: #fff;
        cursor: pointer;
      }
      .h5 {
        display: none;
      }
    }
  }
}
@media (max-width: 1470px) {
  .join_main {
    .content {
      width: 100%;
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .join_main {
    .content {
      border-radius: 24 * $pr;
      border: 1 * $pr solid rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(8 * $pr);
      padding: 3 * $pr;
      &_main {
        border-radius: 21 * $pr;
        border: 1 * $pr solid rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(8 * $pr);
        padding: 21 * $pr 0;
        .title {
          font-size: 26 * $pr;
          line-height: 36 * $pr;
        }
        .button {
          margin-top: 16 * $pr;
          font-size: 16 * $pr;
          line-height: 22 * $pr;
          height: 42 * $pr;
          padding: 8 * $pr 100 * $pr;
          border-radius: 42 * $pr;
          .pc {
            display: none;
          }
        }
        .h5 {
          display: block;
        }
        .tips {
          margin-top: 16 * $pr;
          color: #ffda8b;
          text-align: center;
          font-family: 'Rubik';
          font-size: 16 * $pr;
          font-style: normal;
          font-weight: 400;
          line-height: 22 * $pr;
        }
      }
    }
  }
}
</style>
