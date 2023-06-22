import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Profile from '../Profile'
import SalaryRange from '../SalaryRange'
import EmploymentType from '../EmploymentType'
import './index.css'
import JobCard from '../JobCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    employmentType: [],
    salaryRange: '',
    reqList: [],
    error: true,
  }

  componentDidMount() {
    this.getJobList()
  }

  onEmploymentType = req => {
    const {employmentType} = this.state
    const value = employmentType.extend(req)
    this.setState({employmentType: value}, this.getJobList)
  }

  onButton = () => {
    const {searchInput, employmentType, salaryRange} = this.state
    this.setState({searchInput, employmentType, salaryRange}, this.getJobList)
  }

  onSalaryRange = ess => {
    this.setState({salaryRange: ess}, this.getJobList)
  }

  getJobList = async () => {
    this.setState({error: true})
    const {salaryRange, searchInput, employmentType} = this.state
    const val = employmentType.join()
    const url = `https://apis.ccbp.in/jobs?employment_type=${val}&minimum_package=${salaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(item => ({
        companyLogo: item.company_logo_url,
        employmentType: item.employment_type,
        location: item.location,
        salaryPackage: item.package_per_annum,
        rating: item.rating,
        title: item.title,
        jobDescription: item.job_description,
        id: item.id,
      }))
      this.setState({reqList: updatedData, error: false})
    }
  }

  searchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput, reqList, error} = this.state
    return (
      <div className="jobs-container">
        <div>
          <Profile />
          <h1>Type of Employment</h1>
          <ul>
            {employmentTypesList.map(each => (
              <EmploymentType
                key={each.employmentTypeId}
                two={each}
                typeFunc={this.onEmploymentType}
              />
            ))}
          </ul>
          <h1>Salary Range</h1>
          <ul>
            {salaryRangesList.map(item => (
              <SalaryRange
                key={item.salaryRangeId}
                one={item}
                salaryFunc={this.onSalaryRange}
              />
            ))}
          </ul>
        </div>
        <div>
          <input
            type="search"
            value={searchInput}
            onChange={this.searchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            onClick={this.onButton}
          >
            <BsSearch className="search-icon" />
          </button>

          <div>
            {error ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              <ul>
                {reqList.map(each => (
                  <JobCard key={each.id} item={each} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
