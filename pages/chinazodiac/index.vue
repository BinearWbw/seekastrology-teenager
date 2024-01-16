<template>
  <div class="china">
    <div class="china_zodiac">
      <!-- <google-ad :id="'5954072207'" classNames="google_top"></google-ad> -->
      <div class="sage">
        <div class="sage_title">
          <p class="li">What is Chinese Zodiac?</p>
          <p class="tes">
            Known as the "Chinese Zodiac" or "Book of Elephants", the Chinese
            Zodiac has its origins in ancient zoology and has occupied a pivotal
            position in Chinese culture for more than 2,000 years. In China, the
            12 zodiac signs are not only used to represent the year, but are
            also believed to influence a person's personality, career,
            compatibility, marriage and wealth. You can use the Chinese Zodiac
            Calculator to search for your zodiac sign.
          </p>
        </div>
        <div class="el_zod">
          <el-china-zodiac></el-china-zodiac>
        </div>
        <google-ad :id="'1860319499'" classNames="google_top"></google-ad>
        <el-sign-new></el-sign-new>
        <div class="romantic">
          <p class="romantic_title">
            Personality and (romantic) compatibility between Chinese Zodiac
            signs
          </p>
          <div class="romantic_text" v-for="i in localityData" :key="i.id">
            <span class="start">{{ i.name }}</span>
            <span class="desc">{{ i.desc }}</span>
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
    return {
      localityData: [
        {
          name: 'The Mouse',
          desc: 'is compatible with the Dragon, the Monkey and the Buffalo; it is incompatible with the Goat, the Horse and the Rabbit. The Mouse is wise, ambitious and persuasive.',
        },
        {
          name: 'The Buffalo',
          desc: 'is compatible with the Mouse, the Snake and the Rooster; it is incompatible with the Horse, the Dog and the Goat. The Buffalo is loyal, trustworthy and determined.',
        },
        {
          name: 'The Tiger',
          desc: 'is compatible with the Horse and the Dog; it is incompatible with the Snake and the Monkey. The tiger is courageous and charismatic. In other words, a leader.',
        },
        {
          name: 'The Rabbit',
          desc: 'is compatible with the Goat, the Pig and the Dog; it is destined to divorce with the Mouse and the Dragon. The Rabbit is modest, sincere and sociable.',
        },
        {
          name: 'The Dragon',
          desc: 'is compatible with the Mouse, the Monkey and the Rooster; it is incompatible with the Buffalo, the Rabbit and the Dog. The Dragon is eccentric and spiritual. An artist.',
        },
        {
          name: 'The Snake',
          desc: 'is compatible with the Buffalo and the Rooster; it is destined to divorce with the Tiger and the Pig. The Snake is intelligent, intuitive and elegant.',
        },
        {
          name: 'The Horse',
          desc: 'is compatible with the Tiger, the Goat and the Dog; it is incompatible with the Mouse, the Buffalo and the Rabbit. The Horse is loyal, ambitious and strong.',
        },
        {
          name: 'The Goat',
          desc: 'is compatible with the Rabbit, Horse and Pig; it is incompatible with the Buffalo and the Dog. The Goat is sensible, calm and given to certain tastes.',
        },
        {
          name: 'The Monkey',
          desc: 'is compatible with the Mouse, the Dragon and the Snake; it is incompatible with the Tiger and the Pig. The Monkey is lucky, versatile and clever.',
        },
        {
          name: 'The Rooster',
          desc: 'is compatible with the Buffalo, the Dragon and the Snake; it is incompatible with the Mouse, the Rabbit and the Horse. The Rooster is energetic, honest and flexible.',
        },
        {
          name: 'The Dog',
          desc: 'is compatible with the Tiger, Rabbit and Horse; it is incompatible with the Buffalo, Dragon, Goat and Rooster. The dog is loyal. courageous and adaptable.',
        },
        {
          name: 'The Pig',
          desc: 'is compatible with the Goat and the Rooster; it is incompatible with the Snake, the Monkey and... the Pig. The Pig is determined, optimistic and sincere.',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.china {
  width: 100%;
  padding: 48px 0 56px;
  &_zodiac {
    width: 1400px;
    margin: 0 auto;
    .google_top {
      width: 970px;
      height: 275px;
      margin: 24px auto;
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
    padding: 24 * $pr 0 32 * $pr;
    &_zodiac {
      width: 100%;
      margin: 0 auto;
      padding: 0 16 * $pr;
      .google_top {
        width: 336 * $pr;
        height: 297 * $pr;
        margin: 32 * $pr auto;
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
            display: inline-block;
            .start {
              color: #9747ff;
              padding-right: 4 * $pr;
            }
            &::before {
              width: 8 * $pr;
              height: 8 * $pr;
              left: 0;
              top: 8 * $pr;
              border-radius: 50%;
              transform: inherit;
            }
            .desc {
              -webkit-line-clamp: unset;
              display: inline;
              overflow: visible;
              white-space: normal;
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
