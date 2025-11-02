import socket from "../api/socket";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { getEvents } from "../api/api";
import "bootstrap/dist/css/bootstrap.min.css";
import TimelineChart from "../components/TimelineChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = ({ filterType = "all" }) => {
  const [events, setEvents] = useState([]);

 useEffect(() => {
  fetchData();

  //  Listen for real-time updates
  socket.on("newEvent", (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]); // instantly add
  });

  return () => socket.off("newEvent");
}, []);

  const fetchData = async () => {
    try {
      const { data } = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching analytics:", err.message);
    }
  };

  // Filter events
  const filteredEvents =
    filterType === "all"
      ? events
      : events.filter((e) => e.type === filterType);

  // Prepare chart data 
  const stateCounts = {};
  const reasonCounts = {};
  let totalDuration = 0;
  let totalLoss = 0;

  filteredEvents.forEach((e) => {
    stateCounts[e.location.state] =
      (stateCounts[e.location.state] || 0) + 1;
    reasonCounts[e.reason] = (reasonCounts[e.reason] || 0) + 1;

    totalDuration += e.durationHours || 0;
    const lossValue = parseFloat(e.impact?.loss?.replace(/[₹A-Za-z]/g, "")) || 0;
    totalLoss += lossValue;
  });

  const totalEvents = Object.values(stateCounts).reduce((a, b) => a + b, 0);
  const avgDuration = totalEvents ? (totalDuration / totalEvents).toFixed(1) : 0;
  const mostAffected =
    Object.keys(stateCounts).length > 0
      ? Object.keys(stateCounts).reduce((a, b) =>
          stateCounts[a] > stateCounts[b] ? a : b
        )
      : "N/A";

  // Chart Data 
  const stateData = {
    labels: Object.keys(stateCounts),
    datasets: [
      {
        label: "Shutdowns per State",
        data: Object.values(stateCounts),
        backgroundColor: "rgba(20, 134, 201, 0.8)",
        borderColor: "#0f5c99",
        borderWidth: 1.5,
        borderRadius: 5,
      },
    ],
  };

  const reasonData = {
    labels: Object.keys(reasonCounts),
    datasets: [
      {
        label: "Reasons for Shutdowns",
        data: Object.values(reasonCounts),
        backgroundColor: [
          "rgba(20, 134, 201, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className="container-fluid mt-4"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        padding: "30px 35px",
        maxWidth: "95%",
      }}
    >
      <h3
        style={{
          color: "#1486c9",
          textAlign: "center",
          fontWeight: "bold",
          letterSpacing: "0.7px",
          marginBottom: "25px",
          textTransform: "uppercase",
        }}
      >
        Analytics Dashboard
      </h3>

      {/* IMPACT CARDS */}
      <div
        className="row text-center mb-4"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          className="col-md-2 col-sm-5 p-3"
          style={{
            background: "#eaf4fc",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            minWidth: "180px",
          }}
        >
          <h6 style={{ color: "#1486c9" }}>Total Events</h6>
          <h3>{totalEvents}</h3>
        </div>

        <div
          className="col-md-2 col-sm-5 p-3"
          style={{
            background: "#f4f8ec",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            minWidth: "180px",
          }}
        >
          <h6 style={{ color: "#689f38" }}>Avg Duration</h6>
          <h3>{avgDuration} hrs</h3>
        </div>

        <div
          className="col-md-2 col-sm-5 p-3"
          style={{
            background: "#fff8e1",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            minWidth: "180px",
          }}
        >
          <h6 style={{ color: "#f9a825" }}>Total Loss</h6>
          <h3>₹{totalLoss.toFixed(2)} Cr</h3>
        </div>

        <div
          className="col-md-2 col-sm-5 p-3"
          style={{
            background: "#fce4ec",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            minWidth: "180px",
          }}
        >
          <h6 style={{ color: "#d81b60" }}>Most Affected</h6>
          <h3>{mostAffected}</h3>
        </div>
      </div>

      {/* CHARTS */}
      <div
        className="row"
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {/* Bar Chart */}
        <div
          className="col-md-6 col-sm-12 mb-4"
          style={{
            background: "#f8f9fa",
            borderRadius: "12px",
            padding: "20px",
            height: "420px",
            boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h5
            style={{
              textAlign: "center",
              color: "#1486c9",
              marginBottom: "10px",
              fontWeight: "600",
            }}
          >
            Shutdowns by State
          </h5>
          <Bar
            data={stateData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                x: { grid: { display: false }, ticks: { color: "#333" } },
                y: { beginAtZero: true, ticks: { color: "#333" } },
              },
            }}
          />
        </div>

        {/* Pie Chart */}
        <div
          className="col-md-5 col-sm-12 mb-4"
          style={{
            background: "#f8f9fa",
            borderRadius: "12px",
            padding: "20px",
            height: "420px",
            boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h5
            style={{
              textAlign: "center",
              color: "#1486c9",
              marginBottom: "10px",
              fontWeight: "600",
            }}
          >
            Reasons for Shutdowns
          </h5>
          <div
            style={{
              width: "100%",
              height: "320px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pie
              data={reasonData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: "#333", font: { size: 13 } },
                  },
                },
              }}
            />
          </div>
        </div>

         {/* Timeline Trends */}
         <div style={{ marginTop: "40px" }}>
         <TimelineChart />
         </div>

      </div>
    </div>
  );
};

export default Analytics;