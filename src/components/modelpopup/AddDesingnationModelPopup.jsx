import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const AddDesingnationModelPopup = ({getJobData,selectedUser}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  console.log(selectedUser);
  
  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser?.Job); // Pre-fill for editing
      console.log("Editing:", selectedUser?.Job);
    } else {
      setName(""); // Clear the field for adding a new address
    }
  }, [selectedUser]);
  const handleCreateJob = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate input
    if (!name || name.length < 4) {
      setError("Department name must be at least 4 characters long.");
      return;
    }
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "https://hr.tanaghomtech.com/portal/public/api/job",
        { name }
      );
      console.log("Created Department:", response.data);
      setName(""); // Reset the form after successful submission
    } catch (error) {
      console.error(
        "Error creating department:",
        error.response?.data || error
      );
    }
    getJobData()
  };
  const handleEditJob = async (e, id) => {
    e.preventDefault();
  
    // Validate input
    if (!name || name.length < 4) {
      setError("Department name must be at least 4 characters long.");
      return;
    }
    
    setError(""); // Clear previous errors
  
    try {
      const response = await axios.put(
        `https://hr.tanaghomtech.com/portal/public/api/job/${id}`,
        { name }
      );
      console.log("Updated Department:", response.data);
      await getJobData(); // Refresh department data after editing
      setName(""); // Reset the form after successful submission
    } catch (error) {
      console.error("Error editing department:", error.response?.data || error);
    }
  };
  const end=()=>{
    setName("");
  }
  
  return (
    <>
      <div
        id="add_designation"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Job</h5>
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
              <div>
              <div className="input-block mb-3">
                      <label className="col-form-label">
                        Job name
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
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCreateJob}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="edit_designation"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Job</h5>
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
                  <label className="col-form-label">
                    Job Name <span className="text-danger">*</span>
                  </label>
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
                    onClick={(e)=>handleEditJob(e, selectedUser?.id)}
                  >
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDesingnationModelPopup;
