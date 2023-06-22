import './index.css'

const SimilarJobs = props => {
  const {item} = props
  return (
    <li>
      <img src={item.companyLogo} alt={item.title} height={80} width={80} />
      <p>{item.rating}</p>
      <p>{item.location}</p>
      <p>{item.jobDescription}</p>
      <h1>{item.employmentType}</h1>
      <h1>{item.title}</h1>
    </li>
  )
}
export default SimilarJobs
