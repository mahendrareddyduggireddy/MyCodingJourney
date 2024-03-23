import './index.css'
import {Link, withRouter} from 'react-router-dom'

const Header = () => (
  <div className="header-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      alt="website logo"
      className="img-style"
    />
    <div className="links-container">
      <Link to="/" className="home-style">
        Home
      </Link>
      <Link to="/login" className="login-style">
        Login
      </Link>
    </div>
    <button type="button" className="btn-style">
      Logout
    </button>
  </div>
)

export default withRouter(Header)
