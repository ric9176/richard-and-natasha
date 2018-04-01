import React, { Component } from 'react';
import { auth, db, firebase } from '../../firebase';
import Link, { navigateTo } from 'gatsby-link'
import { Form, Checkbox, Button, Header, Image, Modal, Icon, Input, Divider } from 'semantic-ui-react';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})


const INITIAL_STATE = {
  error: null,
  starter: undefined,
  mainCourse: undefined,
  showModal: false,
  plusOne: false
}

class SelectFood extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
    this.starterWithoutProscuitto = 0
    this.risotto = 0
    this.steak = 0
  }

  onSubmit = (event) => {
    console.log('food', this.food)

    this.state.mainCourse === 'risotto' ? this.risotto = this.risotto + 1 : this.steak = this.steak + 1
    this.state.starter === 'withOutProscuitto' ? this.starterWithoutProscuitto = this.starterWithoutProscuitto + 1 : this.starterWithoutProscuitto = 0

    const { food } = this

    firebase.auth.onAuthStateChanged(authUser => {
      // Udate user with menu option
      const { starterWithoutProscuitto, risotto, steak } = this
      db.doCreateFood(authUser.uid, food, starterWithoutProscuitto, risotto, steak)
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
      // if (this.state.plusOne) {
        // check existing data and imcrement values

          //handle increment of class variables
          // let { starterWithoutProscuitto, risotto, steak } = this
          // this.state.mainCourse === 'risotto' ? risotto = risotto + 1 : steak = steak + 1
          // this.state.starter === 'withOutProscuitto' ? starterWithoutProscuitto = starterWithoutProscuitto + 1 : starterWithoutProscuitto = 0
        // db.onceGetUsers(authUser.uid)
        // .then(
        //   snapshot => {
        //
        //       // starterWithoutProscuitto = starterWithoutProscuitto + snapshot.val().starterWithoutProscuitto
        //       // risotto = risotto + snapshot.val().risotto
        //       // steak = steak + snapshot.val().steak
        //       // console.log(risotto)
        //     }
        //     // console.log(snapshot.val())
        //   }
        // )
        // .catch(error => {
        //   alert(error)
        // })




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

  render() {
    const {
      food,
      starter,
      mainCourse,
      error
    } = this.state

    console.log(this.food)

  const ModalModalExample = () => (
  <Modal
    basic
    closeIcon
    size='small'
    style={{ textAlign: 'center' }}
    onClose={this.handleModalClose}
    open={this.state.showModal}>

    <Modal.Header>Thanks for making your RSVP and food choice!</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <p>Would you also like to select the food choice for your significant other or plus one?</p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions style={{ textAlign: 'center' }}>
      <Link to="/" activeClassName="active">
        <Button basic color='green' inverted>
          <Icon name='checkmark' /> No, it's just for me!
        </Button>
      </Link>
      <Button onClick={this.handlePlusOne} basic color='green' inverted>
        <Icon name='checkmark' /> Yes please!
      </Button>
    </Modal.Actions>
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
          <Input
            onChange={e => this.food = e.target.value}
            type="text"
            style={{width: "50%"}}
            placeholder="Speacial food requirements"
          />
           <Divider />
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}

export default SelectFood
