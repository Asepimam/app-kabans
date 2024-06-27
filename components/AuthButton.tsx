import { setUpOIDC } from "@/utils/openid/client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

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

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      👋 Hey, {user.full_name}!
      <Link href={"/api/logout"}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </Link>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
      Login
    </Link>
  );
}
