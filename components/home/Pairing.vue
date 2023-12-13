<template>
  <div class="pairing_two">
    <div class="pairing_two_main">
      <div class="select_main">
        <p class="title">Compatibility</p>
        <p>Please choose your partner's horoscope</p>
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
          GET YOUR COMPATIBILITY
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
          window.changePageUrl = `/astrology/?from=home`
        window.location.href = `/astrology/?from=home`
      } else if (!this.genderList.males && !this.genderList.females) {
        window.changePageUrl = `/astrology/?from=home`
        window.location.href = `/astrology/?from=home`
      } else {
        // 提示通知
        this.$notification.open({
          message: 'Stop',
          description: 'Please choose two Star sign.',
          duration: 2,
          style: {
            color: '#f00',
          },
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.pairing_two {
  &_main {
    width: 456px;
    .select_main {
      min-height: 282px;
      border-radius: 16px;
      background: rgba(255, 83, 207, 0.5);
      padding: 24px 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .title {
        color: #fff;
        font-family: 'Cinzel Decorative';
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 30px;
        text-align: center;
        margin-bottom: 8px;
      }
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
        padding: 8px 0 11px;
        .icons {
          display: inline-block;
          width: 72px;
          height: 60px;
          background: url('~/assets/img/home/pairing_two.svg') no-repeat center
            center;
          background-size: cover;
        }
        :deep(.selected_title) {
          display: none;
        }
      }
      .button {
        width: 259px;
        height: 44px;
        color: #000;
        font-family: 'Rubik';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
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
      .select_main {
        height: auto;
        min-height: auto;
        border-radius: 12 * $pr;
        padding: 16 * $pr 14 * $pr;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .title {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
          margin-bottom: 16 * $pr;
        }
        > p {
          font-size: 14 * $pr;
          line-height: 18 * $pr;
        }
        &_item {
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 16 * $pr 0;
          .icons {
            width: 71 * $pr;
            height: 60 * $pr;
          }
        }
        .button {
          width: 259 * $pr;
          height: 44 * $pr;
          font-size: 16 * $pr;
          font-weight: 400;
          line-height: 22 * $pr;
          padding: 8 * $pr 0;
          border-radius: 42 * $pr;
        }
      }
    }
  }
}
</style>
