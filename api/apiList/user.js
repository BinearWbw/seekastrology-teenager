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
  /* 激活账号 */
  accountActive(params) {
    return axios.get('api/astro/auth', { params })
  },
  /* 文件上传 */
  upload(data) {
    return axios.post('api/astro/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  /* 用户订阅 传字符串*/
  subscribe(data) {
    return axios.post('api/astro/subscribe', data)
  },

  /* 用户订阅 2 传数组 */
  subscribeVtow(data) {
    return axios.post('api/astro/subscribe/v2', data)
  },

  /* openai */
  getApiOpenai(params) {
    return axios.get('api/openai', {
      params,
      headers: {
        'Content-Type': 'text/event-stream',
      },
      responseType: 'text',
    })
  },

  /* 获取ai提问次数 */
  getAiDegree(params) {
    return axios.get('api/openai/count', { params })
  },

  /* 获取Google登录的用户数据 */
  getGoogleUser(data) {
    return axios.post('api/astro/login/google', data)
  },
})
