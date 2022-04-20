import React from "react";
import classNames from "classnames";

import "./DayListItem.scss";

export default function DayListItem(props) {

  // Pull entries from Parent and assign to props object.
  let { name, spots, selected } = props;

  // Assign classes with classNames npm
  let dayClass = classNames(

    // included classes
    "day-list__item",

    // conditionally included classes
    {
      "day-list__item--selected": selected,
      "day-list__item--full": spots === 0
    }
  );

  // Day State on Click
  const selectDay = ()=>{
    props.setDay(name);
  }

  // Message states based on Spots
  const spotsMessage = (spots)=>{
    
    if (spots === 0 ) {
      return `no spots remaining`;
    }
    else if (spots === 1 ) {
      return `${spots} spot remaining`;
    }

    return `${spots} spots remaining`;
  }
  
  return (
    <li 
      className={dayClass}
      onClick={selectDay}
      spots={spots}
    >
      <h2 
        className="text--regular"
      >{name}</h2>
      <h3 
        className="text--light"
      >{spotsMessage(spots)}</h3>
    </li>
  );
}