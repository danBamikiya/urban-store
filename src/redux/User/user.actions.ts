import userTypes from './user.types'
import { user } from '../../types/user'

export const setCurrentUser = (user: user | {}) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user
})
