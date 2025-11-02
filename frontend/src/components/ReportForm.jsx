import React, { useState } from "react";
import { createEvent } from "../api/api";
import NetworkMonitor from "./NetworkMonitor";

const ReportForm = () => {
  const [form, setForm] = useState({
    type: "shutdown",
    reason: "",
    location: { state: "", district: "", lat: null, lon: null },
    sourceType: "official",
  });

  const [loading, setLoading] = useState(false);

  //  Convert typed state + district into lat/lon using OpenStreetMap
  const getCoordinates = async (state, district) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?state=${state}&city=${district}&country=India&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };
      }
    } catch (err) {
      console.error("Geocoding failed:", err);
    }
    return { lat: 20.5937, lon: 78.9629 }; // fallback (India center)
  };

  //  Handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let coords = form.location.lat
      ? { lat: form.location.lat, lon: form.location.lon }
      : await getCoordinates(form.location.state, form.location.district);

    const newEvent = {
      ...form,
      location: {
        ...form.location,
        lat: coords.lat,
        lon: coords.lon,
      },
    };

    try {
      const { data } = await createEvent(newEvent);
      alert(" Report submitted successfully!");
      console.log("Created:", data);
      setForm({
        type: "shutdown",
        reason: "",
        location: { state: "", district: "", lat: null, lon: null },
        sourceType: "official",
      });
    } catch (err) {
      console.error("Error submitting report:", err);
      alert(" Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        margin: "20px auto",
        maxWidth: "650px",
      }}
    >
      <h4
        style={{
          textAlign: "center",
          color: "#1486c9",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Report an Internet Disruption
      </h4>

      <form onSubmit={handleSubmit}>
        {/*  Type of Event */}
        <div className="form-group mb-3">
          <label>Type of Event</label>
          <select
            className="form-control"
            name="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="shutdown">Full Shutdown</option>
            <option value="throttling">Throttling</option>
          </select>
        </div>

        {/*  Reason */}
        <div className="form-group mb-3">
          <label>Reason</label>
          <input
            type="text"
            className="form-control"
            name="reason"
            placeholder="e.g. Security during protest"
            value={form.reason}
            onChange={(e) =>
              setForm({ ...form, reason: e.target.value })
            }
            required
          />
        </div>

        {/*  State */}
        <div className="form-group mb-3">
          <label>State</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Maharashtra"
            value={form.location.state}
            onChange={(e) =>
              setForm({
                ...form,
                location: { ...form.location, state: e.target.value },
              })
            }
            required
          />
        </div>

        {/*  District */}
        <div className="form-group mb-3">
          <label>District</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Pune"
            value={form.location.district}
            onChange={(e) =>
              setForm({
                ...form,
                location: { ...form.location, district: e.target.value },
              })
            }
            required
          />
        </div>

        {/*  Button for GPS */}
        <button
          type="button"
          className="btn btn-outline-secondary mb-3"
          onClick={() => {
            navigator.geolocation.getCurrentPosition((pos) => {
              setForm({
                ...form,
                location: {
                  ...form.location,
                  lat: pos.coords.latitude,
                  lon: pos.coords.longitude,
                },
              });
              alert(" Location captured successfully!");
            });
          }}
        >
          Use My Location
        </button>
        

        {/* Source Type */}
<div className="form-group mt-3">
  <label>Source Type</label>
  <select
    className="form-control"
    name="sourceType"
    value={form.sourceType}
    onChange={(e) => setForm({ ...form, sourceType: e.target.value })}
  >
    <option value="official">Official Order</option>
    <option value="public">Citizen Report</option>
  </select>
</div>

{/*  Show Source fields only for official reports */}
{form.sourceType === "official" && (
  <>
    <div className="form-group mb-3 mt-3">
      <label>Source Title</label>
      <input
        type="text"
        className="form-control"
        placeholder="e.g. Government Order or Press Release"
        value={form.source?.title || ""}
        onChange={(e) =>
          setForm({
            ...form,
            source: { ...form.source, title: e.target.value },
          })
        }
      />
    </div>

    <div className="form-group mb-3">
      <label>Source URL</label>
      <input
        type="url"
        className="form-control"
        placeholder="e.g. https://example.gov.in/order"
        value={form.source?.url || ""}
        onChange={(e) =>
          setForm({
            ...form,
            source: { ...form.source, url: e.target.value },
          })
        }
      />
    </div>
  </>
)}

        <button
          type="submit"
          className="btn btn-primary mt-3"
          style={{ width: "100%" }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
      <NetworkMonitor />
    </div>
  );
};

export default ReportForm;