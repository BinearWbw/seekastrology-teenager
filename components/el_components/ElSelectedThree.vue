<template>
  <div class="select">
    <div class="select_main" tabindex="0" @blur="closeDropdown">
      <div class="selector_content" @click="toggleDropdown">
        <div class="selector" v-if="!selectedOption">Select Your Sign</div>
        <div class="selected" v-if="selectedOption">
          <div class="selected_main">
            <div class="select_img">
              <img :src="selectedOption?.imgUrl" :alt="selectedOption?.name" />
            </div>
            <p class="select_text">{{ selectedOption?.name }}</p>
            <i class="select_icon" :class="{ rotate: isOpen }"></i>
          </div>
        </div>
        <transition name="unfold">
          <ul class="options" v-show="isOpen">
            <li
              class="left_tab_list"
              id="SELECTEDONE"
              v-for="(item, index) in options"
              :key="index"
              :class="{ activated: selectedOption?.name == item.name }"
              @click.stop="selectOption(item)"
            >
              <p class="active">{{ item.name }}</p>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options'],
  data() {
    return {
      isOpen: false,
      selectedOption: '',
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.$emit('changeSign', option)
      this.selectedOption = option
      this.isOpen = false
    },
    closeDropdown() {
      this.isOpen = false
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.select {
  &_main {
    .selector_content {
      width: 338px;
      position: relative;
      border-radius: 34px;
      border: 1px solid rgba(255, 255, 255, 0.6);
      .selector {
        padding: 15px 0;
        text-align: center;
        opacity: 0.7;
        border-radius: 34px;
        color: #fff;
        font-family: 'Rubik';
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
        cursor: pointer;
        transition: opacity 0.3s, background-color 0.3s ease-out;
        &:hover {
          opacity: 1;
          background-color: #fff;
          color: #000;
        }
      }
      .selected {
        height: 60px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &_main {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          padding-right: 27px;
          .select_img {
            width: 86px;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              filter: grayscale(100%);
            }
          }
          .select_text {
            font-family: 'Rubik';
            font-size: 22px;
            line-height: 30px;
            color: #ffffff;
          }
          .select_icon {
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-left: auto;
            background: url('~/assets/img/astrology/boult_icon.png') no-repeat
              center;
            transform: rotate(180deg);
            transition: transform 0.3s ease;
          }
          .rotate {
            transform: rotate(0deg);
          }
        }
      }
      .options {
        position: absolute;
        width: 100%;
        top: 68px;
        left: 0;
        padding: 12px 0;
        border-radius: 17px;
        background-color: rgba(18, 7, 36, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.2);
        .left_tab_list {
          width: 100%;
          padding: 6px 0 6px 24px;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: background-color 0.3s;
          .active {
            flex: 1;
            font-family: 'Rubik';
            color: rgba(255, 255, 255, 0.6);
            font-size: 16px;
            line-height: 22px;
            font-style: normal;
            font-weight: 400;
          }
          &:hover {
            background-color: rgba(123, 136, 205, 0.1);
            img {
              filter: grayscale(0);
            }
          }
        }
        .activated {
          background-color: rgba(123, 136, 205, 0.1);
          .active {
            color: #fff;
          }
        }
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .select {
    &_main {
      .selector_content {
        width: 277 * $pr;
        border-radius: 26 * $pr;
        border: 1 * $pr solid rgba(255, 255, 255, 0.6);
        .selector {
          padding: 11 * $pr 0;
          border-radius: 26 * $pr;
          font-size: 16 * $pr;
          line-height: 30 * $pr;
        }
        .selected {
          height: 52 * $pr;
          &_main {
            padding-right: 27 * $pr;
            .select_img {
              width: 86 * $pr;
            }
            .select_text {
              font-size: 22 * $pr;
              line-height: 30 * $pr;
            }
            .select_icon {
              width: 10 * $pr;
              height: 10 * $pr;
            }
          }
        }
        .options {
          top: 62 * $pr;
          border-radius: 20 * $pr;
          border: 1 * $pr solid #fff;
          padding: 12 * $pr 0;
          .left_tab_list {
            padding: 6 * $pr 0 6 * $pr 24 * $pr;
            .active {
              font-size: 16 * $pr;
              line-height: 22 * $pr;
            }
          }
        }
      }
    }
  }
}
</style>
