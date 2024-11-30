import React, { useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Inputform from "../ui/Inputform";
import toast, { Toaster, toaster } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditEmployee } from "./EditEmployee";
import * as yup from "yup";
import countryList from 'country-list';
const AllEmployeeAddPopup = ({
  activeModal ,
  getEmployeeData,
  selectedUser,
  employedata,
  setSelectedUser,
  selectedUseru
}) => {
  console.log("hhhhhhhhhhh",
    selectedUser,
    employedata);
  const countries = countryList.getNames(); // Get the dynamic list of country names
  const [selectedCountry, setSelectedCountry] = useState("");
  const [address, setAddress] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [fieldOne, setFieldOne] = useState(true);
  const [jobs, setjobs] = useState();
  const [companys, setCompanys] = useState();
  const [users, setUsers] = useState();
  const [preview, setPreview] = useState();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const getDepartmentData = async () => {
    try {
      const response = await axios.get(
        "https://hr.tanaghomtech.com/portal/public/api/department"
      );
      setUsers(response.data.data);
      console.log(response.data.data.map((user) => user.name));
      console.log(users);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };
  const getcompanyData = async () => {
    try {
      const response = await axios.get(
        "https://hr.tanaghomtech.com/portal/public/api/company"
      );
      setCompanys(response.data.data);
      console.log(response);
      console.log("heeeloooo", companys);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };
  const geJobData = async () => {
    try {
      const response = await axios.get(
        "https://hr.tanaghomtech.com/portal/public/api/job"
      );
      setjobs(response.data.data);
      console.log(response.data.data);
      console.log(users);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };
  const getAddressData = async () => {
    try {
      const response = await axios.get(
        "https://hr.tanaghomtech.com/portal/public/api/address"
      );
      setAddress(response.data.data);
      console.log("address", response.data.data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };
  useEffect(() => {
    getDepartmentData();
    getcompanyData();
    geJobData();
    getAddressData();
  }, []);
  const schema = yup.object({
    first_name: yup
      .string()
      .required("First name is required")
      .max(255, "First name cannot exceed 255 characters"),
    last_name: yup
      .string()
      .required("Last name is required")
      .max(255, "Last name cannot exceed 255 characters"),
    department_hire: yup
      .string()
      .required("Department hire is required")
      .test(
        "isValidSelection",
        "Please select a valid department",
        (value) => value !== "" // Ensure it is not an empty string
      ),
    department_current: yup
      .string() // Ensure this is a string if it's supposed to be
      .required("Current department is required"),
    job_hire: yup.string().required("Job hire is required"),
    job_current: yup.string().required("Current job is required"),
    company_id: yup
      .number() // Ensure this is a string if it's supposed to be
      .required("Company ID is required")
      .typeError("Company ID must be a number"),
    email: yup
      .string() // Ensure this is a string type
      .required("Email is required")
      .matches(emailPattern, "Enter a valid email address"),
    birth_date: yup.mixed().required("the birth date is required"),

    // image: yup
    //   .mixed()
    //   .required("The image field must be a file.")
    //   .test("fileSize", "File size is too large", (value) => {
    //     return value && value.size <= 2000000; // 2MB
    //   })
    //   .test("fileType", "Unsupported File Format", (value) => {
    //     return (
    //       value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
    //     );
    //   }),
  });
  function isValidDate(date) {
    return !isNaN(Date.parse(date));
  }
  const onSubmitt = async (data) => {
    // var modalElement = document.getElementsByClassName('modal-backdrop');
    // var modalElement2 = document.getElementById('add_employee');
    // modalElement[0].classList.remove('show');
    // modalElement2.classList.remove('show');
    try {
      const formData = new FormData();
      for (const key of Object.keys(data)) {
        if (key === "image") {
          formData.append(key, data[key]); // File input
        } else if (key === "end_date" || key === "visa_expiry" || key === "hire_date" || key === "birth_date") {
          if (data[key] === null || !isValidDate(data[key])) {
            // Skip appending if the date is null or invalid
            continue;
          } else {
            formData.append(key, data[key]); // Append if valid date
          }
        } else {
          formData.append(key, data[key]); // For all other keys
          console.log("hiii", key, data[key]); // Log the key-value pairs
        }
      }
      const response = await axios.post(
        "https://hr.tanaghomtech.com/portal/public/api/employee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ); 
      console.log("Employee added successfully 1:", response.data);
   
       console.log("Employee added successfully 2:", response.data);

     
      console.log("Employee added successfully 3:", response.data);

      toast.success("employee Added successfully");
     
     
      reset(); // Reset form after successful submission
      setPreview(null); // Reset preview 
      setIsloading(true);
     ; // Close the modal
    } catch (error) {
      console.error("Error adding employee:", error.response?.data || error);
      toast.error(error.message);
    }
    // setIsloading(false);
    getEmployeeData();
  };

  const close = () => {
    setSelectedUser("")
  }
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const cc = employedata?.find((em) => em.id === selectedUser); // Use find to get the matching employee object
  console.log(cc);
const exit =() =>{
  reset()
}
  // useEffect(() => {
  //   // Assuming `cc` contains the matched employee data from `employedata` based on `selectedUser`
  //   console.log("Matched employee data: ", cc);

  //   if (cc) {
  //     // Set form values using setValue
  //     setValue("first_name", cc.first_name || "");
  //     setValue("mid_name", cc.mid_name || "");
  //     setValue("last_name", cc.last_name || "");
  //     setValue("father_name", cc.father_name || "");
  //     setValue("mother_name", cc.mother_name || "");

  //     setValue("email", cc.company.email || "");
  //     setValue("phone", cc.phone || "");
  //     setValue("gender", cc.gender || "");
  //     setValue("mobile", cc.mobile || "");
  //     setValue("company_id", cc.company.id || "");
  //     setValue("department_current", cc.department_current.name || "");
  //     setValue("department_hire", cc.department_hire.name || "");
  //     setValue("job_current", cc.job_current.name || "");
  //     setValue("job_hire", cc.job_hire.name || "");
  //     setValue("family_status", cc.family_status || "");
  //     setValue("child_number", cc.child_number || "");
  //     setValue("address_current", cc.address_current || "");
  //     setValue("address_permanent", cc.address_permanent || "");
  //     setValue("birth_date", cc.birth_date || "");
  //     setValue("birth_place", cc.birth_place || "");
  //     setValue("hire_date", cc.hire_date || "");
  //     setValue("end_place", cc.end_place || "");
  //     setValue("salary", cc.salary || "");
  //     setValue("address_incompany_id", cc.address_incompany_id || "");

  //     setValue("allowance", cc.allowances || "");
  //     setValue("status", cc.status || "");
  //     // If there's an image URL, set the preview
  //     if (cc.profileImage) {
  //       setPreview(cc.profileImage);
  //     }
  //   }
  // }, [selectedUser]); // Only run the effect when `cc` changes
  // Depend on both `selectedUser` and `employedata` if necessary

  // const onSubmitEdit = async (data) => {
  //   try {
  //     const formdata = new FormData();

  //     // Append form data including fields like names and file
  //     formdata.append("_method", "put");
  //     formdata.append("first_name", data.first_name);
  //     formdata.append("last_name", data.last_name);
  //     formdata.append("father_name", data.father_name);
  //     formdata.append("mother_name", data.mother_name);
  //     formdata.append("gender", data.gender);
  //     formdata.append("email", data.email);
  //     formdata.append("company_id", data.company.companyName);
  //     formdata.append("department_current", data.department_current.name);
  //     formdata.append("department_hire", data.department_hire.name);
  //     formdata.append("job_current", data.job_current.name);
  //     formdata.append("job_hire", data.job_hire.name);
  //     formdata.append("family_status", data.family_status);
  //     formdata.append("child_number", data.child_number);
  //     formdata.append("address_current", data.address_current);
  //     formdata.append("birth_date", data.birth_date);
  //     formdata.append("birth_place", data.birth_place);
  //     formdata.append("address_permanent", data.address_permanent);
  //     formdata.append("salary", data.salary);
  //     formdata.append("salary_trasnportation", data.salary_trasnportation);
  //     formdata.append("salary_jobtype", data.salary_jobtype);
  //     formdata.append("salary_food", data.salary_food);
  //     formdata.append("status", data.status);
  //     formdata.append("total_salary", data.total_salary);
  //     formdata.append("address_incompany_id", data.address_incompany_id);
  //     // Append profile image if available
  //     if (data.image && data.image[0]) {
  //       formdata.append("profileImage", data.image[0]);
  //     }

  //     const response = await axios.post(
  //       `https://hr.tanaghomtech.com/portal/public/api/employee/${selectedUser}`,
  //       formdata,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     getEmployeeData();
  //     console.log("Employee updated successfully:", response.data);
  //     reset(); // Reset form after successful submission
  //   } catch (error) {
  //     console.error("Error updating employee:", error.response?.data || error);
  //   }
  // };

  return (
    <>
      <div id="add_employee" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <Toaster position="top-right" reverseOrder={false} />
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Employee</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" onClick={exit}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmitt)}>
                <div className="form-upload-profile">
                  <h6 className>
                    Profile Image <span> *</span>
                  </h6>
                  <div className="profile-pic-upload">
                    <div className="profile-pic">
                      <span>
                        <img
                          style={{
                            borderRadius: "50%",
                            backgroundSize: "cover",
                            width: "80px",
                            height: "80px"
                          }}
                          src={preview}
                          alt="Img"
                        />
                      </span>
                    </div>
                    <div className="employee-field">
                      <div className="mb-0">
                        <div className="image-upload mb-0">
                          <Controller
                            name="image"
                            control={control}
                            render={({ field: { ref, onBlur, onChange } }) => (
                              <div>
                                <input
                                  type="file"
                                  ref={ref}
                                  onBlur={onBlur}
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    onChange(file);
                                    // Generate image preview
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setPreview(reader.result);
                                      };
                                      reader.readAsDataURL(file);
                                    } else {
                                      setPreview(null); // Reset preview if no file is selected
                                    }
                                  }}
                                />
                                {errors.image && (
                                  <p
                                    style={{ opacity: "0.5", fontSize: "12px" }}
                                    className="text-danger"
                                  >
                                    {errors.image.message}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                          <div className="image-uploads">
                            <h4>Upload</h4>
                          </div>
                        </div>
                      </div>
                      <div className="img-reset-btn">
                        <Link to="#">Reset</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <Inputform
                    actualName="First name"
                    colSize={6}
                    name="first_name"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    actualName="Last name"
                    colSize={6}
                    name="last_name"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="father_name"
                    actualName="Father name"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    actualName="Mother name"
                    name="mother_name"
                    register={register}
                    errors={errors}
                  />
                  <div className={`col-lg-6`}>
                    <label className=" col-form-label">Gender </label>
                    <select className={`form-control`} {...register("gender")}>
                      <option value="male">
                        <p>male</p>
                      </option>
                      <option value="female">
                        <p>female</p>
                      </option>
                    </select>
                  </div>
                  <div className={`col-lg-6`}>
                    <label className=" col-form-label">Marital status </label>
                    <select className={`form-control`} {...register("familty_status")}>
                      <option value="single">
                        <p>single</p>
                      </option>
                      <option value="married">
                        <p>married</p>
                      </option>
                      <option value="divorced">
                        <p>divorced</p>
                      </option>
                      <option value="engaged">
                        <p>engaged </p>
                      </option>
                    </select>
                  </div>
                  {/* <Inputform
                    colSize={6}
                    name="nationality"
                    actualName="Nationality"
                    register={register}
                    errors={errors}
                  /> */}
                  <div className={`col-lg-6`}>
                    <label htmlFor="country">nationality:</label>
                    <select id="country" className={`form-control`} {...register("nationality")}>
                      <option className="form-control" value="">Select a Country </option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>

                  </div>
                  <div className={`col-lg-6`}>
                    <label className=" col-form-label">Hire Job <span style={{ color: "red" }}> *</span></label>
                    <select
                      className={`form-control`}
                      {...register("job_hire")}
                    >
                      <option value="" disabled selected>
                        Select a hire job
                      </option>
                      {jobs?.map((job) => (
                        <option
                          className="form-control"
                          value={job.id}
                          key={job.id}
                        >
                          {job.name}
                        </option>
                      ))}
                    </select>
                    {errors.job_hire && (
                      <p
                        style={{ opacity: "0.5", fontSize: "12px" }}
                        className="text-danger"
                      >
                        {errors.job_hire.message}
                      </p>
                    )}
                  </div>

                  <div div className={`col-lg-6`}>
                    <label className=" col-form-label">Current Job <span style={{ color: "red" }}> *</span></label>
                    <select
                      className={`form-control`}
                      {...register("job_current")}
                    >
                      <option value="" disabled selected>
                        Select a current job
                      </option>
                      {jobs?.map((job) => (
                        <option className=" form-control " value={job.id}>
                          <p className=" col-form-label">{job.name}</p>
                        </option>
                      ))}
                    </select>
                    {errors.job_current && (
                      <p
                        style={{ opacity: "0.5", fontSize: "12px" }}
                        className="text-danger"
                      >
                        {errors.job_current.message}
                      </p>
                    )}
                  </div>
                  <div className={`col-lg-6`}>
                    <label className=" col-form-label">Hire Department<span style={{ color: "red" }}> *</span></label>
                    <select
                      className={`form-control`}
                      {...register("department_hire")}
                    > <option value="" disabled selected>
                        Select a hire department
                      </option>
                      {users?.map((user) => (
                        <option value={user.id}>
                          <p>{user.name}</p>
                        </option>
                      ))}
                    </select>
                    {errors.department_hire && (
                      <p
                        style={{ opacity: "0.5", fontSize: "12px" }}
                        className="text-danger"
                      >
                        {errors.department_hire.message}
                      </p>
                    )}
                  </div>
                  <div className={`col-lg-6`}>
                    <label className=" col-form-label">
                      Current Department <span style={{ color: "red" }}> *</span>
                    </label>
                    <select
                      className={`form-control`}
                      {...register("department_current")}
                    >
                      <option value="" disabled selected>
                        Select a department current
                      </option>
                      {users?.map((user) => (
                        <option value={user.id}>
                          <p>{user.name}</p>
                        </option>
                      ))}
                    </select>
                    {errors.department_current && (
                      <p
                        style={{ opacity: "0.5", fontSize: "12px" }}
                        className="text-danger"
                      >
                        {errors.department_current.message}
                      </p>
                    )}
                  </div>
                  <div className={`col-lg-6`}>
                    <label className=" col-form-label">Company <span style={{ color: "red" }}> *</span></label>
                    <select
                      className={`form-control`}
                      {...register("company_id")}
                    >
                      <option value="" disabled selected>
                        Select a company
                      </option>
                      {companys?.map((company) => (
                        <option value={company.id}>
                          <p>{company.companyName}</p>
                        </option>
                      ))}
                    </select>
                    {errors.company_id && (
                      <p
                        style={{ opacity: "0.5", fontSize: "12px" }}
                        className="text-danger"
                      >
                        {errors.company_id.message}
                      </p>
                    )}
                  </div>
                  <div className={`col-lg-6`}>
                    <label className=" col-form-label">Accommodation </label>
                    <select
                      className={`form-control`}
                      {...register("address_incompany_id")}
                    >
                      <option value="" disabled selected>
                        Select a Accommodation
                      </option>
                      {address?.map((address) => (
                        <option value={address.id}>
                          <p>{address.address_name}</p>
                        </option>
                      ))}
                    </select>
                    {errors.address_incompany_id && (
                      <p
                        style={{ opacity: "0.5", fontSize: "12px" }}
                        className="text-danger"
                      >
                        {errors.address_incompany_id.message}
                      </p>
                    )}
                  </div>
                  <Inputform
                    colSize={6}
                    type="date"
                    actualName="Birth date"
                    name="birth_date"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="birth_place"
                    actualName="Birth place"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="email"
                    actualName="Email"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="phone"
                    actualName="Phone"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="mobile"
                    actualName="Mobile"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="child_number"
                    actualName="Kids number"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="address_current"
                    actualName="Address current"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="address_permanent"
                    actualName="Address permanent"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    actualName="Total salary"
                    name="total_salary"
                    register={register}
                    errors={errors}
                  />
                  <div className={`col-lg-6`}>
                    <label className="col-form-label">Basic salary</label>
                    <input
                      className={`form-control `}
                      {...register("salary")}
                      name="salary"
                    />
                  </div>

                  <Inputform
                    colSize={6}
                    actualName="Allowances"
                    name="allowances"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    actualName="Labor card date"
                    name="hire_date"
                    type="date"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    type="date"
                    colSize={6}
                    actualName="Labor card expiry"
                    name="end_date"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    actualName="Visa expiry"
                    name="visa_expiry"
                    type="date"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    actualName="Visa validity"
                    name="visa_validity"
                    type="text"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    actualName="cancelation data"
                    name="cancelation_data"
                    type="date"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    actualName="Name in biometric machine"
                    name="finger"
                    register={register}
                    errors={errors}
                  />
                  
                  <div className={`col-lg-6`}>
                  <label className=" col-form-label">Biometric location</label>
                  <select
                    className={`form-control`}
                    {...register("bio_attend_location")}
                  >
                    <option value="" disabled selected>
                      Select a Biometric location
                    </option>
                   
                      <option value="site">
                        <p>site</p>
                      </option>
                      <option value="branch">
                        <p>branch</p>
                      </option>
                  </select>
                
                  
                </div>
                  <Inputform
                    colSize={6}
                    actualName="Self number"
                    name="self_number"
                    register={register}
                    errors={errors}
                  />
                   <Inputform
                    colSize={6}
                    actualName="Passport number"
                    name="passport_number"
                    register={register}
                    errors={errors}
                  />
                   <Inputform
                    colSize={6}
                    actualName="Insurance number"
                    name="insurance_number"
                    register={register}
                    errors={errors}
                  />
                   <Inputform
                    colSize={6}
                    actualName="Uaeid number"
                    name="uaeid_number"
                    register={register}
                    errors={errors}
                  />
                   <Inputform
                    colSize={6}
                    actualName="Forign language"
                    name="language"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    actualName="Education"
                    name="education"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    actualName="Courses"
                    name="courses"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    actualName="Contract type"
                    name="contract_type"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    actualName="Workcard number"
                    name="workcard_number"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    actualName="File number"
                    name="file_number"
                    register={register}
                    errors={errors}
                  />
                  <div className="col-lg-12 text-end form-wizard-button">
                    <button
                      className="button btn-lights reset-btn"
                      type="reset"
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
                        data-bs-dismiss= {isloading == true ? "modal" : " "}
                      >
                        submit
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div id="edit_employee" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <Toaster
            position="top-left"
            reverseOrder={false}
          />
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Employee</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" onClick={close}>×</span>
              </button>
            </div>
            <EditEmployee
            selectedUseru={selectedUseru}
              activeModal ={activeModal}
              companys={companys}
              selectedUser={selectedUser}
              users={users}
              jobs={jobs}
              address={address}
              setPreview={setPreview}
              preview={preview}
              getEmployeeData={getEmployeeData}
              employedata={employedata}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllEmployeeAddPopup;
