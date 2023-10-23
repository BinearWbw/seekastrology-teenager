<template>
  <transition name="fade">
    <aside class="dialog" v-if="visible">
      <div class="dialog__mask" @click="closeVisibleMain"></div>
      <transition name="zoom" @leave="leave">
        <div class="dialog__main" v-if="visibleMain">
          <p class="title">Categories</p>
          <div class="list">
            <a
              class="item"
              :href="`/category/?from=${$route.name}`"
              :class="{ active: !info }"
              key="0"
            >
              <div class="item__left">
                <!-- <img src="~/assets/img/category/all.webp" alt="All Games" /> -->
              </div>
              <div class="item__right">
                <p class="p1">All Games</p>
                <p class="p2">{{ total }} Games</p>
              </div>
            </a>
            <category-classify
              :class="{ active: info && item.id === info.id }"
              v-for="item in category"
              :item="item"
              :key="item.id"
            ></category-classify>
          </div>
        </div>
      </transition>
    </aside>
  </transition>
</template>

<script>
export default {
  name: 'DialogCategory',
  props: ['visible', 'category', 'info'],
  data() {
    return {
      visibleMain: false,
    }
  },
  watch: {
    visible(val) {
      if (val) {
        let bodyStyle = document.body.style
        bodyStyle.overflow = 'hidden'
        this.$nextTick(() => {
          this.visibleMain = val
        })
      } else {
        let bodyStyle = document.body.style
        bodyStyle.overflow = ''
      }
    },
  },
  computed: {
    total() {
      let total = 0
      this.category.map((item) => {
        total += item.total
      })
      return total
    },
  },
  methods: {
    closeVisibleMain() {
      this.visibleMain = false
    },
    leave() {
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
$pr: math.div(1vw, 3.75);
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 7;
  &__mask {
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    z-index: 1;
  }
  &__main {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
    width: 100%;
    height: calc(100vh - 167 * $pr);
    border-radius: 16 * $pr 16 * $pr 0 0;
    background-color: #1f2128;
    padding: 24 * $pr 23 * $pr;
    overflow-x: hidden;
    overflow-y: auto;
    .title {
      font-size: 34 * $pr;
      line-height: 41 * $pr;
    }
    .list {
      display: grid;
      margin-top: 24 * $pr;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10 * $pr;
    }
    .item {
      overflow: hidden;
      appearance: none;
      backface-visibility: hidden;
      transform: translate(0, 0, 0);
      -webkit-appearance: none;
      -webkit-backface-visibility: hidden;
      -webkit-transform: translate3d(0, 0, 0);
      height: 60 * $pr;
      padding: 6 * $pr 0 6 * $pr 6 * $pr;
      border-radius: 12 * $pr;
      background-color: #282a31;
      display: flex;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      cursor: pointer;
      -webkit-transition: background-color 0.3s, -webkit-transform 0.3s;
      transition: background-color 0.3s, transform 0.3s;
      &__left {
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        width: 48 * $pr;
        border-radius: 8 * $pr;
        height: 100%;
        -webkit-transition: -webkit-transform 0.3s;
        transition: transform 0.3s;
        img {
          border-radius: 8 * $pr;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &__right {
        padding-left: 11 * $pr;
        padding-top: 11 * $pr;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        min-width: 0;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        .p1 {
          font-size: 10 * $pr;
          line-height: 13 * $pr;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .p2 {
          font-size: 10 * $pr;
          line-height: 13 * $pr;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #aaabbd;
          -webkit-transition: color 0.3s;
          transition: color 0.3s;
        }
      }
      &:hover {
        background-color: #7a78ff;
        -webkit-transform: scale(1.08);
        transform: scale(1.08);
        .item__left {
          -webkit-transform: scale(0.92) translate3d(0, 0, 0);
          transform: scale(0.92) translate3d(0, 0, 0);
          img {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
        }
        .item__right {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          .p2 {
            color: #fff;
          }
        }
      }
      &.active {
        background-color: #7a78ff;
        pointer-events: none;
        .item__right {
          .p2 {
            color: #fff;
          }
        }
      }
    }
  }
}
@-webkit-keyframes height_enter {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}
@keyframes height_enter {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}
@-webkit-keyframes height_leave {
  to {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}
@keyframes height_leave {
  to {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}
.zoom-enter-active {
  -webkit-animation: height_enter ease-out 0.3s;
  animation: height_enter ease-out 0.3s;
}
.zoom-leave-active {
  -webkit-animation: height_leave ease-out 0.3s;
  animation: height_leave ease-out 0.3s;
}
@media (min-width: 751px) {
  .dialog {
    display: none;
  }
}
</style>
