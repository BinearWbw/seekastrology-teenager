<template>
  <div class="details_test">
    <google-ad :id="''" classNames="google_ad_top"></google-ad>
    <div class="details_test_main">
      <div class="particulars">
        <div class="particulars_title">
          Hello , Your palm reading result is :
        </div>
        <div class="particulars_test">
          * This analysis is based on your selection Your long fingers are
          seeking more contact with the outer world and more information from
          all others around you. You are mentally active people with
          never-ending interesting ideas. You long-finger people love details,
          are outer-directed in taking action, and need more data than
          short-finger people before forming your opinions. Having a whorl
          pattern on the thumb, you are independent, inflexible,
          individualistic, highly focussed. The sweep of the life line reveals
          more about the personality. Sometimes the life line hugs tightly
          around the thumb as it curves around the Venus mount.The Venus mount
          represents certain qualities in the nature, physical stamina and
          endurance, physical passion, warmth, sympathy, friendship and love so
          that when the mount is undeveloped, these qualities may well be
          somewhat lacking in the personality. The ending of the life line is
          important. When downward lines at the end of the life line are
          present, the person will lose energ y, usually through illness. If the
          life line is weak after the downward slash, the person should plan for
          his old age because he will not have full energy to take care of
          himself. If the line remains strong, he will recover and be active
          again. Due to having short and wide nails, you believe in quarelling,
          criticizing and interfering in others works. You could be stubborn in
          nature. When a line rises from life line and proceeds towards Saturn
          Mount. It represents sudden gain of wealth or property. There will be
          sudden promotion in the jobs. If line of head begins without joining
          the life line, person would be independent in thought and vociferous
          in nature. People whos palms show the straight heart line are more
          passive in their romance, and they are most content to be the receptor
          of love, tending to dwell in their love rather than wearing it out on
          their sleeve. Public Figure, Famous in society, Work for Charity,
          Abroad travel.
        </div>
        <div class="particulars_lis">Know About Your Hand</div>
        <palm-tis class="eltis"></palm-tis>
      </div>
      <div class="palm_cent">
        <google-ad :id="''" classNames="google_ad_cent"></google-ad>
        <palm-have></palm-have>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.details_test {
  width: 100%;
  .google_ad_top {
    display: none;
  }
  &_main {
    width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 354px;
    gap: 0 102px;
    padding: 48px 0;
    .particulars {
      &_title {
        color: #fff;
        font-family: Cinzel Decorative;
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 48px;
        margin-bottom: 8px;
      }
      &_test {
        color: rgba(255, 255, 255, 0.6);
        font-family: Rubik;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
      }
      &_lis {
        color: #fff;
        text-align: center;
        font-family: Rubik;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
        margin: 56px 0 16px;
      }
    }
    .palm_cent {
      width: 354px;
      .google_ad_cent {
        width: 300px;
        height: 625px;
        margin: 0 auto 32px;
      }
    }
  }
}

@media (max-width: 1470px) {
  .details_test {
    &_main {
      width: 100%;
      padding: 48px 30px;
    }
  }
}
@media (max-width: 1050px) {
  .details_test {
    &_main {
      grid-template-columns: repeat(1, 1fr);
      gap: 56px;
      padding: 48px 50px;
      .palm_cent {
        width: 100%;
        .google_ad_cent {
          width: 336px;
          height: 305px;
          margin: 0 auto 32px;
        }
      }
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .details_test {
    width: 100%;
    .google_ad_top {
      display: flex;
      flex-direction: column;
      width: 336 * $pr;
      height: 297 * $pr;
      margin: 0 auto;
    }
    &_main {
      width: 100%;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 32 * $pr;
      padding: 16 * $pr 16 * $pr 32 * $pr;
      .particulars {
        &_title {
          font-size: 22 * $pr;
          line-height: 30 * $pr;
          margin-bottom: 8 * $pr;
        }
        &_test {
          font-size: 14 * $pr;
          line-height: 24 * $pr;
        }
        &_lis {
          font-size: 18 * $pr;
          line-height: 24 * $pr;
          margin: 32 * $pr 0 16 * $pr;
        }
      }
      .palm_cent {
        .google_ad_cent {
          width: 336 * $pr;
          height: 297 * $pr;
          margin: 0 auto 32 * $pr;
        }
      }
    }
  }
}
</style>
