import React, { useState, useEffect } from "react";
import DayList from '../components/DayList';
import Appointment from '../components/appointments/index';
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from '../helpers/selectors';

import "components/Application.scss";
import axios from 'axios';

const Application = () =>{
    
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

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  
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

  const deleteInterview = (id) => {

    return axios
      .delete(`/api/appointments/${id}`)
  };
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        <DayList
          days={state.days}
          value={state.day}
          setDay={setDay}
        />

        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
      { appointments.map( appointment => {

        const interview = getInterview(state, appointment.interview);

        return (
                <Appointment
                  key={appointment.id}
                  id={appointment.id}
                  time={appointment.time}
                  interview={interview}
                  interviewers={interviewers}
                  bookInterview={bookInterview}
                  deleteInterview={deleteInterview}
                />
            );
          })
      }
        <Appointment key="last" time="5pm" />
      </section>

    </main>
  );
}

export default Application;