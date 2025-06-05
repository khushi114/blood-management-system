// src/components/BloodInventory.jsx
import React from 'react';
import './BloodInventory.css'; // Create this file for custom styles
import { useNavigate } from 'react-router-dom';

const bloodData = [
  { group: 'A+', current: 45, capacity: 50 },
  { group: 'A-', current: 12, capacity: 30 },
  { group: 'B+', current: 28, capacity: 50 },
  { group: 'B-', current: 8, capacity: 20 },
  { group: 'AB+', current: 15, capacity: 25 },
  { group: 'AB-', current: 5, capacity: 15 },
  { group: 'O+', current: 35, capacity: 60 },
  { group: 'O-', current: 10, capacity: 40 },
];

const recentTransactions = [
  {
    id: 1,
    type: 'Incoming',
    group: 'A+',
    units: 2,
    source: 'John Doe',
    date: '2023-06-01',
  },
];

const BloodInventory = () => {
  const navigate = useNavigate();

  const getPercentage = (current, capacity) => ((current / capacity) * 100).toFixed(0);

  return (
    <div className="inventory-container">
      <div className="header">
        <h2>Blood Inventory Management</h2>
        <p>Monitor and manage blood stocks</p>
        <div className="actions">
          <button className="btn-export">Export Data</button>
          <button className="btn-add" onClick={() => navigate('/add-transaction')}>Add Transaction</button>
        </div>
      </div>

      <div className="blood-grid">
        {bloodData.map((item) => {
          const percent = getPercentage(item.current, item.capacity);
          return (
            <div className="blood-card" key={item.group}>
              <div className="blood-group">🩸 {item.group}</div>
              <div className="blood-units">{item.current}/{item.capacity} units</div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${percent}%`, backgroundColor: '#d50000' }}
                ></div>
              </div>
              <div className="blood-percent">{percent}% full</div>
            </div>
          );
        })}
      </div>

      <div className="transactions">
        <h3>Recent Transactions</h3>
        <p>Latest blood donations and distributions</p>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Blood Group</th>
              <th>Units</th>
              <th>Source/Destination</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.id}</td>
                <td>
                  <span className={`badge ${txn.type === 'Incoming' ? 'incoming' : 'outgoing'}`}>
                    {txn.type}
                  </span>
                </td>
                <td>{txn.group}</td>
                <td>{txn.units}</td>
                <td>{txn.source}</td>
                <td>{txn.date}</td>
                <td><button className="view-btn">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodInventory;
