<template>
  <div class="collapse_main">
    <div class="deployable">
      <div
        class="deployable_text1"
        :style="{ maxHeight: isOpen ? maxHeight : maxHeightTitle }"
      >
        <div
          class="deployable_text1_title"
          :class="`unfold_title${id}`"
          @click="toggleContent"
        >
          {{ title }}
          <i class="icon" :class="{ icon_active: isOpen }"></i>
        </div>
        <transition name="unfold">
          <div
            class="deployable_text1_content"
            :class="`unfold_content${id}`"
            v-if="isOpen"
          >
            <slot></slot>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'collapse',
  props: ['title', 'id'],
  data() {
    return {
      isOpen: false,
      maxHeight: 0,
      maxHeightTitle: 0,
    }
  },
  mounted() {
    this.$nextTick(() => {
      const topTitle = document.querySelector(`.unfold_title${this.id}`)
      this.maxHeightTitle = `${topTitle.scrollHeight}px`
    })
  },
  methods: {
    toggleContent() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.$nextTick(() => {
          const content = document.querySelector(`.unfold_content${this.id}`)
          const topTitle = document.querySelector(`.unfold_title${this.id}`)
          if (content) {
            this.maxHeight = `${content.scrollHeight + topTitle.scrollHeight}px`
          }
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.collapse_main {
  width: 100%;
  .deployable {
    padding: 0 48px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    &_text1 {
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
      &_title {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 30px;
        color: #ffffff;
        cursor: pointer;
        padding: 19px 15px 19px 0;
        position: relative;
        display: flex;
        align-items: center;
        .icon {
          width: 12px;
          height: 10px;
          display: inline-block;
          position: absolute;
          right: 0;
          background: url('~/assets/img/astrology/boult_icon.png') no-repeat;
          transform: rotate(180deg);
          transition: transform 0.3s ease;
        }
        .icon_active {
          transform: rotate(0deg);
        }
      }
      &_content {
        padding: 0 0 18px;
      }
    }
  }
}

@media (max-width: (750px)) {
  $pr: math.div(1vw, 3.75);
  .collapse_main {
    .deployable {
      padding: 0 24 * $pr;
      border-radius: 6 * $pr;
      &_text1 {
        overflow: hidden;
        transition: max-height 0.3s ease-in-out;
        &_title {
          font-size: 16 * $pr;
          line-height: 22 * $pr;
          padding: 19 * $pr 15 * $pr 19 * $pr 0;
        }
        &_content {
          padding: 0 0 18 * $pr;
        }
      }
    }
  }
}
</style>
