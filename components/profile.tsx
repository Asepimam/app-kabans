import { setUpOIDC } from "@/utils/openid/client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import FormProfile from "./FormProfile";
import Skeleton from "./Skeleton";

export default async function EditProfile() {
  const cookie = cookies();
  const supabase = createClient();
  const client = await setUpOIDC();
  let loading = true;
  let profile = null;

  const token = cookie.get("token")?.value;
  console.log(token);

  if (token) {
    // Get user info using the obtained access token
    const userinfo = await client.userinfo(token);
    // Check if user profile already exists in the database
    const { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .eq("uniq_id", userinfo.sub)
      .single();
    profile = profiles;
    loading = false;
  }
  // // jika token tidak ada cek session supabase
  else {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();
      profile = profiles;
      loading = false;
    }
  }

  if (loading) {
    return <Skeleton />;
  }
  return <FormProfile {...profile} />;
}
