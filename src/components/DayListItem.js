import React, { useState } from "react";
import classNames from "classnames";

import "./DayListItem.scss";

export default function DayListItem(props) {

  let { name, spots, selected } = props;
  const [ getSpots, setSpots ] = useState(5);
  const [ getSpotsMessage, setSpotsMessage ] = useState(`${getSpots} spots remaining`);

  let dayClass = classNames(
    // included
    "day-list__item",

    // conditionally included
  {
    "day-list__item--selected": selected === true,
    "day-list__item--full": spots === 0
  }
  );

  const selectDay = () => {
    props.setDay(name);

    // assign the setSpot & setSpot Message
    setSpots( (currentSpot) => { 

      let currentSpotMinusOne = (currentSpot - 1);

      if(currentSpotMinusOne === 1){
        setSpotsMessage(`${currentSpotMinusOne} spot remaining`);
        return currentSpotMinusOne;
      }

      if(currentSpotMinusOne === 0 || currentSpot === 0){
        setSpotsMessage(`no spots remaining`);
        return 0;
      }

      // basecase
      setSpotsMessage(`${currentSpotMinusOne} spots remaining`);
      return currentSpot - 1;
    });
  }

  return (
    <li 
      className={dayClass}
      onClick={selectDay}
      spots={getSpots}
    >
      <h2 
        className="text--regular"
      >{name}</h2>
      <h3 
      className="text--light"
      >{getSpotsMessage}</h3>
    </li>
  );
}