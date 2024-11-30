import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import axios from 'axios';
import { Table, Button } from 'antd';
import * as XLSX from 'sheetjs-style';


function AllemployeeAttend() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [result, setResult] = useState([]);
  const [dynamicColumns, setDynamicColumns] = useState([]);
  const [dayDifference, setDayDifference] = useState(0)
const[value,setValue] = useState()

const exportToExcel = () => {
  const numberOfWorkingDays = dayDifference + 1;

  // Prepare formatted data
  const processedData = result.map((employee, index) => {
    const attendanceData = {};
    employee.attendances.forEach(attendance => {
      const date = attendance.date;
      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
      attendanceData[`${date.slice(5)}\n${dayOfWeek}`] = attendance.workingHours || '00:00';
    });

    return {
      ID: index + 1,
      Name: employee.full_name,
      Job: employee.jobcurrent,
      Nationality: employee.nationality,
      ...attendanceData,
      "Total Present": employee.totalPresent,
      "Total Absent": employee.totalAbsent,
      "No of Working Days": numberOfWorkingDays,
    };
  });

  // Create an empty worksheet
  const worksheet = XLSX.utils.json_to_sheet([], { skipHeader: true });

  // Define column widths
  worksheet['!cols'] = [
    { wch: 10 }, // Counter
    { wch: 20 }, // Name
    { wch: 20 }, // Job
    { wch: 20 }, // Nationality
    ...Array(Object.keys(processedData[0]).length - 6).fill({ wch: 5}),
    { wch: 15 }, // Total Present
    { wch: 15 }, // Total Absent
    { wch: 20 }, // No. of Working Days
  ];

  // Define styles
  const headerStyle = {
    alignment: { horizontal: "center", vertical: "center", wrapText: true },
    font: { bold: true, color: { rgb: "000000" } },
    fill: { fgColor: { rgb: "C6E0B4" } },
    border: { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } },
  };

  const darkGreenHeaderStyle = {
    ...headerStyle,
    fill: { fgColor: { rgb: "375623" } }, // Dark green background for specific headers
    font: { bold: true, color: { rgb: "FFFFFF" } }, // White font
  };

  const defaultCellStyle = {
    alignment: { horizontal: "center", vertical: "center", wrapText: true },
    border: { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } },
  };

  // Merge row 0 and add titles
  worksheet['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: Object.keys(processedData[0]).length - 1 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: Object.keys(processedData[0]).length - 1 } },
  ];

  worksheet['A1'] = {
    v: value === "site" 
        ? "JVC SITE EROON BUILDING CONTRACTING" 
        : "MAIN BRANCH EMPLOYEE ATTENDANCE", 
    s: headerStyle,
  };

  worksheet['A3'] = {
    v: `TIME SHEET / MONTHLY SUMMARY ATTENDANCE SHEETS FROM ${date1} TO ${date2}`,
    s: {
      ...headerStyle,
      font: { bold: true, color: { rgb: "000000" }, sz: 15 },
    },
  };

  // Add headers at row 5
  const headers = Object.keys(processedData[0]);
  XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: { r: 4, c: 0 } });

  // Apply header styles
  headers.forEach((header, colIndex) => {
    const cellRef = XLSX.utils.encode_cell({ r: 4, c: colIndex });
    worksheet[cellRef].s = ['Total Present', 'Total Absent', 'No of Working Days'].includes(header)
      ? darkGreenHeaderStyle
      : headerStyle;
  });

  // Add data rows starting from row 6
  XLSX.utils.sheet_add_json(worksheet, processedData, { origin: { r: 5, c: 0 }, skipHeader: true });

  // Apply styles to data cells
  processedData.forEach((row, rowIndex) => {
    headers.forEach((header, colIndex) => {
      const cellRef = XLSX.utils.encode_cell({ r: rowIndex + 5, c: colIndex });
      worksheet[cellRef] = worksheet[cellRef] || {};
      worksheet[cellRef].s = defaultCellStyle;
    });
  });

  // Apply custom styles to attendance cells
  result.forEach((employee, rowIndex) => {
    employee.attendances.forEach(attendance => {
      const date = attendance.date;
      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
      const header = `${date.slice(5)}\n${dayOfWeek}`;
      const colIndex = headers.indexOf(header);

      if (colIndex !== -1) {
        const cellRef = XLSX.utils.encode_cell({ c: colIndex, r: rowIndex + 5 });
        const cellStyle = { ...defaultCellStyle };

        // Apply color from `status_color`
        const statusColor = attendance.status_color?.replace("#", "") || "FFFFFF";
        cellStyle.fill = { fgColor: { rgb: statusColor } };

        // If Sunday, override the color to green
        if (dayOfWeek === "Sun") {
          cellStyle.fill = { fgColor: { rgb: "92D050" } }; // Light green
        }

        worksheet[cellRef].s = cellStyle;
      }
    });
  });

  // Dynamically calculate the start row for the Leave Table
  const leaveStartRow = 5 + processedData.length + 2; // Adjust rows based on main data
  const leaveTableData = [
    ["Leave Name", "Code"],
    ["Absent", "A"],
    ["Sick Leave", "SL"],
    ["Vacation Leave", "VL"],
    ["New Labour", "NL"],
    ["sick without sick leave", "OP"],
    ["Emergency", "E"],
    ["Death Vacation", "DV"],
    ["HOLIDAY", "HLDY"],
    ["leave", ""]
  ];
  XLSX.utils.sheet_add_aoa(worksheet, leaveTableData, { origin: { r: leaveStartRow, c: 0 } });

  // Apply leave table styles
  leaveTableData.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellRef = XLSX.utils.encode_cell({ r: leaveStartRow + rowIndex, c: colIndex });
      worksheet[cellRef] = worksheet[cellRef] || { v: cell };

      if (rowIndex === 0) {
        worksheet[cellRef].s = headerStyle;
      } else if (colIndex === 1) {
        const cellColors = {
          "A": "FF0000",
          "SL": "FFFF00",
          "VL": "00B050",
          "NL": "FFC000",
          "OP": "7030A0",
          "E": "00B0F0",
          "DV": "002060",
          "HLDY": "92D050",
          "": "00FFFF"
        };
        const bgColor = cellColors[cell] || "FFFFFF";
        worksheet[cellRef].s = {
          alignment: { horizontal: "center", vertical: "center" },
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: bgColor } },
          border: { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } },
        };
      }
    });
  });

  // Create workbook and export
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
  XLSX.writeFile(workbook, "Employee_Attendance.xlsx");
};




const search = async () => {
    try {
      const response = await axios.get(
        `https://hr.tanaghomtech.com/portal/public/api/allemployeeattendance?date_from=${date1}&date_to=${date2}&bio_attend_location=${value}`
      );
      const data = response.data.data;

      const updatedData = data.map((item) => {
        const totalPresent = item.attendances.filter(attendance => 
          attendance.Status === "Present" || attendance.Status === "Weekend" || attendance.Status === "Holiday"
        ).length;
        const totalAbsent = item.attendances.filter(attendance => attendance.Status === "Absent" || attendance.Status === "Leave").length;
        return { ...item, totalPresent, totalAbsent };
      });
console.log("updatedData",updatedData);

      setResult(updatedData);
      generateDynamicColumns(updatedData);
  
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

const generateDynamicColumns = (data) => {
    const allDates = new Set();
    data.forEach(employee => {
      employee.attendances.forEach(attendance => {
        allDates.add(attendance.date);
      });
    });

    const dateColumns = Array.from(allDates).sort().map(date => {
      const formattedDate = new Date(date);
      const dayOfWeek = formattedDate.toLocaleDateString('en-US', { weekday: 'short' });
      const dateOnly = date.slice(5);
    
      return {
        title: (
          <div>
            {dateOnly} <br /> <span style={{ fontSize: '0.8em', color: '#888' }}>{dayOfWeek}</span>
          </div>
        ), 
        dataIndex: date,
        key: date,
        render: (text, record) => {
          const attendance = record.attendances.find(a => a.date === date);
          if (attendance) {
            if (attendance.CheckInTime && attendance.CheckOutTime) {
              const checkIn = new Date(`1970-01-01T${attendance.CheckInTime}Z`);
              const checkOut = new Date(`1970-01-01T${attendance.CheckOutTime}Z`);
              return <p 
              // style={{backgroundColor:attendance.status_color}}
              >{attendance.workingHours}</p>;
            } else {
              return '00:00';
            }
          } else {
            return '00:00';
          }
        }
      };
    });
    
    setDynamicColumns(dateColumns);
  };

  // Export to Excel function


const calculateDayDifference = () => {
    if (date1 && date2) {
      const startDate = new Date(date1);
      const endDate = new Date(date2);
      const differenceInTime = endDate - startDate;
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setDayDifference(differenceInDays);
    } else {
      setDayDifference(0);
    }
  };

  useEffect(() => {
    calculateDayDifference();
  }, [date1, date2]);

const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Job current",
      dataIndex: "jobcurrent",
      key: "jobcurrent",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
    ...dynamicColumns,
    {
      title: "Total Present",
      dataIndex: "totalPresent",
      key: "totalPresent",
      render: (text) => `${text} days`
    },
    {
      title: "Total Absent",
      dataIndex: "totalAbsent",
      key: "totalAbsent",
      render: (text) => `${text} days`
    },
    {
      title: "No. of Working Days",
      render: () => `${dayDifference + 1} days`
    }
  ];

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="All Employee Attendance"
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
            <div className="col-sm-6 col-md-3">
              <label>Biometric location:</label>
              <select
              value={value}
                    className={`form-control`}
                   onChange={(e)=>setValue(e.target.value)}
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
            <div className="col-sm-6 col-md-3">
              <button onClick={search} style={{ marginTop: "20px" }} className="btn btn-success btn-block w-100">
                Search
              </button>
            </div>
            <div className="col-sm-6 col-md-3">
              <Button onClick={exportToExcel} style={{ marginTop: "20px" }} className="btn btn-primary w-100">
                Export to Excel
              </Button>
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

export default AllemployeeAttend;
