import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import Select from "react-select";
import CompaniesModal from "../../../components/modelpopup/CompaniesModal";
import DateRangePicker from "react-bootstrap-daterangepicker";
import AddNotes from "../../../components/modelpopup/Crm/AddNotes";
import axios from "axios";

const Companies = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [fieldInputs, setFieldInputs] = useState(false);
  const [focused, setFocused] = useState(false);
  const [focusedTwo, setFocusedTwo] = useState(false);
  const [focusedThree, setFocusedThree] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValueTwo, setInputValueTwo] = useState("");
  const [inputValueThree, setInputValueThree] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); 
  const [companyData, setCompanyData] = useState([]);
  const getCompanyData = async () => {
    await axios
      .get("https://hr.tanaghomtech.com/portal/public/api/company")
      .then((response) => {
        setCompanyData(response.data);
      });
      console.log("companyData",companyData);
      
  };
console.log("selected", selectedUser)
  useEffect(() => {
    getCompanyData();
  }, []);


 
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="d-flex">
          <div>
            <div className="set-star star-select star-position">
              <i className={record.stars} />
            </div>
          </div>
          <div>
            <h2 className="table-avatar d-flex align-items-center table-padding">
              <Link to="/company-details" className="company-img">
                <img style={{borderRadius:"50%",width:'30px',height:"30px"}} src={`https://hr.tanaghomtech.com/portal/storage/app/public/${record?.image}`} alt="img" />
              </Link>
              <Link to={`/company-details/${record.id}`} className="profile-split">
                {record.companyName}
              </Link>
            </h2>
          </div>
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },

    {
      title: "License number",
      dataIndex: "license_number",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },

    {
      title: "License release",
      dataIndex: "license_release",
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: "License expiry",
      dataIndex: "license_expiry",
      sorter: (a, b) => a.location.length - b.location.length,
    },

   
    {
      title: "Action",
      sorter: "true",
      render: (record) => (
       
        <div className="dropdown dropdown-action text-end">
          <Link
            to="#"
            className="action-icon dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit_company"
              onClick={() => setSelectedUser(record)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_company"
              onClick={() => setSelectedUser(record)}
            >
              <i className="fa fa-trash m-r-5" /> Delete
            </Link>
            <Link onClick={() => setSelectedUser(record)} className="dropdown-item" to={`/company-details/${record.id}`}>
              <i className="fa-regular fa-eye"></i> Preview
            </Link>

            {/* <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#add_notes"
            >
              <i class="la la-file-prescription"></i> Notes
            </Link> */}
          </div>
        </div>
      ),
    },
  ];

  const optionSort = [
    { value: "Germany", label: "Germany" },
    { value: "USA", label: "USA" },
    { value: "Canada", label: "Canada" },
    { value: "India", label: "India" },
    { value: "China", label: "China" },
  ];

  const optionsSortValue = [
    { value: "sortAlphabet", label: "Sort By Alphabet" },
    { value: "ascending", label: "Ascending" },
    { value: "descending", label: "Descending" },
    { value: "recentlyViewed", label: "Recently Viewed" },
    { value: "recentlyAdded", label: "Recently Added" },
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
    maximizeBtn.addEventListener("click", handleClick);

    // Cleanup function to remove the event listener and exit fullscreen on component unmount
    return () => {
      maximizeBtn.removeEventListener("click", handleClick);
      cleanup();
    };
  }, [isFullScreen]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#ff9b44",
      },
    }),
  };

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
                <li className="breadcrumb-item">
                  <Link to="/admin-dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Companies</li>
              </ul>
            </div>
            <div className="col-md-8 float-end ms-auto">
              <div className="d-flex title-head">
                <div className="view-icons">
                
                  <Link
                    to="#"
                    className="list-view btn btn-link"
                    id="collapse-header"
                    ref={maximizeBtnRef}
                  >
                    <i className="las la-expand-arrows-alt" />
                  </Link>
               
                </div>
                <div className="form-sort">
                 
                </div>
                <Link
                  to="#"
                  className="btn add-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#add_company"
                   aria-label="Close"
                >
                  <i className="la la-plus-circle" /> Add Company
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
        <div
          className="filter-filelds"
          id="filter_inputs"
          style={{ display: fieldInputs ? "block" : "none" }}
        >
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
                  styles={customStyles}
                />
                <label className="focus-label">Location</label>
              </div>
            </div>
            <div className="col-xl-2">
              <Link to="#" className="btn btn-success w-100">
                {" "}
                Search{" "}
              </Link>
            </div>
          </div>
        </div>
        <hr />
        {/* /Search Filter */}
        <div className="filter-section filter-bottom">
          <ul>
            <li>
              <div className="view-icons">
                <Link to="/companies" className="list-view btn btn-link active">
                  <i className="las la-list" />
                </Link>
                <Link to="/companies-grid" className="grid-view btn btn-link">
                  <i className="las la-th" />
                </Link>
              </div>
            </li>
            <li>
              
            </li>
            <li>
             
            </li>
      
          </ul>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                columns={columns}
                dataSource={companyData.data}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      </div>
      <CompaniesModal setCompanyData={setCompanyData} users={companyData} getCompanyData={getCompanyData} selectedUserDelete={selectedUser} selectedUser={selectedUser}/>
      {/* <AddNotes /> */}
    </div>
  );
};

export default Companies;
