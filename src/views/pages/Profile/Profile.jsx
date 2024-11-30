//* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ProfileTab from "./ProfileTab";

const Profile = () => {
  const { id } = useParams();
  const captureRef = useRef();
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [employeedata, setEmployeedata] = useState(null);

  const getEmployeeData = async () => {
    try {
      const response = await axios.get(`https://hr.tanaghomtech.com/portal/public/api/employee/${id}`);
      setEmployeedata(response.data.data);
    } catch (error) {
      console.error("Failed to fetch employee data", error);
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, [id]);

  useEffect(() => {
    if (employeedata?.image) {
      const img = new Image();
      img.src = `https://hr.tanaghomtech.com/portal/storage/app/public/${employeedata?.image}`;
      img.onload = () => {
        setImageLoaded(true);
        console.log("Image loaded successfully");
      };
      
      img.onerror = () => {
        console.log("Error loading image");
      };
    }
  }, [employeedata]);

  const handleCapture = async () => {
    try {
      const response = await axios.post(
        `https://hr.tanaghomtech.com/portal/public/api/generateCvWord?employee_id=${id}`,
        {},
        {
          responseType: 'blob',  // Ensure the response is handled as a file
        }
      );
  
      // Creating a URL for the file and triggering a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${employeedata.first_name} profile.docx`); // Set the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
    } catch (error) {
      console.error("Failed to fetch employee data", error);
    }
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div id="pdf-content">
            <div className="card mb-0">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile-view">
                      <div className="profile-img-wrap">
                        <div className="profile-img">
                          <Link to="#">
                            <img
                              src={`https://hr.tanaghomtech.com/portal/storage/app/public/${employeedata?.image}`}
                              alt="User Image"
                              onError={(e) => {
                                e.target.src = '/path_to_fallback_image.jpg';  // Fallback image
                              }}
                            />
                          </Link>
                        </div>
                      </div>
                      <button
                        onClick={handleCapture}
                        className="btn add-btn"
                        disabled={!imageLoaded || !employeedata}
                        style={{ width: "150px" ,zIndex: "100" }}
                      >
                        {imageLoaded ? "Export" : "Loading..."}
                      </button>
                      <div className="profile-basic">
                        <div className="row">
                          <div className="col-md-5">
                            <div style={{ marginTop: "20px" }} className="profile-info-left">
                              <h3 className="user-name m-t-0 mb-0">
                                {employeedata?.first_name} {employeedata?.father_name} {employeedata?.last_name}
                              </h3>
                              <h6 className="text-muted">{employeedata?.job_current.name}</h6>
                              <div className="small doj text-muted">
                                Date of Join : {employeedata?.hire_date}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-7">
                            <ul className="personal-info">
                              <li>
                                <div className="title">Company name:</div>
                                <div className="text">{employeedata?.company.companyName}</div>
                              </li>
                              <li>
                                <div className="title">Phone:</div>
                                <div className="text">
                                  <Link to={`tel:${employeedata?.phone}`}>{employeedata?.phone}</Link>
                                </div>
                              </li>
                              <li>
                                <div className="title">Email:</div>
                                <div className="text">
                                  <Link to={`mailto:${employeedata?.email}`}>{employeedata?.email}</Link>
                                </div>
                              </li>
                              <li>
                                <div className="title">Mobile:</div>
                                <div className="text">{employeedata?.mobile}</div>
                              </li>
                              <li>
                                <div className="title">Labor card date:</div>
                                <div className="text">{employeedata?.hire_date}</div>
                              </li>
                              <li>
                                <div className="title">Labor card expiry:</div>
                                <div className="text">{employeedata?.end_date}</div>
                              </li>
                              <li>
                                <div className="title">Accommodation name:</div>
                                <div className="text">{employeedata?.address_incompany_id?.address_name}</div>
                              </li>
                              <li>
                                <div className="title">Location:</div>
                                <div className="text">{employeedata?.company.location}</div>
                              </li>
                              <li>
                                <div className="title">Website:</div>
                                <div className="text">{employeedata?.company.website}</div>
                              </li>
                              <li>
                                <div className="title">Current Department:</div>
                                <div className="text">{employeedata?.department_current.name}</div>
                              </li>
                              <li>
                                <div className="title">Hire Department:</div>
                                <div className="text">{employeedata?.department_hire.name}</div>
                              </li>
                              <li>
                                <div className="title">Nationality:</div>
                                <div className="text">{employeedata?.nationality}</div>
                              </li>
                              <li>
                                <div className="title">Name in Biometric Machine:</div>
                                <div className="text">{employeedata?.finger}</div>
                              </li>
                              <li>
                                <div className="title">Biometric location:</div>
                                <div className="text">{employeedata?.bio_attend_location}</div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProfileTab employeedata={employeedata} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
