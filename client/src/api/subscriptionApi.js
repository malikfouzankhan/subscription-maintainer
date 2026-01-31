import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true 
});

export const getSubscriptions = () => API.get("/subscriptions");
export const createSubscription = (data) => API.post("/subscriptions", data);
export const deleteSubscription = (id) =>
  API.delete(`/subscriptions/${id}`);
