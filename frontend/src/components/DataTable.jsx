import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { getEvents, updateEvent } from "../api/api";
import socket from "../api/socket";

const DataTable = ({ filterType }) => {
  const [events, setEvents] = useState([]);

  // Fetch all events
  const fetchData = async () => {
    try {
      const { data } = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err.message);
    }
  };

  useEffect(() => {
    fetchData();

    // Realtime listener for new reports
    socket.on("newEvent", (newEvent) => {
      setEvents((prev) => [newEvent, ...prev]);
    });

    return () => socket.off("newEvent");
  }, []);

 const handleVerify = async (id) => {
  try {
    await updateEvent(id, { verifiedByCrowd: true });
    alert(" Thank you for verifying this report!");
    fetchData(); 
  } catch (err) {
    console.error("Verification failed:", err.message);
  }
};

  const filteredEvents =
    filterType === "all" ? events : events.filter((e) => e.type === filterType);

  return (
    <div
      style={{
        margin: "30px auto",
        width: "95%",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        padding: "20px",
      }}
    >
      <h4
        style={{
          color: "#1486c9",
          textAlign: "center",
          marginBottom: "15px",
          fontWeight: "bold",
        }}
      >
        Recent Events (Live)
      </h4>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>State</th>
            <th>District</th>
            <th>Reason</th>
            <th>Source</th>
            <th>Economic Loss</th>
            <th>Users Affected</th>
            <th>Verification</th>
          </tr>
        </thead>

        <tbody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((e, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td style={{ textTransform: "capitalize" }}>{e.type}</td>
                <td>{e.location?.state || "—"}</td>
                <td>{e.location?.district || "—"}</td>
                <td>{e.reason || "—"}</td>
                <td>
                  {e.source?.url ? (
                    <a href={e.source.url} target="_blank" rel="noreferrer">
                      {e.source.title || "Source"}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{e.impact?.loss || "N/A"}</td>
                <td>{e.impact?.affectedUsers || "N/A"}</td>

                <td style={{ textAlign: "center" }}>
                {e.verifiedByCrowd ? (
                <span
                  style={{
                  color: "green",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  }}
                  >
                  Verified
                </span>
                ) : (
            <button
             className="btn btn-outline-success btn-sm"
             onClick={() => handleVerify(e._id)}
             style={{
              padding: "4px 10px",
              borderRadius: "6px",
              transition: "0.3s",
             }}
            >
            Verify
           </button>
           )}
         </td>
         </tr>
         ))
        ) : (
        <tr>
            <td colSpan="9" className="text-center text-muted">
                No events found for this category.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;