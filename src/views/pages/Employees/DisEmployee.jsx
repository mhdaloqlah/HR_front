import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AllEmployeeAddPopup from "../../../components/modelpopup/AllEmployeeAddPopup";
import Breadcrumbs from "../../../components/Breadcrumbs";
import EmployeeListFilter from "../../../components/EmployeeListFilter";
import axios from "axios";
import { Table } from "antd";
import DeleteEmployee from "../../../../src/components/ui/DeleteEmployee.jsx";
import SearchBox from "../../../components/SearchBox.jsx";
import DeleteModal from "../../../components/modelpopup/DeleteModal.jsx";
import countryList from 'country-list';
import ReactSlider from "react-slider";
import { BsPersonFillCheck } from "react-icons/bs";
import "../../../../src/assets/css/main.css";
const DisEmployee = () => {
  const countries = countryList.getNames();
  const location = useLocation();
  const [isdelete, setIsdelete] = useState()
  const [employeedata, setEmployeedata] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUser2, setSelectedUser2] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobcurrent, setJobcurrent] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 30000]);
  const[status,setStatus]=useState("");
const[ok,setOk]=useState(false)
const disregard =async(id) =>{
    
  try {
    const response = await axios.post(
      "https://hr.tanaghomtech.com/portal/public/api/employee/updateStatus",
      {id}
    );
    setStatus(response.data.data.status)
    setSelectedUser2(true)
    console.log("disregard", response.data.data.status);
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
    console.log("jobs",jobs);
  }, [])
  const allemployee =()=>{
    geJobData()
  }
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
      const filteredItems = response.data.data.filter(item => item.status === 0);
      setEmployees(filteredItems);
      setSelectedUser2(true)
      console.log("Filtered Employees:", response.data.data);
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
      const filteredItems = response.data.data.filter(item => item.status === 0);
      setEmployeedata(filteredItems);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };
  const deletee = (id) => {
    console.log(id)
    setIsdelete(true)
  }
  useEffect(() => { console.log("Current path:", location.pathname); }, [location.pathname])
  useEffect(() => {
    getEmployeeData();
  }, [selectedUser2]);
  console.log(selectedUser);
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Employee(not active)"
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
        <div className="col-sm-6 col-md-3"    style={{marginTop:"30px"}}>
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
      <div className="range-values" style={{marginTop:"20px"}}>
        <span>Min: {salaryRange[0]}</span>
        <span style={{marginLeft:"160px"}}>Max: {salaryRange[1]}</span>
      </div>
</div>
        {/* Nationality Filter */}
        <div className="col-sm-6 col-md-3">
          <label>Nationality:</label>  
      <select id="country" className={`form-control`} onChange={handleNationalityChange} >
        <option  className="form-control" onChange={()=>setOk(true)} value="">All Nationality</option>
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
               <option  className="form-control" onChange={()=>setOk(true)} value="">All jobs</option>
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
          <button onClick={fetchEmployeeData} style={{marginTop:"20px"}}
          className="btn btn-success btn-block w-100">
            Search
          </button>
        </div>
      </div>

      {/* Display Filtered Employees */}
    
    </div>
          <div className="row" style={{marginTop:"50px"}}>
        
{status  == false   && employees.length == 0 && ok == true  ? (
  
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
  employeedata.map((employee) => (
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
             
              onClick={()=>disregard(employee.id)}
            >
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
</svg>
            Activeted
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
)}


            
          </div>

        </div>
      </div>
      <AllEmployeeAddPopup
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

export default DisEmployee;
