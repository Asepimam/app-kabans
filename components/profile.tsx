import { setUpOIDC } from "@/utils/openid/client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FormProfile from "./FormProfile";
import Skeleton from "./Skeleton";

export default async function EditProfile() {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const supabase = createClient();
  const client = await setUpOIDC();

  let loading = true;
  let profile = null;
  let subUser = null;
  try {
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
      .select("full_name,first_name, last_name, birth_date")
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
    return <FormProfile subUser={subUser!} {...profile} />;
  } catch (error) {
    console.error("Error in EditProfile function:", error);
    return redirect("/");
  }
}
