import React, { Component } from 'react';
import Link, { navigateTo } from 'gatsby-link'
import { Form, Checkbox, Button, Header, Image, Modal, Icon, Input, Divider } from 'semantic-ui-react';

import { auth, db, firebase } from '../../firebase'
import ConfirmationModal from './ConfirmationModal'

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})


const INITIAL_STATE = {
  error: null,
  starter: undefined,
  mainCourse: undefined,
  showModal: false,
  plusOne: false,
  menuSelected: false,
}

class SelectFood extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
    this.starterWithoutProscuitto = 0
    this.risotto = 0
    this.steak = 0
  }

  componentDidMount () {
    db.onceGetUsers(this.props.authUser.uid)
    .then(
      snapshot => {
          console.log('snapshot', snapshot.val().menuSelected === true)
          if (snapshot.val().menuSelected === true) {
            this.setState({
              menuSelected: true,
              starterWithoutProscuitto: snapshot.val().starterWithoutProscuitto,
              risotto: snapshot.val().risotto,
              steak: snapshot.val().steak
            })
          }
        }
    )
    .catch(error => {
      alert(error)
    })
  }

  onSubmit = (event) => {
    this.state.mainCourse === 'risotto' ? this.risotto = this.risotto + 1 : this.steak = this.steak + 1
    this.state.starter === 'withOutProscuitto' ? this.starterWithoutProscuitto = this.starterWithoutProscuitto + 1 : this.starterWithoutProscuitto = 0

    const { food = '' } = this

    firebase.auth.onAuthStateChanged(authUser => {
      // Udate user with menu option
      const { starterWithoutProscuitto, risotto, steak, plusOneName } = this
      const menuSelected = true
      db.doCreateFood(authUser.uid, food, starterWithoutProscuitto, risotto, steak, plusOneName, menuSelected)
        .then(() => {
          this.setState(() => ({ ...INITIAL_STATE }))
          this.handleModalOpen()
        })
        .catch(error => {
          this.setState(updateByPropertyName('error', error))
        })
      })
      if(!this.state.plusOne) {
        event.preventDefault()
      } else {
        navigateTo('/')
      }
      console.log(this.starterWithoutProscuitto, this.risotto, this.steak)
    }


  handleChange = (e, { value }) => {
      this.setState({ mainCourse: value })
  }

  handleStarterChange = (e, { value }) => {
    this.setState({ starter: value })
  }

  handleModalClose = () => this.setState({ showModal: false })

  handleModalOpen = () => this.setState({ showModal: true})

  handlePlusOne = () => {
    this.setState({ plusOne: true})
    this.handleModalClose()
  }

  handleFoodRequst = (e, { value }) => {
    this.setState({ food: value })
  }

  handleFoodChange = () => {
    this.setState({ menuSelected: false })
  }

  render() {
    const {
      food,
      starter,
      mainCourse,
      plusOne,
      menuSelected,
      error
    } = this.state

    console.log(this.state)

    let content


    return (
      <div>
        <ConfirmationModal handleModalClose={this.handleModalClose} showModal={this.state.showModal} handlePlusOne={this.handlePlusOne} />
          {menuSelected ?
            <div>
              <h1>My food selection</h1>
              <p>{`Risotto: ${this.state.risotto}`}</p>
              <p>{`Steak: ${this.state.steak}`}</p>
              <p>{`Vegetarian starter: ${this.state.starterWithoutProscuitto}`}</p>
              <Button onClick={this.handleFoodChange}>I need to change this</Button>
            </div>
            :
            <Form onSubmit={this.onSubmit}>
            {plusOne &&
              <Input
                onChange={e => this.plusOneName = e.target.value}
                type="text"
                style={{width: "50%", padding: "1em 0"}}
                placeholder="Enter their name here..."
                label="The full name of your plus one"
              />
            }
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
              label='I would like asparagus risotto (vegetarian).'
              name='checkboxRadioGroup'
              value='risotto'
              checked={mainCourse === 'risotto'}
              onChange={this.handleChange}
            />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label='I would like steak with potatoes and Duoro glaze.'
                name='checkboxRadioGroup'
                value='steak'
                checked={mainCourse === 'steak'}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Input
              onChange={e => this.food = e.target.value}
              type="text"
              style={{width: "50%"}}
              placeholder="Any special food requirements?"
            />
             <Divider />
            <Button type='submit'>Submit</Button>
          </Form>
          }
      </div>
    )
  }
}

export default SelectFood
