import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types'; 

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

/* propTypes checking that interviewers value type is an Array */
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};


export default InterviewerList;