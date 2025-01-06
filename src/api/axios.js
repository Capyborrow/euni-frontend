import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:5149",
});

export default instance;
