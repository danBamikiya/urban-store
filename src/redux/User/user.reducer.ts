import userTypes from './user.types'
import { user } from '../../types/user'

interface Action {
  type: string
  payload: user | {}
}

const INITIAL_STATE = {
  currentUser: null,
  userErr: [],
  resetPasswordSuccess: false
}

const userReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userErr: []
      }
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErr: action.payload
      }
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload
      }
    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE
      }
    default:
      return state
  }
}

export default userReducer
