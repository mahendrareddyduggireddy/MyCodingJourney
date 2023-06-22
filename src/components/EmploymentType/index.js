import './index.css'

const EmploymentType = props => {
  const {two, typeFunc} = props
  const {employmentTypeId, label} = two
  const onChangeOne = event => {
    const req = event.target.value
    typeFunc(req)
  }
  return (
    <li className="input-container">
      <input
        type="checkbox"
        onChange={onChangeOne}
        id={employmentTypeId}
        value={employmentTypeId}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}
export default EmploymentType
