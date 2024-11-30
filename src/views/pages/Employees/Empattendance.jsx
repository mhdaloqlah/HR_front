import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Input, Button, Select } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
function Empattendance() {
    const { id } = useParams();
    const [result, setResult] = useState([]);
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");
    const [editingRow, setEditingRow] = useState(null);
    const [editingData, setEditingData] = useState({});
    const [employeedata, setEmployeedata]= useState([])
    
    const { Option } = Select;
    const items = [
      {
        key: 'leave',
        label: 'leave',
        children: [
          {
            key: '1-1',
            label: 'Item 1',
            type: 'group',
            children: [
              {
                key: '1',
                label: 'sick leave',
              },
              {
                key: '2',
                label:  'vacation leave',
              },
              {
                key: '3',
                label:  ' leave',
              },
            ],
          },
      
        ],
      },
      
    ];
    const getEmployeeData = async () => {
        try {
          const response = await axios.get(
            "https://hr.tanaghomtech.com/portal/public/api/employee"
          );
          const filteredItems = response.data.data.filter(item => item.id == id);
          setEmployeedata(filteredItems);
          console.log("id", id);
          
          console.log("filteredItems",filteredItems.map((i)=>i.id));
        
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      };
      const onClick = (e) => {
        console.log('click', e);
      };
      useEffect(() => {
        getEmployeeData();
        
      }, []);
   
      const name = employeedata.map(i=> i.first_name)
      const name2 = employeedata.map(i=> i.last_name)
    const handleInputChange = (rowId, field, value) => {
        setEditingData(prevState => ({
            ...prevState,
            [rowId]: {
                ...prevState[rowId],
                [field]: value
            }
        }));
    };
    const search = async () => {
        try {
            const response = await axios.get(
                `https://hr.tanaghomtech.com/portal/public/api/employeeattendance?employee_id=${id}&date_from=${date1}&date_to=${date2}`
            );
            setResult(response.data.data);
        } catch (error) {
            console.error("Error fetching department data:", error);
        }
    };

    const enableEdit = (rowId) => {
        setEditingRow(rowId);
        const rowData = result.find(row => row.id === rowId);
        console.log(rowData);
        
        setEditingData({ [rowId]: rowData });
    };

    const saveChanges = async(rowId) => {
       console.log(rowId);
       
        try {
            const response = await axios.post(
              "https://hr.tanaghomtech.com/portal/public/api/updateAttendance",
              editingData[rowId]
            );
            //setResult(response.data.data)
            console.log("response", editingData[rowId]);
          } catch (error) {
            console.error("Error fetching department data:", error);
          }
        // After saving, you can disable editing mode
        setEditingRow(null);
        search()
    };
    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'long' }); // Returns day of the week in user's locale
    };

    const columns = [
        {
            title: "Date",
            dataIndex:  "date",
             
      sorter: (a, b) => a.name.length - b.name.length,
        } , {
            title: "Day",
            dataIndex: "date",
            render: (text) => 
              `${getDayOfWeek(text)}`, // Displays the day of the week
        },
        {
            title: "TimeIn",
            dataIndex: "CheckInTime",
            render: (text, record) =>
                editingRow === record.id ? (
                    <Input
                        value={editingData[record.id]?.CheckInTime || ""}
                        onChange={(e) => handleInputChange(record.id, 'CheckInTime', e.target.value)}
                        type='time'
                    />
                ) : text,
        },
        {
            title: "TimeOut",
            dataIndex: "CheckOutTime",
            render: (text, record) =>
                editingRow === record.id ? (
                    <Input
                        value={editingData[record.id]?.CheckOutTime || ""}
                        onChange={(e) => handleInputChange(record.id, 'CheckOutTime', e.target.value)}
                        type='time'
                    />
                ) : text,
        },
        {
            title: "Working Hours",
            dataIndex: "workingHours",
            render: (text, record) =>
                editingRow === record.id ? (
                    // During editing, show the text but limit to 5 characters
                    (editingData[record.id]?.workingHours || "").toString().slice(0, 5)
                ) : (
                    // When not editing, also display a maximum of 5 characters
                    text.toString().slice(0, 5)
                ),
        },
        
        {
  title: "Status",
  dataIndex: "Status",
  render: (text, record) =>
    editingRow === record.id ? (
      <>
        <Select
          value={editingData[record.id]?.Status || ""}
          onChange={(value) => handleInputChange(record.id, 'Status', value)}
          style={{ width: 120 }}
        >
          <Option value="Present">Present</Option>
          <Option value="Absent">Absent</Option>
          <Option value="Holiday">Holiday</Option>
          <Option value="Weekend">Weekend</Option>
          <Option value="New labour">New labour</Option>
          <Option value="Sick without sick leave">Sick without sick leave</Option>
          <Option value="Emergency">Emergency</Option>
          <Option value="Death vacation">Death vacation</Option>
          <Option value="leave">Leave</Option>
        </Select>

        {/* Sub-options appear when "Leave" is selected */}
        {editingData[record.id]?.Status === "leave" && (
          <Menu
          onClick={onClick}
          style={{
            width: 256,
          }}
          mode="vertical"
          items={items}
        />
          // <Select
          //   value={editingData[record.id]?.LeaveType || ""}
          //   onChange={(value) => handleInputChange(record.id, 'LeaveType', value)}
          //   style={{ width: 120, marginTop: 8 }}
          //   dropdownRender={menu => (
          //     <>
          //       {menu}
          //       <div style={{ padding: '4px 8px' }}>
          //         <Option value="Sickleave">Sick leave</Option>
          //         <Option value="Vacationleave">Vacation leave</Option>
          //       </div>
          //     </>
          //   )}
          // >
          //   {/* This part is to simulate the sub-options */}
          //   <Option value="Sickleave">Sick leave</Option>
          //   <Option value="Vacationleave">Vacation leave</Option>
          // </Select>
        )}
      </>
    ) : text,
}

     ,     
        {
            title: "Actions",
            render: (text, record) =>
                editingRow === record.id ? (
                    <Button type="primary" style={{backgroundColor:"#55CE63"}} onClick={() => saveChanges(record.id)}>
                        Save
                    </Button>
                ) : (
                    <Button type="default" onClick={() => enableEdit(record.id)}>
                        Update
                    </Button>
                ),
        },
    ];

    

   
    return (
        <div>
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <Breadcrumbs
                        maintitle={` ${name} ${name2}'s Attendance `}
                        title="Dashboard"
                        subtitle="Attendance"
                        modal="#add_employee"
                        name="Add Employee"
                    />
                    <div className="row filter-row">
                        <div className="col-sm-6 col-md-3">
                            <label>From:</label>
                            <input
                                type='date'
                                value={date1}
                                onChange={(e) => setDate1(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <label>To:</label>
                            <input
                                type='date'
                                value={date2}
                                onChange={(e) => setDate2(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="col-sm-6 col-md-3"></div>
                        <div className="col-sm-6 col-md-3">
                            <button onClick={search} style={{ marginTop: "20px" }} className="btn btn-success btn-block w-100">
                                Search
                            </button>
                        </div>
                    </div>
                    <div>
                        <Table
                            className="table-striped"
                            style={{ overflowX: "auto", marginTop: "20px" }}
                            columns={columns}
                            dataSource={result}
                            rowKey={(record) => record.id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Empattendance;
