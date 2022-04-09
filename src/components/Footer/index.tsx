import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './styles.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="links">
          <div>
            <Link to="/search">Shop</Link>
            <Link to="#">Map</Link>
            <Link to="#">Legal</Link>
          </div>
          <div>
            <Link to="#">About</Link>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms & Condition</Link>
          </div>
          <div>
            <span>Social Media</span>
            <div className="social-icons">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
