export const state = () => ({
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
    user_subscribe: [],
    natal: '',
    natal_res: {},
    birth_msg: {},
    req: {},
  },
  isChildVisible: false, //登录框显示隐藏
  signSuccessData: {
    //注册成功后存入的邮箱
    email: '',
  },
})
export const getters = {
  getUserInfo(state) {
    return state.userInfo
  },
  getUserSub(state) {
    return state.userInfo.user_subscribe
  },
  getSignSuccess(state) {
    return state.signSuccessData
  },
  getChildVisible(state) {
    return state.isChildVisible
  },
  getUserNatalData(state) {
    return state.userInfo.natal_res
  },
  getUserNatalBirthMsg(state) {
    return state.userInfo.birth_msg
  },
}
export const mutations = {
  UPDATE_USERINFO(state, payload) {
    state.userInfo = payload
  },
  UPDATE_USERSUB(state, payload) {
    state.userInfo.user_subscribe = payload
  },
  showLoginBox(state) {
    state.isChildVisible = true
  },
  hideLoginBox(state) {
    state.isChildVisible = false
    //清除滚动限制
    let bodyStyle = document.body.style
    bodyStyle.overflow = ''
  },
  SIGN_SUCCESS(state, payload) {
    state.signSuccessData.email = payload
  },
  restoreStateFromLocalStorage(state, restoredState) {
    Object.assign(state, restoredState)
  },
  setUserNatalData(state, payload) {
    state.userInfo.natal_res = payload
  },
  setUserNatalBirthMsg(state, payload) {
    state.userInfo.birth_msg = payload
  },
  setUserReqData(state, payload) {
    state.userInfo.req = payload
  },
  SETNATAL(state, payload) {
    state.userInfo.natal = payload
  },
}
export const actions = {
  toast({ state }, res) {
    if (process.client) {
      this.$toast[res.type ? res.type : 'info'](res.msg, state.toastCfg)
    }
  },
}
