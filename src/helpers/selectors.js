export default function getAppointmentsForDay(state, day) {
        
    const appointmentOnDay = state.days.filter(theDays => theDays.name === day);
    if ( appointmentOnDay.length === 0 ){ return [] };

    const appointmentsIDs = appointmentOnDay[0].appointments;
    
    let appointmentsForDay = [];
    
    appointmentsIDs.forEach((entryID)=>{
        appointmentsForDay.push(state.appointments[entryID])
    });

    return appointmentsForDay;
}

export function getInterview(state, interview) {

    if (!interview) {
        return null;  
    } 
    
    return { "student": interview.student, "interviewer": state.interviewers[interview.interviewer] };
    
};