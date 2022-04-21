import React from "react";
import classNames from "classnames";

import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  // Pull entries from Parent and assign to props object.
  const { id, name, avatar, selected } = props;

  // Assign classes with classNames npm
  const classSetup = classNames(
    // includes base class, adds selected if selected
    `interviewers__item${selected ? "--selected" : ""}`
  );
  
  return (
    <li 
      key={id}
      className={classSetup}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected ? `${name}` : ""}
    </li>
  );
}