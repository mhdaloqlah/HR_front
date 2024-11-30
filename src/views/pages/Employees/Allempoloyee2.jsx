import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AllEmployeeAddPopup from "../../../components/modelpopup/AllEmployeeAddPopup";
import Breadcrumbs from "../../../components/Breadcrumbs";
import axios from "axios";
import { Table } from "antd";
import DeleteEmployee from "../../../../src/components/ui/DeleteEmployee.jsx";
import SearchBox from "../../../components/SearchBox.jsx";
import DeleteModal from "../../../components/modelpopup/DeleteModal.jsx";
import countryList from 'country-list';
import ReactSlider from "react-slider";
import "../../../../src/assets/css/main.css";

const AllEmployee = () => {
  const countries = countryList.getNames();
  const location = useLocation();
  const [isdelete, setIsdelete] = useState();
  const [employeedata, setEmployeedata] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [nationality, setNationality] = useState("");
  const [jobs, setJobs] = useState([]);
  const [jobcurrent, setJobcurrent] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 10000]);
  const [ok, setOk] = useState(true);

  const handleSalaryChange = (values) => {
    setOk(true);
    setSalaryRange(values);
  };

  const geJobData = async () => {
    try {
      const response = await axios.get("https://hr.tanaghomtech.com/portal/public/api/job");
      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  // Fetch all employees initially
  const getEmployeeData = async () => {
    try {
      const response = await axios.get("https://hr.tanaghomtech.com/portal/public/api/employee");
      setEmployeedata(response.data.data);
      setEmployees(response.data.data);  // Set both states initially
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  // Fetch filtered data based on filters
  const fetchEmployeeData = async () => {
    try {
      let query = "https://hr.tanaghomtech.com/portal/public/api/employee?";

      if (salaryRange[0] !== undefined && salaryRange[1] !== undefined) {
        query += `filter[total_salary_between]=${salaryRange[0]},${salaryRange[1]}&`;
      }
      if (nationality) {
        query += `filter[nationality]=${nationality}&`;
      }
      if (jobcurrent) {
        query += `filter[job_current]=${jobcurrent}&`;
      }

      const response = await axios.get(query);
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleNationalityChange = (e) => {
    setOk(true);
    setNationality(e.target.value);
  };

  const handleJobChange = (e) => {
    setJobcurrent(e.target.value);
  };

  useEffect(() => {
    geJobData();
    getEmployeeData();
  }, []);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Employee"
            title="Dashboard"
            subtitle="Employee"
            modal="#add_employee"
            name="Add Employee"
            Linkname="/employees"
            Linkname1="/employees-list"
          />

          <div className="row filter-row">
            {/* Salary Range Filter */}
            <div className="col-sm-6 col-md-3" style={{ marginTop: "30px" }}>
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                min={0}
                max={10000}
                step={500}
                value={salaryRange}
                onChange={handleSalaryChange}
                minDistance={1000}
                pearling
              />
              <div className="range-values" style={{ marginTop: "20px" }}>
                <span>Min: {salaryRange[0]}</span>
                <span>Max: {salaryRange[1]}</span>
              </div>
            </div>

            {/* Nationality Filter */}
            <div className="col-sm-6 col-md-3">
              <label>Nationality:</label>
              <select id="country" className="form-control" onChange={handleNationalityChange}>
                <option>All Nationalities</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Filter */}
            <div className="col-sm-6 col-md-3">
              <label>Job:</label>
              <select className="form-control" onChange={handleJobChange}>
                <option>All Jobs</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="col-sm-6 col-md-3">
              <button onClick={fetchEmployeeData} style={{ marginTop: "20px" }} className="btn btn-success btn-block w-100">
                Search
              </button>
            </div>
          </div>

          {/* Display Employees */}
          <div className="row" style={{ marginTop: "50px" }}>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <Link
                  className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                  to={`/profile/${employee.id}`}
                  key={employee.id}
                >
                  <div className="profile-widget">
                    <div className="profile-img">
                      <Link to={`/profile/${employee.id}`} className="avatar">
                        <img
                          src={`https://hr.tanaghomtech.com/portal/storage/app/public/${employee.image}`}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="dropdown profile-action">
                      <Link
                        to="#"
                        className="action-icon dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="material-icons">more_vert</i>
                      </Link>
                      <div className="dropdown-menu dropdown-menu-right">
                        <Link
                          className="dropdown-item"
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_employee"
                          onClick={() => setSelectedUser(employee.id)}
                        >
                          <i className="fa fa-pencil m-r-5" /> Edit
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#delete"
                          onClick={() => setSelectedUser(employee.id)}
                        >
                          <i className="fa-regular fa-trash-can m-r-5" /> Delete
                        </Link>
                      </div>
                    </div>
                    <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                      {employee.first_name} {employee.last_name}
                    </h4>
                    <div className="small text-muted">{employee.job_current.name}</div>
                  </div>
                </Link>
              ))
            ) : (
              <h1>No Employees Found</h1>
            )}
          </div>
        </div>
      </div>
      <AllEmployeeAddPopup selectedUser={selectedUser} employedata={employeedata} getEmployeeData={getEmployeeData} />
      <DeleteEmployee Name="delete employee" dep="employee" selectedUser={selectedUser} employedata={employeedata} getEmployeeData={getEmployeeData} />
    </div>
  );
};

export default AllEmployee;
v