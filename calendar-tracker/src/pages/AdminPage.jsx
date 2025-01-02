
import React, { useState } from "react";
import "../styles/AdminPage.css";

function AdminPage() {
  // State for managing companies
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    linkedInProfile: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    communicationPeriodicity: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // State for managing communication methods
  const [methods, setMethods] = useState([
    { name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
    { name: "LinkedIn Message", description: "Send a LinkedIn message", sequence: 2, mandatory: true },
    { name: "Email", description: "Send an email", sequence: 3, mandatory: true },
    { name: "Phone Call", description: "Call the contact", sequence: 4, mandatory: true },
    { name: "Other", description: "Any other method", sequence: 5, mandatory: false },
  ]);
  const [methodFormData, setMethodFormData] = useState({
    name: "",
    description: "",
    sequence: "",
    mandatory: false,
  });
  const [editingMethodIndex, setEditingMethodIndex] = useState(null);

  // Handle input changes for company form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle input changes for communication method form
  const handleMethodInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMethodFormData({
      ...methodFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit handler for adding/editing companies
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedCompanies = [...companies];
      updatedCompanies[editingIndex] = formData;
      setCompanies(updatedCompanies);
      setEditingIndex(null);
    } else {
      setCompanies([...companies, formData]);
    }
    setFormData({
      name: "",
      location: "",
      linkedInProfile: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      communicationPeriodicity: "",
    });
  };

  // Submit handler for adding/editing communication methods
  const handleMethodFormSubmit = (e) => {
    e.preventDefault();
    if (editingMethodIndex !== null) {
      const updatedMethods = [...methods];
      updatedMethods[editingMethodIndex] = methodFormData;
      setMethods(updatedMethods);
      setEditingMethodIndex(null);
    } else {
      setMethods([...methods, methodFormData]);
    }
    setMethodFormData({
      name: "",
      description: "",
      sequence: "",
      mandatory: false,
    });
  };

  // Edit and delete handlers for companies
  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(companies[index]);
  };

  const handleDelete = (index) => {
    const updatedCompanies = companies.filter((_, i) => i !== index);
    setCompanies(updatedCompanies);
  };

  // Edit and delete handlers for communication methods
  const handleMethodEdit = (index) => {
    setEditingMethodIndex(index);
    setMethodFormData(methods[index]);
  };

  const handleMethodDelete = (index) => {
    const updatedMethods = methods.filter((_, i) => i !== index);
    setMethods(updatedMethods);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {/* Company Management Section */}
      <h2>Manage Companies</h2>
      <form onSubmit={handleFormSubmit} style={{ marginBottom: "20px" }}>
        <input type="text" name="name" placeholder="Company Name" value={formData.name} onChange={handleInputChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} required />
        <input type="url" name="linkedInProfile" placeholder="LinkedIn Profile URL" value={formData.linkedInProfile} onChange={handleInputChange} />
        <input type="text" name="emails" placeholder="Emails (comma-separated)" value={formData.emails} onChange={handleInputChange} />
        <input type="text" name="phoneNumbers" placeholder="Phone Numbers (comma-separated)" value={formData.phoneNumbers} onChange={handleInputChange} />
        <textarea name="comments" placeholder="Comments" value={formData.comments} onChange={handleInputChange} />
        <input type="text" name="communicationPeriodicity" placeholder="Communication Periodicity" value={formData.communicationPeriodicity} onChange={handleInputChange} required />
        <button type="submit">{editingIndex !== null ? "Update Company" : "Add Company"}</button>
      </form>

      <table border="1" style={{ width: "100%", textAlign: "left", marginBottom: "40px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>LinkedIn Profile</th>
            <th>Emails</th>
            <th>Phone Numbers</th>
            <th>Comments</th>
            <th>Communication Periodicity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td>{company.name}</td>
              <td>{company.location}</td>
              <td><a href={company.linkedInProfile} target="_blank" rel="noopener noreferrer">{company.linkedInProfile}</a></td>
              <td>{company.emails}</td>
              <td>{company.phoneNumbers}</td>
              <td>{company.comments}</td>
              <td>{company.communicationPeriodicity}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Communication Method Management Section */}
      <h2>Manage Communication Methods</h2>
      <form onSubmit={handleMethodFormSubmit} style={{ marginBottom: "20px" }}>
        <input type="text" name="name" placeholder="Method Name" value={methodFormData.name} onChange={handleMethodInputChange} required />
        <input type="text" name="description" placeholder="Description" value={methodFormData.description} onChange={handleMethodInputChange} />
        <input type="number" name="sequence" placeholder="Sequence" value={methodFormData.sequence} onChange={handleMethodInputChange} required />
        <label>
          Mandatory:
          <input type="checkbox" name="mandatory" checked={methodFormData.mandatory} onChange={handleMethodInputChange} />
        </label>
        <button type="submit">{editingMethodIndex !== null ? "Update Method" : "Add Method"}</button>
      </form>

      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Sequence</th>
            <th>Mandatory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {methods.map((method, index) => (
            <tr key={index}>
              <td>{method.name}</td>
              <td>{method.description}</td>
              <td>{method.sequence}</td>
              <td>{method.mandatory ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => handleMethodEdit(index)}>Edit</button>
                <button onClick={() => handleMethodDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;


















