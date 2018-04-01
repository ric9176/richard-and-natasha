import React from 'react'

const Attendance = (props) => (
  <div>
    <button onClick={props.nextStep}>Attending</button>
    <button>Can't make it</button>
  </div>
)

export default Attendance
