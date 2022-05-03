import React from 'react'
import Header from 'components/appointments/Header'
import Show from 'components/appointments/Show'
import Empty from 'components/appointments/Empty'
import Form from 'components/appointments/Form'
import Status from 'components/appointments/Status'
import Confirm from 'components/appointments/Confirm'
import Error from 'components/appointments/Error'

import useVisualMode from 'hooks/useVisualMode'
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM_DELETE = "CONFIRM_DELETE";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

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
    
    // transition to the Show if found, empty if not.
    props
      .bookInterview(props.id, interview)
      .then(()=> { 
        transition(SHOW) 
          props.updateSpot(false);
      })
      .catch((err) => {
        transition(ERROR_SAVE, true);
      
      });

  };

  /* Should optimize, temporary fix to get edit not to save */
  const edit = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    
    transition(SAVING);
    
    // transition to the Show if found, empty if not.
    props
      .bookInterview(props.id, interview)
      .then(()=> { 
        transition(SHOW) 
      })
      .catch((err) => {
        transition(ERROR_SAVE, true)
      });
  };
  const editInterview = ()=>{
    transition(EDIT);
  }

  const confirmDelete = () => {
    transition(CONFIRM_DELETE);
  };

  const onDelete = ()=>{
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => { 
        transition(EMPTY)
        props.updateSpot(true);
      })
      .catch(() => transition(ERROR_DELETE, true));
  }

  return ( 
  <article className="appointment">
      <Header id={ props.id } time={ props.time } />
      
      { // Show Empty CTA if no appointment set
        mode === EMPTY && <Empty onAdd={() => 
          {
            transition(CREATE)
          }
        } />
      }

      { // Show the CREATE form
        mode === CREATE && (
          <Form 
            interviewers={props.interviewers} 
            onCancel={ ()=>{ transition(EMPTY)} } 
            onSave={ save } 
          />
        )
      }
      { // ^ ERROR on SAVE 
        mode === ERROR_SAVE && (
          <Error 
            message = "Unable to save at the moment."
            onClose = { ()=>{ transition(CREATE)} }
          />
        )
      }
      { // ^ ERROR on DELETE 
        mode === ERROR_DELETE && (
          <Error 
            message = "Unable to delete at the moment."
            onClose = { ()=>{ transition(EMPTY)} }
          />
        )
      }

      { // Show the Status "Saving..."
        mode === SAVING && <Status message="Saving" />
      }

      { // Show if the props interview exists
        mode === SHOW && props.interview && (
          <Show 
            student={ props.interview.student }
            interviewer={ props.interview.interviewer }
            onEdit={ editInterview } 
            onDelete={ confirmDelete } 
          />
        )
      }

      { // Show the interview Edit Details
        mode === EDIT && props.interview && (
          <Form 
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={ back } 
            onSave={ edit } 
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