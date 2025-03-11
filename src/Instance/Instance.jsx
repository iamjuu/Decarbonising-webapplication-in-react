import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Instance = axios.create({
  baseURL: API_BASE_URL, 
  timeout: 20000,
});

console.log("Base URL:", API_BASE_URL || "Env variable not loaded!");

export default Instance;
