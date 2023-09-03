<template>
  <div class="inquire">
    <div class="inquire_main">
      <div class="ai_question">
        <div class="ai_question_inquire">
          <div class="content">
            <div class="title">
              <div class="title_img">
                <img src="~/assets/img/horroscope/today_tarot.svg" alt="" />
              </div>
              <div class="title_text">TarotBot</div>
            </div>
            <div class="chat_board">
              <!-- AI问答 -->
              <el-ai-chat></el-ai-chat>
            </div>
          </div>
        </div>
        <!-- 卡片选择 -->
        <div class="ai_question_card">
          <div class="content">
            <div class="card_main" v-if="isCard">
              <p class="h5_title">Choose a tarot card first</p>
              <div class="card_list">
                <div
                  class="card_item"
                  v-for="(item, index) in card_list"
                  :class="{ card_active: isFinits == index }"
                  :key="index"
                  @click.once="toggleActive(index)"
                >
                  <img :src="item.icon" alt="" />
                </div>
                <div class="prohibit" v-if="isProhibit"></div>
              </div>
            </div>
            <div class="card_details" v-if="false">
              <div class="details">
                <div class="the_img">
                  <div class="imgs">
                    <img src="../assets/img/tarot/card1.webp" alt="" />
                  </div>
                  <p class="names">The fool</p>
                </div>
                <div class="contens">
                  <p class="title">The First Card (The Past):</p>
                  <div class="texts">
                    The 6 of Cups brings some respite and relief after the
                    stress of the subtle changes that come with the number 5 in
                    the Tarot. On this card, we see a bright and sunny day,
                    children playing in the forefront. One of the children is
                    offering the other a token in the form of a cup, overflowing
                    with gifts and flowers. There are 6 cups all around these
                    figures, and they are all filled with love and gifts. The
                    cups are larger here than in other cups in the Tarot,
                    suggesting love is overflowing. There is a strong sense of
                    nostalgia and the past in this picture. The 6 of Cups brings
                    some respite and relief after the stress of the subtle
                    changes that come with the number 5 in the Tarot. On this
                    card, we see a bright and sunny day, children playing in the
                    forefront. One of the children is offering the other a token
                    in the form of a cup, overflowing with gifts and flowers.
                    There are 6 cups all around these figures, and they are all
                    filled with love and gifts. The cups are larger here than in
                    other cups in the Tarot, suggesting love is overflowing.
                    There is a strong sense of nostalgia and the past in this
                    picture. The 6 of Cups brings some respite and relief after
                    the stress of the subtle changes that come with the number 5
                    in the Tarot. On this card, we see a bright and sunny day,
                    children playing in the forefront. One of the children is
                    offering the other a token in the form of a cup, overflowing
                    with gifts and flowers. There are 6 cups all around these
                    figures, and they are all filled with love and gifts. The
                    cups are larger here than in other cups in the Tarot,
                    suggesting love is overflowing. There is a strong sense of
                    nostalgia and the past in this picture.
                  </div>
                </div>
              </div>
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
      card_list: [
        {
          id: 1,
          icon: require('~/assets/img/tarot/card.png'),
        },
        {
          id: 2,
          icon: require('~/assets/img/tarot/card.png'),
        },
        {
          id: 3,
          icon: require('~/assets/img/tarot/card.png'),
        },
        {
          id: 4,
          icon: require('~/assets/img/tarot/card.png'),
        },
        {
          id: 5,
          icon: require('~/assets/img/tarot/card.png'),
        },
        {
          id: 6,
          icon: require('~/assets/img/tarot/card.png'),
        },
        {
          id: 7,
          icon: require('~/assets/img/tarot/card.png'),
        },
        {
          id: 8,
          icon: require('~/assets/img/tarot/card.png'),
        },
        {
          id: 9,
          icon: require('~/assets/img/tarot/card.png'),
        },
        {
          id: 10,
          icon: require('~/assets/img/tarot/card.png'),
        },
        {
          id: 11,
          icon: require('~/assets/img/tarot/card.png'),
        },
        {
          id: 12,
          icon: require('~/assets/img/tarot/card.png'),
        },
      ],
      isFinits: -1,
      isProhibit: false,
      isCard: true,
    }
  },
  methods: {
    toggleActive(index) {
      console.log('当前', index)
      this.isFinits = index
      this.isProhibit = true
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.inquire {
  width: 1400px;
  margin: 0 auto;
  &_main {
    padding-bottom: 96px;
    .ai_question {
      display: flex;
      height: 757px;
      gap: 16px;
      &_inquire {
        flex: 1;
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        padding: 3px;

        .content {
          width: 100%;
          height: 100%;
          border-radius: 21px;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255, 255, 255, 0.4);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          backdrop-filter: blur(8px);
          padding: 26px 33px;
          .title {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 16px;
            &_img {
              width: 40px;
              height: 40px;
              > img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            &_text {
              color: #fff;
              font-family: 'Cinzel Decorative';
              font-size: 26px;
              font-style: normal;
              font-weight: 700;
              line-height: 36px;
            }
          }
          .chat_board {
            flex: 1;
            width: 100%;
            padding-top: 24px;
          }
        }
      }

      &_card {
        flex: 1;
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        padding: 3px;
        .content {
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
          padding: 33px;

          .card_main {
            width: 100%;
            height: 100%;
            display: grid;
            place-items: center;
            .h5_title {
              display: none;
            }
            .card_list {
              display: grid;
              grid-template-columns: repeat(6, 1fr);
              gap: 12px 0;
              position: relative;
              .prohibit {
                position: absolute;
                left: -55px;
                width: 120%;
                height: 100%;
              }
              .card_item {
                width: 190px;
                height: 322px;
                border-radius: 12px;
                margin-right: -107px; /* 卡片重叠一半的位置 */
                transform: translateX(-30%);
                overflow: hidden;
                cursor: pointer;
                transition: transform 0.3s, box-shadow 0.3s ease-in-out;
                &::before {
                  content: '';
                  position: absolute;
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(
                    0deg,
                    rgba(151, 71, 255, 0.15) 0%,
                    rgba(151, 71, 255, 0.15) 100%
                  );
                }
                &:hover {
                  box-shadow: 0px 0px 9px 3px #9747ff;
                  &::before {
                    background: none;
                  }
                }
                > img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              .card_active {
                box-shadow: 0px 0px 9px 3px #9747ff;
                transform: translate(-30%, -24px);
                &::before {
                  background: none;
                }
              }
            }
          }
          .card_details {
            width: 100%;
            height: 100%;
            .details {
              width: 100%;
              height: 100%;
              overflow-y: scroll;
              box-sizing: border-box;
              &::-webkit-scrollbar {
                width: 3px; /* Safari,Chrome */
                height: 100px;
                display: block;
              }
              &::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.12);
              }
              .the_img {
                display: flex;
                flex-direction: column;
                align-items: center;
                .imgs {
                  width: 150px;
                  height: 300px;
                  margin-bottom: 8px;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                }
                .names {
                  color: rgba(255, 255, 255, 0.6);
                  text-align: center;
                  font-family: 'Rubik';
                  font-size: 22px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 30px;
                }
              }
              .contens {
                padding-top: 24px;
                .title {
                  color: #fff;
                  font-family: 'Cinzel Decorative';
                  font-size: 36px;
                  font-style: normal;
                  font-weight: 700;
                  line-height: 48px; /* 133.333% */
                }
                .texts {
                  color: #d2d3d7;
                  font-family: 'Rubik';
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 28px;
                  margin-top: 8px;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1500px) {
  .inquire {
    width: 100%;
    &_main {
      .ai_question {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: auto;
        gap: 16px;
        &_inquire {
          flex: initial;
          order: 2;
          width: 80%;
          min-width: 692px;
          height: 757px;
        }

        &_card {
          flex: initial;
          order: 1;
          width: 80%;
          min-width: 692px;
          .content {
            .card_main {
              .h5_title {
                display: block;
                color: #fff;
                font-family: 'Rubik';
                font-size: 22px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                text-align: center;
                padding-bottom: 24px;
              }
            }
            .card_details {
              .details {
                max-height: 700px;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .inquire {
    width: 100%;
    &_main {
      padding-bottom: 48 * $pr;
      .ai_question {
        gap: 24 * $pr;
        &_inquire {
          flex: initial;
          order: 2;
          width: 100%;
          min-width: 100%;
          height: 547 * $pr;
          border-radius: 24 * $pr;
          border: 1 * $pr solid rgba(255, 255, 255, 0.4);
          padding: 3 * $pr;

          .content {
            width: 100%;
            height: 100%;
            border-radius: 21 * $pr;
            display: flex;
            flex-direction: column;
            border: 1 * $pr solid rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(8 * $pr);
            padding: 16 * $pr 10 * $pr 11 * $pr;
            .title {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 6 * $pr;
              &_img {
                width: 22 * $pr;
                height: 22 * $pr;
              }
              &_text {
                color: #fff;
                font-family: 'Cinzel Decorative';
                font-size: 18 * $pr;
                font-style: normal;
                font-weight: 700;
                line-height: 26 * $pr;
              }
            }
            .chat_board {
              flex: 1;
              width: 100%;
              padding-top: 12 * $pr;
            }
          }
        }

        &_card {
          flex: initial;
          order: 1;
          width: 100%;
          min-width: 100%;
          border-radius: 24 * $pr;
          border: 1 * $pr solid rgba(255, 255, 255, 0.4);
          padding: 3 * $pr;
          .content {
            width: 100%;
            height: 100%;
            border-radius: 21 * $pr;
            border: 1 * $pr solid rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(8 * $pr);
            padding: 13 * $pr 10 * $pr;
            .card_main {
              width: 100%;
              height: 100%;
              .h5_title {
                font-size: 16 * $pr;
                padding-bottom: 16 * $pr;
              }
              .card_list {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 6 * $pr 3 * $pr;
                position: relative;
                .prohibit {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                }
                .card_item {
                  width: auto;
                  height: 130 * $pr;
                  border-radius: 12 * $pr;
                  margin-right: 0; /* 卡片重叠一半的位置 */
                  transform: initial;
                  position: relative;
                  &::before {
                    content: '';
                    position: absolute;
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                  }
                  &:hover {
                    box-shadow: 0 0 9 * $pr 3 * $pr #9747ff;
                    &::before {
                      background: none;
                    }
                  }
                }
                .card_active {
                  box-shadow: 0 0 9 * $pr 3 * $pr #9747ff;
                  transform: translate(0, -12 * $pr);
                  &::before {
                    background: none;
                  }
                }
              }
            }
            .card_details {
              .details {
                max-height: 440 * $pr;
                &::-webkit-scrollbar {
                  width: 3 * $pr; /* Safari,Chrome */
                  display: block;
                }
                .the_img {
                  .imgs {
                    width: 81 * $pr;
                    height: 163 * $pr;
                    margin-bottom: 4 * $pr;
                  }
                  .names {
                    font-size: 16 * $pr;
                    line-height: 22 * $pr;
                  }
                }
                .contens {
                  padding-top: 16 * $pr;
                  .title {
                    font-size: 26 * $pr;
                    line-height: 36 * $pr;
                  }
                  .texts {
                    font-size: 16 * $pr;
                    line-height: 28 * $pr;
                    margin-top: 8 * $pr;
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
</style>
