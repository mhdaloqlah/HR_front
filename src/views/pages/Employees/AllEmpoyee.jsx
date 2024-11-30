import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AllEmployeeAddPopup from "../../../components/modelpopup/AllEmployeeAddPopup";
import Breadcrumbs from "../../../components/Breadcrumbs";
import axios from "axios";
import DeleteEmployee from "../../../../src/components/ui/DeleteEmployee.jsx";
import countryList from 'country-list';
import ReactSlider from "react-slider";
import "../../../../src/assets/css/main.css";
import { Checkbox } from 'antd';

const AllEmployee = () => {
  const countries = countryList.getNames();
  const [employeedata, setEmployeedata] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUseru, setSelectedUseru] = useState(null);
  const [selectedUser2, setSelectedUser2] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobcurrent, setJobcurrent] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 30000]);
  const [ok, setOk] = useState(false)
  const [activeModal, setActiveModal] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const editorigenal = (employeedata) => {
    console.log("editorigenal", employeedata);
    setActiveModal(null)
    setSelectedUser(employeedata)
  }
  const edit = (employedataa) => {
    console.log("employedataaaaaaaaaaaaaaaaa", employedataa);
    setActiveModal("employedata")
    setSelectedUseru(employedataa);

  }
  const disregard = async (id) => {
    console.log(id);
    try {
      const response = await axios.post(
        "https://hr.tanaghomtech.com/portal/public/api/employee/updateStatus",
        { id }
      );
      setSelectedUser2(true)
      console.log("response", response.data.data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  }
  const handleSalaryChange = (values) => {
    setSalaryRange(values);
  };
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
    console.log("jobs", jobs);
  }, [])
  
  // Fetch data based on filters
  const fetchEmployeeData = async () => {
    setSelectedUser2(false)
    setOk(true)
    try {
      // Construct query string
      let query = "https://hr.tanaghomtech.com/portal/public/api/employee?";

      if (salaryRange[0] !== undefined && salaryRange[1] !== undefined) {
        query += `filter[total_salary_between]=${salaryRange[0]},${salaryRange[1]}&`;
      }
      if (nationality) {
        query += `filter[nationality]=${nationality}&`;
      }

      if (jobcurrent) {
        query += `filter[job_current]=${jobcurrent}`;
      }

      // Send request with query string
      const response = await axios.get(query);
      const filteredItems = response.data.data.filter(item => item.status === 1);
      setEmployees(filteredItems);
      setSelectedUser2(true)
      console.log("Filtered Employees:", filteredItems);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };
  // Handle filter inputs (Salary range, Nationality, Job)
  const handleNationalityChange = (e) => {
    setNationality(e.target.value);
    console.log(nationality);
  };
  const handleJobChange = (e) => {
    setJobcurrent(e.target.value);
    console.log(jobcurrent)
  };

  const getEmployeeData = async () => {
    try {
      const response = await axios.get(
        "https://hr.tanaghomtech.com/portal/public/api/employee"
      );
      const filteredItems = response.data.data.filter(item => item.status === 1);
      setEmployeedata(filteredItems);
      console.log("data", response.data.data.map(i => i.status));
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, [selectedUser2]);
  // Handle checkbox toggle
  const handleSelectEmployee = (id) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((empId) => empId !== id) // Deselect if already selected
        : [...prevSelected, id] // Add to selected if not already present
    );
  };

  const sendSelectedEmployeesToApi = () => {
    fetch('https://hr.tanaghomtech.com/portal/public/api/generateMultiCvWord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: selectedEmployees }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();  // Get the response as a blob
      })
      .then((blob) => {
        // Create a download link for the ZIP blob
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'EmployeeProfiles.zip'); // Set file name with .zip extension
        document.body.appendChild(link);
        link.click();
        link.remove(); // Clean up after download
        setSelectedEmployees([]); // Optionally reset selected employees after sending
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const sendSelectedallEmployeesToApi = () => {
    fetch('https://hr.tanaghomtech.com/portal/public/api/generateAlliCvWord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
     
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();  // Get the response as a blob
      })
      .then((blob) => {
        // Create a download link for the ZIP blob
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'EmployeeProfiles.zip'); // Set file name with .zip extension
        document.body.appendChild(link);
        link.click();
        link.remove(); // Clean up after download
        setSelectedEmployees([]); // Optionally reset selected employees after sending
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
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
          <div>
            <div className="row filter-row">
              {/* Salary Range Filter */}
              <div className="col-sm-6 col-md-3" style={{ marginTop: "30px" }}>
                <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="slider-thumb"
                  trackClassName="slider-track"
                  min={0}
                  max={30000}
                  step={1000}
                  value={salaryRange}
                  onChange={handleSalaryChange}
                  minDistance={1000}
                  withTracks={true}
                  pearling
                />
                <div className="range-values" style={{ marginTop: "20px" }}>
                  <span>Min: {salaryRange[0]}</span>
                  <span style={{ marginLeft: "160px" }}>Max: {salaryRange[1]}</span>
                </div>
              </div>
              {/* Nationality Filter */}
              <div className="col-sm-6 col-md-3">
                <label>Nationality:</label>
                <select id="country" className={`form-control`} onChange={handleNationalityChange} >
                  <option className="form-control" onChange={() => setOk(true)} value="">All Nationality</option>
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
                <select
                  className={`form-control`}
                  onChange={handleJobChange}
                >
                  <option className="form-control" onChange={() => setOk(true)} value="">All jobs</option>
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
                <button onClick={fetchEmployeeData} style={{ marginTop: "20px" }}
                  className="btn btn-success btn-block w-100">
                  Search
                </button>
              </div>
              <div className="col-sm-6 col-md-3" style={{marginTop:"20px"}}>
                <button  style={{color:"#fff",backgroundColor:"#fb9537", border:"none"}} onClick={sendSelectedEmployeesToApi}  className="btn btn-success btn-block w-100" disabled={selectedEmployees.length === 0}>
                  Export selected CVs to word
                </button></div>
                <div className="col-sm-6 col-md-3" style={{marginTop:"20px"}}>
                <button style={{color:"#fff",backgroundColor:"#fb9537"}}  onClick={sendSelectedallEmployeesToApi}  className="btn btn-block w-100" >
                  Export All CVs to word
                </button></div>
            </div>

            {/* Display Filtered Employees */}

          </div>
          <div className="row" style={{ marginTop: "50px" }}>

            {employees.length == 0 && ok == true ? (

              <h3>no data</h3>
            ) : ok ? (
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
                        <Link
                          className="dropdown-item"

                          onClick={() => disregard(employee.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-x" viewBox="0 0 16 16">
                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708" />
                          </svg> disregard
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

              <div className="row">
                {employeedata.map((employee) => (
                  <div key={employee.id} className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                 
                    <div className="profile-widget">
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          id={`checkbox-${employee.id}`}
                          className="custom-checkbox"
                          checked={selectedEmployees.includes(employee.id)}
                          onChange={() => handleSelectEmployee(employee.id)}
                        />
                       
                      </div>
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
                          style={{margin:"10px"}}
                        >
                          <i className="material-icons">more_vert</i>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right" style={{ zIndex: "99" }}>
                          <Link
                            className="dropdown-item"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_employee"
                            onClick={() => editorigenal(employee.id)}
                          >
                            <i className="fa fa-pencil m-r-5" /> Edit Personal information
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_employee"
                            onClick={() => edit(employee.id)}
                          >
                            <i className="fa fa-pencil m-r-5" /> Edit Job & Department
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
                          <Link className="dropdown-item" onClick={() => disregard(employee.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-x" viewBox="0 0 16 16">
                              <path d="..." />
                            </svg> Deactivate
                          </Link>
                          <Link className="dropdown-item" to={`/empattendance/${employee.id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                              <path d="..." />
                            </svg> Attendance
                          </Link>
                        </div>
                      </div>
                     
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                        {employee.first_name} {employee.last_name}
                      </h4>
                      <div className="small text-muted">{employee.job_current.name}</div>
                     
                    </div>
                  </div>
                ))}
               
              </div>
            )}

          </div>
          
        </div>
      </div>
      <AllEmployeeAddPopup
        selectedUseru={selectedUseru}
        activeModal={activeModal}
        selectedUser={selectedUser}
        employedata={employeedata}
        getEmployeeData={getEmployeeData}
        setSelectedUser={setSelectedUser}
      />

      <DeleteEmployee Name="delete employee" dep="employee" selectedUser={selectedUser}
        employedata={employeedata}
        getEmployeeData={getEmployeeData} />
    </div>
  );
};

export default AllEmployee;
