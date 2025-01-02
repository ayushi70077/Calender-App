import React, { useState } from "react";

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);

  const addCompany = (company) => {
    setCompanies([...companies, company]);
  };

  return (
    <div>
      <h2>Manage Companies</h2>
      <button onClick={() => addCompany({ name: "New Company", location: "Location" })}>
        Add Company
      </button>
      <ul>
        {companies.map((company, index) => (
          <li key={index}>{company.name} - {company.location}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyManagement;
