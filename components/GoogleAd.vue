<template>
  <div :class="classNames" class="googleAdStyle" ref="googleAdStyle">
    <p class="title">Advertisement</p>
  </div>
</template>
<script>
export default {
  name: 'GoogleAd',
  props: {
    classNames: String,
    id: String,
  },
  data() {
    return {
      observer: null,
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(this.handleIntersection)
    this.observer.observe(this.$refs.googleAdStyle)
  },
  methods: {
    handleIntersection(entries) {
      if (entries[0].isIntersecting) {
        const targetElement = this.$refs.googleAdStyle
        const adScript = document.createElement('script')
        adScript.innerHTML = `(adsbygoogle = window.adsbygoogle || []).push({});`
        const insElement = document.createElement('ins')
        insElement.setAttribute('class', 'adsbygoogle')
        insElement.setAttribute(
          'style',
          'display: block; width: 100%;height: 100%;'
        )
        insElement.setAttribute('data-ad-client', 'ca-pub-6430486603399192')
        insElement.setAttribute('data-ad-slot', `${this.id}`)
        insElement.setAttribute('data-full-width-responsive', 'true')
        targetElement.appendChild(insElement)
        targetElement.appendChild(adScript)
        this.observer.unobserve(this.$refs.googleAdStyle)
      }
    },
  },
  destroyed() {
    this.observer.disconnect()
    this.observer = null
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
.googleAdStyle {
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  .title {
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    font-size: 20px;
    line-height: 25px;
    background: #282a31;
    text-align: center;
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .googleAdStyle {
    .title {
      font-size: 12 * $pr;
      line-height: 17 * $pr;
    }
  }
}
</style>
