import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PersonalInformationModelPopup from "../../../components/modelpopup/PersonalInformationModelPopup";
import { ListItem, ProjectDetails } from "./ProfileContent";
import {Table}  from 'antd';
import axios from "axios";
import { useState } from "react";
const ProfileTab = ({ employeedata }) => {
  const [dataSource,setDataSource] = useState([])
  console.log("employeedata");
  const columns = [
    {
      title: 'Start date',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'End date',
      dataIndex: 'end_date',
      key: 'end_date',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (department) => department?.name || '', 
    },
    {
      title: 'Job',
      dataIndex: 'job',
      key: 'job',
      render: (job) => job?.name || '', 
    },
    {
      title: 'Basic salary',
      dataIndex: 'basic_salary',
      key: 'basic_salary',
    },
    {
      title: 'Total salary',
      dataIndex: 'total_salary',
      key: 'total_salary',
    },
    
  ];
  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://hr.tanaghomtech.com/portal/public/api/jobHistory/jobhistoryByEmployee/${employeedata.id}`
        );
        setDataSource(response.data.data);
        console.log("Employee job history:", employeedata.id);
      } catch (error) {
        console.error("Error fetching employee job history:", error.response?.data || error);
      
      }
    };
    fetchData();
  },[employeedata]);
   

  

  return (
    <>
      <div className="tab-content">
        <div
          id="emp_profile"
          className="pro-overview tab-pane fade show active"
        >
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    personal Informations{" "}
                    
                  </h3>
                  <ul className="personal-info" style={{marginTop:"50px"}}>
                         <li >
                              <div className="title">Gender:</div>
                              <div className="text" style={{marginLeft:"50px",color:"gray"}}>{employeedata?.gender}</div>
                              </li>
                              <li >
                              <div className="title">Birth date:</div>
                              <div className="text" style={{marginLeft:"50px",color:"gray"}}>{employeedata?.birth_date}</div>
                            </li>
                            <li >
                              <div className="title">Birth place:</div>
                              <div className="text" style={{marginLeft:"50px",color:"gray"}}>{employeedata?.birth_place}</div>
                            </li>
                           
                            <li >
                              <div className="title">Father name:</div>
                              <div className="text" style={{marginLeft:"50px",color:"gray"}}>{employeedata?.father_name}</div>
                            </li>
                            <li >
                              <div className="title">Mother name:</div>
                              <div className="text"  style={{marginLeft:"50px",color:"gray"}}>{employeedata?.mother_name}</div>
                            </li>
                            <li>
                              <div className="title">kids number:</div>
                              <div className="text"  style={{marginLeft:"50px",color:"gray"}}>{employeedata?.child_number}</div>
                            </li>

                         </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                  Additional details{" "}
                   
                  </h3>
                  <ul className="personal-info">
                    <li>
                      <div className="title">Salary:</div>
                      <div className="text">{employeedata?.salary}</div>
                    </li>
                    <li>
                      <div className="title"> Allowance:</div>
                      <div className="text">{employeedata?.allowances}</div>
                    </li>
                    <li>
                      <div className="title">Total salary:</div>
                      <div className="text">{employeedata?.total_salary}</div>
                    </li>

                  </ul>
                  <hr />

                  <ul className="personal-info">
                    <li>
                      <div className="title">Visa expiry:</div>
                      <div className="text">{employeedata?.visa_expiry}</div>
                    </li>
                    <li>
                      <div className="title">Visa validity:</div>
                      <div className="text">{employeedata?.visa_validity}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-12 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                   {" "}
                   Employment record
                  </h3>
                
                  <hr />
                  {/* <Table
              className="table-striped"
              style={{ overflowX: "auto", marginTop: "20px" }}
              columns={columns}
              dataSource={result}
              rowKey={(record) => record.id}
            />
               */}
                 <Table style={{margin:"0", overflowX:"scroll"}} dataSource={dataSource} columns={columns} />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Salary</h3>
                  <ul className="personal-info">
                    <li>
                      <div className="title">salary:</div>
                      <div className="text">{employeedata?.salary}</div>
                    </li>
                    <li>
                      <div className="title">salary food:</div>
                      <div className="text">{employeedata?.salary_food}</div>
                    </li>
                    <li>
                      <div className="title">salary jobtype:</div>
                      <div className="text">{employeedata?.salary_jobtype}</div>
                    </li>
                    <li>
                      <div className="title">salary_food:</div>
                      <div className="text">{employeedata?.salary_food}</div>
                    </li>
                    <li>
                      <div className="title">salary trasnportation:</div>
                      <div className="text">{employeedata?.salary_trasnportation}</div>
                    </li>
                    <li>
                      <div className="title">total salary:</div>
                      <div className="text">{employeedata?.total_salary}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Family Informations{" "}
                    <Link
                      to="#"
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#family_info_modal"
                    >
                      <i className="fa fa-pencil" />
                    </Link>
                  </h3>
                  <div className="table-responsive">
                    <table className="table table-nowrap">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Relationship</th>
                          <th>Date of Birth</th>
                          <th>Phone</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {familyInfoData.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.relationship}</td>
                            <td>{item.dob}</td>
                            <td>{item.phone}</td>
                            <td className="text-end">
                              <div className="dropdown dropdown-action">
                                <Link
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="action-icon dropdown-toggle"
                                  to="#"
                                >
                                  <i className="material-icons">more_vert</i>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link to="#" className="dropdown-item">
                                    <i className="fa fa-pencil m-r-5" /> Edit
                                  </Link>
                                  <Link to="#" className="dropdown-item">
                                    <i className="fa fa-trash m-r-5" /> Delete
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Education Informations{" "}
                    <Link
                      to="#"
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#education_info"
                    >
                      <i className="fa fa-pencil" />
                    </Link>
                  </h3>
                  <div className="experience-box">
                    <ul className="experience-list">
                      {educationData.map((item) => (
                        <li key={item.id}>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <Link to="/" className="name">
                                {item.name}
                              </Link>
                              <div>{item.description}</div>
                              <span className="time">{item.time}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Experience{" "}
                    <Link
                      to="#"
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#experience_info"
                    >
                      <i className="fa fa-pencil" />
                    </Link>
                  </h3>
                  <div className="experience-box">
                    <ul className="experience-list">
                      {experienceData.map((item) => (
                        <li key={item.id}>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <Link to="/" className="name">
                                {item.name}
                              </Link>
                              <span className="time">{item.time}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <ProjectDetails />
        {/* Bank Statutory Tab */}

        {/* Bank Statutory Tab */}
        {/*  Bank Tab */}
      </div>
      {/* Model Popup*/}
      <PersonalInformationModelPopup />
    </>
  );
};

export default ProfileTab;
