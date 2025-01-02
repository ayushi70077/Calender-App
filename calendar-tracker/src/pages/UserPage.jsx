

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaBell } from "react-icons/fa"; // Importing notification bell icon
import "../styles/UserPage.css";
import CalendarView from "../components/CalendarView";


function UserPage() {
  const [companies, setCompanies] = useState([
    {
      name: "Tech Corp",
      communications: [],
      nextScheduledCommunication: null,
      highlightOverride: false, // New property for override feature
    },
    {
      name: "Health Innovations",
      communications: [],
      nextScheduledCommunication: null,
      highlightOverride: false, // New property for override feature
    },
  ]);

  const [newCommunication, setNewCommunication] = useState({
    companyName: "",
    type: "",
    date: "",
    notes: "",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCommunication((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getHighlightColor = (date, override) => {
    if (override) return "none"; // Override disables highlight

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const communicationDate = new Date(date);
    communicationDate.setHours(0, 0, 0, 0);

    const diffTime = communicationDate - currentDate;

    if (diffTime < 0) return "red"; // Overdue
    if (diffTime === 0) return "yellow"; // Due today
    return "green"; // Upcoming
  };

  const addCommunication = () => {
    if (
      !newCommunication.companyName ||
      !newCommunication.type ||
      !newCommunication.date
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedCompanies = companies.map((company) => {
      if (company.name === newCommunication.companyName) {
        const newComm = {
          type: newCommunication.type,
          date: newCommunication.date,
          notes: newCommunication.notes || "No notes provided",
          status: "scheduled",
        };
        const updatedCommunications = [...company.communications, newComm];

        updatedCommunications.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        return {
          ...company,
          communications: updatedCommunications,
          nextScheduledCommunication: updatedCommunications.find(
            (comm) => new Date(comm.date) >= new Date()
          ),
        };
      }
      return company;
    });

    setCompanies(updatedCompanies);

    // Immediately update the colors for the added communication
    setTimeout(() => {
      const communicationElements = document.querySelectorAll(
        ".communication-item"
      );
      communicationElements.forEach((element) => {
        const date = element.getAttribute("data-date");
        const color = getHighlightColor(date, false); // Assuming no override initially
        element.style.backgroundColor =
          color === "red"
            ? "#f8d7da"
            : color === "yellow"
            ? "#fff3cd"
            : "#d4edda";
      });
    }, 0);

    setNewCommunication({ companyName: "", type: "", date: "", notes: "" });
  };

  const deleteCommunication = (companyName, commIndex) => {
    const updatedCompanies = companies.map((company) => {
      if (company.name === companyName) {
        const updatedCommunications = company.communications.filter(
          (_, index) => index !== commIndex
        );
        const nextScheduledCommunication = updatedCommunications.find(
          (comm) => new Date(comm.date) >= new Date()
        );

        return {
          ...company,
          communications: updatedCommunications,
          nextScheduledCommunication,
        };
      }
      return company;
    });

    setCompanies(updatedCompanies);
  };

  const toggleHighlightOverride = (companyName) => {
    const updatedCompanies = companies.map((company) => {
      if (company.name === companyName) {
        return {
          ...company,
          highlightOverride: !company.highlightOverride,
        };
      }
      return company;
    });

    setCompanies(updatedCompanies);
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const getOverdueAndTodayCount = () => {
    let overdueCount = 0;
    let todayCount = 0;

    companies.forEach((company) => {
      if (!company.highlightOverride) {
        company.communications.forEach((comm) => {
          const color = getHighlightColor(comm.date);
          if (color === "red") overdueCount++;
          if (color === "yellow") todayCount++;
        });
      }
    });

    return { overdueCount, todayCount };
  };

  const { overdueCount, todayCount } = getOverdueAndTodayCount();

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      {/* Notification Section */}
      <div className="notification-section">
        <button className="notification-button">
          <FaBell size={30} />
          <span className="notification-count">
            {overdueCount + todayCount}
          </span>
        </button>
        <div className="notification-details">
          <h3>Overdue Communications</h3>
          <ul>
            {companies.map((company) =>
              company.communications
                .filter((comm) =>
                  getHighlightColor(comm.date, company.highlightOverride) ===
                  "red"
                )
                .map((comm, idx) => (
                  <li key={idx}>{`${company.name} - ${
                    comm.type
                  } on ${formatDate(comm.date)}`}</li>
                ))
            )}
          </ul>
          <h3>Today's Communications</h3>
          <ul>
            {companies.map((company) =>
              company.communications
                .filter((comm) =>
                  getHighlightColor(comm.date, company.highlightOverride) ===
                  "yellow"
                )
                .map((comm, idx) => (
                  <li key={idx}>{`${company.name} - ${
                    comm.type
                  } on ${formatDate(comm.date)}`}</li>
                ))
            )}
          </ul>
        </div>
      </div>
      {/* New communication form */}
      <div className="communication-form">
        <h3>Add New Communication</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCommunication();
          }}
        >
          <label>
            Company Name:
            <select
              name="companyName"
              value={newCommunication.companyName}
              onChange={handleInputChange}
            >
              <option value="">Select Company</option>
              {companies.map((company, idx) => (
                <option key={idx} value={company.name}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Communication Type:
            <select
              name="type"
              value={newCommunication.type}
              onChange={handleInputChange}
            >
              <option value="">Select Communication Type</option>
              <option value="Email">Email</option>
              <option value="LinkedIn Post">LinkedIn Post</option>
              <option value="Phone Call">Phone Call</option>
              <option value="Meeting">Meeting</option>
            </select>
          </label>
          <br />
          <label>
            Communication Date:
            <input
              type="date"
              name="date"
              value={newCommunication.date}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Notes/Comments:
            <textarea
              name="notes"
              value={newCommunication.notes}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Add Communication</button>
        </form>
      </div>
      {/* Company Dashboard Table */}
      <CalendarView companies={companies} />

      <table className="company-dashboard">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Last Communications</th>
            <th>Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, idx) => (
            <tr key={idx}>
              <td>{company.name}</td>
              <td>
                <ul>
                  {company.communications.map((comm, commIdx) => (
                    <li
                      key={commIdx}
                      title={comm.notes}
                      className="communication-item"
                      data-date={comm.date}
                    >
                      {comm.type} - {formatDate(comm.date)}
                      <button
                        onClick={() =>
                          deleteCommunication(company.name, commIdx)
                        }
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <div
                  className={`next-communication ${getHighlightColor(
                    company.nextScheduledCommunication?.date,
                    company.highlightOverride
                  )}`}
                >
                  {company.nextScheduledCommunication
                    ? `${
                        company.nextScheduledCommunication.type
                      } - ${formatDate(
                        company.nextScheduledCommunication.date
                      )}`
                    : "No upcoming communication"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserPage;



