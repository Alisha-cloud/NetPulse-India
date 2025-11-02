import dotenv from "dotenv";
import mongoose from "mongoose";
import Event from "../models/Event.js";
import { connectDB } from "../config/db.js";

dotenv.config();
connectDB();

// Seed with real lat/lon coordinates
const sampleEvents = [
  {
    type: "shutdown",
    reason: "Security measures during public protest",
    location: {
      state: "Maharashtra",
      district: "Mumbai",
      lat: 19.076,
      lon: 72.8777,
    },
    startedAt: new Date("2025-10-20T10:00:00"),
    endedAt: new Date("2025-10-21T10:00:00"),
    durationHours: 24,
    operatorImpacts: [
      { operator: "Jio", towersBlocked: 12 },
      { operator: "Airtel", towersBlocked: 9 },
    ],
    source: { title: "News Report", url: "https://example.com/news" },
  },
  {
    type: "throttling",
    reason: "Exam cheating prevention",
    location: {
      state: "Rajasthan",
      district: "Jaipur",
      lat: 26.9124,
      lon: 75.7873,
    },
    startedAt: new Date("2025-09-01T08:00:00"),
    endedAt: new Date("2025-09-01T18:00:00"),
    durationHours: 10,
    operatorImpacts: [{ operator: "Vi", towersBlocked: 4 }],
    source: { title: "Govt Order", url: "https://example.com/order" },
  },
  {
    type: "shutdown",
    reason: "Security during public event",
    location: {
      state: "Kerala",
      district: "Kochi",
      lat: 9.9312,
      lon: 76.2673,
    },
    startedAt: new Date("2025-10-15T09:00:00"),
    endedAt: new Date("2025-10-16T09:00:00"),
    durationHours: 24,
    operatorImpacts: [
      { operator: "BSNL", towersBlocked: 3 },
      { operator: "Airtel", towersBlocked: 2 },
    ],
    source: { title: "Press Release", url: "https://example.com/kochi" },
  },
];

const seedData = async () => {
  try {
    await Event.deleteMany();
    await Event.insertMany(sampleEvents);
    console.log("Sample Data Inserted Successfully with lat/lon");
    process.exit();
  } catch (err) {
    console.error("Error inserting sample data:", err);
    process.exit(1);
  }
};

seedData();