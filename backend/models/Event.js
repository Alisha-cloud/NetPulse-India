import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ["shutdown", "throttling"] },
    reason: { type: String, required: true },
    location: {
      state: { type: String, required: true },
      district: { type: String, required: true },
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
    startedAt: Date,
    endedAt: Date,
    durationHours: Number,

    operatorImpacts: [
      {
        operator: String,
        towersBlocked: Number,
      },
    ],

    source: {
      title: String,
      url: String,
    },

    verifiedByCrowd: { type: Boolean, default: false },

    // Smart metadata
    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    alertSent: { type: Boolean, default: false },
    reportedBy: { type: String, enum: ["Official", "Citizen"], default: "Citizen" },

    // NEW: Crowd Verification
    crowdVerification: {
      upvotes: { type: Number, default: 0 },
      downvotes: { type: Number, default: 0 },
      voters: [{ type: String }],
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;