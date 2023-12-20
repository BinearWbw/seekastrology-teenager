const formatMMDD = (param) => {
  if (param == '' || param == undefined || param == null) {
    return ''
  }
  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var date = new Date(param * 1000)
  // 获取月份和日期
  var month = date.getMonth() + 1 // 月份从 0 开始，所以需要加 1
  var day = date.getDate()
  // 格式化月份和日期为两位数（如果小于 10）
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  // 返回格式化后的字符串
  return month + '/' + day
}
const formatYYYYMMDD = (param) => {
  if (param == '' || param == undefined || param == null) {
    return ''
  }
  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var date = new Date(param * 1000)
  // 获取月份和日期
  var year = date.getFullYear()
  var month = date.getMonth() + 1 // 月份从 0 开始，所以需要加 1
  var day = date.getDate()
  // 格式化月份和日期为两位数（如果小于 10）
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  // 返回格式化后的字符串
  return year + '/' + month + '/' + day
}
const formatYYYYMMDDHHMM = (param, format) => {
  if (param == '' || param == undefined || param == null) {
    return ''
  }
  var date = new Date(param * 1000) // 将时间戳转换为毫秒级别
  var year = date.getFullYear()
  var month = ('0' + (date.getMonth() + 1)).slice(-2) // 月份从0开始，需要加1
  var day = ('0' + date.getDate()).slice(-2)
  var hours = ('0' + date.getHours()).slice(-2)
  var minutes = ('0' + date.getMinutes()).slice(-2) // 获取分钟并补零

  var dateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes

  return dateTime
}
const formatMMSS = (param) => {
  if (param == '' || param == undefined || param == null) {
    return ''
  }
  const hours = Math.floor(param / 3600)
  const minutes = Math.floor((param % 3600) / 60)
  const remainingSeconds = param % 60

  const formattedHours = hours > 0 ? `${hours}:` : ''
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(remainingSeconds).padStart(2, '0')

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`
}
const debounce = (fn, delay = 300) => {
  let timer = null
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    fn.apply(this, arguments)
    timer = setTimeout(() => {
      timer = null
    }, delay)
  }
}
const horoscopeWeekDate = (date) => {
  //返回月/日
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  var month = date.getMonth()
  var day = date.getDate().toString().padStart(2, '0')
  return months[month] + '  ' + day
}
const horoscopeFormatDate = (type = 'd') => {
  //返回当前日期
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const date = new Date()
  const month = date.getMonth()
  const day = date.getDate().toString().padStart(2, '0')
  const year = date.getFullYear().toString()
  // 获取当前周的开始/结束日期
  const weekBegin = new Date(date.setDate(date.getDate() - date.getDay() + 1))
  const weekEnd = new Date(date.setDate(date.getDate() - date.getDay() + 7))

  switch (type) {
    case 'd':
      return months[month] + '  ' + day + ', ' + year
    case 'w':
      return (
        horoscopeWeekDate(weekBegin) +
        ', ' +
        year +
        ' - ' +
        horoscopeWeekDate(weekEnd) +
        ', ' +
        year
      )
    case 'm':
      return months[month] + ', ' + year
    case 'y':
      //   return year
      return '2024'
    default:
      return year
  }
}
// 滚动到底部
const scrollAnimation = (obj, target, fn1) => {
  // console.log(fn1);
  // fn是一个回调函数，在定时器结束的时候添加
  // 每次开定时器之前先清除掉定时器
  clearInterval(obj.timer)
  obj.timer = setInterval(function () {
    // 步长计算公式  越来越小
    // 步长取整
    var step = (target - obj.scrollTop) / 10
    step = step > 0 ? Math.ceil(step) : Math.floor(step)
    if (obj.scrollTop >= target) {
      clearInterval(obj.timer)
      // 如果fn1存在，调用fn
      if (fn1) {
        fn1()
      }
    } else {
      // 每30毫秒就将新的值给obj.left
      obj.scrollTop = obj.scrollTop + step
    }
  }, 10)
}
function formatDateNatal(hour, period) {
  let hour_i = Number(hour) // 转number
  // 处理小时部分
  if (period == 'PM') {
    if (hour_i == 12) return 12
    hour_i += 12
  } else {
    if (hour_i == 12) return 0
  }
  return hour_i
}

function formatBasicDate(m, d, y) {
  if (!m) return '--'
  const formattedDate = `${String(m).padStart(2, '0')}/${String(d).padStart(
    2,
    '0'
  )}/${y}`
  return formattedDate
}

function formatBasicTime(h, m) {
  if (!m && !h) return '--'
  const hour = h % 12 || 12
  const period = h < 12 ? 'AM' : 'PM'
  return `${String(hour).padStart(2, '0')}:${String(m).padStart(
    2,
    '0'
  )} ${period}`
}

function formatSearch(time) {
  if (time == 0) return ''
  const date = new Date(time * 1000)

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${year}.${month}.${day}    ${hours}:${minutes}`
}

// 示例用法
const year = 1995
const month = 2
const day = 20
const hour = 1
const minute = 4
const period = 'PM'

export default {
  formatMMSS,
  formatMMDD,
  formatYYYYMMDD,
  formatYYYYMMDDHHMM,
  debounce,
  horoscopeFormatDate,
  scrollAnimation,
  formatDateNatal,
  formatBasicDate,
  formatBasicTime,
  formatSearch,
}
