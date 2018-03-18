import React, { Component } from 'react';
import { auth, db, firebase } from '../../firebase';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})


const INITIAL_STATE = {
  food: '',
  error: null,
}

class SelectFood extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const { food } = this.state

    firebase.auth.onAuthStateChanged(authUser => {

        // Udate user with menu option
        db.doCreateFood(authUser.uid, food)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }))
            console.log(this.state)
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error))
          })

    })

    event.preventDefault()
  }

  render() {
    const {
      food,
      error
    } = this.state

    const isInvalid =
      food === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={food}
          onChange={event => this.setState(updateByPropertyName('food', event.target.value))}
          type="text"
          placeholder="Food"
        />
        <button disabled={isInvalid} type="submit">
          Select
        </button>

        { error && <p>{error.message}</p> }
      </form>
    )
  }
}

export default SelectFood
