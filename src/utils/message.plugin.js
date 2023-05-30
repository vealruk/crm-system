/* eslint-disable no-undef */
const MESSAGE_CODES = {
  logout: 'Logout',
  auth: 'Auth',
  EMAIL_NOT_FOUND: 'NoUserWithEmail',
  EMAIL_EXISTS: 'UserAlready',
  INVALID_PASSWORD: 'WrongPassword'
}

export default {
  install (app) {
    const getTextMessage = (code) => {
      return MESSAGE_CODES[code] ? MESSAGE_CODES[code] : code
    }

    const message = html => {
      M.toast({ html: app.config.globalProperties.$localize(getTextMessage(html)) })
    }

    const error = html => {
      M.toast({ html: `[Ошибка]: ${getTextMessage(html)}` })
    }

    app.provide('message', message)
    app.provide('error', error)
  }
}
