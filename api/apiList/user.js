export default (axios) => ({
  /* 注册 */
  getRegister(data) {
    return axios.post('api/astro/register', data)
  },
  /* 登录 */
  getLogin(data) {
    return axios.post('api/astro/login', data)
  },
  /* 个人资料修改 */
  setUserMsg(data) {
    return axios.post('api/astro/user/msg', data)
  },
  /* 忘记密码-修改密码 */
  forgetPwd(data) {
    return axios.post('api/astro/password', data)
  },
  /* 发送忘记密码邮件 */
  sendForgetPwdEmail(data) {
    return axios.post('api/astro/email/pwd', data)
  },
  /* 激活-再次发送邮件 */
  sendEmailAgain(data) {
    return axios.post('api/astro/email/auth', data)
  },
  /* 激活-再次发送邮件 */
  accountActiv(params) {
    return axios.get('api/astro/auth', { params })
  },
})
