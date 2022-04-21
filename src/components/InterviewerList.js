import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "./InterviewerList.scss";

export default function InterviewerList(props) {

  const interviewers = props.interviewers;
  const currentID = props.interviewer;

  const interviewerList = interviewers.map((interviewer) =>{
        
    return (
      <InterviewerListItem 
        key={interviewer.id}
        {...interviewer}
        selected={interviewer.id === currentID}
        setInterviewer={props.setInterviewer}
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