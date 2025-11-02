import Voice from "../models/Voice.js";
import { io } from "../server.js";

//  POST - Add new voice
export const createVoice = async (req, res) => {
  try {
    const { name, location, message } = req.body;
    if (!location?.state || !location?.district || !message)
      return res.status(400).json({ message: "All fields are required" });

    const voice = new Voice({ name, location, message });
    const saved = await voice.save();

    io.emit("newVoice", saved); //  Real-time broadcast

    res.status(201).json({ message: "Voice added successfully", data: saved });
  } catch (err) {
    res.status(500).json({ message: "Error adding voice", error: err.message });
  }
};

//  GET - Fetch all voices
export const getVoices = async (req, res) => {
  try {
    const voices = await Voice.find().sort({ createdAt: -1 });
    res.status(200).json(voices);
  } catch (err) {
    res.status(500).json({ message: "Error fetching voices", error: err.message });
  }
};