import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import DataTable from "../components/DataTable";
import MapView from "../components/MapView";
import ReportForm from "../components/ReportForm";
import Analytics from "./Analytics";
import AlertBanner from "../components/AlertBanner";
import TimelineChart from "../components/TimelineChart";

const Home = () => {
  const [filterType, setFilterType] = useState("all");

  return (
    <div style={{ padding: "20px" }}>
      {/* Hero Section (Compact Version) */}
<div
  style={{
    textAlign: "center",
    padding: "10px 0 5px 0", // reduced top and bottom padding
    color: "#0a4c7e",
    marginBottom: "5px", // minimal spacing before map
  }}
>
  <h1
    style={{
      fontWeight: "800",
      fontSize: "2.2rem",
      background: "linear-gradient(90deg, #007BFF 0%, #0056b3 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "6px",
    }}
  >
    NetPulse India
  </h1>

  <p
    style={{
      fontSize: "1rem",
      fontWeight: "400",
      color: "#337ab7",
      opacity: 0.85,
      margin: 0,
    }}
  >
    Tracking Digital Freedom and Internet Disruptions in Real Time
  </p>
</div>

      {/* Live Alerts */}
      <AlertBanner />

      {/* Map Section */}
      <div style={{ marginTop: "25px" }}>
        <MapView filterType={filterType} />
      </div>

      {/* Filter Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "25px",
          marginBottom: "15px",
        }}
      >
        <ButtonGroup>
          <ToggleButton
            id="t1"
            type="radio"
            variant={filterType === "shutdown" ? "primary" : "outline-primary"}
            checked={filterType === "shutdown"}
            onChange={() => setFilterType("shutdown")}
          >
            Shutdowns
          </ToggleButton>
          <ToggleButton
            id="t2"
            type="radio"
            variant={filterType === "throttling" ? "primary" : "outline-primary"}
            checked={filterType === "throttling"}
            onChange={() => setFilterType("throttling")}
          >
            Throttling
          </ToggleButton>
          <ToggleButton
            id="t3"
            type="radio"
            variant={filterType === "all" ? "primary" : "outline-primary"}
            checked={filterType === "all"}
            onChange={() => setFilterType("all")}
          >
            All
          </ToggleButton>
        </ButtonGroup>
      </div>

      {/* Recent Events Table */}
      <div style={{ marginTop: "25px" }}>
        <DataTable filterType={filterType} />
      </div>

      

      {/* Report Form (Call to Action at the End) */}
      <div
        style={{
          marginTop: "40px",
          padding: "30px",
          background: "#f8f9fa",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h4
          style={{
            textAlign: "center",
            color: "#1486c9",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          
        </h4>
        <ReportForm />
      </div>
    </div>
  );
};

export default Home;