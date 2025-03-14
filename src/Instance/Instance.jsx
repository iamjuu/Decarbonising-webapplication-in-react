import axios from "axios";



const API_BASE_URL = import.meta.env.VITE_API_URL;



const Instance = axios.create({
	baseURL: API_BASE_URL,// Use environment variable
  // baseURL: "https://tkmscraps.com", 
  timeout: 20000,
});


export default Instance;
