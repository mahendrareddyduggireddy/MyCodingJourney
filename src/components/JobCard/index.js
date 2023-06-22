import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {item} = props
  const {
    jobDescription,
    employmentType,
    rating,
    location,
    companyLogo,
    title,
    salaryPackage,
    id,
  } = item
  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <img src={companyLogo} alt="company logo" />
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <p>{salaryPackage}</p>
        <h1>{title}</h1>
        <p>{employmentType}</p>
        <p>{rating}</p>
        <p>{location}</p>
      </Link>
    </li>
  )
}
export default JobCard
