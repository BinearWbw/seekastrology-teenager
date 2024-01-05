<template>
  <div class="dropdown" ref="dropdown" tabindex="0" @blur="closeDropdown">
    <div class="selected" @click="toggleDropdown">
      <div class="selected_current">
        <div class="current_item">
          <!-- <span v-if="!selectedOption">{{ title || 'Sign' }}</span> -->
          <div class="title_img" v-if="!selectedOption">
            <img
              src="~/assets/img/resources/boy.svg"
              alt="boy"
              v-if="title == 'First Sign'"
            />
            <img
              src="~/assets/img/resources/girl.svg"
              alt="girl"
              v-if="title == 'Second Sign'"
            />
          </div>
          <i class="icons" v-if="!selectedOption"></i>
          <transition name="fade">
            <img
              :src="selectedOption.imgUrl"
              :alt="titleName"
              v-if="selectedOption"
            />
          </transition>
        </div>
      </div>
      <div class="selected_title">{{ titleName }}</div>
    </div>
    <transition name="unfold">
      <ul class="options" v-show="isOpen" ref="absoluteElement">
        <li
          class="left_tab_list"
          v-for="(item, index) in options"
          :key="index"
          :class="{ activated: selectedOption.name == item.name }"
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
  props: ['options', 'pint', 'title'],
  data() {
    return {
      isOpen: false,
      selectedOption: '',
      titleName: '',
    }
  },
  watch: {
    // 监听点击的id值
    pint(value) {
      this.selectedOption = this.options[value - 1]
    },
  },
  mounted() {
    this.pint ? (this.selectedOption = this.options[this.pint - 1]) : false
    if (this.title) {
      this.titleName =
        this.title == 'First Sign'
          ? 'Your Sign'
          : this.title == 'Second Sign'
          ? "Partner's Sign"
          : ''
    }
    this.checkElementPosition()
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
    checkElementPosition() {
      const element = this.$refs.absoluteElement
      const inWidth = window.innerWidth
      if (inWidth < 751 && this.title == 'First Sign') {
        element.style.left = 0
      }
      if (inWidth < 751 && this.title == 'Second Sign') {
        element.style.left = '-100%'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.dropdown {
  position: relative;
  .selected {
    cursor: pointer;
    position: relative;
    &_current {
      width: 115px;
      height: 115px;
      border-radius: 50%;
      border: 1px dashed rgba(255, 255, 255, 0.4);
      padding: 10px;
      .current_item {
        width: 100%;
        height: 100%;
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.26);
        position: relative;
        > img {
          width: 152%;
          height: 152%;
          object-fit: cover;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .title_img {
          background-color: #fff;
          border-radius: 50%;
          height: 100%;
          overflow: hidden;
          background-color: rgba(110, 92, 143, 0.4);
          z-index: -1;
          img {
            width: 80%;
            height: 80%;
            object-fit: cover;
            position: relative;
            left: 10%;
            top: 10%;
          }
        }
        span {
          color: rgba(255, 255, 255, 0.3);
          text-align: center;
          font-family: 'Rubik';
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .icons {
          display: inline-block;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 15px;
          height: 15px;
          background: url('../../assets/img/home/group.svg') no-repeat center;
        }
      }
    }
    &_title {
      width: 100%;
      position: absolute;
      left: 50%;
      top: -20px;
      transform: translateX(-50%);
      color: #fff;
      text-align: center;
      font-family: 'Rubik';
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
    }
  }
  .options {
    position: absolute;
    width: 250px;
    top: 120px;
    left: -60px;
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
    .selected {
      cursor: pointer;
      position: relative;
      &_current {
        width: 115 * $pr;
        height: 115 * $pr;
        border-radius: 50%;
        border: 1 * $pr dashed rgba(255, 255, 255, 0.4);
        padding: 10 * $pr;
        .current_item {
          border: 1 * $pr solid rgba(255, 255, 255, 0.4);
          span {
            font-size: 16 * $pr;
            line-height: 22 * $pr;
          }
          .icons {
            width: 15 * $pr;
            height: 15 * $pr;
          }
        }
      }
      &_title {
        top: -20 * $pr;
        font-size: 14 * $pr;
        line-height: 18 * $pr;
      }
    }
    .options {
      width: 250 * $pr;
      top: 74 * $pr;
      border-radius: 20 * $pr;
      padding: 12 * $pr 0;
      border: 1 * $pr solid #fff;
      z-index: 99;
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
