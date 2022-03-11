import { resolve } from 'path'
import { auth } from '../../firebase/utils'

export const handleResetPasswordAPI = (email: string) => {
  const config = {
    url: 'http://localhost:4050/login'
  }

  return new Promise((res, rej) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve()
      })
      .catch(() => {
        const err = ['Email not found. Please try again.']
        rej(err)
      })
  })
}
