import React, { useEffect, useState } from "react";
import Inputform from "../ui/Inputform";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import countryList from 'country-list';
import {Table, Button} from 'antd';

export const EditEmployee = ({ selectedUseru,activeModal, companys, selectedUser, users, address, jobs, setPreview, preview, getEmployeeData, employedata }) => {
  console.log("selectedUser", selectedUser)
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  console.log("activeModal", activeModal);
  const [rawData, setRawData] = useState([]);
  const [isloading, setIsloading] = useState();
  const [dataSource,setDataSource]= useState()
  const cc = employedata?.find((em) => em.id === selectedUser || em.id === selectedUseru); // Use find to get the matching employee object
  console.log(cc);
  const countries = countryList.getNames();
  console.log("preview", preview);
  function isValidDate(date) {
    return !isNaN(Date.parse(date));
  }
  
  const deleteItem = async (id) => {
    try {
      await axios.post(`https://hr.tanaghomtech.com/portal/public/api/jobHistory/delete/${id}`);
      setDataSource(prevDataSource => prevDataSource.filter(item => item.id !== id)); // Remove the deleted item
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error.response?.data || error);
      toast.error(error.message);
    }
  };
  
  
  
  
  const columns = [
    {
      title: 'Start date',
      dataIndex: 'start_date',
      key: 'start_date',
     
    },
    {
      title: 'End date',
      dataIndex: 'end_date',
      key: 'end_date',
   
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (department) => department?.name || '', 
    },
    {
      title: 'Job',
      dataIndex: 'job',
      key: 'job',
      render: (job) => job?.name || '', 
    },
    {
      title: 'Basic salary',
      dataIndex: 'basic_salary',
      key: 'basic_salary',
    },
    {
      title: 'Total salary',
      dataIndex: 'total_salary',
      key: 'total_salary',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={()=>deleteItem(record.id)} danger variant="outlined">
          Delete
        </Button>
      ),
    },
  ];

  useEffect(() => {
    // Assuming `cc` contains the matched employee data from `employedata` based on `selectedUser`
    console.log("Matched employee data: ", cc);
    if (cc) {
      console.log("cc", cc.company.companyName);
      // Set form values using setValue
      setValue("nationality", cc.nationality);
      setValue("first_name", cc.first_name);
      setValue("mid_name", cc.mid_name);
      setValue("last_name", cc.last_name);
      setValue("father_name", cc.father_name);
      setValue("mother_name", cc.mother_name);
      setValue("email", cc.email);
      setValue("phone", cc.phone);
      setValue("gender", cc.gender);
      setValue("mobile", cc.mobile);
      setValue("company_id", cc.company.id);
      setValue("department_current", cc.department_current?.id);
      setValue("department_hire", cc.department_hire.id);
      setValue("job_current", cc.job_current.id);
      setValue("job_hire", cc.job_hire.id);
      setValue("family_status", cc.family_status);
      setValue("child_number", cc.child_number);
      setValue("address_current", cc.address_current);
      setValue("address_permanent", cc.address_permanent);
      setValue("salary", cc.salary);
      setValue("visa_expiry", cc.visa_expiry);
      setValue("visa_validity", cc.visa_validity);
      setValue("cancelation_data", cc.cancelation_data);
      setValue("allowances", cc.allowances);
      setValue("status", cc.status);
      setValue("labor_card_date", cc.hire_date);
      setValue("end_date", cc.end_date);
      setValue("birth_date", cc.birth_date || "");
      setValue("birth_place", cc.birth_place || "");
      setValue("hire_date", cc.hire_date || "");
      setValue("end_place", cc.end_place || "");
      setValue("total_salary", cc.total_salary || "");
      setValue("finger", cc.finger || "");
      setValue("address_incompany_id", cc.address_incompany_id?.id || "");
      setValue("bio_attend_location", cc.bio_attend_location || "");
      // If there's an image URL, set the preview 
      if (cc.image) {
        setPreview(cc.image);
      }
    }
  }, [selectedUser, selectedUseru]); 
 
  const onSubmitEdit = async (data) => {
    setIsloading(true);
    console.log("hiiiiiii", data);
    console.log("10", data?.first_name)

    try {
      const formdata = new FormData();

      // Append form data including fields like names and file

      formdata.append("_method", "put");
      for (const key of Object.keys(data)) {
        if (key === "image" && data[key] === undefined) {
          continue// File input
        } else if (key === "end_date" || key === "cancelation_data" || key === "visa_validity" || key === "visa_expiry" || key === "hire_date" || key === "birth_date") {
          if (data[key] === null || !isValidDate(data[key])) {
            // Skip appending if the date is null or invalid
            continue;
          } else {
            formdata.append(key, data[key]); // Append if valid date
          }
        } else {
          formdata.append(key, data[key]); // For all other keys
          console.log("hiii", key, data[key]); // Log the key-value pairs
        }
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
      toast.success("Employee updated successfully")
      getEmployeeData();
      console.log("Employee updated successfully:", response.data);

    } catch (error) {
      console.error("Error updating employee:", error.response?.data || error);
      toast.error(error.message)
    }
    setIsloading(false)
  };
 
  
  const onSubmitEditpost = async (data) => {
    console.log("data:", data);
    const filteredData = {
      job_id: data?.job_current,
      department_id: data?.department_current,
      basic_salary: data?.salary,
      total_salary: data?.total_salary,
      start_date: data?.start_date,
      end_date: data?.end_date,
      employee_id: selectedUseru,
    };
  
    try {
      const response = await axios.post(`https://hr.tanaghomtech.com/portal/public/api/jobHistory`, filteredData);
      toast.success("Item posted successfully");
      fetchData(); // Refetch data after posting to ensure updated data is displayed
    } catch (error) {
      console.error("Error posting item:", error.response?.data || error);
      toast.error("Failed to post data");
    }
  };
  
  // Fetch data function
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://hr.tanaghomtech.com/portal/public/api/jobHistory/jobhistoryByEmployee/${selectedUseru}`
      );
      setDataSource(response.data.data);
      console.log("Employee job history:", response.data.data);
    } catch (error) {
      console.error("Error fetching employee job history:", error.response?.data || error);
      toast.error(error.message);
    }
  };
  
  // Fetch data when `selectedUseru` changes
  useEffect(() => {
    console.log("selectedUseru", selectedUseru);
    fetchData();
  }, [selectedUseru]);
  
  return (
    <div>
      {activeModal == null 
      ? <div className="modal-body">
        <form onSubmit={handleSubmit(onSubmitEdit)}>
          <div className="form-upload-profile">
            <h6 className>
              Profile Image <span> *</span>
            </h6>
            <div className="profile-pic-upload">
              <div className="profile-pic">
                <span>
                  <img
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: "50%",
                    }}
                    src={"https://hr.tanaghomtech.com/portal/storage/app/public/" + preview}
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
              actualName="Mid name"
              colSize={6}
              name="mid_name"
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
            <div className={`col-lg-6`}>
              <label htmlFor="country">nationality:</label>
              <select id="country" className={`form-control`} {...register("nationality")}>
                <option className="form-control" value=""> Select a Country </option>
                {countries?.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>

            </div>
            <div className={`col-lg-6`}>
              <label className=" col-form-label">Hire Job</label>
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
            <div className={`col-lg-6`}>
              <label className=" col-form-label">Hire Department</label>
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
              <label className=" col-form-label">Company </label>
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
                {address?.map((addres) => (
                  <option value={addres.id}>
                    <p>{addres.address_name}</p>
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
            {/* <Inputform
              colSize={6}
              actualName="Total salary"
              name="total_salary"
              register={register}
              errors={errors}
            /> */}
            {/* <div className={`col-lg-6`}>
              <label className="col-form-label">Basic salary</label>
              <input
                className={`form-control `}
                {...register("salary")}
                name="salary"
              />
            </div> */}
            <Inputform
              colSize={6}
              actualName="Allowance"
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
              actualName="Name in Biometric Machine"
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
                  data-bs-dismiss="modal"
                >
                  submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div> 
      : <div className="modal-body">
        <form onSubmit={handleSubmit(onSubmitEditpost)}>
          <div className="row">
            <div className={`col-lg-6`}>
              <label className=" col-form-label">Current Job</label>
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
              <label className=" col-form-label">
                Current Department
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
            <Inputform
              className={`col-lg-6`}
              actualName="Basic salary"
              colSize={6}
              name="salary"
              register={register}
              errors={errors}
            />
            <Inputform
              className={`col-lg-6`}
              actualName="Total salary"
              colSize={6}
              name="total_salary"
              register={register}
              errors={errors}
            />
             <Inputform
              className={`col-lg-6`}
              actualName="Start date"
              colSize={6}
              name="start_date"
              register={register}
              errors={errors}
              type="date"
            />
             <Inputform
              className={`col-lg-6`}
              actualName="End date for current job"
              colSize={6}
              name="end_date"
              register={register}
              errors={errors}
              type="date"
            />
            
          </div>
          <div style={{margin:"20px 0px"}} className="col-lg-12 text-end form-wizard-button">
              <button
                className="button btn-lights reset-btn"
                type="reset"
              >
                Reset
              </button>
              {isloading == true ? (
                <button
                  class="btn btn-primary wizard-next-btn"
                
                >
                  save changes...{" "}
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                </button>
              ) : (
                <button
                  class="btn btn-primary wizard-next-btn"
              type="submit"
             
                >
                  save changes
                </button>
              )}
            </div>
        </form>
        <Table style={{margin:"0", overflowX:"scroll"}} dataSource={dataSource} columns={columns} />
      </div>}
    </div>
            )
}