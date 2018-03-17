import React from 'react'
import { firebase } from '../../firebase'
import SignUpForm from '../signup'

class Rsvp extends React.Component {
  constructor() {
    super()
    this.state = {signedIn: false}
  }
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({signedIn: true})
      }
    })
  }
  render() {
    console.log(firebase)
    let content
    if (!this.state.signedIn) {
      content = <SignUpForm />
    } else {
      content = <p>signed in user rsvp</p>
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}

export default Rsvp
