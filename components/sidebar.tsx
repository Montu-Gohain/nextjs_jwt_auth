"use client";
import { logout_user } from "@/helpers";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface propTypes {
  username: string;
}

const Sidebar: React.FC<propTypes> = ({ username }) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  //   const toggleSidebar = () => { // I'll implement these feature pretty soon
  //     setIsOpen(!isOpen);
  //   };

  return (
    <div
      className={`   bg-gray-800 h-screen text-white w-64 transform transition-transform ease-in-out  ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      <div className="p-4">
        <button
          title={"Coming soon 🚧🛠️⌛"}
          className="text-white focus:outline-none"
        >
          {isOpen ? "✖️❌" : "Open"}
        </button>
      </div>

      <div className="p-2">
        <p
          className="my-4 cursor-pointer  italic hover:bg-slate-500 py-2 px-2 rounded-md"
          title="Username"
        >
          👑{username}👑
        </p>
        {/* <p
          className="my-4 cursor-pointer  hover:bg-slate-500  py-2 px-2 rounded-md"
          title={"Coming soon 🚧🛠️⌛"}
        >
          Leaderboard
        </p> */}
        <p
          className="my-4 cursor-pointer  hover:bg-slate-500  py-2 px-2 rounded-md"
          onClick={() => {
            logout_user();
            router.push("/login");
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
