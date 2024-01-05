<template>
  <div class="kundli">
    <google-ad :id="'9547237827'" classNames="google_h5_top"></google-ad>
    <div class="kundli_main">
      <div class="fromor">
        <div class="title_top">
          <p class="title">Kundli Matching</p>
          <p class="introduce">
            Kundali matching or Kundali Milan plays a prominent role in finding
            an ideal life partner. Since marriage is one of the important events
            of an individual's life, it is vital to take each step carefully.
            You cannot underestimate the power of Kundali matching. After all,
            it was considered as one of the bases for a strong and happy
            marriage in the olden days. Even today, matching of kundalis is the
            first step in matrimonial discussions to ensure a harmonious bond
            among the duo.
          </p>
        </div>
        <div class="fromor_lis">
          <div class="fromor_item">
            <div class="boys">
              <p>Enter Boy's Details</p>
              <el-kundli-from
                ref="kundliFormRefMale"
                @submitform="getMaleData"
                sex="Male"
              ></el-kundli-from>
            </div>
            <div class="girls">
              <p>Enter Girl's Details</p>
              <el-kundli-from
                ref="kundliFormRefFemale"
                @submitform="getFemaleData"
                sex="Female"
              ></el-kundli-from>
            </div>
          </div>
          <div class="alink">
            <a class="a" @click="submitKundli">Match Your Kundli</a>
          </div>
        </div>
        <div class="dasama">
          <div class="intro">
            <p class="li">
              Dasama Porutham (Ten Compatibility Factors) for Kundali Matching
            </p>
            <p class="to">
              Dasama (ten) Porutham or Thirumana (marriage) Porutham is a vital
              part of India's traditional marriage process. Dasama Porutham was
              devised by Indian sages of ancient times to match the prospective
              couple's horoscopes to check the levels of compliance and
              flexibility between them. These top ten factors have since been
              perceived as the yardstick for gauging the compatibility of a
              couple in Kundali Matching. The Poruthams are evaluated mainly
              based on the comparison of Nakshatras (birth stars) of the boy and
              the girl.
            </p>
          </div>
          <div class="record">
            <p class="li">What the Poruthams Indicate:</p>
            <p class="to lefts">
              People born in the years of the Rabbit tend to have some
              characteristics of the real rabbits which are quiet at most times
              but also acted swiftly when needed. Generally, the Rabbits are
              positive, gentle and elegant. They love freedom, but once set
              goals, they just march forward for it without distractions. They
              are also self-disciplined, the typical kind of people who are
              strict with themselves but tolerant of others.
            </p>
            <p class="to lefts">
              Though looking mild and soft, the Rabbits in fact are alert to
              strangers and outsiders. They don't trust others easily, unlikely
              to be fooled by others. However, they do have courteous manners in
              social settings. Strengths: Optimistic, gracious, generous,
              kind-hearted, witty and alert
            </p>
            <p class="to lefts">
              Weaknesses: A little vain, emotionally unstable, easily satisfied
              with the status-quo
            </p>
            <p class="to lefts">
              Rabbit Men: Rabbit men are prone to be gentlemen but they are also
              good at pretending. They may pretend that they don't care about
              something, however, they do care deep inside. The active thinking
              enables them excellent negotiation skills at work. What's more,
              Rabbit men are family-oriented and glad to undertake the household
              chores.
            </p>
          </div>
        </div>
      </div>
      <div class="content">
        <google-ad :id="'9971744541'" classNames="google_ad"></google-ad>
        <home-pairing class="pairing"></home-pairing>
      </div>
    </div>
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
    <transition name="unfold">
      <el-login-form v-if="perform" @choce="integerFormat"></el-login-form>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      m_detail: null,
      f_detail: null,
      isLoading: false,
      perform: false,
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  methods: {
    // 登录显示
    formTouched() {
      this.perform = true
      let bodyStyle = document.body.style
      bodyStyle.overflow = 'hidden'
    },
    // 登录隐藏
    integerFormat() {
      this.perform = false
      let bodyStyle = document.body.style
      bodyStyle.overflow = ''
    },

    // 提交信息-获取子组件填写内容
    submitKundli() {
      if (!this.getUserInfo?.email) {
        this.formTouched()
        return
      }
      const kundliForm = this.$refs.kundliFormRefMale
      const kundliFormFemale = this.$refs.kundliFormRefFemale

      if (kundliForm && kundliFormFemale) {
        kundliForm.submitForm()
        kundliFormFemale.submitForm()
      }
      if (this.f_detail && this.m_detail) {
        this.isLoading = true
        this.$apiList.home
          .getKundliMaking({
            f_detail: this.f_detail,
            m_detail: this.m_detail,
          })
          .then((res) => {
            this.isLoading = false
            localStorage.setItem(
              'kundli',
              JSON.stringify(res) // 更新用户匹配数据
            )
            localStorage.setItem(
              'kundliBoth',
              JSON.stringify({
                f_detail: this.f_detail,
                m_detail: this.m_detail,
              }) // 更新用户存储信息
            )
            this.m_detail = null
            this.f_detail = null
            window.location.href = '/kundli/details/'
          })
      }
    },
    getMaleData(value) {
      this.m_detail = value
    },
    getFemaleData(value) {
      this.f_detail = value
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.kundli {
  .google_h5_top {
    display: none;
  }
  &_main {
    width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    padding: 48px 0;
    .fromor {
      flex: 1;
      padding-right: 102px;
      .title_top {
        .title {
          color: #fff;
          font-family: Cinzel Decorative;
          font-size: 36px;
          font-style: normal;
          font-weight: 700;
          line-height: 48px;
          margin-bottom: 8px;
        }
        .introduce {
          color: rgba(255, 255, 255, 0.6);
          font-family: Rubik;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px;
        }
      }
      &_lis {
        padding: 24px 0;
        margin: 56px 0;
        position: relative;
        &::before {
          position: absolute;
          content: '';
          width: 100%;
          height: 1px;
          left: 0;
          top: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50.52%,
            rgba(255, 255, 255, 0) 100%
          );
        }
        &::after {
          position: absolute;
          content: '';
          width: 100%;
          height: 1px;
          left: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50.52%,
            rgba(255, 255, 255, 0) 100%
          );
        }
        .fromor_item {
          display: flex;
          justify-content: space-between;
          position: relative;
          &::before {
            position: absolute;
            content: '';
            width: 1px;
            height: 100%;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            background: linear-gradient(
              hsla(0, 0%, 100%, 0),
              hsla(0, 0%, 100%, 0.2) 50.52%,
              hsla(0, 0%, 100%, 0)
            );
          }
          .boys {
            > p {
              color: #fff;
              font-family: Rubik;
              font-size: 22px;
              font-style: normal;
              font-weight: 400;
              line-height: 30px;
              margin-bottom: 16px;
            }
          }
          .girls {
            > p {
              color: #fff;
              font-family: Rubik;
              font-size: 22px;
              font-style: normal;
              font-weight: 400;
              line-height: 30px;
              margin-bottom: 16px;
            }
          }
        }
        .alink {
          width: 100%;
          text-align: center;
          padding-top: 24px;
          .a {
            width: 344px;
            height: 44px;
            padding: 12px 32px;
            display: inline-block;
            color: #000;
            font-family: Rubik;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            text-align: center;
            border-radius: 42px;
            background: #fff;
          }
        }
      }
      .dasama {
        padding-bottom: 47px;
        .li {
          color: #fff;
          font-family: Rubik;
          font-size: 22px;
          font-style: normal;
          font-weight: 400;
          line-height: 30px;
        }
        .to {
          color: rgba(255, 255, 255, 0.6);
          font-family: Rubik;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px;
        }
        .intro {
          display: grid;
          gap: 8px;
          margin-bottom: 16px;
        }
        .record {
          display: grid;
          gap: 8px;
          .lefts {
            padding-left: 16px;
            position: relative;
            &::after {
              display: inline-block;
              position: absolute;
              content: '';
              left: 0;
              top: 10px;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: #9747ff;
            }
          }
        }
      }
    }
    .content {
      width: 354px;
      .google_ad {
        width: 300px;
        height: 625px;
        margin: 0 auto 32px;
      }
      .pairing {
        :deep(.pairing_two_main) {
          width: 100%;
          .select_main {
            padding: 24px 16px;
          }
        }
      }
    }
  }
}
@media (max-width: 1470px) {
  .kundli {
    &_main {
      width: 100%;
      padding: 48px 30px;
      .fromor {
        padding-right: 48px;
        &_lis {
          .fromor_item {
            .boys {
              flex: 1;
              padding-right: 24px;
            }
            .girls {
              flex: 1;
              padding-left: 24px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 930px) {
  .kundli {
    &_main {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .fromor {
        flex: 1;
        padding-right: 0;
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .kundli {
    .google_h5_top {
      display: flex;
      flex-direction: column;
      width: 300 * $pr;
      height: 117 * $pr;
      margin: 0 auto;
    }
    &_main {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 16 * $pr 16 * $pr 32 * $pr;
      .fromor {
        flex: 1;
        padding-right: 0;
        .title_top {
          .title {
            font-size: 22 * $pr;
            line-height: 30 * $pr;
            margin-bottom: 8 * $pr;
          }
          .introduce {
            font-size: 14 * $pr;
            line-height: 24 * $pr;
          }
        }
        &_lis {
          padding: 24 * $pr 0;
          margin: 32 * $pr 0;
          position: relative;
          &::before {
            height: 1 * $pr;
          }
          &::after {
            height: 1 * $pr;
          }
          .fromor_item {
            display: flex;
            flex-direction: column;
            justify-content: inherit;
            position: relative;
            &::before {
              display: none;
            }
            .boys {
              padding-right: 0;
              > p {
                font-size: 18 * $pr;
                line-height: 24 * $pr;
                margin-bottom: 16 * $pr;
              }
            }
            .girls {
              padding-left: 0;
              padding-top: 24 * $pr;
              > p {
                font-size: 18 * $pr;
                line-height: 24 * $pr;
                margin-bottom: 16 * $pr;
              }
            }
          }
          .alink {
            padding-top: 24 * $pr;
            .a {
              width: 100%;
              height: 44 * $pr;
              padding: 12 * $pr 32 * $pr;
              font-size: 16 * $pr;
              line-height: 22 * $pr;
              border-radius: 42 * $pr;
            }
          }
        }
        .dasama {
          padding-bottom: 32 * $pr;
          .li {
            font-size: 18 * $pr;
            line-height: 24 * $pr;
          }
          .to {
            font-size: 14 * $pr;
            line-height: 24 * $pr;
          }
          .intro {
            display: grid;
            gap: 8 * $pr;
            margin-bottom: 16 * $pr;
          }
          .record {
            display: grid;
            gap: 8 * $pr;
            .lefts {
              padding-left: 16 * $pr;
              &::after {
                top: 8 * $pr;
                width: 8 * $pr;
                height: 8 * $pr;
              }
            }
          }
        }
      }
      .content {
        width: 100%;
        .google_ad {
          width: 336 * $pr;
          height: 297 * $pr;
          margin: 0 auto 32 * $pr;
        }
        .pairing {
          :deep(.pairing_two_main) {
            width: 100%;
            .select_main {
              padding: 24 * $pr 16 * $pr;
            }
          }
        }
      }
    }
  }
}
</style>
