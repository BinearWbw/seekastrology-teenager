<template>
  <div class="kundli">
    <!-- <google-ad :id="'9547237827'" classNames="google_h5_top"></google-ad> -->
    <div class="kundli_main">
      <div class="fromor">
        <div class="title_top">
          <p class="title">Kundli Matching</p>
          <p class="introduce">
            Kundali matching plays a prominent role in finding an ideal life
            partner. Since marriage is one of the important events of an
            individual's life, it is vital to take each step carefully. After
            all, it was considered as one of the bases for a strong and happy
            marriage in the olden days. Even today, matching of kundalis is the
            first step in matrimonial discussions to ensure a harmonious bond
            among the duo.
          </p>
        </div>
        <google-ad :id="'9547237827'" classNames="google_h5_top"></google-ad>
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
            <p class="to">
              A cursory look at each of the ten Poruthams will tell us what they
              indicate.
            </p>
            <p class="to lefts">
              Dina/ Nakshatra Porutham - this is the first porutham to be
              checked in Kundali Matching, and it involves matching the
              prospective couple's birth stars. It indicates longevity, general
              wellbeing, and prosperity of the couple. It ensures a married life
              free from poverty and ill-health.
            </p>
            <p class="to lefts">
              Rasi Porutham - indicates if their Rasi (zodiac signs) are in sync
              with each other, which means that the union can result in a happy
              and long-lasting marriage. It checks the level of compatibility
              between the horoscopes of the prospective couple. This accord
              indicates good camaraderie and unison that leads to the expansion
              of the family.
            </p>
            <p class="to lefts">
              Gana Porutham - indicates the affinity in temperament between the
              spouses. It affirms the level of mental and spiritual
              compatibility. There are three types of Gana(m). <br />
              ○ Deva - good-natured, affectionate, and soft-spoken. <br />
              ○ Manushya - a mixture of good and bad traits (anger). <br />
              ○ Rakshasa - rude, aggressive, and unpleasant.
            </p>
            <p class="to lefts">
              Yoni Porutham - is about sexual compatibility between the couple.
              This Porutham is considered a vital factor in Kundali Matching.
              The marriage alliance will not be considered if it does not match.
            </p>
            <p class="to lefts">
              Rajju Porutham - holds a lot of significance in Kundali Matching,
              and it is also the most sensitive. It considers the longevity of
              the husband that will decide the duration of married life and
              marital happiness. For a compatible match, the birth stars (Janma
              Nakshatras) of the boy and the girl whose Kundalis are being
              matched should not belong to the same Rajju.
            </p>
            <p class="to lefts">
              Rasi Athipathi - indicates the level of compatibility based on the
              friendliness quotient between the House Lords of the couple's
              zodiac signs. A good Porutham indicates a happy, long-lasting, and
              prosperous marriage.
            </p>
            <p class="to lefts">
              Mahendra Porutham - denotes chances of longevity, wealth, and
              progeny in a marriage. In Kundali Matching, this Porutham is based
              on the couple's birth stars and is an important indicator of the
              level of compatibility. It indicates if the man can protect his
              wife and children and provide for them. Kundali Matching is said
              to be good if there is Mahendra Porutham.
            </p>
            <p class="to lefts">
              Stree Dheerkha Porutham - indicates if the girl has a prosperous
              life after marriage. A strong Stree Dheerkha Porutham indicates
              the couple will be bestowed with wealth and prosperity. The couple
              will have a long and happy marital life.
            </p>
            <p class="to lefts">
              Vasiya Porutham - indicates the level of mutual attraction, love,
              affection, respect, and co-operation between the couple. It
              denotes the love and intimacy between a married couple.
            </p>
            <p class="to lefts">
              Nadi Porutham - This is an important compatibility in Kundali
              Matching. This indicates the health and well-being of the couple.
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
            console.log('昆德里数据', res)
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
      width: 336 * $pr;
      height: 297 * $pr;
      margin: 24 * $pr auto 0;
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
