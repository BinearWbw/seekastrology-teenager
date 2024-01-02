<template>
  <div class="china">
    <div class="china_zodiac">
      <google-ad :id="''" classNames="google_top"></google-ad>
      <div class="sage">
        <div class="sage_title">
          <p class="li">What is Chinese Zodiac?</p>
          <p class="tes">
            he Chnese zodac, known as sheng &ao or shu ang, teatres 12 anima
            signs n this order at, 0x, ior, Habbit, Dragon, snake, Morse, sheep,
            Monkey, $ooster, Jog and igrioinated trom anrient zonlatvy and
            boastino a history of more than 2 0 vears, it plavs an esential rol
            in Chinese cuture. The 2 Chinese zodiac arimals n a cycle are not
            onyed to eoresent vears n chima, but al beeved to mtuence oeooe s
            nersona tes, carer, comoatb iy, marrade. and fortume, 'ou can use
            the zodiac cacuator to searct for our Chinese zodiac animal sign.
          </p>
        </div>
        <div class="el_zod">
          <el-china-zodiac></el-china-zodiac>
        </div>
        <el-sign-new :zodiac="chinaZodia"></el-sign-new>
        <div class="romantic">
          <p class="romantic_title">
            Personality and (romantic) compatibility between Chinese Zodiac
            signs
          </p>
          <div class="romantic_text" v-for="i in chinaZodia" :key="i.id">
            <span class="start">The {{ i.name }} </span>
            <span class="desc" v-html="i.desc"></span>
          </div>
        </div>
        <div class="more">
          <p class="title">Horoscopes</p>
          <el-explore-more />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ error, $apiList, params }) {
    try {
      let chinaZodia = await $apiList.test.getAnimals().then((res) => {
        return res
      })
      return {
        chinaZodia,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.china {
  width: 100%;
  padding: 24px 0 56px;
  &_zodiac {
    width: 1400px;
    margin: 0 auto;
    .google_top {
      width: 970px;
      height: 275px;
      margin: 0 auto 24px;
    }
    .sage {
      &_title {
        .li {
          color: #fff;
          text-align: center;
          font-family: Cinzel Decorative;
          font-size: 22px;
          font-style: normal;
          font-weight: 700;
          line-height: 30px;
          margin-bottom: 16px;
        }
        .tes {
          color: rgba(255, 255, 255, 0.6);
          font-family: Rubik;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px;
        }
      }
      .el_zod {
        display: flex;
        justify-content: center;
        margin: 56px 0;
      }
      .romantic {
        display: grid;
        gap: 16px;
        margin: 56px 0;
        &_title {
          color: #fff;
          font-family: Rubik;
          font-size: 22px;
          font-style: normal;
          font-weight: 400;
          line-height: 30px;
        }
        &_text {
          display: flex;
          font-family: Rubik;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
          color: rgba(255, 255, 255, 0.6);
          padding-left: 16px;
          position: relative;
          .start {
            color: #9747ff;
            width: auto;
            padding-right: 8px;
          }
          .desc {
            flex: 1;
            overflow: hidden;
            white-space: normal;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            display: -webkit-box;
          }
          &::before {
            position: absolute;
            display: block;
            width: 8px;
            height: 8px;
            content: '';
            background: #9747ff;
            left: 0;
            top: 50%;
            border-radius: 50%;
            transform: translateY(-50%);
          }
        }
      }
      .more {
        .title {
          color: #fff;
          text-align: center;
          font-family: Cinzel Decorative;
          font-size: 22px;
          font-style: normal;
          font-weight: 700;
          line-height: 30px;
        }
        :deep(.explore_main) {
          .title {
            display: none;
          }
        }
      }
    }
  }
}
@media (max-width: 1480px) {
  .china {
    width: 100%;
    padding: 24px 30px 56px;
    &_zodiac {
      width: 100%;
    }
  }
}

@media (max-width: 1050px) {
  .china {
    &_zodiac {
      .google_top {
        width: 90%;
        height: 275px;
        margin: 0 auto;
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .china {
    width: 100%;
    padding: 0 0 32 * $pr;
    &_zodiac {
      width: 100%;
      margin: 0 auto;
      padding: 0 16 * $pr;
      .google_top {
        width: 336 * $pr;
        height: 297 * $pr;
        margin: 0 auto 32 * $pr;
      }
      .sage {
        &_title {
          .li {
            font-size: 22 * $pr;
            line-height: 30 * $pr;
            margin-bottom: 16 * $pr;
          }
          .tes {
            font-size: 14 * $pr;
            line-height: 24 * $pr;
          }
        }
        .el_zod {
          display: flex;
          justify-content: center;
          margin: 32 * $pr 0;
        }
        .romantic {
          display: grid;
          gap: 16 * $pr;
          margin: 32 * $pr 0;
          &_title {
            font-size: 22 * $pr;
            line-height: 30 * $pr;
            text-align: center;
          }
          &_text {
            font-size: 14 * $pr;
            line-height: 24 * $pr;
            padding-left: 16 * $pr;
            position: relative;
            .start {
              color: #9747ff;
              padding-right: 8 * $pr;
            }
            &::before {
              width: 8 * $pr;
              height: 8 * $pr;
              left: 0;
              top: 8 * $pr;
              border-radius: 50%;
              transform: inherit;
            }
          }
        }
        .more {
          .title {
            font-size: 22 * $pr;
            line-height: 30 * $pr;
            padding-bottom: 16 * $pr;
          }
        }
      }
    }
  }
}
</style>
