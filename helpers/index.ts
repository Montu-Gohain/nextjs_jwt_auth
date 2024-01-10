import { Credentials } from "@/interfaces/login";
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
