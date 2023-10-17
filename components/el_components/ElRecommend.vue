<template>
  <div class="advise">
    <div class="advise_main">
      <div class="advise_main_scroll">
        <div class="advise_main_scroll_content">
          <div class="advise_main_scroll_content_matter">
            <i class="off" @click="closeRecommendation">
              <img src="~/assets/img/login/openup.svg" alt="openup" />
            </i>
            <p class="title">Recommended</p>
            <div class="content" id="RECOMMENDATION">
              <a
                :href="item.path"
                v-for="(item, index) in captionData"
                :key="index"
                @click="closeRecommendation"
              >
                <div class="content_item">
                  <div class="imgs">
                    <img :src="item.imgs" :alt="item.name" />
                    <div class="texts">
                      <div class="texts_lis">
                        <p>{{ item.texts }}</p>
                        <span>>>></span>
                      </div>
                    </div>
                  </div>
                  <p class="caption">{{ item.name }}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      captionData: [
        {
          name: '2023 Horoscope',
          texts: 'Get Your Horoscope',
          imgs: require('../../assets/img/login/2023.png'),
          path: '/horroscope/aries-5-1/',
        },
        {
          name: 'Love Horoscope',
          texts: 'Get Your Horoscope',
          imgs: require('../../assets/img/login/fall.png'),
          path: '/horroscope/aries-1-1/',
        },
        {
          name: 'Tarot Ai',
          texts: 'Get Reading',
          imgs: require('../../assets/img/login/al1.png'),
          path: '/tarot/',
        },
        {
          name: 'Love Tarot',
          texts: 'Get Love Advice',
          imgs: require('../../assets/img/login/love1.png'),
          path: '/tarot/type/1/',
        },
        {
          name: 'Major Arcana',
          texts: 'View Card Meanings',
          imgs: require('../../assets/img/login/card1.png'),
          path: '/tarot/cards/',
        },
        {
          name: 'Zodiac Signs',
          texts: 'Explore Your Sign',
          imgs: require('../../assets/img/login/tarot1.png'),
          path: '/zodiac/',
        },
        {
          name: 'Sun Sign Zodiac Compatibility',
          texts: 'Get Your Compatibility',
          imgs: require('../../assets/img/login/sun1.png'),
          path: '/astrology/',
        },
        {
          name: 'Pet Compatibility',
          texts: 'Get Pet Compatibility',
          imgs: require('../../assets/img/login/goat.png'),
          path: '/petinquiry/',
        },
        {
          name: 'Free Quiz',
          texts: 'Get Reading',
          imgs: require('../../assets/img/login/sayhello.png'),
          path: '/test/',
        },
        {
          name: 'Astrology Articles',
          texts: 'Get Reading',
          imgs: require('../../assets/img/login/articies.png'),
          path: '/resources/',
        },
      ],
    }
  },
  methods: {
    closeRecommendation() {
      this.$emit('recomment', false)
      sessionStorage.setItem('recom', '')
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.advise {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  z-index: 99;
  &_main {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
    &_scroll {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      &_content {
        width: 1186px;
        height: auto;
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        background: #120724;
        backdrop-filter: blur(8px);
        padding: 3px;
        &_matter {
          width: 100%;
          height: 100%;
          border-radius: 21px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          padding: 30px 0 37px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          .off {
            position: absolute;
            top: 21px;
            right: 21px;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            &:hover {
              background-color: rgba(0, 0, 0, 0.5);
            }
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .title {
            text-align: center;
            color: #fff;
            font-family: Cinzel Decorative;
            font-size: 26px;
            font-style: normal;
            font-weight: 700;
            line-height: 36px;
          }
          .content {
            display: grid;
            grid-template-columns: repeat(5, 200px);
            gap: 14px 5px;
            margin-top: 24px;
            &_item {
              padding: 5px;
              min-height: 252px;
              border-radius: 6px;
              cursor: pointer;
              transition: background-color 0.3s, transform 0.3s ease-out;
              &:hover {
                background: rgba(255, 255, 255, 0.08);
                transform: translateY(-5px);
                .imgs {
                  .texts {
                    background: linear-gradient(
                      180deg,
                      rgba(0, 0, 0, 0) 53.65%,
                      rgba(0, 0, 0, 0.65) 100%
                    );
                    &_lis {
                      opacity: 1;
                    }
                  }
                }
              }
              .imgs {
                width: 190px;
                height: 190px;
                position: relative;
                border-radius: 6px;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
                .texts {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                  transition: background-color 0.5s ease-in;
                  &_lis {
                    width: 100%;
                    position: absolute;
                    left: 50%;
                    bottom: 15px;
                    transform: translateX(-50%);
                    color: #fff;
                    text-align: center;
                    font-family: 'Rubik';
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 18px;
                    opacity: 0;
                    transition: opacity 0.4s ease-in;
                    > p {
                      margin-bottom: 3px;
                    }
                  }
                }
              }
              .caption {
                color: #ffda8b;
                text-align: center;
                font-family: 'Rubik';
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px;
                margin-top: 8px;
              }
            }
          }
        }
      }
    }
  }
}
@media (max-width: 1250px) {
  .advise {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(5px);
    z-index: 99;
    &_main {
      width: 100%;
      height: 100%;
      position: relative;
      overflow-y: auto;
      &_scroll {
        width: 100%;
        position: absolute;
        left: 50%;
        top: inherit;
        transform: translate(-50%, 0);
        padding: 160px 50px 100px;
        &_content {
          width: 100%;
          height: auto;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          background: #120724;
          backdrop-filter: blur(8px);
          padding: 3px;
          &_matter {
            width: 100%;
            height: 100%;
            border-radius: 21px;
            border: 1px solid rgba(255, 255, 255, 0.4);
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(8px);
            padding: 30px 24px 37px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            .off {
              position: absolute;
              top: 21px;
              right: 21px;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              cursor: pointer;
              &:hover {
                background-color: rgba(0, 0, 0, 0.5);
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .title {
              text-align: center;
              color: #fff;
              font-family: Cinzel Decorative;
              font-size: 26px;
              font-style: normal;
              font-weight: 700;
              line-height: 36px;
            }
            .content {
              width: 100%;
              display: grid;
              grid-template-columns: repeat(auto-fill, 200px);
              gap: 14px 5px;
              margin-top: 24px;
              justify-content: center;
              &_item {
                padding: 5px;
                min-height: 252px;
                border-radius: 6px;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.3s ease-out;
                &:hover {
                  background: rgba(255, 255, 255, 0.08);
                  transform: translateY(-5px);
                  .imgs {
                    .texts {
                      background: linear-gradient(
                        180deg,
                        rgba(0, 0, 0, 0) 53.65%,
                        rgba(0, 0, 0, 0.65) 100%
                      );
                      &_lis {
                        opacity: 1;
                      }
                    }
                  }
                }
                .imgs {
                  width: 190px;
                  height: 190px;
                  position: relative;
                  border-radius: 6px;
                  overflow: hidden;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                  .texts {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    transition: background-color 0.5s ease-in;
                    &_lis {
                      width: 100%;
                      position: absolute;
                      left: 50%;
                      bottom: 15px;
                      transform: translateX(-50%);
                      color: #fff;
                      text-align: center;
                      font-family: 'Rubik';
                      font-size: 14px;
                      font-style: normal;
                      font-weight: 400;
                      line-height: 18px;
                      opacity: 0;
                      transition: opacity 0.4s ease-in;
                      > p {
                        margin-bottom: 3px;
                      }
                    }
                  }
                }
                .caption {
                  color: #ffda8b;
                  text-align: center;
                  font-family: 'Rubik';
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 22px;
                  margin-top: 8px;
                }
              }
            }
          }
        }
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .advise {
    backdrop-filter: blur(5 * $pr);
    &_main {
      &_scroll {
        width: 100%;
        padding: 100 * $pr 16 * $pr;
        &_content {
          border-radius: 24 * $pr;
          border: 1 * $pr solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(8 * $pr);
          padding: 3 * $pr;
          &_matter {
            width: 100%;
            height: 100%;
            border-radius: 21 * $pr;
            border: 1px solid rgba(255, 255, 255, 0.4);
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(8 * $pr);
            padding: 21 * $pr 13 * $pr 37 * $pr;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            .off {
              position: absolute;
              top: 9 * $pr;
              right: 9 * $pr;
              width: 24 * $pr;
              height: 24 * $pr;
              background-color: rgba(0, 0, 0, 0.5);
            }
            .title {
              font-size: 18 * $pr;
              line-height: 24 * $pr;
            }
            .content {
              width: 100%;
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 16 * $pr 10 * $pr;
              margin-top: 16 * $pr;
              justify-content: center;
              &_item {
                padding: 5 * $pr 0 0;
                min-height: 103 * $pr;
                border-radius: 3 * $pr;
                display: flex;
                flex-direction: column;
                align-items: center;

                .imgs {
                  width: 65 * $pr;
                  height: 65 * $pr;
                  border-radius: 3 * $pr;
                  .texts {
                    display: none;
                  }
                }
                .caption {
                  font-size: 12 * $pr;
                  font-weight: 400;
                  line-height: 16 * $pr;
                  margin-top: 6 * $pr;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
