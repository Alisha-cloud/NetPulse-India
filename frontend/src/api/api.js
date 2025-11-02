import axios from "axios";

//  Base API instance
const API = axios.create({
  baseURL: "https://netpulse-indiaba.onrender.com", 
});

//Events
export const getEvents = (params = {}) => API.get("/events", { params });
export const createEvent = (data) => API.post("/events", data);
export const deleteEvent = (id) => API.delete(`/events/${id}`);
export const updateEvent = (id, data) => API.put(`/events/${id}`, data);

// Added this new function for crowd voting
export const voteEvent = (id, payload) => API.put(`/events/${id}/vote`, payload);

//Voices
export const getVoices = () => API.get("/voices");
export const addVoice = (payload) => API.post("/voices", payload);

//Event Trends
export const getEventTrends = () => API.get("/events/trends");