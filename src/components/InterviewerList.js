import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "./InterviewerList.scss";

function InterviewerList(props) {

  const interviewers = props.interviewers;
  const interviewerList = interviewers.map( (interviewer) =>{    
    return (
      <InterviewerListItem 
        key={interviewer.id}
        {...interviewer}
        selected={interviewer.id === props.value}
        setInterviewer={ () => props.onChange(interviewer.id)}
      />
    )
  });

  return (
    <section className="interviewers">
      
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}

export default InterviewerList;