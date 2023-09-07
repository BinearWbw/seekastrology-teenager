import Vue from 'vue'
// 创建一个事件总线并添加到Vue原型中
const eventBus = new Vue()
Vue.prototype.$eventBus = eventBus
