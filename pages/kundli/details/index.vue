<template>
  <div class="kund">
    <google-ad :id="''" classNames="google_ad_top"></google-ad>
    <div class="kund_main">
      <i class="logos"></i>
      <i class="bg"></i>
      <div class="icon_bg">
        <i></i>
      </div>
      <div class="content">
        <p class="title">Kundli Matching Report</p>
        <div class="love_conjugate">
          <div class="duo">Baibaili</div>
          <div class="love">
            <div class="numbers">26.3</div>
          </div>
          <div class="duo">Baibaili</div>
        </div>
        <div class="bg_tabs">
          <div class="tabs_lists">
            <div class="tabs_lists_title">
              <i class="boys"></i>Basic Details
            </div>
            <div class="item_list" v-for="(item, index) in boys" :key="index">
              <div class="item_list_one">{{ item.name }}</div>
              <div class="item_list_two">
                {{ item.name_i || '--' }}
              </div>
            </div>
          </div>
          <div class="tabs_lists">
            <div class="tabs_lists_title">
              <i class="girls"></i>Basic Details
            </div>
            <div class="item_list" v-for="(item, index) in boys" :key="index">
              <div class="item_list_one">{{ item.name }}</div>
              <div class="item_list_two">
                {{ item.name_i || '--' }}
              </div>
            </div>
          </div>
        </div>
        <div class="tips">
          Ashtakoot Matching between male and female is 26.5 points out of 36
          points. This is a reasonably good score. Hence, this is a favourable
          Ashtakoot match.The overall points of this couple represent a great
          combination, both the bride and the groom have no mangal dosh.
          Marriage is preferred. Consult an astrologer to get rid of the few
          remedies and the doshas present for a harmonious married life
          ahead.Both boy and girl are not Manglik, which does not lead to any
          problems.
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
                <tr>
                  <td>Varna</td>
                  <td>Vaishya</td>
                  <td>Brahmin</td>
                  <td>0</td>
                  <td>1</td>
                  <td>Natural Refinement / Work</td>
                  <td>
                    The work gunas don't match for this pair and the overall
                    compatibility may not be at its best
                  </td>
                  <td>
                    Varna refers to the mental compatibility of the two persons
                    involved. It holds nominal effect in the matters of marriage
                    compatibility.
                  </td>
                </tr>
                <tr>
                  <td>Varna</td>
                  <td>Vaishya</td>
                  <td>Brahmin</td>
                  <td>0</td>
                  <td>1</td>
                  <td>Natural Refinement / Work</td>
                  <td>
                    The work gunas don't match for this pair and the overall
                    compatibility may not be at its best
                  </td>
                  <td>
                    Varna refers to the mental compatibility of the two persons
                    involved. It holds nominal effect in the matters of marriage
                    compatibility.
                  </td>
                </tr>
                <tr>
                  <td>Varna</td>
                  <td>Vaishya</td>
                  <td>Brahmin</td>
                  <td>0</td>
                  <td>1</td>
                  <td>Natural Refinement / Work</td>
                  <td>
                    The work gunas don't match for this pair and the overall
                    compatibility may not be at its best
                  </td>
                  <td>
                    Varna refers to the mental compatibility of the two persons
                    involved. It holds nominal effect in the matters of marriage
                    compatibility.
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      boys: [
        { name: 'name', name_i: 'Yang Wei Guo' },
        { name: 'Birth Date & Time', name_i: '1 January 1990 | 1:1' },
        { name: 'Birth Place', name_i: 'New Delhi, Delhi, India' },
        { name: 'Janam Rashi', name_i: 'Aries' },
      ],
    }
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
          color: #fff;
          text-align: right;
          font-family: Rubik;
          font-size: 22px;
          font-style: normal;
          font-weight: 400;
          line-height: 30px;
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
}
</style>
