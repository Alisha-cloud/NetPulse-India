import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import "leaflet/dist/leaflet.css";
import { getEvents } from "../api/api";
import socket from "../api/socket";

const getIconByType = (type) =>
  new L.Icon({
    iconUrl:
      type === "shutdown"
        ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
        : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

// Custom Heatmap component
const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    console.log(" Rendering heatmap points:", points.length);

    // Create the heatmap layer
    const heatLayer = L.heatLayer(points, {
      radius: 30,
      blur: 25,
      maxZoom: 8,
      max: 1.2,
      minOpacity: 0.5,
      gradient: {
        0.1: "blue",
        0.4: "lime",
        0.65: "orange",
        1.0: "red",
      },
    }).addTo(map);
   

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [points, map]);

  return null;
};

const MapView = ({ filterType }) => {
  const [events, setEvents] = useState([]);

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

    socket.on("newEvent", (newEvent) => {
      console.log("⚡ New event received:", newEvent.location?.state);
      setEvents((prev) => [newEvent, ...prev]);
    });

    return () => socket.off("newEvent");
  }, []);

  // Filter events by type (shutdown / throttling / all)
  const filteredEvents =
    filterType === "all"
      ? events
      : events.filter((e) => e.type === filterType);

  // Prepare heatmap points
  const heatPoints = filteredEvents
    .filter((e) => e.location?.lat && e.location?.lon)
    .map((e) => [e.location.lat, e.location.lon, 0.8]); // Intensity slightly increased

  console.log("Heatmap Points:", heatPoints);

  return (
    <div
      style={{
        margin: "20px auto",
        width: "95%",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        padding: "15px",
        position: "relative",
        zIndex: 1,
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
        Internet Shutdowns Impact Heatmap (Live)
      </h4>

      <div
        style={{
          height: "60vh",
          width: "100%",
          border: "2px solid #1486c9",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5.3}
          scrollWheelZoom={true}
          maxBounds={[
            [6.7, 68.1],
            [37.1, 97.4],
          ]}
          style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Add Heatmap layer */}
          <HeatmapLayer points={heatPoints} />

          {/* Show Markers */}
          {filteredEvents.map((e, i) => {
            if (!e.location?.lat || !e.location?.lon) return null;
            return (
              <Marker
                key={i}
                position={[e.location.lat, e.location.lon]}
                icon={getIconByType(e.type)}
              >
                <Popup>
                  <strong>
                    {e.location.district}, {e.location.state}
                  </strong>
                  <br />
                  <em>{e.reason}</em>
                  <br />
                  <b style={{ color: e.type === "shutdown" ? "red" : "blue" }}>
                    {e.type.toUpperCase()}
                  </b>
                </Popup>
                <Tooltip direction="top">{e.location.district}</Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;