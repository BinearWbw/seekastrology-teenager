<template>
  <div class="tabs">
    <div class="tab-header">
      <div class="tab-header_main">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :class="['tab-item', { active: activeTab === index }]"
          @click="selectTab(index)"
        >
          {{ tab.tabs }}
        </div>
      </div>
    </div>
    <div class="tab-content">
      <slot :activeTab="activeTab"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tabs'],
  data() {
    return {
      activeTab: 0,
      isOpenScroll: false,
    }
  },
  methods: {
    selectTab(index) {
      this.activeTab = index
      this.$emit('click-selected', index)
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.tabs {
  width: 100%;
  .tab-header {
    width: 100%;
    position: relative;
    &_main {
      width: 100%;
      display: flex;
      overflow-x: auto;
      white-space: nowrap;
      padding-bottom: 15px;
      .tab-item {
        flex: 0 0 auto;
        padding: 7px 22px;
        text-align: center;
        font-family: 'Rubik';
        font-size: 14px;
        line-height: 18px;
        color: rgba(255, 255, 255, 0.6);
        border-radius: 42px;
        margin-right: 24px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
      & > :last-child {
        margin-right: 0;
      }
      .tab-item.active {
        background-color: #fff;
        color: #000;
        font-family: Cinzel Decorative;
      }
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
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
  .tab-content {
    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
    &.active_tab {
      animation: fade-in 0.3s ease-in-out;
    }
  }
}

@media (max-width: 1000px) {
  .tabs {
    .tab-header {
      &_main {
        .tab-item {
          margin-right: 0;
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .tabs {
    width: 100%;
    .tab-header {
      position: relative;
      @keyframes arrow-animation {
        0% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(20 * $pr);
        }
        100% {
          transform: translateX(0);
        }
      }
      &_main {
        padding-bottom: 15 * $pr;
        display: flex;
        justify-content: center;
        .tab-item {
          position: relative;
          padding: 7 * $pr 22 * $pr;
          font-size: 14 * $pr;
          line-height: 18 * $pr;
          border-radius: 42 * $pr;
          margin-right: 24 * $pr;
        }
        & > :last-child {
          margin-right: 0;
        }
        .tab-item.active {
          background-color: #fff;
          color: #000;
        }
      }
      &::after {
        width: 100%;
        height: 1 * $pr;
      }
    }
  }
}
</style>
