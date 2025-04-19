import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // ou o IP local, ex: http://192.168.0.5:3000
});

export default api;
