<template>
  <div class="deve">In Development</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.deve {
  width: 100%;
  height: 350px;
  margin: 0 auto;
  color: #fff;
  font-family: Cinzel Decorative;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  line-height: 350px;
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .deve {
    height: 350 * $pr;
    font-size: 24 * $pr;
    line-height: 350 * $pr;
  }
}
</style>
