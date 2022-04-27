import { useState, useEffect } from "react";
import axios from 'axios';

const useApplicationData = () => {
  
   // default states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // set the Day's state
  const setDay = day => setState({ ...state, day })
  
  // update the states based on the routes responses
  useEffect(() => {
    Promise.all(
      [
        axios.get(`/api/days`),
        axios.get(`/api/appointments`),
        axios.get(`/api/interviewers`)
      ]
    )
    .then((promiseResp) => {
        
      setState(prev => (
        { 
          ...prev, 
          days: promiseResp[0].data, 
          appointments: promiseResp[1].data,
          interviewers: promiseResp[2].data
        }
      ));
    })
    
  }, []);

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[ id ],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [ id ]: appointment
    };
    
    return axios
      .put( `/api/appointments/${id}`, { interview } )
      .then( (res) => {
        
        if ( res.status === 204 ) {
          setState( {...state, appointments} )
        }
        
      })
  }

  const cancelInterview = (id) => {

    return axios
      .delete(`/api/appointments/${id}`)
  };

  const updateSpot = (action)=>{
    setSpot(action, state.day);
  }

  /**
   * `addOrSubtract` adds if `true` and subtracts if `false`.
   * `daySelected` checks if the day is the current selected day before altering its spot.
   * @param {boolean} addOrSubtract 
   * @param {string} daySelected 
   */
  const setSpot = (addOrSubtract, daySelected) => {

    setState( prev => {
      const currentState = { ...prev };
      currentState.days.filter( currentDay => {

        console.log("Current day", currentDay.name,"vs", daySelected)

        if (currentDay.name === daySelected){
          return (addOrSubtract) ? currentDay.spots++ : currentDay.spots--;
        }
        
        return false;
      });

      return currentState;
    });

  };

  return { state, setDay, bookInterview, cancelInterview, setSpot, updateSpot };

}
export default useApplicationData;