
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from "recharts";
import { saveAs } from "file-saver"; // For CSV download
import jsPDF from "jspdf"; // For PDF export
import "../styles/ReportChart.css";


const ReportChart = () => {
  const [communicationsData, setCommunicationsData] = useState([]);
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [response, setResponse] = useState("");
  const [communicationFrequency, setCommunicationFrequency] = useState([]);
  const [engagementEffectiveness, setEngagementEffectiveness] = useState([]);
  const [overdueTrends, setOverdueTrends] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    // Calculate communication frequency
    const frequencyData = communicationsData.reduce((acc, comm) => {
      const type = comm.type;
      if (acc[type]) {
        acc[type]++;
      } else {
        acc[type] = 1;
      }
      return acc;
    }, {});
    setCommunicationFrequency(Object.entries(frequencyData).map(([name, value]) => ({ name, value })));

    // Calculate engagement effectiveness
    const effectivenessData = communicationsData.reduce((acc, comm) => {
      if (comm.response === "Success") {
        acc[comm.type] = acc[comm.type] ? acc[comm.type] + 1 : 1;
      }
      return acc;
    }, {});
    setEngagementEffectiveness(Object.entries(effectivenessData).map(([name, value]) => ({ name, value })));

    // Generate overdue trends (mock data based on date comparison)
    const overdueData = communicationsData.filter(comm => new Date(comm.date) < new Date());
    setOverdueTrends(overdueData.map(comm => ({ date: comm.date, count: 1 })));

    // Generate real-time activity log
    setActivityLog(communicationsData);
  }, [communicationsData]);

  const handleAddCommunication = () => {
    if (company && type && date && response) {
      const newCommunication = { company, type, date, response };
      setCommunicationsData(prevData => [...prevData, newCommunication]);
      setCompany("");
      setType("");
      setDate("");
      setResponse("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDownloadCSV = () => {
    const csvData = communicationsData.map(comm => ({
      Company: comm.company,
      Type: comm.type,
      Date: comm.date,
      Response: comm.response,
    }));

    const csvContent = [
      ["Company", "Type", "Date", "Response"],
      ...csvData.map(item => [item.Company, item.Type, item.Date, item.Response]),
    ]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "communication_report.csv");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Communication Report", 20, 20);
    doc.autoTable({
      head: [["Company", "Type", "Date", "Response"]],
      body: communicationsData.map(item => [item.company, item.type, item.date, item.response]),
    });
    doc.save("communication_report.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reporting and Analytics Module</h1>

      {/* Input Form for Adding Communication Data */}
      <h3>Add Communication</h3>
      <div>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Communication Type"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select value={response} onChange={(e) => setResponse(e.target.value)}>
          <option value="">Response</option>
          <option value="Success">Success</option>
          <option value="Failure">Failure</option>
        </select>
        <button onClick={handleAddCommunication}>Add Communication</button>
      </div>

      {/* Communication Frequency Report */}
      <h3>Communication Frequency Report</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={communicationFrequency}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        />
        <Tooltip />
      </PieChart>

      {/* Engagement Effectiveness Dashboard */}
      <h3>Engagement Effectiveness</h3>
      <BarChart width={400} height={300} data={engagementEffectiveness}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>

      {/* Overdue Communication Trends */}
      <h3>Overdue Communication Trends</h3>
      <LineChart width={400} height={300} data={overdueTrends}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>

      {/* Downloadable Reports */}
      <h3>Download Reports</h3>
      <button onClick={handleDownloadCSV}>Download as CSV</button>
      <button onClick={handleDownloadPDF}>Download as PDF</button>

      {/* Real-Time Activity Log */}
      <h3>Real-Time Activity Log</h3>
      <ul>
        {activityLog.map((comm, idx) => (
          <li key={idx}>{`${comm.company} - ${comm.type} on ${comm.date} (${comm.response})`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReportChart;
