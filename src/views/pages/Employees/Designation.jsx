import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import AddDesingnationModelPopup from "../../../components/modelpopup/AddDesingnationModelPopup";
import SearchBox from "../../../components/SearchBox";

const Designation = () => {
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for deletion
  const getJobData = async () => {
    try {
      const response = await axios.get(
        "https://hr.tanaghomtech.com/portal/public/api/job"
      );
      setUser(response.data.data);
      console.log(response.data.data);
      console.log(user);
      
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };
 
  useEffect(() => {
    getJobData();
  }, [onclick]);
  const userElements = user?.map((user, index) => ({
    key: index,
    id: user.id,
    Job: user?.name,
    
  }));
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      sorter: (a, b) => a.id.length - b.id.length,
      width: "10%",
    },
    {
      title: "Job name",
      dataIndex: "Job",
      sorter: (a, b) => a.Job.length - b.Job.length,
      width: "40%",
    },
    {
      title: "Action",
      className: "text-end",
      render: (record) => (
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
              data-bs-target="#edit_designation"
              onClick={() => setSelectedUser(record)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete"
              onClick={() => setSelectedUser(record)}
            >
              <i className="fa fa-trash m-r-5" /> Delete
            </Link>
          </div>
        </div>
      ),
      sorter: (a, b) => a.length - b.length,
      width: "10%",
    },
  ];
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Jobs"
            title="Dashboard"
            subtitle="Jobs"
            modal="#add_designation"
            name="Add  Job"
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <SearchBox />
                <Table
                  columns={columns}
                  dataSource={userElements?.length > 0 ? userElements : []}
                  className="table-striped"
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddDesingnationModelPopup selectedUser={selectedUser} getJobData={getJobData}/>
      <DeleteModal dep='job' Name="Delete Job" users={selectedUser} getDepartmentData={getJobData} />
    </div>
  );
};

export default Designation;
