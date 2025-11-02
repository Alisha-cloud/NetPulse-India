import mongoose from "mongoose";

const voiceSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Anonymous" },
    location: {
      state: { type: String, required: true },
      district: { type: String, required: true },
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Voice", voiceSchema);