import React, { useState } from "react";

const NetworkMonitor = () => {
  const [ping, setPing] = useState(null);
  const [status, setStatus] = useState("");

  const testPing = async () => {
    const start = Date.now();
    try {
      await fetch("https://www.google.com/favicon.ico", { mode: "no-cors" });
      const latency = Date.now() - start;
      setPing(latency);
      setStatus(latency > 500 ? "Throttling detected " : "Network normal ");
    } catch {
      setStatus("No Internet ");
    }
  };

  return (
    <div style={{
      margin: "20px auto",
      padding: "20px",
      maxWidth: "400px",
      border: "2px solid #1486c9",
      borderRadius: "12px",
      textAlign: "center",
      backgroundColor: "#f9f9f9"
    }}>
      <h4 style={{ color: "#1486c9" }}>Network Throttling Test</h4>
      <button type="button" className="btn btn-primary" onClick={testPing}>
        Test Connection
      </button>
      {ping !== null && (
        <>
          <p style={{ marginTop: "10px" }}>Ping: {ping} ms</p>
          <strong style={{ color: status.includes("⚠️") ? "red" : "green" }}>
            {status}
          </strong>
        </>
      )}
    </div>
  );
};

export default NetworkMonitor;