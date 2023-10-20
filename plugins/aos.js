import Vue from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

class AosPlugin {
  install(Vue) {
    AOS.init()
    Vue.mixin({
      updated() {
        this.$nextTick(function () {
          AOS.refreshHard() // 避免无效的动画
        })
      },
    })
  }
}

Vue.use(new AosPlugin())
