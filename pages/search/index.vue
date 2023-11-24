<template>
  <div class="init_search">
    <google-ad :id="'1626224357'" classNames="google_ad_top" />
    <div class="init_search_main">
      <div class="search_title">
        <p class="title">
          Search Results: " <span>{{ searchName }}</span> "
        </p>
        <p class="tips" v-if="nums && count">
          About {{ count }} Results({{ nums }} Seconds)
        </p>
        <p class="tips" v-else>No Results</p>
      </div>

      <div class="result" v-if="searchData?.length >= 1">
        <a
          class="result_item"
          :href="item.url"
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
        <google-ad :id="'3000133706'" classNames="google_ad" />
      </div>
      <div class="recommend" v-else>
        <google-ad :id="'3000133706'" classNames="google_ad" />
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
      count: 0,
      current: 1,
    }
  },
  created() {
    this.getSearchData(1)
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
      const name = this.$route.query?.input
      this.searchName = this.$route.query?.input
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
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.init_search {
  .google_ad_top {
    width: 970px;
    height: 275px;
    margin: 24px auto 0;
  }
  &_main {
    width: 1400px;
    margin: 56px auto;
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
@media (max-width: 1050px) {
  .init_search {
    .google_ad_top {
      width: 100%;
      padding: 0 24px;
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .init_search {
    .google_ad_top {
      width: 300 * $pr;
      height: 67 * $pr;
      margin: 16 * $pr auto 0;
      padding: 0;
    }
    &_main {
      width: 100%;
      padding: 0 16 * $pr;
      margin: 16 * $pr auto 32 * $pr;
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
