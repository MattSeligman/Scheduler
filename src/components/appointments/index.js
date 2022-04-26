import React from 'react'
import Header from 'components/appointments/Header'
import Show from 'components/appointments/Show'
import Empty from 'components/appointments/Empty'
import Form from 'components/appointments/Form'
import Status from 'components/appointments/Status'

import useVisualMode from 'hooks/useVisualMode'
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    
    transition(SAVING);
    // see if the data is actually entering correctly
    console.log(`index.js 30 | props.id`, props.id);
    console.log(`index.js 31 | interview`, interview);
    
    // // book the Interview
    // const bookInterview = new Promise((success, failed)=>{
      // props.bookInterview(props.id, interview);
    // })

    // transition to the Show if found, empty if not.
    props.bookInterview(props.id, interview)
      .then(()=> transition(SHOW) )
      .catch((error) => console.log("error", error))

  };

  console.log("passed down props", props)
  return ( 
  <article className="appointment">
      <Header id={ props.id } time={ props.time } />
      
      { // show empty field if no interview exists
        mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      { mode === SAVING && <Status message="Saving" />}

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