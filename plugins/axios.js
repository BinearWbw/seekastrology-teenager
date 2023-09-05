import apiList from '@/api/index'
export default ({ $axios, store }, inject) => {
  $axios.defaults.withCredentials = true
  $axios.defaults.timeout = 30000
  $axios.onRequest((config) => {
    //获取token
    const token = store.state.userInfo.token
    if (token) {
      config.headers.common['Authorization'] = `${token}` // 将token添加到Authorization头部
    }
    let url = config.url
    if (config.method === 'get' && config.params) {
      url += '?'
      Object.keys(config.params).map((key) => {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
      })
      url = url.substring(0, url.length - 1)
      config.params = {}
    }
    config.url = url
    return config
  })
  $axios.onResponse((response) => {
    if (response.status === 200) {
      const res = response.data
      if (res.code === 0) {
        return res.data
      } else if (res.code === 400) {
        return res
      } else {
        return Promise.resolve(res)
      }
    } else {
      return Promise.resolve(response)
    }
  })
  $axios.onError((error) => {
    console.log(error.message)
    return Promise.resolve(false)
  })
  var apiObject = {}
  for (var i in apiList) {
    apiObject[i] = apiList[i]($axios)
  }
  inject('apiList', apiObject)
}
