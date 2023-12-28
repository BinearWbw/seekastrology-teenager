<template>
  <div class="palmImg">
    <div class="palmImg_main">
      <a class="items" v-for="i in 4" :key="i">
        <div class="imgs">
          <img src="~/assets/img/zodiac/chzo/palm.png" alt="#" />
        </div>
        <div class="tesx">What the Poruthams Indicate:</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.palmImg {
  width: 100%;
  &_main {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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
        height: 135px;
        border-radius: 8px 8px 0 0;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .tesx {
        padding: 8px;
        color: #fff;
        text-align: center;
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .palmImg {
    width: 100%;
    &_main {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16 * $pr;
      .items {
        display: block;
        border-radius: 8 * $pr;
        background: rgba(255, 255, 255, 0.08);
        transition: transform 0.3s ease-in-out;
        &:hover {
          transform: scale(1.04);
        }
        .imgs {
          height: 100 * $pr;
          border-radius: 8 * $pr 8 * $pr 0 0;
        }
        .tesx {
          padding: 8 * $pr;
          font-size: 14 * $pr;
          line-height: 18 * $pr;
        }
      }
    }
  }
}
</style>
