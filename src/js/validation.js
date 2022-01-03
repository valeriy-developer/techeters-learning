export const validation = {
  required(str) {
    return str.trim() === ''
  },

  email(str) {
    const regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    const isEmailValid = regExp.test(str.trim())

    return !isEmailValid
  },
}
