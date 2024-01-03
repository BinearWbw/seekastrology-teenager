export default (axios) => ({
  /* 测试列表 */
  getTestList(params) {
    return axios.get('api/quiz', { params })
  },

  /**测试详情信息 */
  getQuizDetail(params) {
    return axios.get('api/quiz/detail', { params })
  },

  /**测试推荐 */
  getRecList(params) {
    return axios.get('api/quiz/rec', { params })
  },

  /**测验分数 */
  getQuizResult(data) {
    return axios.post('api/quiz/result', data)
  },

  /* 命理 */
  getNumerology(params) {
    return axios.get('api/numerology/calculator', { params })
  },

  /* 生肖 */
  getAnimals(params) {
    return axios.get('api/zodiac/animals', { params })
  },

  /* 生肖详情 */
  getAnimalsDetail(params) {
    return axios.get('api/zodiac/animals/detail', { params })
  },

  /* 生肖判断 */
  getAnimalsJudge(params) {
    return axios.get('api/zodiac/animals/judge', { params })
  },

  /* 手相列表 */
  getPalmistryList(params) {
    return axios.get('api/hand', { params })
  },

  /* 手相详情 */
  getPalmistryMsg(params) {
    return axios.get('api/hand/msg', { params })
  },

  /* 手相二级详情 */
  getPalmistryChild(params) {
    return axios.get('api/hand/child', { params })
  },

  /* 手相题目列表 */
  getPalmistryReading() {
    return axios.get('api/hand/reading')
  },

  /* 手相题目结果获取 */
  getPalmistryReadingResult(data) {
    return axios.post('api/hand/reading/result', data)
  },
})
