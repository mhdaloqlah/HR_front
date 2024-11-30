import axios from "axios";
import React, { useEffect, useState } from "react";

const AddressesModal = ({ getDepartmentData, selectedUser }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);
  // Update the 'name' field based on the selected user (for editing)
  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser?.department); // Pre-fill for editing
      console.log("Editing:", selectedUser?.department);
    } else {
      setName(""); // Clear the field for adding a new address
    }
  }, [selectedUser]);

  const handleCreateDepartment = async (e) => {
    e.preventDefault();

    // Validate input
    if (!name || name.length < 4) {
      setError("Department name must be at least 4 characters long.");
      return;
    }
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "https://hr.tanaghomtech.com/portal/public/api/address",
        { address_name: name }
      );
      console.log("Created address:", response.data);
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
    setIsloading(true);
    // Validate input
    if (!name || name.length < 4) {
      setError("Department name must be at least 4 characters long.");
      return;
    }

    setError(""); // Clear previous errors

    try {
      const response = await axios.put(
        `https://hr.tanaghomtech.com/portal/public/api/address/${id}`,
        { address_name: name }
      );
      console.log("Updated Department:", response.data);
      await getDepartmentData(); // Refresh department data after editing
      setName(""); // Reset the form after successful submission
    } catch (error) {
      console.error("Error editing address:", error.response?.data || error);
    }
    setIsloading(false);
  };

  // Clear the name field when closing the modal
  const end = () => {
    setName("");
    console.log("Form reset");
  };

  useEffect(() => {
    getDepartmentData(); // Fetch department data when the component mounts
  }, []);

  return (
    <>
      {/* Add Department Modal */}
      <div id="add_department" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Address</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={end}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Address Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="address_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                  />
                  {error && <div className="text-danger">{error}</div>}
                </div>
                <div className="submit-section">
                  {isloading == false?<button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="submit"
                    onClick={handleCreateDepartment}
                  >
                    Submit
                  </button>:<button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="submit"
                    onClick={handleCreateDepartment}
                  >
                    submit...{" "}
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></span>
                  </button>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Department Modal */}

      {/* Edit Department Modal */}
      <div id="edit_department" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Address</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={end}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-block mb-3">
                  <label>Accommodation Name</label>
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
                    onClick={(e) => handleEditDepartment(e, selectedUser?.id)}
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

export default AddressesModal;
