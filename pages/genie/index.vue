<template>
  <div class="elf">
    <google-ad :id="'4296525541'" classNames="elf_ad_top"></google-ad>
    <div class="elf_answer">
      <div class="genie">
        <p class="genie_title">Answer Genie</p>
        <p class="genie_text">
          When you are hesitant to make a decision about a small matter in your
          life, seriously ask a question to the Genie and click the button to
          see what he can help you decide!
        </p>
        <div class="genie_book">
          <div class="item">
            <div class="book" v-if="genieStatus">
              <div class="tips">
                Focus on one question, gently click to get the answer
              </div>
              <img class="gently" src="~/assets/img/kundli/book.svg" />
              <button class="button" @click="getTheSprite">Open Book</button>
            </div>
            <div class="book_open" v-else>
              <div class="imgs">
                <div class="gently_text">“ {{ oneOfThese }} “</div>
                <img class="gently" src="~/assets/img/kundli/book_open.png" />
              </div>
              <button class="button" @click="resetSprite">Ask again</button>
            </div>
            <transition name="fade">
              <el-loading-mini v-if="isLoading"></el-loading-mini>
            </transition>
          </div>
        </div>
      </div>
      <div class="genie_el">
        <el-widget></el-widget>
        <google-ad :id="'5568464365'" classNames="genie_ad"></google-ad>
      </div>
    </div>
    <div class="more">
      <p class="title">Horoscopes</p>
      <el-explore-more />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      genieData: [
        'YES',
        'NO',
        'MAYBE',
        'NOT YET',
        'NOT ADVISABLE',
        'ITS FATE',
        'ONLY TIME WILL TELL',
        'PROBABLY',
        'PERHAPS',
        'DOUBTFUL',
        'DEFINITELY',
        'TRUST YOUR INSTINCTS',
        'FIND YOUR VOICE',
        'OF COURSE',
        "DON'T BE OVERLY ANXIOUS, FEAR WILL ONLY RESTRAIN YOU",
        'TRUST THE VOICE WITHIN, IT WILL GUIDE YOUR PATH',
        'KEEP GOING',
        "DON'T WAIT FOR OPPORTUNITIES, CREATE THEM",
        'YOU ARE WORTH WAITING FOR',
        'ACT DECISIVELY',
        'FOLLOW MY HEART',
        'FIND BEAUTY IN EACH DAY, BE THANKFUL FOR LIFE',
        "SEEK ADVICE, OTHERS' EXPERIENCES HELP IN MAKING WISE DECISIONS",
        'UNDERSTAND THE SITUATION THOROUGHLY AND MAKE WISE CHOICES',
        'THE PAST IS EXPERIENCE, THE FUTURE IS OPPORTUNITY, TODAY IS A GIFT',
        'KEEP INNER CALM',
        'LEARN TO LET GO, RELEASE THE PAST',
        "DON'T BE LIMITED BY OLD THOUGHT FRAMEWORKS",
        "DON'T GIVE UP EASILY, PERSIST AND KEEP MOVING FORWARD",
        'ACCEPT YOURSELF',
        'BE MORE COMPOSED',
        "YOU WON'T BE DISAPPOINTED",
        "DON'T BE AFRAID OF CHALLENGES",
        'SEEK FAMILY SUPPORT',
        'FORGET FEAR, BELIEVE IN HOPE',
        'TRUST YOUR INTUITION',
        'MAINTAIN A POSITIVE ATTITUDE',
        "DON'T BE AFRAID TO TRY",
        'SEIZE EVERY OPPORTUNITY',
        "RESPECT OTHERS' VIEWPOINTS, IT MAY INSPIRE YOU",
        "DON'T DWELL IN NEGATIVE THINKING, POSITIVE THINKING CAN CHANGE EVERYTHING",
        'HOLD ONTO YOUR FAITH, FAITH WILL GIVE YOU STRENGTH',
        'LEARN TO RELAX',
        "STICK TO YOUR VALUES, DON'T BE INFLUENCED BY OTHERS",
        "CREATE YOUR OWN DESTINY, DON'T LET OTHERS DECIDE",
        'IGNORE IT',
        'BELIEVE IN YOURSELF, YOU HAVE THE POWER TO CREATE A BRIGHT FUTURE',
        'SEEK POTENTIAL OPPORTUNITIES',
        'LET FAITH DRIVE YOU FORWARD',
        'MAINTAIN A POSITIVE MINDSET',
        "DON'T GIVE UP EASILY, PERSEVERE TO THE END",
        'BELIEVE IN YOURSELF',
        'PRESS FORWARD',
        'BE MORE CALM',
        'EMBRACE NEW CHALLENGES',
        'THIS IS AN ADVENTURE',
        'SEEK NEW OPPORTUNITIES, THEY CAN CHANGE EVERYTHING',
        'TAKE A CHANCE, MAYBE A MIRACLE WILL HAPPEN',
        'SEEK NEW PERSPECTIVES, THEY CAN INSPIRE INNOVATIVE THINKING',
        "EMBRACE CHANGE, IT'S A PART OF LIFE",
        'STAY FLEXIBLE, ADAPTING TO CHANGE IS THE PATH TO SUCCESS',
        'TAKE TIME TO REFLECT',
        'MAKE WISE CHOICES',
        'BELIEVE IN YOURSELF, YOU HAVE THE ABILITY TO OVERCOME CHALLENGES',
        'PERSIST UNTIL SUCCESS IS ACHIEVED',
        'STAND FIRM IN YOUR BELIEFS',
        'BELIEVE CHANGE IS POSSIBLE',
        'EVERY EFFORT IS WORTH IT',
        "DON'T LET FEAR HINDER YOUR PROGRESS",
        'YOU CAN DO IT, EVERY STEP IS PROGRESS',
        "EMBRACE CHANGE, IT'S A SIGN OF GROWTH",
        'RESPECT IS THE SOUL OF RELATIONSHIPS',
        'ENJOY IT',
        'CONSIDER CAREFULLY',
        "DON'T GIVE UP",
        'MAKE GOOD USE OF YOUR RESOURCES',
        "DON'T DOUBT, JUST DO IT",
        'LEARN TO BE GRATEFUL',
        'DEEP UNDERSTANDING',
        'CHOOSE CAREFULLY',
        'CHASE YOUR PASSION BRAVELY, EVEN IF THE ROAD IS ROUGH',
        "DON'T BE TROUBLED BY SMALL ISSUES, STAY RESILIENT",
        'MAKE BRAVE DECISIONS',
        "TRUST YOUR INTUITION, IT'S YOUR COMPASS",
        'SEEK ADVICE FROM OTHERS',
        "DON'T STAY STAGNANT, MOVE FORWARD ACTIVELY",
        'TRUST YOUR INTUITION, IT WILL GUIDE YOU',
        'THINK POSITIVE, LIVE POSITIVE, CHANGE POSITIVELY',
        "DON'T LET THE PAST BOTHER YOU",
        'NEW BEGINNINGS',
        'SEEK MULTIPLE SOLUTIONS',
        "DON'T BE AFRAID OF RISKS",
        'CHERISH IT',
        'BE GRATEFUL FOR THE PRESENT',
        'SEEK NEW PERSPECTIVES',
      ],
      oneOfThese: '',
      genieStatus: true,
      isLoading: false,
    }
  },
  methods: {
    getTheSprite() {
      // 获取随机索引
      const randomIndex = Math.floor(Math.random() * this.genieData.length)
      // 获取随机选择的数据
      this.oneOfThese = this.genieData[randomIndex]

      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.genieStatus = false
      }, 500)
    },
    resetSprite() {
      this.genieStatus = true
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.elf {
  width: 100%;
  padding: 24px 0 48px;
  .elf_ad_top {
    width: 970px;
    height: 275px;
    margin: 0 auto;
  }
  &_answer {
    width: 1400px;
    margin: 24px auto 0;
    display: flex;

    .genie {
      flex: 1;
      &_title {
        color: #fff;
        font-family: Cinzel Decorative;
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 48px;
        margin-bottom: 8px;
      }
      &_text {
        color: rgba(255, 255, 255, 0.6);
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
      }
      &_book {
        width: 100%;
        padding: 3px;
        margin-top: 17px;
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.08) 0%,
          rgba(255, 255, 255, 0) 100%
        );
        .item {
          width: 100%;
          padding: 40px 0 31px;
          border-radius: 21px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          position: relative;
          .book {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            margin: 60px 0 30px;
            .tips {
              padding: 16px 62px;
              color: #fff;
              text-align: center;
              font-family: Rubik;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
              border-radius: 16px;
              background: #9747ff;
              position: relative;
              &::after {
                position: absolute;
                content: '';
                display: block;
                bottom: -12px;
                left: 50%;
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 14px solid #9747ff;
                transform: translateX(-50%) rotate(180deg);
              }
            }
            .gently {
              width: 199px;
              margin: 28px 0 0;
              object-fit: cover;
            }
            .button {
              position: absolute;
              bottom: 84px;
              width: 220px;
              height: 56px;
              padding: 8px 32px;
              flex-shrink: 0;
              border-radius: 42px;
              background: #fff;
              color: #000;
              font-family: Rubik;
              font-size: 22px;
              font-style: normal;
              font-weight: 400;
              line-height: 30px;
            }
          }
          .book_open {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;

            .imgs {
              position: relative;
              .gently_text {
                width: 560px;
                position: absolute;
                top: 40%;
                left: 50%;
                transform: translate(-50%, -40%);
                color: #ffda8b;
                text-align: center;
                font-family: Rubik;
                font-size: 36px;
                font-style: normal;
                font-weight: 500;
                line-height: 48px;
              }
              .gently {
                width: 650px;
                object-fit: cover;
              }
            }
            .button {
              margin-top: 16px;
              width: 220px;
              height: 56px;
              padding: 8px 32px;
              flex-shrink: 0;
              border-radius: 42px;
              background: #fff;
              color: #000;
              font-family: Rubik;
              font-size: 22px;
              font-style: normal;
              font-weight: 400;
              line-height: 30px;
            }
          }
        }
      }
    }
    .genie_el {
      width: 354px;
      margin-left: 102px;
      .genie_ad {
        width: 336px;
        height: 305px;
        margin: 32px auto 0;
      }
    }
  }
  .more {
    width: 1400px;
    margin: 48px auto 0;
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

@media (max-width: 1480px) {
  .elf {
    padding: 24px 30px 48px;
    &_answer {
      width: 100%;
      .genie_el {
        margin-left: 30px;
      }
    }
    .more {
      width: 100%;
    }
  }
}
@media (max-width: 1050px) {
  .elf {
    width: 100%;
    padding: 24px 30px 48px;
    .elf_ad_top {
      width: 90%;
    }
    &_answer {
      display: flex;
      flex-direction: column;
      padding: 0 50px;
      align-items: center;

      .genie {
        flex: inherit;
        margin-bottom: 32px;
      }
      .genie_el {
        width: 554px;
        margin-left: 0;
        .genie_ad {
          width: 90%;
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .elf {
    width: 100%;
    padding: 0 16 * $pr 32 * $pr;
    .elf_ad_top {
      width: 336 * $pr;
      height: 297 * $pr;
      margin: 0 auto;
    }
    &_answer {
      width: 100%;
      margin: 16 * $pr auto 0;
      display: flex;
      flex-direction: column;
      padding: 0;
      align-items: center;

      .genie {
        flex: inherit;
        margin-bottom: 32 * $pr;
        &_title {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
          margin-bottom: 8 * $pr;
          text-align: center;
        }
        &_text {
          font-size: 14 * $pr;
          line-height: 24 * $pr;
          text-align: center;
        }
        &_book {
          width: 100%;
          padding: 3 * $pr;
          margin-top: 32 * $pr;
          border-radius: 24 * $pr;
          border: 1 * $pr solid rgba(255, 255, 255, 0.4);
          .item {
            width: 100%;
            padding: 67 * $pr 0 45 * $pr;
            border-radius: 21 * $pr;
            border: 1 * $pr solid rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(8 * $pr);
            .book {
              margin: 0;
              .tips {
                width: 283 * $pr;
                padding: 8 * $pr 16 * $pr;
                font-size: 14 * $pr;
                line-height: 18 * $pr;
                border-radius: 8 * $pr;
                &::after {
                  bottom: -12 * $pr;
                  border-left: 10 * $pr solid transparent;
                  border-right: 10 * $pr solid transparent;
                  border-bottom: 14 * $pr solid #9747ff;
                }
              }
              .gently {
                width: 199 * $pr;
                margin: 28 * $pr 0 0;
                object-fit: cover;
              }
              .button {
                bottom: 84 * $pr;
                width: 220 * $pr;
                height: 56 * $pr;
                padding: 8 * $pr 32 * $pr;
                flex-shrink: 0;
                border-radius: 42 * $pr;
                background: #fff;
                font-size: 22 * $pr;
                line-height: 30 * $pr;
              }
            }
            .book_open {
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 58.2 * $pr 0 40 * $pr;
              .imgs {
                position: relative;
                .gently_text {
                  width: 100%;
                  position: absolute;
                  top: 20%;
                  left: 50%;
                  transform: translate(-50%, -20%);
                  padding: 0 16 * $pr;
                  font-size: 22 * $pr;
                  line-height: 30 * $pr;
                }
                .gently {
                  width: 100%;
                  object-fit: cover;
                }
              }
              .button {
                margin-top: 32 * $pr;
                width: 163 * $pr;
                height: 44 * $pr;
                padding: 8 * $pr 32 * $pr;
                flex-shrink: 0;
                border-radius: 42 * $pr;
                font-size: 22 * $pr;
                line-height: 30 * $pr;
              }
            }
          }
        }
      }
      .genie_el {
        width: 100%;
        margin-left: 0;
        .genie_ad {
          width: 336 * $pr;
          height: 297 * $pr;
          margin: 32 * $pr auto 0;
        }
      }
    }
    .more {
      margin: 32 * $pr auto 0;
      .title {
        font-size: 22 * $pr;
        line-height: 30 * $pr;
        padding-bottom: 16 * $pr;
      }
    }
  }
}
</style>
