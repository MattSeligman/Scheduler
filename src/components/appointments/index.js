import React from 'react'
import Header from 'components/appointments/Header'
import Show from 'components/appointments/Show'
import Empty from 'components/appointments/Empty'
import "./styles.scss";

const Appointment = (props) => {
  const { 
      id, time, interview, onEdit, onDelete, // Show
      onAdd // Empty
    } = props;

    console.log(props) 
  return ( 
  <article className="appointment">
      <Header id={ id } time={ time } />
      { 
        
        (interview) ? 
        
        // if interview exists
        <Show 
          student={ interview.student } 
          interviewer={ interview.interviewer } 
          onEdit={ onEdit  } 
          onDelete={ onDelete } 
        />

        : // else return

        <Empty
          onAdd= { onAdd }
        />  
      }
      
      
    </article>
  )
}

export default Appointment