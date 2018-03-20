import React, { Component } from 'react';
import { auth, db, firebase } from '../../firebase';
import { Form, Checkbox, Button } from 'semantic-ui-react';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})


const INITIAL_STATE = {
  food: '',
  risotto: 0,
  starterWithoutProsciutto: 0,
  steak: 0,
  mainCourse: '',
  error: null,
}

class SelectFood extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  assignMainCourse = () => {
    if (this.state.mainCourse === 'risotto') {
      this.setState({ risotto: 0, steak: 1 })
    } else if (this.state.mainCourse === 'steak') {
      this.setState({ steak: 0, risotto: 1 })
    }
  }

  onSubmit = (event) => {
    console.log(this.state)
    const { food, risotto, steak } = this.state

    firebase.auth.onAuthStateChanged(authUser => {
        console.log('submit')
        // Udate user with menu option
        db.doCreateFood(authUser.uid, food, risotto, steak)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }))
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error))
          })

    })

    event.preventDefault()
  }

  handleChange = (e, { value }) => {
      this.setState({ mainCourse: value })
      this.assignMainCourse()
  }

  render() {
    const {
      food,
      risotto,
      steak,
      error
    } = this.state

    console.log(this.state)

    return (
      <Form onSubmit={this.onSubmit}>
        <input
          value={food}
          onChange={event => this.setState(updateByPropertyName('food', event.target.value))}
          type="text"
          placeholder="Food"
        />
      <Form.Field>
        <Checkbox
          radio
          label='I would like Risotto'
          name='checkboxRadioGroup'
          value='risotto'
          checked={this.state.mainCourse === 'risotto'}
          onChange={this.handleChange}
        />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='I would like Steak'
            name='checkboxRadioGroup'
            value='steak'
            checked={this.state.mainCourse === 'steak'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default SelectFood
