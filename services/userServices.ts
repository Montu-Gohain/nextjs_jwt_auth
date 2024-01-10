import { set_data_in_cookies, set_data_in_localstorage } from "@/helpers";
import { Credentials } from "@/interfaces";
import axios, { AxiosError, AxiosInstance } from "axios";
import Cookie from "js-cookie";

interface MyErrorResponseData {
  message: string;
}

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

const getNewAccessToken = async (refresh_token: string) => {
  try {
    const response = await base_url.post("/renew", {
      refresh_token,
    });
    // console.log("Refresh Token renew : ", response.data);
    return response.data;
  } catch (error) {
    console.log("I am here and this is the error", error);
    return "redirect-login";
  }
};

export const GetUserDataById_ = async (userId: string) => {
  try {
    const access_token = Cookie.get("accessToken");
    const res = await base_url.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log("User specific data ⌛⌛⌛: ", res.data);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<MyErrorResponseData>;
    if (axiosError.response?.data) {
      const { message } = axiosError.response.data;
      if (message === "Invalid Token") {
        // Access token expired, try refreshing
        const refresh_token = Cookie.get("refreshToken") as string;

        try {
          const response = await getNewAccessToken(refresh_token);

          // Updating this accessToken in Cookie as well as in localStorage
          set_data_in_cookies("accessToken", response.access_token);
          set_data_in_localstorage("accessToken", response.access_token);

          // Retry the original request with the new access token
          const retriedResponse = await base_url.get(`/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          });
          // console.log(
          //   "User specific data ⌛⌛⌛ (after refresh): ",
          //   retriedResponse.data
          // );
          return retriedResponse.data;
        } catch (refreshError) {
          console.error("Error refreshing access token:", refreshError);
          return "redirect-login"; // This will let us know that we should redirect to the login page.
        }
      }
    } else {
      console.error("Axios error:", axiosError);
      // Handle other Axios errors
    }
  }
};

export const addNewTask = async (task: string, userId: string) => {
  try {
    const response = await base_url.post("/todo", {
      task,
      userId,
    });
    // console.log("Added todo data : ", response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id: number) => {
  try {
    const res = await base_url.delete(`/todo/${id}`);
    console.log("Response After deletion : ", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (payload: any, id: number) => {
  try {
    const res = await base_url.patch(`/todo/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
