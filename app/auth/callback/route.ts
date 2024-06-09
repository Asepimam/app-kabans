import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }
  
  // jika user berhasil login, maka lakukan insert data ke table profile
  const supabase = createClient();
  const { data:{user} } = await supabase.auth.getUser();
  console.log(user);
  const { data } =  await supabase.from('profiles').insert([
    { user_id:user?.id }
  ]).select();
  console.log(data);
  

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/dasboard`);
}
