import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../assets/css/main.css"
import * as yup from "yup";
import Input from "../ui/Input";
import toast, { Toaster } from "react-hot-toast";


const CompaniesModal = ({ selectedUser, getCompanyData, setCompanyData, users, selectedUserDelete }) => {
  const [isloading, setIsloading] = useState(false);
  const [fieldOne, setFieldOne] = useState(true);
  const [preview, setPreview] = useState();
  const [closed, setClosed] = useState(true)
  const [data, setData] = useState({
    companyName: "",
    license_number: "",
    license_release: "",
    license_expiry: "",
    email: "",
    phone1: "",
    phone2: "",
    status: "",
    fax: "",
    website: "",
    about: "",
    location: "",
    address: "",
    facebook: "",
    twitter: "",
    linkden: "",
    skype: "",
    whatsapp: "",
    instegram: "",
    image: null
  });
  const close = () => {
    setData("")
  }
  useEffect(() => {
    if (selectedUser) {
      setData(prevData => ({
        ...prevData,
        license_number: selectedUser.license_number || "",
        license_release: selectedUser.license_release || "",
        license_expiry: selectedUser.license_expiry || "",
        companyName: selectedUser.companyName || "",
        email: selectedUser.email || "",
        phone1: selectedUser.phone1 || "",
        phone2: selectedUser.phone2 || "",
        status: selectedUser.status || "",
        fax: selectedUser.fax || "",
        website: selectedUser.website || "",
        about: selectedUser.about || "",
        location: selectedUser.location || "",
        address: selectedUser.address || "",
        facebook: selectedUser.facebook || "",
        twitter: selectedUser.twitter || "",
        linkden: selectedUser.linkden || "",
        skype: selectedUser.skype || "",
        whatsapp: selectedUser.whatsapp || "",
        instegram: selectedUser.instegram || "",
        image: selectedUser.image || null
      }));
    }
  }, [selectedUser]);

  //   const handledelete = async (id) => {
  //     await axios
  //       .delete(`https://hr.tanaghomtech.com/portal/public/api/company/${id}`)
  //       .then((response) => {
  //         console.log("Deleted ID:", response);
  //       })
  //       .catch((error) => {
  //         console.log("Error:", error);
  //       });
  //       getCompanyData()
  //   };
  // Initial form data

  const handleInputChange = e => setData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

  //   const handleInputChange = (e) => {
  //     const name = e.target.name; //it is the name of that input
  //      const value = e.target.value; //value of that input
  //     setData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //     console.log(name,value);

  //   };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Set preview for the image
      setData((prevState) => ({
        ...prevState,
        image: file, // Save the file in the data object
      }));
    }
  };
  function isValidDate(date) {
    return !isNaN(Date.parse(date));
  }

  const onSubmit = async (e) => {

    setIsloading(true)
    e.preventDefault();
    const formData = new FormData();

    for (const key of Object.keys(data)) {
      if (key === "companyName") {
        formData.append(key, data[key]); // Append companyName
      }
      // else if (key === "email" ) {
      //   // Check if email exists and is not undefined/null
      //   console.log("data", data[key]); // Debug: Check value of email
      //   console.log("key", key); // Debug: Check key name

      //   // Append email if it is defined, otherwise append an empty string to avoid errors
      //   if (data[key] !== undefined && data[key] !== null ) {
      //     formData.append(key, data[key]); // Append valid email
      //   } else {
      //     formData.append(key, ""); // Append empty string if email is not providedif (key === "image" ) { 
      // Skip appending if the value is undefined, null, or empty (no file selected)
      else if (key === "image") {
        // Append the actual file, not the preview URL
        if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
          formData.append(key, data[key]); // Append valid file
        }
        continue;
      }

      //   }

      //   continue; // Skip further processing for email
      // } 
      // else if (key === "image") {
      //   // Skip appending if the value is null or the date is invalid
      //   if (data[key] !== undefined && data[key] !== null) {
      //     formData.append(key, data[key]); // Append valid email
      //   } else {
      //     formData.append(key, null); // Append empty string if email is not provided
      //   }
      //   continue;
      // }
      else if (data[key] === null || !isValidDate(data[key])) {
        // Skip appending if the value is null or the date is invalid
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]); // Append valid email
        } else {
          formData.append(key, ""); // Append empty string if email is not provided
        }
        continue;
      }
      else {
        formData.append(key, data[key]); // Append other valid data
      }
    }


    console.log("formData", formData);



    try {
      const response = await axios.post(`https://hr.tanaghomtech.com/portal/public/api/company`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setCompanyData(data); // Add new company data
      setData({
        companyName: "",
        email: "",
        phone1: "",
        phone2: "",
        status: "",
        fax: "",
        website: "",
        about: "",
        location: "",
        address: "",
        facebook: "",
        twitter: "",
        linkden: "",
        skype: "",
        whatsapp: "",
        instegram: "",
        image: null
      });
      setPreview(null);
      getCompanyData();
    } catch (error) {
      console.error("Error creating company:", error);
    }
    setIsloading(false)

  };
  console.log("preview", preview);

  const onSubmitEdit = async (e, id) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formData = new FormData();

    // Append other data fields
    formData.append("companyName", data?.companyName);
    formData.append("email", data?.email);

    formData.append("phone1", data?.phone1);
    formData.append("phone2", data?.phone2);
    formData.append("status", data?.status);
    formData.append("fax", data?.fax);
    formData.append("website", data?.website);
    formData.append("about", data?.about);
    formData.append("location", data?.location);
    formData.append("address", data?.address);
    formData.append("facebook", data?.facebook);
    formData.append("twitter", data?.twitter);
    formData.append("linkden", data?.linkden);
    formData.append("skype", data?.skype);
    formData.append("whatsapp", data?.whatsapp);
    formData.append("skype", data?.skype);
    
    formData.append('_method', 'put');
    // Append the image file (make sure data.image is a File object)
    if (data.image && data.image instanceof File) {
      formData.append("image", data.image);
    } 
    ["license_number", "license_release", "license_expiry"].forEach((key) => {
      if (data[key] && isValidDate(data[key])) {
        formData.append(key, data[key]);
      }
    });
    
    // Add isValidDate function example (if you haven't defined it yet)
    function isValidDate(date) {
      return !isNaN(Date.parse(date));
    }

    try {
      const response = await axios.post(
        `https://hr.tanaghomtech.com/portal/public/api/company/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.success) {
        console.log(response.data);
        toast.success("company edit success")
        setData(response.data.data);
      } else {
        console.error("Failed to update data:", response.data.message);
      }

    } catch (error) {
      console.error("Error updating the company data:", error);
    }
    getCompanyData()
    // Optionally, call a function to refresh the data
    // getCompanyData();
  };

  const handledelete = async (id) => {
    console.log("id", id);

    try {
      const response = await axios.delete(`https://hr.tanaghomtech.com/portal/public/api/company/${id}`);
      console.log("Deleted ID:", response);
      toast(response.data.message)
      getCompanyData();
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message)
    }
  };

  return (
    <div>
      <Toaster
        position="top-left"
        reverseOrder={false}
      />

   <div className={`modal custom-modal fade custom-modal-two modal-padding `} id="add_company" role="dialog">
      <div className={`modal-dialog modal-dialog-centered`}
 >
      <div aria-hidden="true"  className="modal-content" >
          <div className="modal-header header-border justify-content-between p-0">
            <h5 className="modal-title">Add New Company</h5>
            <button type="button" className="btn-close position-static" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body p-0">
            <div className="add-info-fieldset">
              <fieldset id="first-field" style={{ display: fieldOne ? "block" : "none" }}>
                <form onSubmit={onSubmit}>
                  <div className="form-upload-profile">
                    <h6>Profile Image <span>*</span></h6>
                    <div className="profile-pic-upload">
                      <div className="profile-pic">

                        <img style={{ width: "80px", height: "80px", borderRadius: "50%" }} src={preview} alt="Preview" />

                      </div>
                      <div className="employee-field">
                        <div className="mb-0">
                          <div className="image-upload mb-0">
                            <input
                              type="file"
                              name="image"
                              accept="image/*" 
                              onChange={handleFileChange}
                            />
                            <div className="image-uploads">
                              <h4>Upload</h4>
                            </div>
                          </div>
                        </div>
                        <div className="img-reset-btn">
                          <Link to="#" onClick={() => setPreview(null)}>Reset</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="contact-input-set">
                    <div className="row">
                      <Input name="companyName" value={data?.companyName} onChange={handleInputChange} type="text" h='6' />
                      <Input name="email" value={data?.email} onChange={handleInputChange} type="email" h='6' />
                      <Input name="phone1" value={data?.phone1} onChange={handleInputChange} type="text" h='6' />
                      <Input name="phone2" value={data?.phone2} onChange={handleInputChange} type="text" h='6' />
                      <Input name="license_number" value={data?.license_number} onChange={handleInputChange} type="text" h='6' />
                      <Input name="license_release" value={data?.license_release} onChange={handleInputChange} type="date" h='6' />
                      <Input name="license_expiry" value={data?.license_expiry} onChange={handleInputChange} type="date" h='6' />
                      <Input name="fax" value={data?.fax} onChange={handleInputChange} type="text" h='6' />
                      <Input name="about" value={data?.about} onChange={handleInputChange} type="text" h='6' />
                      <Input name="location" value={data?.location} onChange={handleInputChange} type="text" h='6' />
                      <Input name="address" value={data?.address} onChange={handleInputChange} type="text" h='6' />
                      <Input name="facebook" value={data?.facebook} onChange={handleInputChange} type="text" h='6' />
                      <Input name="twitter" value={data?.twitter} onChange={handleInputChange} type="text" h='6' />
                      <Input name="skype" value={data?.skype} onChange={handleInputChange} type="text" h='6' />
                      <Input name="whatsapp" value={data?.whatsapp} onChange={handleInputChange} type="text" h='6' />
                      <Input name="instegram" value={data?.instegram} onChange={handleInputChange} type="text" h='6' />
                      <Input name="website" value={data?.website} onChange={handleInputChange} type="text" h='6' />
                      {/* Additional fields as needed */}

                      <div className="col-lg-12 text-end form-wizard-button">
                        <button
                          className="button btn-lights reset-btn"
                          type="reset"
                          onClick={() => setData({
                            companyName: "",
                            email: "",
                            phone1: "",
                            phone2: "",
                            status: "",
                            fax: "",
                            website: "",
                            about: "",
                            location: "",
                            address: "",
                            facebook: "",
                            twitter: "",
                            linkden: "",
                            skype: "",
                            whatsapp: "",
                            instegram: "",
                            image: null
                          })}
                        >
                          Reset
                        </button>
                        {isloading == true ? (
                          <button
                            class="btn btn-primary wizard-next-btn"
                            type="submit"
                          >
                            submit...{" "}
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                            ></span>
                          </button>
                        ) : (
                          <button
                            class="btn btn-primary wizard-next-btn"
                            type="submit"
                           
                    data-bs-dismiss="modal"
                          >
                            submit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </fieldset>
            </div>
          </div>
        </div>  
        </div>
      </div> 
      {/* Edit Company */}
      <div
        className="modal custom-modal fade custom-modal-two modal-padding"
        id="edit_company"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header header-border justify-content-between p-0">
              <h5 className="modal-title">Edit Company</h5>
              <button
                type="button"
                className="btn-close position-static"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" onClick={close}>×</span>
              </button>
            </div>
            <div className="modal-body p-0">
              <div className="add-info-fieldset">
                <fieldset
                  id="first-field"
                  style={{ display: fieldOne ? "block" : "none" }}
                >

                  <form onSubmit={(e) => onSubmitEdit(e, selectedUser.id)}>

                    <div className="form-upload-profile">
                      <h6>Profile Image <span>*</span></h6>
                      <div className="profile-pic-upload">
                        <div className="profile-pic">
                          <span>
                            {/* //src={"https://hr.tanaghomtech.com/portal/storage/app/public/" + selectedUser?.image} */}
                            <img style={{ width: "80px", height: "80px", borderRadius: "50%" }} src={"https://hr.tanaghomtech.com/portal/storage/app/public/" + selectedUser?.image} alt="Preview" />
                          </span>
                        </div>
                        <div className="employee-field">
                          <div className="mb-0">
                            <div className="image-upload mb-0">
                              <input
                                type="file"
                                name="image"
                                accept="image/*" 
                                onChange={handleFileChange}
                              />
                              <div className="image-uploads">
                                <h4>Upload</h4>
                              </div>
                            </div>
                          </div>
                          <div className="img-reset-btn">
                            <Link to="#" onClick={() => setPreview(null)}>Reset</Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form fields */}
                    <div className="contact-input-set">
                      <div className="row">
                        <Input name="companyName" value={data.companyName} onChange={handleInputChange} />
                        <Input name="email" value={data.email} onChange={handleInputChange} type="email" />
                        <Input name="phone1" value={data.phone1} onChange={handleInputChange} />
                        <Input name="phone2" value={data.phone2} onChange={handleInputChange} />
                        <Input name="license_number" value={data?.license_number} onChange={handleInputChange} type="text" h='6' />
                        <Input name="license_release" value={data?.license_release} onChange={handleInputChange} type="date" h='6' />
                        <Input name="license_expiry" value={data?.license_expiry} onChange={handleInputChange} type="date" h='6' />
                        <Input name="fax" value={data.fax} onChange={handleInputChange} />
                        <Input name="about" value={data.about} onChange={handleInputChange} />
                        <Input name="location" value={data.location} onChange={handleInputChange} />
                        <Input name="address" value={data.address} onChange={handleInputChange} />
                        <Input name="facebook" value={data.facebook} onChange={handleInputChange} />
                        <Input name="twitter" value={data.twitter} onChange={handleInputChange} />
                        <Input name="skype" value={data.skype} onChange={handleInputChange} />
                        <Input name="whatsapp" value={data.whatsapp} onChange={handleInputChange} />
                        <Input name="instegram" value={data.instegram} onChange={handleInputChange} />

                        {/* Additional fields as needed */}

                        <div className="col-lg-12 text-end form-wizard-button">
                          <button
                            className="button btn-lights reset-btn"
                            type="reset"
                            onClick={() => setData({
                              companyName: "",
                              email: "",
                              phone1: "",
                              phone2: "",
                              status: "",
                              fax: "",
                              website: "",
                              about: "",
                              location: "",
                              address: "",
                              facebook: "",
                              twitter: "",
                              linkden: "",
                              skype: "",
                              whatsapp: "",
                              instegram: "",
                              image: null
                            })}
                          >
                            Reset
                          </button>
                          <input className="btn btn-primary wizard-next-btn"    data-bs-dismiss="modal" type="submit" value="Submit" />

                        </div>
                      </div>
                    </div>
                  </form>

                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Company */}
      {/* Success Company */}
      <div className="modal custom-modal fade" id="success_msg" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="success-message text-center">
                <div className="success-popup-icon">
                  <i className="la la-building" />
                </div>
                <h3>Company Created Successfully!!!</h3>
                <p>View the details of Company</p>
                <div className="col-lg-12 text-center form-wizard-button">
                  <Link
                    to="#"
                    className="button btn-lights"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </Link>
                  <Link to="/company-details" className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Success Company */}
      {/* Delete Company */}
      <div
        className="modal custom-modal fade"
        id="delete_company"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="success-message text-center">
                <div className="success-popup-icon bg-danger">
                  <i className="la la-trash-restore" />
                </div>
                <h3>Are you sure, You want to delete</h3>
                <p>Company ”NovaWaveLLC” from your Account</p>
                <div className="col-lg-12 text-center form-wizard-button">
                  <Link
                    to="#"
                    className="button btn-lights"
                    data-bs-dismiss="modal"
                  >
                    Not Now
                  </Link>
                  <Link
                    to="/company"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={() => handledelete(selectedUserDelete?.id)}
                  >
                    Okay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Company */}
      {/* Export */}
      <div
        className="modal custom-modal fade modal-padding"
        id="export"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header header-border justify-content-between p-0">
              <h5 className="modal-title">Export</h5>
              <button
                type="button"
                className="btn-close position-static"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body p-0">
              <form action="/companies">
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-block mb-3">
                      <h5 className="mb-3">Export</h5>
                      <div className="status-radio-btns d-flex">
                        <div className="people-status-radio">
                          <input
                            type="radio"
                            className="status-radio"
                            id="pdf"
                            name="export-type"
                            defaultChecked
                          />
                          <label htmlFor="pdf">Person</label>
                        </div>
                        <div className="people-status-radio">
                          <input
                            type="radio"
                            className="status-radio"
                            id="excel"
                            name="export-type"
                          />
                          <label htmlFor="excel">Organization</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <h4 className="mb-3">Filters</h4>
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Fields <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        From Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <input
                          className="form-control floating datetimepicker"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        To Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <input
                          className="form-control floating datetimepicker"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 text-end form-wizard-button">
                    <button
                      className="button btn-lights reset-btn"
                      type="reset"
                      data-bs-dismiss="modal"
                    >
                      Reset
                    </button>
                    <button className="btn btn-primary" type="submit">
                      Export Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Export */}
    </div>
  );
};

export default CompaniesModal;
