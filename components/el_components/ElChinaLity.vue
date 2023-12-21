<template>
  <div class="lity">
    <p class="lity_title">Compatibility</p>
    <div class="lity_main">
      <a class="list" v-for="item in lityData" :key="item">{{ item }}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lityData: [
        'Rat',
        'Ox',
        'Tiger',
        'Rabbit',
        'Horse',
        'Snack',
        'Monkey',
        'Sheep',
        'Dragon',
        'Rooster',
        'Dog',
        'Pig',
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.lity {
  width: 100%;
  &_title {
    color: #fff;
    text-align: center;
    font-family: Cinzel Decorative;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
  }
  &_main {
    padding-top: 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .list {
      display: block;
      padding: 8px 32px 8px 48px;
      color: #fff;
      font-family: Rubik;
      font-size: 22px;
      font-style: normal;
      font-weight: 400;
      line-height: 30px;
      border-radius: 8px;
      transition: background 0.3s ease-in-out;
      position: relative;
      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }
      &::after {
        display: block;
        position: absolute;
        content: '';
        left: 32px;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        background: #d9d9d9;
        border-radius: 50%;
      }
    }
  }
}
</style>
