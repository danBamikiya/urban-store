import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, RouteComponentProps } from 'react-router-dom'
import { UserState } from '.././types/user'

const mapState = ({ user }: { user: UserState }) => ({
  currentUser: user.currentUser
})

const useAuth = (props: RouteComponentProps) => {
  const { currentUser } = useSelector(mapState)
  const history = useHistory()

  useEffect(() => {
    if (!currentUser) {
      history.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])
  return currentUser
}

export default useAuth
