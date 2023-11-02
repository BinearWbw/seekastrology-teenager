<template>
  <div class="lnformation">
    <div class="lnformation_main">
      <h3 class="h3_tion">Daily astrology video</h3>
      <div class="duration">
        <a
          class="duration_li"
          v-for="(item, index) in lnformation"
          :key="index"
          :href="`/resources/details/${item.name
            .trim()
            .replace(/[^\w\d]/g, '-')
            .toLowerCase()}-${item.id}/`"
        >
          <div class="img_list">
            <nuxt-img
              :src="item.icon || '/'"
              fit="cover"
              width="338"
              height="225"
              :alt="item.name"
              class="img_item"
              loading="lazy"
              format="auto"
            ></nuxt-img>
            <img
              src="~/assets/img/resources/play_icon.png"
              alt="play"
              class="img_play"
            />
            <span class="times">{{ $utils.formatMMSS(item.sec) }}</span>
          </div>
          <div class="duration_text">
            {{ item.name }}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lnformation: [],
    }
  },
  async fetch() {
    let [lnformation] = await Promise.all([
      this.$apiList.articles
        .getNews({
          origin: process.env.origin,
          size: 30,
        })
        .then((res) => {
          res.list = res.list?.filter((item) => item.type == 0)
          let datas = res.list.sort(() => Math.random() - 0.5) // 打乱数据位置
          return datas.slice(0, 4) // 获取前面四条
        }),
    ])
    this.lnformation = lnformation
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.lnformation {
  &_main {
    width: 1400px;
    margin: 0 auto;
    .h3_tion {
      color: #fff;
      text-align: center;
      font-family: 'Cinzel Decorative';
      font-size: 36px;
      font-style: normal;
      font-weight: 700;
      line-height: 48px;
    }
    .duration {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      padding-top: 24px;
      &_li {
        display: block;
        transition: transform 0.3s ease-out;
        &:hover {
          transform: translateY(-10px);
        }
        .img_list {
          position: relative;
          height: 225px;
          border-radius: 12px;
          margin-bottom: 12px;
          overflow: hidden;
          .img_item {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .img_play {
            position: absolute;
            width: 56px;
            height: 56px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .times {
            position: absolute;
            right: 5px;
            bottom: 5px;
            padding: 5px 20px;
            border-radius: 9px;
            background: rgba(0, 0, 0, 0.55);
            color: #fff;
            font-family: 'Rubik';
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
          }
        }
        .duration_text {
          color: #fff;
          font-family: 'Rubik';
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
          overflow: hidden;
          white-space: normal;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          display: -webkit-box;
        }
      }
    }
  }
}
@media (max-width: 1470px) {
  .lnformation {
    &_main {
      width: 100%;
      padding: 0 30px;
      .duration {
        grid-template-columns: repeat(2, 338px);
        justify-content: center;
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .lnformation {
    &_main {
      padding: 0 16 * $pr;
      .h3_tion {
        font-size: 22 * $pr;
        line-height: 30 * $pr;
      }
      .duration {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16 * $pr 5 * $pr;
        padding-top: 16 * $pr;
        &_li {
          &:hover {
            transform: translateY(-10 * $pr);
          }
          .img_list {
            height: 95 * $pr;
            border-radius: 6 * $pr;
            margin-bottom: 12 * $pr;
            .img_play {
              width: 38 * $pr;
              height: 38 * $pr;
            }
            .times {
              position: absolute;
              right: 5px;
              top: 5px;
              bottom: inherit;
              padding: 1 * $pr 8 * $pr;
              border-radius: 6 * $pr;
              color: rgba(255, 255, 255, 0.6);
              font-size: 12 * $pr;
              line-height: 16 * $pr;
            }
          }
          .duration_text {
            color: rgba(255, 255, 255, 0.7);
            font-size: 14 * $pr;
            line-height: 18 * $pr;
          }
        }
      }
    }
  }
}
</style>
