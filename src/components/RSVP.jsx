import React from 'react'
import { firebase } from '../../firebase'
import SignUpForm from '../signup'
import Attendance from '../signup/Attendance'
import SelectFood from '../signup/SelectFood'
import SignInForm from '../signup/SignInForm'


class Rsvp extends React.Component {
  constructor() {
    super()
    this.state = {authUser: undefined, step:0}
    this.steps = [<Attendance nextStep={this.nextStep} />, <SignUpForm />]
  }
  nextStep = () => {
    this.setState({ step: this.state.step + 1 })
  }
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({authUser})
      }
    })
  }
  render() {
    let content
    if (!this.state.authUser) {
      content = this.steps[this.state.step]
    } else {
      content = <SelectFood />
    }

    return (
      <div>
        {content}

        <br />

        {!this.state.authUser &&
          <SignInForm />
        }
      </div>
    )
  }
}

export default Rsvp
