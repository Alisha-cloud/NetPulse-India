import React, { useEffect, useState } from "react";
import socket from "../api/socket";
import { Alert } from "react-bootstrap";
import { Bell } from "lucide-react";

const AlertBanner = () => {
  const [latestEvent, setLatestEvent] = useState(null);

  useEffect(() => {
    // Listen for real-time events from backend
    socket.on("newEvent", (event) => {
      setLatestEvent(event);

      // Browser notification
    //   if (Notification.permission === "granted") {
    //     new Notification("New Internet Disruption Reported", {
    //       body: `${event.type.toUpperCase()} in ${event.location.state} — ${event.reason}`,
    //       icon: "/alert-icon.png",
    //     });
    //   }
    });

    return () => socket.off("newEvent");
  }, []);

  // Auto-dismiss alert after 20 seconds
  useEffect(() => {
    if (!latestEvent) return;
    const timer = setTimeout(() => setLatestEvent(null), 20000);
    return () => clearTimeout(timer);
  }, [latestEvent]);

  if (!latestEvent) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2000,
        width: "80%",
        maxWidth: "600px",
      }}
    >
      <Alert
        variant="warning"
        dismissible
        onClose={() => setLatestEvent(null)}
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          backgroundColor: "#fffbea",
          color: "#5c4400",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "15px 20px",
          border: "1px solid #f5c518",
        }}
      >
        <Bell size={22} color="#d9534f" />
        <div>
          <strong>{latestEvent.type.toUpperCase()}</strong> reported in{" "}
          <b>{latestEvent.location.state}</b> — {latestEvent.reason}
        </div>
      </Alert>
    </div>
  );
};

export default AlertBanner;