// import React from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";

// const localizer = momentLocalizer(moment);

// const events = [
//   { title: "Call with Company A", start: new Date(), end: new Date() },
// ];

// const CalendarView = () => (
//   <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500 }} />
// );

// export default CalendarView;


// CalendarView.js
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/CalendarView.css"; // Custom CSS for additional styling

function CalendarView({ companies }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const communicationsByDate = (date) => {
    return companies.flatMap((company) =>
      company.communications
        .filter((comm) => comm.date === date.toISOString().split("T")[0])
        .map((comm) => ({
          companyName: company.name,
          type: comm.type,
          notes: comm.notes || "No additional notes",
        }))
    );
  };

  const selectedDateCommunications = communicationsByDate(selectedDate);

  return (
    <div className="calendar-view-container">
      <h3>Calendar View</h3>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        className="custom-calendar"
      />
      <div className="selected-date-info">
        <h4>Selected Date: {formatDate(selectedDate)}</h4>
        {selectedDateCommunications.length > 0 ? (
          <ul className="communications-list">
            {selectedDateCommunications.map((comm, idx) => (
              <li key={idx} className="communication-item">
                <strong>{comm.companyName}</strong>: {comm.type}
                <p>{comm.notes}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No communications scheduled for this date.</p>
        )}
      </div>
    </div>
  );
}

export default CalendarView;

