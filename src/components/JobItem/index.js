import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

import SimilarJobs from '../SimilarJobs'

class JobItem extends Component {
  state = {job: {}, similarJobs: []}

  componentDidMount() {
    this.getJobsDetails()
  }

  getFormattedData = jobDetails => ({
    employmentType: jobDetails.employment_type,
    rating: jobDetails.rating,
    packageDetails: jobDetails.package_per_annum,
    location: jobDetails.location,
    jobDescription: jobDetails.job_description,
    skills: jobDetails.skills,
    lifeAtCompanyName: jobDetails.life_at_company.description,
    lifeAtCompanyImage: jobDetails.life_at_company.image_url,
    companyLogoUrl: jobDetails.company_logo_url,
    title: jobDetails.title,
    companyWebsiteUrl: jobDetails.company_website_url,
  })

  getJobsDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.job_details)
      const updatedList = data.similar_jobs.map(eachOne => ({
        companyLogo: eachOne.company_logo_url,
        rating: eachOne.rating,
        jobDescription: eachOne.job_description,
        title: eachOne.title,
        location: eachOne.location,
        employmentType: eachOne.employment_type,
      }))
      this.setState({
        similarJobs: updatedList,
        job: updatedData,
      })
    }
  }

  render() {
    const {similarJobs, job} = this.state

    return (
      <div>
        <div>
          <h1>{job.employmentType}</h1>
          <p>{job.location}</p>
          <p>{job.jobDescription}</p>
          <p>{job.packageDetails}</p>
          <ul>
            {job.skills.map(each => (
              <li>
                <img
                  src={each.image_url}
                  alt={each.name}
                  height={80}
                  width={80}
                />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
          <p>{job.lifeAtCompanyName}</p>
          <p>{job.rating}</p>
          <div>
            <img src={job.lifeAtCompanyImage} alt={job.lifeAtCompanyName} />
            <p>{job.lifeAtCompanyName}</p>
          </div>
          <img
            src={job.companyLogoUrl}
            alt={job.title}
            height={80}
            width={80}
          />
          <a href={job.companyWebsiteUrl}>Visit</a>
        </div>
        <ul>
          {similarJobs.map(eachOne => (
            <SimilarJobs key={eachOne.id} item={eachOne} />
          ))}
        </ul>
      </div>
    )
  }
}
export default JobItem
