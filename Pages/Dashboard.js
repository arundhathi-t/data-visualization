// src/pages/Dashboard.js
import React from "react";
import "./Dashboard.css";
import Charts from "../Components/Charts";
import { useDashboardContext } from "../Context/DashboardContext";

const Dashboard = () => {
  const { searchTerm, timeFilter, handleSearchChange, handleFilterChange } =
    useDashboardContext();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Data Visualization Dashboard</h1>
      </header>

      <div className="controls-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search metrics..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <div className="time-filters">
          <label>
            <input
              type="radio"
              name="timeFilter"
              value="all"
              checked={timeFilter === "all"}
              onChange={(e) => handleFilterChange(e.target.value)}
            />
            All Time
          </label>
          <label>
            <input
              type="radio"
              name="timeFilter"
              value="lastHour"
              checked={timeFilter === "lastHour"}
              onChange={(e) => handleFilterChange(e.target.value)}
            />
            Last Hour
          </label>
          <label>
            <input
              type="radio"
              name="timeFilter"
              value="lastDay"
              checked={timeFilter === "lastDay"}
              onChange={(e) => handleFilterChange(e.target.value)}
            />
            Last Day
          </label>
          <label>
            <input
              type="radio"
              name="timeFilter"
              value="lastWeek"
              checked={timeFilter === "lastWeek"}
              onChange={(e) => handleFilterChange(e.target.value)}
            />
            Last Week
          </label>
        </div>
      </div>

      <div className="charts-section">
        <Charts searchTerm={searchTerm} timeFilter={timeFilter} />
      </div>
    </div>
  );
};

export default Dashboard;
