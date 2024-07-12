import { setUpOIDC } from "@/utils/openid/client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  const supabase= createClient();
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value;
  
  // jika dari supabase
  await supabase.auth.signOut();

  if(token){
    await setUpOIDC().then((client) => {
      client.revoke(token);
      cookies().delete('cv');
      cookies().delete('token');
      cookies().delete('refresh_token');
    })
  }

  // prettier-ignore
  return new Response(JSON.stringify({ success: true }), {
      status: 302, // HTTP status code for temporary redirection
      headers: {
        "Location": "/",  // The URL to redirect to
        "Content-Type": "application/json",
      },
    });
}
