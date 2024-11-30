import React from "react";
import { Link } from "react-router-dom";

const Component = () => {
  return (
    <>
      {/*  */}
      <div className=" stickyside" id="">
        <div className="-inner slimscroll">
          <div id="-menu" className="-menu">
            <ul>
              <li className="menu-title">Components</li>
              <li>
                <Link to="#comp_alerts" className="active">
                  Alerts
                </Link>
              </li>
              <li>
                <Link to="#comp_breadcrumbs">Breadcrumbs</Link>
              </li>
              <li>
                <Link to="#comp_buttons">Buttons</Link>
              </li>
              <li>
                <Link to="#comp_cards">Cards</Link>
              </li>
              <li>
                <Link to="#comp_dropdowns">Dropdowns</Link>
              </li>
              <li>
                <Link to="#comp_pagination">Pagination</Link>
              </li>
              <li>
                <Link to="#comp_progress">Progress</Link>
              </li>
              <li>
                <Link to="#comp_tabs">Tabs</Link>
              </li>
              <li>
                <Link to="#comp_typography">Typography</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* / */}
    </>
  );
};

export default Component;
