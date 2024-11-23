// src/Components/Charts.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDashboardContext } from "../Context/DashboardContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Treemap,
  Area,
  ScatterChart,
  ZAxis,
  Scatter,
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis,
  PolarGrid,
} from "recharts";
import { BarChart, Bar } from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";

// Color scheme for Pie Chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Charts = () => {
  const { searchTerm, timeFilter } = useDashboardContext();
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [treeMapData, setTreeMapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch data.json
        const response = await axios.get("/data.json");
        const {
          lineData,
          barData,
          pieData,
          areaData,
          treeMapData,
          heatmapData,
        } = response.data;

        // Filter logic based on searchTerm
        const filterBySearchTerm = (data) =>
          data.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

        const filteredLineData = filterBySearchTerm(lineData);
        const filteredBarData = filterBySearchTerm(barData);
        const filteredPieData = filterBySearchTerm(pieData);
        const filteredAreaData = filterBySearchTerm(areaData);
        const filteredTreeMapData = filterBySearchTerm(treeMapData);

        // Time filter logic
        const now = new Date();
        const filterByTime = (data) => {
          if (timeFilter === "lastHour") {
            return data.filter(
              (item) =>
                new Date(item.timestamp) >= new Date(now - 60 * 60 * 1000)
            );
          }
          if (timeFilter === "lastDay") {
            return data.filter(
              (item) =>
                new Date(item.timestamp) >= new Date(now - 24 * 60 * 60 * 1000)
            );
          }
          if (timeFilter === "lastWeek") {
            return data.filter(
              (item) =>
                new Date(item.timestamp) >=
                new Date(now - 7 * 24 * 60 * 60 * 1000)
            );
          }
          return data; // Default to all data
        };

        setLineData(filterByTime(filteredLineData));
        setBarData(filterByTime(filteredBarData));
        setPieData(filterByTime(filteredPieData));
        setAreaData(filterByTime(filteredAreaData));
        setTreeMapData(filterByTime(filteredTreeMapData));
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, timeFilter]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="charts-container">
      {/* Line Chart */}
      <div className="chart">
        <h3>Line Chart</h3>
        <LineChart width={500} height={300} data={lineData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>

      {/* Bar Chart */}
      <div className="chart">
        <h3>Bar Chart</h3>
        <BarChart width={500} height={300} data={barData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* Pie Chart */}
      <div className="chart">
        <h3>Pie Chart</h3>
        <PieChart width={500} height={300}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </div>
      {/* Area Chart */}
      <div className="chart">
        <h3>Area Chart</h3>
        <AreaChart width={500} height={300} data={areaData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fillOpacity={0.3}
            fill="#8884d8"
          />
        </AreaChart>
      </div>

      {/* Treemap */}
      <div className="chart">
        <h3>Treemap</h3>
        <Treemap
          width={500}
          height={300}
          data={treeMapData}
          dataKey="value"
          nameKey="name"
          aspectRatio={1}
          fill="#8884d8"
          stroke="#fff"
          label={({ name, value }) => `${name}: ${value}`}
        />
      </div>
    </div>
  );
};

export default Charts;
