import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMessage: '', error: false}

  usernameChange = event => {
    this.setState({username: event.target.value})
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const url = ' https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const jwtToken = data.jwt_token
      this.loginSuccess(jwtToken)
    } else {
      this.setState({errorMessage: data.error_msg, error: true})
    }
  }

  render() {
    const {username, password, errorMessage, error} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form onSubmit={this.onSubmit} className="form-container">
          <div className="logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo-container"
            />
          </div>
          <label htmlFor="USERNAME">USERNAME</label>
          <input
            type="text"
            onChange={this.usernameChange}
            id="USERNAME"
            value={username}
          />
          <label htmlFor="PASSWORD">PASSWORD</label>
          <input
            type="password"
            onChange={this.passwordChange}
            id="PASSWORD"
            value={password}
          />
          <button type="submit" className="btn-cont">
            Login
          </button>
          {error && <p>{errorMessage}</p>}
        </form>
      </div>
    )
  }
}
export default Login
