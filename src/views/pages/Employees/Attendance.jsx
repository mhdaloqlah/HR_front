import React, { useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Card } from 'react-bootstrap';
import { SyncLoader } from 'react-spinners';
import { MDBBtnGroup, MDBRadio } from 'mdb-react-ui-kit';

function Attendance() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('site');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null); // Clear previous errors
    } else {
      alert('Please select a valid file');
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        'https://hr.tanaghomtech.com/portal/public/api/attendances/importSite',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log('File uploaded successfully:', response.data.success);
      response.data.success ==true ? toast.success('File uploaded successfully!') : toast.error('Please select an excel file with extension .xlsx')
      
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload the file.');
    }

    setIsLoading(false);
  };

  const handleUpload2 = async () => {
    if (!selectedFile) {
      toast.error("Failed to upload the file.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        'https://hr.tanaghomtech.com/portal/public/api/attendances/import',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log('File uploaded successfully:', response.data);
      response.data.success ==true ? toast.success('File uploaded successfully!') : toast.error('Please select an excel file with extension .xlsx')
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload the file.');
    }

    setIsLoading(false);
  };
 
  
  return (
    <div>
      <div className="page-wrapper">
        <Toaster position="top-right" reverseOrder={false} />
        {isLoading ? (
          <div style={styles.loaderContainer}>
            <SyncLoader color="#FE8047" size={15} />
          </div>
        ) : (
          <div className="content container-fluid">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Attendance</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin-dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Attendance</li>
                  </ul>
                  <Card border="primary" style={{ width: '75rem', marginTop: "30px" }}>
                    <Card.Body>
                      <Card.Title>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" color="#4D5154" fill="currentColor" class="bi bi-patch-exclamation-fill" viewBox="0 0 16 16">
                          <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                      </Card.Title>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Card.Text style={{ fontSize: "28px" }}>
                          Please select what kind of attachment you want
                        </Card.Text>
                        <MDBBtnGroup>
                          <MDBRadio
                            defaultChecked
                            checked={selectedOption === 'main'}
                            onChange={() => setSelectedOption('main')}
                            btn btnColor='#FE8047'
                            id='btn-radio'
                            name='options'
                            wrapperTag='span'
                            label='Main Branch'
                          />
                          <MDBRadio
                            checked={selectedOption === 'site'}
                            onChange={() => setSelectedOption('site')}
                            btn
                            btnColor='#FE8047'
                            id='btn-radio2'
                            name='options'
                            wrapperClass='mx-2'
                            wrapperTag='span'
                            label='Site'
                          />
                        </MDBBtnGroup>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>

            {selectedOption === "main" && (
              <Card border="primary" style={{ width: '75rem' }}>
                <Card.Body>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card.Text style={{ fontSize: '28px' }}>The main file must be uploaded</Card.Text>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Link
                        style={{ marginTop: '15px', marginRight: '20px', color: '#FE8047', cursor: 'pointer' }}
                        onClick={() => document.getElementById('file-input').click()}
                      >
                        <i className="fa fa-plus" /> Uploads
                      </Link>

                      <input
                        type="file"
                        id="file-input"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />

                      <button
                        className="btn btn-primary"
                        onClick={handleUpload2}
                        disabled={!selectedFile}
                        style={{ marginTop: '20px', color: "#FE8047" }}
                      >
                        Upload
                      </button>

                      {error && <p style={{ color: 'red', marginLeft: '20px' }}>{error}</p>}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}

            {selectedOption === "site" && (
              <Card border="primary" style={{ width: '75rem' }}>
                <Card.Body>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card.Text style={{ fontSize: '28px' }}>The site file must be uploaded</Card.Text>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Link
                        style={{ marginTop: '15px', marginRight: '20px', color: '#FE8047', cursor: 'pointer' }}
                        onClick={() => document.getElementById('file-input').click()}
                      >
                        <i className="fa fa-plus" /> Uploads
                      </Link>

                      <input
                        type="file"
                        id="file-input"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />

                      <button
                        className="btn btn-primary"
                        onClick={handleUpload}
                        disabled={!selectedFile}
                        style={{ marginTop: '20px', color: "#FE8047" }}
                      >
                        Upload
                      </button>

                      {error && <p style={{ color: 'red', marginLeft: '20px' }}>{error}</p>}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  
};

export default Attendance;
