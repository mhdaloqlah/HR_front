import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const DeleteModal = ({Name , users,getDepartmentData,dep}) => {
  console.log(users?.id);
  
  const handledelete =async (id) => {
   await axios
      .delete(`https://hr.tanaghomtech.com/portal/public/api/${dep}/${id}`)
      .then((response) => {
        console.log("Deleted ID:", response);
        console.log("Deleted ID:", response.data.message);
        toast(response.data.message)
      })
      .catch((error) => {
        console.log("Error:", error);
        toast.error(error.message)
      });
    console.log(id);
    await getDepartmentData()
  };
 
  return (
    <>
      {/* Delete Performance Indicator Modal */}
      <div className="modal custom-modal fade" id="delete" role="dialog">
      <Toaster
  position="top-left"
  reverseOrder={false}
/>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>{Name}</h3>
                <p>Are you sure you want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                    <button
                     data-bs-dismiss="modal"
                      onClick={() => handledelete(users?.id)}
                      className="col-6 btn btn-primary continue-btn" 
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
        </div>
      </div>
      {/* /Delete Performance Indicator Modal */}
    </>
  );
};

export default DeleteModal;
