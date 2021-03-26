import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://elogbook-api.herokuapp.com/api",
});

export { backendApi };
