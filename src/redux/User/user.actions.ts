import userTypes from './user.types'
import { user } from '../../types/user'

type userCredentials = {
  email: string
  password: string
  displayName?: string
  confirmPassword?: string
}

export const emailSignInStart = (userCredentials: userCredentials) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials
})

export const signInSuccess = (user: user | {}) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user
})

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION
})

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START
})

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS
})

export const signUpUserStart = (userCredentials: userCredentials) => ({
  type: userTypes.SIGN_UP_USER_START,
  payload: userCredentials
})

export const userError = (err: string[]) => ({
  type: userTypes.USER_ERROR,
  payload: err
})

export const resetPasswordStart = (
  userCredentials: Partial<userCredentials>
) => ({
  type: userTypes.RESET_PASSWORD_START,
  payload: userCredentials
})

export const resetPasswordSuccess = () => ({
  type: userTypes.RESET_PASSWORD_SUCCESS,
  payload: true
})

export const resetUserState = () => ({
  type: userTypes.RESET_USER_STATE
})

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START
})
