import React, { useState } from 'react'
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';


const AppointmentForm = (props) => {

  const { onCancel } = props;

  const [student, setStudent] = useState( props.name || "" );
  const [interviewer, setInterviewer] = useState( props.interviewer || null );
  const [promptMessage, setPromptMessage] = useState( null );

  const reset = ()=>{
    setStudent("");
    setInterviewer(null);
  }

  const cancel = ()=>{
    reset();
    onCancel();
  }

  const save = ()=>{

    if(!student){
      setPromptMessage("student name cannot be blank");
    }

    if(student && !interviewer){
      setPromptMessage("select your interviewer");
    }

    if(student && interviewer){
      props.onSave(student, interviewer);
    }
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            data-testid="student-name-input"
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        <section className="appointment__validation">{promptMessage}</section>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={ cancel }>Cancel</Button>
          <Button confirm onClick={ save }>Save</Button>
        </section>
      </section>
    </main>
  )
}

export default AppointmentForm