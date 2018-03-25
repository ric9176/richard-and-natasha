import React, { Component } from 'react';
import { auth, db, firebase } from '../../firebase';
import { Form, Checkbox, Button, Header, Image, Modal } from 'semantic-ui-react';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})


const INITIAL_STATE = {
  food: '',
  error: null,
  starter: undefined,
  mainCourse: undefined,
  showModal: false
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
    let starterWithoutProscuitto = 0
    this.state.mainCourse === 'risotto' ? risotto = risotto + 1 : steak = steak + 1
    this.state.starter === 'withOutProscuitto' ? starterWithoutProscuitto = starterWithoutProscuitto + 1 : starterWithoutProscuitto = 0
    const { food } = this.state

    firebase.auth.onAuthStateChanged(authUser => {
        // check existing data and imcrement values
        // let plusOne = true
        // db.onceGetUsers(authUser.uid)
        // .then(
        //   snapshot => {
        //     if (plusOne) {
        //       starterWithoutProscuitto = starterWithoutProscuitto + snapshot.val().starterWithoutProscuitto
        //       risotto = risotto + snapshot.val().risotto
        //       steak = steak + snapshot.val().steak
        //       console.log(risotto)
        //     }
        //     console.log(snapshot.val())
        //   }
        // )
        // Udate user with menu option
        db.doCreateFood(authUser.uid, food, starterWithoutProscuitto, risotto, steak)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }))
            this.setState({showModal: !this.state.showModal})
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

  handleClose = () => this.setState({ showModal: false })

  render() {
    const {
      food,
      starter,
      mainCourse,
      error
    } = this.state

    console.log(this.state)

  const ModalModalExample = () => (
  <Modal
    basic
    closeIcon
    size='mini'
    onClose={this.handleClose}
    open={this.state.showModal}>

    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

    return (
      <div>
        <ModalModalExample />
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
      </div>
    )
  }
}

export default SelectFood
