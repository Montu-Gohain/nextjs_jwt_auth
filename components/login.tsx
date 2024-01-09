"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Credentials } from "@/interfaces/login";
import { initialState } from "@/helpers";
import { loginUser, registerUser } from "@/services/userServices";
import toast, { Toaster } from "react-hot-toast";
import { error } from "console";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>(initialState);
  const [formState, setFormState] = useState<"login" | "register">("login");

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
        console.log("Here I am ", response);

        if (response.success) {
          notify(response.msg, true);
        } else {
          notify("Wrong Credentials", false);
        }
      } catch (error) {
        console.log(error);
        notify("Login failed. Please try again.", false);
      }
    } else if (formState === "register") {
      try {
        const response = await registerUser({
          username: `${credentials.username}`,
          password: `${credentials.password}`,
        });

        console.log("Here I am ", response);

        if (response.success) {
          notify(response.msg, true);
        } else {
          notify("Wrong Credentials", false);
        }
      } catch (error) {
        console.log(error);
        notify("Registration failed, please try again later.", false);
      }
    }

    setCredentials(initialState);
  };

  return (
    <div className="grid place-items-center p-7 ">
      <Toaster />
      <h1 className="text-red-500 text-3xl text-center mt-4">
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
          type="text"
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
