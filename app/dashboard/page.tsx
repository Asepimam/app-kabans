import { setUpOIDC } from "@/utils/openid/client";
import { createClient } from "@/utils/supabase/server";
import { Avatar } from "antd";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
interface Profile {
  uniq_id: string;
  user_id: string;
  avatar_url: string;
  email: string;
  full_name: string;
}
export default async function Dashboard() {
  const supabase = createClient();
  const client = await setUpOIDC();
  const token = await cookies().get("token")?.value;

  let profile: Profile = {} as Profile;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  let profileMatch = {};

  if (token) {
    const { sub } = await client.userinfo(token!);
    profileMatch = { uniq_id: sub };
  } else {
    if (user) {
      profileMatch = { user_id: user.id };
    } else {
      return redirect("/");
    }
  }
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .match(profileMatch)
    .single();

  profile = data;

  return (
    <>
      <div className="flex items-center bg-gray-800 -ml-5 p-3 justify-end mb-3">
        <div className="flex items-center">
          <Avatar
            style={{
              height: "40px",
              width: "40px",
            }}
            src={
              profile.avatar_url
                ? profile.avatar_url
                : "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
            }
          />
        </div>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold text-center">
            Welcome to Dashboard
          </h1>
          <p className="text-center text-gray-500 mt-2">{`You are logged in! ${profile.full_name}`}</p>
        </div>
      </div>
    </>
  );
}
