<template>
  <div class="init_search">
    <div class="init_search_main">
      <div class="search_title">
        <p class="title">
          Search Results: " <span>{{ searchName }}</span> "
        </p>
        <p class="tips" v-if="nums && count">
          About {{ count }} Results({{ nums }} Seconds)
        </p>
        <p class="tips" v-if="count == 0">No Results</p>
      </div>
      <div class="google_search">
        <div id="afscontainer1" style="height: auto"></div>
      </div>
      <div class="result" v-if="searchData?.length >= 1">
        <a
          class="result_item"
          :href="judgmentPath(item)"
          v-for="(item, index) in searchData"
          :key="index"
        >
          <div class="img_i" v-if="item.icon">
            <nuxt-img
              :src="item?.icon"
              fit="cover"
              height="101"
              :alt="item.name"
              loading="lazy"
              format="auto"
            ></nuxt-img>
          </div>
          <div class="link_i">
            <p class="grey">
              {{ item.url }}
            </p>
            <div class="heading" v-html="highlightKeyword(item.name)"></div>
            <div
              class="text"
              v-show="item.desc"
              v-html="highlightKeyword(item.desc)"
            ></div>
            <p class="grey" v-show="item.created_at">
              {{ $utils.formatSearch(item.created_at) }}
            </p>
          </div>
        </a>
        <div class="pagination">
          <a-pagination
            v-model="current"
            :total="count"
            show-less-items
            @change="getPagination"
          />
        </div>
      </div>
      <div class="recommend" v-if="searchData?.length == 0">
        <el-explore-more />
      </div>
    </div>
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchName: '',
      searchData: [],
      nums: null,
      isLoading: false,
      count: -1,
      current: 1,
    }
  },
  created() {
    this.getSearchData(1)
  },
  mounted() {
    this.getLoadAds()
  },
  methods: {
    getPagination(page) {
      this.getSearchData(page)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    getSearchData(page) {
      const name = this.$route.query?.query
      this.searchName = this.$route.query?.query
      const start = new Date().getTime()
      this.isLoading = true
      this.$apiList.home
        .getSearchData({
          name,
          page,
          size: 10,
        })
        .then((res) => {
          this.count = res.count
          this.searchData = res.list
          this.isLoading = false
          const end = new Date().getTime()
          this.nums = (end - start) / 1000
        })
    },
    highlightKeyword(text) {
      const pattern = new RegExp(`\\b(${this.searchName})\\b`, 'gi')
      return text.replace(
        pattern,
        (match) => `<span class="crux">${match}</span>`
      )
    },

    // 判断路径
    judgmentPath(item) {
      switch (item.type) {
        case 0:
          return item.url
        case 1:
          return `/resources/details/${item.name
            .replace(/[^a-zA-Z0-9\\s]/g, '-')
            .toLowerCase()}-${item.id}/`
        case 2:
          return `/test/details/${item.name
            .replace(/[^a-zA-Z0-9\\s]/g, '-')
            .toLowerCase()}-${item.id}/`
        case 3:
          return `/tarot/details/${item.name
            .replace(/[^a-zA-Z0-9\\s]/g, '-')
            .toLowerCase()}-${item.id}/`
        default:
          return null
      }
    },
    // google搜索页代码
    getLoadAds() {
      // 替换代码中的查询参数值
      const pageOptions = {
        pubId: 'partner-pub-6430486603399192',
        query: this.$route.query?.query,
        styleId: '3570937035',
        adsafe: 'medium',
      }

      const adblock1 = {
        container: 'afscontainer1',
        number: 2,
      }

      // 引入并执行外部脚本
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.charset = 'utf-8'
      script.innerHTML = `
        var pageOptions = ${JSON.stringify(pageOptions)};
        var adblock1 = ${JSON.stringify(adblock1)};
        _googCsa('ads', pageOptions, adblock1);
      `
      document.body.appendChild(script)
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.init_search {
  &_main {
    width: 1400px;
    margin: 56px auto;
    .google_search {
      width: 100%;
      background-color: rgba(255, 255, 255, 0.08);
      margin: 24px 0;
      border-radius: 16px;
      padding: 16px;
    }
    .search_title {
      .title {
        color: #fff;
        font-family: Rubik;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
        > span {
          color: #ffda8b;
        }
      }
      .tips {
        color: rgba(255, 255, 255, 0.6);
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        margin-top: 8px;
      }
    }
    .recommend {
      width: 100%;
      margin-top: 56px;
      .google_ad {
        display: none;
      }
    }
    .result {
      margin-top: 16px;
      &_item {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 16px;
        margin-bottom: 16px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.08);
        .img_i {
          flex-shrink: 0;
          > img {
            max-width: 152px;
            max-height: 101px;
            object-fit: cover;
          }
        }
        .link_i {
          padding: 16px 32px;
          display: grid;
          gap: 8px;

          .grey {
            color: rgba(255, 255, 255, 0.6);
            font-family: Rubik;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
          }
          .heading {
            color: #fff;
            font-family: Rubik;
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: 30px;
            :deep(.crux) {
              color: #ffda8b !important;
            }
          }
          .text {
            max-width: 700px;
            color: #fff;
            font-family: Rubik;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            :deep(h1),
            :deep(h2),
            :deep(h3),
            :deep(h4),
            :deep(p) {
              color: #fff;
            }
            :deep(.crux) {
              color: #ffda8b !important;
            }
          }
        }
      }
      .pagination {
        width: 100%;
        display: flex;
        justify-content: center;
        :deep(.ant-pagination-item) {
          width: 38px !important;
          height: 38px;
          border-radius: 50%;
          background: rgb(0, 0, 0, 0.1);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
          > a {
            display: block;
            color: #fff;
            text-align: center;
            font-family: Rubik;
            font-size: 16px;
            line-height: 38px;
            font-style: normal;
            font-weight: 400;
            height: 100%;
          }
        }
        :deep(.ant-pagination-item-active) {
          background: #9747ff;
          border: none;
        }
        :deep(.ant-pagination-prev),
        :deep(.ant-pagination-next) {
          display: none;
        }
        :deep(.ant-pagination-item-ellipsis) {
          color: #fff;
        }
      }
      .google_ad {
        display: none;
      }
    }
  }
}

@media (max-width: 1500px) {
  .init_search {
    &_main {
      width: 100%;
      padding: 0 50px;
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .init_search {
    &_main {
      width: 100%;
      padding: 0 16 * $pr;
      margin: 70 * $pr auto 32 * $pr;
      .google_search {
        margin: 24 * $pr 0;
        border-radius: 16 * $pr;
        padding: 8 * $pr;
      }
      .search_title {
        .title {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
        }
        .tips {
          font-size: 16 * $pr;
          line-height: 22 * $pr;
          margin-top: 8 * $pr;
        }
      }
      .recommend {
        width: 100%;
        margin-top: 24 * $pr;
        .google_ad {
          display: flex;
          flex-direction: column;
          width: 336 * $pr;
          height: 297 * $pr;
          margin: 0 auto 24 * $pr;
        }
      }
      .result {
        margin-top: 16 * $pr;
        &_item {
          width: 100%;
          display: flex;
          align-items: inherit;
          padding: 8 * $pr;
          margin-bottom: 16 * $pr;
          border-radius: 8 * $pr;
          .img_i {
            flex-shrink: 0;
            > img {
              max-width: 72 * $pr;
              max-height: auto;
              object-fit: cover;
            }
          }
          .link_i {
            padding: 8 * $pr;
            gap: 8 * $pr;
            .crux {
              color: #ffda8b;
            }
            .grey {
              max-width: 250 * $pr;
              font-size: 12 * $pr;
              line-height: 16 * $pr;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .heading {
              font-size: 18 * $pr;
              line-height: 24 * $pr;
            }
            .text {
              max-width: auto;
              font-size: 12 * $pr;
              font-style: normal;
              font-weight: 400;
              line-height: 16 * $pr;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              white-space: inherit;
            }
          }
        }
        .pagination {
          :deep(.ant-pagination-item) {
            width: 38 * $pr !important;
            height: 38 * $pr;
            border-radius: 50%;
            border: 1 * $pr solid rgba(255, 255, 255, 0.3);
            > a {
              font-family: Rubik;
              font-size: 16 * $pr;
              line-height: 38 * $pr;
            }
          }
          :deep(.ant-pagination-item-active) {
            background: #9747ff;
            border: none;
          }
          :deep(.ant-pagination-prev),
          :deep(.ant-pagination-next) {
            display: none;
          }
          :deep(.ant-pagination-item-ellipsis) {
            color: #fff;
          }
        }
        .google_ad {
          display: flex;
          flex-direction: column;
          width: 336 * $pr;
          height: 297 * $pr;
          margin: 16 * $pr auto;
        }
      }
    }
  }
}
</style>
