<template>
  <div class="test">
    <div class="test_main">
      <div class="test_main_line"></div>
      <div class="test_main_center">
        <div class="test_main_center_left">
          <div class="test_main_center_left_list">
            <div v-for="(item, index) in list" :key="index">
              <a
                class="test_main_center_left_list_item"
                :href="`/test/details/${item.name
                  .trim()
                  .replace(/[^\w\d]/g, '-')
                  .toLowerCase()}-${item.id}/`"
              >
                <div class="test_main_center_left_list_item_img">
                  <nuxt-img
                    :src="item.icon || '/'"
                    fit="cover"
                    width="338"
                    height="338"
                    :alt="item.name"
                    loading="lazy"
                    format="auto"
                  ></nuxt-img>
                </div>
                <div class="test_main_center_left_list_item_text">
                  <div class="test_main_center_left_list_item_text_name">
                    {{ item.name }}
                  </div>
                </div>
              </a>
              <google-ad
                v-if="(index + 1) % 5 === 0"
                :id="googleAdIds[index % googleAdIds.length]"
                classNames="google_ad_loading"
              ></google-ad>
            </div>
            <google-ad
              classNames="google_ad top"
              v-if="list.length >= 2"
              :id="'6715555076'"
            />
            <!-- <google-ad
              classNames="google_ad btm"
              v-if="list.length >= 32"
              :id="'2535818672'"
            /> -->
          </div>
          <div class="test_main_center_left_loading" v-if="loading">
            <img
              src="../../assets/img/resources/loading2.png"
              alt="loading"
              class="loading"
            />
          </div>
          <div class="test_main_center_left_btn" v-if="search.page < totalPage">
            <button
              class="test_main_center_left_btn_moreBtn"
              @click="getMoreList"
            >
              Load More
            </button>
          </div>
        </div>
        <!-- <google-ad classNames="google_ad_h5btm" :id="'3465756968'" /> -->
        <div class="test_main_center_right" ref="right_google_ad">
          <google-ad
            classNames="google_ad rightAd"
            ref="rightAd"
            :id="'9971744541'"
          />
        </div>
      </div>
    </div>
    <div class="foot_components" ref="foot_components">
      <transition name="fade">
        <home-your-choice class="choice"></home-your-choice>
      </transition>
      <transition name="fade">
        <tarot-more-tarot></tarot-more-tarot>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      currentTabIndex: 0,
      tabsStatus: true,
      googleAdIds: [
        '5568464365',
        '4830097762',
        '7484181264',
        '9971744541',
        '4486482830',
        '3465756968',
      ],
    }
  },
  async asyncData({ error, $apiList, params, $utils }) {
    try {
      let item = null,
        totalNum = 0,
        totalPage = 1,
        search = {
          page: 1,
          size: 20,
        }

      //获取测试列表
      let list = await $apiList.test
        .getTestList({
          origin: process.env.origin,
          ...search,
        })
        .then((res) => {
          totalNum = res.count
          totalPage =
            Math.ceil(totalNum / search.size) === 0
              ? 1
              : Math.ceil(totalNum / search.size)

          return res?.list || null
        })
      return {
        item,
        list,
        totalNum,
        totalPage,
        search,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.msg })
    }
  },
  mounted() {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 滚动懒加载请求数据
    handleScroll() {
      const rightAd = document.querySelector('.rightAd')
      const rightAdBox = this.$refs.right_google_ad
      rightAd.style.display = 'block'
      const parentRect = rightAdBox.getBoundingClientRect()
      const childRect = rightAd.getBoundingClientRect()
      const screenWidth =
        window.innerWidth || document.documentElement.clientWidth
      if (screenWidth <= 750) {
        rightAd.style.display = 'none'
        const docScroHei = document.documentElement.scrollHeight
        const inHeight = window.innerHeight
        let scrolls = docScroHei - inHeight
        if (scrolls == window.scrollY) {
          this.getMoreList()
          return
        }
      } else {
        rightAd.style.display =
          childRect.top + childRect.height - 48 >=
          parentRect.top + parentRect.height
            ? 'none'
            : 'block'
      }
    },
    /** */
    getMoreList() {
      this.loading = true
      this.search.page += 1
      this.$apiList.test
        .getTestList({
          origin: process.env.origin,
          ...this.search,
        })
        .then((res) => {
          res.list &&
            res.list.map((item) => {
              this.list.push(item)
            })
          this.totalNum = res.count
          this.totalPage =
            Math.ceil(this.totalNum / this.search.size) === 0
              ? 1
              : Math.ceil(this.totalNum / this.search.size)
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.search.page -= 1
          this.loading = false
        })
    },
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
$block: 220px;
$spacing: 16px;
.current_tabs {
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: #000000 !important;
  }
}
.test {
  width: 100%;
  &_main {
    width: 1400px;
    margin: 0 auto;
    &_top {
      width: 100%;
      display: flex;
      // justify-content: space-between;
      justify-content: flex-end;
      height: 44px;
      &_tabs {
        display: flex;
        // justify-content: center;
        align-items: center;
        width: 1040px;
        overflow-x: auto;
        margin-right: 13px;
        &_item {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          height: 32px;
          // background: #ffffff;
          border-radius: 42px;
          margin-right: 24px;
          padding: 0 22px;
          flex-shrink: 0;
          span {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            /* identical to box height, or 129% */
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }
      input {
        width: 338px;
        height: 44px;
        background: rgba(7, 6, 6, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.6);
        border-radius: 24px;
        padding: 0 20px;
        &::placeholder {
          font-family: 'Rubik';
          font-size: 14px;
          line-height: 18px;
          color: rgba(255, 255, 255, 0.6);
          text-indent: 18px;
        }
        &:focus {
          border-color: #fff;
        }
      }
      .searchH5 {
        display: none;
      }
      &_inputH5 {
        display: none;
      }
    }
    &_center {
      margin-top: 48px;
      display: flex;
      justify-content: space-between;
      &_left {
        width: 924px;
        &_list {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4, 220px);
          grid-gap: 48px 15px;
          align-self: flex-start;
          &_item {
            width: 220px;
            display: block;
            &_img {
              width: 220px;
              height: 220px;
              object-fit: cover;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            &_text {
              margin-top: 16px;
              padding: 0 5px;
              &_name {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                text-align: center;
                color: rgba(255, 255, 255, 0.6);
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
            }
          }
          .google_ad {
            width: 924px;
            height: 305px;
            margin: -16px 0 0;
            grid-column-end: 5;
            grid-column-start: span 4;
            grid-row-start: span 2;
          }
          .google_ad_loading {
            display: none;
          }
          .top {
            grid-row-end: 5;
            display: none;
          }
          .btm {
            grid-row-end: 13;
          }
        }
        &_loading {
          display: flex;
          justify-content: center;
          .loading {
            width: 32px;
            height: 32px;
            margin: 32px auto 0;
            animation: spin 1s infinite linear reverse;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        &_btn {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 24px;
          &_moreBtn {
            border: 1px solid #45454d;
            border-radius: 42px;
            color: hsla(0, 0%, 100%, 0.7);
            font-family: Rubik;
            font-size: 16px;
            height: 44px;
            line-height: 22px;
            transition: background-color 0.3s, color 0.3s;
            width: 220px;
            &:hover {
              background-color: #fff;
              color: #000;
            }
          }
        }
      }

      &_right {
        width: 300px;
        position: relative;
        .google_ad {
          width: 300px;
          position: fixed;
          display: none;
          height: 600px;
        }
      }
      .google_ad_h5btm {
        display: none;
      }
    }
  }
  .foot_components {
    padding: 56px 0 0;
    .choice {
      margin-bottom: 56px;
    }
  }
}
@media (max-width: (4 * $block + 3 * $spacing + 500px)) {
  .test {
    &_main {
      width: 95%;
      &_center {
        &_right {
          .google_ad {
            right: 50px;
          }
        }
      }
    }
  }
}
@media (max-width: (4 * $block + 3 * $spacing + 400px)) {
  .test {
    &_main {
      &_center {
        &_left {
          &_list {
            width: 100%;
            grid-template-columns: repeat(3, 220px);
            justify-content: center;
            .google_ad {
              grid-column-start: span 3;
              grid-column-end: 4;
              width: 100%;
            }
          }
        }

        &_right {
          .google_ad {
            right: 20px;
            width: 250px;
          }
        }
      }
    }
  }
}
@media (max-width: (3 * $block + 2 * $spacing + 350px)) {
  .test {
    &_main {
      &_center {
        &_left {
          &_list {
            grid-template-columns: repeat(2, 220px);
            .google_ad {
              grid-column-start: span 2;
              grid-column-end: 3;
            }
          }
        }
      }
    }
  }
}
@media (max-width: (2 * $block + 1 * $spacing + 350px)) {
  .test {
    &_main {
      &_center {
        &_left {
          width: 80%;
        }

        &_right {
          .google_ad {
            right: 10px;
          }
        }
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .test {
    &_main {
      width: 100%;
      padding: 0 16 * $pr 24 * $pr;
      &_top {
        align-items: center;
        &_tabs {
          width: 340 * $pr;
          height: 44 * $pr;
          &_item {
            height: 38 * $pr;
            padding: 7 * $pr 22 * $pr;
            margin-right: 0;
            span {
              font-size: 14 * $pr;
              line-height: 18 * $pr;
            }
          }
        }
        input {
          display: none;
        }
        .searchH5 {
          display: block;
          width: 19 * $pr;
          height: 19 * $pr;
        }
        &_inputH5 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          input {
            display: block;
            height: 44 * $pr;
            width: 285 * $pr;
            background: rgba(7, 6, 6, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.6);
            border-radius: 24 * $pr;
          }
          span {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 14 * $pr;
            line-height: 18 * $pr;
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }
      &_center {
        margin-top: 32 * $pr;
        flex-direction: column;
        &_left {
          width: 100%;
          &_list {
            grid-template-columns: 1fr;
            gap: 16 * $pr;
            &_item {
              width: 100%;
              &_img {
                width: 100%;
                height: 171 * $pr;
                border-radius: 6 * $pr;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              &_text {
                margin-top: 8 * $pr;
                padding: 0 5 * $pr;
                &_name {
                  font-size: 14 * $pr;
                  line-height: 18 * $pr;
                }
              }
            }
            .google_ad {
              grid-area: 2 / 1 / 3 / 6;
              grid-column-end: inherit;
              grid-column-start: inherit;
              grid-row-start: inherit;
              width: 336 * $pr;
              height: 297 * $pr;
              margin: 0 auto;
            }

            .google_ad_loading {
              display: flex;
              flex-direction: column;
              width: 336 * $pr;
              height: 297 * $pr;
              margin: 16 * $pr auto 0;
            }
            .top {
              //   grid-row-end: inherit;
              display: flex;
              flex-direction: column;
            }
            .btm {
              grid-row-end: 17;
            }
          }
          &_loading {
            .loading {
              width: 32 * $pr;
              height: 32 * $pr;
              margin-top: 24 * $pr;
            }
          }
          &_btn {
            display: none;
            &_moreBtn {
              width: 295 * $pr;
              height: 44 * $pr;
              font-size: 16 * $pr;
              line-height: 22 * $pr;
              border-radius: 42 * $pr;
              background-color: #fff;
              color: #000;
            }
          }
        }

        &_right {
          display: none;
        }
        .google_ad_h5btm {
          display: flex;
          flex-direction: column;
          width: 336 * $pr;
          height: 297 * $pr;
          margin: 16 * $pr auto;
        }
      }
    }
    .foot_components {
      display: none;
      padding: 0 0 32 * $pr;
      .choice {
        margin-bottom: 32 * $pr;
      }
    }
  }
}
</style>
