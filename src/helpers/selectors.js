function getAppointmentsForDay(state, day) {

    const currentDayInfo = state.days.filter(theDay => theDay.name === day);
    if ( !currentDayInfo[0] ){ return [] };

    const appointments = currentDayInfo[0].appointments;
    let appointmentsForDay = [];
    
    for(let appointment of appointments) {
      let appointmentDetails = state.appointments[appointment];
      appointmentsForDay.push(appointmentDetails);
    }

    return appointmentsForDay;
}


function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  } 
  
  return { 
    student: interview.student, 
    interviewer: state.interviewers[interview.interviewer] 
  };

};

function getInterviewersForDay(state, day) {

  const currentDayInfo = state.days.find(currentStateDay => currentStateDay.name === day);

  if ( !currentDayInfo ){ 
    return [] 
  };

  return currentDayInfo.interviewers.map(appointmentID=> state.interviewers[appointmentID]);
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay}