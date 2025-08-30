import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // your Django backend
});

// Get all events
export const getEvents = async () => {
  const res = await API.get("/events/");
  return res.data;
};

// Get single event
export const getEvent = async (id: string) => {
  const res = await API.get(`/events/${id}/`);
  return res.data;
};

// Create event
export const createEvent = async (data: any) => {
  const res = await API.post("/events/", data);
  return res.data;
};

// Update event
export const updateEvent = async (id: string, data: any) => {
  const res = await API.put(`/events/${id}/`, data);
  return res.data;
};

// Delete event
export const deleteEvent = async (id: string) => {
  const res = await API.delete(`/events/${id}/`);
  return res.data;
};
