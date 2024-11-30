import React, { useState, useEffect } from "react";
import DeleteEmployee from "../../../components/ui/DeleteEmployee";
import { Link } from "react-router-dom";
import { Table } from "antd";
import EmployeeListFilter from "../../../components/EmployeeListFilter";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AllEmployeeAddPopup from "../../../components/modelpopup/AllEmployeeAddPopup";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import SearchBox from "../../../components/SearchBox";
import axios from "axios";
import ReactSlider from "react-slider";
import countryList from 'country-list';
const EmployeeListdis = () => {
  const handleSalaryChange = (values) => {
    setSalaryRange(values);
  };
  const [jobs, setJobs] = useState([]);
  const [jobcurrent, setJobcurrent] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 30000]);
  const countries = countryList.getNames();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUser2, setSelectedUser2] = useState(false);
  const [data, setData] = useState();
  const [employees, setEmployees] = useState([]);
  const[ok,setOk]=useState(false)
  const [nationality, setNationality] = useState([]);
  const userElements = data?.map((user, index) => ({
    id: user.id,
    key: index,
    name: user.first_name + " " + user.last_name,
    job_current: user.job_current.name,
    mobile: user.mobile,
    email: user.company.email,
    joindate: user.job_current.created_at,
  }));

  const getEmployeeData = async () => {
    await axios
      .get("https://hr.tanaghomtech.com/portal/public/api/employee")
      .then((response) => {
        const filteredItems = response.data.data.filter(item => item.status === 1);
        setData(filteredItems);
     
      });
  };
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
  useEffect(() => {
    getEmployeeData();
  }, [selectedUser2]);

  const columns = [
    {
      title: "first name",
      dataIndex:"first_name",
   
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "last name",
      dataIndex:"last_name",
   
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Labor card date",
      dataIndex: "end_date",
      sorter: (a, b) => a.email.length - b.email.length,
    },
   
    {
      title: "Labor card expiry",
      dataIndex: "hire_date",
      sorter: (a, b) => a.joindate.length - b.joindate.length,
    }, {
      title: "Mobile",
      dataIndex: "mobile",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },
    {
      title: "Action",
      render: (record) => (
        <>
          <div className="dropdown dropdown-action text-end">
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
                onClick={() => {
                  console.log("Selected Employee ID:", record.id);  // Log only the employee ID
                  setSelectedUser(record.id);  // Set the ID for editing
                }}
              >
                <i className="fa fa-pencil m-r-5" /> Edit
              </Link>
              <Link
                className="dropdown-item"
               
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#delete"
                onClick={() => {
                  console.log("Selected Employee ID:", record.id);  // Log only the employee ID
                  setSelectedUser(record.id);  // Set the ID for deleting
                }}
              >
                <i className="fa fa-trash m-r-5" /> Delete
              </Link>
              <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete"
            
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-x" viewBox="0 0 16 16">
  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708"/>
</svg> disregard
            </Link>
            </div>
          </div>
        </>
      ),
    },
  ];
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
useEffect(()=>{
  geJobData()
},[jobs])
  return (
    <div>
      <div className="page-wrapper">
        {/* Page Content */}
       
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Employee"
            title="Dashboard"
            subtitle="Employee"
            modal="#add_employee"
            name="Add Employee"
            Linkname="/employees"
            Linkname1="/employees-list"
          />
          {/* /Page Header */}
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
      {employees.length == 0 && ok == true  ? (
  
  <h3>no data</h3>
) : ok ? (
    <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <SearchBox />
                  <Table
                    className="table-striped"
                    columns={columns}
                    dataSource={Array.isArray(employees) && employees.length > 0 ? employees : []}
                    rowKey={(record) => record.id}
                  />
                </div>
              </div>
            </div>
  
) : (
    <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <SearchBox />
                <Table
                  className="table-striped"
                  columns={columns}
                  dataSource={Array.isArray(data) && data.length > 0 ? data : []}
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
  
)}
          

          <AllEmployeeAddPopup
            selectedUser={selectedUser}
            employedata={data}
            getEmployeeData={getEmployeeData}
          />
          <DeleteEmployee
            Name="Delete Employee"
            selectedUser={selectedUser}  // Pass the selected user to DeleteModal
            getDepartmentData={getEmployeeData}
            dep="employee"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeListdis;
