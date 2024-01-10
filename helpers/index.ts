import { Credentials } from "@/interfaces";
import Cookie from "js-cookie";

export const initialState: Credentials = {
  username: "",
  password: "",
};

export const set_data_in_cookies = (key: string, value: string) => {
  Cookie.set(key, value);
};

export const set_data_in_localstorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const logout_user = () => {
  Cookie.remove("accessToken");
  Cookie.remove("refreshToken");
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
  window.localStorage.removeItem("userId");
};
