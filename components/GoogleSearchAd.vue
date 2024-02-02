<template>
  <div class="google_search">
    <div id="relatedsearches1" style="height: auto"></div>
  </div>
</template>

<script>
export default {
  props: {
    querys: String,
  },
  data() {
    return {
      siteBaseUrl: 'https://www.seekastrology.com',
    }
  },
  mounted() {
    this.getLoadRelatedSearches()
    console.log('querys', this.querys)
  },
  methods: {
    // 获取google搜索广告内容
    getLoadRelatedSearches() {
      // 替换代码中的搜索参数值和当前站点地址
      const pageOptions = {
        pubId: 'partner-pub-6430486603399192',
        query: this.querys, // 传入内容广告关键词
        styleId: '3570937035',
        adsafe: 'medium',
        relatedSearchTargeting: 'content',
        resultsPageBaseUrl: `${this.siteBaseUrl}/search/?afs&partner_param=param`,
        resultsPageQueryParam: 'query',
      }
      const rsblock1 = {
        container: 'relatedsearches1',
        relatedSearches: window.innerWidth > 750 ? 10 : 6,
      }
      // 引入并执行外部脚本
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.charset = 'utf-8'
      script.innerHTML = `
          var pageOptions = ${JSON.stringify(pageOptions)};
          var rsblock1 = ${JSON.stringify(rsblock1)};
          _googCsa('relatedsearch', pageOptions, rsblock1);
        `
      document.body.appendChild(script)
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.google_search {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.08);
  margin: 24px auto;
  border-radius: 16px;
  padding: 16px;
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .google_search {
    margin: 24 * $pr 0;
    border-radius: 16 * $pr;
    padding: 8 * $pr;
  }
}
</style>
