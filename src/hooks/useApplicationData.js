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

  // setup the API routes
  const api = {
    GET_DAYS: `/api/days`,
    GET_APPOINTMENTS: `/api/appointments`,
    GET_INTERVIEWERS: `/api/interviewers`
  }
  
  // update the states based on the routes responses
  useEffect(() => {
    Promise.all(
      [
        axios.get(api.GET_DAYS),
        axios.get(api.GET_APPOINTMENTS),
        axios.get(api.GET_INTERVIEWERS)
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

  return { state, setDay, bookInterview, cancelInterview };

}
export default useApplicationData;