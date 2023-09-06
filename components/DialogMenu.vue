<template>
  <transition name="fade">
    <aside class="dialog" v-if="visible" @click="close">
      <div class="dialog__main">
        <div class="dialog__main__top">
          <button class="close common__btn" @click="close"></button>
        </div>
        <div class="menu">
          <a
            class="href"
            :href="`${item.href}`"
            :class="{
              active:
                item.path == $route.path ||
                (item.path !== '/' && $route.path.includes(item.path)),
            }"
            v-for="(item, index) in menu"
            :key="index"
          >
            <div class="name">{{ item.title }}</div>
          </a>
        </div>
      </div>
    </aside>
  </transition>
</template>

<script>
export default {
  name: 'DialogMenu',
  props: ['menu', 'visible'],
  data() {
    return {
      searchInput: '',
    }
  },
  watch: {
    visible(val) {
      if (val) {
        let bodyStyle = document.body.style
        bodyStyle.overflow = 'hidden'
      } else {
        let bodyStyle = document.body.style
        bodyStyle.overflow = ''
      }
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 7;
  background: rgba(0, 0, 0, 0.75);
  &__main {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    &__top {
      width: 100%;
      height: 90px;
      display: flex;
      background-color: #000;
      padding: 0 30px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: end;
      -webkit-justify-content: flex-end;
      -ms-flex-pack: end;
      justify-content: flex-end;
      .close {
        width: 27px;
        height: 27px;
        background: url('~assets/img/header/close.png') no-repeat center center;
        background-size: contain;
      }
    }
    .menu {
      width: 100%;
      overflow: hidden;
      background-color: #000;
      padding: 0 0 30px;
      .href {
        width: 100%;
        height: 42px;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        justify-content: center;
        position: relative;
        &::after {
          position: absolute;
          content: '';
          left: 0;
          bottom: 0;
          height: 1px;
          width: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50.52%,
            rgba(255, 255, 255, 0) 100%
          );
        }
        .name {
          font-family: 'Cinzel Decorative';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
          color: #ffffff;
          -webkit-transition: color 0.3s;
          transition: color 0.3s;
        }
        &:hover {
          .name {
            color: #fff;
          }
        }
        &.active {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50.52%,
            rgba(255, 255, 255, 0) 100%
          );
          .name {
            color: #fff;
          }
        }
      }
    }
    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .dialog {
    &__main {
      &__top {
        height: 60 * $pr;
        .close {
          width: 20 * $pr;
          height: 20 * $pr;
        }
      }
      .menu {
        .href {
          height: 42 * $pr;
          .name {
            margin-top: 2 * $pr;
            font-size: 14 * $pr;
            line-height: 1;
          }
        }
      }
    }
  }
}
</style>
