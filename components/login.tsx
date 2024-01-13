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
  const [inputErrors, setInputErrors] = useState<{
    [key: string]: string | null;
  }>({
    username: null,
    password: null,
  });

  const router = useRouter();

  const toggleFormState = () => {
    setFormState(formState === "login" ? "register" : "login");
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

  // Todo : Let's implement Input validation in the Form.

  const validateInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ? Here let's check whether this input field is empty even after clicking on the input field

    const errors: { [key: string]: string | null } = {};

    if (e.target.name === "username") {
      if (credentials.username === null) {
        errors.username = "Username field is requried";
        setInputErrors((currentErrors) => ({
          ...currentErrors,
          ...errors,
        }));
      } else {
        setInputErrors((current_error) => ({
          ...current_error,
          username: null,
        }));
      }
    } else if (e.target.name === "password") {
      if (credentials.password === null) {
        errors.password = "Password field is required";
        setInputErrors((currentErrors) => ({
          ...currentErrors,
          ...errors,
        }));
      } else {
        setInputErrors((currentError) => ({
          ...currentError,
          password: null,
        }));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setCredentials((current_data) => ({
        ...current_data,
        username: null,
        password: null,
      }));
    } else {
      setCredentials({
        ...credentials,
        [e.target.name]: [e.target.value],
      });
    }
  };
  return (
    <div className="grid place-items-center p-7 bg-neutral-800 shadow-xl">
      <Toaster />
      <h1 className="text-slate-200 text-3xl text-center mb-7">
        {formState === "login" ? "Login" : "Register"}
      </h1>
      <div className="flex-col flex p-7 mt-7 bg-green-400 w-96 rounded-sm shadow-lg">
        {inputErrors.username && (
          <p className="text-red-600 text-sm mb-2">{inputErrors.username}</p>
        )}
        <input
          type="text"
          name="username"
          required
          aria-required
          className="p-2 rounded-md text-sm focus:outline-none focus:ring focus:ring-offset-green-600"
          placeholder="Enter your username"
          value={!credentials.username ? "" : credentials.username}
          onChange={handleInputChange}
          onBlur={(e) => {
            validateInputs(e);
            console.log("I have been called");
          }}
        />

        {inputErrors.password && (
          <p className="text-red-600 text-sm mt-2 mb-1">
            {inputErrors.password}
          </p>
        )}
        <input
          type="password"
          name="password"
          required
          aria-required
          className="p-2 mt-3 rounded-md text-sm focus:outline-none focus:ring focus:ring-offset-green-600"
          placeholder="Enter your Password"
          value={!credentials.password ? "" : credentials.password}
          onChange={handleInputChange}
          onBlur={(e) => {
            validateInputs(e);
            console.log("I have been called");
          }}
        />
        <Button
          variant="default"
          onClick={handleSubmit}
          className="mt-5 text-white"
          disabled={
            inputErrors.username !== null || inputErrors.password !== null
          }
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
