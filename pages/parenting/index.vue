<template>
  <div class="parenting">
    <div class="parenting_main">
      <google-ad classNames="google_ad_top" :id="'3611076013'" />
      <div class="baby">
        <div class="choice">
          <div class="choice__title">
            <h3>Choose Your Zodiac Sign</h3>
          </div>
          <ul class="choice__main">
            <li v-for="item_i in parentingData" :key="item_i.id">
              <a
                class="fade choice__main__a"
                :href="`/parenting/details/${item_i.name
                  .replace(/[^a-zA-Z0-9\\s]/g, '-')
                  .toLowerCase()}-${item_i.id}/`"
                data-aos="zoom-out-up"
              >
                <div class="imgs">
                  <div class="img__list">
                    <div class="dose_img">
                      <nuxt-img
                        :src="item_i.child_icon || '/'"
                        fit="cover"
                        width="114"
                        height="114"
                        :alt="item_i.name"
                        loading="lazy"
                        format="auto"
                      ></nuxt-img>
                      <i class="layer"></i>
                    </div>
                    <nuxt-img
                      class="icon_img"
                      :src="item_i.symbol_icon || '/'"
                      fit="cover"
                      width="80"
                      height="50"
                      :alt="item_i.name"
                      loading="lazy"
                      format="auto"
                    ></nuxt-img>
                  </div>
                </div>
                <p class="title">{{ toUpperBig(item_i.name) }}</p>
                <p class="time">{{ item_i.dates }}</p>
              </a>
            </li>
          </ul>
        </div>
        <el-explore-more class="explore" />
        <el-join-us class="joins"></el-join-us>
      </div>
      <tarot-all-tarot class="all_tarot"></tarot-all-tarot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  async asyncData({ error, $apiList, params }) {
    try {
      let [parentingData] = await Promise.all([
        $apiList.home
          .getZodiacHomeAstro({
            origin: process.env.origin,
          })
          .then((res) => {
            return res
          }),
      ])
      return {
        parentingData,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
  methods: {
    toUpperBig(str) {
      return str?.charAt(0).toUpperCase() + str?.slice(1)
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.parenting {
  &_main {
    .google_ad_top {
      width: 1200px;
      height: 315px;
      margin: 48px auto 0;
    }
    .baby {
      width: 1400px;
      margin: 0 auto;
      padding: 0 0 48px;
      .choice {
        width: 1400px;
        margin: 48px auto 0;
        &__title {
          padding-bottom: 16px;
          h3 {
            color: #fff;
            text-align: center;
            font-family: 'Cinzel Decorative';
            font-size: 36px;
            font-style: normal;
            font-weight: 700;
            line-height: 48px;
          }
          p {
            font-family: 'Rubik';
            font-size: 22px;
            line-height: 30px;
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            text-align: center;
          }
          &.to_page_padding {
            padding-bottom: 8px !important;
          }
        }
        &__main {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
          li {
            box-sizing: border-box;
            border-radius: 6px;
            transition: border-color 0.3s;
            transition: transform 0.3s, background-color 0.3s ease-out;
            .choice__main__a {
              box-sizing: border-box;
              height: 100%;
              display: block;
              padding-bottom: 32px;
              .imgs {
                display: flex;
                justify-content: center;
                padding: 20px 0;
                .img__list {
                  width: 114px;
                  height: 114px;
                  border-radius: 6px;
                  overflow: hidden;
                  transition: transform 0.3s;
                  position: relative;
                  .dose_img {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    > img {
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                    }
                    .layer {
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      border-radius: 50%;
                      background: rgba(0, 0, 0, 0.5);
                      opacity: 0;
                      transition: opacity 0.3s ease-out;
                    }
                  }
                  .icon_img {
                    width: 80px;
                    height: 50px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    object-fit: cover;
                    opacity: 0;
                    transition: opacity 0.3s ease-out;
                  }
                }
              }
              .title {
                font-family: 'Rubik';
                font-size: 22px;
                line-height: 30px;
                color: #fff;
                text-align: center;
              }
              .time {
                font-family: 'Rubik';
                font-size: 14px;
                line-height: 18px;
                color: rgba(255, 255, 255, 0.6);
                text-align: center;
              }
            }
            &:hover {
              transform: translateY(-10px);
              background-color: rgba(255, 255, 255, 0.08);
              .choice__main__a {
                .imgs {
                  .img__list {
                    transform: scale(1.1);
                    .dose_img {
                      .layer {
                        opacity: 1;
                      }
                    }
                    .icon_img {
                      opacity: 1;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .explore {
        margin-top: 96px;
      }
      .joins {
        margin-top: 96px;
      }
    }
    .all_tarot {
      padding-bottom: 96px;
    }
  }
}
@media (max-width: 1435px) {
  .parenting {
    &_main {
      .google_ad_top {
        max-width: 1200px;
        width: 100%;
        height: 315px;
        margin: 48px auto 0;
      }
      .baby {
        width: 100%;
        margin: 0 auto;
        padding: 0 30px 48px;
        .choice {
          width: 100%;
          padding: 0 30px;
          &__main {
            width: 100%;
            grid-template-columns: repeat(4, 220px);
            justify-content: center;
          }
        }
      }
    }
  }
}
@media (max-width: 947px) {
  .parenting {
    &_main {
      .baby {
        .choice {
          &__main {
            grid-template-columns: repeat(3, 220px);
            justify-content: center;
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .parenting {
    &_main {
      .google_ad_top {
        max-width: auto;
        height: 130 * $pr;
        margin: 0 auto;
      }
      .baby {
        padding: 0 16 * $pr 0;
        .choice {
          margin: 48 * $pr auto 0;
          padding: 0;
          &__title {
            padding-bottom: 16 * $pr;
            h3 {
              font-size: 26 * $pr;
              line-height: 36 * $pr;
            }
            .h5_size {
              font-size: 26 * $pr;
              line-height: 36 * $pr;
            }
            p {
              font-size: 14 * $pr;
              line-height: 18 * $pr;
            }
            &.to_page_padding {
              padding-bottom: 8 * $pr !important;
            }
          }
          &__main {
            grid-template-columns: repeat(3, 1fr);
            row-gap: 0;
            column-gap: 11 * $pr;
            li {
              width: 100%;
              height: 147 * $pr;
              margin-bottom: 24 * $pr;
              border: 0;
              .choice__main__a {
                height: 100%;
                padding-bottom: 0;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding-bottom: 8 * $pr;
                .imgs {
                  display: flex;
                  justify-content: center;
                  padding: 0 0 16 * $pr;
                  .img__list {
                    width: 71 * $pr;
                    height: 71 * $pr;
                    border-radius: 6 * $pr;
                    overflow: hidden;
                    transition: transform 0.3s;
                    position: relative;
                    .icon_img {
                      width: 40 * $pr;
                      height: 30 * $pr;
                    }
                  }
                }
                .title {
                  font-size: 16 * $pr;
                  line-height: 22 * $pr;
                }
                .time {
                  font-size: 12 * $pr;
                  line-height: 16 * $pr;
                }
              }
              &:hover {
                transform: translateY(0);
                background-color: inherit;
              }
            }
          }
        }
        .explore {
          margin-top: 48 * $pr;
        }
        .joins {
          margin-top: 48 * $pr;
        }
      }
      .all_tarot {
        padding-bottom: 48 * $pr;
      }
    }
  }
}
</style>
