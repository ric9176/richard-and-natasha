import React, { Component } from 'react';
import { Form, Input, Divider, Button, Confirm } from 'semantic-ui-react'
import Link, { navigateTo } from 'gatsby-link'

import { db } from '../../firebase'
import Header from '../components/Header/Header';
import Container from '../components/Container/Container';
import Footer from '../components/Footer/Footer';
import config from '../../config/SiteConfig';

class NotAttending extends Component {
  constructor(){
    super()
    this.state = { open: false }
  }

  onSubmit = (event) => {
    const {name, message } = this
    if (!name || !message) {
      alert('please enter a message!')
    } else {
      db.doCreateNonAtendee(name, message).then(() => {
        this.showModal()
      })
      .catch(error => {
        console.log('error', error)
      })
    }
  }

  showModal = () => {
    this.setState({ open: true })
  }

  handleConfirm = () => {
    this.setState({ open: false })
    navigateTo('/')
  }

  render() {

    return (
      <div className="container about-container">
        <Confirm
          open={this.state.open}
          onConfirm={this.handleConfirm}
          confirmButton="Back to homepage"
          cancelButton={false}
          content="Thanks for leaving a message!"
        />
        <Header>Not Attending</Header>
        <Container text>
          <h1>Sorry to hear you can't attend</h1>
          <p>
            <Form onSubmit={this.onSubmit}>
              <Input
                onChange={e => this.name = e.target.value}
                type="text"
                style={{width: "50%"}}
                placeholder="Name"
              />
              <Input
                onChange={e => this.message = e.target.value}
                type="text"
                style={{width: "50%"}}
                placeholder="Message"
              />
               <Divider />
              <Button type='submit'>Submit</Button>
            </Form>
          </p>
        </Container>
        <Footer />
      </div>
    )
  }
}

export default NotAttending
