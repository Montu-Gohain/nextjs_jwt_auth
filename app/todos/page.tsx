"use client";
import Sidebar from "@/components/sidebar";
import {
  GetUserDataById_,
  base_url,
  deleteTask,
  updateTask,
} from "@/services/userServices";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TodoInput from "@/components/inputField";
import { Todo } from "@/interfaces";
import toast, { Toaster } from "react-hot-toast";

const Todos: React.FC = () => {
  const [username, setUsername] = useState<string | "user_name">("user_name");
  const [loading, setLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<Todo[] | any>([]);
  const [fetchCount, setFetchCount] = useState<number>(0);
  const [finishCount, setFinishCount] = useState<number>(0);
  const [hideInputField, setHideInputField] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const user_id = window.localStorage.getItem("userId");
    // console.log("Current userId is  : ", user_id);

    const get_user_data_w_id = async (userId: string) => {
      try {
        const user_data = await GetUserDataById_(userId);
        // console.log(`Current users data is : ${user_data}`);

        if (user_data === "redirect-login") {
          router.push("/login");
        } else {
          setUsername(user_data?.data?.username);
          setTodos(user_data?.data?.todos);
          setFinishCount(user_data?.completed_task_count);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (user_id) {
      get_user_data_w_id(user_id);
    }
  }, [router, fetchCount]);

  const toggleInputFieldVisibility = () => {
    setHideInputField((current) => (current ? false : true));
  };

  const destroy_task = async (ID: number) => {
    try {
      const del_res = await deleteTask(ID);
      if (del_res.success) {
        setFetchCount((curr) => curr + 1);
        toast.success("Task Deleted Successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (com_status: boolean, id: number) => {
    try {
      const switch_status_to = {
        is_complete: com_status ? "false" : "true",
      };
      const update_res = await updateTask(switch_status_to, id);

      if (update_res.success) {
        toast.success("Todo Updated successfully");
        setFetchCount((current) => current + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row ">
      <Toaster />
      <Sidebar username={username} />
      <div className="p-6 bg-slate-400 w-full">
        {loading ? (
          <h1 className="text-black">Your Todos are loading...</h1>
        ) : (
          <div>
            <h1 className="text-center text-2xl text-white py-4 mb-5 bg-slate-900">
              Today&apos;s Tasks{" "}
            </h1>
            <div className="flex flex-row items-center justify-between">
              <span className="bg-indigo-500 p-2  text-white rounded-sm">
                Total Completed ✅ : {finishCount} / {todos.length}
              </span>
              <Button onClick={toggleInputFieldVisibility}>
                {hideInputField ? "Add new task" : "Close ❌"}
              </Button>
            </div>

            {hideInputField ? null : <TodoInput setter={setFetchCount} />}

            <ul className="list-none mt-5 pr-2 overflow-y-auto max-h-[650px]">
              {todos.map((todo: Todo) => (
                <li
                  key={todo.id}
                  className="border p-2 my-2 rounded-md bg-gray-100 flex flex-row items-center justify-between "
                >
                  <span>{todo.task}</span>
                  <div>
                    <Button
                      variant="outline"
                      className={
                        todo.is_complete ? "bg-green-500 text-white" : ""
                      }
                      onClick={() => updateTodo(todo.is_complete, todo.id)}
                    >
                      {todo.is_complete ? "Done" : "Mark as done ☑️"}
                    </Button>
                    <Button
                      variant="destructive"
                      className="ml-2"
                      onClick={() => destroy_task(todo.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;
