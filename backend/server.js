import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import {connectDB} from "./config/db.js";
import eventsRoute from "./routes/events.js";
import voiceRoutes from "./routes/voiceRoutes.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", eventsRoute);
app.use("/api/voices", voiceRoutes);

// Root route
app.get("/", (req, res) => {
  res.send(" Internet Shutdowns API is running...");
});

//  Socket.io for real-time updates
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(" Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log(" Client disconnected:", socket.id);
  });
});

//  Export io instance so controllers can emit events
export { io };

// Start Server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(` Server running on port ${PORT}`));