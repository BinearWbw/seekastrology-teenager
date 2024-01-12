<template>
  <div class="integrated">
    <!-- 资讯/视频/测验-整合组件 -->
    <!-- <home-tabs :tabs="horroData" @click-selected="handleTabSelected">
      <template>
        <home-infor-module
          v-if="selectedTabIndex === 0"
          title="Article"
          :inforData="articleData"
        ></home-infor-module>
        <home-infor-module
          v-if="selectedTabIndex === 1"
          title="Video"
          :inforData="videoData"
        ></home-infor-module>
        <home-infor-module
          v-if="selectedTabIndex === 2"
          title="Quiz"
          :inforData="quizData"
        ></home-infor-module>
      </template>
    </home-tabs> -->
    <div class="tabs_btn">
      <button
        :class="['tab-item', { active: selectedTabIndex === index }]"
        v-for="(i, index) in horroData"
        :key="index"
        @click="handleTabSelected(index)"
      >
        {{ i.tabs }}
      </button>
    </div>
    <client-only>
      <a-carousel
        autoplay
        :dots="false"
        ref="carousTab"
        :afterChange="tabsPanelCallback"
      >
        <home-infor-module
          title="Article"
          :inforData="articleData"
        ></home-infor-module>
        <home-infor-module
          title="Video"
          :inforData="videoData"
        ></home-infor-module>
        <home-infor-module
          title="Quiz"
          :inforData="quizData"
        ></home-infor-module>
      </a-carousel>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      horroData: [
        {
          tabs: 'Article',
        },
        {
          tabs: 'Video',
        },
        {
          tabs: 'Quiz',
        },
      ],
      selectedTabIndex: 0,
      articleData: [],
      videoData: [],
      quizData: [],
    }
  },
  async fetch() {
    let [articleData, videoData, quizData] = await Promise.all([
      this.$apiList.articles
        .getNewsList({
          origin: process.env.origin,
          page: 1,
          size: 3,
          kind: 1,
        })
        .then((res) => {
          return res.list || []
        }),
      this.$apiList.articles
        .getNewsList({
          origin: process.env.origin,
          page: 1,
          size: 3,
          kind: 2,
        })
        .then((res) => {
          return res.list || []
        }),

      this.$apiList.test
        .getTestList({
          origin: process.env.origin,
          page: 18,
          size: 3,
        })
        .then((res) => {
          return res.list || []
        }),
    ])
    this.articleData = articleData
    this.videoData = videoData
    this.quizData = quizData
  },
  methods: {
    handleTabSelected(index) {
      //   this.selectedTabIndex = index
      const carouselDom = this.$refs.carousTab
      carouselDom.goTo(index)
    },
    tabsPanelCallback(to) {
      this.selectedTabIndex = to
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.integrated {
  width: 100%;
  :deep(.tab-header_main) {
    justify-content: center;
  }
  :deep(.infors_main) {
    width: 100%;
    .title {
      display: none;
    }
  }
  .tabs_btn {
    width: 100%;
    display: flex;
    overflow-x: auto;
    justify-content: center;
    white-space: nowrap;
    padding-bottom: 15px;
    position: relative;
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
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .integrated {
    width: 343 * $pr;

    .tabs_btn {
      width: 343 * $pr;
      padding-bottom: 15 * $pr;
      .tab-item {
        padding: 7 * $pr 22 * $pr;
        font-size: 14 * $pr;
        line-height: 18 * $pr;
        border-radius: 42 * $pr;
        margin-right: 24 * $pr;
      }
      & > :last-child {
        margin-right: 0;
      }
      &::after {
        width: 100%;
        height: 1 * $pr;
      }
    }
  }
}
</style>
