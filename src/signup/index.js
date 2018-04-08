import React, { Component } from 'react';
import { Form, Input, Divider, Button } from 'semantic-ui-react'

import { auth, db } from '../../firebase';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state


    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user as a "guest" in Firebase Database
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }))
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error))
          })

      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error))
      })

    event.preventDefault()
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === ''

    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          value={username}
          onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <Input
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <Input
          value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <Input
          value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <Button disabled={isInvalid} type="submit">
          Sign Up
        </Button>

        { error && <p>{error.message}</p> }
      </Form>
    );
  }
}

export default SignUpForm
