<template>
  <div class="user_main">
    <div class="user_avatar">
      <div class="toggle_img">
        <div class="imgs" @click="triggerInput">
          <div class="file_img">
            <input
              type="file"
              name="image"
              :accept="fileType.join(',')"
              @change="onchangeImgs"
              class="upload_com"
              ref="uploadInput"
            />
            <img :src="userImgIcon" alt="user" />
          </div>
          <div class="toggle">
            <img class="imgs" src="~/assets/img/login/Group.svg" alt="group" />
          </div>
        </div>
        <div class="account_edit">
          <div class="account">
            <p class="names">
              {{
                getUserInfo.user_name
                  ? getUserInfo.user_name
                  : getUserInfo.email
              }}
            </p>
            <p class="emails">{{ getUserInfo.email }}</p>
          </div>
          <div class="edit">
            <a :href="`/userrevise/1/`">
              <img src="~/assets/img/login/edit.svg" alt="edit" />
            </a>
          </div>
        </div>
      </div>

      <div class="details">
        <div class="tabs">
          <div class="tab-header">
            <div class="tab-header_main" ref="tabs_scroll">
              <div
                v-for="(tab, index) in userDetails"
                :key="index"
                :class="['tab-item', { active: idsType === index }]"
                @click="selectTab(index)"
              >
                {{ tab.tabs }}
              </div>
            </div>
          </div>
          <div class="tab_details">
            <div class="tab_details_record" v-if="idsType == 0">
              <div class="try" v-if="!cardData.length">
                <p>You haven't used the tarot test yet</p>
                <a :href="`/tarot/`">
                  <button>Try it now</button>
                </a>
              </div>
              <div class="card" v-else>
                <div
                  class="card_item"
                  v-for="(item, index) in cardData"
                  :key="index"
                  @click="enterCurrentRecord(item)"
                >
                  <div class="imags">
                    <nuxt-img
                      :src="item.cards[0]?.icon || '/'"
                      fit="cover"
                      :class="{ imgs_rotate: item.cards[0]?.desc_type == 2 }"
                      :alt="item.cards[0]?.icon"
                      width="114"
                      height="228"
                      loading="lazy"
                      format="auto"
                    ></nuxt-img>
                    <i class="number">{{ item.cards?.length }}</i>
                  </div>
                  <div class="content">
                    <p class="title">{{ item.question }}</p>
                    <p class="text">{{ item.cards[0]?.card_name }}</p>
                    <span class="time">{{
                      $utils.formatYYYYMMDD(item.created_at)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab_details_subscribe" v-if="idsType == 1">
              <div class="joinus">
                <p class="title">Join us</p>
                <span class="text"
                  >Subscribe to get your daily horoscope sent every day</span
                >
                <div class="input_save">
                  <el-input
                    :holder="getUserInfo.email"
                    @emitted="valueEmail"
                    :disable="true"
                    :btn="'Save'"
                  ></el-input>
                </div>
              </div>
              <div class="select_list">
                <div class="title">
                  Select subscription
                  <span class="remind"
                    >(Subscription activation and deactivation will take effect
                    at 00:00 tomorrow.)</span
                  >
                  <button
                    class="subscribe"
                    :class="{ hold_btn: isSubscribe }"
                    :disabled="isSubscribe"
                    id="SUBSCRIBECURRENT"
                    @click="subscribeCurrent"
                  >
                    Save current subscription
                  </button>
                </div>
                <div class="list">
                  <label v-for="(item, index) in selectData" :key="index">
                    <div class="list_item">
                      <input
                        class="checkbox"
                        type="checkbox"
                        :value="item.type"
                        v-model="selectItem"
                        ref="selectBox"
                        @change="chooseMend"
                      />
                      <div class="imgs">
                        <img class="icon" :src="item.icon" :alt="item.name" />
                      </div>
                      <p class="title">{{ item.name }}</p>
                      <p class="texts">{{ item.text }}</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div class="tab_details_report" v-if="idsType == 2">
              <div class="no_payment" v-if="payOderData.length == 0">
                No order information generated
              </div>
              <div class="pay_order" v-else>
                <a
                  :href="`${payPagePath[item.price_id]}?order_no=${item.id}`"
                  class="report_a"
                  v-for="(item, index) in payOderData"
                  :key="index"
                >
                  <div class="item_link">
                    <div class="imgs">
                      <img :src="imgType[item.price_id]" alt="#" />
                    </div>
                    <div class="centet">
                      <div class="name_i">{{ projectType[item.price_id] }}</div>
                      <div class="way">{{ paymentMethod[item.pay_type] }}</div>
                      <div class="name_i">
                        {{ $utils.formatYYYYMMDDHHMM(item.created_at) }}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
    <transition name="fade">
      <el-recommend v-if="isRecomment" @recomment="setRecomment"></el-recommend>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      userDetails: [
        { tabs: 'Tarot Record' },
        { tabs: 'Subscribe' },
        { tabs: 'Report' },
      ],
      selectData: [
        {
          type: 'daily_astro',
          name: "Today's Horoscope",
          text: 'Start each dav with personalized astrological insights',
          icon: require('~/assets/img/horroscope/today.svg'),
        },
        {
          type: 'daily_love',
          name: 'Love Horoscope',
          text: 'Stay one step ahead with daily love energy aimed at your heart',
          icon: require('~/assets/img/horroscope/love_sign.svg'),
        },
        {
          type: 'daily_career',
          name: 'Money Horoscope',
          text: 'Know the direction of your fortune one step ahead every day',
          icon: require('~/assets/img/horroscope/wealth_sign.svg'),
        },
        {
          type: 'daily_health',
          name: 'Health Horoscope',
          text: 'Predicting heaith conditions in advance on a daily basis allows for timely prevention',
          icon: require('~/assets/img/horroscope/healthy_sign.svg'),
        },
        {
          type: 'special',
          name: 'Personalized',
          text: 'Get to know vourself with free insights customized just for you!',
          icon: require('~/assets/img/horroscope/article.svg'),
        },
        {
          type: 'new_function',
          name: 'New Feature',
          text: 'Be the frst to know when new Seekastrology features are available!',
          icon: require('~/assets/img/horroscope/2023.svg'),
        },
      ],
      selectItem: [],
      cardData: [],
      fileType: ['image/jpg', 'image/jpeg', 'image/png', 'image/JPG'],
      imgStr: '',
      activeTab: 0,
      isLoading: false,
      isSubscribe: true,
      isRecomment: false,
      imgType: [
        '',
        require('~/assets/img/payment/birth_chart.jpg'),
        require('~/assets/img/payment/numerology.jpg'),
        require('~/assets/img/payment/kundli.jpg'),
        require('~/assets/img/payment/china_zodiac.jpg'),
      ],
      payOderData: [],
      projectType: [
        '',
        'Birth Chart',
        'Numerology',
        'Kundli Matching',
        'Chinese Signs',
      ],
      paymentMethod: [
        '',
        'Credit Card',
        'PIX',
        'OVO',
        'DANA',
        'QRIS',
        'LinkAjaApplink',
        'IndonesiaBankTransfer',
        'ShopeepayJumpApp',
      ],
      payPagePath: [
        '',
        '/birthchart/details/',
        '/numerology/details/',
        '/kundli/details/',
        '/chinazodiac/details/',
      ],
    }
  },
  async asyncData({ error, $apiList, params }) {
    try {
      let ids = Number(params.id)
      let idsType = ids - 1
      return {
        idsType,
      }
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },

  computed: {
    ...mapGetters(['getUserInfo', 'getUserSub']),
    userImgIcon() {
      const imgUrls = this.getUserInfo.icon
      if (!imgUrls) return require('~/assets/img/login/user.svg')
      if (imgUrls.includes('http')) {
        return imgUrls
      } else {
        return this.$config.cdnUrl + imgUrls
      }
    },
  },
  watch: {
    getUserSub(newVal, oldVal) {
      this.$nextTick(() => {
        if (!newVal) return
        this.selectItem = this.getUserSub //选中的订阅
      })
    },
    // 获取用户支付订单
    getUserInfo(newVal, old) {
      this.$nextTick(() => {
        if (newVal.email) {
          this.$apiList.user
            .setUserOrderList({
              email: newVal.email,
              origin: process.env.origin,
            })
            .then((res) => {
              this.payOderData = res
            })
        }
      })
    },
  },
  mounted() {
    // 获取当前用户的抽牌记录
    this.cardHisData()
    this.$nextTick(() => {
      const recom = sessionStorage.getItem('recom')
      if (recom) {
        this.isRecomment = true //显示推荐
      }
      if (this.isRecomment) {
        // 不可以滚动
        let bodyStyle = document.body.style
        bodyStyle.overflow = 'hidden'
      }
    })
  },
  methods: {
    cardHisData() {
      this.$apiList.tarot
        .getTarotCardHistory({
          origin: process.env.origin,
        })
        .then((res) => {
          if (res.code == 401) {
            // 提示通知
            this.$notification.open({
              message: 'Error source',
              description: 'Please log in',
              duration: 2,
              style: {
                color: '#f00',
              },
            })
          } else {
            this.cardData = res || []
          }
        })
    },
    // 跳转到卡牌详情页
    enterCurrentRecord(u) {
      sessionStorage.setItem('cardsInfo', JSON.stringify(u.cards))
      window.changePageUrl = `/tarot/answer/`
      window.location = `/tarot/answer/`
    },
    valueEmail(value) {
      //   console.log('email', value)
    },
    chooseMend() {
      // 操作选择的内容
      const userSub = this.getUserSub || [] // 上次保存的选项
      const userSubE = this.selectItem // 当前的选项
      const sortedArray1 = userSub?.slice().sort() // 排序数组, 值相同, 位置不相同的情况下对比
      const sortedArray2 = userSubE?.slice().sort()
      const compare =
        JSON.stringify(sortedArray1) === JSON.stringify(sortedArray2) //对比上次==当前选择的值
      this.isSubscribe = compare // 保存按钮的状态
    },
    // 点击选择文件
    triggerInput() {
      this.$refs.uploadInput.click()
    },
    onchangeImgs(event) {
      const file = event.target.files[0]
      if (file?.type == undefined) return
      if (!this.fileType.includes(file.type)) {
        // 提示通知
        this.$notification.open({
          message: 'Error',
          description:
            'Only jpg, jpeg and png images are allowed to be uploaded!',
          duration: 2,
          style: {
            color: '#f00',
          },
        })
        return
      }
      const formData = new FormData()
      formData.append('file', file)
      formData.append('path', 'photo')
      //   限制2m大小
      if (file.size <= 2048000) {
        this.$apiList.user.upload(formData).then((res) => {
          if (res.path) {
            this.imgStr = res.path
            this.userImgUp()
          } else {
            this.$notification.open({
              message: 'Error',
              description: 'Unable to modify',
              duration: 2,
              style: {
                color: '#f00',
              },
            })
          }
        })
      } else {
        // 提示通知
        this.$notification.open({
          message: 'Error',
          description: 'Image too large',
          duration: 2,
          style: {
            color: '#f00',
          },
        })
      }
    },
    //更新用户头像
    userImgUp() {
      this.isLoading = true
      this.$apiList.user
        .setUserMsg({
          origin: process.env.origin,
          icon: this.imgStr,
        })
        .then((res) => {
          this.isLoading = false
          this.$store.commit('UPDATE_USERINFO', res)
          // 提示通知
          this.$notification.open({
            message: 'Success',
            description: 'Avatar updated successfully',
            duration: 2,
            style: {
              color: '#32CD32',
            },
          })
        })
    },
    selectTab(index) {
      this.idsType = index
      // 创建a标签方便触发穿插广告
      //   const signa = document.createElement('a')
      //   signa.href = `/userto/${index + 1}/`
      //   document.body.appendChild(signa)
      //   signa.click()
      //   document.body.removeChild(signa)
    },
    // 保存当前选择的订阅
    subscribeCurrent() {
      this.isLoading = true
      this.$apiList.user
        .subscribeVtow({
          origin: process.env.origin,
          vote_type: this.selectItem,
        })
        .then((res) => {
          this.isLoading = false
          this.isSubscribe = true // 隐藏保存按钮
          if (res.data) {
            this.$store.commit('UPDATE_USERSUB', [])
          } else {
            this.$store.commit('UPDATE_USERSUB', res)
            dataLayer.push({
              event: 'subscribeCurrentSuccess',
            })
            // 提示通知
            this.$notification.open({
              message: 'Subscription',
              description: 'Saved successfully.',
              duration: 3,
              style: {
                color: '#9747ff',
              },
            })
          }
        })
    },

    setRecomment(val) {
      this.isRecomment = val
      //   可以滚动
      let bodyStyle = document.body.style
      bodyStyle.overflow = ''
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.user_main {
  width: 1400px;
  margin: 0 auto;
  padding-top: 48px;
  .user_avatar {
    width: 100%;
    .toggle_img {
      display: flex;
      flex-direction: column;
      align-items: center;
      .imgs {
        width: 172px;
        height: 172px;
        position: relative;
        cursor: pointer;
        z-index: 10;
        .file_img {
          width: 172px;
          height: 172px;
          position: relative;
          overflow: hidden;
          border-radius: 50%;
          overflow: hidden;
          .upload_com {
            position: absolute;
            width: 30px;
            top: 0;
            left: 5%;
            opacity: 0;
            z-index: -1;
          }
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .toggle {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          &::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 52px;
            background-color: rgba(0, 0, 0, 0.2);
          }
          .imgs {
            width: 24px;
            height: 24px;
            position: absolute;
            bottom: 15px;
            left: 50%;
            border-radius: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .account_edit {
        display: flex;
        align-items: center;
        padding: 16px 0 48px 0;
        .account {
          padding-left: 50px;
          .names {
            color: #fff;
            text-align: center;
            font-family: 'Rubik';
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: 30px;
            margin-bottom: 8px;
          }
          .emails {
            color: rgba(255, 255, 255, 0.6);
            text-align: center;
            font-family: 'Rubik';
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
          }
        }
        .edit {
          padding-left: 27px;
          > a {
            display: block;
          }
        }
      }
    }
    .details {
      :deep(.tab-header_main) {
        justify-content: center;
      }
      .tabs {
        width: 100%;
        .tab-header {
          width: 100%;
          position: relative;
          &_icon {
            display: none;
          }
          &_main {
            width: 100%;
            display: flex;
            overflow-x: auto;
            white-space: nowrap;
            padding-bottom: 15px;
            .tab-item {
              flex: 0 0 auto;
              padding: 7px 22px;
              text-align: center;
              font-family: 'Rubik';
              font-size: 14px;
              line-height: 18px;
              color: rgba(255, 255, 255, 0.6);
              border-radius: 42px;
              margin-right: 24px;
              cursor: pointer;
              transition: background-color 0.3s ease-in-out;
              &:hover {
                background-color: rgba(255, 255, 255, 0.1);
              }
            }
            & > :last-child {
              margin-right: 0;
            }
            .tab-item.active {
              background-color: #fff;
              color: #000;
            }
          }
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
        }
      }
      .tab_details_record {
        .try {
          display: grid;
          place-items: center;
          padding: 48px 0 120px;
          > p {
            color: rgba(255, 255, 255, 0.6);
            font-family: 'Rubik';
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: 30px;
            margin-bottom: 24px;
          }
          > a {
            display: inline-block;
            button {
              height: 44px;
              padding: 8px 32px;
              border-radius: 42px;
              border: 1px solid rgba(255, 255, 255, 0.3);
              color: rgba(255, 255, 255, 0.6);
              font-family: 'Rubik';
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
              &:hover {
                background-color: #fff;
                color: #000;
              }
            }
          }
        }
        .card {
          padding: 24px 0 96px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          &_item {
            display: block;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 220px;
            border-radius: 16px;
            padding: 16px;
            cursor: pointer;
            -webkit-transition: transform 0.3s,
              background-color 0.3s ease-in-out;
            transition: transform 0.3s, background-color 0.3s ease-in-out;
            &:hover {
              background-color: rgba(255, 255, 255, 0.08);
              transform: translateY(-5px);
            }
            .imags {
              width: 114px;
              height: 228px;
              border-radius: 5px;
              //   overflow: hidden;
              position: relative;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              .number {
                display: block;
                position: absolute;
                right: -15px;
                bottom: 15px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                color: #fff;
                text-align: center;
                font-family: 'Rubik';
                font-size: 20px;
                font-style: normal;
                font-weight: 400;
                line-height: 30px;
                background-color: rgba(0, 0, 0, 0.6);
              }
            }
            .imgs_rotate {
              transform: rotate(180deg);
            }
            .content {
              width: 100%;
              font-family: 'Rubik';
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
              padding-top: 8px;
              max-width: 100%;

              .title {
                color: #fff;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .text {
                color: rgba(255, 255, 255, 0.6);
                padding: 3px 0;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
              .time {
                font-size: 16px;
                line-height: 18px;
                color: rgba(255, 255, 255, 0.6);
              }
            }
          }
        }
      }
      .tab_details_subscribe {
        padding: 24px 0 96px;
        .joinus {
          padding-bottom: 24px;
          .title {
            color: #fff;
            font-family: 'Rubik';
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: 30px;
            margin-bottom: 8px;
          }
          .text {
            color: rgba(255, 255, 255, 0.6);
            font-family: 'Rubik';
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
          }
          .input_save {
            margin-top: 16px;
            width: 400px;
          }
        }
        .select_list {
          .title {
            color: #fff;
            font-family: 'Rubik';
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: 30px;
            margin-bottom: 8px;
            .remind {
              color: rgba(255, 255, 255, 0.6);
              font-size: 14px;
              line-height: 18px;
            }
            .subscribe {
              display: inline-block;
              padding: 7px 22px;
              background-color: #fff;
              border-radius: 42px;
              color: #000;
              font-size: 14px;
              line-height: 18px;
              cursor: pointer;
              transition: background-color 0.3s ease-out;
            }
            .hold_btn {
              color: rgba(255, 255, 255, 0.6);
              background-color: rgb(173, 173, 173, 0.3);
              transition: background-color 0.3s ease-out;
              cursor: not-allowed;
            }
          }
          .list {
            padding-top: 16px;
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            .list_item {
              width: 220px;
              height: 220px;
              border-radius: 16px;
              background: rgba(255, 255, 255, 0.08);
              backdrop-filter: blur(8px);
              padding: 24px 22px 0;
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              .checkbox {
                position: absolute;
                top: 16px;
                right: 16px;
                border: 1px solid rgba(255, 255, 255, 0.6);
                height: 18px;
                width: 18px;
                background: #00004d;
                border-radius: 50%;
                appearance: none;
                -webkit-appearance: none;
                cursor: pointer;
                &:checked {
                  &::before {
                    display: block;
                    content: '';
                    background: url('~/assets/img/resources/checked.png')
                      no-repeat center center;
                    width: 21px;
                    height: 16px;
                  }
                }
              }
              .imgs {
                width: 60px;
                height: 60px;
                margin-bottom: 16px;
                .icon {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              .title {
                color: #fff;
                text-align: center;
                font-family: 'Rubik';
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px;
              }
              .texts {
                color: rgba(255, 255, 255, 0.6);
                text-align: center;
                font-family: 'Rubik';
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 18px;
              }
            }
          }
        }
      }
      .tab_details_report {
        padding: 24px 0 68px;
        .pay_order {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
          .report_a {
            display: block;
            transition: transform 0.3s ease-in-out;
            &:hover {
              transform: scale(1.03);
            }

            .item_link {
              padding: 18px;
              border-radius: 16px;
              background: rgba(255, 255, 255, 0.08);
              .imgs {
                width: 100%;
                height: 100%;
                margin-bottom: 8px;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius: 8px;
                }
              }
              .centet {
                .name_i {
                  color: rgba(255, 255, 255, 0.6);
                  font-family: Rubik;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 18px;
                }
                .way {
                  color: #fff;
                  font-family: Rubik;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 22px;
                }
              }
            }
          }
        }
        .no_payment {
          height: 256px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgba(255, 255, 255, 0.6);
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

@media (max-width: 1450px) {
  .user_main {
    width: 100%;
    .user_avatar {
      padding: 0 48px;
      .details {
        .tab_details_subscribe {
          .select_list {
            .list {
              flex-wrap: wrap;
            }
          }
        }
        .tab_details_report {
          .pay_order {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          }
        }
      }
    }
  }
}
@media (max-width: 1000px) {
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .user_main {
    width: 100%;
    padding-top: 24 * $pr;
    .user_avatar {
      padding: 0 16 * $pr;
      .toggle_img {
        .imgs {
          width: 109 * $pr;
          height: 109 * $pr;
          z-index: 0;
          .file_img {
            width: 109 * $pr;
            height: 109 * $pr;
            .upload_com {
              position: absolute;
              width: 30 * $pr;
            }
          }
          .toggle {
            &::before {
              width: 100%;
              height: 30 * $pr;
            }
            .imgs {
              width: 18 * $pr;
              height: 18 * $pr;
              bottom: 6 * $pr;
              left: 50%;
            }
          }
        }
        .account_edit {
          display: flex;
          align-items: center;
          padding: 16 * $pr 0 48 * $pr;
          position: relative;
          .account {
            padding-left: 0;
            .names {
              font-size: 22 * $pr;
              line-height: 30 * $pr;
              margin-bottom: 8 * $pr;
            }
            .emails {
              font-size: 14 * $pr;
              line-height: 18 * $pr;
            }
          }
          .edit {
            position: absolute;
            top: -110 * $pr;
            right: -70 * $pr;
            padding-left: 0;
            > a {
              display: block;
              > img {
                width: 20 * $pr;
              }
            }
          }
        }
      }
      .details {
        .tabs {
          width: 100%;
          .tab-header {
            position: relative;
            &_icon {
              display: inline-block;
              position: absolute;
              top: -15 * $pr;
              right: 20 * $pr;
              width: 35 * $pr;
              height: 23 * $pr;
              background: url('../../assets/img/home/tabsjiantou.svg') no-repeat
                left center;
              background-size: cover;
              z-index: 2;
              animation: arrow-animation 1.5s infinite;
              animation-delay: 1s;
            }
            @keyframes arrow-animation {
              0% {
                transform: translateX(0);
              }
              50% {
                transform: translateX(20 * $pr);
              }
              100% {
                transform: translateX(0);
              }
            }
            &_main {
              padding-bottom: 15 * $pr;
              .tab-item {
                position: relative;
                padding: 7 * $pr 22 * $pr;
                font-size: 14 * $pr;
                line-height: 18 * $pr;
                border-radius: 42 * $pr;
                margin-right: 0;
              }
              & > :last-child {
                margin-right: 0;
              }
              .tab-item.active {
                background-color: #fff;
                color: #000;
              }
            }
            &::after {
              width: 100%;
              height: 1 * $pr;
            }
          }
        }
        .tab_details_record {
          .try {
            padding: 24 * $pr 0 120 * $pr;
            > p {
              font-size: 14 * $pr;
              line-height: 16 * $pr;
              margin-bottom: 16 * $pr;
            }
            > a {
              display: inline-block;
              button {
                height: 44 * $pr;
                padding: 8 * $pr 32 * $pr;
                border-radius: 42 * $pr;
                border: 1 * $pr solid rgba(255, 255, 255, 0.3);
                font-size: 16 * $pr;
                line-height: 22 * $pr;
              }
            }
          }
          .card {
            padding: 16 * $pr 8 * $pr 48 * $pr;
            gap: 0;
            flex-wrap: wrap;
            &_item {
              width: auto;
              flex: 0 0 calc(50% - 2.5 * $pr);
              border-radius: 16 * $pr;
              padding: 8 * $pr;
              background-color: rgba(255, 255, 255, 0.08);
              &:hover {
                transform: translateY(0);
              }
              margin-bottom: 5 * $pr;
              &:nth-child(odd) {
                margin-right: 2.5 * $pr;
              }
              &:nth-child(even) {
                margin-left: 2.5 * $pr;
              }
              .imags {
                width: 45 * $pr;
                height: 90 * $pr;
                border-radius: 5 * $pr;
                .number {
                  right: -11 * $pr;
                  bottom: 11 * $pr;
                  width: 22 * $pr;
                  height: 22 * $pr;
                  font-size: 16 * $pr;
                  line-height: 22 * $pr;
                }
              }
              .content {
                font-size: 12 * $pr;
                line-height: 16 * $pr;
                padding-top: 8 * $pr;
                .title {
                  font-size: 14 * $pr;
                  line-height: 18 * $pr;
                }
                .text {
                  padding: 3 * $pr 0;
                }
                .time {
                  font-size: 12 * $pr;
                  line-height: 16 * $pr;
                }
              }
            }
          }
        }
        .tab_details_subscribe {
          padding: 16 * $pr 0 48 * $pr;
          .joinus {
            padding-bottom: 24 * $pr;
            .title {
              font-size: 16 * $pr;
              line-height: 22 * $pr;
              margin-bottom: 8 * $pr;
            }
            .text {
              font-size: 14 * $pr;
              line-height: 18 * $pr;
            }
            .input_save {
              width: 100%;
              margin-top: 8 * $pr;
            }
          }
          .select_list {
            .title {
              font-size: 16 * $pr;
              line-height: 22 * $pr;
              margin-bottom: 5 * $pr;
              .remind {
                display: block;
                font-size: 14 * $pr;
                line-height: 18 * $pr;
                padding-top: 5 * $pr;
              }
              .subscribe {
                display: block;
                padding: 7 * $pr 22 * $pr;
                border-radius: 42 * $pr;
                font-size: 14 * $pr;
                line-height: 18 * $pr;
                text-align: center;
                margin-top: 8 * $pr;
              }
            }
            .list {
              padding-top: 5 * $pr;
              gap: 0;
              label {
                flex: 0 0 calc(50% - 2.5 * $pr); //平分父宽度为两份，减去间隙
                margin-bottom: 5 * $pr;
                &:nth-child(odd) {
                  margin-right: 2.5 * $pr;
                }
                &:nth-child(even) {
                  margin-left: 2.5 * $pr;
                }
              }
              .list_item {
                width: auto;
                height: 100%;
                border-radius: 16 * $pr;
                backdrop-filter: blur(8 * $pr);
                padding: 16 * $pr;
                .checkbox {
                  top: 8 * $pr;
                  right: 8 * $pr;
                  border: 1 * $pr solid rgba(255, 255, 255, 0.6);
                  height: 18 * $pr;
                  width: 18 * $pr;
                  &:checked {
                    &::before {
                      width: 21 * $pr;
                      height: 16 * $pr;
                      background-size: cover;
                    }
                  }
                }
                .imgs {
                  width: 60 * $pr;
                  height: 60 * $pr;
                  margin-bottom: 16 * $pr;
                }
                .title {
                  font-size: 16 * $pr;
                  line-height: 22 * $pr;
                  margin-bottom: 8 * $pr;
                }
                .texts {
                  font-size: 12 * $pr;
                  line-height: 16 * $pr;
                }
              }
            }
          }
        }
        .tab_details_report {
          padding: 16 * $pr 0 48 * $pr;
          .pay_order {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 5 * $pr;
            .report_a {
              display: block;
              .item_link {
                padding: 8 * $pr;
                border-radius: 16 * $pr;
                .imgs {
                  width: 100%;
                  height: 100%;
                  margin-bottom: 8 * $pr;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 8 * $pr;
                  }
                }
                .centet {
                  display: flex;
                  flex-direction: column;
                  .name_i {
                    font-size: 12 * $pr;
                    line-height: 16 * $pr;
                    order: 1;
                  }
                  .way {
                    font-size: 14 * $pr;
                    line-height: 18 * $pr;
                  }
                }
              }
            }
          }
          .no_payment {
            height: 172 * $pr;
            font-size: 22 * $pr;
            line-height: 30 * $pr;
          }
        }
      }
    }
  }
}
</style>
