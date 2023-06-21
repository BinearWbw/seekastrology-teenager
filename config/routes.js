import axios from 'axios'
const addRoutes = async () => {
  let routes = []
  let res2 = await axios.get(
    'https://astro.doitme.link/api/news/all?origin=seekastrology&page=1&size=10000'
  )
  res2.data.data.list.map((item) => {
    routes.push(
      `/resources/details/${item.name
        .trim()
        .replace(/[^\w\d]/g, '-')
        .toLowerCase()}-${item.id}/`
    )
  })
  let res1 = await axios.get(
    'https://astro.doitme.link/api/quiz/all?origin=seekastrology&page=1&size=10000'
  )
  res1.data.data.list.map((item) => {
    routes.push(
      `/test/details/${item.name
        .trim()
        .replace(/[^\w\d]/g, '-')
        .toLowerCase()}-${item.id}/`
    )
  })
  let res3 = await axios.get(
    'https://astro.doitme.link/api/astro/all?origin=seekastrology&page=1&size=10000'
  )
  res3.data.data.map((item) => {
    routes.push(
      `/zodiac/details/${item.name
        .replace(/[^a-zA-Z0-9\\s]/g, '-')
        .toLowerCase()}-${item.id}/`
    )
  })
  let res4 = await axios.get(
    'https://astro.doitme.link/api/astro/basic?origin=seekastrology'
  )
  res4.data.data.map((item) => {
    routes.push(
      `/horroscope/${item.name
        .replace(/[^a-zA-Z0-9\\s]/g, '-')
        .toLowerCase()}-${item.id}/`
    )
  })
  // let res4 = await axios.get(
  //   'https://astro.doitme.link/api/tarot/all?origin=seekastrology&page=1&size=10000'
  // )
  // res4.data.data.list.map((item) => {
  //   routes.push(
  //     `/tarot/details/${item.name
  //       .replace(/[^a-zA-Z0-9\\s]/g, '-')
  //       .toLowerCase()}-${item.id}/`
  //   )
  // })
  return routes
}
let routes = addRoutes()
export default routes
