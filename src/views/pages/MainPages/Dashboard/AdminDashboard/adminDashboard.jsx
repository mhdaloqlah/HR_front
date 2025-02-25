import React, { useEffect, useState } from "react";
import axios from "axios";

import Breadcrumbs from "../../../../../components/Breadcrumbs";
import { base_url } from "../../../../../base_urls";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // axios.get(base_url + "/api/dash.json").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs maintitle="Welcome Admin!" title="Dashboard" />
          {/* /Page Header */}
          <div className="row">
            {Array.isArray(users) && users.length > 0 ? (
              users.map((item, index) => (
                <div
                  className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                  key={index}
                >
                  <div className="card dash-widget">
                    <div className="card-body">
                      <span className={`dash-widget-icon ${item.icon}`} />
                      <div className="dash-widget-info">
                        <h3>{item.number}</h3>
                        <span>{item.label}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
          {/* /Charts */}
         
          {/* /Charts */}
         
          <div className="row">
           
          </div>

          <div className="row">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
