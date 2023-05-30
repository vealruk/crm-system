// Не забыть про локализацию
const titles = {
  home: 'Bill',
  history: 'History',
  planning: 'Planning',
  record: 'NewRecord',
  profile: 'ProfileTitle',
  detail: 'Detail',
  categories: 'Categories',
  register: 'RegisterTitle',
  login: 'Login'
}

export default {
  install (app) {
    const title = key => {
      return app.config.globalProperties.$localize(titles[key])
    }

    app.provide('title', title)
  }
}
