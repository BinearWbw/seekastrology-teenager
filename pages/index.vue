<template>
  <article class="home">
    <div class="meteor">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <google-ad :id="'8015383208'" classNames="google_ad_h5"></google-ad>
    <div class="home__main">
      <section class="module choice">
        <google-auto-ad :id="'1087831010'" classNames="google_ad_pc" />
        <home-your-choice></home-your-choice>
      </section>
      <section class="module explore">
        <el-explore-more />
        <google-auto-ad :id="'1626224357'" classNames="google_ad" />
      </section>
      <section class="module tarot">
        <el-tarot-world />
      </section>
      <section class="module quizzes">
        <home-quizzes></home-quizzes>
      </section>
      <section class="module new_pop">
        <home-pop-articles></home-pop-articles>
        <google-auto-ad
          classNames="google_ad"
          :id="'2699524105'"
        ></google-auto-ad>
      </section>
    </div>
    <section class="all_tarot">
      <tarot-all-tarot></tarot-all-tarot>
    </section>
  </article>
</template>

<script>
export default {
  name: 'Home',
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
.home {
  position: relative;
  .meteor {
    span {
      position: absolute;
      width: 4px;
      height: 4px;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1),
        0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 1);
      opacity: 0;
      animation: animate 3s linear infinite;
      z-index: 66;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100px;
        height: 3px;
        background: linear-gradient(90deg, #fff, transparent);
      }
      &:nth-child(1) {
        top: -10%;
        right: 0;
        left: initial;
        animation-delay: 0.3s;
        animation-duration: 1.6s;
      }
      &:nth-child(2) {
        top: -5%;
        right: 0;
        left: initial;
        animation-delay: 0.2s;
        animation-duration: 3s;
      }
      &:nth-child(3) {
        top: 0;
        right: 30%;
        left: initial;
        animation-delay: 0.4s;
        animation-duration: 2s;
      }
      &:nth-child(4) {
        top: -1%;
        right: 50%;
        left: initial;
        animation-delay: 0.6s;
        animation-duration: 1.5s;
      }
      &:nth-child(5) {
        top: 0;
        right: 60%;
        left: initial;
        animation-delay: 0.8s;
        animation-duration: 2.5s;
      }
      &:nth-child(6) {
        top: 0;
        right: 70%;
        left: initial;
        animation-delay: 1s;
        animation-duration: 3s;
      }
      &:nth-child(7) {
        top: -10%;
        right: 60%;
        left: initial;
        animation-delay: 1.2s;
        animation-duration: 1.75s;
      }
      &:nth-child(8) {
        top: 5%;
        right: 50%;
        left: initial;
        animation-delay: 1.4s;
        animation-duration: 1.25s;
      }
      &:nth-child(9) {
        top: 3%;
        right: 10%;
        left: initial;
        animation-delay: 0.75s;
        animation-duration: 2.25s;
      }
      &:nth-child(10) {
        top: 0;
        right: 0;
        left: initial;
        animation-delay: 2.75s;
        animation-duration: 2.25s;
      }
      @keyframes animate {
        0% {
          transform: rotate(315deg) translateX(0);
          opacity: 0;
          visibility: hidden;
        }
        30% {
          opacity: 0;
          visibility: hidden;
        }
        60% {
          opacity: 1;
          visibility: visible;
        }
        90% {
          opacity: 0;
          visibility: hidden;
        }
        100% {
          transform: rotate(315deg) translateX(-1000px);
          opacity: 0;
          visibility: hidden;
        }
      }
    }
  }
  .google_ad_h5 {
    display: none;
  }
  &__main {
    margin: 0 auto;
    width: 1400px;
    position: relative;
    .various_ment {
      padding-top: 100px;
    }
    .module {
      margin-top: 96px;

      .google_ad {
        width: 100%;
        color: #808080;
      }
      &.choice {
        margin-top: 24px;
        .google_ad_pc {
          max-width: 1200px;
          margin: 0 auto;
          margin-bottom: 24px;
        }
      }
      &.explore {
        margin-top: 56px;
        .google_ad {
          display: none;
        }
      }
      &.new_pop {
        .google_ad {
          margin: 96px auto;
          width: 1150px;
          height: 90px;
        }
      }
    }
  }
  .all_tarot {
    margin-bottom: 96px;
  }
}
@media (max-width: 1435px) {
  .home {
    &__main {
      width: 1200px;
    }
  }
}

@media (max-width: 1200px) {
  .home {
    &__main {
      width: 1000px;
      .module {
        margin-top: 100px;
        &.choice {
          .google_ad {
            width: 100%;
          }
        }
      }
    }
  }
}

@media (max-width: (1024px)) {
  .home {
    &__main {
      width: 100%;
      .module {
        margin-top: 100px;

        .google_ad {
          width: 100%;
        }
        &.choice {
          .google_ad {
            width: 100%;

            margin: 40px auto 0;
            padding: 0 50px;
            background-color: initial;
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .home {
    .meteor {
      span {
        &:nth-child(3) {
          display: none;
        }
        &:nth-child(4) {
          top: 30 * $pr;
          right: -20 * $pr;
          left: initial;
          animation-delay: 0.6s;
          animation-duration: 1.5s;
        }
        &:nth-child(6) {
          display: none;
        }
        &:nth-child(8) {
          display: none;
        }
        &:nth-child(10) {
          display: none;
        }
        @keyframes animate {
          0% {
            transform: rotate(315deg) translateX(0);
            opacity: 0;
            visibility: hidden;
          }
          30% {
            opacity: 1;
            visibility: visible;
          }
          40% {
            opacity: 0;
            visibility: hidden;
          }
          60% {
            opacity: 0;
            visibility: hidden;
          }
          90% {
            opacity: 0;
            visibility: hidden;
          }
          100% {
            transform: rotate(315deg) translateX(-1000px);
            opacity: 0;
            visibility: hidden;
          }
        }
      }
    }
    .google_ad_h5 {
      width: 100%;
      margin: 0 0 24 * $pr;
      padding: 0;
      height: 87 * $pr;
      display: block;
    }
    &__main {
      padding: 0 16 * $pr;
      width: 100%;
      .various_ment {
        padding-top: 48 * $pr;
      }
      .module {
        margin-top: 48 * $pr;
        &.choice {
          margin-top: 0;
          > .choice {
            padding: 0;
          }
          .google_ad_pc {
            display: none;
          }
        }
        &.explore {
          margin-top: 48 * $pr;
          .google_ad {
            display: block;
            width: 100%;
            margin-top: 48 * $pr;
          }
        }
        &.tarot {
          margin-top: 48 * $pr;
        }
        &.new_pop {
          > .pop_maximum {
            padding: 0;
          }
          .google_ad {
            margin: 40 * $pr auto 0;
            width: 100%;
            padding: 0;
            display: none;
          }
        }
      }
    }
    .all_tarot {
      margin-bottom: 0;
      padding-bottom: 48 * $pr;
    }
  }
}
</style>
