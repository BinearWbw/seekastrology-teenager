<template>
  <div class="dropdown" ref="dropdown" tabindex="0" @blur="closeDropdown">
    <div class="selected" @click="toggleDropdown">
      <div class="selected_main">
        <div class="select_img">
          <img :src="selectedOption?.imgUrl" alt="#" />
        </div>
        <p class="select_text">{{ selectedOption?.name }}</p>
        <i class="select_icon" :class="{ rotate: isOpen }"></i>
      </div>
    </div>
    <transition name="fade">
      <ul class="options" v-show="isOpen">
        <li
          class="left_tab_list"
          id="SELECTEDONE"
          v-for="(item, index) in options"
          :key="index"
          :class="{ activated: selectedOption?.name == item.name }"
          @click="selectOption(item)"
        >
          <p class="active">{{ item.name }}</p>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['options', 'pint'],
  data() {
    return {
      isOpen: false,
      selectedOption: this.options[this.pint - 1],
    }
  },
  watch: {
    // 监听点击的id值
    pint(value) {
      this.$nextTick(() => {
        this.selectedOption = this.options[value - 1]
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.pint ? (this.selectedOption = this.options[this.pint - 1]) : false
    })
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.$emit('change', option)
      this.selectedOption = option
      this.isOpen = false
    },
    closeDropdown() {
      // 失焦时隐藏
      this.isOpen = false
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 34px;
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
    overflow: hidden;
    z-index: 10;
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

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .dropdown {
    border: 1 * $pr solid #ccc;
    border-radius: 34 * $pr;
    .selected {
      height: 60 * $pr;
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
      top: 74 * $pr;
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
</style>
