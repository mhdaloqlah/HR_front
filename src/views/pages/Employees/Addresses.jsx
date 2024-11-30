import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import axios from "axios";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import SearchBox from "../../../components/SearchBox";
import DepartmentModal from "../../../components/modelpopup/DepartmentModal";
import AddressesModal from "../../../components/modelpopup/AddressesModal";

const Addresses = () => {
  const [users, setUsers] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for deletion

  const getDepartmentData = async () => {
    try {
      const response = await axios.get(
        "https://hr.tanaghomtech.com/portal/public/api/address"
      );
      setUsers(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  useEffect(() => {
    getDepartmentData();
  }, []);

  const userElements = users?.map((user, index) => ({
    key: index,
    id: user.id,
    department: user.address_name,
  }));

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      width: "10%",
    },
    {
      title: "Address Name",
      dataIndex: "department",
      sorter: (a, b) => a.department.localeCompare(b.department),
      width: "80%",
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
              data-bs-target="#edit_department"
              onClick={() => setSelectedUser(record)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete"
              onClick={() => setSelectedUser(record)} // Set the selected user for deletion
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
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Accommodation"
            title="Dashboard"
            subtitle="Accommodation"
            modal="#add_department"
            name="Add Accommodation"
          />
          {/* /Page Header */}
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

      {/* Pass the selected user to DeleteModal */}
      <AddressesModal
        getDepartmentData={getDepartmentData}
        users={users}
        selectedUser={selectedUser}
        setUsers={setUsers}
      />
      <DeleteModal Name="Delete Address" dep='address' users={selectedUser} getDepartmentData={getDepartmentData}/>
    </>
  );
};

export default Addresses;
