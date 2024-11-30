import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { MDBBtnGroup, MDBRadio } from "mdb-react-ui-kit";
const Breadcrumbs = (props) => {
  const [active, setActive] = useState("grid");
const activeButton =() =>{
  localStorage.getItem("active", active)}
  const handleClick = (view) => {
    setActive(view); // Update the active view
  };
  const location = useLocation();
  let addButton = null;
  if (
    location.pathname === "/form-basic-inputs" ||
    location.pathname === "/form-input-groups" ||
    location.pathname === "/form-horizontal" ||
    location.pathname === "/form-vertical" ||
    location.pathname === "/form-mask" ||
    location.pathname === "/form-validation" ||
    location.pathname === "/tables-basic" ||
    location.pathname === "/data-tables" ||
    location.pathname === "/performance" ||
    location.pathname === "/payments" ||
    location.pathname === "/ui/components" ||
    location.pathname === "/adminattendance" ||
    location.pathname === "/attendance-employee" ||
    location.pathname === "/task-board" ||
    location.pathname === "/leads" ||
    location.pathname === "/create-estimate" ||
    location.pathname === "/edit-estimate" ||
    location.pathname === "/create-invoice" ||
    location.pathname === "/edit-invoice" ||
    location.pathname === "/payments" ||
    location.pathname === "/payroll-items" ||
    location.pathname === "/activities" ||
    location.pathname === "/expense-reports" ||
    location.pathname === "/invoice-reports" ||
    location.pathname === "/payments-reports" ||
    location.pathname === "/task-reports" ||
    location.pathname === "/user-reports" ||
    location.pathname === "/payslip-reports" ||
    location.pathname === "/attendance-reports" ||
    location.pathname === "/user-dashboard" ||
    location.pathname === "/user-all-jobs" ||
    location.pathname === "/saved-jobs" ||
    location.pathname === "/interviewing" ||
    location.pathname === "/offered-jobs" ||
    location.pathname === "/visited-jobs" ||
    location.pathname === "/knowledgebase" ||
    location.pathname === "/questions" ||
    location.pathname === "/jobs-dashboard" ||
    location.pathname === "/manage-resumes" ||
    location.pathname === "/shortlist-candidates" ||
    location.pathname === "/offer_approvals" ||
    location.pathname === "/schedule-timing" ||
    location.pathname === "/apptitude-result" ||
    location.pathname === "/job-aptitude" ||
    location.pathname === "/applied-jobs" ||
    location.pathname === "/offered-jobs" ||
    location.pathname === "/archived-jobs" ||
    location.pathname === "/subscriptions-company" ||
    location.pathname === "/subscribed-companies" ||
    location.pathname === "/profile/:id" ||
    location.pathname === "/job-list" ||
    location.pathname === "/job-view" ||
    location.pathname === "/search" ||
    location.pathname === "/faq" ||
    location.pathname === "/blank-page" ||
    location.pathname === "/user-asset-details" ||
    location.pathname === "/leaves-setting" ||
    location.pathname === "/project-reports" ||
    location.pathname === "/client-profile"
  ) {
    addButton = (
      <div className="row">
        <div className="col">
          <h3 className="page-title">{props.maintitle}</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin-dashboard">{props.title}</Link>
            </li>
            <li className="breadcrumb-item active">{props.subtitle}</li>
          </ul>
        </div>
      </div>
    );
  } else if (
    location.pathname === "/settings/company-settings" ||
    location.pathname === "/settings/localization" ||
    location.pathname === "/settings/theme-settings" ||
    location.pathname === "/settings/roles-permissions" ||
    location.pathname === "/settings/approval-setting" ||
    location.pathname === "/settings/invoice-settings" ||
    location.pathname === "/settings/salary-settings" ||
    location.pathname === "/settings/notifications-settings" ||
    location.pathname === "/settings/toxbox-setting" ||
    location.pathname === "/settings/cron-setting"

  ) {
    addButton = (
      <div className="row">
        <div className="col-sm-12">
          <h3 className="page-title">{props.maintitle}</h3>
        </div>
      </div>
    );
  } else if (location.pathname === "/admin-dashboard") {
    addButton = (
      <div className="row">
        <div className="col">
          <h3 className="page-title">{props.maintitle}</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item active">{props.title}</li>
          </ul>
        </div>
      </div>
    );
  } else if (location.pathname === "/invoice-view") {
    addButton = (
      <div className="row">
        <div className="col">
          <h3 className="page-title">{props.maintitle}</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin-dashboard">{props.title}</Link>
            </li>
            <li className="breadcrumb-item active">{props.subtitle}</li>
          </ul>
        </div>
        <div className="col-auto float-end ms-auto">
          <div className="btn-group btn-group-sm">
            <button className="btn btn-white">CSV</button>
            <button className="btn btn-white">PDF</button>
            <button className="btn btn-white">
              <i className="fa-solid fa-print fa-lg" /> Print
            </button>
          </div>
        </div>
      </div>
    );
  } else if (
    location.pathname === "/projects" ||
    location.pathname === "/clients" ||
    location.pathname === "/clients-list" ||
    location.pathname === "/project-list" ||
    location.pathname === "/employees" ||
    location.pathname === "/employees-list"
  ) {
    addButton = (
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title">{props.maintitle}</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin-dashboard">{props.title}</Link>
            </li>
            <li className="breadcrumb-item active">{props.subtitle}</li>
          </ul>
        </div>
        <div className="col-auto float-end ms-auto">
          <Link
            to="#"
            className="btn add-btn"
            data-bs-toggle="modal"
            data-bs-target={props.modal}
          >
            <i className="fa fa-plus" /> {props.name}
          </Link>
          <div className="view-icons">
            <div className="view-icons">
              <Link
                to={props.Linkname}
                className={`grid-view btn btn-link mx-2 ${active === "grid" ? "active" : ""}`}
                onClick={() => handleClick("grid")}
              >
                <i className="fa fa-th" />
              </Link>
              <Link
                to={props.Linkname1}
                className={`list-view btn btn-link ${active === "list" ? "active" : ""}`}
                onClick={() => handleClick("list")}
              >
                <i className="fa fa-bars" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (
    location.pathname === "/estimates" ||
    location.pathname === "/invoices" ||
 
    location.pathname === "/addattendance"

  ) {
    addButton = (
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title">{props.maintitle}</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin-dashboard">{props.title}</Link>
            </li>
            <li className="breadcrumb-item active">{props.subtitle}</li>
          </ul>
          <Card border="primary" style={{ width: '75rem',marginTop:"30px" }}>

            <Card.Body>
              <Card.Title>  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" color="#4D5154" fill="currentColor" class="bi bi-patch-exclamation-fill" viewBox="0 0 16 16">
                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg></Card.Title>
              <div style={{ display: "flex", justifyContent: "space-between" }}> <Card.Text style={{ fontSize: "28px" }}>
                {props.note}
              </Card.Text>
                <MDBBtnGroup>
                  <MDBRadio onClick={activeButton} btn btnColor='#FE8047' id='btn-radio' name='options' wrapperTag='span' label='Main Branch' />
                  <MDBRadio
                    btn
                    btnColor='#FE8047'
                    id='btn-radio2'
                    name='options'
                    wrapperClass='mx-2'
                    wrapperTag='span'
                    label='Site'
                    defaultChecked
                  />
                </MDBBtnGroup></div>
            </Card.Body>
          </Card>
     </div>
        {/* <div className="col-auto float-end ms-auto">
          <Link
            to={props.link}
            className="btn add-btn"
            data-bs-target={props.modal}
          >
            <i className="fa fa-plus" />
            {props.name}
          </Link>
        </div> */}
      </div>
    );
  } else if (
    location.pathname === "/employee-reports" ||
    location.pathname === "/leave-reports" ||
    location.pathname === "/daily-reports"
  ) {
    addButton = (
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title">{props.maintitle}</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin-dashboard">{props.title}</Link>
            </li>
            <li className="breadcrumb-item active">{props.subtitle}</li>
          </ul>
        </div>
        <div className="col-auto">
          <Link to="#" className="btn btn-primary">
            PDF
          </Link>
        </div>
      </div>
    );
  } else if (location.pathname === "/project-view") {
    addButton = (
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{props.maintitle}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin-dashboard">{props.title}</Link>
              </li>
              <li className="breadcrumb-item active">{props.subtitle}</li>
            </ul>
          </div>
          <div className="col-auto float-end ms-auto">
            <Link
              to="#"
              className="btn add-btn"
              data-bs-toggle="modal"
              data-bs-target="#edit_project"
            >
              <i className="fa-solid fa-plus"></i> {props.add}
            </Link>
            <Link
              to={props.menu}
              className="btn btn-white float-end me-3"
              data-bs-toggle="tooltip"
              title="Task Board"
            >
              <i className="fa-solid fa-bars"></i>
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (location.pathname === "/salary-view") {
    addButton = (
      <div className="row">
        <div className="col">
          <h3 className="page-title">{props.maintitle}</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">{props.title}</Link>
            </li>
            <li className="breadcrumb-item active">{props.subtitle}</li>
          </ul>
        </div>
        <div className="col-auto float-end ms-auto">
          <div className="btn-group btn-group-sm">
            <button className="btn btn-white">CSV</button>
            <button className="btn btn-white">PDF</button>
            <button className="btn btn-white">
              <i className="fa fa-print fa-lg" /> Print
            </button>
          </div>
        </div>
      </div>
    );
  } else if (location.pathname === "/interview-questions") {
    addButton = (
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title">{props.maintitle}</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">{props.title}</Link>
            </li>
            <li className="breadcrumb-item active">{props.subtitle}</li>
          </ul>
        </div>
        <div className="col-auto float-end ms-auto">
          <Link
            to="#"
            className="btn add-btn "
            data-bs-toggle="modal"
            data-bs-target={props.modalone}
          >
            <i className="fa fa-plus" />
            {props.nameone}
          </Link>

          <Link
            to="#"
            className="btn add-btn me-2"
            data-bs-toggle="modal"
            data-bs-target={props.modaltwo}
          >
            <i className="fa fa-plus" />
            {props.nametwo}
          </Link>
        </div>
      </div>
    );
  } else if(location.pathname === "/agreement") {
    addButton = (
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title">{props.maintitle}</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin-dashboard">{props.title}</Link>
            </li>
            <li className="breadcrumb-item active">{props.subtitle}</li>
          </ul>
        </div>
        <div className="col-auto float-end ms-auto">
          
        </div>
      </div>
    );
  } else {
    addButton = (
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title">{props.maintitle}</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin-dashboard">{props.title}</Link>
            </li>
            <li className="breadcrumb-item active">{props.subtitle}</li>
          </ul>
        </div>
        <div className="col-auto float-end ms-auto">
          <Link
            to="#"
            className="btn add-btn"
            data-bs-toggle="modal"
            data-bs-target={props.modal}
          >
            <i className="fa fa-plus" />
            {props.name}
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="page-header">{addButton}</div>
    </>
  );
};

export default Breadcrumbs;
