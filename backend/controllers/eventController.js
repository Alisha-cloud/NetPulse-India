import Event from "../models/Event.js";
import { io } from "../server.js";
import { estimateImpact } from "../utils/impactCalculator.js";

// GET all events
export const getEvents = async (req, res) => {
  try {
    const { type, state } = req.query;
    const filter = {};
    if (type && type !== "all") filter.type = type;
    if (state) filter["location.state"] = state;

    const events = await Event.find(filter).sort({ startedAt: -1 });
    const enriched = events.map((e) => ({
      ...e._doc,
      impact: estimateImpact(e.durationHours, e.location.state, e.type),
    }));

    res.status(200).json(enriched);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events", error: err.message });
  }
};

// POST create new event
export const createEvent = async (req, res) => {
  try {
    const {
      type,
      reason,
      location,
      startedAt,
      endedAt,
      durationHours,
      source,
      sourceType,
    } = req.body;

    if (!type || !reason || !location?.state || !location?.district) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (typeof location.lat !== "number" || typeof location.lon !== "number") {
      const { geoMap } = await import("../utils/geoMap.js");
      const stateCoords = geoMap[location.state];
      location.lat = stateCoords?.lat || 20.5937;
      location.lon = stateCoords?.lon || 78.9629;
    }

    let duration = durationHours;
    if (startedAt && endedAt) {
      const diff =
        (new Date(endedAt).getTime() - new Date(startedAt).getTime()) /
        (1000 * 60 * 60);
      duration = diff > 0 ? diff : null;
    }

    const event = new Event({
      type,
      reason,
      location,
      startedAt: startedAt || new Date(),
      endedAt,
      durationHours: duration,
      source: source || {},
      verified: sourceType === "official",
    });

    const saved = await event.save();

    io.emit("newEvent", {
      ...saved._doc,
      impact: estimateImpact(duration, location.state, type),
    });

    res.status(201).json({ message: "Event created successfully", data: saved });
  } catch (err) {
    res.status(500).json({ message: "Error creating event", error: err.message });
  }
};

// PUT /api/events/:id (Crowd verification)
export const updateEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });

    io.emit("eventUpdated", updatedEvent);

    res.status(200).json({
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating event", error: err.message });
  }
};

// GET /api/events/trends — monthly trend visualization
export const getEventTrends = async (req, res) => {
  try {
    const events = await Event.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$startedAt" },
            month: { $month: "$startedAt" },
            type: "$type",
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const formatted = events.map((e) => ({
      year: e._id.year,
      month: e._id.month,
      type: e._id.type,
      count: e.count,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({
      message: "Error generating event trends",
      error: err.message,
    });
  }
};