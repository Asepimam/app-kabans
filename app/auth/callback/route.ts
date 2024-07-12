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
    try {
      const supabase = createClient();
      await supabase.auth.exchangeCodeForSession(code);

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error('Error fetching user:', userError?.message);
        return NextResponse.redirect(origin);
      }
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select()
        .eq('user_id', user.id)
        .single();

      
      // jika profile itu null insert profile
      if (!profile) {
        const { error: insertError } = await supabase.from('profiles').insert({
          user_id: user.id,
          full_name: user.user_metadata.full_name,
          avatar_url: user.user_metadata.avatar_url,
        }).select();

        if (insertError) {
          console.error('Error inserting profile:', insertError.message);
          return NextResponse.redirect(origin);
        }
        return NextResponse.redirect(`${origin}/dashboard`);
      }
      return NextResponse.redirect(`${origin}/dashboard`);
    } catch (error) {
      console.error('Unexpected error:', error);
      return NextResponse.redirect(origin);
    }
  }

  return NextResponse.redirect(origin);
}
