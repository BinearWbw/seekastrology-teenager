<template>
  <footer class="footer">
    <div class="footer__main">
      <a href="/">
        <img
          class="logo_mobile_img"
          src="~/assets/img/header/logoImg.svg"
          alt="logo"
        />
      </a>
      <div class="top">
        <button class="arrow common__btn" @click="goTop">
          <img src="~/assets/img/footer/arrow.svg" alt="arrow" />
        </button>
        <div class="top_link">
          <div class="top_list" v-for="item in footer_link" :key="item.id">
            <a
              :href="`${cont.path}`"
              v-for="(cont, index) in item.content"
              :key="index"
              @click="gotoPageList($event, cont)"
            >
              {{ cont.link }}
            </a>
          </div>
        </div>
        <div class="top_last">
          <a href="/">
            <img
              class="logo_img"
              src="~/assets/img/header/logoImg.svg"
              alt="logo"
            />
          </a>
          <div class="media" v-if="false">
            <a
              :href="item.link"
              v-for="(item, index) in footer_media"
              :key="index"
              target="_blank"
            >
              <img :src="item.imgs" :alt="item.link" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <p>Copyright © 2024 Seekastrology All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      email: '',
      status: false,
      footer_link: [
        {
          id: '1',
          content: [
            {
              link: 'Astrology',
            },
            {
              link: 'Zodiac Signs',
              path: '/zodiac/',
            },
            {
              link: 'Horosscope',
              path: '/horroscope/aries-1/',
            },
            {
              link: 'Compatibility',
              path: '/astrology/',
            },
          ],
        },
        {
          id: '2',
          content: [
            {
              link: 'Tarot',
            },
            {
              link: 'Tarot Ai',
              path: '/tarot/',
            },
            {
              link: 'Daily Tarot',
              path: '/tarot/type/4/',
            },
            {
              link: 'Career Tarot',
              path: '/tarot/type/2/',
            },
            {
              link: 'Love Tarot',
              path: '/tarot/type/1/',
            },
            {
              link: 'Universal Tarot',
              path: '/tarot/type/3/',
            },
            {
              link: 'Tarot Cards',
              path: '/tarot/cards/',
            },
          ],
        },
        {
          id: '4',
          content: [
            {
              link: 'Articles',
            },
            {
              link: 'Tarot',
              path: '/resources/?id=3',
            },
            {
              link: 'Astrology',
              path: '/resources/?id=4',
            },
            {
              link: 'Love',
              path: '/resources/?id=5',
            },
          ],
        },
        {
          id: '5',
          content: [
            {
              link: 'Support',
            },
            {
              link: 'About Us',
              path: '/support/?name=about',
            },
            {
              link: 'Privacy Policy',
              path: '/support/?name=privacy',
            },
            {
              link: 'Disclaimer',
              path: '/support/?name=disclaimer',
            },
            {
              link: 'Contact Us',
              path: '/support/?name=contact',
            },
          ],
        },
      ],
      footer_media: [
        {
          imgs: require('~/assets/img/footer/instagram.png'),
          link: 'https://www.instagram.com',
        },
        {
          imgs: require('~/assets/img/footer/facebook.png'),
          link: 'https://www.facebook.com',
        },
        {
          imgs: require('~/assets/img/footer/twitter.png'),
          link: 'https://twitter.com',
        },
      ],
    }
  },
  methods: {
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    gotoPageList(event, item) {
      if (!item.path) event.preventDefault()
    },
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
.footer {
  width: 100%;
  background: rgba(0, 0, 0, 0.65);
  &__main {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding-top: 48px;
    .logo_mobile_img {
      display: none;
    }
    .top {
      display: flex;
      padding-bottom: 32px;
      border-bottom: 1px solid rgba(217, 217, 217, 0.1);
      position: relative;
      .arrow {
        position: absolute;
        right: 0;
        top: 0;
        width: 32px;
        height: 32px;
        background: #242731;
        border-radius: 6px;
        &:hover {
          background: #7a78ff;
        }
      }
      &_link {
        flex: 1;
        display: flex;
        .top_list {
          flex: 1;
          padding-right: 20px;
          position: relative;
          max-width: 300px;
          & > :first-child {
            margin-top: 0;
            font-size: 16px;
            line-height: 22px;
            color: #ffffff;
          }
          a {
            display: block;
            margin-top: 20px;
            font-family: 'Rubik';
            font-size: 14px;
            line-height: 18px;
            color: rgba(255, 255, 255, 0.6);
            transition: color 0.3s;
            &:hover {
              color: #fff;
            }
          }
          &::after {
            content: '';
            position: absolute;
            width: 1px;
            height: 100%;
            right: 25%;
            bottom: 0;
            background: linear-gradient(
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.2) 50.52%,
              rgba(255, 255, 255, 0) 100%
            );
          }
          &:last-child {
            &::after {
              background: none;
            }
          }
        }
      }
      &_last {
        margin-left: auto;
        width: 220px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .logo_img {
          width: 200px;
          margin-bottom: 10px;
        }
        .media {
          width: 100%;
          display: flex;
          align-items: center;
          a {
            display: block;
            margin-right: 20px;
            transition: transform 0.3s ease-out;
            &:hover {
              transform: scale(1.2);
            }
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--9747-ff, #9747ff);
    p {
      text-align: center;
      font-family: 'Rufina';
      font-size: 12px;
      line-height: 16px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
}
@media (max-width: (1370px)) {
  .footer {
    &__main {
      padding: 48px 30px 0;
    }
  }
}
@media (max-width: (1250px)) {
  .footer {
    .bottom {
      flex-direction: column-reverse;
      .left {
        margin-top: 30px;
        width: 100%;
      }
      .right {
        padding-top: 0;
        width: 100%;
      }
    }
  }
}
@media (max-width: (900px)) {
  .footer {
    &__main {
      .link {
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-align-items: flex-start;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        span {
          margin-top: 17px;
          margin-left: 0;
        }
      }
    }
  }
}
@media (max-width: (750px)) {
  $pr: math.div(1vw, 3.75);

  .footer {
    width: 100%;
    background: rgba(0, 0, 0, 0.65);
    &__main {
      width: 100%;
      margin: 0 auto;
      padding: 48 * $pr 16 * $pr 0 35 * $pr;
      .logo_mobile_img {
        display: block;
        width: 235 * $pr;
        margin: 0 auto 32 * $pr;
      }
      .top {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 0;
        border-bottom: none;
        position: relative;
        .arrow {
          display: none;
        }
        &_link {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          .top_list {
            flex-basis: 50%;
            padding-right: 0;
            padding: 16 * $pr 0;
            position: relative;
            max-width: 100%;
            & > :first-child {
              margin-top: 0;
              font-size: 16 * $pr;
              line-height: 22 * $pr;
            }
            a {
              display: block;
              margin-top: 20 * $pr;
              font-family: 'Rubik';
              font-size: 14 * $pr;
              line-height: 18 * $pr;
            }
            &::after {
              position: absolute;
              content: '';
              left: 0;
              right: initial;
              bottom: 0;
              width: 100%;
              height: 1 * $pr;
              background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.2) 50.52%,
                rgba(255, 255, 255, 0) 100%
              );
            }
            &:nth-child(odd) {
              &::after {
                background: linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0) 0%,
                  rgba(255, 255, 255, 0.2) 100%
                );
              }
            }
            &:nth-child(even) {
              &::after {
                background: linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0.2) 0%,
                  rgba(255, 255, 255, 0) 100%
                );
              }
            }
            &:nth-child(odd):last-child {
              &::after {
                background: none;
              }
            }
            &:nth-child(even):last-child {
              &::after {
                background: linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0.2) 0%,
                  rgba(255, 255, 255, 0) 100%
                );
              }
            }
            &:nth-child(2),
            &:nth-child(even) {
              padding-left: 35 * $pr;
            }
          }
        }
        &_last {
          margin-left: auto;
          width: auto;
          position: absolute;
          right: 0;
          bottom: 16 * $pr;
          .logo_img {
            display: none;
          }
          .media {
            a {
              margin-right: 24 * $pr;
              img {
                width: 33 * $pr;
              }
            }
          }
        }
      }
    }
    .bottom {
      width: 100%;
      height: 64 * $pr;
      p {
        font-size: 12 * $pr;
        line-height: 16 * $pr;
      }
    }
  }
}
</style>
