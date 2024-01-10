import axios from 'axios'
const addRoutes = async () => {
  let routes = []
  //   let res2 = await axios.get(
  //     'https://astro.doitme.link/api/news/all?origin=seekastrology&page=1&size=10000'
  //   )
  //   res2.data.data.list.map((item) => {
  //     routes.push(
  //       `/resources/details/${item.name
  //         .trim()
  //         .replace(/[^\w\d]/g, '-')
  //         .toLowerCase()}-${item.id}/`
  //     )
  //   })
  //   let res1 = await axios.get(
  //     'https://astro.doitme.link/api/quiz/all?origin=seekastrology&page=1&size=10000'
  //   )
  //   res1.data.data.list.map((item) => {
  //     routes.push(
  //       `/test/details/${item.name
  //         .trim()
  //         .replace(/[^\w\d]/g, '-')
  //         .toLowerCase()}-${item.id}/`
  //     )
  //   })
  //   let res3 = await axios.get(
  //     'https://astro.doitme.link/api/astro/all?origin=seekastrology&page=1&size=10000'
  //   )
  //   res3.data.data.map((item) => {
  //     routes.push(
  //       `/zodiac/details/${item.name
  //         .replace(/[^a-zA-Z0-9\\s]/g, '-')
  //         .toLowerCase()}-${item.id}/`
  //     )
  //   })
  //   let res4 = await axios.get(
  //     'https://astro.doitme.link/api/astro/basic?origin=seekastrology'
  //   )
  //   res4.data.data.map((item) => {
  //     routes.push(
  //       `/horroscope/${item.name
  //         .replace(/[^a-zA-Z0-9\\s]/g, '-')
  //         .toLowerCase()}-${item.id}/`
  //     )
  //   })
  //   let res5 = await axios.get(
  //     'https://astro.doitme.link/api/tarot/all?origin=seekastrology&page=1&size=10000'
  //   )
  //   res5.data.data.list.map((item) => {
  //     routes.push(
  //       `/tarot/details/${item.name
  //         .replace(/[^a-zA-Z0-9\\s]/g, '-')
  //         .toLowerCase()}-${item.id}/`
  //     )
  //   })
  //   let res6 = [1, 2, 3, 4, 5]
  //   res6.map((item) => {
  //     routes.push(`/tarot/type/${item}/`)
  //   })
  //   let res7 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   res7.map((item) => {
  //     routes.push(`/zodiac/type/career-${item}/`)
  //   })
  //   let res8 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   res8.map((item) => {
  //     routes.push(`/zodiac/type/lover-${item}/`)
  //   })
  //   let res9 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   res9.map((item) => {
  //     routes.push(`/zodiac/type/healthy-${item}/`)
  //   })
  //   let res10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   res10.map((item) => {
  //     routes.push(`/zodiac/type/male-${item}/`)
  //   })
  //   let res11 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   res11.map((item) => {
  //     routes.push(`/zodiac/type/woman-${item}/`)
  //   })
  //   let res12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   res12.map((item) => {
  //     routes.push(`/zodiac/type/comratible-${item}/`)
  //   })
  //   let res13 = [1, 2, 3, 4, 5]
  //   let res14 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   res14.map((item) => {
  //     routes.push(`/zodiac/type/boycareer-${item}/`)
  //   })
  //   let res15 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   res15.map((item) => {
  //     routes.push(`/zodiac/type/boyposit-${item}/`)
  //   })
  //   let res16 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   res16.map((item) => {
  //     routes.push(`/zodiac/type/boyamor-${item}/`)
  //   })
  //   let res17 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   res17.map((item) => {
  //     routes.push(`/zodiac/type/girlcareer-${item}/`)
  //   })
  //   let res18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   res18.map((item) => {
  //     routes.push(`/zodiac/type/girlposit-${item}/`)
  //   })
  //   let res19 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   res19.map((item) => {
  //     routes.push(`/zodiac/type/girlamor-${item}/`)
  //   })
  //   let res20 = [1, 2]
  //   res20.map((item) => {
  //     routes.push(`/userto/${item}/`)
  //   })
  //   let res21 = [1, 2]
  //   res21.map((item) => {
  //     routes.push(`/userrevise/${item}/`)
  //   })
  //   let res22 = [
  //     {
  //       name: 'aries',
  //       id: 1,
  //     },
  //     {
  //       name: 'taurus',
  //       id: 2,
  //     },
  //     {
  //       name: 'gemini',
  //       id: 3,
  //     },
  //     {
  //       name: 'cancer',
  //       id: 4,
  //     },
  //     {
  //       name: 'leo',
  //       id: 5,
  //     },
  //     {
  //       name: 'virgo',
  //       id: 6,
  //     },
  //     {
  //       name: 'libra',
  //       id: 7,
  //     },
  //     {
  //       name: 'scorpio',
  //       id: 8,
  //     },
  //     {
  //       name: 'sagittarius',
  //       id: 9,
  //     },
  //     {
  //       name: 'capricorn',
  //       id: 10,
  //     },
  //     {
  //       name: 'aquarius',
  //       id: 11,
  //     },
  //     {
  //       name: 'pisces',
  //       id: 12,
  //     },
  //   ]
  //   res22.map((item) => {
  //     res13.map((item_i) => {
  //       routes.push(`/horroscope/${item.name}-${item_i}-${item.id}/`)
  //     })
  //   })

  //   res22.map((item_i) => {
  //     routes.push(`/teenager/${item_i.name}-${item_i.id}/`)
  //   })

  //   res22.map((item_i) => {
  //     routes.push(`/petsign/${item_i.name}-${item_i.id}/`)
  //   })

  //   res22.map((item_i) => {
  //     routes.push(`/parenting/details/${item_i.name}-${item_i.id}/`)
  //   })

  //   let res23 = await axios.get(`https://astro.doitme.link/api/hand?type=1`)
  //   res23.data.data.map((item) => {
  //     routes.push(`/palmistry/type/${item.id}/`)
  //   })
  //   let res24 = await axios.get(`https://astro.doitme.link/api/hand?type=2`)
  //   res24.data.data.map((item) => {
  //     routes.push(`/palmistry/referral/${item.id}/`)
  //   })

  //   await Promise.all(
  //     res23.data.data.map(async (item) => {
  //       let items = await axios.get(
  //         `https://astro.doitme.link/api/hand/msg?id=${item.id}`
  //       )
  //       items.data.data?.child?.map((item_i) => {
  //         routes.push(`/palmistry/referral/${item.id}-${item_i.id}/`)
  //       })
  //     })
  //   )

  //   res19.map((item) => {
  //     routes.push(`/chinazodiac/details/${item}/`)
  //   })

  return routes
}
let routes = addRoutes()
export default routes
