<template>
  <header class="header" id="headerNav">
    <client-only>
      <div class="header__main" :class="{ header_black: isScrolled }">
        <div>
          <a href="/" class="logo">
            <img
              class="img"
              src="~/assets/img/header/logoImg.svg"
              alt="logoImg"
            />
          </a>
          <nav class="nav">
            <a
              class="nav__item"
              :href="`${item.href}`"
              :class="{
                active:
                  item.path == $route.path ||
                  (item.path !== '/' && $route.path.includes(item.path)) ||
                  verificationChild(item.children),
              }"
              :title="item.title"
              v-for="(item, index) in menu"
              :key="index"
              @mouseenter="showDropdown(index)"
              @mouseleave="hideDropdown"
            >
              <span> {{ item.title }}</span>
              <transition name="fade">
                <div
                  class="nav__item_children"
                  v-if="isDropdownVisible === index && item.children"
                >
                  <a
                    class="nav_children"
                    :title="item_i.title"
                    v-for="(item_i, index_i) in item.children"
                    :href="`${item_i.href}`"
                    :key="index_i"
                    @mouseenter="showChildren(index_i)"
                    @mouseleave="hideChildren"
                  >
                    {{ item_i.title }}
                    <img
                      class="arrow"
                      src="~/assets/img/login/down_arrow.svg"
                      alt="down arrow"
                      v-if="item_i.childrenMini"
                    />
                    <transition name="fade">
                      <div
                        class="children_mini"
                        v-if="
                          isDropdownChildren === index_i && item_i.childrenMini
                        "
                      >
                        <a
                          class="children_mini_a"
                          v-for="(item_s, index_s) in item_i.childrenMini"
                          :key="index_s"
                          :href="`${item_s.href}`"
                          >{{ item_s.title }}</a
                        >
                      </div>
                    </transition>
                  </a>
                </div>
              </transition>
            </a>
          </nav>
          <Desktop></Desktop>
          <div class="search_icon">
            <div class="icon" @click="openSearch"></div>
          </div>
          <div class="menu common__btn" @click="visibleMenu = true"></div>
          <!-- 登录暂时隐藏 -->
          <transition name="fade">
            <el-login class="el_login"></el-login>
          </transition>
          <lazy-dialog-menu
            :menu="menu"
            :visible="visibleMenu"
            @close="visibleMenu = false"
          >
          </lazy-dialog-menu>
          <div class="search_top">
            <el-search
              :hidden="isSearch"
              @toggleHidden="openSearch"
            ></el-search>
          </div>
        </div>
      </div>
      <transition name="unfold">
        <el-login-form v-show="formOf" @choce="showundes"></el-login-form>
      </transition>
    </client-only>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      visibleMenu: false,
      searchInput: '',
      isDropdownVisible: -1,
      isDropdownChildren: -1,
      isScrolled: false,
      isSearch: false,
      formOf: false,
      menu: [
        {
          title: 'Home',
          path: '/',
          href: '/',
        },
        {
          title: 'Horoscopes',
          path: '/horroscope/aries-1/',
          href: '/horroscope/aries-1/',
          children: [
            {
              title: 'Daily',
              path: '/horroscope/aries-1/',
              href: '/horroscope/aries-1/',
            },
            {
              title: 'Love',
              path: '/horroscope/aries-1-1/',
              href: '/horroscope/aries-1-1/',
            },
            {
              title: 'Health',
              path: '/horroscope/aries-2-1/',
              href: '/horroscope/aries-2-1/',
            },
            {
              title: 'Career',
              path: '/horroscope/aries-3-1/',
              href: '/horroscope/aries-3-1/',
            },
            {
              title: 'Money',
              path: '/horroscope/aries-4-1/',
              href: '/horroscope/aries-4-1/',
            },
            {
              title: 'Teenager',
              path: '/teenager/aries-1/',
              href: '/teenager/aries-1/',
            },
            {
              title: 'Parenting',
              path: '/parenting/',
              href: '/parenting/',
            },
            {
              title: 'Pet',
              path: '/petsign/aries-1/',
              href: '/petsign/aries-1/',
            },
          ],
        },
        {
          title: 'Astrology',
          path: '/zodiac/',
          href: '/zodiac/',
          childrenShow: false,
          children: [
            {
              title: 'Birth Chart',
              path: '/birthchart/',
              href: '/birthchart/',
            },
            { title: 'Kundli Matching', path: '/kundli/', href: '/kundli/' },
            { title: 'Palm Reading', path: '/palmistry/', href: '/palmistry/' },
            {
              title: 'Zodiac Signs',
              path: '/zodiac/',
              href: '/zodiac/',
              childrenMini: [
                {
                  title: 'Aries ( Mar 21 - Apr 19 )',
                  path: '/zodiac/details/aries-1/',
                  href: '/zodiac/details/aries-1/',
                },
                {
                  title: 'Taurus (Apr 20 - May 20 )',
                  path: '/zodiac/details/taurus-2/',
                  href: '/zodiac/details/taurus-2/',
                },
                {
                  title: 'Gemini ( May 21 - Jun 20 )',
                  path: '/zodiac/details/gemini-3/',
                  href: '/zodiac/details/gemini-3/',
                },
                {
                  title: 'Cancer ( Jun 21 - Jul 22 )',
                  path: '/zodiac/details/cancer-4/',
                  href: '/zodiac/details/cancer-4/',
                },
                {
                  title: 'Leo ( Jul 23 - Aug 22 )',
                  path: '/zodiac/details/leo-5/',
                  href: '/zodiac/details/leo-5/',
                },
                {
                  title: 'Virgo ( Aug 23 - Sep 22 )',
                  path: '/zodiac/details/virgo-6/',
                  href: '/zodiac/details/virgo-6/',
                },
                {
                  title: 'Libra ( Sep 23 - Oct 22 )',
                  path: '/zodiac/details/libra-7/',
                  href: '/zodiac/details/libra-7/',
                },
                {
                  title: 'Scorpio ( Oct 23 - Nov 21 )',
                  path: '/zodiac/details/scorpio-8/',
                  href: '/zodiac/details/scorpio-8/',
                },
                {
                  title: 'Sagittarius ( Nov 22 - Dec 21 )',
                  path: '/zodiac/details/sagittarius-9/',
                  href: '/zodiac/details/sagittarius-9/',
                },
                {
                  title: 'Capricorn ( Dec 22 - Jan 19 )',
                  path: '/zodiac/details/capricorn-10/',
                  href: '/zodiac/details/capricorn-10/',
                },
                {
                  title: 'Aquarius ( Jan 20 - Feb 18 )',
                  path: '/zodiac/details/aquarius-11/',
                  href: '/zodiac/details/aquarius-11/',
                },
                {
                  title: 'Pisces ( Feb 19 - Mar 20 )',
                  path: '/zodiac/details/pisces-12/',
                  href: '/zodiac/details/pisces-12/',
                },
              ],
            },
            {
              title: 'Chinese Signs',
              path: '/chinazodiac/',
              href: '/chinazodiac/',
            },
            {
              title: 'Numerology',
              path: '/numerology/',
              href: '/numerology/',
            },
          ],
        },
        {
          title: 'Tarot',
          path: '/tarot/type/5/',
          href: '/tarot/type/5/',
          childrenShow: true,
          children: [
            {
              title: 'Ai Tarot',
              path: '/tarot/',
              href: '/tarot/',
            },
            {
              title: 'Daily Tarot',
              path: '/tarot/type/4/',
              href: '/tarot/type/4/',
            },
            {
              title: 'Love Tarot',
              path: '/tarot/type/1/',
              href: '/tarot/type/1/',
            },
            {
              title: 'Career Tarot',
              path: '/tarot/type/2/',
              href: '/tarot/type/2/',
            },
            {
              title: 'Yes or No tarot',
              path: '/tarot/type/5/',
              href: '/tarot/type/5/',
            },
            {
              title: 'Universal Tarot',
              path: '/tarot/type/3/',
              href: '/tarot/type/3/',
            },
            {
              title: 'Tarot Cards',
              path: '/tarot/cards/',
              href: '/tarot/cards/',
            },
          ],
        },
        {
          title: 'Compatibility',
          path: '/astrology/',
          href: '/astrology/',
          children: [
            {
              title: 'Love Compatibility',
              path: '/astrology/',
              href: '/astrology/',
            },
            {
              title: 'Pet Compatibility',
              path: '/petinquiry/',
              href: '/petinquiry/',
            },
          ],
        },
        {
          title: 'Quizzes',
          path: '/test/',
          href: '/test/',
        },
        {
          title: 'Articles',
          path: '/resources/',
          href: '/resources/',
        },
      ],
    }
  },
  mounted() {
    if (window.scrollY) this.isScrolled = window.scrollY > 10
    window.addEventListener('scroll', this.handleScroll)

    this.$eventBus.$on('loginForms', (receivedData) => {
      console.log('receivedData', receivedData)
      this.formOf = true
      let bodyStyle = document.body.style
      bodyStyle.overflow = 'hidden'
    })
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    visibleMenu(val) {
      const goTopBtn = document.querySelector('.scroll_to_top')
      if (val && goTopBtn !== null) {
        goTopBtn.style.display = 'none'
      } else if (goTopBtn) {
        goTopBtn.style.display = 'block'
      }
    },
  },
  methods: {
    search() {
      let regSearch = /^.{2,}$/
      let search = this.searchInput
      if (!search || !regSearch.test(search)) {
        this.$store.dispatch('toast', {
          type: 'warning',
          msg: 'Search is required and the length cannot be less than 2',
        })
      } else {
        window.changePageUrl = `/search/?input=${search}`
        window.location = `/search/?input=${search}`
      }
    },
    openSearch() {
      this.isSearch = !this.isSearch
      console.log('点击搜索按钮')
    },
    showDropdown(item) {
      this.isDropdownVisible = item
    },
    hideDropdown() {
      this.isDropdownVisible = -1
      sessionStorage.setItem('firstOpen', 2)
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 10
    },
    showChildren(item) {
      this.isDropdownChildren = item
    },
    hideChildren() {
      this.isDropdownChildren = -1
    },
    //验证子级的路由
    verificationChild(items) {
      if (items) {
        return items.some((it) => this.$route.path.includes(it.path))
      }
    },
    showundes() {
      this.formOf = false
      let bodyStyle = document.body.style
      bodyStyle.overflow = ''
    },
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
.header {
  height: 90px;
  width: 100%;
  &__main {
    width: 100%;
    height: 90px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    transition: background-color 0.3s ease-in-out;

    > div {
      margin: 0 auto;
      width: 100%;
      max-width: 1920px;
      padding: 0 46px 0 48px;
      height: 100%;
      display: flex;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      position: relative;
      .search_icon {
        display: flex;
        align-items: center;
        margin-left: 16px;
        .icon {
          width: 30px;
          height: 30px;
          //   border-radius: 50%;
          //   border: 1px solid rgba(255, 255, 255, 0.24);
          background: url('~assets/img/header/search_h5.svg') no-repeat;
          background-position: center;
          background-size: cover;
          cursor: pointer;
        }
      }
      .search_top {
        position: absolute;
        top: 90px;
        left: 0;
        width: 100%;
        overflow: hidden;
      }
      .logo {
        height: 100%;
        display: flex;
        align-items: center;
        margin-right: auto;
        img {
          width: 100%;
          display: block;
        }
        .img {
          width: 235px;
          object-fit: cover;
        }
      }
      .nav {
        flex: 1;
        display: flex;
        justify-content: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        &__item {
          padding: 0 16px;
          height: 100%;
          display: flex;
          align-items: center;
          position: relative;
          transition: background-color 0.3s ease-in-out;
          span {
            font-family: 'Cinzel Decorative';
            font-weight: 700;
            font-size: 14px;
            line-height: 18px;
            color: rgba(255, 255, 255, 0.6);
          }
          &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2px;
            background-color: #9747ff;
            transform: scaleX(0);
            -webkit-transition: transform 0.3s ease-in-out;
            transition: transform 0.3s ease-in-out;
          }
          &:hover {
            background-color: rgba(255, 255, 255, 0.06);
            &::after {
              -webkit-transform: scaleX(1);
              transform: scaleX(1);
            }
          }
          &.active {
            &::after {
              -webkit-transform: scaleX(1);
              transform: scaleX(1);
            }
            span {
              color: #fff;
            }
          }
          &_children {
            position: absolute;
            top: 100%;
            left: -30%;
            padding: 10px 0;
            width: auto;
            background-color: #000;
            border-radius: 6px;
            .nav_children {
              min-width: 200px;
              height: 42px;
              display: block;
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 42px;
              color: rgba(255, 255, 255, 0.6);
              position: relative;
              padding: 0 20px;
              transition: background-color 0.3s, color 0.3s ease-in-out;
              &::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 1px;
                background: linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0) 0%,
                  rgba(255, 255, 255, 0.2) 50.52%,
                  rgba(255, 255, 255, 0) 100%
                );
              }
              &:hover {
                color: #fff;
                background-color: rgba(255, 255, 255, 0.2);
              }
              .arrow {
                position: absolute;
                right: 20px;
                top: 15px;
                width: 12px;
                height: 12px;
                transform: rotate(-90deg);
              }
              .children_mini {
                position: absolute;
                right: -260px;
                top: -10px;
                background-color: #000;
                border-radius: 6px;
                &_a {
                  position: relative;
                  display: block;
                  max-width: 260px;
                  height: 42px;
                  display: block;
                  font-family: 'Rubik';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 42px;
                  color: rgba(255, 255, 255, 0.6);
                  padding: 0 20px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  cursor: pointer;
                  &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(
                      90deg,
                      rgba(255, 255, 255, 0) 0%,
                      rgba(255, 255, 255, 0.2) 50.52%,
                      rgba(255, 255, 255, 0) 100%
                    );
                  }
                  &:hover {
                    color: #fff;
                    border-radius: 6px;
                    background-color: rgba(255, 255, 255, 0.2);
                  }
                }
              }
            }
          }
        }
      }
      .menu {
        display: none;
      }
    }
  }
  .header_black {
    background-color: #0e0b1b;
  }
}
@media (max-width: (1600px)) {
  .header {
    &__main {
      > div {
        padding: 0 30px;
        .nav {
          &__item {
            padding: 0 16px;
          }
        }
      }
    }
  }
}
@media (max-width: (1366px)) {
  .header {
    height: 60px;
    &__main {
      height: 60px;
      > div {
        .logo {
          height: 100%;
          padding-bottom: 0;
          .img {
            width: 180px;
          }
        }
        .search_icon {
          .icon {
            width: 30px;
            height: 30px;
            background-size: 18px;
          }
        }
        .search_top {
          top: 60px;
        }
        .nav {
          &__item {
            img {
              display: none;
            }
            span {
              margin-top: 0;
              font-size: 12px;
              padding-left: 0;
            }
          }
        }
      }
    }
  }
}
@media (max-width: (1146px)) {
  .header {
    &__main {
      > div {
        .logo {
          margin-right: auto;
        }
        .nav {
          display: none;
        }
        .menu {
          margin-left: 30px;
          display: block;
          width: 30px;
          background: url('~assets/img/header/menu.svg') no-repeat center center;
          background-size: contain;
        }
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .header {
    height: 46 * $pr;
    &__main {
      height: 46 * $pr;
      > div {
        padding: 0 17 * $pr 0 16 * $pr;
        .logo {
          padding-bottom: 0;
          .img {
            width: 172 * $pr;
            height: 30 * $pr;
          }
        }
        .search_icon {
          margin-left: 16 * $pr;
          .icon {
            width: 24 * $pr;
            height: 24 * $pr;
            background-size: cover;
          }
        }
        .search_top {
          top: 46 * $pr;
        }
        .el_login {
          display: none;
        }
        .menu {
          margin-left: 14 * $pr;
          width: 28 * $pr;
        }
      }
    }
  }
}
</style>
