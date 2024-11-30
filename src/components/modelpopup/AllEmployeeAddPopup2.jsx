import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Inputform from "../ui/Inputform";
import axios from "axios";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
const AllEmployeeAddPopup2 = ({
  getEmployeeData,
  selectedUser,
  employedata,
}) => {
  const [fieldOne, setFieldOne] = useState(true);
  const [data, setData] = useState();
  const [jobs, setjobs] = useState();
  const [employeedata, setEmployeedata] = useState();
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
      console.log(companys);
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
      console.log(response.data.data.map((user) => user.name));
      console.log(users);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  useEffect(() => {
    getDepartmentData();
    getcompanyData();
    geJobData();
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
    department_hire: yup.string().required("Department hire is required"),
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
    image: yup
      .mixed()
      .required("The image field must be a file.")
      .test("fileSize", "File size is too large", (value) => {
        return value && value.size <= 2000000; // 2MB
      })
      .test("fileType", "Unsupported File Format", (value) => {
        return (
          value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        );
      }),
  });
  const onSubmit = async (data) => {
    console.log("FormData prepared:", data);

    // try {
    //   const formData = new FormData();
    //   Object.keys(data).forEach((key) => {
    //     if (key === "image") {
    //       formData.append(key, data[key]); // File input
    //     } else {
    //       formData.append(key, data[key]);
    //     }
    //   });

    //   const response = await axios.post(
    //     "https://hr.tanaghomtech.com/portal/public/api/employee",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );

    //   console.log("Employee added successfully:", response.data);
    //   reset(); // Reset form after successful submission
    //   setPreview(null); // Reset preview
    // } catch (error) {
    //   console.error("Error adding employee:", error.response?.data || error);
    // }
  };

  const {
    register,
    control,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm( );
  console.log(selectedUser);
  const cc = employedata?.find((em) => em.id === selectedUser); // Use find to get the matching employee object
  console.log(cc);
  const jobCurrentValue = watch("job_current");  // Use watch to track the selected value

  useEffect(() => {
    // Assuming `cc` contains the matched employee data from `employedata` based on `selectedUser`
    console.log("Matched employee data: ", cc);

    if (cc) {
      // Set form values using setValue
      setValue("first_name", cc.first_name);
      setValue("last_name", cc.last_name);
      setValue("father_name", cc.father_name);
      setValue("mother_name", cc.mother_name);
      setValue("email", cc.company.email);
      setValue("phone", cc.phone);
      setValue("gender", cc.gender);
      setValue("mobile", cc.mobile);
      setValue("company_id", cc.company.companyName);
      setValue("department_current", cc.department_current.name);
      setValue("department_hire", cc.department_hire.name);
      setValue("job_current", cc.job_current.name);
      setValue("job_hire", cc.job_hire.name);
      setValue("family_status", cc.family_status);
      setValue("child_number", cc.child_number);
      setValue("address_current", cc.address_current);
      setValue("address_permanent", cc.address_permanent);
      setValue("salary", cc.salary);
      setValue("salary_transportation", cc.salary_trasnportation);  // Notice the typo fix in 'trasnportation'
      setValue("salary_jobtype", cc.salary_jobtype);
      setValue("salary_food", cc.salary_food);
      setValue("status", cc.status);
      // If there's an image URL, set the preview
      if (cc.profileImage) {
        setPreview(cc.profileImage);
      }
    }
  }, [selectedUser]); // Only run the effect when `cc` changes
  // Depend on both `selectedUser` and `employedata` if necessary

  const onSubmitEdit = async (data) => {
    try {
      const formdata = new FormData();

      // Append form data including fields like names and file
      formdata.append("_method", "put");
      formdata.append("first_name", data.first_name);
      formdata.append("last_name", data.last_name);
      formdata.append("father_name", data.father_name);
      formdata.append("mother_name", data.mother_name);
      formdata.append("gender", data.gender);
      formdata.append("email", data.email);
      formdata.append("company_id",  data.company.companyName);
      formdata.append("department_current", data.department_current.name);
      formdata.append("department_hire", data.department_hire.name);
      formdata.append("job_current", data.job_current.name);
      formdata.append("job_hire", data.job_hire.name);
      formdata.append("family_status", data.family_status);
      formdata.append("child_number", data.child_number);
      formdata.append("address_current", data.address_current);
      formdata.append("address_permanent", data.address_permanent);
      formdata.append("salary", data.salary);
      formdata.append("salary_trasnportation", data.salary_trasnportation);
      formdata.append("salary_jobtype", data.salary_jobtype);
      formdata.append("salary_food", data.salary_food);
      formdata.append("status", data.status);
      // Append profile image if available
      if (data.image && data.image[0]) {
        formdata.append("profileImage", data.image[0]);
      }

      const response = await axios.post(
        `https://hr.tanaghomtech.com/portal/public/api/employee/${selectedUser}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getEmployeeData();
      console.log("Employee updated successfully:", response.data);
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error updating employee:", error.response?.data || error);
    }
  };

  return (
    <>
      <div id="add_employee" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Employee</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-upload-profile">
                  <h6 className>
                    Profile Image <span> *</span>
                  </h6>
                  <div className="profile-pic-upload">
                    <div className="profile-pic">
                      <span>
                        <img
                          width={100}
                          height={100}
                          style={{
                            borderRadius: "50%",
                            backgroundSize: "cover",
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
                                {errors.image && <p>{errors.image.message}</p>}
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
                <Input name="first_name" value={data?.first_name} onChange={handleInputChange} type="text" h='6'/>
                  <Inputform
                    colSize={6}
                    name="last_name"
                    register={register}
                    errors={errors}
                  />
                  <div div className={`col-lg-6`}>
                    <label className=" col-form-label">job_hire</label>
                    <select
                      className={`form-control`}
                      {...register("job_hire")}
                    >
                      {jobs?.map((job) => (
                        <option className=" form-control " value={job.id}>
                          <p className=" col-form-label">{job.name}</p>
                        </option>
                      ))}
                    </select>
                  </div>
                  <div div className={`col-lg-6`}>
                    <label className=" col-form-label">job_current</label>
                    <select
                      className={`form-control`}
                      {...register("job_current")}
                    >
                      {jobs?.map((job) => (
                        <option value={job.id}>
                          <p className=" col-form-label">{job.name}</p>
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={`col-lg-6`}>
                    <label className=" col-form-label">department_hire</label>
                    <select
                      className={`form-control`}
                      {...register("department_hire")}
                    >
                      {users?.map((user) => (
                        <option value={user.id}>
                          <p>{user.name}</p>
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={`col-lg-6`}>
                    <label className=" col-form-label">
                      department_current
                    </label>
                    <select
                      className={`form-control`}
                      {...register("department_current")}
                    >
                      {users?.map((user) => (
                        <option value={user.id}>
                          <p>{user.name}</p>
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={`col-lg-6`}>
                    <label className=" col-form-label">company id</label>
                    <select
                      className={`form-control`}
                      {...register("company_id")}
                    >
                      {companys?.map((company) => (
                        <option value={company.id}>
                          <p>{company.companyName}</p>
                        </option>
                      ))}
                    </select>
                  </div>
                  <Inputform
                    colSize={6}
                    name="father_name"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="mother_name"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    type="date"
                    name="birth_date"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    type="date"
                    name="birth_place"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="nationality"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="email"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="phone"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="mobile"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="gender"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="family_status"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="child_number"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="address_current"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="address_permanent"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="salary"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="salary_trasnportation"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="salary_jobtype"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="salary_food"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="hire_date"
                    type="date"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    type="date"
                    colSize={6}
                    name="end_date"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="status"
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
                    <button
                      className="btn btn-primary wizard-next-btn"
                      type="submit"
                    >
                      submit
                    </button>
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
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Employee</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmitEdit)}>
                <div className="form-upload-profile">
                  <h6 className>
                    Profile Image <span> *</span>
                  </h6>
                  <div className="profile-pic-upload">
                    <div className="profile-pic">
                      <span>
                        <img
                          width={100}
                          height={100}
                          style={{
                            borderRadius: "50%",
                            backgroundSize: "cover",
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
                                {errors.image && <p>{errors.image.message}</p>}
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
                    colSize={6}
                    name="first_name"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="last_name"
                    register={register}
                    errors={errors}
                  />
                  <div div className={`col-lg-6`}>
                    <label className=" col-form-label">job_hire</label>
                    <select
                      className={`form-control`}
                      {...register("job_hire")}
                    >
                      {jobs?.map((job) => (
                        <option className=" form-control " value={job.id}>
                          <p className=" col-form-label">{job.name}</p>
                        </option>
                      ))}
                    </select>
                  </div>
                  <div div className={`col-lg-6`}>
                    <label className=" col-form-label">job_current</label>
                    <select
                      className={`form-control`}
                      {...register("job_current")}
                      value={jobCurrentValue || ""}
                      onChange={(e) => setValue("job_current", e.target.value)}
                    >
                      {jobs?.map((job) => (
                        <option value={job.id}>
                          <p className=" col-form-label">{job.name}</p>
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={`col-lg-6`}>
                    <label className=" col-form-label">department_hire</label>
                    <select
                      className={`form-control`}
                      {...register("department_hire")}
                    >
                      {users?.map((user) => (
                        <option value={user.id}>
                          <p>{user.name}</p>
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={`col-lg-6`}>
                    <label className=" col-form-label">
                      department_current
                    </label>
                    <select
                      className={`form-control`}
                      {...register("department_current")}
                    >
                      {users?.map((user) => (
                        <option value={user.id}>
                          <p>{user.name}</p>
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={`col-lg-6`}>
                    <label className=" col-form-label">company id</label>
                    <select
                      className={`form-control`}
                      {...register("company_id")}
                    >
                      {companys?.map((company) => (
                        <option value={company.id}>
                          <p>{company.companyName}</p>
                        </option>
                      ))}
                    </select>
                  </div>
                  <Inputform
                    colSize={6}
                    name="father_name"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="mother_name"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    type="date"
                    name="birth_date"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    type="date"
                    name="birth_place"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="nationality"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="email"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="phone"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="mobile"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="gender"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="family_status"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="child_number"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="address_current"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="address_permanent"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="salary"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="salary_trasnportation"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="salary_jobtype"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="salary_food"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="hire_date"
                    type="date"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    type="date"
                    colSize={6}
                    name="end_date"
                    register={register}
                    errors={errors}
                  />
                  <Inputform
                    colSize={6}
                    name="status"
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
                    <button
                      className="btn btn-primary wizard-next-btn"
                      type="submit"
                    >
                      submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllEmployeeAddPopup2;
