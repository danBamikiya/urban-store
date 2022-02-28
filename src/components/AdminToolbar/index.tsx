import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkUserIsAdmin } from '../../utils/auth'
import { UserState } from '../../types/user'
import './styles.scss'

const mapState = ({ user }: { user: UserState }) => ({
  currentUser: user.currentUser
})

const AdminToolbar: FC = props => {
  const { currentUser } = useSelector(mapState)

  const isAdmin = checkUserIsAdmin(currentUser)
  if (!isAdmin) return null

  return (
    <div className="adminToolbar">
      <ul>
        <li>
          <Link to="/admin">My admin</Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminToolbar
