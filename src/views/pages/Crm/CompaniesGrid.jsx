import React, { useEffect, useRef, useState } from 'react'
import { avatar19, avatar20, avatar21, avatar22, avatar23, company_icon_01, company_icon_02, company_icon_03, company_icon_04, company_icon_05, company_icon_06, company_icon_07, company_icon_08, company_icon_09, company_icon_10 } from '../../../Routes/ImagePath'
import { Link } from 'react-router-dom';
import Select from 'react-select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import CompaniesModal from '../../../components/modelpopup/CompaniesModal';
import axios from 'axios';


const CompaniesGrid = () => {

  const [showFilter, setShowFilter] = useState(false);
  const [fieldInputs, setFieldInputs] = useState(false);
  const [focused, setFocused] = useState(false);
  const [focusedTwo, setFocusedTwo] = useState(false);
  const [focusedThree, setFocusedThree] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValueTwo, setInputValueTwo] = useState("");
  const [inputValueThree, setInputValueThree] = useState("");
const[editcompanyy,setEditcompanyy]=useState();
const[deletecompanyy,setDeletecompanyy]=useState();

  const [companyData, setCompanyData] = useState([]);
  const getCompanyData = async () => {
    await axios
      .get('https://hr.tanaghomtech.com/portal/public/api/company')
      .then(response => {
        setCompanyData(response.data.data);
        console.log(response.data)
      })

  }
  

  useEffect(() => {
    getCompanyData()
  }, [])


  const optionsSortValue = [
    { value: 'sortAlphabet', label: 'Sort By Alphabet' },
    { value: 'ascending', label: 'Ascending' },
    { value: 'descending', label: 'Descending' },
    { value: 'recentlyViewed', label: 'Recently Viewed' },
    { value: 'recentlyAdded', label: 'Recently Added' }
  ];

  const optionSort = [
    { value: 'Germany', label: 'Germany' },
    { value: 'USA', label: 'USA' },
    { value: 'Canada', label: 'Canada' },
    { value: 'India', label: 'India' },
    { value: 'China', label: 'China' }
  ];

  const handleLabelClick = () => {
    setFocused(true);
  };

  const handleInputBlur = () => {
    if (inputValue === "") {
      setFocused(false);
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value !== "" && !focused) {
      setFocused(true);
    }
  };

  const handleLabelClickTwo = () => {
    setFocusedTwo(true);
  };

  const handleInputBlurTwo = () => {
    if (inputValueTwo === "") {
      setFocusedTwo(false);
    }
  };
  const handleInputChangeTwo = (e) => {
    const value = e.target.value;
    setInputValueTwo(value);
    if (value !== "" && !focusedTwo) {
      setFocusedTwo(true);
    }
  };

  const handleLabelClickThree = () => {
    setFocusedThree(true);
  };

  const handleInputBlurThree = () => {
    if (inputValueThree === "") {
      setFocusedThree(false);
    }
  };
  const handleInputChangeThree = (e) => {
    const value = e.target.value;
    setInputValueThree(value);
    if (value !== "" && !focusedThree) {
      setFocusedThree(true);
    }
  };

  const initialSettings = {
    endDate: new Date("2020-08-11T12:30:00.000Z"),
    ranges: {
      "Last 30 Days": [
        new Date("2020-07-12T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last 7 Days": [
        new Date("2020-08-04T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last Month": [
        new Date("2020-06-30T18:30:00.000Z"),
        new Date("2020-07-31T18:29:59.999Z"),
      ],
      "This Month": [
        new Date("2020-07-31T18:30:00.000Z"),
        new Date("2020-08-31T18:29:59.999Z"),
      ],
      Today: [
        new Date("2020-08-10T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      Yesterday: [
        new Date("2020-08-09T04:57:17.076Z"),
        new Date("2020-08-09T04:57:17.076Z"),
      ],
    },
    startDate: new Date("2020-08-04T04:57:17.076Z"), // Set "Last 7 Days" as default
    timePicker: false,
  };
  // useEffect(() => {
  //   if (selectedUser) {
  //     setData(prevData => ({
  //       ...prevData,
  //       companyName: selectedUser.companyName || "",
  //       email: selectedUser.email || "",
  //       phone1: selectedUser.phone1 || "",
  //       phone2: selectedUser.phone2 || "",
  //       status: selectedUser.status || "",
  //       fax: selectedUser.fax || "",
  //       website: selectedUser.website || "",
  //       about: selectedUser.about || "",
  //       location: selectedUser.location || "",
  //       address: selectedUser.address || "",
  //       facebook: selectedUser.facebook || "",
  //       twitter: selectedUser.twitter || "",
  //       linkden: selectedUser.linkden || "",
  //       skype: selectedUser.skype || "",
  //       whatsapp: selectedUser.whatsapp || "",
  //       instegram: selectedUser.instegram || "",
  //       image: selectedUser.image || null
  //     }));
  //   }
  // }, [selectedUser]);
// const editcompany =async (id) => {
//   console.log(id);
  
//   const formData = new FormData();

//   // Append other data fields
//   formData.append("companyName", companyData.companyName);
//   formData.append("email", companyData.email);
//   formData.append("phone1", companyData.phone1);
//   formData.append("phone2", companyData.phone2);
//   formData.append("status", companyData.status);
//   formData.append("fax", companyData.fax);
//   formData.append("website", companyData.website);
//   formData.append("about", companyData.about);
//   formData.append("location", companyData.location);
//   formData.append("address", companyData.address);
//   formData.append("facebook", companyData.facebook);
//   formData.append("twitter", companyData.twitter);
//   formData.append("linkden", companyData.linkden);
//   formData.append("skype", companyData.skype);
//   formData.append("whatsapp", companyData.whatsapp);
//   formData.append("instegram", companyData.instegram);
//   formData.append('_method', 'put');
//   // Append the image file (make sure data.image is a File object)
//   if (companyData.image && companyData.image instanceof File) {
//       formData.append("image", companyData.image);
//   }

//   try {
//     const response = await axios.post(
//         `https://hr.tanaghomtech.com/portal/public/api/company/${id}`,
//         formData,
//         {
//             headers: {
//                 "Content-Type": "multipart/form-data"
//             }
//         }
//     );

//     if (response.data.success) {
//       console.log(response.data);
      
//         setCompanyData(response.data.data);
//     } else {
//         console.error("Failed to update data:", response.data.message);
//     }

// } catch (error) {
//     console.error("Error updating the company data:", error);
// }
// getCompanyData()
//   // Optionally, call a function to refresh the data
//   // getCompanyData();
// }
  const [isFullScreen, setFullScreen] = useState(false);
  const maximizeBtnRef = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setFullScreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          setFullScreen(false);
        }
      }
    };

    const cleanup = () => {
      if (isFullScreen && document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(false);
      }
    };

    const maximizeBtn = maximizeBtnRef.current;
    maximizeBtn.addEventListener('click', handleClick);

    // Cleanup function to remove the event listener and exit fullscreen on component unmount
    return () => {
      maximizeBtn.removeEventListener('click', handleClick);
      cleanup();
    };
  }, [isFullScreen]);

  return (

    <div className="page-wrapper">
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-md-4">
              <h3 className="page-title">Companies</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/admin-dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Companies</li>
              </ul>
            </div>
            <div className="col-md-8 float-end ms-auto">
              <div className="d-flex title-head">
                <div className="view-icons">
               
                  <Link to="#" className="list-view btn btn-link" id="collapse-header" ref={maximizeBtnRef}><i className="las la-expand-arrows-alt" /></Link>
                   </div>
               
                <Link to="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_company"><i className="la la-plus-circle" /> Add Company</Link>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
        <div className="filter-filelds" id="filter_inputs" style={{ display: fieldInputs ? "block" : "none" }} >
          <div className="row filter-row">
            <div className="col-xl-2">
              <div
                className={
                  focused || inputValue !== ""
                    ? "input-block form-focus focused"
                    : "input-block form-focus"
                }
              >
                <input
                  type="text"
                  className="form-control floating"
                  value={inputValue}
                  onFocus={handleLabelClick}
                  onBlur={handleInputBlur}
                  onChange={handleInputChange}
                />
                <label className="focus-label" onClick={handleLabelClick}>
                  Company Name
                </label>
              </div>
            </div>
            <div className="col-xl-2">
              <div
                className={
                  focusedTwo || inputValueTwo !== ""
                    ? "input-block form-focus focused"
                    : "input-block form-focus"
                }
              >
                <input
                  type="text"
                  className="form-control floating"
                  value={inputValueTwo}
                  onFocus={handleLabelClickTwo}
                  onBlur={handleInputBlurTwo}
                  onChange={handleInputChangeTwo}
                />
                <label className="focus-label" onClick={handleLabelClickTwo}>
                  Email
                </label>
              </div>
            </div>
            <div className="col-xl-2">
              <div
                className={
                  focusedThree || inputValueThree !== ""
                    ? "input-block form-focus focused"
                    : "input-block form-focus"
                }
              >
                <input
                  type="text"
                  className="form-control floating"
                  value={inputValueThree}
                  onFocus={handleLabelClickThree}
                  onBlur={handleInputBlurThree}
                  onChange={handleInputChangeThree}
                />
                <label className="focus-label" onClick={handleLabelClickThree}>
                  Phone Number
                </label>
              </div>
            </div>
            <div className="col-xl-2">
              <div className="input-block mb-3 form-focus focused">
                <DateRangePicker initialSettings={initialSettings}>
                  <input
                    className="form-control  date-range bookingrange"
                    type="text"
                  />
                </DateRangePicker>
                <label className="focus-label">From - To Date</label>

              </div>
            </div>
            <div className="col-xl-2">
              <div className="input-block mb-3 form-focus select-focus">
                <Select
                  options={optionSort}
                  placeholder="--Select--"
                  className="select floating"
                  isSearchable={false}
                />
                <label className="focus-label">Location</label>
              </div>
            </div>
            <div className="col-xl-2">
              <Link to="#" className="btn btn-success w-100"> Search </Link>
            </div>
          </div>
        </div>
        <hr />
        {/* /Search Filter */}
        <div className="filter-section filter-bottom">
          <ul>
            <li>
              <div className="view-icons">
                <Link to="/companies" className="list-view btn btn-link active"><i className="las la-list" /></Link>
                <Link to="/companies-grid" className="grid-view btn btn-link"><i className="las la-th" /></Link>
              </div>
            </li>
            <li>
              
            </li>
            <li>

              
            </li>
            <li>
          
            </li>
          </ul>
        </div>
        <div className="row mt-4">




            {companyData.map((item) => 
            <div className="col-xxl-3 col-xl-4 col-md-6">
            
                
              <div className="contact-grid">
                <div className="grid-head">
                  <div className="users-profile">
                    <Link to="#" >
                      <img style={{width:"75px", height:"75px",borderRadius:"50%",marginRight:"20px"}} src={`https://hr.tanaghomtech.com/portal/storage/app/public/${item?.image}`} alt="Img" />
                    </Link>
                    <h5 className="name-user">
                      <h5 to="#">{item.companyName}</h5>
                     
                    </h5>
                  </div>
                  <div className="dropdown">
                    <Link to="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></Link>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#edit_company" onClick={()=>setEditcompanyy(item)}><i className="fa-solid fa-pencil m-r-5" /> Edit</Link>
                      <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#delete_company"onClick={()=>setDeletecompanyy(item)}><i className="fa-regular fa-trash-can m-r-5" /> Delete</Link>
                      <Link className="dropdown-item" to="/company-details"><i className="fa-regular fa-eye" /> Preview</Link>
                    </div>
                  </div>
                </div>
                <div className="grid-body">
                  <div className="address-info">
                 
                    <span>license number: {item.license_number}</span>
                    <span>license release: {item.license_release}</span>
                    <span>license expiry: {item.license_expiry}</span>
                  </div>
                 
                </div>

                <div className="grid-footer d-flex justify-content-between">
            {/* <ul className="social-links d-flex align-items-center">
              <li>
                <Link to="mailto:"><i className="la la-envelope" /></Link>
              </li>
              <li>
                <Link to="#"><i className="la la-phone-volume" /></Link>
              </li>
              <li>
                <Link to="#"><i className="lab la-facebook-messenger" /></Link>
              </li>
              <li>
                <Link to="#"><i className="la la-skype" /></Link>
              </li>
              <li>
                <Link to="#"><i className="la la-facebook " /></Link>
              </li>
            </ul> */}
           
          </div>
          
              </div>  
            </div> )}
       



            <CompaniesModal setCompanyData={setCompanyData} users={companyData} getCompanyData={getCompanyData} selectedUserDelete={deletecompanyy} selectedUser={editcompanyy}/>




          {/* <div className="col-lg-12">
            <div className="load-more-btn text-center">
              <Link to="#" className="btn btn-primary">Load More Companies<i className="spinner-border" /></Link>
            </div>
          </div> */}
        </div>
      </div>
   
    </div>


  )
}

export default CompaniesGrid