<template>
  <div class="daily_horoscope" v-if="horoscopeData[0]">
    <div class="daily_horoscope_main">
      <h3>Know Your Sun Signs</h3>
      <h3 class="h5_title">Know Sun Signs</h3>
      <div class="main_primary">
        <div class="main_primary_content">
          <a
            :href="`/zodiac/details/${horoscopeData[0]?.name
              .replace(/[^a-zA-Z0-9\\s]/g, '-')
              .toLowerCase()}-${horoscopeData[0]?.id}/`"
            id="KNOWSUNSIGNS"
          >
            <div class="main_img">
              <nuxt-img
                :src="horoscopeData[0]?.banner || '/'"
                fit="cover"
                width="686"
                height="210"
                :alt="horoscopeData[0]?.name"
                loading="lazy"
                format="auto"
              ></nuxt-img>
            </div>
            <p class="title">{{ horoscopeData[0]?.name }}</p>
            <div class="main_text" v-html="horoscopeData[0]?.desc"></div>
          </a>
        </div>
        <div class="main_primary_content">
          <a
            :href="`/zodiac/details/${horoscopeData[1]?.name
              .replace(/[^a-zA-Z0-9\\s]/g, '-')
              .toLowerCase()}-${horoscopeData[1]?.id}/`"
            id="KNOWSUNSIGNS"
          >
            <div class="main_img">
              <nuxt-img
                :src="horoscopeData[1]?.banner || '/'"
                fit="cover"
                width="686"
                height="210"
                :alt="horoscopeData[1]?.name"
                loading="lazy"
                format="auto"
              ></nuxt-img>
            </div>
            <p class="title">{{ horoscopeData[1]?.name }}</p>
            <div class="main_text" v-html="horoscopeData[1]?.desc"></div>
          </a>
        </div>
      </div>
      <div class="main_btn">
        <button class="button" id="KNOWSUNSIGNSBTN" @click="pathToPage">
          Read More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'daily_horoscope',
  data() {
    return {
      horoscopeData: [],
    }
  },
  async fetch() {
    let [horoscopeData] = await Promise.all([
      this.$apiList.home
        .getZodiacHomeAstro({
          origin: process.env.origin,
        })
        .then((res) => {
          return res?.sort(() => Math.random() - 0.5) || []
        }),
    ])
    this.horoscopeData = horoscopeData
  },
  methods: {
    pathToPage() {
      this.$router.push('/zodiac/')
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.daily_horoscope {
  &_main {
    width: 1400px;
    margin: 56px auto 0;
    > h3 {
      margin-bottom: 24px;
      font-family: 'Cinzel Decorative';
      font-style: normal;
      font-weight: 700;
      font-size: 46px;
      line-height: 64px;
      text-align: center;
      color: #ffffff;
    }
    .h5_title {
      display: none;
    }
    .main_primary {
      width: 100%;
      padding-bottom: 24px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 48px;
      &_content {
        > a {
          display: block;
          width: 100%;
        }
        .title {
          font-family: 'Cinzel Decorative';
          font-style: normal;
          font-weight: 700;
          font-size: 26px;
          line-height: 36px;
          color: #fff;
          margin: 10px 0 16px;
        }
        .main_img {
          width: 100%;
          height: 210px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .main_text {
          font-family: 'Rubik';
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          color: rgba(255, 255, 255, 0.6);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
    .main_btn {
      display: grid;
      place-items: center;
      .button {
        width: 220px;
        height: 44px;
        border-radius: 42px;
        font-family: 'Rubik';
        font-size: 16px;
        line-height: 22px;
        background-color: #fff;
        color: #000;
      }
    }
  }
}

@media (max-width: 1450px) {
  .daily_horoscope {
    &_main {
      width: 100%;
      padding: 0 30px;
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .daily_horoscope {
    &_main {
      margin: 32 * $pr auto 0;
      padding: 0 16 * $pr;
      > h3 {
        margin-bottom: 24 * $pr;
        font-size: 22 * $pr;
        line-height: 30 * $pr;
        padding: 0 20 * $pr;
        display: none;
      }
      .h5_title {
        display: block;
      }
      .main_primary {
        padding-bottom: 24 * $pr;
        grid-template-columns: repeat(1, 1fr);
        gap: 24 * $pr;
        &_content {
          > a {
            width: 100%;
          }
          .title {
            font-family: 'Cinzel Decorative';
            font-style: normal;
            font-weight: 700;
            font-size: 22 * $pr;
            line-height: 30 * $pr;
            color: #fff;
            margin: 10 * $pr 0;
          }
          .main_img {
            width: 100%;
            height: 106 * $pr;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .main_text {
            font-size: 16 * $pr;
            line-height: 22 * $pr;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            height: 110 * $pr;
          }
        }
      }
      .main_btn {
        display: grid;
        place-items: center;
        padding: 0 25 * $pr;
        .button {
          width: 100%;
          height: 44 * $pr;
          border: 1 * $pr solid #45454d;
          border-radius: 42 * $pr;
          font-size: 16 * $pr;
          line-height: 22 * $pr;
          background: #fff;
          color: #000;
        }
      }
    }
  }
}
</style>
