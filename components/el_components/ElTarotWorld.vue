<template>
  <div class="tarot_world">
    <div class="tarot_world_main">
      <div class="tarot_bot_mian">
        <div class="tarot">
          <div class="tarot_title">
            <p class="title">Welcome to the Tarot World</p>
            <div class="help">
              <p>A FREE Tarot Reading can help. Choose your cards now:</p>
            </div>
          </div>
          <div class="tarot_carousel">
            <div class="tarot_carousel_list">
              <div
                class="slideshow_main"
                v-for="(item, index) in slideshow"
                :class="{ paused: item.paused }"
                :key="index"
                :style="{ animationDelay: index * 1200 + 'ms' }"
                @mouseenter="stopAllAnimation(item)"
                @mouseleave="resumeAllAnimation(item)"
              >
                <div
                  class="slideshow"
                  :style="{ animationDelay: index * 1200 + 'ms' }"
                  :class="{ paused: item.paused }"
                >
                  <a
                    :href="`${item.path}${getCurrentRoute}`"
                    class="slideshow_item"
                  >
                    <img
                      :src="item.imgUrl"
                      :alt="item.imgUrl"
                      :style="{ animationDelay: index * 1200 + 'ms' }"
                      :class="{ paused: item.paused }"
                    />
                    <div
                      class="arrow"
                      :style="{ animationDelay: index * 1200 + 'ms' }"
                      :class="{ paused: item.paused }"
                    >
                      <div class="arrow_icon">
                        <i class="icon"></i>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="slideshow_title">
                  <p>{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tarot_bot">
          <div class="tarot_bot_min">
            <div class="min_left">
              <div class="bot_img">
                <img src="~/assets/img/horroscope/today_tarot.svg" alt="" />
                <span>TarotBot</span>
              </div>
              <p>Welcome to Tarot Chatbot! ✨</p>
            </div>
            <div class="min_right">
              <a :href="`/tarot/`">Try Now</a>
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
      slideshow: [
        {
          id: 1,
          paused: false,
          name: 'Daily',
          path: '/tarot/type/4/',
          imgUrl: require('~/assets/img/tarot/tarot_daily.webp'),
        },
        {
          id: 2,
          paused: false,
          name: 'Career',
          path: '/tarot/type/2/',
          imgUrl: require('~/assets/img/tarot/tarot_career.webp'),
        },
        {
          id: 3,
          paused: false,
          name: 'Universal',
          path: '/tarot/type/3/',
          imgUrl: require('~/assets/img/tarot/tarot_universal.webp'),
        },
        {
          id: 4,
          paused: false,
          name: 'Love',
          path: '/tarot/type/1/',
          imgUrl: require('~/assets/img/tarot/tarot_love.webp'),
        },
      ],
      stopAnimation: false,
      timer: null,
    }
  },
  computed: {
    getCurrentRoute() {
      return this.$route.path === '/' ? '?from=home' : ''
    },
  },
  mounted() {
    this.startTimer()
    if (window.innerWidth < 751) {
      this.stopTimer() //屏幕尺寸小于750时，不执行动画
    }
  },
  beforeDestroy() {
    this.stopTimer()
  },
  methods: {
    startAnimation() {
      this.slideshow = []
      this.stopAnimation = false
      this.$nextTick(() => {
        this.slideshow = [
          {
            id: 1,
            paused: false,
            name: 'Daily',
            path: '/tarot/',
            imgUrl: require('~/assets/img/tarot/tarot_daily.webp'),
          },
          {
            id: 2,
            paused: false,
            name: 'Career',
            path: '/tarot/type/2/',
            imgUrl: require('~/assets/img/tarot/tarot_career.webp'),
          },
          {
            id: 3,
            paused: false,
            name: 'Universal',
            path: '/tarot/type/3/',
            imgUrl: require('~/assets/img/tarot/tarot_universal.webp'),
          },
          {
            id: 4,
            paused: false,
            name: 'Love',
            path: '/tarot/type/1/',
            imgUrl: require('~/assets/img/tarot/tarot_love.webp'),
          },
        ]
      })
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.startAnimation()
      }, 5500)
    },
    stopTimer() {
      clearInterval(this.timer)
    },
    stopAllAnimation(box) {
      this.stopTimer()
      box.paused = true
    },
    resumeAllAnimation(box) {
      this.startTimer()
      box.paused = false
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.tarot_world {
  width: 100%;
  &_main {
    .tarot_bot_mian {
      position: relative;
      .tarot_bot {
        position: absolute;
        top: 168px;
        left: 0;
        width: 574px;
        height: 114px;
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        padding: 3px;
        &_min {
          width: 100%;
          height: 100%;
          border-radius: 21px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          .min_left {
            .bot_img {
              display: flex;
              align-items: center;
              gap: 16px;
              > img {
                width: 40px;
                height: 40px;
                object-fit: cover;
              }
              > span {
                color: #fff;
                font-family: 'Cinzel Decorative';
                font-size: 26px;
                font-style: normal;
                font-weight: 700;
                line-height: 36px;
              }
            }
            > p {
              color: var(--9747-ff, #9747ff);
              font-family: 'Rubik';
              font-size: 22px;
              font-style: normal;
              font-weight: 400;
              line-height: 30px;
              margin-top: 8px;
            }
          }
          .min_right {
            > a {
              display: block;
              padding: 8px 32px;
              background-color: #fff;
              border-radius: 42px;
              color: #000;
              text-align: center;
              font-family: 'Rubik';
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
            }
          }
        }
      }
      .tarot {
        display: flex;
        &_title {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: baseline;
          height: 330px;
          padding-top: 30px;
          .title {
            color: #fff;
            font-family: 'Cinzel Decorative';
            font-size: 36px;
            font-style: normal;
            font-weight: 700;
            line-height: 48px;
          }
          .help {
            margin-top: 16px;
            color: #fff;
            font-family: 'Rubik';
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: 30px;
          }
        }

        &_carousel {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          &_list {
            display: flex;
            justify-content: flex-end;
            padding-right: 48px;
            .slideshow_main {
              position: relative;
              transition: transform 0.3s ease-in-out;
              animation: take_turns 1.5s linear;
              .slideshow_title {
                position: absolute;
                left: 20%;
                bottom: -34px;
                color: #fff;
                font-family: 'Rubik';
                font-size: 22px;
                font-style: normal;
                font-weight: 400;
                line-height: 30px;
              }
              &:hover {
                transform: scale(1.1);
                .slideshow {
                  border-color: rgba(255, 255, 255, 0.2);
                  transform: skewX(-13deg);
                  .slideshow_item {
                    &::after {
                      background-color: transparent;
                    }
                    img {
                      filter: none;
                    }
                    .arrow {
                      opacity: 1;
                      transform: translate(-50%, -50%) scale(1);
                    }
                  }
                }
              }
              .slideshow {
                width: 148px;
                height: 282px;
                border: 5px solid transparent;
                transform: skewX(-13deg);
                border-radius: 26px;
                box-sizing: border-box;
                transform-style: preserve-3d;
                margin-left: 10px;
                cursor: pointer;
                transition: border-color 0.3s, transform 0.3s ease-in-out;
                overflow: hidden;
                animation: slideshow 2s linear;
                .slideshow_item {
                  width: 150%;
                  height: 100%;
                  display: block;
                  transform: skewX(13deg);
                  transform-style: preserve-3d;
                  position: relative;
                  left: -25%;
                  &::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(46, 47, 49, 0.2);
                    z-index: 1;
                    transition: background-color 0.3s ease-in-out;
                    animation: slideshow_after 2s linear;
                  }
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: brightness(40%);
                    transition: filter 0.3s ease-in-out;
                    animation: slideshow_img 2s linear;
                  }
                  .arrow {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%) scale(0.6);
                    background-color: #fff;
                    border-radius: 50%;
                    opacity: 0;
                    transition: opacity 0.4s, transform 0.5s ease-in-out;
                    animation: slideshow_arrow 2s linear;
                    &_icon {
                      width: 32px;
                      height: 32px;
                      display: grid;
                      place-items: center;
                      .icon {
                        width: 19px;
                        height: 15px;
                        display: inline-block;
                        background: url('../../assets/img/tarot/arrowRight.svg')
                          no-repeat center center;
                        background-size: cover;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .paused {
    animation-play-state: paused !important;
  }
  @keyframes take_turns {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes slideshow {
    0% {
    }
    50% {
      border-color: rgba(255, 255, 255, 0.2);
    }
    100% {
    }
  }
  @keyframes slideshow {
    0% {
    }
    50% {
      border-color: rgba(255, 255, 255, 0.2);
    }
    100% {
    }
  }
  @keyframes slideshow_after {
    0% {
      background-color: rgba(46, 47, 49, 0.2);
    }
    50% {
      background-color: transparent;
    }
    100% {
      background-color: rgba(46, 47, 49, 0.2);
    }
  }
  @keyframes slideshow_img {
    0% {
    }
    50% {
      filter: none;
    }
    100% {
    }
  }
  @keyframes slideshow_arrow {
    0% {
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
    }
  }
}
@media (max-width: 1435px) {
  .tarot_world {
    &_main {
      .tarot_bot_mian {
        position: relative;
        .tarot_bot {
          position: initial;
          top: inherit;
          left: initial;
          margin: 48px auto 0;
        }
      }
    }
  }
}

@media (max-width: 1300px) {
  .tarot_world {
    &_main {
      padding: 0 30px;
    }
  }
}

@media (max-width: 1050px) {
  .tarot_world {
    &_main {
      .tarot_bot_mian {
        .tarot {
          display: block;
          &_title {
            align-items: center;
            height: 200px;
            .help {
              margin-top: 24px;
            }
          }
          &_carousel {
            &_list {
              justify-content: center;
              padding-right: 0;
            }
          }
        }
        .tarot_bot {
          margin: 60px auto 0;
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .tarot_world {
    width: 100%;
    &_main {
      padding: 0;
      .tarot_bot_mian {
        .tarot {
          display: block;
          &_title {
            align-items: center;
            height: auto;
            padding-top: 0;
            .title {
              font-size: 22 * $pr;
              line-height: 30 * $pr;
              text-align: center;
              padding: 0 20 * $pr;
            }
            .help {
              margin-top: 0;
              font-size: 16 * $pr;
              line-height: 22 * $pr;
              text-align: center;
            }
          }

          &_carousel {
            width: 100%;
            height: auto;
            margin-top: 24 * $pr;
            &_list {
              display: grid;
              justify-content: flex-end;
              grid-template-columns: repeat(2, 1fr);
              gap: 5 * $pr;
              padding-right: 0;
              .slideshow_main {
                position: relative;
                transition: none;
                animation: none;
                .slideshow_title {
                  position: absolute;
                  left: 50%;
                  transform: translateX(-50%);
                  bottom: 5 * $pr;
                  font-size: 14 * $pr;
                  line-height: 18 * $pr;
                }
                &:first-child .slideshow,
                &:last-child .slideshow {
                  border-top-right-radius: 50 * $pr;
                  border-bottom-left-radius: 50 * $pr;
                }
                &:nth-child(2) .slideshow,
                &:nth-child(3) .slideshow {
                  border-top-left-radius: 50 * $pr;
                  border-bottom-right-radius: 50 * $pr;
                }
                &:hover {
                  transform: none;
                  .slideshow {
                    border-color: none;
                    transform: none;
                    .slideshow_item {
                      &::after {
                        display: none;
                      }
                      img {
                        filter: none;
                      }
                      .arrow {
                        opacity: 1;
                        transform: translate(-50%, 0) scale(1);
                      }
                    }
                  }
                }
                .slideshow {
                  width: 169 * $pr;
                  height: 169 * $pr;
                  border: none;
                  transform: none;
                  border-radius: 12 * $pr;
                  margin-left: 0;
                  cursor: pointer;
                  animation: none;
                  .slideshow_item {
                    width: 130%;
                    height: 100%;
                    display: block;
                    transform: none;
                    transform-style: preserve-3d;
                    position: relative;
                    left: -15%;
                    &::after {
                      display: none;
                    }
                    img {
                      object-position: top;
                      filter: none;
                      transition: none;
                      animation: none;
                    }
                    .arrow {
                      top: 70%;
                      transform: translate(-50%, 0) scale(1);
                      opacity: 1;
                      transition: none;
                      animation: none;
                      &_icon {
                        width: 24 * $pr;
                        height: 24 * $pr;
                        .icon {
                          width: 15 * $pr;
                          height: 12 * $pr;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .tarot_bot {
          position: initial;
          top: inherit;
          left: initial;
          width: 100%;
          height: auto;
          border-radius: 24 * $pr;
          border: 1 * $pr solid rgba(255, 255, 255, 0.4);
          padding: 3 * $pr;
          margin: 24 * $pr auto 0;
          &_min {
            border-radius: 21 * $pr;
            border: 1 * $pr solid rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(8 * $pr);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 13 * $pr 0 21 * $pr;
            .min_left {
              .bot_img {
                align-items: center;
                justify-content: center;
                gap: 16 * $pr;
                > img {
                  width: 40 * $pr;
                  height: 40 * $pr;
                }
                > span {
                  font-size: 22 * $pr;
                  line-height: 30 * $pr;
                }
              }
              > p {
                font-size: 16 * $pr;
                line-height: 22 * $pr;
                margin-top: 16 * $pr;
              }
            }
            .min_right {
              margin-top: 16 * $pr;
              > a {
                width: 205 * $pr;
                display: block;
                padding: 8 * $pr 0;
                border-radius: 42 * $pr;
                font-size: 16 * $pr;
                line-height: 22 * $pr;
              }
            }
          }
        }
      }
    }
  }
}
</style>
