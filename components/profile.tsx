import { setUpOIDC } from "@/utils/openid/client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FormProfile from "./FormProfile";
import Skeleton from "./Skeleton";
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
export default async function EditProfile() {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const supabase = createClient();
  const client = await setUpOIDC();

  let loading = true;
  let profile: Profile = {} as Profile;
  let subUser = null;

  let profileMatch = {};

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (token) {
    const { sub } = await client.userinfo(token!);
    subUser = sub;
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

  if (error) {
    return redirect("/");
  }

  profile = data;
  loading = false;

  if (loading) {
    return <Skeleton />;
  }
  return <FormProfile props={profile} />;
}
