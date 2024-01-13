import { useState } from "react";
import { Button } from "./ui/button";
import { addNewTask } from "../services/userServices";
import toast, { Toaster } from "react-hot-toast";

interface propTypes {
  setter: React.Dispatch<React.SetStateAction<number>>;
}

const TodoInput: React.FC<propTypes> = ({ setter }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = async () => {
    try {
      const userId = window.localStorage.getItem("userId");

      if (userId) {
        const saved_data = await addNewTask(inputValue, userId);

        if (saved_data.success) {
          setter((cur) => cur + 1);
          toast.success("Task Added Successfully");
        }
        setInputValue("");
        console.log("New Todo data : ", saved_data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-row mt-4 w-full">
      <Toaster />
      <input
        type="text"
        className="w-full px-3"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button
        variant="outline"
        className="ml-3 text-blue-600"
        onClick={handleSave}
      >
        Save
      </Button>
    </section>
  );
};

export default TodoInput;
