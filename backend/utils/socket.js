import { io } from "socket.io-client";

// If you deploy, replace with your backend domain
const socket = io("http://localhost:8080");

export default socket;