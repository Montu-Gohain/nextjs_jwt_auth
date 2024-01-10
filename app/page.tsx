"use client";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { base_url } from "@/services/userServices";

export default function Home() {
  const router = useRouter();
  const [userdata, setUserdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await base_url.get("/users");
        const result = response.data;
        setUserdata(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log("Data Received from backend : ", userdata);

  return (
    <div className="flex justify-center items-center flex-col bg-white ">
      <h1 className="bg-blue-500 text-white w-full text-center p-4 text-3xl ">
        Welcome to Task Checklist
      </h1>
      <div className="h-[786px] w-full grid place-items-center">
        <Button
          variant="outline"
          className="mt-3"
          onClick={() => router.push("/login")}
        >
          Get Started {`==>`}
        </Button>
      </div>
    </div>
  );
}
