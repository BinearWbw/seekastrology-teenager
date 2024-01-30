<template>
  <div class="tips_main" @click="closePrompt">
    <div class="shadow">
      <div class="pop_up">
        <div class="list_one">
          <p class="p_i">SAVE TO HOME</p>
          <p class="p_t">For Quick Access Anytime and Anywhere!</p>
        </div>
        <div class="set_list" v-if="isDesktop" key="1">
          <div class="step">
            <div class="step_i">
              <span class="step_h">Step 1</span>
              <span class="step_t">- Tap the 'Menu' Icon aaaaa</span>
            </div>
            <img
              class="step_img"
              src="~/assets/img/down/android_1.png"
              alt="#"
            />
          </div>
          <div class="step">
            <div class="step_i">
              <span class="step_h">Step 2</span>
              <span class="step_t">- Tap the 'Install app' Icon</span>
            </div>
            <img
              class="step_img"
              src="~/assets/img/down/android_2.png"
              alt="equip"
            />
          </div>
          <div class="step">
            <div class="step_i">
              <span class="step_h">Step 3</span>
              <span class="step_t">- Click 'Install'</span>
            </div>
            <img
              class="step_img"
              src="~/assets/img/down/android_3.png"
              alt="equip3"
            />
          </div>
        </div>
        <div class="set_list" v-if="!isDesktop" key="2">
          <div class="step">
            <div class="step_i">
              <span class="step_h">Step 1</span>
              <span class="step_t">- Tap the 'Share' Icon </span>
            </div>
            <img class="step_img" src="~/assets/img/down/ios_1.png" alt="1" />
          </div>
          <div class="step">
            <div class="step_i">
              <span class="step_h">Step 2</span>
              <span class="step_t">- Select 'Add To Home Screen'</span>
            </div>
            <img
              class="step_img"
              src="~/assets/img/down/ios_2.png"
              alt="equip"
            />
          </div>
          <div class="step">
            <div class="step_i">
              <span class="step_h">Step 3</span>
              <span class="step_t">- Click 'Add'</span>
            </div>
            <img
              class="step_img"
              src="~/assets/img/down/ios_3.png"
              alt="equip3"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDesktop: '',
    }
  },
  created() {
    if (typeof navigator !== 'undefined') {
      // 检测是否是Android设备
      const andarid = /Android/.test(navigator.userAgent)
      this.isDesktop = andarid
      console.log('isAndroid:', this.isDesktop)
    }
  },
  methods: {
    closePrompt() {
      this.$emit('closePro', false)
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.tips_main {
  display: none;
}

@media (max-width: (750px)) {
  $pr: math.div(1vw, 3.75);
  .tips_main {
    display: block;
    width: 100%;
    height: 100vh;
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    .shadow {
      height: 100%;
      position: relative;

      .pop_up {
        border-radius: 16 * $pr 16 * $pr 0px 0px;
        background: #9747ff;
        padding: 16 * $pr 24 * $pr 24 * $pr;
        position: absolute;
        bottom: 0;
        .list_one {
          font-family: Rubik;
          color: #fff;
          font-style: normal;
          padding-bottom: 24 * $pr;
          position: relative;
          &::after {
            position: absolute;
            content: '';
            width: 100%;
            height: 1 * $pr;
            bottom: 0;
            left: 0;
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.2) 50.52%,
              rgba(255, 255, 255, 0) 100%
            );
          }
          .p_i {
            text-align: center;
            font-size: 22 * $pr;
            font-weight: 600;
            line-height: 30 * $pr;
          }
          .p_t {
            text-align: center;
            font-size: 14 * $pr;
            font-weight: 400;
            line-height: 18 * $pr;
          }
        }
        .set_list {
          display: grid;
          gap: 24 * $pr;
          padding-top: 24 * $pr;
          .step {
            .step_i {
              font-family: Rubik;
              font-style: normal;
              padding-bottom: 5 * $pr;
              .step_h {
                color: #fff;
                text-align: center;
                font-size: 16 * $pr;
                font-weight: 600;
                line-height: 22 * $pr;
              }
              .step_t {
                color: #fff;
                text-align: center;
                font-size: 16 * $pr;
                font-weight: 400;
                line-height: 22 * $pr;
              }
            }
            .step_img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
