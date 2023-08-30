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
            <img src="~/assets/img/login/user.svg" alt="" />
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
            <a :href="`${getIntersperseUrl}/user/revise/`">
              <img src="~/assets/img/login/edit.svg" alt="" />
            </a>
          </div>
        </div>
      </div>

      <div class="details">
        <el-tabs :tabs="userDetails" @click="correspondingContent">
          <template v-slot="{ activeTab }">
            <div class="details_record" v-if="activeTab == 0">
              <div class="try" v-if="true">
                <p>You haven't used the tarot test yet</p>
                <button>Try it now</button>
              </div>
              <div class="card" v-if="false">
                <div
                  class="card_item"
                  v-for="(item, index) in cardData"
                  :key="index"
                >
                  <div class="imags">
                    <img :src="item.icon" alt="" />
                    <i class="number">{{ index }}</i>
                  </div>
                  <div class="content">
                    <p class="title">{{ item.title }}</p>
                    <p class="text">{{ item.text }}</p>
                    <span class="time">{{ item.time }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="details_subscribe" v-if="activeTab == 1">
              <div class="joinus">
                <p class="title">Join us</p>
                <span class="text"
                  >Subscribe to get your daily horoscope sent every day</span
                >
                <div class="input_save">
                  <el-input
                    :holder="getUserInfo.email"
                    @emitted="valueEmail"
                    :btn="'Save'"
                  ></el-input>
                </div>
              </div>
              <div class="select_list">
                <p class="title">Select subscription</p>
                <div class="list">
                  <label v-for="(item, index) in selectData" :key="index">
                    <div class="list_item">
                      <input
                        class="checkbox"
                        type="checkbox"
                        :value="item.name"
                        v-model="selectItem"
                        @change="chooseMend(item, index)"
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
          </template>
        </el-tabs>
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
          name: 'Tarot Record1',
          text: 'Read your freedaily horoscopes and learn more about your',
          icon: require('~/assets/img/horroscope/sign_all.svg'),
        },
        {
          name: 'Tarot Record2',
          text: 'Read your freedaily horoscopes and learn more about your',
          icon: require('~/assets/img/horroscope/today_tarot.svg'),
        },
        {
          name: 'Tarot Record3',
          text: 'Read your freedaily horoscopes and learn more about your',
          icon: require('~/assets/img/horroscope/cupational_sign.svg'),
        },
        {
          name: 'Tarot Record4',
          text: 'Read your freedaily horoscopes and learn more about your',
          icon: require('~/assets/img/horroscope/love_sign.svg'),
        },
        {
          name: 'Tarot Record5',
          text: 'Read your freedaily horoscopes and learn more about your',
          icon: require('~/assets/img/horroscope/today.svg'),
        },
        {
          name: 'Tarot Record6',
          text: 'Read your freedaily horoscopes and learn more about your',
          icon: require('~/assets/img/horroscope/article.svg'),
        },
      ],
      selectItem: [],
      cardData: [
        {
          title: '“What is your fortune today”',
          text: 'The daily tarot',
          time: '2022/05/21',
          icon: require('~/assets/img/tarot/card2.webp'),
        },
      ],
      fileType: ['image/jpg', 'image/jpeg', 'image/png'],
    }
  },
  computed: {
    ...mapGetters(['getIntersperseUrl', 'getUserInfo']),
  },
  methods: {
    correspondingContent(i) {
      console.log('tabs', i)
    },
    onSearch(value) {
      console.log(value)
    },
    valueEmail(value) {
      console.log('email', value)
    },
    chooseMend(item, index) {
      // 操作选择的内容
      console.log('选中', item, index)
      console.log('当前选中的内容', this.selectItem)
    },
    triggerInput() {
      this.$refs.uploadInput.click()
    },
    onchangeImgs(event) {
      const file = event.target.files[0]
      console.log('文件', file, event)
      if (!this.fileType.includes(file.type)) {
        alert('Only jpg, jpeg and png images are allowed to be uploaded!')
        return
      }
      const formData = new FormData()
      formData.append('file', file)
      formData.append('path', 'photo')

      this.$apiList.user
        .setUserMsg({
          origin: process.env.origin,
          icon: formData,
        })
        .then((res) => {
          if (res.hasOwnProperty('token')) {
            this.$store.commit('UPDATE_USERINFO', res)
          } else {
            alert('未能修改', res.msg)
          }
        })

      console.log('formData', formData)
    },
  },
}
</script>

<style lang="scss" scoped>
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
      &_record {
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
          > button {
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
        .card {
          padding: 24px 0 96px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          &_item {
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
            .content {
              font-family: 'Rubik';
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
              padding-top: 8px;
              .title {
                color: #fff;
              }
              .text {
                color: rgba(255, 255, 255, 0.6);
                padding: 3px 0;
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
      &_subscribe {
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
          .input_button {
            background-color: #fff;
            color: #000;
            border-radius: 42px;
            border: 1px solid rgba(255, 255, 255, 0.8);
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
                background: rgba(255, 255, 255, 0.1);
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
</style>
