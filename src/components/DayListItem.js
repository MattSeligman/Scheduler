import React from "react";
import classNames from "classnames";

import "./DayListItem.scss";

export default function DayListItem(props) {

  let { name, spots } = props;

  let dayClass = classNames("day-list__item",{
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spots === 0
  });
  
  const selectDay = () => {
    props.setDay(name);
  }

  return (
    <li 
      className={dayClass}
      onClick={selectDay}
    >
      <h2 
        className="text--regular"
      >{name}</h2>
      <h3 
      className="text--light"
      >{spots} spots remaining</h3>
    </li>
  );
}