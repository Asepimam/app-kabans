"use client";

import { useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";

const LogoutButton = () => {
  const route = useRouter();
  const handleLogOut = async () => {
    const response = await fetch("/api/logout", {
      method: "GET",
    });
    if (response.ok) {
      route.replace("/login");
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <button
      onClick={handleLogOut}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      <IoLogOutOutline />
    </button>
  );
};

export default LogoutButton;
