import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import SuccessView from './successView'
import FailureView from './failureView'

class ProjectShowcase extends Component {
  state = {selectList: [], dataList: [], isLoading: true, active: ''}

  componentDidMount() {
    const {list} = this.props
    this.setState({selectList: list, active: list[0].id}, this.getData)
  }

  getData = async () => {
    const {active} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${active}`,
    )
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({dataList: updatedData, isLoading: false})
    }
    this.setState({isLoading: false})
  }

  dropFunc = event => {
    this.setState({active: event.target.value}, this.getData)
  }

  render() {
    const {dataList, isLoading, selectList, active} = this.state
    return (
      <div className="projects-container">
        <nav className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="img-style"
          />
        </nav>
        <select onChange={this.dropFunc} value={active}>
          {selectList.map(each => (
            <option key={each.id} value={each.id}>
              {each.displayText}
            </option>
          ))}
        </select>
        {!isLoading && dataList.length !== 0 ? (
          <ul className="ul-container">
            {dataList.map(each => (
              <SuccessView key={each.id} item={each} />
            ))}
          </ul>
        ) : (
          <FailureView getFunc={this.getData} />
        )}
        {isLoading && (
          <div data-testid="loader">
            <Loader type="ThreeDots" />
          </div>
        )}
      </div>
    )
  }
}
export default ProjectShowcase
