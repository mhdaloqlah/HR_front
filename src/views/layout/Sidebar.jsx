/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";
// import { withRouter } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "./sidebardata";
import * as Icon from 'react-feather';


const Sidebar = () => {
  const location = useLocation();
  // const pathname = location.pathname.split("/")[1];
  const pathname = location.pathname;
  // console.log("pageurl", pathname);

  const [sidebarData, setSidebarData] = useState(SidebarData); 
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMouseOverSidebar, setMouseOverSidebar] = useState(false);
  const [submenuDrop ,setSubmenudrop,] = useState(false);

  const [isSideMenu, setSideMenu] = useState("");
  const [level2Menu, setLevel2Menu] = useState("");
  const [level3Menu, setLevel3Menu] = useState("");
  const [isSideMenunew, setSideMenuNew] = useState("dashboard");

  

  useEffect(() => {
    if (
      isMouseOverSidebar &&
      document.body.classList.contains("mini-sidebar")
    ) {
      document.body.classList.add("expand-menu");
      return;
    }
    document.body.classList.remove("expand-menu");
  }, [isMouseOverSidebar]);


  

  const handleMouseEnter = () => {
    setMouseOverSidebar(true);
  };

  const handleMouseLeave = () => {
    setMouseOverSidebar(false);
  };
  const { t } = useTranslation();


  const expandSubMenus = (menu) => {
    sessionStorage.setItem('menuValue', menu.menuValue);
    const updatedAdminSidebar = sidebarData.map((section) => {
      const updatedSection = { ...section };
      updatedSection.menu = section.menu.map((menuItem) =>
        menu.menuValue != menuItem.menuValue
          ? {
              ...menuItem,
              showSubRoute: false,
            }
          : {
              ...menuItem,
              showSubRoute: !menu.showSubRoute,
            },
      );
      return updatedSection;
    });
    setSidebarData(updatedAdminSidebar);
  };

  const activeRouterPath = (routesArray) => {
    return (routesArray = Location.pathname);

  };


  const activeRouterMenu = (menu) => {
    return Location.pathname.includes(menu.toLowerCase());
  };
  
  const arrowDrop=()=>{
    setSubmenudrop(!submenuDrop);
  }


  const toggleSidebar = (value) => {
    setSideMenu(value);
    setSideMenuNew(value);
  };

  const toggleLvelTwo = (value) => {
    setLevel2Menu(value);
  };
  const toggleLevelThree = (value) => {
    setLevel3Menu(value);
  };


  const MenuMore = () => {
    document.getElementById("more-menu-hidden").classList.toggle("hidden");
  };
  return (
    <div
      className={`sidebar `}
      id="sidebar"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar-inner slimscroll" style={{ overflow: false }}>
        <div id="sidebar-menu" className="sidebar-menu">  
        <nav className="greedys sidebar-horizantal" id="horizantal-sidebar">

        <ul className="list-inline-item list-unstyled links">
              <li className="menu-title">
                {/* <span> {t("main")}</span> */}
              </li>

              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "dashboard" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "dashboard" ? "" : "dashboard")
                  }
                >
                  <i className="la la-dashcube" />
                  <span> {t("dashboard")}</span>
                  <span className="menu-arrow" />
                </Link>
              
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "apps" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "apps" ? "" : "apps")
                  }
                >
                  <i className="la la-cube" /> <span> {t("Apps")}</span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "apps" ? (
                  <ul>
                    <li>
                      <Link
                        onClick={() =>
                          localStorage.setItem("minheight", "true")
                        }
                        to="/call/chat"
                      >
                        {t("Chat")}
                      </Link>
                    </li>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={level2Menu == "calls" ? "subdrop" : ""}
                        onClick={() =>
                          toggleLvelTwo(level2Menu == "calls" ? "" : "calls")
                        }
                      >
                        <span> {t("Calls")}</span>{" "}
                        <span className="menu-arrow" />
                      </Link>
                      {level2Menu == "calls" ? (
                        <ul>
                          <li>
                            <Link
                              onClick={() =>
                                localStorage.setItem("minheight", "true")
                              }
                              to="/call/voice-call"
                            >
                              {t("VideoCall")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() =>
                                localStorage.setItem("minheight", "true")
                              }
                              to="/call/video-call"
                            >
                              {t("VideoCall")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() =>
                                localStorage.setItem("minheight", "true")
                              }
                              to="/call/outgoing-call"
                            >
                              {t("OutgoingCall")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() =>
                                localStorage.setItem("minheight", "true")
                              }
                              to="/call/incoming-call"
                            >
                              {t("IncomingCall")}
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    <li>
                      <Link
                        className={pathname.includes("events") ? "active" : ""}
                        to="/events"
                      >
                        {t("Calendar")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() =>
                          localStorage.setItem("minheight", "true")
                        }
                        className={
                          pathname.includes("contacts") ? "active" : ""
                        }
                        to="/contacts"
                      >
                        {t("Contacts")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/email/inbox">{t("Email")}</Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("file-manager") ? "active" : ""
                        }
                        to="/file-manager"
                      >
                        {t("FileManager")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="menu-title">
                <span>{t("employees")}</span>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "employee" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "employee" ? "" : "employee")
                  }
                >
                  <i className="la la-user" />
                  <span className="noti-dot"> {t("Employee")}</span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "employee" ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("employees")
                            ? "active"
                            : pathname.includes("employees-list")
                            ? "active"
                            : ""
                        }
                        to="/employees"
                      >
                        {t("All Employee")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("addresses")
                            ? "active"
                            : pathname.includes("addresses")
                            ? "active"
                            : ""
                        }
                        to="/addresses"
                      >
                        {t("All Employee")}
                      </Link>
                    </li>
                    <li>
                      {/* <Link
                        className={
                          pathname.includes("holidays") ? "active" : ""
                        }
                        to="/holidays"
                      >
                        {t("Holidays")}
                      </Link> */}
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("adminleaves") ? "active" : ""
                        }
                        to="/adminleaves"
                      >
                        {t("Leaves (Admin)")}
                        <span className="badge rounded-pill bg-primary float-end">
                          1
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("leaves-employee") ? "active" : ""
                        }
                        to="/leaves-employee"
                      >
                        {t("Leaves (Employee)")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("leave-settings") ? "active" : ""
                        }
                        to="/leave-settings"
                      >
                        {t("Leave Setting")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("adminattendance") ? "active" : ""
                        }
                        to="/adminattendance"
                      >
                        {t("Attendance (Admin)")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("attendance-employee")
                            ? "active"
                            : ""
                        }
                        to="/attendance-employee"
                      >
                        {t("Attendance (Employee)")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("departments") ? "active" : ""
                        }
                        to="/departments"
                      >
                        {t("Department")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("designations") ? "active" : ""
                        }
                        to="/designations"
                      >
                        {t("Designation")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("timesheet") ? "active" : ""
                        }
                        to="/timesheet"
                      >
                        {t("Timesheet")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("shift-scheduling") ||
                          pathname.includes("shift-list")
                            ? "active"
                            : ""
                        }
                        to="/shift-scheduling"
                      >
                        {t("Shift & Schedule")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("overtime") ? "active" : ""
                        }
                        to="/overtime"
                      >
                        {t("Overtime")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className={pathname.includes("clients") ? "active" : ""}>
                <Link to="/clients">
                  <i className="la la-users" /> <span>{t("Clients")}</span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "projects" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "projects" ? "" : "projects")
                  }
                >
                  <i className="la la-rocket" /> <span> {t("Projects")}</span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "projects" ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("projects")
                            ? "active"
                            : pathname.includes("project-list")
                            ? "active"
                            : pathname.includes("project-view")
                            ? "active"
                            : ""
                        }
                        to="/projects"
                      >
                        {t("Projects")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() =>
                          localStorage.setItem("minheight", "true")
                        }
                        to="/task/tasks"
                      >
                        {t("Task")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("task-board") ? "active" : ""
                        }
                        to="/task-board"
                      >
                        {t("Task Board")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>

              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "Crm" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "Crm" ? "" : "Crm")
                  }
                >
                  <i className="la la-ticket" /> <span> {t("Crm")}</span>
                  <span className="menu-arrow" />
                </Link>
                {/* {isSideMenu == "Crm" ? (
                  <ul>
                    <li>
                      <Link
                        // className={
                        //   pathname.includes("projects")
                        //     ? "active"
                        //     : pathname.includes("project-list")
                        //     ? "active"
                        //     : pathname.includes("project-view")
                        //     ? "active"
                        //     : ""
                        // }
                        to="/contact-list"
                      >
                        {t("Contacts")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() =>
                          localStorage.setItem("minheight", "true")
                        }
                        to="/companies"
                      >
                        {t("Companies")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("deals") ? "active" : ""
                        }
                        to="/deals"
                      >
                        {t("Deals")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("leads") ? "active" : ""
                        }
                        to="/leads"
                      >
                        {t("Leads")}
                      </Link>
                    </li>

                    <li>
                      <Link
                        className={
                          pathname.includes("pipeline") ? "active" : ""
                        }
                        to="/pipeline"
                      >
                        {t("Pipeline")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("analytics") ? "active" : ""
                        }
                        to="/analytics"
                      >
                        {t("Analytics")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )} */}
              </li>
             
              <li
                className={
                  pathname.includes("tickets")
                    ? "active"
                    : pathname.includes("ticket-view")
                    ? "active"
                    : ""
                }
              >
                <Link to="/tickets">
                  <i className="la la-ticket" /> <span>{t("Tickets")}</span>
                </Link>
              </li>
              <li className="menu-title">
                <span>{t("hr")}</span>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "sales" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "sales" ? "" : "sales")
                  }
                >
                  <i className="la la-files-o" /> <span> {t("Sales")} </span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "sales" ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("estimates") ? "active" : ""
                        }
                        to="/estimates"
                      >
                        {t("Estimates")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("invoices") ? "active" : ""
                        }
                        to="/invoices"
                      >
                        {t("Invoices")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("payments") ? "active" : ""
                        }
                        to="/payments"
                      >
                        {t("Payments")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("expenses") ? "active" : ""
                        }
                        to="/expenses"
                      >
                        {t("Expenses")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("provident-fund") ? "active" : ""
                        }
                        to="/provident-fund"
                      >
                        {t("Provident Fund")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={pathname.includes("taxes") ? "active" : ""}
                        to="/taxes"
                      >
                        {t("Taxes")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
            </ul>
            <button
              className="viewmoremenu"
              id="more-menu"
              onClick={() => MenuMore()}
            >
              More Menu
            </button>
            <ul className="hidden-links hidden" id="more-menu-hidden">
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "accounting" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(
                      isSideMenu == "accounting" ? "" : "accounting"
                    )
                  }
                >
                  <i className="la la-files-o" />{" "}
                  <span> {t("Accounting")} </span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "accounting" ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("categories") ||
                          pathname.includes("sub-category")
                            ? "active"
                            : ""
                        }
                        to="/categories"
                      >
                        {t("Categories")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={pathname.includes("budgets") ? "active" : ""}
                        to="/budgets"
                      >
                        {t("Budgets")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("budget-expenses") ? "active" : ""
                        }
                        to="/budget-expenses"
                      >
                        {t("Budgets Expenses")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("budget-revenues") ? "active" : ""
                        }
                        to="/budget-revenues"
                      >
                        {t("Budgets Revenues")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "payroll" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "payroll" ? "" : "payroll")
                  }
                >
                  <i className="la la-money" />
                  <span> {t("Payroll")} </span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "payroll" ? (
                  <ul>
                    <li>
                      <Link
                        className={pathname.includes("salary") ? "active" : ""}
                        to="/salary"
                      >
                        {t("Employee Salary")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("salary-view") ? "active" : ""
                        }
                        to="/salary-view"
                      >
                        {t("Payslip")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("payroll-items") ? "active" : ""
                        }
                        to="/payroll-items"
                      >
                        {t("Payroll Items")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className={pathname.includes("policies") ? "active" : ""}>
                <Link to="/policies">
                  <i className="la la-file-pdf-o" />{" "}
                  <span>{t("Policies")}</span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "reports" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "reports" ? "" : "reports")
                  }
                >
                  <i className="la la-pie-chart" />{" "}
                  <span> {t("Reports")} </span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "reports" ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("expense-reports") ? "active" : ""
                        }
                        to="/expense-reports"
                      >
                        {t("Expense Report")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("invoice-reports") ? "active" : ""
                        }
                        to="/invoice-reports"
                      >
                        {t("Invoice Report")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("payments-reports") ? "active" : ""
                        }
                        to="/payments-reports"
                      >
                        {t("Payment Report")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("payments-reports") ? "active" : ""
                        }
                        to="/payments-reports"
                      >
                        {t("Project Report")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("task-reports") ? "active" : ""
                        }
                        to="/task-reports"
                      >
                        {t("Task Report")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("user-reports") ? "active" : ""
                        }
                        to="/user-reports"
                      >
                        {t("User Report")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("employee-reports") ? "active" : ""
                        }
                        to="/employee-reports"
                      >
                        {t("Employee Report")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("payslip-reports") ? "active" : ""
                        }
                        to="/payslip-reports"
                      >
                        {t("Payslip Report")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("attendance-reports")
                            ? "active"
                            : ""
                        }
                        to="/attendance-reports"
                      >
                        {t("Attendence Report")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("leave-reports") ? "active" : ""
                        }
                        to="/leave-reports"
                      >
                        {t("Leave Report")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("daily-reports") ? "active" : ""
                        }
                        to="/daily-reports"
                      >
                        {t("Daily Report")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="menu-title">
                <span> {t("Performance")}</span>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "performance" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(
                      isSideMenu == "performance" ? "" : "performance"
                    )
                  }
                >
                  <i className="la la-graduation-cap" />
                  <span> {t("Performance")}</span>{" "}
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "performance" ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("performance-indicator")
                            ? "active"
                            : ""
                        }
                        to="/performance-indicator"
                      >
                        {t("Performance Indicator")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("performance") ? "active" : ""
                        }
                        to="/performance"
                      >
                        {t("Performance Review")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("performance-appraisal")
                            ? "active"
                            : ""
                        }
                        to="/performance-appraisal"
                      >
                        {t("Performance Appraisal")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "goals" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "goals" ? "" : "goals")
                  }
                >
                  <i className="la la-crosshairs" /> <span> {t("Goals")} </span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "goals" ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("goal-tracking") ? "active" : ""
                        }
                        to="/goal-tracking"
                      >
                        {t("Goal List")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("goal-type") ? "active" : ""
                        }
                        to="/goal-type"
                      >
                        {t("Goal Type")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "training" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "training" ? "" : "training")
                  }
                >
                  <i className="la la-edit" /> <span> {t("Training")} </span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "training" ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("training") ||
                          pathname.includes("training-list")
                            ? "active"
                            : ""
                        }
                        to="/training"
                      >
                        {t("Training")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("trainers") ? "active" : ""
                        }
                        to="/trainers"
                      >
                        {t("Trainers")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("training-type") ? "active" : ""
                        }
                        to="/training-type"
                      >
                        {t("Training Type")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className={pathname.includes("promotion") ? "active" : ""}>
                <Link to="/promotion">
                  <i className="la la-bullhorn" /> <span>{t("Promotion")}</span>
                </Link>
              </li>
              <li className={pathname.includes("resignation") ? "active" : ""}>
                <Link to="/resignation">
                  <i className="la la-external-link-square" />
                  <span>{t("Resignation")}</span>
                </Link>
              </li>
              <li className={pathname.includes("termination") ? "active" : ""}>
                <Link to="/termination">
                  <i className="la la-times-circle" />
                  <span>{t("Termination")}</span>
                </Link>
              </li>
              <li className="menu-title">
                <span>{t("administration")}</span>
              </li>
              <li className={pathname.includes("assets") ? "active" : ""}>
                <Link to="/assets">
                  <i className="la la-object-ungroup" />{" "}
                  <span>{t("Assets")}</span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "jobs" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "jobs" ? "" : "jobs")
                  }
                >
                  <i className="la la-briefcase" /> <span> {t("Jobs")} </span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "jobs" ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("user-dashboard") ||
                          pathname.includes("user-all-jobs") ||
                          pathname.includes("saved-jobs") ||
                          pathname.includes("applied-jobs") ||
                          pathname.includes("interviewing") ||
                          pathname.includes("offered-jobs") ||
                          pathname.includes("visited-jobs") ||
                          pathname.includes("archived-jobs") ||
                          pathname.includes("job-aptitude") ||
                          pathname.includes("questions")
                            ? "active"
                            : ""
                        }
                        to="/user-dashboard"
                      >
                        {t("User Dashboard")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("jobs-dashboard") ? "active" : ""
                        }
                        to="/jobs-dashboard"
                      >
                        {t("Jobs Dashboard")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={pathname === "/jobs" ? "active" : ""}
                        to="/jobs"
                      >
                        {t("Manage Jobs")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("manage-resumes") ? "active" : ""
                        }
                        to="/manage-resumes"
                      >
                        {t("Manage Resume")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("shortlist-candidates")
                            ? "active"
                            : ""
                        }
                        to="/shortlist-candidates"
                      >
                        {t("Shortlisted Candidate")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname === "/interview-questions" ? "active" : ""
                        }
                        to="/interview-questions"
                      >
                        {t("Interview Question")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("offer_approvals") ? "active" : ""
                        }
                        to="/offer_approvals"
                      >
                        {t("Offer Approvals")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("experiance-level") ? "active" : ""
                        }
                        to="/experiance-level"
                      >
                        {t("Experience Level")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={pathname === "/candidates" ? "active" : ""}
                        to="/candidates"
                      >
                        {t("Candidate List")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("schedule-timing") ? "active" : ""
                        }
                        to="/schedule-timing"
                      >
                        {t("Schedule Timing")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("apptitude-result") ? "active" : ""
                        }
                        to="/apptitude-result"
                      >
                        {t("Aptitude Results")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li
                className={pathname.includes("knowledgebase") ? "active" : ""}
              >
                <Link to="/knowledgebase">
                  <i className="la la-question" />{" "}
                  <span>{t("Knowledgebase")}</span>
                </Link>
              </li>
              <li className={pathname.includes("activities") ? "active" : ""}>
                <Link to="/activities">
                  <i className="la la-bell" /> <span>{t("Activities")}</span>
                </Link>
              </li>
              <li className={pathname.includes("users") ? "active" : ""}>
                <Link to="/users">
                  <i className="la la-user-plus" /> <span>{t("User")}</span>
                </Link>
              </li>
              <li>
                <Link to="/settings/company-settings">
                  <i className="la la-cog" /> <span>{t("Settings")}</span>
                </Link>
              </li>
              <li className="menu-title">
                <span>{t("pages")}</span>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "profile" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "profile" ? "" : "profile")
                  }
                >
                  <i className="la la-user" /> <span> {t("Profile")} </span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "profile" ? (
                  <ul>
                    <li>
                      <Link
                        className={pathname.includes("profile") ? "active" : ""}
                        to="/profile"
                      >
                        {t("Employee Profile")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("client-profile") ? "active" : ""
                        }
                        to="/client-profile"
                      >
                        {t("Client Profile")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "authentication" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(
                      isSideMenu == "authentication" ? "" : "authentication"
                    )
                  }
                >
                  <i className="la la-key" />{" "}
                  <span> {t("Authentication")} </span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "authentication" ? (
                  <ul>
                    <li>
                      <Link to="/"> {t("Login")}</Link>
                    </li>
                    <li>
                      <Link to="/register">{t("Register")} </Link>
                    </li>
                    <li>
                      <Link to="/forgot-password">
                        {" "}
                        {t("Forgot Password")}{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="/otp">{t("OTP")}</Link>
                    </li>
                    <li>
                      <Link to="/lock-screen"> {t("Lock Screen")}</Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "error pages" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(
                      isSideMenu == "error pages" ? "" : "error pages"
                    )
                  }
                >
                  <i className="la la-exclamation-triangle" />
                  <span> Error Pages </span> <span className="menu-arrow" />
                </Link>
                {isSideMenu == "error pages" ? (
                  <ul>
                    <li>
                      <Link to="/error-404">{t("404 Error")} </Link>
                    </li>
                    <li>
                      <Link to="/error-500">{t("500 Error")} </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "subscriptions" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(
                      isSideMenu == "subscriptions" ? "" : "subscriptions"
                    )
                  }
                >
                  <i className="la la-hand-o-up" />
                  <span> {t("Subscriptions")} </span>{" "}
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "subscriptions" ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("subscriptions") ? "active" : ""
                        }
                        to="/subscriptions"
                      >
                        {t("Subscriptions (Admin)")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("subscriptions-company")
                            ? "active"
                            : ""
                        }
                        to="/subscriptions-company"
                      >
                        {t("Subscriptions (Company")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("subscribed-companies")
                            ? "active"
                            : ""
                        }
                        to="/subscribed-companies"
                      >
                        {t("Subscribed Companies")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "pages" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "pages" ? "" : "pages")
                  }
                >
                  <i className="la la-columns" /> <span>{t("Pages")} </span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "pages" ? (
                  <ul>
                    <li>
                      <Link
                        className={pathname.includes("search") ? "active" : ""}
                        to="/search"
                      >
                        {t("Search")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={pathname.includes("faq") ? "active" : ""}
                        to="/faq"
                      >
                        {t("FAQ")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={pathname.includes("terms") ? "active" : ""}
                        to="/terms"
                      >
                        {t("Terms")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("privacy-policy") ? "active" : ""
                        }
                        to="/privacy-policy"
                      >
                        {t("Privacy Policy")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("blank-page") ? "active" : ""
                        }
                        to="/blank-page"
                      >
                        {t("Blank Page")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="menu-title">
                <span>{t("uiInterface")}</span>
              </li>
              <li>
                <Link to="/ui/components">
                  <i className="la la-puzzle-piece" />{" "}
                  <span> {t("Components")}</span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "forms" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "forms" ? "" : "forms")
                  }
                >
                  <i className="la la-object-group" />{" "}
                  <span> {t("Forms")} </span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "forms" ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("form-basic-inputs") ? "active" : ""
                        }
                        to="/form-basic-inputs"
                      >
                        {t("Basic Inputs")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("form-input-groups") ? "active" : ""
                        }
                        to="/form-input-groups"
                      >
                        {t("Input Group")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("form-horizontal") ? "active" : ""
                        }
                        to="/form-horizontal"
                      >
                        {t("Horizontal Form")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("form-vertical") ? "active" : ""
                        }
                        to="/form-vertical"
                      >
                        {t("Vertical Form")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("form-mask") ? "active" : ""
                        }
                        to="/form-mask"
                      >
                        {t("Form Mask")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("form-validation") ? "active" : ""
                        }
                        to="/form-validation"
                      >
                        {t("Form Validation")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("form-select2") ? "active" : ""
                        }
                        to="/form-select2"
                      >
                        {t("Form Select2")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("file-upload") ? "active" : ""
                        }
                        to="/file-upload"
                      >
                        {t("Form Upload")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "tables" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "tables" ? "" : "tables")
                  }
                >
                  <i className="la la-table" /> <span> {t("Tables")} </span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "tables" ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("tables-basic") ? "active" : ""
                        }
                        to="/tables-basic"
                      >
                        {t("Basic Tables")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("data-tables") ? "active" : ""
                        }
                        to="/data-tables"
                      >
                        {t("Data Table")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="menu-title">
                <span>{t("extras")}</span>
              </li>
              <li>
                <Link to="#">
                  <i className="la la-file-text" />{" "}
                  <span> {t("Documentation")}</span>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="la la-info" /> <span>{t("Change Log")}</span>
                  <span className="badge badge-primary ms-auto">v3.4</span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "multi Level" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(
                      isSideMenu == "multi Level" ? "" : "multi Level"
                    )
                  }
                >
                  <i className="la la-share-alt" />{" "}
                  <span>{t("Multi Level")}</span>
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "multi Level" ? (
                  <ul>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={level2Menu == "level 1" ? "subdrop" : ""}
                        onClick={() =>
                          toggleLvelTwo(
                            level2Menu == "level 1" ? "" : "level 1"
                          )
                        }
                      >
                        <span>{t("Level 1")}</span>{" "}
                        <span className="menu-arrow" />
                      </Link>
                      {level2Menu == "level 1" ? (
                        <ul>
                          <li>
                            <Link to="#">
                              <span>{t("Level 2")}</span>
                            </Link>
                          </li>
                          <li className="submenu">
                            <Link
                              to="#"
                              className={
                                level3Menu == "level 2" ? "subdrop" : ""
                              }
                              onClick={() =>
                                toggleLevelThree(
                                  level3Menu == "level 2" ? "" : "level 2"
                                )
                              }
                            >
                              <span>{t("Level 2")}</span>
                              <span className="menu-arrow" />
                            </Link>
                            {level3Menu == "level 2" ? (
                              <ul>
                                <li>
                                  <Link to="#">Level 3</Link>
                                </li>
                                <li>
                                  <Link to="#">Level 3</Link>
                                </li>
                              </ul>
                            ) : (
                              ""
                            )}
                          </li>
                          <li>
                            <Link to="#">
                              <span>{t("Level 2")}</span>
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    <li>
                      <Link to="#">
                        <span>{t("Level 1")}</span>
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </nav>     
         
         <ul className="two-col-bar" id="veritical-sidebar"> 
         
              {sidebarData.map((mainTittle, index) => {
                return (
                  <>
                   

                      <span>{t(mainTittle.tittle)}</span>
                      {mainTittle?.tittle === "CRM" ? (
                        <small class="newly-added-features">New</small>):("")
                      }
                   
                    {mainTittle.menu.map(
                      (menu, menuIndex) => {
                        return (
                          <>
                            {menu.hasSubRoute === false ? (
                              <li key={menuIndex + 1}  className={pathname == menu.route ? "active" : ""}>
                                <Link
                                  to={menu.route}
                                 
                                >
                                  {/* {menu.icon} */}
                                 {menu?.icon}
                                 
                                   <span>{t(menu.menuValue)}</span>
                                </Link>
                              </li>
                            ) : (
                              <li className="submenu">
                                <Link
                                  to="#"
                                  onClick={() => expandSubMenus(menu)}
                                  
                                  className={
                                    menu.showSubRoute  ? 'subdrop' : ''
                                  } 
                                >
                                 
                                  <i className={menu?.icon}/>
                                  <span className={menu?.menuValue == "Employees" ? "noti-dot" : ""}>{t(menu.menuValue)}</span>
                                  <span className="menu-arrow">
                                  
                                  </span>
                                </Link>
                                <ul
                                  style={{
                                    display: menu.showSubRoute
                                      ? 'block'
                                      : 'none',
                                  }}
                                >
                                  {menu.subMenus.map(
                                    (
                                      subMenus,
                                      subMenu,
                                    ) => {
                                      return (
                                        <>
                                      
                                      {/* {console.log(subMenus?.showMenuRoute)} */}
                                      {subMenus?.showMenuRoute === true ? (
                                          <li key={subMenu + 1}>
                                            <Link
                                              to={subMenus.route}
                                            

                                              className={submenuDrop ? "subdrop":""}
                                              onClick={arrowDrop}
                                              
                                            >
                                              {t(subMenus.menuValue)}
                                              <span className="menu-arrow" ></span>
                                            </Link>

                                            <ul style={{display: submenuDrop ? "block":"none"}}>
                                              {subMenus?.subMenusValues?.map((value,index)=>{
                                                return(
                                            <li key={index}>
                                              <span>
                                            <Link to={value.route}><span>{t(value.menuValue)} </span></Link>
                                            </span>
                                            </li>)})
                                      }
                                      </ul>
                                               </li>) :(
                                                                                      
                                              <li key={subMenu + 1}>
                                              <Link
                                                to={subMenus.route}
                                                
                                                className={pathname== subMenus?.route ? "active" : ""}
                                              >
                                                {t(subMenus.menuValue)}
                                              </Link>
                                              
                                              <ul>
                                              {subMenus?.subMenusValues?.map((value,index)=>{
                                                return(
                                            <li key={index}>

                                            <Link to={value.route} className={pathname== value?.route ? "active" : ""}
                                                >{t(value.menuValue)}</Link>
                                            </li>)})
                                            }
                                            </ul>
                                            </li>
                                          )

                                    }

                                          
                                        </>
                                      );
                                    },
                                  )}
                                </ul>
                              </li>
                            )}
                          </>
                        );
                      },
                    )}
                  </>
                );
              })}
            </ul>

 
        </div>
      </div>

    

      

    </div>
  );
};

export default Sidebar;
