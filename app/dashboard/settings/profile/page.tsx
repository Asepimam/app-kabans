import EditProfile from "@/components/profile";
import { setUpOIDC } from "@/utils/openid/client";
import { createClient } from "@/utils/supabase/server";

import { cookies } from "next/headers";
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
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const supabase = createClient();
  const client = await setUpOIDC();

  let profile: Profile = {} as Profile;

  let profileMatch = {};

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (token) {
    const { sub } = await client.userinfo(token!);
    profileMatch = { uniq_id: sub };
  } else {
    if (user) {
      profileMatch = { user_id: user.id };
    }
  }

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .match(profileMatch)
    .single();

  profile = data;

  console.log({
    profileMatch: profileMatch,
    profile: profile,
  });
  return (
    <div className="flex flex-col w-full p-4">
      <EditProfile props={profile} />;
    </div>
  );
}
