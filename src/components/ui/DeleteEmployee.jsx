import axios from "axios";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Make sure this is included

const DeleteEmployee = ({Name,selectedUser,getDepartmentData,getEmployeeData, dep }) => {
   console.log( "Name", selectedUser );
const[isdelete,setIsdelete]=useState(false)
  const handledelete = async (id) => {
    console.log("id",id);
    try {
      const response = await axios.delete(
        `https://hr.tanaghomtech.com/portal/public/api/${dep}/${id}`
      );
      console.log("Deleted ID:", response);
      toast.success("Employee deleted successfully");

     setIsdelete(true)

      await getDepartmentData();
    } catch (error) {
      console.log("Error:", error);
      
    }
    getEmployeeData()
  };

  return (
    <>
      {/* Delete Performance Indicator Modal */}
      <div
        className="modal custom-modal fade"
        id="delete"
        role="dialog"
       
      >
        <div className="modal-dialog modal-dialog-centered">
          <Toaster position="top-right" reverseOrder={false} />
         {
          isdelete === false && 
          <div className="modal-content">
          <div className="modal-body">
            <div className="form-header">
              <h3>{Name}</h3>
              <p>Are you sure you want to delete?</p>
            </div>
            <div className="modal-btn delete-action">
              <div className="row">
                <button
                  onClick={() => handledelete(selectedUser)}
                  className="col-6 btn btn-primary continue-btn"
                     data-bs-dismiss="modal"
                >
                  Delete
                </button>

                <div className="col-6">
                  <Link
                    to="#"
                    data-bs-dismiss="modal"
                    className="btn btn-primary cancel-btn"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
         }
        </div>
      </div>
      {/* /Delete Performance Indicator Modal */}
    </>
  );
};

export default DeleteEmployee;
