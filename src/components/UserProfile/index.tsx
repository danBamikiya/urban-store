import './styles.scss'
import userIMG from '../../assets/user.png'
import { UserState } from '../../types/user'

const UserProfile = (props: UserState) => {
  const { currentUser } = props
  // @ts-ignore
  const { displayName } = currentUser

  return (
    <div className="userProfile">
      <ul>
        <li>
          <div className="img">
            <img src={userIMG} alt="user" />
          </div>
        </li>
        <li>
          <span className="displayName">{displayName && displayName}</span>
        </li>
      </ul>
    </div>
  )
}

export default UserProfile
