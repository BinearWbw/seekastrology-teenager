<template>
  <div class="chart_details">
    <div class="universe">
      <div class="universe_chart">
        <i class="logos"></i>
        <div class="icon_bg">
          <i></i>
        </div>
        <div class="feature_icon">
          <div class="share"><i></i></div>
          <div class="down"><i></i></div>
        </div>
        <div class="codex">
          <div class="codex_left">
            <h3 class="title">
              {{ birth_dtls?.name }}'s <br />Birth Chart Report
            </h3>
            <p class="text">
              Seekastrlogy.com provides you with a personal birth horoscope that
              is relevant to you. Discover what makes you different, what
              distinctive personality traits you have, and what opportunities
              and challenges you need to be aware of as you journey through
              life.
            </p>
          </div>
          <div class="codex_imgs"></div>
        </div>
        <div class="your_birth">
          <p class="titles">Basic</p>
          <div class="your_birth_basic">
            <div class="item_lists">
              <div class="tabs_lists">
                <div class="tabs_lists_title">Basic Details</div>
                <div class="item_list">
                  <div class="item_list_one">Name</div>
                  <div class="item_list_two">
                    {{ birth_dtls?.name }}
                  </div>
                </div>
                <div class="item_list">
                  <div class="item_list_one">Date</div>
                  <div class="item_list_two">
                    {{
                      $utils.formatBasicDate(
                        birth_dtls.month,
                        birth_dtls.day,
                        birth_dtls.year
                      )
                    }}
                  </div>
                </div>
                <div class="item_list">
                  <div class="item_list_one">Time</div>
                  <div class="item_list_two">
                    {{
                      $utils.formatBasicTime(birth_dtls.hour, birth_dtls.minute)
                    }}
                  </div>
                </div>
                <div class="item_list">
                  <div class="item_list_one">Place</div>
                  <div class="item_list_two">{{ birth_dtls.place }}</div>
                </div>
                <div class="item_list">
                  <div class="item_list_one">Latitude</div>
                  <div class="item_list_two">{{ birth_dtls.latitude }}</div>
                </div>
                <div class="item_list">
                  <div class="item_list_one">Longitude</div>
                  <div class="item_list_two">{{ birth_dtls.longitude }}</div>
                </div>
                <div class="item_list">
                  <div class="item_list_one">Timezone</div>
                  <div class="item_list_two">--</div>
                </div>
                <div class="item_list">
                  <div class="item_list_one">Sunrise</div>
                  <div class="item_list_two">
                    {{ birth_dtls.sunrise || '--' }}
                  </div>
                </div>
                <div class="item_list">
                  <div class="item_list_one">Sunset</div>
                  <div class="item_list_two">{{ birth_dtls.sunset }}</div>
                </div>
                <div class="item_list">
                  <div class="item_list_one">Ayanamsha</div>
                  <div class="item_list_two">{{ birth_dtls.ayanamsha }}</div>
                </div>
              </div>
              <div class="tabs_lists">
                <div class="tabs_lists_title">Panchang Details</div>
                <div class="item_list">
                  <div class="item_list_one">1</div>
                  <div class="item_list_two">2</div>
                </div>
                <div class="item_list">
                  <div class="item_list_one">1</div>
                  <div class="item_list_two">2</div>
                </div>
                <div class="item_list">
                  <div class="item_list_one">1</div>
                  <div class="item_list_two">2</div>
                </div>
                <div class="item_list">
                  <div class="item_list_one">1</div>
                  <div class="item_list_two">2</div>
                </div>
                <div class="item_list">
                  <div class="item_list_one">1</div>
                  <div class="item_list_two">2</div>
                </div>
                <div class="item_list">
                  <div class="item_list_one">1</div>
                  <div class="item_list_two">2</div>
                </div>
              </div>
            </div>
            <div class="tabs_lists">
              <div class="tabs_lists_title">Avakhada Details</div>
              <div class="item_list">
                <div class="item_list_one">1</div>
                <div class="item_list_two">2</div>
              </div>
            </div>
          </div>
        </div>
        <div class="sign_table">
          <p class="titles">Planets</p>
          <div class="planet">
            <table class="table_main">
              <thead class="theads">
                <tr>
                  <th>Planet</th>
                  <th>Sign</th>
                  <th>Sign Lord</th>
                  <th>Nakshatra</th>
                  <th>Naksh Lord</th>
                  <th>Degree</th>
                  <th>Retro(R)</th>
                  <th>Combust</th>
                  <th>Avastha</th>
                  <th>House</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody class="tbodys">
                <tr>
                  <td>Row 1, Cell 1</td>
                  <td>Aquarius</td>
                  <td>Row 1, Cell 3</td>
                </tr>
                <tr>
                  <td>Row 2, Cell 1</td>
                  <td>Row 2, Cell 2</td>
                  <td>Row 2, Cell 3</td>
                </tr>
                <tr>
                  <td>Row 3, Cell dakjdwajw</td>
                  <td>Row 3, Cell 2</td>
                  <td>Row 3, Cell 3</td>
                  <td>Row 3, Cell 3</td>
                  <td>Row 3, Cell 3</td>
                  <td>Row 3,adw Cell 3</td>
                  <td>Row 3, Cell 3</td>
                  <td>Row 3, Cell 3</td>
                  <td>Row 3, 3</td>
                  <td>Row 3, Cell 3</td>
                  <td>Row 3, Cell 3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="message">
          <p class="titles">General</p>
          <div class="message_item">
            <p class="name">Sun</p>
            <p class="texts">
              The sun determines your ego, identity, and "role" in life. It's
              the core of who you are, and is the sign you're most likely to
            </p>
          </div>
          <div class="message_item">
            <p class="name">Sun</p>
            <p class="texts">
              The sun determines your ego, identity, and "role" in life. It's
              the core of who you are, and is the sign you're most likely to
            </p>
          </div>
        </div>
        <div class="message">
          <p class="titles">Planets</p>
          <div class="message_item">
            <p class="name">Sun</p>
            <p class="texts">
              The sun determines your ego, identity, and "role" in life. It's
              the core of who you are, and is the sign you're most likely to
            </p>
          </div>
          <div class="message_item">
            <p class="name">Sun</p>
            <p class="texts">
              The sun determines your ego, identity, and "role" in life. It's
              the core of who you are, and is the sign you're most likely to
            </p>
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
      birthData: [
        'Sun',
        'Ascendant',
        'Jupiter',
        'Mars',
        'Mercury',
        'Moon',
        'Neptune',
        'Pluto',
        'Saturn',
        'Uranus',
        'Venus',
      ],
      houseNumber: [
        'FIRST HOUSE',
        'SECOND HOUSE',
        'THIRD HOUSE',
        'FOURTH HOUSE',
        'FIFTH HOUSE',
        'SIXTH HOUSE',
        'SEVENTH HOUSE',
        'EIGHTH HOUSE',
        'NINTH HOUSE',
        'TENTH HOUSE',
        'ELEVENTH HOUSE',
        'TWELFTH HOUSE',
      ],
      births: {},
      birth_dtls: {},
    }
  },
  computed: {},
  created() {
    if (process.client) {
      this.births = JSON.parse(localStorage.getItem('births'))
      console.log('出生数据', this.births)
      this.birth_dtls = this.births.general.birth_dtls
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.chart_details {
  .universe {
    width: 100%;
    &_chart {
      width: 1400px;
      margin: 48px auto;
      padding: 76px 118px;
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.08) 0%,
          rgba(255, 255, 255, 0.08) 100%
        ),
        url('~/assets/img/home/birth_earth.png') no-repeat;
      box-shadow: 0px 8px 26px 0px rgba(0, 0, 0, 0.25);
      background-position: 61px 0;
      flex-shrink: 0;
      position: relative;

      .logos {
        position: absolute;
        top: 24px;
        left: 24px;
        width: 157px;
        height: 28px;
        background: url('~assets/img/home/logo.svg');
        background-size: cover;
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
      .feature_icon {
        position: absolute;
        top: 0;
        right: -58px;
        border-radius: 6px;
        background: rgba(0, 0, 0, 0.6);
        overflow: hidden;
        cursor: pointer;
        .share {
          padding: 9px;
          > i {
            display: block;
            width: 24px;
            height: 24px;
            background: url('~/assets/img/home/share.svg') no-repeat;
            background-size: cover;
          }
        }
        .down {
          padding: 9px;
          > i {
            display: block;
            width: 24px;
            height: 24px;
            background: url('~/assets/img/home/down_i.svg') no-repeat;
            background-size: cover;
          }
        }
      }
      .codex {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &_left {
          width: 740px;
          .title {
            color: #fff;
            font-family: 'Cinzel Decorative';
            font-size: 46px;
            font-style: normal;
            font-weight: 700;
            line-height: 64px;
            margin-bottom: 16px;
          }
          .text {
            font-family: 'Rubik';
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: rgba(255, 255, 255, 0.6);
            line-height: 24px;
          }
        }
        &_imgs {
          width: 338px;
          height: 338px;
          border-radius: 50%;
          background: url('~/assets/img/home/birthplace.png') no-repeat;
          background-size: cover;
        }
      }
      .titles {
        color: #ffda8b;
        font-family: 'Cinzel Decorative';
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 30px;
      }
      .your_birth {
        margin: 32px 0;
        &_basic {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          padding-top: 9px;
          .item_lists {
            display: grid;
            gap: 16px;
          }
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
                background: rgba(255, 255, 255, 0.03);
                padding: 3px 8px;
              }
              &_two {
                background: rgba(255, 255, 255, 0.1);
                padding: 3px 8px;
              }
            }
          }
        }
      }
      .sign_table {
        .planet {
          width: 100%;
          padding-top: 9px;
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
      .message {
        display: grid;
        row-gap: 16px;
        margin-top: 32px;
        &_item {
          font-family: 'Rubik';
          font-style: normal;
          .name {
            color: #fff;
            font-weight: 500;
            font-size: 22px;
            font-weight: 500;
            line-height: 30px;
          }
          .texts {
            color: rgba(255, 255, 255, 0.6);
            font-size: 16px;
            font-weight: 400;
            line-height: 28px;
          }
        }
      }
    }
  }
}
@media (max-width: 1250px) {
  .universe {
    &_chart {
      width: 100%;
      .feature_icon {
        top: 16px;
        right: 16px;
      }
    }
  }
}
@media (max-width: 1100px) {
  .universe {
    &_chart {
      padding: 78px 60px 105px;
      .codex {
        justify-content: initial;
        align-items: center;
        flex-direction: column;
        &_left {
          margin-bottom: 24px;
          .title {
            text-align: center;
          }
          .text {
            text-align: center;
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .universe {
    padding: 0 16 * $pr;
    &_chart {
      width: 100%;
      margin: 0 auto;
      padding: 60 * $pr 16 * $pr 105 * $pr;
      background-size: 100%;
      box-shadow: 0px 8 * $pr 26 * $pr 0px rgba(0, 0, 0, 0.25);
      .logos {
        top: 16 * $pr;
        left: 16 * $pr;
        width: 112 * $pr;
        height: 20 * $pr;
      }
      .icon_bg {
        height: 1500 * $pr;
        padding-top: 300 * $pr;
        i {
          width: 343 * $pr;
          height: 658 * $pr;
          flex-shrink: 0;
          border-radius: 658.56 * $pr;
          background: rgba(151, 71, 255, 0.69);
          filter: blur(90 * $pr);
        }
      }
      .feature_icon {
        top: 500 * $pr;
        right: 9 * $pr;
        border-radius: 6 * $pr;
        display: flex;
        .share {
          padding: 9 * $pr;
          > i {
            width: 24 * $pr;
            height: 24 * $pr;
          }
        }
        .down {
          padding: 9 * $pr;
          > i {
            width: 24 * $pr;
            height: 24 * $pr;
          }
        }
      }
      .codex {
        &_left {
          width: 100%;
          margin-bottom: 24 * $pr;
          .title {
            font-size: 22 * $pr;
            line-height: 30 * $pr;
          }
          .text {
            font-size: 14 * $pr;
            line-height: 28 * $pr;
            color: rgba(255, 255, 255, 0.6);
          }
        }
        &_imgs {
          width: 311 * $pr;
          height: 311 * $pr;
        }
      }
      .sign_table {
        padding: 0 0 24 * $pr;
        .planet {
        }
      }
      .message {
        row-gap: 24 * $pr;
        &_item {
          .name {
            font-weight: 500;
            font-size: 16 * $pr;
            line-height: 28 * $pr;
          }
          .title {
            font-size: 16 * $pr;
            line-height: 28 * $pr;
          }
          .texts {
            font-size: 14 * $pr;
            line-height: 24 * $pr;
          }
        }
      }
    }
  }
}
</style>
