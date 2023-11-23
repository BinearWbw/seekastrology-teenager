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
              width="152"
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
            <p class="heading">
              {{ item.name }}
            </p>
            <p class="text" v-show="item.desc">
              {{ item.desc }}
            </p>
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
      <div class="recommend" v-else>
        <google-ad :id="'1626224357'" classNames="google_ad" />
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
  },
}
</script>

<style lang="scss" scoped>
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
          width: 152px;
          height: 101px;
          flex-shrink: 0;
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .link_i {
          padding: 16px 32px;
          display: grid;
          gap: 8px;
          .crux {
            color: #ffda8b;
          }
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
    }
  }
}
</style>
