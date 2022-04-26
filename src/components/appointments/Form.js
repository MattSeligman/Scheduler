import React, { useState } from 'react'
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';


const AppointmentForm = (props) => {

  const { onCancel } = props;

  const [student, setStudent] = useState( props.name || "" );
  const [interviewer, setInterviewer] = useState( props.interviewer || null );

  console.log("Exist?", props)
  const reset = ()=>{
    setStudent("");
    setInterviewer(null);
  }

  const cancel = ()=>{
    reset();
    onCancel();
  }

  const save = ()=>{
    console.log(`save submitted:`, student, interviewer);
    
    if(student && interviewer){
      props.onSave(student, interviewer);
      console.log(`save set:`, student, interviewer);
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
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
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