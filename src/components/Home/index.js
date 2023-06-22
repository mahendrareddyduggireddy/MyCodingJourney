import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <ul className="home-container">
        <Header />
        <div>
          <h1>Find The Job That Fits Your Life</h1>
          <p>Millions of people are searching for jobs</p>
          <Link to="/jobs">
            <button type="button">Find Jobs</button>
          </Link>
        </div>
      </ul>
    )
  }
}
export default Home
