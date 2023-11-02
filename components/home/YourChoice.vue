<template>
  <div class="choice">
    <div
      class="choice__title"
      :class="{ to_page_padding: $route.path !== '/' }"
    >
      <h3 :class="{ h5_size: $route.path !== '/' }">
        {{
          $route.path === '/' ? 'Choose Your Zodiac Sign' : 'DAILY HOROSCOPES'
        }}
      </h3>
      <!-- <p v-if="$route.path === '/'">Read Your Daily Horoscope Right Now</p> -->
    </div>
    <ul class="choice__main">
      <li v-for="item_i in variousListData" :key="item_i.id">
        <a
          class="fade choice__main__a"
          :href="`/horroscope/${item_i.name
            .replace(/[^a-zA-Z0-9\\s]/g, '-')
            .toLowerCase()}-${item_i.id}/${getCurrentRoute}`"
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
  computed: {
    getCurrentRoute() {
      return this.$route.path === '/' ? '?from=home' : ''
    },
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
  width: 1400px;
  margin: 16px auto 0;
  &__title {
    padding-bottom: 16px;
    h3 {
      color: #fff;
      text-align: center;
      font-family: 'Cinzel Decorative';
      font-size: 36px;
      font-style: normal;
      font-weight: 700;
      line-height: 48px;
    }
    p {
      font-family: 'Rubik';
      font-size: 22px;
      line-height: 30px;
      text-align: center;
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
    }
    &.to_page_padding {
      padding-bottom: 8px !important;
    }
  }
  &__main {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 32px 16px;
    li {
      box-sizing: border-box;
      border: 1px solid transparent;
      border-radius: 6px;
      transition: border-color 0.3s;
      .choice__main__a {
        box-sizing: border-box;
        height: 100%;
        display: block;
        // padding-bottom: 40px;
        .img__list {
          width: 218px;
          height: 154px;
          border-radius: 6px;
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
          font-size: 22px;
          line-height: 30px;
          color: #fff;
          text-align: center;
        }
        .time {
          font-family: 'Rubik';
          font-size: 14px;
          line-height: 18px;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
        }
      }
      &:hover {
        border-color: rgba(255, 255, 255, 0.6);
        .img__list {
          img {
            transform: scale(1.2);
          }
        }
      }
    }
  }
}

@media (max-width: 1435px) {
  .choice {
    width: 100%;
    padding: 0 30px;
    &__main {
      grid-template-columns: repeat(4, auto);
      justify-content: center;
    }
  }
}
@media (max-width: 947px) {
  .choice {
    &__main {
      grid-template-columns: repeat(3, auto);
      justify-content: center;
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .choice {
    padding: 0 16 * $pr;
    margin: 0 auto;
    &__title {
      padding-bottom: 16 * $pr;
      h3 {
        font-size: 22 * $pr;
        line-height: 30 * $pr;
      }
      .h5_size {
        font-size: 22 * $pr;
        line-height: 30 * $pr;
      }
      p {
        font-size: 14 * $pr;
        line-height: 18 * $pr;
      }
      &.to_page_padding {
        padding-bottom: 8 * $pr !important;
      }
    }
    &__main {
      grid-template-columns: repeat(3, 1fr);
      row-gap: 24 * $pr;
      column-gap: 11 * $pr;
      li {
        width: 100%;
        height: 147 * $pr;
        border: 0;
        .choice__main__a {
          height: 100%;
          padding-bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          .img__list {
            width: 100%;
            height: 100 * $pr;
            margin-bottom: auto;
            img {
              width: 100%;
              height: 100%;
              object-fit: contain cover;
            }
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
