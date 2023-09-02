<template>
  <div class="pairing_two">
    <div class="pairing_two_main">
      <p class="title">ZODIAC COMPATIBILITY</p>
      <div class="select_main">
        <p>Choose Two Zodiac Signs</p>
        <div class="select_main_item">
          <el-selected-two
            :options="selectOptions"
            :title="'First Sign'"
            @change="handleDropdownChangeLeft"
          ></el-selected-two>
          <i class="icons"></i>
          <el-selected-two
            :options="selectOptions"
            :title="'Second Sign'"
            @change="handleDropdownChangeRight"
          >
          </el-selected-two>
        </div>
        <button class="button" id="SIGNPAIR" @click="getStartPairingEl">
          Check Compatibility
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectOptions: [
        {
          name: 'Aries',
          imgUrl: require('~/assets/img/home/choice/Aries.png'),
          id: 1,
        },
        {
          name: 'Taurus',
          imgUrl: require('~/assets/img/home/choice/Taurus.png'),
          id: 2,
        },
        {
          name: 'Gemini',
          imgUrl: require('~/assets/img/home/choice/Gemini.png'),
          id: 3,
        },
        {
          name: 'Cancer',
          imgUrl: require('~/assets/img/home/choice/Cancer.png'),
          id: 4,
        },
        {
          name: 'Leo',
          imgUrl: require('~/assets/img/home/choice/Leo.png'),
          id: 5,
        },
        {
          name: 'Virgo',
          imgUrl: require('~/assets/img/home/choice/Virgo.png'),
          id: 6,
        },
        {
          name: 'Libra',
          imgUrl: require('~/assets/img/home/choice/Libra.png'),
          id: 7,
        },
        {
          name: 'Scorpio',
          imgUrl: require('~/assets/img/home/choice/Scorpio.png'),
          id: 8,
        },
        {
          name: 'Sagittarius',
          imgUrl: require('~/assets/img/home/choice/Sagittarius.png'),
          id: 9,
        },
        {
          name: 'Capricorn',
          imgUrl: require('~/assets/img/home/choice/Capricorn.png'),
          id: 10,
        },
        {
          name: 'Aquarius',
          imgUrl: require('~/assets/img/home/choice/Aquarius.png'),
          id: 11,
        },
        {
          name: 'Pisces',
          imgUrl: require('~/assets/img/home/choice/Pisces.png'),
          id: 12,
        },
      ],
      genderList: {
        males: '',
        malesId: 0,
        females: '',
        femalesId: 0,
      },
    }
  },
  methods: {
    handleDropdownChangeLeft(option) {
      this.genderList.males = option.name.toLowerCase()
      this.genderList.malesId = option.id
    },
    handleDropdownChangeRight(option) {
      this.genderList.females = option.name.toLowerCase()
      this.genderList.femalesId = option.id
    },
    getStartPairingEl() {
      if (this.genderList.males && this.genderList.females) {
        sessionStorage.setItem('genderList', JSON.stringify(this.genderList))
        if (sessionStorage.getItem('genderList'))
          window.changePageUrl = `/astrology/`
        window.location.href = `/astrology/`
      } else if (!this.genderList.males && !this.genderList.females) {
        window.changePageUrl = `/astrology/`
        window.location.href = `/astrology/`
      } else {
        alert('please choose two Star sign')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.pairing_two {
  &_main {
    width: 425px;
    .title {
      color: #fff;
      font-family: 'Cinzel Decorative';
      font-size: 26px;
      font-style: normal;
      font-weight: 700;
      line-height: 36px;
      text-align: center;
    }
    .select_main {
      height: auto;
      border-radius: 12px;
      margin-top: 16px;
      background: rgba(255, 255, 255, 0.08);
      padding: 16px 25px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      > p {
        color: rgba(255, 255, 255, 0.6);
        font-family: 'Rubik';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        text-align: center;
      }
      &_item {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 34px 0 16px;
        .icons {
          display: inline-block;
          width: 72px;
          height: 60px;
          background: url('~/assets/img/home/pairing_two.svg') no-repeat center
            center;
          background-size: cover;
        }
      }
      .button {
        width: 220px;
        color: #000;
        font-family: 'Rubik';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        padding: 8px 0;
        background-color: #fff;
        border-radius: 42px;
      }
    }
  }
}

@media (max-width: 1250px) {
  .pairing_two {
    &_main {
      width: 100%;
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .pairing_two {
    &_main {
      width: 100%;
      .title {
        font-size: 26 * $pr;
        line-height: 36 * $pr;
        padding: 0 20 * $pr;
      }
      .select_main {
        height: auto;
        border-radius: 12 * $pr;
        margin-top: 16 * $pr;
        background: rgba(255, 255, 255, 0.08);
        padding: 16 * $pr 14 * $pr;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        > p {
          font-size: 14 * $pr;
          line-height: 18 * $pr;
        }
        &_item {
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 34 * $pr 0 16 * $pr;
          .icons {
            width: 71 * $pr;
            height: 60 * $pr;
          }
        }
        .button {
          width: 220 * $pr;
          font-size: 14 * $pr;
          font-weight: 400;
          line-height: 18 * $pr;
          padding: 8 * $pr 0;
          border-radius: 42 * $pr;
        }
      }
    }
  }
}
</style>
