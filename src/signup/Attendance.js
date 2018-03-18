import React from 'react'

const Attendance = (props) => (
  <div>
    <button onClick={props.nextStep}>attend</button>
    <button>Can't make it, go to page with form</button>
  </div>
)

export default Attendance
