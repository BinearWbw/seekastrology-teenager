import createPersistedState from 'vuex-persistedstate'
export default ({ app, store }) => {
  createPersistedState({
    storage: {
      getItem: (key) => app.$cookies.get(key),
      setItem: (key, value) =>
        app.$cookies.set(key, value, {
          path: '/',
          maxAge: 60 * 60 * 24 * 1, // cookie存储时间 可修改
        }),
      removeItem: (key) => app.$cookies.remove(key),
    },
  })(store)
}
