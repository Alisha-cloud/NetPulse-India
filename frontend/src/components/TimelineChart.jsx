import React, { useEffect, useState } from "react";
import { getEventTrends } from "../api/api";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const TimelineChart = () => {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    fetchTrendData();
  }, []);

  const fetchTrendData = async () => {
    try {
      const { data } = await getEventTrends();
      setTrendData(data);
    } catch (err) {
      console.error("Error fetching trends:", err.message);
    }
  };

  // Format chart labels and data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const shutdowns = new Array(12).fill(0);
  const throttlings = new Array(12).fill(0);

  trendData.forEach((e) => {
    const m = e.month - 1;
    if (e.type === "shutdown") shutdowns[m] += e.count;
    else throttlings[m] += e.count;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Shutdowns",
        data: shutdowns,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "Throttling",
        data: throttlings,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Internet Shutdown Trends (Month-wise)",
        color: "#1486c9",
        font: { size: 18, weight: "bold" },
      },
      legend: { position: "bottom" },
    },
    scales: {
      x: { ticks: { color: "#333" } },
      y: { beginAtZero: true, ticks: { color: "#333" } },
    },
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        marginTop: "25px",
        width: "95%",
        margin: "auto",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default TimelineChart;