/*
 * @Date: 2023-06-07 09:43:31
 * @LastEditors: tianjun
 * @LastEditTime: 2023-06-12 15:58:45
 * @FilePath: /seekastrology/api/apiList/tarot.js
 * @Description:
 */
export default (axios) => ({
  /* 塔罗牌列表 */
  getTarotList(params) {
    return axios.get('api/tarot', { params })
  },
  /**
   * 抽牌
   * @param type 类型:1-爱情、2-事业、3-通用、4-日常
   * @returns
   */
  drawTarot(data) {
    return axios.post('api/tarot/cards', data)
  },
  /**
   * AI 抽牌
   * */

  drawTarotAi(data) {
    return axios.post('api/tarot/cards/ai', data)
  },
  /**
   * 塔罗牌详情
   * @param {*} id
   * @returns
   */
  getDetail(params) {
    return axios.get('api/tarot/detail', { params })
  },

  /**
   * 塔罗抽牌的历史记录
   *
   */
  getTarotCardHistory(params) {
    return axios.get('api/tarot/cards/record', { params })
  },
  // postSubscribe(data) {
  //   return axios.post('api/subscribe', data)
  // }
})
