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
            <img :src="userImgIcon" alt="" />
          </div>
          <div class="toggle">
            <img class="imgs" src="~/assets/img/login/Group.svg" alt="" />
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
              <img src="~/assets/img/login/edit.svg" alt="" />
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
                </div>
                <div class="list">
                  <label v-for="(item, index) in selectData" :key="index">
                    <div class="list_item">
                      <input
                        class="checkbox"
                        type="checkbox"
                        :value="item.type"
                        v-model="selectItem"
                        @change="chooseMend(item)"
                      />
                      <div class="imgs">
                        <img class="icon" :src="item.icon" alt="" />
                      </div>
                      <p class="title">{{ item.name }}</p>
                      <p class="texts">{{ item.text }}</p>
                    </div>
                  </label>
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      userDetails: [{ tabs: 'Tarot Record' }, { tabs: 'Subscribe' }],
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
      const imgUrl = this.getUserInfo.icon
        ? `${this.$config.cdnUrl + this.getUserInfo.icon}`
        : require('~/assets/img/login/user.svg')

      return imgUrl
    },
  },
  watch: {
    getUserSub(newVal, oldVal) {
      this.$nextTick(() => {
        if (!newVal) return
        this.selectItem = this.getUserSub //选中的订阅
      })
    },
  },
  mounted() {
    // 获取当前用户的抽牌记录
    this.cardHisData()
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
    onSearch(value) {
      //   console.log(value)
    },
    valueEmail(value) {
      //   console.log('email', value)
    },
    chooseMend(item, index) {
      // 操作选择的内容
      const userSub = this.getUserSub

      if (userSub) {
        const screen2 = userSub?.filter((i) => i == item.type)
        let numBtn = screen2[0] ? 1 : 2
        this.$apiList.user
          .subscribe({
            origin: process.env.origin,
            vote_type: item.type,
            opt: numBtn,
          })
          .then((res) => {
            if (res.data) {
              this.$store.commit('UPDATE_USERSUB', [])
            } else {
              this.$store.commit('UPDATE_USERSUB', res)
            }
          })
      } else {
        this.$apiList.user
          .subscribe({
            origin: process.env.origin,
            vote_type: item.type,
            opt: 2,
          })
          .then((res) => {
            if (res.data) {
              this.$store.commit('UPDATE_USERSUB', [])
            } else {
              this.$store.commit('UPDATE_USERSUB', res)
            }
          })
      }
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
      this.$apiList.user
        .setUserMsg({
          origin: process.env.origin,
          icon: this.imgStr,
        })
        .then((res) => {
          this.$store.commit('UPDATE_USERINFO', res)
        })
    },
    selectTab(index) {
      this.idsType = index
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
          }
          .list {
            padding-top: 16px;
            display: flex;
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
                margin-right: 24 * $pr;
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
      }
    }
  }
}
</style>
