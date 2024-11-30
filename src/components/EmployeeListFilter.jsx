import axios from "axios";
import React, { useEffect, useState } from "react";

const EmployeeListFilter = () => {
  const [employees, setEmployees] = useState([]);
  const [nationality, setNationality] = useState("");
  const [jobs, setJobs] = useState([]);
  const [jobcurrent, setJobcurrent] = useState("");
  const [salaryRange, setSalaryRange] = useState({ min: "", max: "" });
  const geJobData = async () => {
    try {
      const response = await axios.get(
        "https://hr.tanaghomtech.com/portal/public/api/job"
      );
      setJobs(response.data.data);
      console.log("response", response.data.data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };
  useEffect(() => {
    geJobData()
    console.log("jobs",jobs);
    
  }, [])
  // Fetch data based on filters
  const fetchEmployeeData = async () => {
    try {
      // Construct query string
      let query = "https://hr.tanaghomtech.com/portal/public/api/employee?";

      if (salaryRange.min && salaryRange.max) {
        query += `filter[total_salary_between]=${salaryRange.min},${salaryRange.max}&`;
      }

      if (nationality) {
        query += `filter[nationality]=${nationality}&`;
      }

      if (jobcurrent) {
        query += `filter[job_current]=${jobcurrent}`;
      }

      // Send request with query string
      const response = await axios.get(query);
      setEmployees(response.data.data);
      console.log("Filtered Employees:", response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  // Handle filter inputs (Salary range, Nationality, Job)
  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    setSalaryRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleNationalityChange = (e) => {
    setNationality(e.target.value);
  };

  const handleJobChange = (e) => {
    setJobcurrent(e.target.value);
    console.log(jobcurrent)
  };

  return (
    <div>
      <div className="row filter-row">
        {/* Salary Range Filter */}
        <div className="col-sm-6 col-md-3">
          <label>Salary Min:</label>
          <input
            type="number"
            name="min"
            value={salaryRange.min}
            onChange={handleSalaryChange}
            className="form-control"
            placeholder="Min Salary"
          />
        </div>


        {/* Nationality Filter */}
        <div className="col-sm-6 col-md-3">
          <label>Nationality:</label>
          <input
            type="text"
            value={nationality}
            onChange={handleNationalityChange}
            className="form-control"
            placeholder="Nationality"
          />
        </div>

        {/* Job Filter */}
      
        <div className="col-sm-6 col-md-3">
          <label>Job:</label>
          <select
            className={`form-control`}
           onChange={handleJobChange}
          >
            {jobs?.map((job) => (
              <option
                className="form-control"
                value={job.id}
                key={job.id}
              >
                {job.name}
              </option>
            ))}
          </select>

        </div>

        {/* Search Button */}
        <div className="col-sm-6 col-md-3">
          <button onClick={fetchEmployeeData} className="btn btn-success btn-block">
            Search
          </button>
        </div>
      </div>

      {/* Display Filtered Employees */}
      <h2>Filtered Employees</h2>
      <ul>
        {employees.length > 0 ? (
          employees.map((employee) => (
            <li key={employee.id}>
              {employee.name} - {employee.nationality} - ${employee.total_salary}
            </li>
          ))
        ) : (
          <li>No employees found</li>
        )}
      </ul>
    </div>
  );
};

export default EmployeeListFilter;
