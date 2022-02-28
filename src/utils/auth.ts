import axios from 'axios'
import { user } from '../types/user'

export const checkUserIsAdmin = (currentUser: user | {}) => {
  // @ts-ignore
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false
  // @ts-ignore
  const { userRoles } = currentUser
  if (userRoles.includes('admin')) return true

  return false
}

export const apiInstance = axios.create({
  baseURL: ''
})
