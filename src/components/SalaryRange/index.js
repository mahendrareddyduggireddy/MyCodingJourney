import './index.css'

const SalaryRange = props => {
  const {one, salaryFunc} = props
  const {salaryRangeId, label} = one
  const onChangeFunc = event => {
    const ess = event.target.value
    salaryFunc(ess)
  }

  return (
    <li className="input-container">
      <input
        type="radio"
        onChange={onChangeFunc}
        id={salaryRangeId}
        value={salaryRangeId}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}
export default SalaryRange
