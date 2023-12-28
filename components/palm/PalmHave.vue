<template>
  <div class="have">
    <div class="have_title">What Kind of Hand You Have</div>
    <div class="have_main">
      <a class="items" v-for="i in 4" :key="i">
        <div class="imgs">
          <img src="~/assets/img/zodiac/chzo/palm.png" alt="#" />
        </div>
        <div class="test">Air Hand</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.have {
  width: 100%;
  &_title {
    color: #fff;
    text-align: center;
    font-family: Cinzel Decorative;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    position: relative;

    &::after {
      position: absolute;
      content: '';
      left: 0;
      bottom: 0;
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
  &_main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    .items {
      display: block;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.08);
      transition: transform 0.3s ease-in-out;
      &:hover {
        transform: scale(1.04);
      }
      .imgs {
        height: 169px;
        width: 100%;
        border-radius: 8px 8px 0 0;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .test {
        padding: 8px 5px;
        color: #fff;
        text-align: center;
        font-family: Rubik;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .have {
    width: 100%;
    &_title {
      font-size: 22 * $pr;
      line-height: 30 * $pr;
      margin-bottom: 16 * $pr;
      padding-bottom: 16 * $pr;
      position: relative;

      &::after {
        height: 1 * $pr;
      }
    }
    &_main {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16 * $pr;
      .items {
        display: block;
        border-radius: 8 * $pr;
        .imgs {
          height: 163 * $pr;
          width: 100%;
          border-radius: 8 * $pr 8 * $pr 0 0;
        }
        .test {
          padding: 8 * $pr 5 * $pr;
          font-size: 14 * $pr;
          line-height: 18 * $pr;
        }
      }
    }
  }
}
</style>
