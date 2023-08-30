export const state = () => ({
  intersperseUrl: 'https://www.seekastrology.com',
  toastCfg: {
    position: 'bottom-left',
    timeout: 3000,
    closeOnClick: false,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    hideProgressBar: true,
    closeButton: 'button',
    icon: true,
    rtl: false,
  },
  userInfo: {
    token: '',
    icon: '',
    email: '',
    user_name: '',
  },
  isChildVisible: false, //登录框显示隐藏
})
export const getters = {
  getIntersperseUrl(state) {
    return state.intersperseUrl
  },
  getUserInfo(state) {
    return state.userInfo
  },
  getUserIcon(state) {
    return state.userInfo.icon
  },
}
export const mutations = {
  UPDATE_INTERSPERSE_URL(state, payload) {
    state.intersperseUrl = payload
  },
  UPDATE_USERINFO(state, payload) {
    state.userInfo = payload
  },
  UPDATE_USERICON(state, payload) {
    state.userInfo.icon = payload
  },
  showLoginBox(state) {
    state.isChildVisible = true
  },
  hideLoginBox(state) {
    state.isChildVisible = false
  },
}
export const actions = {
  toast({ state }, res) {
    if (process.client) {
      this.$toast[res.type ? res.type : 'info'](res.msg, state.toastCfg)
    }
  },
}
