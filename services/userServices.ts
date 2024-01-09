import { Credentials } from "@/interfaces/login";
import axios, { AxiosInstance } from "axios";

export const base_url: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const registerUser = async (credentials: Credentials) => {
  try {
    const res = await base_url.post("/register", credentials);
    console.log("I just received this data : ", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (credentials: Credentials) => {
  try {
    const res = await base_url.post("/login", credentials);
    console.log("I just received this data : ", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
