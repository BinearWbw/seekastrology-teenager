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
  let res5 = await axios.get(
    'https://astro.doitme.link/api/tarot/all?origin=seekastrology&page=1&size=10000'
  )
  res5.data.data.list.map((item) => {
    routes.push(
      `/tarot/details/${item.name
        .replace(/[^a-zA-Z0-9\\s]/g, '-')
        .toLowerCase()}-${item.id}/`
    )
  })
  let res6 = [1, 2, 3, 4]
  res6.map((item) => {
    routes.push(`/tarot/type/${item}/`)
  })

  let res7 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  res7.map((item) => {
    routes.push(`/zodiac/type/career-${item}/`)
  })
  let res8 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  res8.map((item) => {
    routes.push(`/zodiac/type/lover-${item}/`)
  })
  let res9 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  res9.map((item) => {
    routes.push(`/zodiac/type/healthy-${item}/`)
  })
  let res10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  res10.map((item) => {
    routes.push(`/zodiac/type/male-${item}/`)
  })
  let res11 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  res11.map((item) => {
    routes.push(`/zodiac/type/woman-${item}/`)
  })
  let res12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  res12.map((item) => {
    routes.push(`/zodiac/type/comratible-${item}/`)
  })
  let res13 = [1, 2, 3, 4, 5]
  res13.map((item) => {
    routes.push(`/horroscope/aries-${item}-1/`)
  })
  let res14 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  res14.map(() => {
    routes.push(`/zodiac/type/boycareer-${item}/`)
  })
  let res15 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  res15.map(() => {
    routes.push(`/zodiac/type/boyposit-${item}/`)
  })
  let res16 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  res16.map(() => {
    routes.push(`/zodiac/type/boyamor-${item}/`)
  })
  let res17 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  res17.map(() => {
    routes.push(`/zodiac/type/girlcareer-${item}/`)
  })
  let res18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  res18.map(() => {
    routes.push(`/zodiac/type/girlposit-${item}/`)
  })
  let res19 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  res19.map(() => {
    routes.push(`/zodiac/type/girlamor-${item}/`)
  })

  return routes
}
let routes = addRoutes()
export default routes
