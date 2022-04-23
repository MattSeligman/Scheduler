import React, { useState, useEffect } from "react";
import DayList from '../components/DayList'
import Appointment from '../components/appointments/index'

import "components/Application.scss";
import axios from 'axios';

const Application = () =>{

  const setDay = day => setState({ ...state, day })
  const setDays = days => setState(prev => ({ ...prev, days }));
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = [];
  
  const apiDays = `http://localhost:8001/api/days/`;
  const apiAppointments = `http://localhost:8001/api/appointments`;
  
  useEffect(() => {
    Promise.all([
      axios.get(apiDays),
      axios.get(apiAppointments),
      // axios.get('/third_endpoint')

    ]).then((promiseResp) => {
      let apiDaysResponse = promiseResp[0].data;
      let apiAppointmentsResponse = promiseResp[1].data;
      
      setDays(apiDaysResponse);

      console.log("apiDaysResponse", apiDaysResponse); // second
      console.log("apiAppointmentsResponse", apiAppointmentsResponse); // second
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