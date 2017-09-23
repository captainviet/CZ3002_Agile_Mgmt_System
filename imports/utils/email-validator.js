export const EmailValidator = {
  validate: (text) => {
    const mailRegex = /^\w+@\w+(\.\w+)+$/i
      return text.search(mailRegex) == 0
  }
}
