<template>
  <div class="choice">
    <ul class="choice__main">
      <li v-for="item_i in variousListData" :key="item_i.id">
        <a
          class="fade choice__main__a"
          :href="`/horroscope/${item_i.name
            .replace(/[^a-zA-Z0-9\\s]/g, '-')
            .toLowerCase()}-${item_i.id}/`"
          data-aos="zoom-out-up"
        >
          <div class="img__list">
            <nuxt-img
              :src="item_i.hot_icon || '/'"
              fit="cover"
              width="218"
              height="154"
              :alt="item_i.name"
              loading="lazy"
              format="auto"
            ></nuxt-img>
          </div>
          <p class="title">{{ upPercase(item_i.name) }}</p>
          <p class="time">{{ item_i.dates }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'YourChoice',
  props: ['item'],
  data() {
    return {
      variousListData: [],
    }
  },
  async fetch() {
    let [variousListData] = await Promise.all([
      this.$apiList.home
        .getZodiacHomeAstro({
          origin: process.env.origin,
        })
        .then((res) => {
          return res || []
        }),
    ])
    this.variousListData = variousListData
  },
  methods: {
    upPercase(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.choice {
  width: 100%;
  &__main {
    display: grid;
    grid-template-columns: repeat(3, 107px);
    gap: 24px 32px;
    padding: 0 16px;
    li {
      box-sizing: border-box;
      transition: border-color 0.3s;
      .choice__main__a {
        box-sizing: border-box;
        height: 100%;
        display: block;
        position: relative;
        .img__list {
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          width: 155px;
          height: 108px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
          }
        }
        .title {
          font-family: 'Rubik';
          font-size: 16px;
          line-height: 22px;
          color: #fff;
          text-align: center;
        }
        .time {
          font-family: 'Rubik';
          font-size: 12px;
          line-height: 16px;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
        }
      }
      &:hover {
        .img__list {
          img {
            transform: scale(1.2);
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .choice {
    width: 100%;
    &__main {
      display: grid;
      grid-template-columns: repeat(3, 107 * $pr);
      gap: 24 * $pr 11 * $pr;
      padding: 0;
      li {
        .choice__main__a {
          .img__list {
            width: 155 * $pr;
            height: 108 * $pr;
          }
          .title {
            font-size: 16 * $pr;
            line-height: 22 * $pr;
          }
          .time {
            font-size: 12 * $pr;
            line-height: 16 * $pr;
          }
        }
        &:hover {
          .img__list {
            img {
              transform: scale(1.1);
            }
          }
        }
      }
    }
  }
}
</style>
