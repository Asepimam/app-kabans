import EditProfile from "@/components/profile";
import { setUpOIDC } from "@/utils/openid/client";
import { createClient } from "@/utils/supabase/server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
interface Profile {
  uniq_id: string;
  user_id: string;
  avatar_url: string;
  email: string;
  full_name: string;
  first_name: string;
  last_name: string;
  birth_date: string;
}
export default async function Profile() {
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
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col w-full p-4">
        <EditProfile props={profile} />;
      </div>
    </div>
  );
}
