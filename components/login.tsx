"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Credentials } from "@/interfaces";
import { initialState } from "@/helpers";
import { loginUser, registerUser } from "@/services/userServices";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { set_data_in_cookies, set_data_in_localstorage } from "../helpers";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>(initialState);
  const [formState, setFormState] = useState<"login" | "register">("login");

  const router = useRouter();

  const toggleFormState = () => {
    setFormState(formState === "login" ? "register" : "login");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: [e.target.value],
    });
  };

  const notify = (msg: string, success: boolean) =>
    success ? toast.success(msg) : toast.error(msg);

  const handleSubmit = async () => {
    if (formState === "login") {
      try {
        const response = await loginUser({
          username: `${credentials.username}`,
          password: `${credentials.password}`,
        });
        const { success, msg, tokens, userId } = response;

        if (success) {
          const { accessToken, refreshToken } = tokens;
          notify(msg, true);
          set_data_in_cookies("accessToken", accessToken);
          set_data_in_cookies("refreshToken", refreshToken);
          set_data_in_localstorage("accessToken", accessToken);
          set_data_in_localstorage("refreshToken", refreshToken);
          set_data_in_localstorage("userId", userId);

          setTimeout(() => {
            router.push("/todos");
          }, 600);
        }
      } catch (error) {
        console.log(error);
        notify("Wrong Credentials", false);
      }
    } else if (formState === "register") {
      try {
        const response = await registerUser({
          username: `${credentials.username}`,
          password: `${credentials.password}`,
        });

        const { success, msg } = response;

        if (success) {
          notify(msg, true);
        }
      } catch (error) {
        console.log(error);
        notify("Wrong Credentials", false);
      }
    }

    setCredentials(initialState);
  };

  return (
    <div className="grid place-items-center p-7 bg-neutral-800 shadow-xl">
      <Toaster />
      <h1 className="text-slate-200 text-3xl text-center mb-7">
        {formState === "login" ? "Login" : "Register"}
      </h1>
      <div className="flex-col flex p-7 mt-7 bg-green-400 w-96 rounded-sm shadow-lg">
        <input
          type="text"
          name="username"
          className="p-2 rounded-md text-sm"
          placeholder="Enter your username"
          value={credentials.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          className="p-2 my-3 rounded-md text-sm"
          placeholder="Enter your Password"
          value={credentials.password}
          onChange={handleInputChange}
        />
        <Button
          variant="default"
          onClick={handleSubmit}
          className="mt-5 text-white"
        >
          {formState === "login" ? "Login" : "Register"}
        </Button>
        {formState === "login" ? (
          <h1 className="mt-4 text-xs text-white select-none">
            Don&apos;t have an account ?{" "}
            <span
              className="text-blue-700 cursor-pointer"
              onClick={toggleFormState}
            >
              Register now
            </span>
          </h1>
        ) : (
          <h1 className="mt-4 text-xs text-white select-none">
            Already have an account ?{" "}
            <span
              className="text-blue-700 cursor-pointer"
              onClick={toggleFormState}
            >
              Login now
            </span>
          </h1>
        )}
      </div>
    </div>
  );
};

export default Login;
