import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, RouteComponentProps } from 'react-router-dom'
import { UserState } from '../types/user'
import { checkUserIsAdmin } from '../utils/auth'

const mapState = ({ user }: { user: UserState }) => ({
  currentUser: user.currentUser
})

const useAdminAuth = (props: RouteComponentProps) => {
  const { currentUser } = useSelector(mapState)
  const history = useHistory()

  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) {
      history.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  return currentUser
}

export default useAdminAuth
