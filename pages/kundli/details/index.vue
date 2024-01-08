<template>
  <div class="kund">
    <!-- <google-ad :id="'1440112129'" classNames="google_ad_top"></google-ad> -->
    <div class="kund_main">
      <i class="logos"></i>
      <i class="bg"></i>
      <div class="icon_bg">
        <i></i>
      </div>
      <div class="content">
        <p class="title">Kundli Matching Report</p>
        <div class="love_conjugate">
          <div class="duo boys">
            {{ capFirstLetter(kundliBoth?.m_detail.name) || '--' }}
          </div>
          <div class="love">
            <div class="numbers">
              {{ kundliData?.ashtkoot.Total.received_points }}
            </div>
          </div>
          <div class="duo girls">
            {{ capFirstLetter(kundliBoth?.f_detail.name) || '--' }}
          </div>
        </div>
        <div class="bg_tabs">
          <div class="tabs_lists">
            <div class="tabs_lists_title">
              <i class="boys"></i>Basic Details
            </div>
            <div class="item_list">
              <div class="item_list_one">Name</div>
              <div class="item_list_two">
                {{ kundliBoth?.m_detail.name || '--' }}
              </div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Birth Date & Time</div>
              <div class="item_list_two">
                {{ timeDataList(kundliBoth?.m_detail.gender) }}
              </div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Birth Place</div>
              <div class="item_list_two">
                {{ kundliBoth?.m_detail.place || '--' }}
              </div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Janam Rashi</div>
              <div class="item_list_two">
                {{ sign[kundliData?.manglik.m_moon_sign] || '--' }}
              </div>
            </div>
          </div>
          <div class="tabs_lists">
            <div class="tabs_lists_title">
              <i class="girls"></i>Basic Details
            </div>
            <div class="item_list">
              <div class="item_list_one">Name</div>
              <div class="item_list_two">
                {{ kundliBoth?.f_detail.name || '--' }}
              </div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Birth Date & Time</div>
              <div class="item_list_two">
                {{ timeDataList(kundliBoth?.f_detail.gender) }}
              </div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Birth Place</div>
              <div class="item_list_two">
                {{ kundliBoth?.f_detail.place || '--' }}
              </div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Janam Rashi</div>
              <div class="item_list_two">
                {{ sign[kundliData?.manglik.f_moon_sign] || '--' }}
              </div>
            </div>
          </div>
        </div>
        <google-ad :id="'1440112129'" classNames="google_ad_top"></google-ad>
        <div class="tips">
          {{ kundliData?.conclusion }}
        </div>
        <div class="sign_table">
          <p class="titles">Match Ashtakoot Points</p>
          <div class="planet">
            <table class="table_main">
              <thead class="theads">
                <tr>
                  <th>Attribute</th>
                  <th>Male</th>
                  <th>Female</th>
                  <th>Received</th>
                  <th>Out of</th>
                  <th>Area Of Life</th>
                  <th>Description</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody class="tbodys">
                <tr v-for="(item, index) in boys" :key="index">
                  <td>{{ capFirstLetter(item) }}</td>
                  <td>
                    {{
                      kundliData?.ashtkoot[item]?.male_koot_attribute || '--'
                    }}
                  </td>
                  <td>
                    {{
                      kundliData?.ashtkoot[item]?.female_koot_attribute || '--'
                    }}
                  </td>
                  <td>
                    {{ kundliData?.ashtkoot[item]?.received_points }}
                  </td>
                  <td>
                    {{ kundliData?.ashtkoot[item]?.total_points }}
                  </td>
                  <td>
                    {{ kundliData?.ashtkoot[item]?.description || '--' }}
                  </td>
                  <td>
                    {{ kundliData?.ashtkoot[item]?.description2 || '--' }}
                  </td>
                  <td>
                    {{
                      kundliData?.ashtkoot[item]?.attribute_description || '--'
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="more">
          <p class="title">Horoscopes</p>
          <el-explore-more />
        </div>
      </div>
    </div>
    <transition name="fade">
      <el-loading v-if="!kundliBoth"></el-loading>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boys: [
        'varna',
        'vashya',
        'tara',
        'yoni',
        'maitri',
        'gan',
        'bhakut',
        'nadi',
      ],
      sign: [
        '--',
        'Aries',
        'Taurus',
        'Gemini',
        'Cancer',
        'Leo',
        'Virgo',
        'Libra',
        'Scorpio',
        'Sagittarius',
        'Capricorn',
        'Aquarius',
        'Pisces',
      ],
      kundliBoth: null,
      kundliData: null,
    }
  },
  mounted() {
    if (process.client) {
      this.kundliBoth = JSON.parse(localStorage.getItem('kundliBoth'))
      this.kundliData = JSON.parse(localStorage.getItem('kundli'))
      console.log(this.kundliBoth, this.kundliData)
    }
  },
  methods: {
    capFirstLetter(i) {
      if (i) {
        return i?.charAt(0).toUpperCase() + i.slice(1)
      }
    },
    timeDataList(i) {
      if (!i) return '--'
      const months = [
        ' ',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      const male = this.kundliBoth?.m_detail
      const female = this.kundliBoth?.f_detail
      if (i == 'Male') {
        return `${male.day}  ${months[male.month]}  ${male.year} | ${
          male.hour
        } : ${male.min}`
      } else {
        return `${female?.day}  ${months[female?.month]}  ${female?.year} | ${
          female?.hour
        } : ${female?.min}`
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.kund {
  padding: 48px 0;
  .google_ad_top {
    width: 980px;
    height: 145px;
    margin: 0 auto 48px;
  }
  &_main {
    width: 1400px;
    margin: 0 auto;
    background: linear-gradient(
      0deg,
      hsla(0, 0%, 100%, 0.08),
      hsla(0, 0%, 100%, 0.08)
    );
    box-shadow: 0px 8px 26px 0px rgba(0, 0, 0, 0.25);
    position: relative;
    padding: 76px 118px 56px;
    .logos {
      position: absolute;
      top: 24px;
      left: 32px;
      width: 157px;
      height: 28px;
      background: url('~assets/img/home/logo.svg');
      background-size: cover;
    }
    .bg {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 664px;
      height: 664px;
      background: url('~/assets/img/kundli/kundli_sun.png') no-repeat;
      background-size: cover;
      mix-blend-mode: color-burn;
      z-index: -1;
      cursor: pointer;
    }
    .icon_bg {
      position: absolute;
      width: 100%;
      height: 1500px;
      left: 0;
      top: 0;
      padding-top: 300px;
      overflow: hidden;
      z-index: -1;
      i {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        display: inline-block;
        width: 604px;
        height: 764.52px;
        flex-shrink: 0;
        border-radius: 50%;
        background: rgba(151, 71, 255, 8.8);
        filter: blur(241px);
      }
    }
    .content {
      width: 100%;
      display: grid;
      gap: 32px;
      .title {
        color: #fff;
        font-family: Cinzel Decorative;
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 48px;
        text-align: center;
      }
      .love_conjugate {
        display: flex;
        justify-content: center;
        align-items: center;
        .duo {
          flex: 1;
          color: #fff;

          font-family: Rubik;
          font-size: 22px;
          font-style: normal;
          font-weight: 400;
          line-height: 30px;
        }
        .boys {
          text-align: right;
        }
        .girls {
          text-align: left;
        }
        .love {
          width: 220px;
          height: 178px;
          background: url('../../../assets/img/kundli/conjugate.svg') no-repeat;
          background-size: cover;
          margin: 0 16px;
          position: relative;
          .numbers {
            position: absolute;
            top: 25%;
            left: 50%;
            transform: translateX(-50%);
            color: #ffda8b;
            font-family: Cinzel Decorative;
            font-size: 46px;
            font-style: normal;
            font-weight: 700;
            line-height: 64px;
          }
        }
      }
      .bg_tabs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        .tabs_lists {
          width: 100%;
          &_title {
            color: #fff;
            font-family: 'Rubik';
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            background-color: #9747ff;
            padding: 3px 8px;
            display: flex;
            align-items: center;
          }
          .item_list {
            display: grid;
            grid-template-columns: 146px 1fr;
            padding-top: 1px;
            gap: 1px 1px;
            color: #fff;
            font-family: 'Rubik';
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            &_one {
              background: rgba(255, 255, 255, 0.04);
              padding: 3px 8px;
            }
            &_two {
              background: rgba(255, 255, 255, 0.08);
              padding: 3px 8px;
            }
          }
        }
        .boys {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: url('~/assets/img/kundli/boy.svg') no-repeat;
          background-size: cover;
          margin-right: 8px;
        }
        .girls {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: url('~/assets/img/kundli/girl.svg') no-repeat;
          background-size: cover;
          margin-right: 8px;
        }
      }
      .tips {
        border-radius: 16px;
        background: rgba(255, 83, 207, 0.5);
        color: #fff;
        font-family: Rubik;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        padding: 16px 24px;
      }
      .sign_table {
        .titles {
          color: #ffda8b;
          font-family: 'Cinzel Decorative';
          font-size: 22px;
          font-style: normal;
          font-weight: 700;
          line-height: 30px;
        }
        .planet {
          width: 100%;
          .table_main {
            width: 100%;
            border-collapse: separate;
            border-spacing: 1px 1px;
            .theads {
              tr {
                th {
                  padding: 3px 8px;
                  background: #ffda8b;
                  color: #79570e;
                  font-family: 'Rubik';
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 22px;
                  min-width: 70px;
                }
              }
            }
            .tbodys {
              tr {
                td {
                  padding: 3px 8px;
                  color: #fff;
                  font-family: 'Rubik';
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 22px;
                  background: rgba(255, 255, 255, 0.08);
                }
              }
            }
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
@media (max-width: 1470px) {
  .kund {
    padding: 48px 30px;
    .google_ad_top {
      width: 100%;
    }
    &_main {
      width: 100%;
    }
  }
}
@media (max-width: 1100px) {
  .kund {
    .google_ad_top {
      width: 100%;
    }
    &_main {
      padding: 76px 30px 56px;
      .content {
        width: 100%;
        .sign_table {
          width: 100%;
          overflow-x: scroll;
          .planet {
            overflow-x: scroll;
            &::-webkit-scrollbar {
              height: 5px;
            }
            &::-webkit-scrollbar-thumb {
              background-color: #888;
              border-radius: 6px;
            }

            &::-webkit-scrollbar-thumb:hover {
              background-color: #555;
            }
            .table_main {
              width: 1100px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .kund {
    padding: 0;
    .google_ad_top {
      width: 336 * $pr;
      height: 297 * $pr;
      margin: 0 auto 16 * $pr;
    }
    &_main {
      box-shadow: 0px 8 * $pr 26 * $pr 0px rgba(0, 0, 0, 0.25);
      position: relative;
      padding: 24 * $pr 16 * $pr 32 * $pr;
      .logos {
        top: 16 * $pr;
        left: 16 * $pr;
        width: 112 * $pr;
        height: 20 * $pr;
        display: none;
      }
      .bg {
        width: 329 * $pr;
        height: 329 * $pr;
      }
      .icon_bg {
        height: 1450 * $pr;
        padding-top: 205 * $pr;
        i {
          width: 343 * $pr;
          height: 658 * $pr;
          filter: blur(241 * $pr);
        }
      }
      .content {
        width: 100%;
        display: grid;
        gap: 16 * $pr;
        .title {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
        }
        .love_conjugate {
          .duo {
            font-size: 16 * $pr;
            line-height: 22 * $pr;
          }
          .love {
            width: 109 * $pr;
            height: 88 * $pr;
            margin: 0 16 * $pr;
            .numbers {
              font-size: 22 * $pr;
              line-height: 30 * $pr;
            }
          }
        }
        .bg_tabs {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24 * $pr;
          .tabs_lists {
            width: 100%;
            &_title {
              font-size: 14 * $pr;
              line-height: 22 * $pr;
              padding: 3 * $pr 8 * $pr;
            }
            .item_list {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              padding-top: 1 * $pr;
              gap: 1 * $pr 1 * $pr;
              font-size: 14 * $pr;
              line-height: 22 * $pr;
              &_one {
                padding: 3 * $pr 8 * $pr;
              }
              &_two {
                padding: 3 * $pr 8 * $pr;
              }
            }
            .avakhada {
              padding: 3 * $pr 8 * $pr;
            }
          }
          .boys {
            width: 16 * $pr;
            height: 16 * $pr;
            margin-right: 8 * $pr;
          }
          .girls {
            width: 16 * $pr;
            height: 16 * $pr;
            margin-right: 8 * $pr;
          }
        }
        .tips {
          border-radius: 16 * $pr;
          font-size: 14 * $pr;
          line-height: 22 * $pr;
          padding: 16 * $pr 24 * $pr;
        }
        .sign_table {
          .planet {
            *::-webkit-scrollbar {
              display: block !important;
            }
            .table_main {
              width: 1030 * $pr;
              border-collapse: separate;
              border-spacing: 1 * $pr 1 * $pr;
              .theads {
                tr {
                  th {
                    padding: 3 * $pr 8 * $pr;
                    font-size: 14 * $pr;
                    line-height: 22 * $pr;
                    min-width: 70 * $pr;
                  }
                }
              }
              .tbodys {
                tr {
                  td {
                    padding: 3 * $pr 8 * $pr;
                    font-size: 14 * $pr;
                    line-height: 22 * $pr;
                  }
                }
              }
            }
          }
        }
        .more {
          .title {
            font-size: 22 * $pr;
            line-height: 30 * $pr;
          }
        }
      }
    }
  }
}
</style>
