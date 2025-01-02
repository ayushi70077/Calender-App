import React from "react";

const Dashboard = () => {
  const data = [
    { company: "Company A", lastComm: "Email - 5th Dec", nextComm: "Phone - 12th Dec" },
    { company: "Company B", lastComm: "LinkedIn - 6th Dec", nextComm: "Email - 15th Dec" },
  ];

  return (
    <div>
      <h2>Communication Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Last Communication</th>
            <th>Next Scheduled</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.company}</td>
              <td>{row.lastComm}</td>
              <td>{row.nextComm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
