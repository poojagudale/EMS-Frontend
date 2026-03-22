import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { QRCodeCanvas } from "qrcode.react";
import "./Attendance.css";
import { FaQrcode, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const employeeData = [
  { id: "01", name: "Ramesh Patil" },
  { id: "02", name: "Somnath Shinde" },
  { id: "03", name: "Bhaskar Jadhav" },
  { id: "04", name: "Gopal Naik" },
  { id: "05", name: "Shankar More" },
  { id: "06", name: "Kisan Kamble" },
  { id: "07", name: "Vitthal Salunkhe" },
  { id: "08", name: "Tukaram Pawar" },
  { id: "09", name: "Maruti Kale" },
  { id: "10", name: "Savita Bhosale" },
  { id: "11", name: "Bharti Gaikwad" }
];

const Attendance = () => {
  const [inputText, setInputText] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  let scanner = null;

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  useEffect(() => {
    if (scanning) {
      scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

      scanner.render(
        (decodedText) => {
          const employee = employeeData.find(
            (emp) => emp.name.toLowerCase() === decodedText.toLowerCase()
          );

          if (employee) {
            sendToBackend(employee);
          } else {
            alert("Employee not found in system");
          }

          scanner.clear();
          setScanning(false);
        },
        (error) => console.log("QR Scan Error:", error)
      );
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanning, selectedDate]);

  const fetchAttendanceRecords = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/attendance/all");
      if (!response.ok) throw new Error("Failed to fetch records");
      const data = await response.json();
      setAttendanceRecords(data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const sendToBackend = async (employee) => {
    try {
      const response = await fetch("http://localhost:8080/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: employee.id,
          employeeName: employee.name,
          date: selectedDate,
          time: new Date().toLocaleTimeString(),
          presentAbsent: "Present"
        })
      });

      if (!response.ok) throw new Error("Failed to send data");

      toast.success(`Attendance marked for ${employee.name}`);
      fetchAttendanceRecords();
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("Failed to mark attendance");
    }
  };

  const handleInputChange = (event) => setInputText(event.target.value);
  const generateQRCode = () => inputText.trim() && setQrCodeValue(inputText);
  const startScanning = () => {
    if (!selectedDate) {
      alert("Please select date before scanning");
      return;
    }
    setScanning(true);
  };
  const handleDateChange = (e) => setSelectedDate(e.target.value);

  return (
    <div className="attendance-container">
      <h2 className="title">Attendance Management</h2>
      <div className="card">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter Employee Name"
          className="input-box"
        />
        <button className="btn generate-btn" onClick={generateQRCode}>
          <FaQrcode /> Generate QR Code
        </button>
        {qrCodeValue && (
          <div className="qr-code">
            <QRCodeCanvas value={qrCodeValue} size={300} />
            <p>{qrCodeValue}</p>
          </div>
        )}

        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="input-box"
          style={{ marginTop: "10px" }}
        />

        <button className="btn scan-btn" onClick={startScanning} disabled={scanning}>
          <FaCheckCircle /> {scanning ? "Scanning..." : "Scan QR Code"}
        </button>
        {scanning && <div id="reader"></div>}
      </div>

      <h3 className="sub-title">Attendance Records</h3>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.employeeName}</td>
              <td>{record.employeeId}</td>
              <td>{record.date}</td>
              <td>{record.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
