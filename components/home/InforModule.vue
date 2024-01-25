<template>
  <div class="infors">
    <div class="infors_main">
      <div class="title">{{ title }}</div>
      <div class="itemize">
        <a
          class="itemize_a"
          :href="`${getRouteLink}${item.name
            .trim()
            .replace(/[^\w\d]/g, '-')
            .toLowerCase()}-${item.id}/${getCurrentRoute}`"
          v-for="(item, index) in inforData"
          :key="index"
        >
          <div class="item">
            <div class="imgs">
              <nuxt-img
                :src="item.icon || '/'"
                fit="cover"
                width="123"
                height="82"
                :alt="item.name"
                loading="lazy"
                format="auto"
              ></nuxt-img>
              <i class="icon" v-if="item.kind"></i>
              <i class="icon_i"></i>
            </div>
            <div class="textitem">
              <div class="text" v-if="title !== 'Quiz'">
                {{ item.text || item.name }}
              </div>
              <div class="text" v-else v-html="item.desc"></div>
              <span class="more">Read More</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['inforData', 'title'],
  data() {
    return {}
  },
  computed: {
    getRouteLink() {
      return this.title == 'Quiz' ? '/test/details/' : '/resources/details/'
    },
    getCurrentRoute() {
      return this.$route.path === '/' ? '?from=home' : ''
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.infors {
  &_main {
    width: 456px;
    .title {
      width: 100%;
      color: #fff;
      text-align: center;
      font-family: Cinzel Decorative;
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: 30px;
      padding-bottom: 16px;
      position: relative;
      &::before {
        content: '';
        display: block;
        position: absolute;
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
    .itemize {
      display: grid;
      gap: 16px;
      padding-top: 16px;
      &_a {
        display: block;
        border-radius: 8px;
        &:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        .item {
          display: flex;
          .imgs {
            width: 123px;
            height: 82px;
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .icon_i {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
            }
            .icon {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              display: block;
              width: 30px;
              height: 30px;
              background: url('~/assets/img/resources/play_icon.png') no-repeat;
              background-size: cover;
            }
          }
          .textitem {
            flex: 1;
            font-family: Rubik;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            padding: 4px 16px;
            .text {
              color: #fff;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              margin-bottom: 8px;
            }
            .more {
              color: #9747ff;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);

  .infors {
    &_main {
      width: 100%;
      .title {
        display: none;
      }
      .itemize {
        display: grid;
        gap: 16 * $pr;
        padding-top: 16 * $pr;
        &_a {
          display: block;
          .item {
            display: flex;
            .imgs {
              width: 123 * $pr;
              height: 82 * $pr;
              border-radius: 8 * $pr;
              .icon {
                width: 30 * $pr;
                height: 30 * $pr;
              }
            }
            .textitem {
              font-size: 16 * $pr;
              line-height: 22 * $pr;
              padding: 4 * $pr 16 * $pr;
              .text {
                margin-bottom: 8 * $pr;
              }
            }
          }
        }
      }
    }
  }
}
</style>
