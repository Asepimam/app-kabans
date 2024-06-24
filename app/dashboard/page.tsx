import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dasboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold text-center">Welcome to Dashboard</h1>
        <p className="text-center text-gray-500 mt-2">{`You are logged in !${user?.email}`}</p>
      </div>
    </div>
  );
}
