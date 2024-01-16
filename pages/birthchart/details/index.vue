<template>
  <div class="chart_details">
    <div class="universe">
      <google-ad :id="'5954072207'" classNames="google_ad_top"></google-ad>
      <div class="universe_chart">
        <div class="down_color" ref="universechar">
          <i class="logos"></i>
          <div class="icon_bg">
            <i></i>
          </div>
          <div class="feature_icon">
            <!-- <div class="share"><i></i></div> -->
            <div class="down" @click="downBirth"><i></i></div>
          </div>
          <div class="codex">
            <div class="codex_left">
              <h3 class="title">
                {{ birth_dtls?.name || '****' }}'s <br />Birth Chart Report
              </h3>
              <p class="text">
                Seekastrlogy.com provides you with a personal birth horoscope
                that is relevant to you. Discover what makes you different, what
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
                      {{ birth_dtls?.name || '--' }}
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
                        $utils.formatBasicTime(
                          birth_dtls.hour,
                          birth_dtls.minute
                        )
                      }}
                    </div>
                  </div>
                  <div class="item_list">
                    <div class="item_list_one">Place</div>
                    <div class="item_list_two">
                      {{ birth_dtls.place || '--' }}
                    </div>
                  </div>
                  <div class="item_list">
                    <div class="item_list_one">Latitude</div>
                    <div class="item_list_two">
                      {{ birth_dtls.latitude || '--' }}
                    </div>
                  </div>
                  <div class="item_list">
                    <div class="item_list_one">Longitude</div>
                    <div class="item_list_two">
                      {{ birth_dtls.longitude || '--' }}
                    </div>
                  </div>
                  <div class="item_list">
                    <div class="item_list_one">Timezone</div>
                    <div class="item_list_two">
                      <span v-if="birth_dtls.timezone">
                        {{ 'GMT + ' + birth_dtls.timezone }}</span
                      >
                      <span v-else>--</span>
                    </div>
                  </div>
                  <div class="item_list">
                    <div class="item_list_one">Sunrise</div>
                    <div class="item_list_two">
                      {{ birth_dtls.sunrise || '--' }}
                    </div>
                  </div>
                  <div class="item_list">
                    <div class="item_list_one">Sunset</div>
                    <div class="item_list_two">
                      {{ birth_dtls.sunset || '--' }}
                    </div>
                  </div>
                  <div class="item_list">
                    <div class="item_list_one">Ayanamsha</div>
                    <div class="item_list_two">
                      {{ birth_dtls.ayanamsha || '--' }}
                    </div>
                  </div>
                </div>
                <div class="tabs_lists">
                  <div class="tabs_lists_title">Panchang Details</div>
                  <div
                    class="item_list"
                    v-for="(item, index) in astroPanChang"
                    :key="index"
                  >
                    <div class="item_list_one">{{ item }}</div>
                    <div class="item_list_two">
                      {{ astro_dtls[item] || '--' }}
                    </div>
                  </div>
                  <div class="item_list">
                    <div class="item_list_one">Nakshatra</div>
                    <div class="item_list_two">
                      {{ astro_dtls.Naksahtra || '--' }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="tabs_lists">
                <div class="tabs_lists_title">Avakhada Details</div>
                <div
                  class="item_list"
                  v-for="(item, index) in astroAvak"
                  :key="index"
                >
                  <div class="item_list_one avakhada">{{ item.name }}</div>
                  <div class="item_list_two avakhada">
                    {{ astro_dtls[item.type] || '--' }}
                  </div>
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
                  <tr v-for="(t, i) in planet_ext_dtls" :key="i">
                    <td>{{ nameToLower(t.name) }}</td>
                    <td>{{ t.sign }}</td>
                    <td>{{ t.signLord }}</td>
                    <td>{{ t.nakshatra }}</td>
                    <td>{{ t.nakshatraLord }}</td>
                    <td>{{ degreeNum(t.fullDegree) }}</td>
                    <td>{{ retroFelg(t.isRetro) }}</td>
                    <td>{{ t.is_planet_set ? 'Yes' : 'No' }}</td>
                    <td>{{ t.planet_awastha }}</td>
                    <td>{{ t.house }}</td>
                    <td>{{ nameToLower(t.status) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="message">
            <p class="titles">General</p>
            <div
              class="message_item"
              v-for="(item, index) in general"
              :key="index"
            >
              <p class="name">{{ item.title }}</p>
              <p class="texts">
                {{ item.content }}
              </p>
            </div>
          </div>
          <div class="message">
            <p class="titles">Planetary</p>
            <div
              class="message_item"
              v-for="(item_i, index_i) in planetary"
              :key="index_i"
            >
              <p class="name">{{ item_i.Planet_name }} Consideration</p>
              <p class="texts">
                {{ item_i.Result }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <el-loading v-if="isLoading"></el-loading>
    </transition>
    <a
      :href="downloadUrl"
      download="generated_image.jpg"
      ref="downloadLink"
      style="display: none"
    ></a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import domToImage from 'dom-to-image'
export default {
  data() {
    return {
      astroPanChang: ['Tithi', 'Karan', 'Yog'],
      astroAvak: [
        {
          name: 'Varna',
          type: 'Varna',
        },
        {
          name: 'Vashya',
          type: 'Vashya',
        },
        {
          name: 'Yoni',
          type: 'Yoni',
        },
        {
          name: 'Gan',
          type: 'Gan',
        },
        {
          name: 'Nadi',
          type: 'Nadi',
        },
        {
          name: 'Sign',
          type: 'sign',
        },
        {
          name: 'Sign Lord',
          type: 'SignLord',
        },
        {
          name: 'Nakshatra-Charan',
          type: 'NaksahtraLord',
        },
        {
          name: 'Yog',
          type: 'Yog',
        },
        {
          name: 'Karan',
          type: 'Karan',
        },
        {
          name: 'Tithi',
          type: 'Tithi',
        },
        {
          name: 'Yunja',
          type: 'yunja',
        },
        {
          name: 'Tatva',
          type: 'tatva',
        },
        {
          name: 'Name alphabet',
          type: 'name_alphabet',
        },
        {
          name: 'Paya',
          type: 'paya',
        },
      ],
      birth_dtls: {},
      astro_dtls: {},
      planet_ext_dtls: [],
      general: [],
      planetary: [],
      isLoading: true,
      downloadUrl: '',
    }
  },
  computed: {},
  mounted() {
    if (process.client) {
      const births = JSON.parse(localStorage.getItem('births'))
      if (!births) return
      this.birth_dtls = births.general?.birth_dtls
      this.astro_dtls = births.general?.astro_dtls
      this.planet_ext_dtls = births.general?.planet_ext_dtls
      this.general = births.report?.Ascendant?.Result
      this.planetary = births.report?.planet_report
      this.isLoading = false
    }
  },
  methods: {
    retroFelg(i) {
      const retro = String(i)
      return retro == 'true' ? 'Retro' : 'Direct'
    },
    // 全大写转首字母大写
    nameToLower(i) {
      let originalString = i
      let formattedString =
        originalString.charAt(0) + originalString.slice(1).toLowerCase()
      return formattedString || '--'
    },

    // 角度转换为度分秒形式
    degreeNum(i) {
      const deg = Math.floor(i)
      const min = Math.floor((i - deg) * 60)
      const sec = Math.round((i - deg - min / 60) * 3600)
      return `${deg}∘${min}′${sec}″ `
    },

    // 保存当前结果图片
    downBirth() {
      if (process.client) {
        // 在客户端执行的代码
        const container = this.$refs.universechar
        if (container) {
          container.style.backgroundColor = '#371C60'
          domToImage
            .toBlob(container)
            .then((blob) => {
              const url = window.URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'generated_image.jpg'
              a.click()
              window.URL.revokeObjectURL(url)
              container.style.backgroundColor = ''
            })
            .catch((error) => {
              console.error('Error generating image:', error)
            })
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.chart_details {
  .universe {
    width: 100%;
    .google_ad_top {
      width: 980px;
      height: 145px;
      margin: 24px auto 0;
    }
    &_chart {
      width: 1400px;
      margin: 48px auto;
      .down_color {
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
          top: -180px;
          right: 60px;
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
                  background: rgba(255, 255, 255, 0.04);
                  padding: 3px 8px;
                }
                &_two {
                  background: rgba(255, 255, 255, 0.08);
                  padding: 3px 8px;
                }
              }
              .avakhada {
                padding: 3.5px 8px;
              }
            }
          }
        }
        .sign_table {
          .titles {
            width: 100%;
          }
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
}
@media (max-width: 1500px) {
  .chart_details {
    .universe {
      padding: 0 40px;
      &_chart {
        width: 100%;
        .down_color {
          .feature_icon {
            top: 24px;
            right: 24px;
          }
          .codex {
            &_left {
              width: 640px;
            }
            &_imgs {
              width: 300px;
              height: 300px;
            }
          }
          .sign_table {
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
                width: 1164px;
              }
            }
          }
        }
      }
    }
  }
}
@media (max-width: 1250px) {
  .chart_details {
    .universe {
      padding: 0 40px;
      &_chart {
        width: 100%;
        .down_color {
          .codex {
            &_left {
              flex: 1;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 1100px) {
  .universe {
    .google_ad_top {
      width: 100% !important;
      padding: 0 30px;
    }
    &_chart {
      .down_color {
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
        .your_birth {
          &_basic {
            grid-template-columns: repeat(1, 1fr) !important;
          }
        }
      }
    }
  }
}
@media (max-width: 900px) {
  .chart_details {
    .universe {
      &_chart {
        .down_color {
          padding: 48px;
          .codex {
            &_left {
              width: 100%;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);

  .chart_details {
    .universe {
      width: 100%;
      padding: 0 16 * $pr;
      .google_ad_top {
        width: 336 * $pr !important;
        height: 297 * $pr !important;
        margin: 16 * $pr auto 0;
        padding: 0;
      }
      &_chart {
        margin: 16 * $pr auto 48 * $pr;
        .down_color {
          padding: 60 * $pr 16 * $pr 33 * $pr;
          box-shadow: 0 8 * $pr 26 * $pr 0 rgba(0, 0, 0, 0.25);
          background-position: -18 * $pr 0;
          background-size: 343 * $pr;
          .logos {
            top: 16 * $pr;
            left: 16 * $pr;
            width: 113 * $pr;
            height: 20 * $pr;
          }
          .icon_bg {
            position: absolute;
            width: 100%;
            height: 1500 * $pr;
            left: 0;
            top: 0;
            padding-top: 300 * $pr;
            overflow: hidden;
            z-index: -1;
            i {
              width: 404 * $pr;
              height: 500 * $pr;
              filter: blur(220 * $pr);
            }
          }
          .feature_icon {
            top: 467 * $pr;
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
              .title {
                font-size: 22 * $pr;
                line-height: 30 * $pr;
                margin-bottom: 0;
              }
              .text {
                font-size: 14 * $pr;
                line-height: 24 * $pr;
              }
            }
            &_imgs {
              width: 311 * $pr;
              height: 311 * $pr;
            }
          }
          .titles {
            font-size: 22 * $pr;
            line-height: 30 * $pr;
          }
          .your_birth {
            margin: 16 * $pr 0;
            &_basic {
              gap: 16 * $pr;
              padding-top: 9 * $pr;
              .item_lists {
                gap: 16 * $pr;
              }
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
            }
          }
          .sign_table {
            .planet {
              padding-top: 9 * $pr;
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
          .message {
            row-gap: 9 * $pr;
            margin-top: 16 * $pr;
            &_item {
              .name {
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
  }
}
</style>
