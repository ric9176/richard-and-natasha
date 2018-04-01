import React from 'react'
import Link from 'gatsby-link'
import { Button } from 'semantic-ui-react'

const Attendance = (props) => (
  <div>
    <Button onClick={props.nextStep}>Attending</Button>
    <Link to="/notAttending"><Button>Can't make it</Button></Link>
  </div>
)

export default Attendance
