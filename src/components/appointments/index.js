import React from 'react'
import Header from 'components/appointments/Header'
import Show from 'components/appointments/Show'
import Empty from 'components/appointments/Empty'
import Form from 'components/appointments/Form'
import Status from 'components/appointments/Status'
import Confirm from 'components/appointments/Confirm'

import useVisualMode from 'hooks/useVisualMode'
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM_DELETE = "CONFIRM_DELETE";
const DELETING = "DELETING";
const DELETING_ERROR = "DELETING_ERROR";

const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const confirmDelete = () => {
    console.log("confirm Delete Clicked")
    transition(CONFIRM_DELETE);
  };

  const onDelete = ()=>{
    transition(DELETING);
    console.log("Delete Clicked")

    props
      .deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(DELETING_ERROR));
  }

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    
    transition(SAVING);
    
    // transition to the Show if found, empty if not.
    props.bookInterview(props.id, interview)
      .then(()=> transition(SHOW) )
      .catch((error) => console.log("error", error))

  };

  console.log("passed down props", props)
  return ( 
  <article className="appointment">
      <Header id={ props.id } time={ props.time } />
      
      { // Show Empty CTA if no appointment set
        mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />
      }

      { // Show the CREATE form
        mode === CREATE && (
          <Form 
            interviewers={props.interviewers} 
            onCancel={ back } 
            onSave={ save } 
          />
        )
      }
      
      { // Show the Status "Saving..."
        mode === SAVING && <Status message="Saving" />
      }

      { // Show the interview Details
        mode === SHOW && (
        <Show 
          student={ props.interview.student }
          interviewer={ props.interview.interviewer }
          onEdit={ props.onEdit  } 
          onDelete={ confirmDelete } 
        />
        )
      }

      { // onDelete - Show the option to Confirm Deleting
        mode === CONFIRM_DELETE && (
          <Confirm
            message = { "Are you sure you would like to delete?" }
            onConfirm = { onDelete }
            onCancel = { back }
          />
        )
      }

      { // Show the Status "Deleting..."
        mode === DELETING && <Status message="Deleting" />
      }

    </article>
  )
}

export default Appointment