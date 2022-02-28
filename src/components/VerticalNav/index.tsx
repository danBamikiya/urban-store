import { FC } from 'react'
import { useSelector } from 'react-redux'
import { UserState } from '../../types/user'
import UserProfile from '../UserProfile'
import './styles.scss'

const mapState = ({ user }: { user: UserState }) => ({
  currentUser: user.currentUser
})

const VerticalNav: FC = ({ children }) => {
  const { currentUser } = useSelector(mapState)

  const configUserProfile = {
    currentUser
  }

  return (
    <div className="verticalNav">
      <UserProfile {...configUserProfile} />

      <div className="menu">{children}</div>
    </div>
  )
}

export default VerticalNav
