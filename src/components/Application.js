import React, { useState, useEffect } from "react";
import DayList from '../components/DayList'
import Appointment from '../components/appointments/index'
import getAppointmentsForDay from '../helpers/selectors'

import "components/Application.scss";
import axios from 'axios';

const Application = () =>{

  const setDay = day => setState({ ...state, day })
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const api = {
    GET_DAYS: `http://localhost:8001/api/days`,
    GET_APPOINTMENTS: `http://localhost:8001/api/appointments`,
    GET_INTERVIEWERS: `http://localhost:8001/api/interviewers`
  }
  
  useEffect(() => {
    Promise.all(
      [
        axios.get(api.GET_DAYS),
        axios.get(api.GET_APPOINTMENTS),
        axios.get(api.GET_INTERVIEWERS)
      ]
    )
    .then((promiseResp) => {

      let apiResponse = {
        GET_DAYS: promiseResp[0].data,
        GET_APPOINTMENTS: promiseResp[1].data,
        GET_INTERVIEWERS: promiseResp[2].data
      }
      console.log("apiResponse.GET_DAYS", apiResponse.GET_DAYS);
      console.log("apiResponse.GET_APPOINTMENTS", apiResponse.GET_APPOINTMENTS);
      console.log("apiResponse.GET_INTERVIEWERS", apiResponse.GET_INTERVIEWERS);
        
      // setState( (prev) => ({ ...prev, days: apiResponse.GET_DAYS, appointments: apiResponse.GET_APPOINTMENTS }) );
      setState(prev => ({ ...prev, days: apiResponse.GET_DAYS, appointments: apiResponse.GET_APPOINTMENTS }));
    });
    
    // axios.get(apiDays)
    //   .then(response => {
    //     console.log("Test", response.data, dailyAppointments)
    //     setDays(response.data);
    //   })
    //   .catch((error)=>{
    //     console.log("Axios - error:", error );
    //     console.log("Axios - error.response:", error.response );
    //     console.log("Axios - error.status:", error.status );
    //   })

  }, []);

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
        {
          dailyAppointments.map( appointment => {
            return (
              <Appointment
                key={appointment.id}
                {...appointment}
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