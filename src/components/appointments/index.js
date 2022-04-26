import React from 'react'
import Header from 'components/appointments/Header'
import Show from 'components/appointments/Show'
import Empty from 'components/appointments/Empty'
import Form from 'components/appointments/Form'
import useVisualMode from 'hooks/useVisualMode'
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  console.log(`>>>`,props);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }
  
  return ( 
  <article className="appointment">
      <Header id={ props.id } time={ props.time } />
      
      { // show empty field if no interview exists
        mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      { // show interview if exists
        mode === SHOW && (
        <Show 
          student={ props.interview.student }
          interviewer={ props.interview.interviewer }
          onEdit={ props.onEdit  } 
          onDelete={ props.onDelete } 
        />
        )
      }

      {mode === CREATE && (
        
        <Form 
          interviewers={props.interviewers} 
          onCancel={ back } 
          onSave={ save } 
        />
      )}


    </article>
  )
}

export default Appointment