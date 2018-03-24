import React, { Component } from 'react';
import { auth, db, firebase } from '../../firebase';
import { Form, Checkbox, Button } from 'semantic-ui-react';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})


const INITIAL_STATE = {
  food: '',
  error: null,
  starter: undefined,
  mainCourse: undefined,
}

class SelectFood extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    console.log(this.state)
    let risotto = 0
    let steak = 0
    this.state.mainCourse === 'risotto' ? risotto = 1 : steak = 1
    const { food } = this.state

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
  }

  handleStarterChange = (e, { value }) => {
    this.setState({ starter: value })
  }

  render() {
    const {
      food,
      starter,
      mainCourse,
      error
    } = this.state

    console.log(this.state)

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <Checkbox
            radio
            label='I would like my starter (a cheese and prosciutto roll) WITH prosciutto.'
            name='checkboxRadioGroup'
            value='withProscuitto'
            checked={starter === 'withProscuitto'}
            onChange={this.handleStarterChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='I would like my starter (a cheese and prosciutto roll) WITHOUT prosciutto.'
            name='checkboxRadioGroup'
            value='withOutProscuitto'
            checked={starter === 'withOutProscuitto'}
            onChange={this.handleStarterChange}
          />
        </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='I would like Risotto'
          name='checkboxRadioGroup'
          value='risotto'
          checked={mainCourse === 'risotto'}
          onChange={this.handleChange}
        />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='I would like Steak'
            name='checkboxRadioGroup'
            value='steak'
            checked={mainCourse === 'steak'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <input
          value={food}
          onChange={event => this.setState(updateByPropertyName('food', event.target.value))}
          type="text"
          placeholder="Food"
        />
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default SelectFood
