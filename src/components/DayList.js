import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){

  // pull the days from the props
  let { days, setDay } = props;

  return(
    <ul>
      {/* loop through the day's entries */}
      {days.map((day) =>{
          return <DayListItem 
            key={day.id}
            name={day.name} 
            spots={day.spots} 
            selected={day.name === props.day}
            setDay={setDay}  
          />;
        })
      }
    </ul>
  )
}