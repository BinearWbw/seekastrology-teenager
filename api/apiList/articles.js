export default (axios) => ({
  /* 推荐资讯 */
  getNewsRec(params) {
    return axios.get('api/news/rec', { params })
  },
  /** 获取tabs */
  getCate(params) {
    return axios.get('api/cate', { params })
  },
  /** 获取tabs对应的列表数据 */
  getNews(params) {
    return axios.get('api/news/v2', { params })
  },
  /** 获取资讯详情 */
  getNewsDetail(params) {
    return axios.get('api/news/detail', { params })
  },

  /** 获取资讯对应数据 */
  getNewsList(params) {
    return axios.get('api/news', { params })
  },
})
