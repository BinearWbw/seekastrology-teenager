<template>
  <div class="contact_main">
    <div class="title">
      <p class="title_name">Contact Us</p>
    </div>
    <div class="content">
      <div class="content_emails">
        <div class="imgs">
          <img src="~/assets/img/home/email.png" alt="email" />
        </div>
        <div class="input_text">
          <p class="input_text_title">Please contact us:</p>
          <div class="email_us">
            <a href="mailto:sevice@seekastrology.com">
              sevice@seekastrology.com
            </a>
          </div>
          <p class="input_text_tips">
            Our dedicated team of Client Care Specialist are here to answer all
            of your questions and handle any inquiries you may have.
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
.contact_main {
  width: 100%;
  .title {
    padding-bottom: 32px;
    position: relative;
    &::after {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.2) 50.52%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    &_name {
      font-family: 'Cinzel Decorative';
      font-style: normal;
      font-weight: 700;
      font-size: 46px;
      line-height: 64px;
      color: #ffffff;
      text-align: center;
    }
  }
  .content {
    padding: 32px 0 0;
    &_emails {
      width: 100%;
      display: grid;
      place-items: center;
      .imgs {
        width: 170px;
        height: 154px;
        margin-bottom: 32px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .input_text {
        p {
          font-family: 'Rubik';
          font-style: normal;
          font-weight: 400;
          text-align: center;
        }
        &_title {
          font-size: 16px;
          line-height: 22px;
          color: #fff;
        }
        &_tips {
          font-size: 16px;
          line-height: 32px;
          color: #d2d3d7;
        }

        .email_us {
          width: 338px;
          height: 44px;
          margin: 8px auto 32px;
          background: rgba(7, 6, 6, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 24px;
          text-align: center;
          font-family: 'Rubik';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          transition: background-color 0.3s ease-in-out;
          &:hover {
            background-color: rgba(219, 214, 214, 0.2);
          }
          a {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}
@media (max-width: (750px)) {
  $pr: math.div(1vw, 3.75);
  .contact_main {
    .title {
      padding-bottom: 24 * $pr;
      &::after {
        height: 1 * $pr;
      }
      &_name {
        font-size: 36 * $pr;
        line-height: 48 * $pr;
      }
    }
    .content {
      padding: 24 * $pr 0 0;
      &_emails {
        .imgs {
          width: 170 * $pr;
          height: 154 * $pr;
          margin-bottom: 24 * $pr;
          img {
            object-fit: cover;
          }
        }
        .input_text {
          &_title {
            font-size: 16 * $pr;
            line-height: 22 * $pr;
          }
          &_tips {
            font-size: 14 * $pr;
            line-height: 24 * $pr;
            color: rgba(255, 255, 255, 0.6);
          }

          .email_us {
            width: 295 * $pr;
            height: 44 * $pr;
            margin: 8 * $pr auto 24 * $pr;
            border: 1 * $pr solid rgba(255, 255, 255, 0.6);
            border-radius: 24 * $pr;
            text-align: center;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 14 * $pr;
            line-height: 18 * $pr;
          }
        }
      }
    }
  }
}
</style>
