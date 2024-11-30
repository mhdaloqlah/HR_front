import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Toastsuccess from "../ui/toastsucces";
import toast, { Toaster } from 'react-hot-toast';

const DepartmentModal = ({ getDepartmentData,selectedUser}) => {
  const[isloading,setIsloading] = useState(true)
  
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const handleCreateDepartment = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate input
    // if (!name || name.length < 4) {
    //   setError("Department name must be at least 4 characters long.");
    //   return;
    // }
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "https://hr.tanaghomtech.com/portal/public/api/department",
        { name }
      );
      console.log("Created Department:", response.data);
      await getDepartmentData(); // Refresh department data after adding
      setName(""); // Reset the form after successful submission
    } catch (error) {
      console.error(
        "Error creating department:",
        error.response?.data || error
      );
    }
  };
  const handleEditDepartment = async (e, id) => {
    e.preventDefault();
  
    // Validate input
    // if (!name || name.length < 4) {
    //   setError("jobs name must be at least 4 characters long.");
    //   return;
    // }
    
    setError(""); // Clear previous errors
  
    try {
      const response = await axios.put(
        `https://hr.tanaghomtech.com/portal/public/api/department/${id}`,
        { name }
      );
      console.log("Updated Department:", response.data);
      await getDepartmentData(); // Refresh department data after editing
      setName(""); // Reset the form after successful submission
    } catch (error) {
      console.error("Error editing department:", error.response?.data || error);
    }
  };
  
  // useEffect(() => {
  //   console.log("hi",selectedUser);
    
  //   if (selectedUser) {
  //     setName(selectedUser?.department); // Pre-fill for editing
  //     console.log("Editing:", selectedUser?.department);
  //   } else {
  //     setName(""); // Clear the field for adding a new address
  //   }
  // }, [selectedUser]);
  useEffect(() => {
    getDepartmentData();

  }, []);
const end =() =>{
  setName(" ")
}
useEffect(() => {
  console.log("hi",selectedUser);
  
  if (selectedUser) {
    setName(selectedUser?.department); // Pre-fill for editing
    console.log("Editing:", selectedUser?.department);
  } else {
    setName(""); // Clear the field for adding a new address
  }
}, [selectedUser]);
  return (
    <>
      {/* Add Department Modal */}
      <div
        id="add_department"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Department</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" onClick={end}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-block mb-3">
                  <div className={`col-md-12`}>
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Department name
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                      />
                      {error && <div className="text-danger">{error}</div>}
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="submit"
                    onClick={handleCreateDepartment}
                  >
                    Submit
                  </button>
                  <Toaster />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Department Modal */}
      {/* Edit Department Modal */}
      <div
        id="edit_department"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Department</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" onClick={end}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form >
                <div className="input-block mb-3">
                <input
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                      />
                      {error && <div className="text-danger">{error}</div>}
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="submit"
                    onClick={(e)=>handleEditDepartment(e, selectedUser?.id)}
                  >
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Department Modal */}
    </>
  );
};

export default DepartmentModal;
