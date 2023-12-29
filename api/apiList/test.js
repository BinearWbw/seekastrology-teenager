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
})
