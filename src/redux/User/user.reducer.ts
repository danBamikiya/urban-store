import userTypes from './user.types'
import { user } from '../../types/user'

interface Action {
  type: string
  payload: user | {}
}

const INITIAL_STATE = {
  currentUser: null
}

const userReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state
  }
}

export default userReducer
