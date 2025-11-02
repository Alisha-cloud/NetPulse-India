import { io } from "socket.io-client";

// If backend and frontend run locally
const SOCKET_URL = "http://localhost:8080";

// Create socket connection
const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

socket.on("connect", () => {
  console.log(" Connected to WebSocket server:", socket.id);
});

socket.on("disconnect", () => {
  console.log(" Disconnected from WebSocket server");
});

export default socket;