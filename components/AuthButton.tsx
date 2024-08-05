import { setUpOIDC } from "@/utils/openid/client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function AuthButton() {
  const supabase = createClient();
  const cookie = cookies();
  const client = await setUpOIDC();
  const token = cookie.get("token")?.value;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let user = null;

  if (token) {
    const userinfo = await client.userinfo(token);
    const { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .eq("uniq_id", userinfo.sub)
      .single();
    user = profiles;
  } else if (session) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", session.user.id)
      .single();
    user = profiles;
  }

  return user ? (
    <div className="flex items-center gap-4">
      👋 Hey, {user.full_name}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Link href="/login" className="py-2 px-3 flex rounded-md no-underline">
        Login
      </Link>
      <Link
        href="/signup"
        className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Signup
      </Link>
    </div>
  );
}
