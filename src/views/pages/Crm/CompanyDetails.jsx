import React, { useEffect, useRef,useState } from 'react'
import { avatar1, avatar19, avatar20, avatar21, avatar22, company_icon_01, company_icon_02, media35 } from '../../../Routes/ImagePath'
import { Link } from 'react-router-dom'
import Select from 'react-select';
import CompaniesDetailModal from '../../../components/modelpopup/CompaniesDetailModal';
import CompanyEditModal from '../../../components/modelpopup/Crm/CompanyEditModal';
import { Calendar, Edit, Mail, MessageCircle, MoreVertical, Phone, PlusCircle, Star, Trash2 } from 'react-feather';
import axios from "axios"
import { useParams } from 'react-router-dom';
const CompanyDetails = () => {
    const[companyData,setCompanyData]=useState()
  const { id } = useParams();
  console.log(id);
  

  const getCompanyData = async () => {
    await axios
      .get(`https://hr.tanaghomtech.com/portal/public/api/company/${id}`)
      .then((response) => {
        setCompanyData(response.data.data);
        console.log(response.data.data);
        
      });
     
      
  };

  useEffect(() => {
    getCompanyData();
  }, []);
    const optionsSortValue = [
        { value: 'sortDate', label: 'Sort By Date' },
        { value: 'ascending', label: 'Ascending' },
        { value: 'descending', label: 'Descending' }
        
      ];

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
            <li className="breadcrumb-item"><Link to="/admin-dashboard">Dashboard</Link></li>
            <li className="breadcrumb-item active">Companies</li>
          </ul>
        </div>
        <div className="col-md-8 float-end ms-auto">
          <div className="d-flex title-head">
            <div className="view-icons">
              <Link to="#" className="grid-view btn btn-link"><i className="las la-redo-alt" /></Link>
              <Link to="#" className="list-view btn btn-link" id="collapse-header" ref={maximizeBtnRef}><i className="las la-expand-arrows-alt" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* /Page Header */}
    <hr />
    <div className="row">
      {/* Contact User */}
      <div className="col-md-12">
        <div className="contact-head">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <ul className="contact-breadcrumb">
                <li><Link to="/companies"><i className="las la-arrow-left" /> Companies</Link></li>
                <li>{companyData?.companyName}</li>
              </ul>
            </div>
            <div className="col-sm-6 text-sm-end">
              <div className="contact-pagination">
                <p>1 of 40</p>
                <ul>
                  <li>
                    <Link to="/company-details"><i className="las la-arrow-left" /></Link>
                  </li>
                  <li>
                    <Link to="/company-details"><i className="las la-arrow-right" /></Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-wrap">
          <div className="contact-profile">
            <div className="avatar company-avatar">									
              <img style={{width:"80px",height:"80px"}} src={"https://hr.tanaghomtech.com/portal/storage/app/public/"+companyData?.image} alt="companyicon" />
            </div>
            <div className="name-user">
              <h4>{companyData?.companyName}</h4>
              <p><i className="las la-map-marker" />{companyData?.location}</p>
              {/* <div className="badge-rate">
                <p><i className="fa-solid fa-star" /> 5.0</p>
              </div> */}
            </div>
          </div>
          {/* <div className="contacts-action">
            <Link to="#" className="btn-icon text-warning"><i className="fa-solid fa-star" /></Link>
            <Link to="#" data-bs-toggle="modal" data-bs-target="#add_deals" className="btn btn-pink">   <PlusCircle className='me-1' size={15} />Add Deal</Link>
            <Link to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_compose"> <Mail className='me-1' size={15} />Send Email</Link>
            <Link to="/chat" className="btn-icon"><MessageCircle size={15} /></Link>
            <Link to="#" className="btn-icon" data-bs-toggle="modal" data-bs-target="#edit_company"><Edit size={15} /></Link>	
            <div className="dropdown">
              <Link to="#" className="dropdown-toggle marg-tp" data-bs-toggle="dropdown" aria-expanded="false"><MoreVertical size={15} /></Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#delete_company">Delete</Link>
              </div>
            </div>
          </div>	 */}
        </div>
      </div>
      {/* /Contact User */}
      {/* Contact Sidebar */}
      <div className="col-xl-6">
        <div className="card contact-sidebar">
          <h5>Basic Information</h5>
          <ul className="basic-info">
            <li>
              <span>
              <Mail size={15} />
              </span>
              <p>{companyData?.email}</p>
            </li>
            <li>
              <span>
              <Phone size={15} />
              </span>
              <p>{companyData?.phone1}</p>
              
            </li>
            <li>
              <span>
              <Calendar size={15} />
              </span>
              <p>{companyData?.about}</p>
            </li>
          </ul>
          <h5>Social Information</h5>
          <ul className="other-info">
            <li><span className="other-title">facebook</span><span>{companyData?.facebook}</span></li>
            <li><span className="other-title">linkedin</span><span>{companyData?.linkden}</span></li>
            <li><span className="other-title">whatsapp</span><span>{companyData?.whatsapp}</span></li>
            <li><span className="other-title">fax</span><span>{companyData?.fax}</span></li>
            <li><span className="other-title">instagram</span><span>{companyData?.instegram}</span></li>
            <li><span className="other-title">skype</span><span>{companyData?.skype}</span></li>
            <li><span className="other-title">twitter</span><span>{companyData?.twitter}</span></li>
            <li><span className="other-title">website</span><span>{companyData?.website}</span></li>
          </ul>								
        
          <h5>License  Information</h5>
          <ul className="other-info">
            <li><span className="other-title">License expiry</span><span>{companyData?.license_expiry}</span></li>
            <li><span className="other-title">License number</span><span>{companyData?.license_number}r</span></li>
            <li><span className="other-title">License release</span><span>{companyData?.license_release}</span></li>
            
          </ul>			
          {/* <h5>Social Profile</h5>
          <ul className="social-info">
            <li>
              <Link to="#"><i className="fa-brands fa-youtube" /></Link>
            </li>
            <li>
              <Link to="#"><i className="fa-brands fa-facebook-f" /></Link>
            </li>
            <li>
              <Link to="#"><i className="fa-brands fa-instagram" /></Link>
            </li>
            <li>
              <Link to="#"><i className="fa-brands fa-whatsapp" /></Link>
            </li>
            <li>
              <Link to="#"><i className="fa-brands fa-pinterest" /></Link>
            </li>
            <li>
              <Link to="#"><i className="fa-brands fa-linkedin" /></Link>
            </li>
          </ul>
          <h5>Settings</h5>
          <ul className="set-info">
            <li>
              <Link to="#"><i className="las la-upload" />Share Company</Link>
            </li>
            <li>
              <Link to="#"><Star />Add to Favourite</Link>
            </li>
            <li>
              <Link to="#" data-bs-toggle="modal" data-bs-target="#delete_company"><Trash2 />Delete Company</Link>
            </li>
          </ul> */}
        </div>
      </div>
      <div className="col-xl-6">
        <div className="card contact-sidebar">
         
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <h5>Employees work here</h5>
           
          </div>
          <ul className="company-info com-info">
           {
            companyData?.employees_hire?.map(employee =>( <li>
              <span>
                <img style={{borderRadius:"50%", width:"30px", height:"30px"}} src={"https://hr.tanaghomtech.com/portal/storage/app/public/"+employee?.image} alt="icon" />
              </span>
              <div>
                <h6>{employee?.first_name} {employee?.mid_name} {employee?.last_name}</h6>
                <p style={{color:"gray",fontSize:"12px"}}>{employee?.department_current?.name}</p>
              </div>
            </li>))
           }
           
          </ul>
          {/* <h5>Social Profile</h5>
          <ul className="social-info">
            <li>
              <Link to="#"><i className="fa-brands fa-youtube" /></Link>
            </li>
            <li>
              <Link to="#"><i className="fa-brands fa-facebook-f" /></Link>
            </li>
            <li>
              <Link to="#"><i className="fa-brands fa-instagram" /></Link>
            </li>
            <li>
              <Link to="#"><i className="fa-brands fa-whatsapp" /></Link>
            </li>
            <li>
              <Link to="#"><i className="fa-brands fa-pinterest" /></Link>
            </li>
            <li>
              <Link to="#"><i className="fa-brands fa-linkedin" /></Link>
            </li>
          </ul>
          <h5>Settings</h5>
          <ul className="set-info">
            <li>
              <Link to="#"><i className="las la-upload" />Share Company</Link>
            </li>
            <li>
              <Link to="#"><Star />Add to Favourite</Link>
            </li>
            <li>
              <Link to="#" data-bs-toggle="modal" data-bs-target="#delete_company"><Trash2 />Delete Company</Link>
            </li>
          </ul> */}
        </div>
      </div>
      {/* /Contact Sidebar */}
      {/* Contact Details */}
     
      {/* /Contact Details */}
    </div>
  </div>

  <CompaniesDetailModal/>
  <CompanyEditModal/>
</div>

  )
}

export default CompanyDetails