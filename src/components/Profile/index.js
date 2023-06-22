import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Profile extends Component {
  state = {obj: {}}

  componentDidMount() {
    this.getData()
  }

  getFormattedData = profileDetails => ({
    profileImageUrl: profileDetails.profile_image_url,
    name: profileDetails.name,
    shortBio: profileDetails.short_bio,
  })

  getData = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const val = this.getFormattedData(data.profile_details)
      this.setState({obj: val})
    }
  }

  render() {
    const {obj} = this.state
    return (
      <div>
        <img src={obj.profileImageUrl} alt="profile" height={80} width={80} />
        <h1>{obj.name}</h1>
        <p>{obj.shortBio}</p>
      </div>
    )
  }
}

export default Profile
