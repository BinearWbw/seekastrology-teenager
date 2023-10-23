<template>
  <div class="articles">
    <div class="articles_main">
      <p class="title">POPULAR ARTICLES</p>
      <div class="content">
        <a
          :href="`/resources/details/${item.name
            .trim()
            .replace(/[^\w\d]/g, '-')
            .toLowerCase()}-${item.id}/`"
          v-for="(item, index) in getHomeNewsData"
          :key="index"
        >
          <div class="content_item">
            <div class="content_item_imgs">
              <nuxt-img
                :src="item.icon || '/'"
                fit="cover"
                width="214"
                height="124"
                :alt="item.name"
                loading="lazy"
                format="auto"
              ></nuxt-img>
            </div>
            <div class="content_item_text">
              <p class="text_title">{{ item.name }}</p>
              <p class="introduce" v-if="item.kind == 0" v-html="item.text"></p>
            </div>
            <div class="content_item_time">
              {{ $utils.formatMMDD(item.created_at) }}
            </div>
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
      getHomeNewsData: [],
    }
  },
  async fetch() {
    let [getHomeNewsData] = await Promise.all([
      this.$apiList.articles
        .getNewsRec({
          origin: process.env.origin,
        })
        .then((res) => {
          return res.slice(0, 4) || []
        }),
    ])
    this.getHomeNewsData = getHomeNewsData
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.articles {
  &_main {
    .title {
      color: #fff;
      text-align: center;
      font-family: 'Cinzel Decorative';
      font-size: 26px;
      font-style: normal;
      font-weight: 700;
      line-height: 36px;
      text-align: center;
    }
    .content {
      padding-top: 18px;
      a {
        display: block;
        &:last-child .content_item {
          margin-bottom: 0;
        }
        .content_item {
          display: flex;
          border-radius: 6px;
          transition: background-color 0.3s ease-in-out;
          margin-bottom: 16px;
          &:hover {
            background-color: rgba(255, 255, 255, 0.08);
          }
          &_imgs {
            width: 107px;
            height: 62px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 6px;
            }
          }
          &_text {
            flex: 1;
            padding: 0 8px 0 10px;
            .text_title {
              color: #fff;
              font-family: 'Rubik';
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
              margin-bottom: 4px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            .introduce {
              color: rgba(255, 255, 255, 0.6);
              font-family: 'Rubik';
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 16px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
          &_time {
            width: 40px;
            color: rgba(255, 255, 255, 0.6);
            font-family: 'Rubik';
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px;
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .articles {
    &_main {
      .title {
        font-size: 26 * $pr;
        line-height: 36 * $pr;
      }
      .content {
        padding-top: 34 * $pr;
        a {
          display: block;
          &:last-child .content_item {
            margin-bottom: 0;
          }
          .content_item {
            display: flex;
            border-radius: 6 * $pr;
            transition: background-color 0.3s ease-in-out;
            margin-bottom: 16 * $pr;
            position: relative;
            &:hover {
              background-color: rgba(255, 255, 255, 0.08);
            }
            &_imgs {
              width: 107 * $pr;
              height: 62 * $pr;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 6 * $pr;
              }
            }
            &_text {
              flex: 1;
              padding: 0 0 0 11 * $pr;
              .text_title {
                font-size: 14 * $pr;
                line-height: 18 * $pr;
                margin-bottom: 8 * $pr;
                padding-right: 40 * $pr;
              }
              .introduce {
                font-size: 12 * $pr;
                line-height: 16 * $pr;
              }
            }
            &_time {
              position: absolute;
              right: 0;
              width: 40 * $pr;
              font-size: 12 * $pr;
              line-height: 16 * $pr;
            }
          }
        }
      }
    }
  }
}
</style>
