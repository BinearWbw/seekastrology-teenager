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
          <div class="imgs">
            <img :src="item.imgUrl" alt="#" />
          </div>
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
    top: 76px;
    left: 0;
    border-radius: 34px;
    background-color: #060506;
    border: 1px solid #fff;
    overflow: hidden;
    z-index: 10;
    .left_tab_list {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: background-color 0.3s;
      .imgs {
        width: 86px;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%);
        }
      }
      .active {
        flex: 1;
        font-family: 'Rubik';
        font-size: 22px;
        line-height: 30px;
        color: #acaaaa;
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
      border-radius: 34 * $pr;
      border: 1 * $pr solid #fff;
      .left_tab_list {
        height: 60 * $pr;
        .imgs {
          width: 86 * $pr;
        }
        .active {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
        }
      }
    }
  }
}
</style>
