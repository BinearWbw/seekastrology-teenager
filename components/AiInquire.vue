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
              <el-ai-chat :cardData="cardDetails" ref="chat"></el-ai-chat>
            </div>
          </div>
        </div>
        <!-- 卡片选择 -->
        <transition name="fade">
          <div class="ai_question_card" ref="qu_card">
            <div class="content">
              <div class="card_main" v-if="isCard">
                <p class="h5_title">
                  Please choose a card that resonates with you the most.
                </p>
                <i class="icon_off" @click="hideCardNone">
                  <img src="~/assets/img/login/openup.svg" alt="openup" />
                </i>
                <div class="card_list">
                  <div
                    class="card_item"
                    id="TOGGLEACTIVE"
                    v-for="(item, index) in card_list"
                    :class="{ card_active: isFinits == index }"
                    :key="index"
                    @click="toggleActive(index)"
                  >
                    <img :src="item.icon" alt="" />
                  </div>
                  <div class="prohibit" v-if="isProhibit"></div>
                  <transition name="unfold">
                    <div class="pro_text" v-if="isPopupVisible">
                      Please start by asking a question that's deep in your
                      heart.
                    </div>
                  </transition>
                </div>
              </div>
              <div class="card_details" v-if="!isCard">
                <div class="details">
                  <div class="the_img">
                    <div
                      class="imgs"
                      :class="{ imgs_rotate: cardDetails.desc_type == 2 }"
                    >
                      <nuxt-img
                        :src="cardDetails.icon"
                        fit="cover"
                        width="200"
                        height="400"
                        :alt="cardDetails.card_name"
                        loading="lazy"
                        format="auto"
                      ></nuxt-img>
                    </div>
                    <!-- <p class="names">{{ cardDetails.card_name }}</p> -->
                  </div>
                  <div class="contens">
                    <p class="title">{{ cardDetails.card_name }} Card :</p>
                    <div class="texts" v-html="cardDetails.desc"></div>
                    <div class="btns">
                      <a
                        class="more btn"
                        id="SEECARDBTN"
                        target="_blank"
                        :href="`/tarot/details/${cardDetails.card_name
                          .replace(/[^a-zA-Z0-9\\s]/g, '-')
                          .toLowerCase()}-${cardDetails.card_id}/`"
                        >See Card Meanings</a
                      >
                      <button
                        class="pick btn"
                        id="HANDELPICKBTN"
                        :class="{ btnds: isBtn }"
                        @click="handelPick"
                        v-if="!chatFlowDisabled"
                        :disabled="isBtn"
                      >
                        Ask again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="unfold">
      <el-login-form v-show="formOf" @choce="showLogin"></el-login-form>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ElAiChat from './el_components/ElAiChat.vue'
export default {
  components: { ElAiChat },
  data() {
    return {
      card_list: [
        {
          id: 1,
          icon: require('~/assets/img/tarot/card_ais.png'),
        },
        {
          id: 2,
          icon: require('~/assets/img/tarot/card_ais.png'),
        },
        {
          id: 3,
          icon: require('~/assets/img/tarot/card_ais.png'),
        },
        {
          id: 4,
          icon: require('~/assets/img/tarot/card_ais.png'),
        },
        {
          id: 5,
          icon: require('~/assets/img/tarot/card_ais.png'),
        },
        {
          id: 6,
          icon: require('~/assets/img/tarot/card_ais.png'),
        },
        {
          id: 7,
          icon: require('~/assets/img/tarot/card_ais.png'),
        },
        {
          id: 8,
          icon: require('~/assets/img/tarot/card_ais.png'),
        },
        {
          id: 9,
          icon: require('~/assets/img/tarot/card_ais.png'),
        },
        {
          id: 10,
          icon: require('~/assets/img/tarot/card_ais.png'),
        },
        {
          id: 11,
          icon: require('~/assets/img/tarot/card_ais.png'),
        },
        {
          id: 12,
          icon: require('~/assets/img/tarot/card_ais.png'),
        },
      ],
      isFinits: -1,
      isProhibit: false,
      isCard: true,
      cardDetails: {},
      formOf: false,
      isBtn: false,
      meData: false,
      isPopupVisible: false,
      isPopup: null,
    }
  },
  computed: {
    chatFlowDisabled() {
      // 根据子组件的值来判断条件
      return this.$refs.chat.flowDisabled
    },
    ...mapGetters(['getUserInfo']),
  },
  mounted() {
    this.$eventBus.$on('loginShow', (receivedData) => {
      // 处理接收到的数据
      this.formOf = receivedData
      let bodyStyle = document.body.style
      bodyStyle.overflow = 'hidden'
    })
    this.$eventBus.$on('cardSelect', (val) => {
      this.$refs.qu_card.style.display = 'block'
      let bodyStyle = document.body.style
      bodyStyle.overflow = 'hidden'
      this.isCard = true // 打开pc逻辑中关闭的卡片列表
    })
    this.$eventBus.$on('meData', (val) => {
      this.meData = val
    })
  },
  methods: {
    handelPick() {
      this.isCard = true
      this.isFinits = -1
      this.isProhibit = false
    },
    async toggleActive(index) {
      if (!this.meData) {
        this.isPopupVisible = true
        this.isPopup = setTimeout(() => {
          this.isPopupVisible = false
        }, 2000)
        return // 没输入问题,后面都不执行
      }
      this.$eventBus.$emit('disabos', false)
      this.isFinits = index
      this.isProhibit = true
      await this.$apiList.tarot
        .drawTarotAi({
          origin: process.env.origin,
          type: 4,
        })
        .then((res) => {
          if (Array.isArray(res)) {
            this.isCard = false
            this.meData = false
            this.cardDetails = res[0]
            if (window.innerWidth < 751) this.hideCardNone()
            this.isFinits = -1 // 卡片复位
          }
        })
    },
    // 关闭登录弹窗
    showLogin(val) {
      this.formOf = val
      let bodyStyle = document.body.style
      bodyStyle.overflow = ''
    },
    // 关闭选牌弹窗
    hideCardNone() {
      this.$refs.qu_card.style.display = 'none'
      let bodyStyle = document.body.style
      bodyStyle.overflow = ''
    },
  },
  destroyed() {
    if (this.isPopup) clearTimeout(this.isPopup)
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.inquire {
  width: 1400px;
  margin: 0 auto;
  &_main {
    padding-bottom: 56px;
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
            .icon_off {
              display: none;
            }
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
                cursor: not-allowed;
              }
              .pro_text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                padding: 8px 16px;
                background-color: rgba(0, 0, 0, 0.5);
                border-radius: 6px;
                font-family: 'Rubik';
                font-size: 18px;
                font-style: normal;
                font-weight: 400;
                line-height: 24px;
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
              box-sizing: border-box;
              //   overflow-y: scroll;
              //   &::-webkit-scrollbar {
              //     width: 3px; /* Safari,Chrome */
              //     height: 100px;
              //     display: block;
              //   }
              //   &::-webkit-scrollbar-thumb {
              //     background: rgba(255, 255, 255, 0.12);
              //   }
              display: grid;
              place-items: center;
              .the_img {
                display: flex;
                flex-direction: column;
                align-items: center;
                .imgs {
                  width: 200px;
                  height: 400px;
                  margin-bottom: 8px;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                }
                .imgs_rotate {
                  transform: rotate(180deg);
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
                  height: 112px;
                  color: #d2d3d7;
                  font-family: 'Rubik';
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 28px;
                  margin-top: 8px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-line-clamp: 4;
                  -webkit-box-orient: vertical;
                  :deep(h3) {
                    color: #d2d3d7;
                  }
                }
                .btns {
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  margin-top: 16px;
                  gap: 16px;
                  .btn {
                    padding: 10px 32px;
                    border-radius: 42px;
                    text-align: center;
                    font-family: Rubik;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 22px;
                  }
                  .btnds {
                    cursor: not-allowed;
                  }
                  .more {
                    display: block;
                    border: 1px solid rgba(255, 255, 255, 0.48);
                    color: rgba(255, 255, 255, 0.6);
                  }
                  .pick {
                    background-color: #fff;
                    color: #000;
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
                max-height: auto;
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
      padding-bottom: 16 * $pr;
      .ai_question {
        gap: 0;
        position: relative;
        &_inquire {
          flex: initial;
          order: inherit;
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
          position: fixed;
          top: 0;
          order: inherit;
          width: 100%;
          min-width: 100%;
          height: 100%;
          border-radius: 0;
          border: 1 * $pr solid rgba(255, 255, 255, 0.4);
          background-color: rgba(0, 0, 0, 0.1);
          padding: 0;
          z-index: 100;
          display: none;
          .content {
            width: 100%;
            height: 100%;
            border-radius: 21 * $pr;
            border: none;
            background-color: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(8 * $pr);
            padding: 13 * $pr 10 * $pr;
            .card_main {
              width: 100%;
              height: 100%;
              position: relative;
              .icon_off {
                display: inline-block;
                position: absolute;
                width: 30 * $pr;
                height: 30 * $pr;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.4);
                top: 20 * $pr;
                right: 20 * $pr;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              .h5_title {
                font-size: 16 * $pr;
                padding-bottom: 16 * $pr;
                position: relative;
                top: 30 * $pr;
              }
              .card_list {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 6 * $pr 3 * $pr;
                position: relative;
                top: -40 * $pr;
                .prohibit {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  display: none;
                }
                .pro_text {
                  display: none;
                }
                .card_item {
                  width: 76 * $pr;
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
              display: none;
              .details {
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
                    font-size: 22 * $pr;
                    line-height: 30 * $pr;
                  }
                  .texts {
                    font-size: 16 * $pr;
                    line-height: 28 * $pr;
                    margin-top: 8 * $pr;
                    height: 112 * $pr;
                  }
                  .btns {
                    flex-direction: column;
                    margin-top: 8 * $pr;
                    gap: 0;
                    .btn {
                      width: 100%;
                      padding: 8 * $pr 0;
                      border-radius: 42 * $pr;
                      font-size: 16 * $pr;
                      line-height: 22 * $pr;
                    }
                    .more {
                      margin-bottom: 8 * $pr;
                      border: 1 * $pr solid rgba(255, 255, 255, 0.48);
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
}
</style>
