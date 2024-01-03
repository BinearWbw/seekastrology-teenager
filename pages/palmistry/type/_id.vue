<template>
  <div class="palmistry_type">
    <google-ad :id="''" classNames="google_palm_top"></google-ad>
    <div class="palmistry_type_main">
      <div class="content">
        <div class="title">
          <p class="title_a">All Kind of Palmis</p>
          <p class="title_b">
            The line of life governs individual health, and relations with
            family and relatives. It is the dividing line between family and
            friends, and the outside world and its influence. In between the two
            demesnes is the Line of Life.
          </p>
        </div>
        <div class="palmis_item" v-if="palmisType.child">
          <a
            class="list_a"
            :href="`/palmistry/referral/${palmisType.id}-${item.id}/`"
            v-for="(item, index) in palmisType.child"
            :key="index"
          >
            <div class="imgs">
              <nuxt-img
                :src="item.icon"
                fit="cover"
                width="304"
                height="180"
                :alt="item.name"
                loading="lazy"
                format="auto"
              ></nuxt-img>
            </div>
            <div class="text">{{ item.name }}</div>
          </a>
        </div>
        <p class="bottom">
          Though it measures the span and quality of an individual's life, it is
          not necessarily the final determinant in how long a life is to last
          for a given individual.
        </p>
      </div>
      <div class="ad_list">
        <google-ad :id="''" classNames="google_ad_lis"></google-ad>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ error, $apiList, params }) {
    try {
      let palmisType = await $apiList.test
        .getPalmistryMsg({
          id: params.id?.replace(
            /^.*?(\d*)$/,
            (str, match, index) => match || '0'
          ),
        })
        .then((res) => {
          return res
        })
      return {
        palmisType,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.palmistry_type {
  .google_palm_top {
    display: none;
  }
  &_main {
    width: 1400px;
    margin: 0 auto;
    padding: 48px 0;
    display: grid;
    grid-template-columns: 1fr 354px;
    gap: 0 102px;
    .content {
      .title {
        &_a {
          color: #fff;
          text-align: center;
          font-family: Cinzel Decorative;
          font-size: 36px;
          font-style: normal;
          font-weight: 700;
          line-height: 48px;
          margin-bottom: 8px;
        }
        &_b {
          color: rgba(255, 255, 255, 0.6);
          font-family: Rubik;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px;
        }
      }
      .palmis_item {
        padding: 24px 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        .list_a {
          display: block;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.08);
          transition: transform 0.3s ease-in-out;
          &:hover {
            transform: scale(1.01);
          }
          .imgs {
            height: 180px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .text {
            color: #fff;
            text-align: center;
            font-family: Rubik;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            padding: 8px;
          }
        }
      }
      .bottom {
        color: rgba(255, 255, 255, 0.6);
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
      }
    }
    .ad_list {
      .google_ad_lis {
        width: 300px;
        height: 625px;
        margin: 0 auto;
      }
    }
  }
}

@media (max-width: 1470px) {
  .palmistry_type {
    &_main {
      width: 100%;
      padding: 48px 30px;
      gap: 0 48px;
    }
  }
}
@media (max-width: 1000px) {
  .palmistry_type {
    &_main {
      width: 100%;
      grid-template-columns: 1fr;
      gap: 48px;
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .palmistry_type {
    .google_palm_top {
      display: flex;
      flex-direction: column;
      width: 336 * $pr;
      height: 297 * $pr;
      margin: 0 auto;
    }
    &_main {
      width: 100%;
      margin: 0 auto;
      padding: 16 * $pr 16 * $pr 32 * $pr;
      display: grid;
      grid-template-columns: 1fr;
      gap: 32 * $pr;
      .content {
        .title {
          &_a {
            font-size: 22 * $pr;
            line-height: 30 * $pr;
            margin-bottom: 8 * $pr;
          }
          &_b {
            font-size: 14 * $pr;
            line-height: 24 * $pr;
            text-align: center;
          }
        }
        .palmis_item {
          padding: 32 * $pr 0 0;
          grid-template-columns: repeat(2, 1fr);
          gap: 16 * $pr;
          .list_a {
            display: block;
            border-radius: 8 * $pr;
            .imgs {
              height: 100 * $pr;
            }
            .text {
              font-size: 14 * $pr;
              line-height: 18 * $pr;
              padding: 8 * $pr;
            }
          }
        }
        .bottom {
          display: none;
        }
      }
      .ad_list {
        .google_ad_lis {
          width: 336 * $pr;
          height: 297 * $pr;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
