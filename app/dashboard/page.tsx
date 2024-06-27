import { setUpOIDC } from "@/utils/openid/client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const supabase = createClient();
  let profile = { full_name: "" };
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("user_id", user!.id)
      .single();

    if (data) {
      profile = data;
    }
  }

  if (userError) {
    const client = await setUpOIDC();
    const cookie = cookies().get("token")?.value;
    if (cookie) {
      const userinfo = await client.userinfo(cookie);
      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("uniq_id", userinfo.sub)
        .single();

      console.log(data);

      if (data) {
        profile = data;
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold text-center">Welcome to Dashboard</h1>
        <p className="text-center text-gray-500 mt-2">{`You are logged in! ${profile.full_name}`}</p>
      </div>
    </div>
  );
}
