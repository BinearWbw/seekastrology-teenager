<template>
  <div class="integrated">
    <!-- 资讯/视频/测验-整合组件 -->
    <home-tabs :tabs="horroData" @click-selected="handleTabSelected">
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
    </home-tabs>
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
      this.selectedTabIndex = index
    },
  },
}
</script>

<style lang="scss" scoped>
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
}
</style>
