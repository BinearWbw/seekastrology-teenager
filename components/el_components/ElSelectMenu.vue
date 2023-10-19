<template>
  <div class="select">
    <div class="select_menu">
      <div class="menu_sole">
        <a
          :href="`/zodiac/details/${corresponding()[0].name}-${
            corresponding()[0].id
          }/`"
        >
          <div
            class="menu_sole_item"
            :class="{
              active:
                traits.path == $route.path ||
                (traits.path !== '/' && $route.path.includes(traits.path)),
            }"
            @click="gotoMenu"
          >
            <p>{{ `${toUpperBig(names)} ` + traits.name }}</p>
          </div>
        </a>
      </div>
      <div
        class="menu_list"
        v-for="(item, index) in select_menu"
        :key="index"
        v-show="!item.sexId || item.sexId == whetherMaleFemale()"
      >
        <a :href="`${item.path + '-' + ids}/`">
          <div
            class="menu_list_item"
            :class="{
              active:
                item.path == $route.path ||
                (item.path !== '/' && $route.path.includes(item.path)),
            }"
            @click="gotoMenu"
          >
            <p>{{ `${toUpperBig(names)} ` + item.name }}</p>
          </div>
        </a>
      </div>
    </div>
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['names', 'ids'],
  data() {
    return {
      traits: {
        name: 'Traits',
        path: '/zodiac/details/',
      },
      select_menu: [
        {
          name: 'Career',
          sexId: 1,
          path: '/zodiac/type/career',
        },
        {
          name: 'Lover',
          sexId: 1,
          path: '/zodiac/type/lover',
        },
        {
          name: 'Healthy',
          sexId: 1,
          path: '/zodiac/type/healthy',
        },
        {
          name: 'Man',
          path: '/zodiac/type/male',
        },
        {
          name: 'Man Career',
          sexId: 2,
          path: '/zodiac/type/boycareer',
        },
        {
          name: 'Man \n Positivesy&Negativesy',
          sexId: 2,
          path: '/zodiac/type/boyposit',
        },
        {
          name: 'Man Lover',
          sexId: 2,
          path: '/zodiac/type/boyamor',
        },
        {
          name: 'Woman',
          path: '/zodiac/type/woman',
        },
        {
          name: 'Woman Career',
          sexId: 3,
          path: '/zodiac/type/girlcareer',
        },
        {
          name: 'Woman \n Positivesy&Negativesy',
          sexId: 3,
          path: '/zodiac/type/girlposit',
        },
        {
          name: 'Woman Lover',
          sexId: 3,
          path: '/zodiac/type/girlamor',
        },
        {
          name: 'Comratible',
          path: '/zodiac/type/comratible',
        },
      ],
      tabList: [
        {
          name: 'aries',
          id: 1,
        },
        {
          name: 'taurus',
          id: 2,
        },
        {
          name: 'gemini',
          id: 3,
        },
        {
          name: 'cancer',
          id: 4,
        },
        {
          name: 'leo',
          id: 5,
        },
        {
          name: 'virgo',
          id: 6,
        },
        {
          name: 'libra',
          id: 7,
        },
        {
          name: 'scorpio',
          id: 8,
        },
        {
          name: 'sagittarius',
          id: 9,
        },
        {
          name: 'capricorn',
          id: 10,
        },
        {
          name: 'aquarius',
          id: 11,
        },
        {
          name: 'pisces',
          id: 12,
        },
      ],
      isLoading: false,
    }
  },
  mounted() {
    window.addEventListener('pageshow', this.handlePageShow)
  },
  methods: {
    toUpperBig(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    corresponding() {
      const idsSigns = this.tabList.filter((i) => i.id == this.ids)
      return idsSigns
    },
    gotoMenu() {
      this.isLoading = true
    },
    whetherMaleFemale() {
      const isSex =
        this.$route.path.includes('male') || this.$route.path.includes('boy')
          ? 2
          : this.$route.path.includes('woman') ||
            this.$route.path.includes('girl')
          ? 3
          : 1
      return isSex
    },
    handlePageShow() {
      this.isLoading = false
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.select {
  width: 100%;
  &_menu {
    .active {
      background-color: rgba(0, 0, 0, 0.1);
      p {
        color: #fff !important;
      }
    }
    .menu_list {
      a {
        .menu_list_item {
          padding: 16px 0;
          position: relative;
          transition: background-color 0.3s ease-in-out;
          white-space: pre-wrap;
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
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
            background-color: rgba(0, 0, 0, 0.1);
          }
          p {
            color: rgba(255, 255, 255, 0.6);
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
    .menu_sole {
      a {
        .menu_sole_item {
          padding: 16px 0;
          position: relative;
          transition: background-color 0.3s ease-in-out;
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
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
            background-color: rgba(0, 0, 0, 0.1);
          }
          p {
            color: rgba(255, 255, 255, 0.6);
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
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .select {
    width: 100%;
    &_menu {
      display: flex;
      flex-wrap: wrap;
      //   gap: 16 * $pr;
      justify-content: center;

      .active {
        background: rgba(151, 71, 255, 0.2) !important;
      }
      .menu_list {
        padding: 8 * $pr;
        a {
          .menu_list_item {
            padding: 8 * $pr;
            border-radius: 6 * $pr;
            background: var(--9747-ff, #9747ff);
            white-space: initial;
            &::after {
              display: none;
            }
            &:hover {
              background-color: #af78f6;
            }
            p {
              color: #fff;
              font-size: 14 * $pr;
              line-height: 18 * $pr;
            }
          }
        }
      }
      .menu_sole {
        padding: 8 * $pr;
        a {
          .menu_sole_item {
            padding: 8 * $pr;
            border-radius: 6 * $pr;
            background: var(--9747-ff, #9747ff);
            &::after {
              display: none;
            }
            &:hover {
              background-color: #af78f6;
            }
            p {
              color: #fff;
              font-size: 14 * $pr;
              line-height: 18 * $pr;
            }
          }
        }
      }
    }
  }
}
</style>
