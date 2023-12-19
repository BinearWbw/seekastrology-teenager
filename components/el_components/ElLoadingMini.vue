<template>
  <div class="loadings">
    <div class="loadings_main">
      <div class="spinner-box">
        <div class="blue-orbit leo"></div>
        <div class="green-orbit leo"></div>
        <div class="red-orbit leo"></div>
        <div class="white-orbit w1 leo"></div>
        <div class="white-orbit w2 leo"></div>
        <div class="white-orbit w3 leo"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use 'sass:math';
.loadings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 88;
  &_main {
    width: 150px;
    height: 150px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      border-radius: 50%;
      background-color: #9747ff;
      filter: blur(20px);
    }
    .spinner-box {
      width: 150px;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      z-index: 10;
      .leo {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      }
      .blue-orbit {
        width: 100px;
        height: 100px;
        border: 1px solid #91daffa5;
        -webkit-animation: spin3D 3s linear 0.2s infinite;
        animation: spin3D 3s linear 0.2s infinite;
      }
      .green-orbit {
        width: 80px;
        height: 80px;
        border: 1px solid #91ffbfa5;
        -webkit-animation: spin3D 2s linear 0s infinite;
        animation: spin3D 2s linear 0s infinite;
      }
      .red-orbit {
        width: 60px;
        height: 60px;
        border: 1px solid #ffca91a5;
        -webkit-animation: spin3D 1s linear 0s infinite;
        animation: spin3D 1s linear 0s infinite;
      }
      .white-orbit {
        width: 30px;
        height: 30px;
        border: 2px solid #ffffff;
        -webkit-animation: spin3D 10s linear 0s infinite;
        animation: spin3D 10s linear 0s infinite;
      }
      .w1 {
        transform: rotate3D(1, 1, 1, 90deg);
      }
      .w2 {
        transform: rotate3D(1, 2, 0.5, 90deg);
      }
      .w3 {
        transform: rotate3D(0.5, 1, 2, 90deg);
      }
      @keyframes spin3D {
        from {
          transform: rotate3d(0.5, 0.5, 0.5, 360deg);
        }
        to {
          transform: rotate3d(0deg);
        }
      }
    }
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .loadings {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &_main {
      width: 100 * $pr;
      height: 100 * $pr;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        border-radius: 50%;
        background-color: #9747ff;
        filter: blur(15 * $pr);
      }
      .spinner-box {
        width: 100 * $pr;
        height: 100 * $pr;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        z-index: 10;
        .leo {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
        }
        .blue-orbit {
          width: 65 * $pr;
          height: 65 * $pr;
          border: 1 * $pr solid #91daffa5;
          -webkit-animation: spin3D 3s linear 0.2s infinite;
          animation: spin3D 3s linear 0.2s infinite;
        }
        .green-orbit {
          width: 60 * $pr;
          height: 60 * $pr;
          border: 1 * $pr solid #91ffbfa5;
          -webkit-animation: spin3D 2s linear 0s infinite;
          animation: spin3D 2s linear 0s infinite;
        }
        .red-orbit {
          width: 50 * $pr;
          height: 50 * $pr;
          border: 1 * $pr solid #ffca91a5;
          -webkit-animation: spin3D 1s linear 0s infinite;
          animation: spin3D 1s linear 0s infinite;
        }
        .white-orbit {
          width: 30 * $pr;
          height: 30 * $pr;
          border: 1 * $pr solid #ffffff;
          -webkit-animation: spin3D 10s linear 0s infinite;
          animation: spin3D 10s linear 0s infinite;
        }
        .w1 {
          transform: rotate3D(1, 1, 1, 90deg);
        }
        .w2 {
          transform: rotate3D(1, 2, 0.5, 90deg);
        }
        .w3 {
          transform: rotate3D(0.5, 1, 2, 90deg);
        }
        @keyframes spin3D {
          from {
            transform: rotate3d(0.5, 0.5, 0.5, 360deg);
          }
          to {
            transform: rotate3d(0deg);
          }
        }
      }
    }
  }
}
</style>
