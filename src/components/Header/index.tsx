import { FC } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { UserState } from '../../types/user'
import { auth } from '../../firebase/utils'
import Logo from '../../assets/logo.png'
import './styles.scss'

type props = UserState

const Header: FC<props> = ({ currentUser }) => {
  const handleSignOut = () => {
    auth.signOut()
  }

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <span onClick={handleSignOut}>LogOut</span>
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = ({ user }: { user: UserState }) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps, null)(Header)
