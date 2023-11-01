<template>
  <div class="quizzes_own">
    <div class="quizzes">
      <h3 :class="{ h5_size: $route.path !== '/' }">pOPULAR qUIZZES</h3>
      <div class="quizzes_sliding">
        <div class="quizzes_two">
          <div class="quizzes_two_list">
            <a
              :href="`/test/details/${item.name
                .trim()
                .replace(/[^\w\d]/g, '-')
                .toLowerCase()}-${item.id}/${getCurrentRoute}`"
              v-for="(item, index) in homeQuizzesData"
              :key="index"
            >
              <div class="matrix">
                <div class="imgs">
                  <nuxt-img
                    :src="item.icon || '/'"
                    fit="cover"
                    width="220"
                    height="220"
                    loading="lazy"
                    format="auto"
                    :alt="item.name"
                  ></nuxt-img>
                </div>
                <p>{{ item.name }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <button class="button" @click="pathToTestPage">Read More</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'quizzes',
  props: ['homeQuizzes'],
  data() {
    return {
      homeQuizzesData: [],
    }
  },
  async fetch() {
    let [homeQuizzesData] = await Promise.all([
      this.$apiList.home
        .getZodiacHomeQuiz({
          origin: process.env.origin,
        })
        .then((res) => {
          return res.list || []
        }),
    ])
    this.homeQuizzesData = homeQuizzesData
  },
  computed: {
    getCurrentRoute() {
      return this.$route.path === '/' ? '?from=home' : ''
    },
  },
  methods: {
    pathToTestPage() {
      window.changePageUrl =
        window.location.pathname === '/' ? '/test/?from=home' : '/test/'
      window.location =
        window.location.pathname === '/' ? '/test/?from=home' : '/test/'
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.quizzes_own {
  width: 1400px;
  margin: 30px auto 0;
  display: flex;
  align-items: flex-start;
  padding-top: 36px;
  justify-content: center;
  .quizzes {
    width: 928px;
    height: auto;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-family: 'Cinzel Decorative';
      font-weight: 700;
      font-size: 36px;
      line-height: 48px;
      color: #fff;
    }
    &_sliding {
      width: 100%;
      flex: 1;
      padding: 16px 0;
      display: flex;
      .banner {
        width: 64px;
        height: 220px;
        text-align: center;
        position: relative;
      }
      .quizzes_two {
        width: 100%;
        &_list {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px 16px;
          .matrix {
            width: 220px;
            border-radius: 12px;
            padding-bottom: 8px;
            transition: background-color 0.3s, transform 0.3s ease-in-out;
            .imgs {
              width: 100%;
              height: 220px;
              margin-bottom: 16px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 12px;
              }
            }
            p {
              color: rgba(255, 255, 255, 0.6);
              text-align: center;
              font-family: Rubik;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
              padding: 0 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            &:hover {
              transform: scale(1.04);
              background-color: rgba(238, 238, 244, 0.1);
            }
          }
        }
      }
    }
    .button {
      width: 220px;
      height: 44px;
      border: 1px solid #45454d;
      border-radius: 42px;
      font-family: 'Rubik';
      color: rgba(255, 255, 255, 0.6);
      font-size: 16px;
      line-height: 22px;
      -webkit-transition: background-color 0.3s, -webkit-color 0.3s;
      transition: background-color 0.3s, color 0.3s;
      color: #000;
      background-color: #fff;
    }
  }
}
@media (max-width: 1435px) {
  .quizzes_own {
    width: 1200px;
    .quizzes {
      width: auto;
      height: auto;

      &_sliding {
        .quizzes_two {
          &_list {
            grid-template-columns: repeat(3, 220px);
          }
        }
      }
    }
  }
}
@media (max-width: 1300px) {
  .quizzes_own {
    width: 1000px;
    .google_ad {
      width: 238px;
      height: 574px;
    }
  }
}

@media (max-width: (1100px)) {
  .quizzes_own {
    width: 100%;
    justify-content: space-evenly;
    .quizzes {
      padding: 0;
      &_sliding {
        .quizzes_two {
          &_list {
            grid-template-columns: repeat(2, 220px);
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .quizzes_own {
    width: 100%;
    margin: 48 * $pr auto 0;
    display: block;
    padding-top: 0;
    .quizzes {
      width: 100%;
      height: 100%;
      padding: 0 0 0;
      background-size: cover;
      h3 {
        font-size: 26 * $pr;
        line-height: 36 * $pr;
        text-align: center;
      }
      .h5_size {
        font-size: 26 * $pr;
        line-height: 36 * $pr;
      }
      &_sliding {
        width: 100%;
        padding: 16 * $pr 0 0;
        display: flex;
        .banner {
          display: none;
        }
        .quizzes_two {
          //   display: none;
          width: 100%;
          overflow-x: auto; /* 允许横向滚动 */
          margin-bottom: 16 * $pr;
          &_list {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 8 * $pr 16 * $pr;
            .matrix {
              width: 220 * $pr;
              border-radius: 12 * $pr;
              padding-bottom: 8 * $pr;
              .imgs {
                width: 100%;
                height: 220 * $pr;
                margin-bottom: 16 * $pr;
                img {
                  border-radius: 12 * $pr;
                }
              }
              p {
                width: 100%;
                font-size: 14 * $pr;
                line-height: 18 * $pr;
                padding: 0 5 * $pr;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }

              &:hover {
                transform: scale(1);
                background-color: rgba(238, 238, 244, 0.1);
              }
            }
          }
        }
      }
      .button {
        width: 295 * $pr;
        height: 44 * $pr;
        border-radius: 42 * $pr;
        font-size: 16 * $pr;
        line-height: 22 * $pr;
        border: 1 * $pr solid #45454d;
        background: #fff;
        color: #000;
      }
    }
  }
}
</style>
