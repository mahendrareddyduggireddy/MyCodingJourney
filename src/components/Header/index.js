import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const cookiesRemove = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <li className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo-one"
        />
      </Link>
      <div className="links-container">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
      </div>
      <button type="button" onClick={cookiesRemove} className="btn-container">
        Logout
      </button>
    </li>
  )
}

export default withRouter(Header)
