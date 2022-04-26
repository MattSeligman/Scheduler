import React from "react";
import classNames from "classnames";

import "./InterviewerListItem.scss";

function InterviewerListItem(props) {

  // Assign classes with classNames npm
  const classSetup = classNames(

    // includes base class, adds selected if selected
    `interviewers__item${props.selected ? "--selected" : ""}`
  );

  return (
    <li 
      key={props.id}
      className={classSetup}
      onClick={props.setInterviewer}
      selected={props.selected}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? `${props.name}` : ""}
    </li>
  );
}

export default InterviewerListItem;