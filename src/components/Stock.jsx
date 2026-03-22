import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import "./Stock.css";

const Stock = () => {
  const [scannedCode, setScannedCode] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [stock, setStock] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [scanner, setScanner] = useState(null);
  const [incrementValue, setIncrementValue] = useState(1);

  // 👉 Fetch Stock Records from backend
  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/stocks");
      setStock(response.data);
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  };

  useEffect(() => {
    if (showScanner && !scanner) {
      const newScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
      newScanner.render(
        (decodedText) => {
          setScannedCode(decodedText);
          setShowScanner(false);
        },
        (error) => console.log(error)
      );
      setScanner(newScanner);
    } else if (!showScanner && scanner) {
      scanner.clear();
      setScanner(null);
    }
  }, [showScanner, scanner]);

  // 👉 Update Stock Quantity by Barcode
  const updateStockByBarcode = async () => {
    try {
      const item = stock.find((item) => item.barcode === scannedCode);
      if (item) {
        const updatedItem = {
          ...item,
          quantity: item.quantity + incrementValue,
          date: selectedDate,
        };
        await axios.put(`http://localhost:8080/api/stocks/${item.id}`, updatedItem);
        fetchStock();
        setScannedCode("");
      }
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  // 👉 Decrease Stock Quantity
  const decreaseStock = async (id, value) => {
    try {
      const item = stock.find((item) => item.id === id);
      if (item && item.quantity >= value) {
        const updatedItem = {
          ...item,
          quantity: item.quantity - value,
          date: selectedDate,
        };
        await axios.put(`http://localhost:8080/api/stocks/${id}`, updatedItem);
        fetchStock();
      }
    } catch (error) {
      console.error("Error decreasing stock:", error);
    }
  };

  return (
    <div className="stock-container">
      <h1 className="text-2xl font-bold mb-4">Stock Management</h1>

      <div className="date-picker mb-4">
        <label>Select Date: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <button className="btn-primary mb-4" onClick={() => setShowScanner(true)}>
        Scan Barcode
      </button>

      {showScanner && (
        <div>
          <div id="reader"></div>
          <button onClick={() => setShowScanner(false)} className="btn-secondary">
            Stop Scanner
          </button>
        </div>
      )}

      {scannedCode && (
        <div>
          <p>Scanned: {scannedCode}</p>
          <input
            type="number"
            min="1"
            value={incrementValue}
            onChange={(e) => setIncrementValue(parseInt(e.target.value, 10))}
          />
          <button onClick={updateStockByBarcode}>Update Stock</button>
        </div>
      )}

      <h2 className="text-xl font-semibold">Stock Inventory</h2>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Material</th>
            <th>Quantity</th>
            <th>Barcode</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item.id}>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>{item.barcode}</td>
              <td>{item.date || "-"}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  id={`decrement-${item.id}`}
                />
                <button
                  onClick={() => {
                    const value = parseInt(document.getElementById(`decrement-${item.id}`).value, 10);
                    decreaseStock(item.id, value);
                  }}
                >
                  Decrease Stock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
