<template>
  <div class="tarot-container">
    <Loading v-if="loading" />
    <div class="title mt-75 mt-44-mobile">the major</div>
    <div class="tarot-section">
      <!-- <div class="add-box-wrapper mt-48_minus">
        <google-ad classNames="ad-box" id="3171147457"></google-ad>
      </div> -->
      <div class="tarot-box">
        <ul class="major-list">
          <li
            class="major-list-item"
            v-for="(item, index) in majorList"
            :key="index"
          >
            <a
              class="major-list-link"
              :href="`/tarot/details/${item.name
                .replace(/[^a-zA-Z0-9\\s]/g, '-')
                .toLowerCase()}-${item.id}/`"
            >
              <nuxt-img
                class="major-item-img"
                :src="item.icon || '/'"
                :alt="item.name"
                width="194"
                height="388"
                :data-id="item.id"
                :options="{ modifiers: { lazy: true } }"
                loading="lazy"
                format="auto"
              ></nuxt-img>
              <div class="item-text" :data-id="item.id">
                {{ item.name }}
              </div></a
            >
          </li>
        </ul>
      </div>
      <!-- <div class="add-box-wrapper mt-48_minus">
        <google-ad classNames="ad-box" id="6918820771"></google-ad>
      </div> -->
    </div>
    <google-auto-ad classNames="ad-box_row mt-32" id="9736555803" />
    <div class="title mt-48">minor arcana definitions</div>
    <div class="minor-tab" @click="toggleMinor">
      <button
        class="button"
        :class="{ selected: minorType === 'wandsList' }"
        data-type="wandsList"
      >
        The Suit of Wands
      </button>
      <button
        class="button"
        :class="{ selected: minorType === 'cupsList' }"
        data-type="cupsList"
      >
        The Suit of Cups
      </button>
      <button
        class="button"
        :class="{ selected: minorType === 'swordsList' }"
        data-type="swordsList"
      >
        The Suit of Swords
      </button>
      <button
        class="button"
        :class="{ selected: minorType === 'pentaclesList' }"
        data-type="pentaclesList"
      >
        The Suit of Pentacles
      </button>
    </div>
    <ul class="minor-list">
      <li
        class="minor-list-item"
        v-for="(item, index) in minorList"
        :key="index"
      >
        <a
          :href="`/tarot/details/${item.name
            .replace(/[^a-zA-Z0-9\\s]/g, '-')
            .toLowerCase()}-${item.id}/`"
        >
          <nuxt-img
            class="minor-item-img"
            :src="item.icon || '/'"
            fit="cover"
            width="194"
            height="388"
            :alt="item.name"
            loading="lazy"
            :options="{ modifiers: { lazy: true } }"
            format="auto"
          ></nuxt-img>
          <div class="item-text">{{ item.name }}</div>
        </a>
      </li>
    </ul>
    <google-auto-ad classNames="ad-box_row mt-48 mb-32" id="6311466051" />
  </div>
</template>

<script>
import Loading from '../../../components/Loading.vue'

export default {
  name: 'cards',
  components: {
    Loading,
  },
  data() {
    return {
      loading: true,
      minorType: 'wandsList',
      majorList: [],
      minorList: [],
      wandsList: [],
      cupsList: [],
      swordsList: [],
      pentaclesList: [],
    }
  },
  async asyncData({ error, $apiList }) {
    try {
      const data = await $apiList.tarot.getTarotList({
        origin: process.env.origin,
      })
      let res = {
        majorList: [],
        minorList: [],
        wandsList: [],
        cupsList: [],
        swordsList: [],
        pentaclesList: [],
      }
      if (data && data.length) {
        data.forEach((ele) => {
          if (ele.type == 1) {
            res.majorList.push(ele)
          } else {
            let map = {
              1: res.wandsList,
              2: res.cupsList,
              3: res.swordsList,
              4: res.pentaclesList,
            }
            map[ele.main_type].push(ele)
          }
        })
      }
      res.minorList = res.wandsList
      res.loading = false
      return res
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
  mounted() {
    // this.getDatas()
  },
  methods: {
    async getDatas() {
      this.loading = true
      const data = await this.$apiList.tarot.getTarotList({
        origin: process.env.origin,
      })
      this.loading = false
      const result = this.formatData(data)
      this.majorList = result.majorList
      this.minorList = result.minorList
      this.wandsList = result.wandsList
      this.cupsList = result.cupsList
      this.swordsList = result.swordsList
      this.pentaclesList = result.pentaclesList
    },
    formatData(data) {
      let res = {
        majorList: [],
        minorList: [],
        wandsList: [],
        cupsList: [],
        swordsList: [],
        pentaclesList: [],
      }
      if (data && data.length) {
        data.forEach((ele) => {
          if (ele.type == 1) {
            res.majorList.push(ele)
          } else {
            let map = {
              1: res.wandsList,
              2: res.cupsList,
              3: res.swordsList,
              4: res.pentaclesList,
            }
            map[ele.main_type].push(ele)
          }
        })
      }
      res.minorList = res.wandsList
      return res
    },
    toggleMinor(event) {
      if (event.target.nodeName === 'BUTTON') {
        this.minorType = event.target.dataset.type
        this.minorList = this[event.target.dataset.type]
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.tarot-container {
  color: #fff;
}
.title {
  font-family: 'Cinzel Decorative';
  font-style: normal;
  font-weight: 700;
  font-size: 46px;
  line-height: 64px;
  text-align: center;
}
.tarot-section {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  .add-box-wrapper {
    width: 160px;
    height: 600px;
  }
  .ad-box {
    position: fixed;
    width: 160px;
    height: 600px;
    background-color: #555761;
  }
  .tarot-box {
    flex: 1;
    max-width: 1400px;
  }
  .major-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 219px);
    justify-content: center;
    .major-list-item {
      text-align: center;
      margin-bottom: 40px;
      -webkit-transition: transform 0.3s ease-in-out;
      transition: transform 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        transform: translateY(-15px);
      }
    }
    .major-item-img {
      height: 388px;
    }
  }
}
.minor-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 188px);
  justify-content: center;
  grid-column-gap: 12px;
  max-width: 1400px;
  margin: 40px auto 0;
  .minor-list-item {
    text-align: center;
    margin-bottom: 40px;
    -webkit-transition: transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      transform: translateY(-20px);
    }
    .minor-item-img {
      height: 388px;
    }
  }
}
.item-text {
  margin-top: 12px;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  color: rgba(255, 255, 255, 0.6);
}
.ad-box_row {
  width: 1200px;
  margin: 0 auto;
}
.minor-tab {
  text-align: center;
  margin-top: 24px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    height: 1px;
    left: 0px;
    right: 0px;
    bottom: -22px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50.52%,
      rgba(255, 255, 255, 0) 100%
    );
  }
}
.button {
  margin: 0 12px;
  box-sizing: border-box;
  padding: 8px 22px;
  font-family: 'Rubik';
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  line-height: 18px;
  white-space: nowrap;
  &:hover {
    color: #000;
    background-color: #fff;
    border-radius: 42px;
  }
}
.selected {
  color: #000;
  background-color: #fff;
  border-radius: 42px;
}
.mt-48 {
  margin-top: 48px;
}
.mt-48_minus {
  margin-top: -48px;
}
.mt-32 {
  margin-top: 32px;
}
.mb-32 {
  margin-bottom: 32px;
}
.mt-75 {
  margin-top: 75px;
}
.mt-200 {
  margin-top: 200px;
}
@media (max-width: 1500px) {
  .minor-list {
    display: grid;
    grid-template-columns: repeat(6, auto);
  }
}
@media (max-width: 1450px) {
  .ad-box_row {
    max-width: 100%;
  }
  .tarot-section {
    padding: 0 30px;
  }
}

@media (max-width: 1400px) {
  .minor-list {
    display: grid;
    grid-template-columns: repeat(5, auto);
  }
}
@media (max-width: 1300px) {
  .ad-box_row {
    max-width: 100%;
    padding: 0 50px;
  }
}

@media (max-width: 1120px) {
  .minor-list {
    display: grid;
    grid-template-columns: repeat(4, auto);
  }
}

@media (max-width: 950px) {
  .minor-list {
    display: grid;
    grid-template-columns: repeat(3, auto);
  }
  .title {
    padding: 0 20px;
  }
  .minor-tab {
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .tarot-container {
    padding: 16 * $pr;
  }
  .add-box-wrapper {
    display: none;
  }
  .ad-box_row {
    width: 100%;
    padding: 0;
  }
  .title {
    font-family: 'Cinzel Decorative';
    font-style: normal;
    font-weight: 700;
    font-size: 36 * $pr;
    line-height: 48 * $pr;
    text-align: center;
  }
  .tarot-section {
    padding: 0;
    .major-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .major-list-item {
        width: 106 * $pr;
        .major-item-img {
          width: 100%;
          height: 213 * $pr;
        }
        .item-text {
          font-family: 'Rubik';
          font-style: normal;
          font-weight: 400;
          font-size: 14 * $pr;
          line-height: 18 * $pr;
        }
        &:hover {
          transform: translateY(0);
        }
      }
    }
  }
  .minor-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 106 * $pr);
    .minor-list-item {
      .minor-item-img {
        height: 213 * $pr;
      }
      .item-text {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 14 * $pr;
        line-height: 18 * $pr;
      }
    }
  }

  .minor-tab {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    text-align: center;
    margin-top: 48 * $pr;
    position: relative;
    justify-content: initial;
    &::-webkit-scrollbar {
      display: block;
    }
    padding-bottom: 10 * $pr;
    &::after {
      content: '';
      position: absolute;
      height: 1px;
      left: 0px;
      right: 0px;
      bottom: -22px;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.2) 50.52%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }

  .button {
    margin: 0 10 * $pr;
    box-sizing: border-box;
    padding: 8 * $pr 16 * $pr;
    font-family: 'Rubik';
    color: rgba(255, 255, 255, 0.6);
    font-size: 14 * $pr;
    line-height: 18 * $pr;
    white-space: nowrap;
    &:hover {
      color: rgba(255, 255, 255, 0.6);
      background-color: initial;
    }
  }
  .selected {
    color: #000 !important;
    background-color: #fff !important;
    border-radius: 42 * $pr;
  }

  .mt-44-mobile {
    margin-top: 44 * $pr;
  }
}
</style>
