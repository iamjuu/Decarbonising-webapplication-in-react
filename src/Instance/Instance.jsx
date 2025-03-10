import axios from "axios";

const Instance = axios.create({
	baseURL: "http://13.201.189.211/" +"/api/",// Use environment variable
  // baseURL: "https://tkmscraps.com", 
  timeout: 20000,
});


export default Instance;
