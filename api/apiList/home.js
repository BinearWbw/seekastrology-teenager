export default (axios) => ({
  /* 首页-星座 */
  getZodiacHomeAstro(params) {
    return axios.get('api/astro/basic', { params })
  },
  /* 首页-测验推荐 */
  getZodiacHomeQuiz(params) {
    return axios.get('api/quiz/rec', { params })
  },
  /* 星座详情页 */
  getZodiacDetails(params) {
    return axios.get('api/astro/detail', { params })
  },
  /* 星座运势页 */
  getZodiacHoroscope(params) {
    return axios.get('api/astro/horoscope', { params })
  },
  /* 星座-配对 */
  getZodiacComp(params) {
    return axios.get('api/astro/comp', { params })
  },
  /* 星座-所有 */
  getZodiacAll(params) {
    return axios.get('api/astro/all', { params })
  },
  /* 欧盟 */
  getGameLocation() {
    return axios.get('api/user/loc')
  },
  /* 城市搜索 */
  getCity(params) {
    return axios.get('api/astro/city', { params })
  },
  /* 星盘-出生盘 */
  getNatal(data) {
    return axios.post('api/astro/natal/v2', data)
  },
  /* 星座搜索 */
  getSearchData(params) {
    return axios.get('api/astro/search', { params })
  },
  getZodiacHoroscopeWeekly(params) {
    return axios.get('api/astro/horoscope/weekly', { params })
  },

  /* 昆德里匹配 */
  getKundliMaking(data) {
    return axios.post('api/match/making', data)
  },
})
