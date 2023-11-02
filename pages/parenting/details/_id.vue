<template>
  <div class="details">
    <div class="details_start">
      <google-ad classNames="google_ad_top" :id="'9601769292'" />
      <div class="mains">
        <div class="remains">
          <div class="remains_left">
            <h3 class="h3_title">{{ nameSign }} Baby and Child Horoscopes</h3>
            <div
              class="parentingText"
              ref="parentingGoogle"
              v-html="parentingDatails"
            ></div>
          </div>
          <div class="remains_right">
            <el-pairing-two class="pairing"></el-pairing-two>
            <google-ad classNames="google_ad_right" :id="'9001766394'" />
            <div class="choices">
              <home-your-choice-mini></home-your-choice-mini>
            </div>
          </div>
        </div>
        <el-explore-more class="explore" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      idAdArray: ['5470952596', '9218625919', '3000133706'],
    }
  },
  // 获取育儿详情
  async asyncData({ error, $apiList, params }) {
    try {
      let nameSign = ''
      let [parentingDatails] = await Promise.all([
        $apiList.home
          .getZodiacDetails({
            origin: process.env.origin,
            id: params.id.replace(
              /^.*?(\d*)$/,
              (str, match, index) => match || '0'
            ),
          })
          .then((res) => {
            nameSign = res.name?.charAt(0).toUpperCase() + res.name?.slice(1)
            return res.children_horoscopes
          }),
      ])
      return {
        nameSign,
        parentingDatails,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
  mounted() {
    this.getGoogleAd()
  },
  methods: {
    getGoogleAd() {
      this.$nextTick(() => {
        const parentingGoogle = this.$refs.parentingGoogle
        const h2Element = parentingGoogle.querySelectorAll('h2')
        let counter = 0 // 用于保证每个广告id按顺序使用
        let threeeIndex = [2, 4, 6] // 指定要展示广告的索引
        h2Element.forEach((item, index) => {
          const threeeDa = threeeIndex.includes(index)
          if (threeeDa) {
            // 顺序选择一个 id
            const randomId = this.idAdArray[counter % this.idAdArray.length]
            counter++

            const adContainer = document.createElement('div')
            adContainer.className = 'leftAdTextMain'

            // 创建动态组件实例
            const adComponent = new Vue({
              render: (h) =>
                h('google-observer-auto-ad', {
                  props: {
                    classNames: 'leftAdTextMain',
                    id: randomId,
                  },
                }),
            })

            // 挂载动态组件
            adComponent.$mount()

            // 将动态组件的根 DOM 元素添加到容器
            adContainer.appendChild(adComponent.$el)

            // 在 h4 元素之前插入广告容器
            item.parentNode.insertBefore(adContainer, item)
          }
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.details {
  &_start {
    .google_ad_top {
      width: 1200px;
      height: 315px;
      margin: 48px auto 0;
    }
    .mains {
      width: 1400px;
      margin: 0 auto;
      padding: 48px 0 56px;
      .remains {
        width: 100%;
        display: flex;
        padding-bottom: 56px;
        &_left {
          flex: 1;
          padding-right: 47px;
          .h3_title {
            color: #fff;
            font-family: 'Cinzel Decorative';
            font-size: 36px;
            font-style: normal;
            font-weight: 700;
            line-height: 48px;
            margin-bottom: 24px;
          }
          .parentingText {
            :deep(h2) {
              color: #fff;
              font-family: 'Rubik';
              font-size: 22px;
              font-style: normal;
              font-weight: 500;
              line-height: 30px;
              margin-top: 24px;
            }
            :deep(h3),
            :deep(h4) {
              color: #fff;
              font-family: 'Rubik';
              font-size: 18px;
              font-style: normal;
              font-weight: 500;
              line-height: 24px;
              margin-top: 8px;
            }
            :deep(p),
            :deep(li) {
              color: rgba(255, 255, 255, 0.6);
              font-family: 'Rubik';
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 28px;
            }
            :deep(.leftAdTextMain) {
              .leftAdTextMain {
                margin-top: 24px;
                .title {
                  height: 25px;
                  margin: 0;
                  color: #fff;
                }
              }
            }
          }
        }
        &_right {
          .pairing {
            margin-bottom: 24px;
          }
          .google_ad_right {
            width: 425px;
            height: 228px;
          }
          .choices {
            width: 425px;
            padding-top: 24px;
          }
        }
      }
    }
  }
}
@media (max-width: 1470px) {
  .details {
    &_start {
      padding: 0 30px;
      .google_ad_top {
        max-width: 1200px;
        width: 100%;
      }
      .mains {
        width: 100%;
      }
    }
  }
}
@media (max-width: 990px) {
  .details {
    &_start {
      padding: 0 16px;
      .google_ad_top {
        max-width: 100%;
        margin: 0;
      }
      .mains {
        .remains {
          width: 100%;
          display: flex;
          flex-direction: column;
          &_left {
            flex: 1;
            padding-right: 0;
          }
          &_right {
            display: flex;
            flex-direction: column;
            align-items: center;
            .pairing {
              width: 100%;
            }
            .google_ad_right {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .details {
    &_start {
      padding: 0;
      .google_ad_top {
        width: 100%;
        height: 130 * $pr;
      }
      .mains {
        padding: 24 * $pr 16 * $pr 32 * $pr;
        .remains {
          padding-bottom: 32 * $pr;
          &_left {
            flex: 1;
            .h3_title {
              font-size: 22 * $pr;
              line-height: 30 * $pr;
              margin-bottom: 24 * $pr;
            }
            .parentingText {
              padding-bottom: 32 * $pr;
              :deep(h2) {
                font-size: 16 * $pr;
                line-height: 28 * $pr;
                margin-top: 24 * $pr;
              }
              :deep(h3),
              :deep(h4) {
                font-size: 16 * $pr;
                line-height: 24 * $pr;
                margin-top: 8 * $pr;
              }
              :deep(p),
              :deep(li) {
                font-size: 14 * $pr;
                line-height: 24 * $pr;
              }
            }
          }
          &_right {
            .pairing {
              margin-bottom: 16 * $pr;
            }
            .google_ad_right {
              height: 280 * $pr;
            }
            .choices {
              width: 100%;
              padding-top: 16 * $pr;
            }
          }
        }
      }
    }
  }
}
</style>
