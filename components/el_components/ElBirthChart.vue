<template>
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
          <h3 class="title">*****'s <br />Birth Chart Report</h3>
          <p class="text">
            Seekastrlogy.com provides you with a personal birth horoscope that
            is relevant to you. Discover what makes you different, what
            distinctive personality traits you have, and what opportunities and
            challenges you need to be aware of as you journey through life.
          </p>
        </div>
        <div class="codex_imgs"></div>
      </div>
      <div class="your_birth">
        <div class="mains">
          <p class="title">Your Birth Information</p>
          <div class="location">
            <div class="location_item">
              <span>Date of birth:</span>&nbsp;June 2, 1990
            </div>
            <div class="location_item">
              <span>Time of birth:</span>&nbsp;5:26 P.M.
            </div>
            <div class="location_item">
              <span>Birth place:</span>&nbsp;加拿大
            </div>
          </div>
        </div>
      </div>
      <div class="sign_table">
        <div class="planet">
          <div class="planet_deg">
            <div class="title_i">
              <div class="os">Planet</div>
              <div class="os">Position Degrees</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Sun</div>
              <div class="item_list_two">12°</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Sun</div>
              <div class="item_list_two">12°</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Sun</div>
              <div class="item_list_two">12°</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Sun</div>
              <div class="item_list_two">12°</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Sun</div>
              <div class="item_list_two">12°</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Sun</div>
              <div class="item_list_two">12°</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Sun</div>
              <div class="item_list_two">12°</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Sun</div>
              <div class="item_list_two">12°</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Sun</div>
              <div class="item_list_two">12°</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Sun</div>
              <div class="item_list_two">12°</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Sun</div>
              <div class="item_list_two">12°</div>
            </div>
          </div>
          <div class="planet_sign">
            <div class="title_i">
              <div class="os">Sign</div>
              <div class="os">Position Minutes</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Virgo</div>
              <div class="item_list_two">12`</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Virgo</div>
              <div class="item_list_two">12`</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Virgo</div>
              <div class="item_list_two">12`</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Virgo</div>
              <div class="item_list_two">12`</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Virgo</div>
              <div class="item_list_two">12`</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Virgo</div>
              <div class="item_list_two">12`</div>
            </div>
            <div class="item_list">
              <div class="item_list_one">Virgo</div>
              <div class="item_list_two">12`</div>
            </div>
          </div>
        </div>
      </div>
      <div class="message">
        <div class="message_item">
          <p class="name">SUN</p>
          <p class="title">SCORPIO, 19°12'56"<br />FIFTH HOUSE</p>
          <p class="texts">
            The sun determines your ego, identity, and "role" in life. It's the
            core of who you are, and is the sign you're most likely to already
            know. Your Sun is in Scorpio, meaning you have a fundamental urge to
            get to the bottom of things, which can at times lead you to be
            manipulative or power-hungry, but it comes down to an intense
            passion for authenticity, real intimacy, and the truth. It's in your
            fifth house, meaning you feel the need to distinguish yourself from
            others through romance, self-expression, creativity, and pleasure
          </p>
        </div>
        <div class="message_item">
          <p class="name">SUN</p>
          <p class="title">SCORPIO, 19°12'56"<br />FIFTH HOUSE</p>
          <p class="texts">
            The sun determines your ego, identity, and "role" in life. It's the
            core of who you are, and is the sign you're most likely to already
            know. Your Sun is in Scorpio, meaning you have a fundamental urge to
            get to the bottom of things, which can at times lead you to be
            manipulative or power-hungry, but it comes down to an intense
            passion for authenticity, real intimacy, and the truth. It's in your
            fifth house, meaning you feel the need to distinguish yourself from
            others through romance, self-expression, creativity, and pleasure
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.universe {
  width: 100%;
  &_chart {
    width: 1164px;
    margin: 0 auto;
    padding: 78px 118px 105px;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.08) 0%,
        rgba(255, 255, 255, 0.08) 100%
      ),
      url('~/assets/img/home/birth_earth.png') no-repeat;
    box-shadow: 0px 8px 26px 0px rgba(0, 0, 0, 0.25);
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
          background: url('../../assets/img/home/share.svg') no-repeat;
          background-size: cover;
        }
      }
      .down {
        padding: 9px;
        > i {
          display: block;
          width: 24px;
          height: 24px;
          background: url('../../assets/img/home/down_i.svg') no-repeat;
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
        width: 394px;
        .title {
          color: #fff;
          font-family: 'Cinzel Decorative';
          font-size: 46px;
          font-style: normal;
          font-weight: 700;
          line-height: 64px;
        }
        .text {
          color: #fff;
          font-family: 'Rubik';
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
      &_imgs {
        width: 405px;
        height: 405px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
    .your_birth {
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      background: #9747ff;
      backdrop-filter: blur(8px);
      padding: 3px;
      margin: 48px 0;
      .mains {
        border-radius: 21px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(8px);
        padding: 13px 29px;
        .title {
          color: #fff;
          font-family: Rubik;
          font-size: 22px;
          font-style: normal;
          font-weight: 500;
          line-height: 30px;
        }
        .location {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          column-gap: 50px;
          padding-top: 9px;
          &_item {
            color: #fff;
            font-family: Rubik;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            > span {
              color: rgba(255, 255, 255, 0.6);
            }
          }
        }
      }
    }
    .sign_table {
      padding: 0 24px 48px;
      .title_i {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1px;
        .os {
          padding: 0 16px;
          background: #ffda8b;
          color: #0e0b1b;
          font-family: 'Rubik';
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px;
        }
      }
      .item_list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding-top: 1px;
        gap: 1px 1px;
        color: #fff;
        font-family: 'Rubik';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
        &_one {
          height: 28px;
          background: rgba(255, 255, 255, 0.03);
          padding-left: 16px;
        }
        &_two {
          height: 28px;
          background: rgba(255, 255, 255, 0.1);
          padding-left: 16px;
        }
      }
      .planet {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1px;

        &_deg {
          flex: 1;
        }
        &_sign {
          flex: 1;
        }
      }
    }
    .message {
      display: grid;
      row-gap: 48px;
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
        .title {
          color: #9747ff;
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
      .your_birth {
        border-radius: 24 * $pr;
        border: 1 * $pr solid rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(8 * $pr);
        padding: 3 * $pr;
        margin: 24 * $pr 0;
        .mains {
          border-radius: 21 * $pr;
          border: 1 * $pr solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(8 * $pr);
          padding: 21 * $pr;
          .title {
            font-size: 16 * $pr;
            line-height: 22 * $pr;
          }
          .location {
            display: grid;
            grid-template-columns: 1fr;
            column-gap: 0;
            row-gap: 9 * $pr;
            padding-top: 16 * $pr;
            &_item {
              font-size: 14 * $pr;
              line-height: 18 * $pr;
            }
          }
        }
      }
      .sign_table {
        padding: 0 0 24 * $pr;
        .title_i {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          column-gap: 1 * $pr;
          .os {
            padding: 0 16 * $pr;
            font-size: 14 * $pr;
            line-height: 24 * $pr;
          }
        }
        .item_list {
          padding-top: 1 * $pr;
          gap: 1 * $pr 1 * $pr;
          font-size: 14 * $pr;
          line-height: 24 * $pr;
          &_one {
            height: 24 * $pr;
            background: rgba(255, 255, 255, 0.03);
            padding-left: 16 * $pr;
          }
          &_two {
            height: 24 * $pr;
            background: rgba(255, 255, 255, 0.1);
            padding-left: 16 * $pr;
          }
        }
        .planet {
          display: grid;
          grid-template-columns: 1fr;
          column-gap: 0;
          row-gap: 16 * $pr;

          &_deg {
            flex: 1;
          }
          &_sign {
            flex: 1;
          }
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
