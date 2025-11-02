import React, { useEffect, useState } from "react";
import { getVoices, addVoice } from "../api/api";
import { Card, Button, Form } from "react-bootstrap";

const VoicesWall = () => {
  const [voices, setVoices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    state: "",
    district: "",
    message: "",
  });

  // Fetch all voices
  const fetchVoices = async () => {
    try {
      const { data } = await getVoices();
      setVoices(data.reverse());
    } catch (err) {
      console.error("Error fetching voices:", err.message);
    }
  };

  useEffect(() => {
    fetchVoices();
  }, []);

  // Add new voice
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.state || !form.district || !form.message)
      return alert("Please fill all fields");

    const payload = {
      name: form.name,
      location: {
        state: form.state,
        district: form.district,
      },
      message: form.message,
    };

    try {
      await addVoice(payload);
      alert(" Your voice has been added successfully!");
      setForm({ name: "", state: "", district: "", message: "" });
      fetchVoices();
    } catch (err) {
      console.error("Error submitting voice:", err.response?.data || err.message);
      alert(" Error submitting voice");
    }
  };

  return (
    <div
      className="container mt-4"
      style={{ maxWidth: "900px", margin: "auto" }}
    >
      <h3
        style={{
          textAlign: "center",
          color: "#1486c9",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        🗣️ NetFreedom Voices
      </h3>

      {/* Voice Submission Form */}
      <Form
        onSubmit={handleSubmit}
        style={{
          background: "#f8f9fa",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Enter your name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            placeholder="e.g. Rajasthan"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>District</Form.Label>
          <Form.Control
            type="text"
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
            placeholder="e.g. Jaipur"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Your Message / Opinion</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Share your experience or thoughts about internet shutdowns..."
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ width: "100%" }}>
          Submit Voice
        </Button>
      </Form>

      {/* Voices Display */}
      <div className="voices-grid" style={{ display: "grid", gap: "20px" }}>
        {voices.length === 0 ? (
          <p className="text-center text-muted">No voices yet. Be the first to speak up!</p>
        ) : (
          voices.map((v, i) => (
            <Card key={i} style={{ borderLeft: "5px solid #1486c9" }}>
              <Card.Body>
                <Card.Title>{v.name || "Anonymous"}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {v.location?.district}, {v.location?.state}
                </Card.Subtitle>
                <Card.Text>“{v.message}”</Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default VoicesWall;