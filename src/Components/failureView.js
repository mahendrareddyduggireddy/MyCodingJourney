import './index.css'

const FailureView = props => {
  const {getFunc} = props
  const getDataFunc = () => {
    getFunc()
  }
  return (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <button type="button" onClick={getDataFunc}>
        Retry
      </button>
    </>
  )
}
export default FailureView
