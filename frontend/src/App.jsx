import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/Navbar";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import NetworkMonitor from "./components/NetworkMonitor";
import socket from "./api/socket"; 
import VoicesWall from "./pages/VoicesWall";
import About from "./pages/About";


function App() {
  useEffect(() => {
    socket.on("newEvent", (event) => {
      const message = `⚠️ ${event.type.toUpperCase()} detected in ${event.location.state} - ${event.reason}`;
      if (Notification.permission === "granted") {
        new Notification("Internet Alert ", { body: message });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission();
      } else {
        alert(message); // fallback alert
      }
    });

    return () => socket.off("newEvent");
  }, []);

  return (
    <Router>
      <AppNavbar />
     
      <div className="container-fluid p-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/voices" element={<VoicesWall/>}/>
          <Route path="/network-monitor" element={<NetworkMonitor />} />
          <Route path="/about" element={<About/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;