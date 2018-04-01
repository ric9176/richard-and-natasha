import React from 'react'
import Link from 'gatsby-link'
import { Button, Header, Modal, Icon } from 'semantic-ui-react';

const ConfirmationModal = ({handleModalClose, showModal, handlePlusOne}) => (
<Modal
  basic
  closeIcon
  size='small'
  style={{ textAlign: 'center' }}
  onClose={handleModalClose}
  open={showModal}>

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
    <Button onClick={handlePlusOne} basic color='green' inverted>
      <Icon name='checkmark' /> Yes please!
    </Button>
  </Modal.Actions>
</Modal>
)

export default ConfirmationModal
