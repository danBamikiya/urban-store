import { User } from 'firebase'

export type user = null | User
export type UserState = {
  currentUser: user | {}
}
