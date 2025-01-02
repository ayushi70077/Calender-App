import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getCompanies = () => API.get("/companies");
export const addCompany = (company) => API.post("/companies", company);
