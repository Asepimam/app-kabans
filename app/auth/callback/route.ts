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
    const {data:{user}}=await supabase.auth.exchangeCodeForSession(code);
   
    const {data:profile} = await supabase.from('profiles').select("user_id").eq('user_id', user?.id).single();
    if(!profile){
      await supabase.from('profiles').insert({user_id:user?.id,avatar_url:user?.user_metadata.avatar_url});
      return NextResponse.redirect(`${origin}/dashboard`);
    }
    return NextResponse.redirect(`${origin}/dashboard`);
  } 
  return NextResponse.redirect("/");
}
