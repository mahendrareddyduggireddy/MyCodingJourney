import './index.css'

const SuccessView = props => {
  const {item} = props
  const {name, imageUrl} = item
  return (
    <li className="li-container">
      <img src={imageUrl} alt={name} className="icon-style" />
      <p>{name}</p>
    </li>
  )
}
export default SuccessView
