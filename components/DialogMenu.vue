<template>
  <transition name="fade">
    <aside class="dialog" v-if="visible">
      <div class="dialog__main">
        <div class="dialog__main__top">
          <button class="close common__btn" @click="close"></button>
        </div>
        <div class="menu">
          <div class="href" v-for="(item, index) in menu" :key="index">
            <a
              :href="`${item.href}`"
              :class="{
                active: item.path == $route.path,
              }"
              v-if="!item.children"
            >
              <div class="name">{{ item.title }}</div>
            </a>
            <div v-else class="unfold">
              <div
                class="tab_name"
                :class="{
                  active: verificationChild(item.children),
                }"
                @click="isOpened(index)"
              >
                {{ item.title }}
                <i
                  class="icon"
                  :class="{
                    icon_active: isOpen === index,
                  }"
                ></i>
              </div>
              <transition name="unfold">
                <div class="unfold_a" v-if="isOpen === index">
                  <a
                    class="path_item"
                    v-for="(item_i, index_i) in item.children"
                    :key="index_i"
                    :href="`${item_i.href}`"
                    :class="{
                      active: setStatusUrl(item_i.path),
                    }"
                  >
                    {{ item_i.title }}
                  </a>
                </div>
              </transition>
            </div>
          </div>
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
      isOpen: null,
      statusUrl: false,
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
    isOpened(index) {
      if (this.isOpen === index) {
        this.isOpen = null
      } else {
        this.isOpen = index
      }
    },
    setStatusUrl(item) {
      return item == this.$route.path
    },
    //验证子级的路由
    verificationChild(items) {
      if (items) {
        return items.some((it) => this.$route.path.includes(it.path))
      }
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
        > a {
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
            .name {
              color: #9747ff;
            }
          }
        }
        .unfold {
          width: 100%;
          min-height: 42px;
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
          .tab_name {
            width: 100%;
            height: 42px;
            cursor: pointer;
            text-align: center;
            position: relative;
            display: flex;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            justify-content: center;
            font-family: 'Cinzel Decorative';
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #ffffff;
            -webkit-transition: color 0.3s;
            transition: color 0.3s;
            &:hover {
              .name {
                color: #fff;
              }
            }
            &.active {
              color: #9747ff;
            }
            .icon {
              width: 12px;
              height: 10px;
              display: inline-block;
              position: absolute;
              right: 40px;
              background: url('~/assets/img/login/down_arrow.svg') no-repeat;
              background-size: cover;
              transform: rotate(0);
              transition: transform 0.3s ease;
            }
            .icon_active {
              transform: rotate(180deg);
            }
          }

          .unfold_a {
            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.08) 0%,
                rgba(255, 255, 255, 0.08) 100%
              ),
              #000;
            .path_item {
              display: block;
              width: 100%;
              text-align: center;
              padding: 10px 20px;
              border-radius: 6px;
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 28px;
              color: #fff;
              position: relative;
              &.active {
                color: #9747ff;
              }
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
              &:last-child {
                &::after {
                  display: none;
                }
              }
            }
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
        width: 100%;
        height: 90 * $pr;
        padding: 0 30 * $pr;
        .close {
          width: 20 * $pr;
          height: 20 * $pr;
        }
      }
      .menu {
        width: 100%;
        padding: 0 0 30 * $pr;
        .href {
          > a {
            width: 100%;
            height: 42 * $pr;
            &::after {
              height: 1 * $pr;
            }
            .name {
              font-size: 16 * $pr;
              line-height: 22 * $pr;
            }
          }
          .unfold {
            min-height: 42 * $pr;
            &::after {
              height: 1 * $pr;
            }
            .tab_name {
              height: 42 * $pr;
              font-size: 16 * $pr;
              line-height: 22 * $pr;
              .icon {
                width: 12 * $pr;
                height: 10 * $pr;
                right: 26 * $pr;
              }
            }

            .unfold_a {
              .path_item {
                padding: 10 * $pr 20 * $pr;
                font-size: 16 * $pr;
                line-height: 22 * $pr;
              }
            }
          }
        }
      }
    }
  }
}
</style>
