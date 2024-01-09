import { Credentials } from "@/interfaces/login";
import axios, { AxiosInstance } from "axios";

export const base_url: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const registerUser = async (credentials: any) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/register",
      credentials
    );
    console.log("REGISTER API hit : ", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (credentials: Credentials) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/login",
      credentials
    );

    console.log("LOGIN API hit : ", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
